import React from 'react';
import {connect} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import {firebase} from '@react-native-firebase/messaging';
import {cancelOrder, newOrder} from 'services/orders/actions';
import {NavigationActions} from 'react-navigation';

export default WrappedComponent =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class NotificationWrapper extends React.PureComponent {
      componentDidMount() {
        this.messageListener = firebase.messaging().onMessage(message => {});
      }

      render() {
        const self = this;
        console.log(self.props);
        PushNotification.configure({
          onNotification(notification) {
            switch (notification.action) {
              case 'NEW_RIDE_REQUEST':
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
                  tag: JSON.stringify({
                    action: 'NEW_DELIVERY_REQUEST',
                    model_id: notification.delivery,
                    model: 'delivery',
                  }),
                });
                break;

              case 'DELIVERY_CANCELLED':
              case 'RIDE_CANCELLED':
                PushNotification.localNotification({
                  largeIcon: 'ic_launcher',
                  smallIcon: 'ic_launcher_round',
                  vibration: 300,
                  title: 'Delivery cancelled',
                  message: notification.title,
                  tag: JSON.stringify({
                    action: 'ORDER_CANCELLED',
                  }),
                });
                self.props.dispatch(cancelOrder());
                self.props.navigate('Home');
                break;

              default:
                if (!notification.tag) break;
                const tag = JSON.parse(notification.tag);
                switch (tag.action) {
                  case 'NEW_RIDE_REQUEST':
                    self.props.dispatch(
                      newOrder({
                        order_details: {
                          message: notification.message,
                        },
                        order_id: tag.model_id,
                        order_type: 'RIDE',
                      })
                    );
                    break;

                  case 'NEW_DELIVERY_REQUEST':
                    self.props.dispatch(
                      newOrder({
                        order_details: {
                          message: notification.message,
                        },
                        order_id: tag.model_id,
                        order_type: 'DELIVERY',
                      })
                    );
                    break;

                  case 'ORDER_CANCELLED':
                    self.props.dispatch(cancelOrder());
                    self.props.navigate('Home');
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
const mapDispatchToProps = dispatch => ({
  navigate: (routeName, params) => dispatch(NavigationActions.navigate({ routeName, params })),
  dispatch,
});
