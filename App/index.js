/**
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { Stack } from 'shared/routes';
import { firebase } from '@react-native-firebase/messaging';

console.disableYellowBox = true;

export default () => {
  const fetchToken = async () => {
    const fcm_token = await firebase.messaging().getToken();
    console.log(fcm_token);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return <Stack />;
};
