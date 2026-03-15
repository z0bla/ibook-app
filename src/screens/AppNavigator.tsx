import { View, Text, StyleSheet } from 'react-native';

import { useAuth } from '@/hooks/useAuth';

export default function AppNavigator() {
  const { state } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Main App</Text>
      {state.user && <Text>Welcome, {state.user.name}!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
