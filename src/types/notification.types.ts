/** Type representing a notification */
export interface Notification {
  id: string;
  appointmentdId: string;
  type: '24_hours' | '1_hour';
  scheduledTime: Date;
  sent: boolean;
  message: string;
}
