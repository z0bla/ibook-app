import { createContext, ReactNode, useReducer } from 'react';

import { loginUser, signupUser } from '@/services/auth.service';
import { delay, validatePassword } from '@/utils/auth.utils';
import {
  AuthState,
  AuthAction,
  AuthContextType,
  LoginCredentials,
  SignupCredentials,
} from '@/types/auth.types';

const initialState: AuthState = {
  user: undefined,
  isAuthenticated: false,
  error: undefined,
  isLoading: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    // Same state returned for both LOGIN and SIGNUP actions
    case 'LOGIN':
    case 'SIGNUP': {
      return {
        user: action.payload,
        isAuthenticated: true,
        error: undefined,
        isLoading: false,
      };
    }

    // Reset state to the default/initial state
    case 'LOGOUT': {
      return initialState;
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    case 'CLEAR_ERROR': {
      return {
        ...state,
        error: undefined,
      };
    }

    case 'SET_LOADING': {
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
  Omit<AuthContextType, 'state'> | undefined
>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  async function login(credentials: LoginCredentials) {
    dispatch({ type: 'CLEAR_ERROR' });
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate network delay
    await delay(1000);

    try {
      const user = await loginUser(credentials);
      dispatch({ type: 'LOGIN', payload: user });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload:
          error instanceof Error ? error.message : 'Something went wrong.',
      });
    }
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
  }

  async function signup(credentials: SignupCredentials) {
    const { email, password, name } = credentials;
    // Check if required fields are filled
    if (!email || !password || !name) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Please fill out all required fields.',
      });
      return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      dispatch({ type: 'SET_ERROR', payload: passwordError });
      return;
    }
    dispatch({ type: 'CLEAR_ERROR' });
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate network delay
    await delay(1000);

    try {
      const user = await signupUser(credentials);

      dispatch({ type: 'SIGNUP', payload: user });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload:
          error instanceof Error ? error.message : 'Something went wrong.',
      });
    }
  }

  function clearError() {
    dispatch({ type: 'CLEAR_ERROR' });
  }

  return (
    <AuthStateContext value={state}>
      <AuthDispatchContext value={{ login, logout, signup, clearError }}>
        {children}
      </AuthDispatchContext>
    </AuthStateContext>
  );
}
