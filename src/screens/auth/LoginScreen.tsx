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

    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(email)) {
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

        {state.error && <Text style={styles.errorMessage}>{state.error}</Text>}

        <View>
          <TextInput
            label="Email"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={validateEmail}
            keyboardType="email-address"
            error={!!emailError}
            mode="outlined"
          />
          {emailError ? (
            <Text style={styles.errorMessage}>{emailError}</Text>
          ) : null}
          <TextInput
            label="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            error={!!passwordError}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={togglePasswordVisibility}
              />
            }
          />
          {passwordError ? (
            <Text style={styles.errorMessage}>{passwordError}</Text>
          ) : null}
          <Button mode="text" onPress={handleForgotPassword}>
            Forgot password?
          </Button>
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
  errorMessage: {
    color: '#c62828',
    marginBottom: 12,
    marginTop: 4,
  },
});
