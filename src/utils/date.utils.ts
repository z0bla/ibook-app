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
