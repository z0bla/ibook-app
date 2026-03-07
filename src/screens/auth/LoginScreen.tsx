import { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});
