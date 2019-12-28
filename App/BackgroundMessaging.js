/* eslint-disable no/* eslint-disable no-case-declarations,no-case-declarations */
/* eslint-disable no-unused-vars */
import PushNotification from 'react-native-push-notification';

export default async notification => {
  console.log('432423', notification);
  PushNotification.localNotification({
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_launcher_round',
    vibration: 300,
    title: 'New Delivery',
    // message: data.body,
    // tag,
  });

  return Promise.resolve();
};
