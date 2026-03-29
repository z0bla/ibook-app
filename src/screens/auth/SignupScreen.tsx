import { useAuth } from '@/hooks';
<<<<<<< HEAD
import { SignupCredentials } from '@/types/auth.types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
=======
import { SignupCredentials, User } from '@/types/auth.types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
>>>>>>> 11b18f820f2e14dd94fba53058db322b5e6e18ca
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Button, TextInput, Text, ProgressBar } from 'react-native-paper';

/**
 * A component for creating a new user
 *
 * @returns {JSX.Element}
 */
export default function SignupScreen() {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmVisibility, setConfirmVisibility] = useState(false);

  const { state, signup, clearError } = useAuth();
  const navigation = useNavigation();
  //Making sure that error gets cleared when screens switch
  useFocusEffect(
    useCallback(() => {
      return () => {
        clearError();
      };
    }, []),
  );
  //Password validation
  function validatePassword(pass: string): void {
    let progress = 0.1;
    const reg1 = /\d+/;
    const reg2 = /[^A-Za-z0-9]+/;
    if (pass.length > 7) progress += 0.3;
    if (reg1.test(pass)) progress += 0.3;
    if (reg2.test(pass)) progress += 0.3;
    setProgress(progress);
  }
  //Changing colors on progress bar
  function pickColor(progress: number): string {
    switch (progress) {
      case 0.1:
        return 'red';
        break;
      case 0.4:
        return 'orange';
        break;
      case 0.7:
        return 'yellow';
        break;
      case 1:
        return 'green';
        break;
      default:
        return 'black';
    }
  }
  //Signup handler
  function handleSignup() {
    if (
      !nameError &&
      !emailError &&
      !phoneError &&
      password.length > 5 &&
      confirmPassword === password
    ) {
      let credo: SignupCredentials = { email, password, name, phone };
      signup(credo);
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {state.error && <Text style={styles.errorMessage}>{state.error}</Text>}
      <Text variant="labelLarge">Name:</Text>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
        mode="outlined"
        onBlur={() => {
          name.length > 2 || name.length > 15
            ? setNameError(false)
            : setNameError(true);
        }}
        outlineColor={nameError ? 'red' : 'gray'}
      />
      <Text>{nameError && 'Name is too short. Minimum 3 letters.'}</Text>
      <Text variant="labelLarge">Email:</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        onBlur={() =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)
            ? setEmailError(false)
            : setEmailError(true)
        }
        outlineColor={emailError ? 'red' : 'gray'}
      />
      <Text>{emailError && 'Email is invalid'}</Text>
      <Text variant="labelLarge">Phone number:</Text>
      <TextInput
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        mode="outlined"
        onBlur={() => {
          let regex = /^\d{3}\/?\d{3}\-?\d{3,4}$/;
          regex.test(phone) ? setPhoneError(false) : setPhoneError(true);
        }}
        outlineColor={phoneError ? 'red' : 'gray'}
      />
      <Text>{phoneError && 'Invalid phone number'}</Text>
      <Text variant="labelLarge">Password:</Text>
      <TextInput
        placeholder="Enter your password"
        secureTextEntry={!passwordVisibility}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          validatePassword(text);
        }}
        mode="outlined"
        outlineColor={password.length < 8 ? 'red' : 'gray'}
        right={
          <TextInput.Icon
            icon={passwordVisibility ? 'eye-off' : 'eye'}
            onPress={() =>
              setPasswordVisibility(passwordVisibility ? false : true)
            }
          />
        }
      />
      <Text>
        {password.length < 6 && 'Password must have minimum 6 characters'}
      </Text>
      <ProgressBar progress={progress} color={pickColor(progress)} />
      <Text variant="labelLarge">Confirm Password:</Text>
      <TextInput
        placeholder="Confirm your password"
        secureTextEntry={!confirmVisibility}
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
        mode="outlined"
        outlineColor={password != confirmPassword ? 'red' : 'gray'}
        right={
          <TextInput.Icon
            icon={confirmVisibility ? 'eye-off' : 'eye'}
            onPress={() =>
              setConfirmVisibility(confirmVisibility ? false : true)
            }
          />
        }
      />
      <Text>{password != confirmPassword && 'Both passwords must match!'}</Text>
      <Button
        mode="contained"
        onPress={handleSignup}
        loading={state.isLoading}
        disabled={state.isLoading}
      >
        Sign Up
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Login' as never)}
      >
        Already have an account? Log in!
      </Button>
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
