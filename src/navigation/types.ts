import { StackScreenProps } from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  Loading: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Categories: undefined;
  Appointments: undefined;
  Profile: undefined;
};

export type BookingStackParamList = {
  Categories: undefined;
  SalonsList: { categoryId: string };
  SalonDetail: { salonId: string };
  Calendar: undefined;
  SelectTime: undefined;
  Confirmation: undefined;
  Success: undefined;
};

export type AppointmentStackParamList = {
  AppointmentDetail: { appointmentId: string };
};

export type SalonsListScreenProps = StackScreenProps<
  BookingStackParamList,
  'SalonsList'
>;
export type SalonDetailScreenProps = StackScreenProps<
  BookingStackParamList,
  'SalonDetail'
>;
