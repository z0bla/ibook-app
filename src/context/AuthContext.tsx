import { AuthState, AuthAction } from "@/types/auth.types";

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
