import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

export type MainStackParams = {
  Login: undefined;
  Register: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

const Auth = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Login" component={Login} />
    <MainStack.Screen
      name="Register"
      component={Register}
      options={{ headerTitle: 'Register' }}
    />
  </MainStack.Navigator>
);

export default Auth;
