import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { SERVICES, type ServiceItem } from '../data/services';
import { SPECIALISTS, getSpecialistPrice, getSpecialistDeposit } from '../data/specialists';

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
  paymentChoice?: 'full' | 'deposit';
  tip?: number;
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
  selectedSpecialistId: string;
  setSelectedSpecialistId: (id: string) => void;
  selectedStaff: string;
  setSelectedStaff: (staff: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  clientDetails: ClientDetails;
  setClientDetails: React.Dispatch<React.SetStateAction<ClientDetails>>;
  confirmedBooking: ConfirmedBooking | null;
  completeBooking: (params?: {
    paymentChoice?: 'full' | 'deposit';
    amountPaid?: number;
    remainingBalance?: number;
    tip?: number;
  }) => ConfirmedBooking;
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

  const [selectedSpecialistId, setSelectedSpecialistIdState] = useState<string>('sandy');
  const [selectedStaff, setSelectedStaff] = useState<string>('Sandy (Founder & Master Artist)');

  const setSelectedSpecialistId = (id: string) => {
    setSelectedSpecialistIdState(id);
    const spec = SPECIALISTS.find((s) => s.id === id);
    if (spec) {
      setSelectedStaff(spec.name);
    }
  };
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
    return selectedServices.reduce((sum, s) => sum + getSpecialistPrice(s, selectedSpecialistId), 0);
  }, [selectedServices, selectedSpecialistId]);

  const totalDeposit = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + getSpecialistDeposit(s, selectedSpecialistId), 0);
  }, [selectedServices, selectedSpecialistId]);

  const totalDuration = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.duration, 0);
  }, [selectedServices]);

  const completeBooking = (params?: {
    paymentChoice?: 'full' | 'deposit';
    amountPaid?: number;
    remainingBalance?: number;
    tip?: number;
  }): ConfirmedBooking => {
    const adjustedServices = selectedServices.map((s) => ({
      ...s,
      price: getSpecialistPrice(s, selectedSpecialistId),
      deposit: getSpecialistDeposit(s, selectedSpecialistId)
    }));
    const primaryService = adjustedServices[0] || SERVICES[0];
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const reference = `SBH-${new Date().getFullYear()}-${randNum}`;

    const choice = params?.paymentChoice || 'deposit';
    const depositPaid = params?.amountPaid !== undefined
      ? params.amountPaid
      : (choice === 'full' ? totalPrice : totalDeposit);
    const remainingBalance = params?.remainingBalance !== undefined
      ? params.remainingBalance
      : (choice === 'full' ? 0 : Math.max(0, totalPrice - totalDeposit));

    const booking: ConfirmedBooking = {
      reference,
      services: [...adjustedServices],
      service: primaryService,
      staff: selectedStaff,
      date: selectedDate,
      time: selectedTime,
      client: { ...clientDetails },
      totalPrice: params?.tip ? totalPrice + params.tip : totalPrice,
      depositPaid,
      remainingBalance,
      totalDuration,
      paymentChoice: choice,
      tip: params?.tip || 0,
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
        selectedSpecialistId,
        setSelectedSpecialistId,
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
