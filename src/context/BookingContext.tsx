import { BookingState, TimeSlot } from '@/types/booking.types';
import { Salon, Service } from '@/types/salon.types';

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
const emptyService: Service = {
  id: '',
  salonId: '',
  name: '',
  duration: 0,
  price: 0,
};
const emptyTimeSlot: TimeSlot = {
  id: '',
  time: '',
  available: false,
  booked: false,
};
const initialState: BookingState = {
  selectedSalon: emptySalon,
  selectedService: emptyService,
  selectedDate: new Date(),
  selectedTime: '',
  appointments: undefined,
};
