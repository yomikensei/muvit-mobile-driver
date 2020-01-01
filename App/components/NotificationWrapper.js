import React from 'react';
import PushNotification from 'react-native-push-notification';
import { firebase } from '@react-native-firebase/messaging';

export default WrappedComponent => class NotificationWrapper extends React.PureComponent {
  componentDidMount() {
    this.messageListener = firebase.messaging().onMessage(message => {
      console.log('message', message);
    });
    // this.notificationListener = firebase.notifications().onNotification(({ _data }) => {
    //   // eslint-disable-next-line no-console
    //   console.log(_data);
    // });
  }

  render() {
    PushNotification.configure({
      onNotification(notification) {
        console.log('notification', notification);
        PushNotification.localNotification({
          largeIcon: 'ic_launcher',
          smallIcon: 'ic_launcher_round',
          vibration: 300,
          title: 'Sample Notification',
          message: 'Sample Notification',
          // message: data.body,
          // tag,
        });
      },
    });
    return <WrappedComponent />;
  }
};
