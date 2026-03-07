import { View, Text, StyleSheet } from 'react-native';

export default function AppNavigator() {
  return (
    <View style={styles.container}>
      <Text>Main App</Text>
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
