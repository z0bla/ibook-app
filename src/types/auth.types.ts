/**
 * User interface represents a registered user in the system
 */
export interface User {
  id: string;            // Unique identifier
  email: string;         // Email address
  password: string;      // Hashed password
  name: string;          // Full name
  phone?: string;        // Optional phone number
  createdAt: string;     // ISO date of account creation
  lastLogin?: string;    // Optional ISO date of last login
}

/**
 * LoginCredentials represents the data sent by the user to log in
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * SignupCredentials represents the data sent by the user to register
 */
export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

/**
 * AuthState represents the state inside AuthContext
 */
export interface AuthState {
  user?: User;
  isAuthenticated: boolean;
  error?: string;
}

/**
 * AuthAction represents actions for the auth reducer
 */
export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SIGNUP'; payload: User }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

/**
 * AuthContextType defines all methods and state exposed by AuthContext
 */
export interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
