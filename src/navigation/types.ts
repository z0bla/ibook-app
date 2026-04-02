import { StackScreenProps } from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  Profile: undefined;
  Categories: undefined;
  SalonsList: { categoryId: string };
};

export type SalonsListScreenProps = StackScreenProps<RootStackParamList>;
