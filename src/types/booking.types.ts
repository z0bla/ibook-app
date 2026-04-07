import { Salon, Service } from './salon.types';

/**Type for time slot
 * @interface
 */
export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  booked: boolean;
}
/**Type for appointment
 * @interface
 */
export interface Appointment {
  id: string; //apointment identifier
  userId: string; //user identifier
  salonId: string; //salon identifier
  serviceId: string; //service identifier
  date: Date; //date of the appointment
  time: TimeSlot; //time of the appointment
  duration: number; //duration of the service
  status: string; //status of the appointment
  createdAt: string; //time of the creation of the appointment
}
/**Type for booking state
 * @interface
 */
export interface BookingState {
  selectedSalon: Salon; //booked salon
  selectedService: Service; //booked service
  selectedDate: Date; //date
  selectedTime: TimeSlot; //time
  appointments?: Appointment[]; //appointments array
}
/**Type for booking context
 * @interface
 */
export interface BookingContextType {
  /**
   * Booking state object
   */
  state: BookingState;
  /** method for selecting a salon
   * @param {string} id id for selecting a salon
   */
  selectSalon: (id: string) => void;
  /**method for selecting a Service
   *
   * @param {string} id id for selecting a service
   */
  selectService: (id: string) => void;
  /**method for selecting a date for an appointment
   *
   * @param {Date} selected date
   */
  selectDate: (date: Date) => void;
  /**method for selecting time for an appointment
   *
   * @param {Timeslot} time for an appointment
   */
  selectTime: (time: TimeSlot) => void;
  /**method for creating an Appointment object
   *
   * @returns {Appointment} created Appointment object
   */
  bookAppointment: () => Promise<Appointment>;
  /**Canceling an existing appointment
   *
   * @param {string} id of an appointment to cancel
   * @returns
   */
  cancelAppointment: (id: string) => Promise<void>;
  /**resetting the booking flow
   *
   * @returns
   */
  resetBooking: () => void;
}

export type BookingAction =
  | { type: 'SELECT_SALON'; payload: string }
  | { type: 'SELECT_SERVICE'; payload: string }
  | { type: 'SELECT_DATE'; payload: Date }
  | { type: 'SELECT_TIME'; payload: TimeSlot }
  | { type: 'ADD_APPOINTMENT'; payload: Appointment }
  | { type: 'REMOVE_APPOINTMENT'; payload: string }
  | { type: 'RESET_BOOKING' };
