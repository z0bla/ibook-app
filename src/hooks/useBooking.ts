import { useContext } from 'react';
import { BookingContextType } from '@/types/booking.types';
import {
  BookingDispatchContext,
  BookingStateContext,
} from '@/context/BookingContext';

/**
 * Custom hook for accessing BookingContext
 *
 * @returns {BookingContextType} Object containing booking state and methods
 */
export function useBooking(): BookingContextType {
  const stateContext = useContext(BookingStateContext);
  const dispatchContext = useContext(BookingDispatchContext);

  if (stateContext === undefined && dispatchContext === undefined)
    throw new Error('Context is being used outside of the Context provider');
  else if (stateContext !== undefined && dispatchContext !== undefined) {
    let {
      selectSalon,
      selectService,
      selectDate,
      selectTime,
      bookAppointment,
      cancelAppointment,
      resetBooking,
    } = dispatchContext;
    const res: BookingContextType = {
      state: stateContext,
      selectSalon: selectSalon,
      selectService: selectService,
      selectDate: selectDate,
      selectTime: selectTime,
      bookAppointment: bookAppointment,
      cancelAppointment: cancelAppointment,
      resetBooking: resetBooking,
    };
    return res;
  } else {
    throw new Error('Something went wrong!');
  }
}
