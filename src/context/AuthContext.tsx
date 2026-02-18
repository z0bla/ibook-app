import { createContext, ReactNode, useReducer } from "react";

import {
  AuthState,
  AuthAction,
  AuthContextType,
  LoginCredentials,
  SignupCredentials,
  User,
} from "@/types/auth.types";

import users from "@/data/users.json";
const mockUsers: User[] = users;

const initialState: AuthState = {
  user: undefined,
  isAuthenticated: false,
  error: undefined,
  isLoading: false,
};

// Function to simulate network delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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

  async function login(credentials: LoginCredentials) {
    const { email, password } = credentials;

    dispatch({ type: "CLEAR_ERROR" });
    dispatch({ type: "SET_LOADING", payload: true });

    // Simulate network delay
    await delay(1000);

    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user || user.password !== password) {
      dispatch({ type: "SET_ERROR", payload: "Invalid email or password" });
      return;
    }

    dispatch({ type: "LOGIN", payload: user });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  async function signup(credentials: SignupCredentials) {
    const { email, password, name, phone } = credentials;

    dispatch({ type: "CLEAR_ERROR" });
    dispatch({ type: "SET_LOADING", payload: true });

    // Check if required fields are filled
    if (!email || !password || !name) {
      dispatch({
        type: "SET_ERROR",
        payload: "Please fill out all required fields",
      });
      return;
    }

    // Simulate network delay
    await delay(1000);

    // Check if user with this email already exists
    const existingUser = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (existingUser) {
      dispatch({ type: "SET_ERROR", payload: "User already exists" });
      return;
    }

    const newUser: User = {
      id: String(Math.random()), // TODO: Temporary solution, generate random ID
      email,
      password, // TODO: Encrypt password
      name,
      phone,
      createdAt: new Date().toISOString(),
    };

    // Simulating saving user to database
    mockUsers.push(newUser);

    dispatch({ type: "SIGNUP", payload: newUser });
  }

  function clearError() {
    dispatch({ type: "CLEAR_ERROR" });
  }

  return (
    <AuthStateContext value={state}>
      <AuthDispatchContext value={{ login, logout, signup, clearError }}>
        {children}
      </AuthDispatchContext>
    </AuthStateContext>
  );
}
