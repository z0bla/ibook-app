import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
<<<<<<< HEAD
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider } from '@/context/AuthContext';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignupScreen from '@/screens/auth/SignupScreen';
import AppNavigator from '@/screens/AppNavigator';

const Stack = createStackNavigator();
=======

import { AuthProvider } from '@/context/AuthContext';
import RootNavigator from './navigation/RootNavigator';
>>>>>>> 11b18f820f2e14dd94fba53058db322b5e6e18ca

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
<<<<<<< HEAD
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="App" component={AppNavigator} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
=======
        <RootNavigator />
>>>>>>> 11b18f820f2e14dd94fba53058db322b5e6e18ca
      </NavigationContainer>
    </AuthProvider>
  );
}
