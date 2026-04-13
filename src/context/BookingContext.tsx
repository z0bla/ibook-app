import {
  Appointment,
  BookingAction,
  BookingContextType,
  BookingState,
  TimeSlot,
} from '@/types/booking.types';
import { Salon, Service } from '@/types/salon.types';
import salons from '@/data/salons.json';
import services from '@/data/services.json';
import React, { createContext, useReducer } from 'react';
import { useAuth } from '@/hooks';
import { Alert } from 'react-native';
import { readAppointments, updateAppointments } from '@/utils/booking.utils';

/**
 * Initial object for salon
 */
const emptySalon: Salon = {
  id: '',
  categoryId: '',
  name: '',
  address: '',
  phone: '',
  description: '',
  rating: 0,
  reviewCount: 0,
  image: '',
  operatingHours: '',
};
/**
 * initial service object
 */
const emptyService: Service = {
  id: '',
  salonId: '',
  name: '',
  duration: 0,
  price: 0,
};
/**
 * initial timeslot object
 */
const emptyTimeSlot: TimeSlot = {
  id: '',
  time: '',
  available: false,
  booked: false,
};
/**
 * initial booking state object
 */
const initialState: BookingState = {
  selectedSalon: emptySalon,
  selectedService: emptyService,
  selectedDate: new Date(),
  selectedTime: emptyTimeSlot,
  appointments: undefined,
};
/**
 * Finding a salon
 * @param {string} id id of a salon
 * @returns {Salon} an object with the id from argument
 */
function findSalon(id: string): Salon {
  let found = salons.find((salon) => {
    return salon.id === id;
  });
  return found!;
}
/**
 * Finding a service
 * @param {string} id id of a service
 * @returns {Service} object with an id from argument
 */
function findService(id: string): Service {
  let found = services.find((service) => {
    return service.id === id;
  });
  return found!;
}
/**
 *
 * @param {Appointment[]} array current appointments array
 * @param {Appointment} appointment an object to add to the array
 * @returns {Appointment[]} new appointments array with the added one
 */
function addAppointment(
  array: Appointment[] | undefined,
  appointment: Appointment,
): Appointment[] {
  if (array) {
    array.push(appointment);
    return array;
  } else {
    return [appointment];
  }
}
/**
 *
 * @returns {string} a unique Id
 */
const generateId = () => {
  let S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};
/**
 *
 * @param {BookingState} state booking state object
 * @param {BookingAction} action action to be performed
 * @returns {BookingState} booking state updated by action
 */
function bookingReducer(
  state: BookingState,
  action: BookingAction,
): BookingState {
  switch (action.type) {
    case 'RESET_BOOKING': {
      return initialState;
    }
    case 'SELECT_SALON': {
      return { ...state, selectedSalon: findSalon(action.payload) };
    }
    case 'SELECT_SERVICE': {
      return { ...state, selectedService: findService(action.payload) };
    }
    case 'SELECT_DATE': {
      return { ...state, selectedDate: action.payload };
    }
    case 'SELECT_TIME': {
      return { ...state, selectedTime: action.payload };
    }
    case 'ADD_APPOINTMENT': {
      return {
        ...state,
        appointments: addAppointment(state.appointments, action.payload),
      };
    }
    case 'REMOVE_APPOINTMENT': {
      return {
        ...state,
        appointments: state.appointments?.filter((app) => {
          return app.id !== action.payload;
        }),
      };
    }
    default: {
      return state;
    }
  }
}

export const BookingStateContext = createContext<BookingState>(initialState);
export const BookingDispatchContext = createContext<
  Omit<BookingContextType, 'state'> | undefined
>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const authContext = useAuth();

  /**Selecting a Salon
   *
   * @param {string} id id of a salon
   */
  function selectSalon(id: string): void {
    dispatch({ type: 'SELECT_SALON', payload: id });
  }
  /**Selecting a Service
   *
   * @param {string} id id of a service
   */
  function selectService(id: string): void {
    dispatch({ type: 'SELECT_SERVICE', payload: id });
  }
  /**Selecting a Date
   *
   * @param {Date} date date for an appointment
   */
  function selectDate(date: Date): void {
    dispatch({ type: 'SELECT_DATE', payload: date });
  }
  /**Selecting a timeslot
   *
   * @param {TimeSlot} time time for an appointment
   */
  function selectTime(time: TimeSlot): void {
    dispatch({ type: 'SELECT_TIME', payload: time });
  }
  /**Completing the booking flow
   *
   * @returns {Promise<Appointment>} an Appointment object with selected properties
   */
  async function bookAppointment(): Promise<Appointment> {
    if (
      !state.selectedSalon ||
      !state.selectedService ||
      !state.selectedDate ||
      !state.selectedTime
    ) {
      throw new Error('Salon, Service, Time, and Date must be selected!');
    } else {
      let booked: Appointment = {
        id: generateId(),
        userId: authContext.state.user!.id,
        salonId: state.selectedSalon.id,
        serviceId: state.selectedService.id,
        date: state.selectedDate,
        time: state.selectedTime,
        duration: state.selectedService.duration,
        status: 'booked',
        createdAt: new Date().toLocaleString(),
      };
      //adding appointment to async storage
      let apps = readAppointments().catch((e: Error) => {
        throw new Error(e.message);
      });
      await (await apps).push(booked);
      await updateAppointments(await apps);
      //Confirmation of the succesfull booking
      Alert.alert('Your appointment has been booked.');
      return booked;
    }
  }
  /**Canceling an appointment
   *
   * @param {string} id id of an appointment to be canceled
   */
  async function cancelAppointment(id: string) {
    //reading appointments from async storage
    let apps = readAppointments().catch((e: Error) => {
      throw new Error(e.message);
    });
    //finding the appointment requested for deleting
    let app = (await apps).find((a) => a.id === id);
    //removing requested appointment and updating appointments array in async storage
    if (app) {
      (await apps).filter((a) => a.id !== id);
      updateAppointments(await apps).then((data) =>
        Alert.alert('Appointment succesfully cancelled.'),
      );
    } else throw new Error('Appointment does not exist');
  }
  /**Resetting the booking flow, that is, updating booking state to initial state object
   *
   */
  function resetBooking() {
    dispatch({ type: 'RESET_BOOKING' });
  }

  return (
    <BookingStateContext value={state}>
      <BookingDispatchContext
        value={{
          selectSalon,
          selectService,
          selectDate,
          selectTime,
          bookAppointment,
          cancelAppointment,
          resetBooking,
        }}
      >
        {children}
      </BookingDispatchContext>
    </BookingStateContext>
  );
}
