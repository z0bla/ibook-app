import { addWeeks, eachDayOfInterval, format, isSameDay } from 'date-fns';

import { Salon, Service } from '@/types/salon.types';

export function formatDate(date: Date): string {
  return format(date, 'EEE, MMM d');
}

export function getNext4Weeks(): Date {
  const today = Date.now();
  return addWeeks(today, 4);
}

export function getTimeSlots(
  startTime: string,
  endTime: string,
  durationMinutes: number,
): string[] {
  const slots: string[] = [];

  // Parse start time
  const [startHour, startMinute] = startTime.split(':').map(Number);

  // Parse end time
  const [endHour, endMinute] = endTime.split(':').map(Number);

  // Calculate total minutes from midnight
  let currentMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  // Generate slots
  while (currentMinutes + durationMinutes <= endMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;

    const slot = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    slots.push(slot);

    currentMinutes += durationMinutes;
  }

  return slots;
}

export function isSameDayAs(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}

export function getOperatingHours(
  salon: Salon,
  dayOfWeek: string,
): string | null {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // If wrong day
  if (!days.includes(dayOfWeek)) {
    return null;
  }

  const hours: string[] = salon.operatingHours;

  let hour = hours.find((h) => {
    return h.includes(dayOfWeek);
  });
  if (!hour) {
    return null;
  } else {
    return hour;
  }
}

export function generateAvailableSlots(
  salon: Salon,
  service: Service,
  date: Date,
): string[] {
  // Get day of week from provided date
  const dayOfWeek = format(date, 'EEE');

  // Get operating hours for day
  let hours = getOperatingHours(salon, dayOfWeek);
  // If closed on that day, return empty array
  if (hours === null) {
    return [];
  }
  hours = hours.split(' ')[1];
  // Parse hours
  const [startTime, endTime] = hours.split('-');
  // Generate available slots
  return getTimeSlots(startTime, endTime, service.duration);
}

export function calculateSlotEndTime(
  startTime: string,
  durationMinutes: number,
): string {
  // Parse hours and minutes
  const [hours, minutes] = startTime.split(':').map(Number);

  // Total minutes passed in the day at the end of slot time
  const totalMinutes = hours * 60 + minutes + durationMinutes;

  // Calculate end hours and minutes
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;

  // Return formatted end time string
  return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
}

export function getWorkingDays(
  salon: Salon,
  startDate: Date,
  endDate: Date,
): Date[] {
  let resDays: Date[] = [];
  const daysOfWeek: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
  //get days of the week when the salon is working
  let dayRange: number[] = [];
  salon.operatingHours.forEach((op) => {
    dayRange.push(daysOfWeek.indexOf(op.split(' ')[0]));
  });
  let interval: Date[] = eachDayOfInterval({ start: startDate, end: endDate });

  resDays = interval.filter((day) => dayRange.includes(day.getDay()));
  return resDays;
}
export function checkIntervalOverlap(
  t1: string,
  t2: string,
  duration: number,
): boolean {
  const end1 = calculateSlotEndTime(t1, duration);
  const end2 = calculateSlotEndTime(t2, duration);
  return (
    (t1 >= t2 && t1 < end2) ||
    (end1 > t2 && end1 <= end2) ||
    (t2 >= t1 && t2 < end1) ||
    (end2 > t1 && end2 <= end1)
  );
}
