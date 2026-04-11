import { addDays, format, isSameDay, startOfToday } from 'date-fns';

import { Salon } from '@/types/salon.types';

export function formatDate(date: Date): string {
  return format(date, 'EEE, MMM d');
}

export function getNext4Weeks(): Date[] {
  const today = startOfToday();
  const weeks: Date[] = [];

  for (let i = 0; i < 28; i++) {
    weeks.push(addDays(today, i));
  }

  return weeks;
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

  const [dayRange, hours] = salon.operatingHours.split(' ');

  if (dayRange.includes('-')) {
    // More than one working day per week, e.g. Mon-Fri
    const [startDay, endDay] = dayRange.split('-');
    const startDayIndex = days.indexOf(startDay);
    const endDayIndex = days.indexOf(endDay);
    const dayIndex = days.indexOf(dayOfWeek);

    if (dayIndex >= startDayIndex && dayIndex <= endDayIndex) {
      return hours;
    } else {
      return null;
    }
  } else {
    // Only one working day per week, eg. Sat
    return dayRange === dayOfWeek ? hours : null;
  }
}
