import { createContext, ReactNode, useReducer } from "react";

import {
  AuthState,
  AuthAction,
  AuthContextType,
  LoginCredentials,
  SignupCredentials,
} from "@/types/auth.types";

const initialState: AuthState = {
  user: undefined,
  isAuthenticated: false,
  error: undefined,
  isLoading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    // Same state returned for both LOGIN and SIGNUP actions
    case "LOGIN":
    case "SIGNUP": {
      return {
        user: action.payload,
        isAuthenticated: true,
        error: undefined,
        isLoading: false,
      };
    }

    // Reset state to the default/initial state
    case "LOGOUT": {
      return initialState;
    }

    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    case "CLEAR_ERROR": {
      return {
        ...state,
        error: undefined,
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    // No matching actions
    default: {
      return state;
    }
  }
}

export const AuthStateContext = createContext<AuthState | undefined>(undefined);

export const AuthDispatchContext = createContext<
  Omit<AuthContextType, "state"> | undefined
>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  async function login(credentials: LoginCredentials) {}

  function logout() {}

  async function signup(credentials: SignupCredentials) {}

  function clearError() {}

  return (
    <AuthStateContext value={state}>
      <AuthDispatchContext value={{ login, logout, signup, clearError }}>
        {children}
      </AuthDispatchContext>
    </AuthStateContext>
  );
}
