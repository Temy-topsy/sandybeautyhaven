import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { SERVICES, type ServiceItem } from '../data/services';

export interface ClientDetails {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  agreeToPolicies: boolean;
  marketingConsent: 'yes' | 'no' | '';
  smsReminders: boolean;
}

export interface ConfirmedBooking {
  reference: string;
  services: ServiceItem[];
  service: ServiceItem;
  staff: string;
  date: string;
  time: string;
  client: ClientDetails;
  totalPrice: number;
  depositPaid: number;
  remainingBalance: number;
  totalDuration: number;
  bookedAt: string;
}

interface BookingContextType {
  selectedServices: ServiceItem[];
  addService: (service: ServiceItem) => void;
  removeService: (serviceId: number) => void;
  toggleService: (service: ServiceItem) => void;
  clearServices: () => void;
  isServiceSelected: (serviceId: number) => boolean;
  selectedService: ServiceItem | null;
  setSelectedService: (service: ServiceItem | null) => void;
  totalPrice: number;
  totalDeposit: number;
  totalDuration: number;
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
  marketingConsent: '',
  smsReminders: true
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>(() => {
    return [SERVICES[1]]; // default to Hybrid Lash Extensions
  });

  const [selectedStaff, setSelectedStaff] = useState<string>('Sandy Beauty');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
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

  const addService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      if (prev.some((s) => s.id === service.id)) return prev;
      return [...prev, service];
    });
  };

  const removeService = (serviceId: number) => {
    setSelectedServices((prev) => {
      if (prev.length <= 1) return prev; // keep at least 1
      return prev.filter((s) => s.id !== serviceId);
    });
  };

  const toggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        if (prev.length <= 1) return prev; // keep at least 1
        return prev.filter((s) => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const clearServices = () => {
    setSelectedServices([SERVICES[0]]);
  };

  const isServiceSelected = (serviceId: number) => {
    return selectedServices.some((s) => s.id === serviceId);
  };

  // Backwards compatibility getter & setter
  const selectedService = selectedServices[0] || null;
  const setSelectedService = (service: ServiceItem | null) => {
    if (service) {
      setSelectedServices([service]);
    }
  };

  const totalPrice = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.price, 0);
  }, [selectedServices]);

  const totalDeposit = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.deposit, 0);
  }, [selectedServices]);

  const totalDuration = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.duration, 0);
  }, [selectedServices]);

  const completeBooking = (_paymentId?: string): ConfirmedBooking => {
    const primaryService = selectedServices[0] || SERVICES[0];
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const reference = `SBH-${new Date().getFullYear()}-${randNum}`;
    const depositPaid = totalDeposit;
    const remainingBalance = Math.max(0, totalPrice - depositPaid);

    const booking: ConfirmedBooking = {
      reference,
      services: [...selectedServices],
      service: primaryService,
      staff: selectedStaff,
      date: selectedDate,
      time: selectedTime,
      client: { ...clientDetails },
      totalPrice,
      depositPaid,
      remainingBalance,
      totalDuration,
      bookedAt: new Date().toISOString()
    };

    setConfirmedBooking(booking);
    return booking;
  };

  const resetBooking = () => {
    setSelectedServices([SERVICES[1]]);
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
        selectedServices,
        addService,
        removeService,
        toggleService,
        clearServices,
        isServiceSelected,
        selectedService,
        setSelectedService,
        totalPrice,
        totalDeposit,
        totalDuration,
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
