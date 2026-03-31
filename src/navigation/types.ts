import { StackScreenProps } from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  Categories: undefined;
  Salons: { categoryId: string };
};

export type Props = StackScreenProps<RootStackParamList>;
