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
  const { state, login, clearError } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (state.isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'App' } as never],
      });
    }
  }, [state.isAuthenticated, navigation]);

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }

    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    console.log('email updated');
    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      login({ email, password });
    }
  };

  const handleSignup = () => {
    navigation.navigate('Signup' as never);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        <Text style={styles.title}>iBook Login</Text>

        {state.error && <Text>{state.error}</Text>}

        <View>
          <TextInput
            style={styles.inputField}
            placeholder="email"
            value={email}
            onChangeText={handleEmailChange}
          />
          {emailError ? <Text>{emailError}</Text> : null}
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
          {passwordError ? <Text>{passwordError}</Text> : null}
        </View>

        <Pressable
          style={styles.button}
          onPress={handleLogin}
          disabled={state.isLoading}
        >
          {state.isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log in</Text>
          )}
        </Pressable>

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>
            Don&apos;t have an account? Sign up
          </Text>
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
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
