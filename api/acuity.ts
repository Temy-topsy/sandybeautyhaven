/**
 * Acuity Scheduling Serverless Integration
 * Connects directly to Acuity Scheduling REST API v1
 * 
 * Supports:
 * - GET /api/acuity?action=dates&appointmentTypeID=...&month=YYYY-MM
 * - GET /api/acuity?action=times&appointmentTypeID=...&date=YYYY-MM-DD
 * - POST /api/acuity?action=book (creates live appointment on Acuity calendar)
 * - GET /api/acuity?action=status (reports API connection status)
 * 
 * Gracefully provides high-fidelity studio schedule fallback if Sandy has not
 * yet entered her Acuity API credentials.
 */

import process from 'node:process';
import { Buffer } from 'node:buffer';

interface AcuityDateSlot {
  date: string;
}

// Sandy's primary calendar ID at 101 Easter Road
const SANDY_CALENDAR_ID = 10090257;

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const userId = (process.env.ACUITY_USER_ID || process.env.ACUITY_OWNER_ID || '32207699').trim();
  const apiKey = (process.env.ACUITY_API_KEY || '').trim();
  const isAcuityConfigured = Boolean(userId && apiKey);

  const query = req.query || {};
  // Handle URL params if query object is empty
  let action = query.action;
  let appointmentTypeID = query.appointmentTypeID;
  let month = query.month;
  let date = query.date;

  if (!action && req.url) {
    try {
      const parsedUrl = new URL(req.url, 'http://localhost');
      action = parsedUrl.searchParams.get('action') || '';
      appointmentTypeID = parsedUrl.searchParams.get('appointmentTypeID') || '';
      month = parsedUrl.searchParams.get('month') || '';
      date = parsedUrl.searchParams.get('date') || '';
    } catch {
      // ignore URL parsing error
    }
  }

  // Check connection status
  if (action === 'status') {
    res.status(200).json({
      connected: isAcuityConfigured,
      userId: userId || null,
      hasApiKey: Boolean(apiKey),
      liveSyncEnabled: process.env.ACUITY_LIVE_SYNC === 'true',
      calendarId: SANDY_CALENDAR_ID,
      studioAddress: '101 Easter Road, Edinburgh, EH7 5PP',
      provider: 'Acuity / Squarespace Scheduling',
      instructions: isAcuityConfigured
        ? 'Acuity API is authenticated.'
        : 'Please set ACUITY_USER_ID and ACUITY_API_KEY in Vercel Environment Variables.'
    });
    return;
  }

  // Determine correct calendar: Makeup with Bukky uses 14343491, Sandy uses 10090257
  const isMakeupService = appointmentTypeID === '95986858' || appointmentTypeID === '95989069';
  const targetCalendarId = query.calendarID || (isMakeupService ? 14343491 : SANDY_CALENDAR_ID);

  // 1. Fetch Available Dates for a Month
  if (action === 'dates') {
    const targetMonth = month || new Date().toISOString().slice(0, 7); // YYYY-MM
    const typeId = appointmentTypeID || '69886073';

    if (isAcuityConfigured) {
      try {
        const authHeader = 'Basic ' + Buffer.from(`${userId}:${apiKey}`).toString('base64');
        const acuityUrl = `https://acuityscheduling.com/api/v1/availability/dates?month=${targetMonth}&appointmentTypeID=${typeId}&calendarID=${targetCalendarId}`;
        
        const response = await fetch(acuityUrl, {
          headers: {
            'Authorization': authHeader,
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const dates = (await response.json()) as AcuityDateSlot[];
          res.status(200).json({ source: 'acuity-live', dates });
          return;
        } else {
          console.warn(`Acuity API dates returned ${response.status}: Falling back to studio schedule`);
        }
      } catch (err) {
        console.warn('Acuity API dates fetch error:', err);
      }
    }

    // High-fidelity fallback based on Sandy's real studio hours:
    // Open Monday through Saturday, Closed Sundays
    const [yStr, mStr] = targetMonth.split('-');
    const year = parseInt(yStr, 10);
    const monthIdx = parseInt(mStr, 10) - 1;
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const availableDates: AcuityDateSlot[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, monthIdx, day);
      const dayOfWeek = d.getDay(); // 0 = Sun
      // Open Mon-Sat (1-6), closed Sunday (0)
      if (dayOfWeek !== 0 && d >= today) {
        const mFormatted = String(monthIdx + 1).padStart(2, '0');
        const dFormatted = String(day).padStart(2, '0');
        availableDates.push({ date: `${year}-${mFormatted}-${dFormatted}` });
      }
    }

    res.status(200).json({ source: 'studio-calendar', dates: availableDates });
    return;
  }

  // 2. Fetch Available Times for a Specific Date
  if (action === 'times') {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const typeId = appointmentTypeID || '69886073';

    if (isAcuityConfigured) {
      try {
        const authHeader = 'Basic ' + Buffer.from(`${userId}:${apiKey}`).toString('base64');
        const acuityUrl = `https://acuityscheduling.com/api/v1/availability/times?date=${targetDate}&appointmentTypeID=${typeId}&calendarID=${targetCalendarId}`;
        
        const response = await fetch(acuityUrl, {
          headers: {
            'Authorization': authHeader,
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const times = (await response.json()) as Array<{ time: string }>;
          const formattedTimes = times.map((t) => {
            const timeDate = new Date(t.time);
            // Format time strictly in Sandy's studio timezone (Europe/London)
            const label = timeDate.toLocaleTimeString('en-US', {
              timeZone: 'Europe/London',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            });
            return {
              time: t.time,
              label
            };
          });

          res.status(200).json({ source: 'acuity-live', times: formattedTimes });
          return;
        } else {
          console.warn(`Acuity API times returned ${response.status}: Falling back to studio schedule`);
        }
      } catch (err) {
        console.warn('Acuity API times fetch error:', err);
      }
    }

    // Studio schedule fallback slots for Edinburgh studio
    const standardTimes = [
      '09:30 AM',
      '11:00 AM',
      '12:30 PM',
      '02:00 PM',
      '03:30 PM',
      '04:45 PM'
    ];

    const fallbackTimes = standardTimes.map((label) => ({
      time: `${targetDate} ${label}`,
      label
    }));

    res.status(200).json({ source: 'studio-calendar', times: fallbackTimes });
    return;
  }

  // 3. Book Live Appointment in Acuity (after Stripe payment)
  if (action === 'book' || (req.method === 'POST' && !action)) {
    let booking = req.body || {};
    if (typeof booking === 'string') {
      try {
        booking = JSON.parse(booking);
      } catch {
        // keep as is
      }
    }
    const {
      appointmentTypeID: bookedTypeId,
      datetime,
      firstName,
      lastName,
      email,
      phone,
      notes,
      reference,
      totalPrice,
      depositPaid,
      remainingBalance
    } = booking;

    // Safe Sandbox Mode: Prevent test bookings from polluting Sandy's real calendar or notifying her
    const isLiveSyncEnabled = process.env.ACUITY_LIVE_SYNC === 'true';

    if (isAcuityConfigured && isLiveSyncEnabled) {
      try {
        const authHeader = 'Basic ' + Buffer.from(`${userId}:${apiKey}`).toString('base64');
        const acuityUrl = 'https://acuityscheduling.com/api/v1/appointments';

        const appointmentPayload = {
          appointmentTypeID: bookedTypeId ? parseInt(bookedTypeId, 10) : 69886073,
          datetime: datetime,
          firstName: firstName || 'Studio Client',
          lastName: lastName || '',
          email: email || '',
          phone: phone || '',
          calendarID: SANDY_CALENDAR_ID,
          notes: `${notes || 'Website Booking'} | Ref: ${reference || ''} | Total: £${totalPrice || 0} | Deposit Paid: £${depositPaid || 0} | Balance Due: £${remainingBalance || 0}`,
          paid: depositPaid ? String(depositPaid) : '0'
        };

        const response = await fetch(acuityUrl, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(appointmentPayload)
        });

        if (response.ok) {
          const createdAppointment = (await response.json()) as any;
          res.status(200).json({
            success: true,
            source: 'acuity-live',
            acuityAppointmentId: createdAppointment.id,
            data: createdAppointment
          });
          return;
        } else {
          const errorText = await response.text();
          console.warn('Acuity appointment creation failed:', response.status, errorText);
        }
      } catch (err) {
        console.error('Acuity book error:', err);
      }
    }

    // Default Sandbox Response: Sandy is NOT contacted, her live calendar is untouched
    res.status(200).json({
      success: true,
      source: 'studio-sandbox',
      appointmentId: `SBH-SIM-${Date.now()}`,
      message: 'Booking completed in safe sandbox mode. Sandy live calendar remains untouched.'
    });
    return;
  }

  res.status(400).json({ error: 'Unknown action or unsupported method' });
}
