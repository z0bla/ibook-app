import { useAuth } from '@/hooks';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function ProfileScreen() {
  const {
    state: { user },
  } = useAuth();

  if (!user) {
    return <View style={styles.container}>User not found</View>;
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Avatar.Text size={100} label={user?.name.charAt(0).toUpperCase()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
});
