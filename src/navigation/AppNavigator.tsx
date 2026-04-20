import { AppTabParamList, BookingStackParamList } from '@/navigation/types';
import ProfileScreen from '@/screens/auth/ProfileScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import CategoriesScreen from '@/screens/categories/CategoriesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UpcomingAppointmentsScreen from '@/screens/appointments/UpcomingAppointmentsScreen';
import { Icon } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import SalonsListScreen from '@/screens/categories/SalonsListScreen';
import SalonDetailScreen from '@/screens/categories/SalonDetailScreen';
import { useAuth } from '@/hooks';
import CalendarScreen from '@/screens/booking/CalendarScreen';
import { BookingProvider } from 'src/context/BookingContext';

const Tabs = createBottomTabNavigator<AppTabParamList>();

export default function AppNavigator() {
  const cont = useAuth();
  const number = cont.state.user!.name.length;

  function BrowseStack() {
    const Stack = createStackNavigator<BookingStackParamList>();
    return (
      <Stack.Navigator>
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="SalonsList" component={SalonsListScreen} />
        <Stack.Screen name="SalonDetail" component={SalonDetailScreen} />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ title: 'Select Date' }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <BookingProvider>
      <Tabs.Navigator screenOptions={{ tabBarLabelPosition: 'below-icon' }}>
        <Tabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? 'home' : 'home-outline';
              return <Icon source={iconName} color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name="Browse"
          component={BrowseStack}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? 'magnify-plus' : 'magnify';
              return <Icon source={iconName} color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name="Appointments"
          component={UpcomingAppointmentsScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? 'calendar' : 'calendar-outline';
              return <Icon source={iconName} color={color} size={size} />;
            },
            tabBarBadge: number, //dummy number as a length from users name
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = focused ? 'account' : 'account-outline';
              return <Icon source={iconName} color={color} size={size} />;
            },
          }}
        />
      </Tabs.Navigator>
    </BookingProvider>
  );
}
