import { useAuth } from '@/hooks';
import { StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  const {
    state: { user },
  } = useAuth();

  if (!user) {
    return <View style={styles.container}>User not found</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
});
