import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { AuthConsumer } from '../store/authContext';

const styles = StyleSheet.create({
  subtitle: {
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
  logoutButton: {
    width: '95%',
    height: 70,
    alignSelf: 'center',
  },
});

const Home = () => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { logout, removeUser, user } = AuthConsumer();

  const signOut = async () => {
    await logout();
  };

  const deleteAccount = async () => {
    await removeUser();
  };

  return (
    <>
      <Text style={styles.subtitle}>Hello again {user.name}!</Text>
      <View style={styles.logoutButton}>
        <Button type="outline" onPress={() => navigate('User', { data: user })}>
          Edit profile
        </Button>
      </View>
      <View style={styles.logoutButton}>
        <Button type="outline" onPress={deleteAccount}>
          Delete account
        </Button>
      </View>
      <View style={styles.logoutButton}>
        <Button onPress={signOut}>Logout</Button>
      </View>
    </>
  );
};

export default Home;
