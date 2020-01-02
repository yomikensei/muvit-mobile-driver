import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import NotificationWrapper from 'components/NotificationWrapper';
import BackgroundLocationWrapper from 'components/BackgroundLocationWrapper';
import OrderAlertWrapper from 'components/OrderAlertWrapper';

import AuthStack from './Auth';
import HomeTab from './Home';
import AuthLoadingScreen from './AuthLoading';

import ManageVehicleScreen from './Home/Profile/ManageVehicle';
import ChangePasswordScreen from './Home/Profile/ChangePassword';
import EditProfileScreen from './Home/Profile/EditProfile';
import OngoingOrder from './Home/Orders/OngoingOrder';

const HomeStack = createStackNavigator(
  {
    HomeTab: {
      screen: HomeTab,
      navigationOptions: () => ({
        header: null,
      }),
    },
    EditProfile: {
      screen: EditProfileScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    ManageVehicle: {
      screen: ManageVehicleScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    OngoingOrder: {
      screen: OngoingOrder,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    headerMode: 'none',
  }
);

export const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: createAppContainer(AuthStack),
      Home: createAppContainer(HomeStack),
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

const mapStateToProps = state => ({
  state: state.nav,
});

export const AppWithNavigationState = connect(mapStateToProps)(createReduxContainer(AppNavigator));

export default OrderAlertWrapper(
  BackgroundLocationWrapper(NotificationWrapper(AppWithNavigationState))
);
