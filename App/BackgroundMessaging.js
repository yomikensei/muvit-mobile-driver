/* eslint-disable no/* eslint-disable no-case-declarations,no-case-declarations */
/* eslint-disable no-unused-vars */
import PushNotification from 'react-native-push-notification';

export default async notification => {
  console.log('Background Messaging service notification', notification);

  return Promise.resolve();
};
