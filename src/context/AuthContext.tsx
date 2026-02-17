import { AuthState, AuthAction } from "@/types/auth.types";

const initialState: AuthState = {
  user: undefined,
  isAuthenticated: false,
  error: undefined,
  isLoading: false,
};
