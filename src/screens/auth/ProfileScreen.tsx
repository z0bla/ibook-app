import { useAuth } from '@/hooks';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function ProfileScreen() {
  const {
    state: { user },
    logout,
  } = useAuth();

  if (!user) {
    return <View style={styles.container}>User not found</View>;
  }

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile not yet available');
  };

  const handleViewAppointments = () => {
    Alert.alert('View Appointments', 'View appointments not yet available');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => logout() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Text size={100} label={user?.name.charAt(0).toUpperCase()} />
      </View>

      <Card style={styles.userInfoContainer}>
        <Card.Content>
          <Text style={{ ...styles.label, marginTop: 0 }}>Name:</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>

          {user.phone && (
            <>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{user.phone}</Text>
            </>
          )}
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={handleEditProfile}>
          Edit Profile
        </Button>

        <Button mode="outlined" onPress={handleViewAppointments}>
          View Appointments
        </Button>

        <Button mode="contained" onPress={handleLogout}>
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
  },
  buttonContainer: {
    gap: 10,
  },
});
