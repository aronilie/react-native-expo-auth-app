import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Main } from './navigation/Main';
import { AuthProvider } from './store/authContext';
import { AuthPass } from './navigation/AuthPass';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AuthProvider>
          <AuthPass />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}
