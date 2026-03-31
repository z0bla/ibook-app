import { View, Text, StyleSheet } from 'react-native';

import { useAuth } from '@/hooks/useAuth';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesScreen from './categories/CategoriesScreen';
import SalonsListScreen from './categories/SalonsListScreen';
import { RootStackParamList } from '@/navigation/types';

export default function AppNavigator() {
  /* const { state } = useAuth(); */

  /* return (
    <View style={styles.container}>
      <Text>Main App</Text>
      {state.user && <Text>Welcome, {state.user.name}!</Text>}
    </View>
  ); */
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Salons" component={SalonsListScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
