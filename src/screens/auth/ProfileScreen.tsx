import { useAuth } from '@/hooks';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';

export default function ProfileScreen() {
  const {
    state: { user },
  } = useAuth();

  if (!user) {
    return <View style={styles.container}>User not found</View>;
  }

  return (
    <ScrollView>
      <View>
        <Avatar.Text size={100} label={user?.name.charAt(0).toUpperCase()} />
      </View>

      <Card>
        <Card.Content>
          <Text>Name:</Text>
          <Text>{user.name}</Text>

          <Text>Email:</Text>
          <Text>{user.email}</Text>

          {user.phone && (
            <>
              <Text>Phone</Text>
              <Text>{user.phone}</Text>
            </>
          )}
        </Card.Content>
      </Card>
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
