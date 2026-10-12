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
