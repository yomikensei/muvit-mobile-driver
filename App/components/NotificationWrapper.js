import React from 'react';
import {connect} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import {firebase} from '@react-native-firebase/messaging';
import {newOrder} from 'services/orders/actions';

export default WrappedComponent =>
  connect(mapStateToProps, { newOrder })(
    class NotificationWrapper extends React.PureComponent {
      componentDidMount() {
        this.messageListener = firebase.messaging().onMessage(message => {
          console.log('message', message);
        });
      }

      render() {
        const self = this;
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
                console.log(tag);
                switch (tag.action) {
                  case 'NEW_RIDE_REQUEST':
                    self.props.newOrder({
                      order_details: {
                        message: notification.message,
                      },
                      order_id: tag.model_id,
                      order_type: 'RIDE',
                    });
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
    }
  );

const mapStateToProps = state => ({});
