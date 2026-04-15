import { BookingStackParamList, AppTabParamList } from '@/navigation/types';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './auth/ProfileScreen';
import CategoriesScreen from './categories/CategoriesScreen';
import SalonsListScreen from './categories/SalonsListScreen';

const Stack = createStackNavigator<BookingStackParamList>();
const Stack2 = createStackNavigator<AppTabParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack2.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="SalonsList" component={SalonsListScreen} />
    </Stack.Navigator>
  );
}
