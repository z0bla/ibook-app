import { Appointment, TimeSlot } from '@/types/booking.types';

const time1: TimeSlot = {
  id: '1',
  time: '09:00',
  available: false,
  booked: true,
};

const appo1: Appointment = {
  id: '1',
  userId: '1',
  salonId: '1',
  serviceId: '1',
  date: new Date('2026-05-12T07:00:00'),
  time: time1,
  duration: 45,
  status: 'booked',
  createdAt: new Date().toDateString(),
};
const time2: TimeSlot = {
  id: '2',
  time: '13:00',
  available: false,
  booked: true,
};

const appo2: Appointment = {
  id: '2',
  userId: '1',
  salonId: '1',
  serviceId: '1',
  date: new Date('2026-05-12T07:00:00'),
  time: time2,
  duration: 45,
  status: 'booked',
  createdAt: new Date().toDateString(),
};

export const appos: Appointment[] = [appo1, appo2];
