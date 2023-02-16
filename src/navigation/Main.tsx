import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import User from '../screens/User';

export type MainStackParams = {
  Home: undefined;
  User: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen
      name="User"
      component={User}
      options={{ headerTitle: 'User' }}
    />
  </MainStack.Navigator>
);

export default Main;
