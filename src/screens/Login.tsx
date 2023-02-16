import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';
import useAuth from '../hooks/useAuth';
import { AuthConsumer } from '../store/authContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  registerContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  registerTitle: {
    fontSize: 18,
  },
  registerLink: {
    marginLeft: 5,
    fontSize: 18,
    color: colors.primary,
  },
});

const Login = () => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { login, errors, credentials, setCredentials } = useAuth();
  const { registered, removeUser } = AuthConsumer();

  useEffect(() => {
    if (!registered) navigate('Register');
  }, [registered]);

  return (
    <View style={styles.container}>
      <TextInput
        label="Email Address"
        placeholder="Enter your email..."
        value={credentials.email}
        onChangeText={(text: string) =>
          setCredentials({ ...credentials, email: text })
        }
        errorText={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password..."
        value={credentials.password}
        onChangeText={(text: string) =>
          setCredentials({ ...credentials, password: text })
        }
        secureTextEntry
        errorText={errors.password}
        autoCapitalize="none"
      />
      <Button
        onPress={async () => {
          await login();
        }}
      >
        Sign In
      </Button>
      <TouchableOpacity
        style={styles.registerContainer}
        onPress={async () => {
          await removeUser();
          navigate('Register');
        }}
      >
        <Text style={styles.registerTitle}>Don't have an account yet? </Text>
        <Text style={styles.registerLink}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
