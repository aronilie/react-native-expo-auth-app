import React from 'react';
import { AuthConsumer } from '../store/authContext';
import Auth from './Auth';
import Main from './Main';

export const AuthPass = () => {
  const { authed } = AuthConsumer();

  return <>{authed ? <Main /> : <Auth />}</>;
};
