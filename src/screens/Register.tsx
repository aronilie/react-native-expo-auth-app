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

const Register = () => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { register, errors, credentials, setCredentials, user, setUser } =
    useAuth();
  const { registered } = AuthConsumer();

  useEffect(() => {
    if (registered) navigate('Login');
  }, [registered]);

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        placeholder="Enter your name..."
        value={user.name}
        onChangeText={(text: string) => setUser({ ...user, name: text })}
        errorText={errors.name}
        autoCapitalize="none"
      />
      <TextInput
        label="Surname"
        placeholder="Enter your surname..."
        value={user.surname}
        onChangeText={(text: string) => setUser({ ...user, surname: text })}
        errorText={errors.surname}
        autoCapitalize="none"
      />
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
          await register();
        }}
      >
        Register
      </Button>
      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => navigate('Login')}
      >
        <Text style={styles.registerTitle}>Already have an account? </Text>
        <Text style={styles.registerLink}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
