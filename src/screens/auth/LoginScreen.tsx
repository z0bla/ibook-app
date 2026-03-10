import { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button, Text } from 'react-native-paper';

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

    if (state.error) {
      clearError();
    }

    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    if (state.error) {
      clearError();
    }

    if (passwordError) {
      setPasswordError('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    console.log('handleForgotPassword()');
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
            placeholder="email"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={validateEmail}
          />
          {emailError ? <Text>{emailError}</Text> : null}
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={togglePasswordVisibility}
              />
            }
          />
          {passwordError ? <Text>{passwordError}</Text> : null}
          <Button onPress={handleForgotPassword}>Forgot password?</Button>
        </View>

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={state.isLoading}
          disabled={state.isLoading}
        >
          Log in
        </Button>

        <Button mode="outlined" onPress={handleSignup}>
          Don&apos;t have an account? Sign up
        </Button>
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
});
