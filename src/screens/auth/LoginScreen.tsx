import { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      LoginScreen
    </View>
  );
}
