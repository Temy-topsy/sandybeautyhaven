import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICES, type ServiceItem } from '../data/services';

export interface ClientDetails {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  agreeToPolicies: boolean;
  smsReminders: boolean;
}

export interface ConfirmedBooking {
  reference: string;
  service: ServiceItem;
  staff: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:30 AM"
  client: ClientDetails;
  totalPrice: number;
  depositPaid: number;
  remainingBalance: number;
  bookedAt: string;
}

interface BookingContextType {
  selectedService: ServiceItem | null;
  setSelectedService: (service: ServiceItem | null) => void;
  selectedStaff: string;
  setSelectedStaff: (staff: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  clientDetails: ClientDetails;
  setClientDetails: React.Dispatch<React.SetStateAction<ClientDetails>>;
  confirmedBooking: ConfirmedBooking | null;
  completeBooking: (paymentId?: string) => ConfirmedBooking;
  resetBooking: () => void;
}

const defaultClient: ClientDetails = {
  fullName: '',
  email: '',
  phone: '',
  notes: '',
  agreeToPolicies: false,
  smsReminders: true
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(() => {
    return SERVICES[1]; // default to Ombre Brows or Hybrid
  });
  const [selectedStaff, setSelectedStaff] = useState<string>('Sandy Beauty');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    // Tomorrow's date by default
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [clientDetails, setClientDetails] = useState<ClientDetails>(defaultClient);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(() => {
    const saved = localStorage.getItem('sbh_confirmed_booking');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (confirmedBooking) {
      localStorage.setItem('sbh_confirmed_booking', JSON.stringify(confirmedBooking));
    }
  }, [confirmedBooking]);

  const completeBooking = (_paymentId?: string): ConfirmedBooking => {
    const service = selectedService || SERVICES[0];
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const reference = `SBH-${new Date().getFullYear()}-${randNum}`;
    const depositPaid = service.deposit;
    const remainingBalance = Math.max(0, service.price - depositPaid);

    const booking: ConfirmedBooking = {
      reference,
      service,
      staff: selectedStaff,
      date: selectedDate,
      time: selectedTime,
      client: { ...clientDetails },
      totalPrice: service.price,
      depositPaid,
      remainingBalance,
      bookedAt: new Date().toISOString()
    };

    setConfirmedBooking(booking);
    return booking;
  };

  const resetBooking = () => {
    setSelectedService(SERVICES[1]);
    setSelectedDate(() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    });
    setSelectedTime('11:00 AM');
    setClientDetails(defaultClient);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedService,
        setSelectedService,
        selectedStaff,
        setSelectedStaff,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        clientDetails,
        setClientDetails,
        confirmedBooking,
        completeBooking,
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
