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
      <Text style={styles.title}>iBook Login</Text>

      <View>
        <TextInput style={styles.inputField} placeholder="email" />
        <TextInput style={styles.inputField} placeholder="password" />
      </View>

      <Pressable>
        <Text style={styles.button}>Login</Text>
      </Pressable>
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
  inputField: {
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#444',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
  },
});
