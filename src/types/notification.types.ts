import { Appointment } from './booking.types';

/** Type representing a notification */
export interface Notification {
  id: string; // notification identifier
  appointmentdId: string; // appointment identifier this notification belongs to
  type: '24_hours' | '1_hour'; // notification type
  scheduledTime: Date; // date/time when notification should be shown
  sent: boolean; // whether notification has been sent
  message: string; // notification text displayed to user
}

/** Type representing a notification state */
export interface NotificationState {
  notifications: Notification[]; // notification records
  permissionStatus: 'undetermined' | 'granted' | 'denied'; // whether notification permission is undetermined, granted, or denied by user
}

/** Type representing a notification context */
export interface NotificationContextType {
  state: NotificationState;
  scheduleNotifications: (appointment: Appointment) => Promise<void>;
  cancelNotifications: (appointmentId: string) => Promise<void>;
  requestPermission: () => Promise<boolean>;
}
