import { Appointment } from './booking.types';

/** Type representing a notification */
export interface Notification {
  id: string;
  appointmentdId: string;
  type: '24_hours' | '1_hour';
  scheduledTime: Date;
  sent: boolean;
  message: string;
}

/** Type represening a notification state */
export interface NotificationState {
  notifications: Notification[];
  permissionStatus: 'undetermined' | 'granted' | 'denied';
}

/** Type representing a notification context */
export interface NotificationContextType {
  state: NotificationState;
  scheduleNotifications: (appointment: Appointment) => Promise<void>;
  cancelNotifications: (appointmentId: string) => Promise<void>;
  requestPermission: () => Promise<boolean>;
}
