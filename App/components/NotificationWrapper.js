import React from 'react';
import PushNotification from 'react-native-push-notification';
import { firebase } from '@react-native-firebase/messaging';

export default WrappedComponent =>
  class NotificationWrapper extends React.PureComponent {
    componentDidMount() {
      this.messageListener = firebase.messaging().onMessage(message => {
        console.log('message', message);
      });
    }

    render() {
      PushNotification.configure({
        onNotification(notification) {
          switch (notification.action) {
            case 'NEW_RIDE_REQUEST':
              console.log('notification');
              PushNotification.localNotification({
                largeIcon: 'ic_launcher',
                smallIcon: 'ic_launcher_round',
                vibration: 300,
                title: 'New Ride request',
                message: `${notification.name_origin} to ${notification.name_destination}`,
                tag: JSON.stringify({
                  action: 'NEW_RIDE_REQUEST',
                  model_id: notification.ride,
                  model: 'ride',
                }),
              });
              break;

            case 'NEW_DELIVERY_REQUEST':
              PushNotification.localNotification({
                largeIcon: 'ic_launcher',
                smallIcon: 'ic_launcher_round',
                vibration: 300,
                title: 'New Delivery request',
                message: `${notification.name_origin} to ${notification.name_destination}`,
              });
              break;

            default:
              if (!notification.tag) break;
              const tag = JSON.parse(notification.tag);
              switch (tag.action) {
                case 'NEW_RIDE_REQUEST':
                  console.log("There's a new ride for you baba");

                  break;
                case 'NEW_DELIVERY_REQUEST':
                  console.log("There's a new delivery for you baba");
                  break;

                default:
                  break;
              }
              break;
          }
        },
      });
      return <WrappedComponent />;
    }
  };
