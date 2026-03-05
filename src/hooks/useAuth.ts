import { useContext } from 'react';
import { AuthContextType, AuthState } from '@/types/auth.types';
import { AuthStateContext, AuthDispatchContext } from '@/context/AuthContext';

/**
 * Custom hook for accessing AuthContext
 *
 * @returns {AuthContextType} Object containing authorization properties
 */
export function useAuth(): AuthContextType {
  const stateContext = useContext(AuthStateContext);
  const dispatchContext = useContext(AuthDispatchContext);

  if (stateContext === undefined && dispatchContext === undefined)
    throw new Error('Context is being used outside of the Context provider');
  else if (stateContext !== undefined && dispatchContext !== undefined) {
    let { login, logout, signup, clearError } = dispatchContext;
    const res: AuthContextType = {
      state: stateContext,
      login: login,
      signup: signup,
      logout: logout,
      clearError: clearError,
    };
    return res;
  } else {
    throw new Error('Something went wrong!');
  }
}
