import { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const { state, login } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'App' }],
      });
    }
  }, [state.isAuthenticated, navigation]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    console.log('email updated');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    console.log('handleLogin() called:', email, password);
    login({ email, password });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        <Text style={styles.title}>iBook Login</Text>

        <View>
          <TextInput
            style={styles.inputField}
            placeholder="email"
            value={email}
            onChangeText={handleEmailChange}
          />
          <TextInput
            style={styles.inputField}
            placeholder="password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          <Button
            onPress={handleShowPasswordChange}
            title="show/hide password"
          ></Button>
        </View>

        <Pressable onPress={handleLogin}>
          <Text style={styles.button}>Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
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
