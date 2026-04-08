import { addDays, format, startOfToday } from 'date-fns';

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
