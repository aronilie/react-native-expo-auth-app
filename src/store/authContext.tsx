/* eslint-disable no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { User } from '../models/User';

const useAuth = () => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const [registered, setRegistered] = useState<boolean>(false);
  const [authed, setAuthed] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    (async () => {
      const userRegistered = await AsyncStorage.getItem('@registration');
      const userLogged = await AsyncStorage.getItem('@log');
      const userStored = await AsyncStorage.getItem('@user_data');
      if (userRegistered) setRegistered(true);
      if (userLogged) setAuthed(true);
      if (userStored) setUser(JSON.parse(userStored));
    })();
  }, []);

  const authenticateUser = () => {
    setAuthed(true);
  };

  const logout = async () => {
    try {
      setAuthed(false);
      await AsyncStorage.removeItem('@log');
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = (user: User) => {
    setRegistered(true);
    setUser(user);
  };

  const removeUser = async () => {
    try {
      await logout();
      setRegistered(false);
      await AsyncStorage.removeItem('@registration');
      await AsyncStorage.removeItem('@user_data');
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (userReceived: { name: string; surname: string }) => {
    let updatedUser;
    setUser(prevUser => {
      updatedUser = { ...prevUser };
      if (userReceived.name && userReceived.name.length > 0) {
        updatedUser.name = userReceived.name;
      }
      if (userReceived.surname && userReceived.surname.length > 0) {
        updatedUser.surname = userReceived.surname;
      }
      return updatedUser;
    });

    try {
      await AsyncStorage.setItem('@user_data', JSON.stringify(updatedUser));
      Alert.alert('Info', 'User modified successfully');
      navigate('Home');
    } catch {
      Alert.alert("The user couldn't be modified.");
    }
  };

  return {
    authenticateUser,
    logout,
    authed,
    registerUser,
    removeUser,
    registered,
    user,
    editUser,
  };
};

export const AuthContext = createContext<{
  authenticateUser: () => void;
  logout: () => void;
  authed: boolean;
  registerUser: (user: User) => void;
  removeUser: () => void;
  registered: boolean;
  user: User;
  editUser: (userReceived: { name: string; surname: string }) => void;
}>({
  authenticateUser: () => {},
  logout: () => {},
  authed: false,
  registerUser: () => {},
  removeUser: () => {},
  registered: false,
  user: {
    name: '',
    surname: '',
    email: '',
    password: '',
  },
  editUser: (
    userReceived: { name: string; surname: string } = { name: '', surname: '' },
  ) => {},
});

export const AuthConsumer = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
