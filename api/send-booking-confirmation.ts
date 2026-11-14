import { Resend } from 'resend';

function generateClientEmailHtml(booking: any) {
  const {
    reference,
    serviceName,
    date,
    time,
    clientName,
    totalPrice,
    amountPaid,
    remainingBalance,
    paymentChoice,
    tip = 0
  } = booking;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Appointment Confirmation - Sandy Beauty Haven</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #FAF7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #221B1A;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FAF7F2; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 6px; border: 1px solid #E8E0D7; box-shadow: 0 4px 20px rgba(34, 27, 26, 0.04); overflow: hidden;" cellspacing="0" cellpadding="0">
          
          <!-- Editorial Header -->
          <tr>
            <td align="center" style="padding: 35px 25px 25px 25px; border-bottom: 1px solid #F0EAE3; background-color: #FAF7F2;">
              <h1 style="margin: 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 26px; font-weight: 500; letter-spacing: 0.06em; color: #221B1A; text-transform: uppercase;">
                Sandy Beauty Haven
              </h1>
              <p style="margin: 5px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: #A36F72; font-weight: 600;">
                Bespoke Lash & Brow Artistry • Edinburgh
              </p>
            </td>
          </tr>

          <!-- Confirmation Banner -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <p style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; color: #A36F72; font-weight: 600;">
                Appointment Confirmed
              </p>
              <h2 style="margin: 0 0 15px 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; font-weight: 400; line-height: 1.25; color: #221B1A;">
                We look forward to welcoming you, ${clientName}.
              </h2>
              <p style="margin: 0 0 25px 0; font-size: 14px; line-height: 1.6; color: #70645F;">
                Your appointment at our private Easter Road studio is officially secured. Below is your detailed reservation summary and studio arrival guide.
              </p>

              <!-- Appointment Details Box -->
              <table role="presentation" width="100%" style="background-color: #FAF7F2; border: 1px solid #E8E0D7; border-radius: 4px; margin-bottom: 25px;" cellspacing="0" cellpadding="14">
                <tr>
                  <td style="border-bottom: 1px solid #E8E0D7; font-size: 13px; color: #70645F; width: 38%;">Reference</td>
                  <td style="border-bottom: 1px solid #E8E0D7; font-size: 13px; font-weight: 600; color: #221B1A;">${reference}</td>
                </tr>
                <tr>
                  <td style="border-bottom: 1px solid #E8E0D7; font-size: 13px; color: #70645F;">Treatment</td>
                  <td style="border-bottom: 1px solid #E8E0D7; font-size: 13px; font-weight: 600; color: #221B1A;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="border-bottom: 1px solid #E8E0D7; font-size: 13px; color: #70645F;">Date & Time</td>
                  <td style="border-bottom: 1px solid #E8E0D7; font-size: 13px; font-weight: 600; color: #221B1A;">${date} at ${time}</td>
                </tr>
                <tr>
                  <td style="border-bottom: 1px solid #E8E0D7; font-size: 13px; color: #70645F;">Artist</td>
                  <td style="border-bottom: 1px solid #E8E0D7; font-size: 13px; font-weight: 600; color: #221B1A;">Sandy (Founder & Specialist)</td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #70645F;">Location</td>
                  <td style="font-size: 13px; font-weight: 600; color: #221B1A;">101 Easter Road, Edinburgh, EH7 5PP</td>
                </tr>
              </table>

              <!-- Payment Breakdown Box -->
              <h3 style="margin: 0 0 12px 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 20px; font-weight: 500; color: #221B1A;">
                Payment Summary
              </h3>
              <table role="presentation" width="100%" style="background-color: #FFFFFF; border: 1px solid #E8E0D7; border-radius: 4px; margin-bottom: 25px;" cellspacing="0" cellpadding="12">
                <tr>
                  <td style="border-bottom: 1px solid #F0EAE3; font-size: 13px; color: #70645F;">Treatment Price</td>
                  <td align="right" style="border-bottom: 1px solid #F0EAE3; font-size: 13px; color: #221B1A; font-weight: 600;">£${Number(totalPrice).toFixed(2)}</td>
                </tr>
                ${tip > 0 ? `
                <tr>
                  <td style="border-bottom: 1px solid #F0EAE3; font-size: 13px; color: #70645F;">Staff Gratuity (Tip)</td>
                  <td align="right" style="border-bottom: 1px solid #F0EAE3; font-size: 13px; color: #221B1A; font-weight: 600;">£${Number(tip).toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="border-bottom: 1px solid #F0EAE3; font-size: 13px; color: #3B664B; font-weight: 600;">
                    Paid Online via Stripe (${paymentChoice === 'full' ? 'Full Settlement' : 'Deposit'})
                  </td>
                  <td align="right" style="border-bottom: 1px solid #F0EAE3; font-size: 13px; color: #3B664B; font-weight: 700;">
                    £${Number(amountPaid).toFixed(2)}
                  </td>
                </tr>
                <tr style="background-color: #FAF7F2;">
                  <td style="font-size: 13px; font-weight: 700; color: #221B1A;">Balance Due in Studio</td>
                  <td align="right" style="font-size: 14px; font-weight: 700; color: ${remainingBalance > 0 ? '#A36F72' : '#3B664B'};">
                    ${remainingBalance > 0 ? `£${Number(remainingBalance).toFixed(2)}` : '£0.00 (Fully Paid)'}
                  </td>
                </tr>
              </table>

              <!-- Pre-Appointment Preparation Guide -->
              <div style="background-color: #F8F1EE; border-left: 3px solid #A36F72; padding: 14px 18px; border-radius: 2px; margin-bottom: 25px;">
                <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #A36F72;">
                  Important Studio Preparation
                </p>
                <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; line-height: 1.6; color: #5B4F4A;">
                  <li>Please arrive with <strong>clean, mascara-free, oil-free lashes</strong> for maximum retention.</li>
                  <li>Avoid caffeinated beverages immediately prior to lash appointments to minimize eyelid fluttering.</li>
                  <li><strong>48-Hour Reschedule Policy:</strong> You may adjust your appointment date up to 48 hours prior. Cancellations within 48h forfeit the deposit as our slots are strictly private.</li>
                </ul>
              </div>

              <!-- Action Button: Directions -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <a href="https://maps.google.com/?q=101+Easter+Road+Edinburgh+EH7+5PP" target="_blank" style="display: inline-block; background-color: #A36F72; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 3px; letter-spacing: 0.04em;">
                      Get Directions to 101 Easter Road →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 13px; color: #70645F; line-height: 1.6; text-align: center;">
                Need to speak with Sandy directly? Call <a href="tel:+447733777956" style="color: #A36F72; text-decoration: none; font-weight: 600;">+44 07733777956</a> or reply to this confirmation.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px; background-color: #FAF7F2; border-top: 1px solid #E8E0D7; font-size: 11px; color: #9E918B; line-height: 1.5;">
              © ${new Date().getFullYear()} Sandy Beauty Haven • 101 Easter Road, Edinburgh, EH7 5PP<br>
              Accredited Lash & Brow Specialist • Edinburgh, Scotland
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function generateStudioAlertHtml(booking: any) {
  const {
    reference,
    serviceName,
    date,
    time,
    clientName,
    clientEmail,
    clientPhone,
    totalPrice,
    amountPaid,
    remainingBalance,
    paymentChoice,
    tip = 0,
    notes = ''
  } = booking;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Booking Alert - Sandy Beauty Haven</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #FAF7F2; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #221B1A;">
  <div style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E8E0D7; border-radius: 6px; padding: 25px;">
    <div style="border-bottom: 2px solid #A36F72; padding-bottom: 12px; margin-bottom: 20px;">
      <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #A36F72; letter-spacing: 0.1em;">New Client Booking</span>
      <h2 style="margin: 4px 0 0 0; font-size: 20px; color: #221B1A;">${clientName} booked ${serviceName}</h2>
    </div>

    <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 13.5px; border-collapse: collapse; margin-bottom: 20px;">
      <tr style="border-bottom: 1px solid #F0EAE3;">
        <td style="color: #70645F; width: 35%;"><strong>Appointment Time</strong></td>
        <td><strong>${date} at ${time}</strong></td>
      </tr>
      <tr style="border-bottom: 1px solid #F0EAE3;">
        <td style="color: #70645F;"><strong>Reference</strong></td>
        <td>${reference}</td>
      </tr>
      <tr style="border-bottom: 1px solid #F0EAE3;">
        <td style="color: #70645F;"><strong>Phone Number</strong></td>
        <td><a href="tel:${clientPhone}" style="color: #A36F72; text-decoration: none;">${clientPhone}</a></td>
      </tr>
      <tr style="border-bottom: 1px solid #F0EAE3;">
        <td style="color: #70645F;"><strong>Email</strong></td>
        <td><a href="mailto:${clientEmail}" style="color: #A36F72; text-decoration: none;">${clientEmail}</a></td>
      </tr>
      <tr style="border-bottom: 1px solid #F0EAE3;">
        <td style="color: #70645F;"><strong>Total Price</strong></td>
        <td>£${Number(totalPrice).toFixed(2)}</td>
      </tr>
      <tr style="border-bottom: 1px solid #F0EAE3;">
        <td style="color: #70645F;"><strong>Deposit Paid</strong></td>
        <td style="color: #3B664B; font-weight: 700;">£${Number(amountPaid).toFixed(2)} (${paymentChoice === 'full' ? 'Paid in Full' : 'Deposit'})</td>
      </tr>
      <tr style="border-bottom: 1px solid #F0EAE3;">
        <td style="color: #70645F;"><strong>Balance Due in Studio</strong></td>
        <td style="font-weight: 700;">£${Number(remainingBalance).toFixed(2)}</td>
      </tr>
      ${tip > 0 ? `
      <tr style="border-bottom: 1px solid #F0EAE3;">
        <td style="color: #70645F;"><strong>Tip</strong></td>
        <td>£${Number(tip).toFixed(2)}</td>
      </tr>` : ''}
      ${notes ? `
      <tr>
        <td style="color: #70645F;"><strong>Client Notes</strong></td>
        <td>${notes}</td>
      </tr>` : ''}
    </table>

    <div style="background-color: #FAF7F2; padding: 12px; border-radius: 4px; font-size: 12px; color: #70645F;">
      This reservation was verified and card authorized via Stripe. Customer received their confirmation email and arrival guide.
    </div>
  </div>
</body>
</html>
  `;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY || '';
  const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const studioNotificationEmail = process.env.STUDIO_NOTIFICATION_EMAIL || 'temy.topsy12@gmail.com';

  if (!resendApiKey) {
    res.status(500).json({ error: 'RESEND_API_KEY environment variable is not configured.' });
    return;
  }

  const resend = new Resend(resendApiKey);

  try {
    const booking = req.body || {};
    const { clientEmail, clientName, serviceName, date, time } = booking;

    if (!clientEmail || !clientName) {
      res.status(400).json({ error: 'Missing required client details' });
      return;
    }

    // Determine destination email:
    // With onboarding@resend.dev, Resend permits sending ONLY to the verified account owner (temy.topsy12@gmail.com).
    // Once a custom domain is verified on Resend, it sends directly to clientEmail.
    const isUsingOnboarding = resendFromEmail.includes('onboarding@resend.dev');
    const clientRecipient = isUsingOnboarding ? 'temy.topsy12@gmail.com' : clientEmail;
    const studioRecipient = isUsingOnboarding ? 'temy.topsy12@gmail.com' : studioNotificationEmail;

    // Send Client Confirmation Email
    const clientSubject = isUsingOnboarding
      ? `[Demo Booking Confirmation for ${clientName}] Sandy Beauty Haven - ${serviceName}`
      : `Booking Confirmed: ${serviceName} at Sandy Beauty Haven`;

    const clientEmailResult = await resend.emails.send({
      from: `Sandy Beauty Haven <${resendFromEmail}>`,
      to: [clientRecipient],
      subject: clientSubject,
      html: generateClientEmailHtml(booking)
    });

    // Send Studio Owner Alert Email
    const studioSubject = isUsingOnboarding
      ? `[Studio Alert for Sandy] 🛎️ New Booking: ${clientName} - ${serviceName} (${date} at ${time})`
      : `🛎️ New Booking Alert: ${clientName} - ${serviceName} (${date} at ${time})`;

    const studioAlertResult = await resend.emails.send({
      from: `Sandy Beauty Haven Alerts <${resendFromEmail}>`,
      to: [studioRecipient],
      subject: studioSubject,
      html: generateStudioAlertHtml(booking)
    });

    res.status(200).json({
      success: true,
      clientEmailId: clientEmailResult.data?.id,
      studioAlertId: studioAlertResult.data?.id,
      recipientUsed: clientRecipient
    });
  } catch (err: any) {
    console.error('Resend email error:', err);
    res.status(500).json({
      error: err.message || 'Failed to send confirmation email'
    });
  }
}
