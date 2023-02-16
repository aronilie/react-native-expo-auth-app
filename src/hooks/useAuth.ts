import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dispatch, SetStateAction, useState } from 'react';
import { Alert } from 'react-native';
import { User } from '../models/User';
import { AuthConsumer } from '../store/authContext';

type ErrorType = {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
};

const useAuth = () => {
  const userInitialState = {
    name: '',
    surname: '',
  };

  const credentialsInitialState = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(userInitialState);
  const [credentials, setCredentials] = useState(credentialsInitialState);
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    useState({});

  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { authenticateUser, registerUser } = AuthConsumer();

  const areEmptyFields = (type?: string) => {
    const nextErrors: ErrorType = {};
    if (type === 'register') {
      if (user.name.length === 0) nextErrors.name = 'This field is required.';
      if (user.surname.length === 0)
        nextErrors.surname = 'This field is required.';
    }
    if (credentials.email.length === 0)
      nextErrors.email = 'This field is required.';

    if (credentials.password.length === 0)
      nextErrors.password = 'This field is required.';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return true;
    }

    return false;
  };

  const register = async () => {
    if (areEmptyFields('register')) return null;

    try {
      await AsyncStorage.setItem(
        '@user_data',
        JSON.stringify({ ...user, ...credentials }),
      );
      await AsyncStorage.setItem('@registration', 'true');

      registerUser({ ...user, ...credentials });
      navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong, try again later.');
    }

    return null;
  };

  const login = async () => {
    if (areEmptyFields()) return null;

    try {
      const userStored = await AsyncStorage.getItem('@user_data');
      if (userStored) {
        const userRegistered: User = JSON.parse(userStored);
        if (
          credentials.email === userRegistered.email &&
          credentials.password === userRegistered.password
        ) {
          await AsyncStorage.setItem('@log', 'true');
          authenticateUser();
        } else {
          console.log('error');
          throw new Error('401');
        }
      } else {
        console.log('error');
        throw new Error('404');
      }
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        if ((error as { message: string }).message === '401') {
          Alert.alert('Error', 'Invalid email or password.');
        } else if ((error as { code: string }).code === '404') {
          Alert.alert('Error', 'Seems that the user not exists.');
        } else {
          Alert.alert('Error', 'Something went wrong, try again later');
        }
      }
    }

    return null;
  };

  return {
    register,
    login,
    errors,
    credentials,
    setCredentials,
    user,
    setUser,
  };
};

export default useAuth;
