import { RootStackParamList } from '@/navigation/types';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './auth/ProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
