import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { createReduxContainer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import NotificationWrapper from 'components/NotificationWrapper';
import BackgroundLocationWrapper from 'components/BackgroundLocationWrapper';

import AuthStack from './Auth';
import HomeTab from './Home';
import AuthLoadingScreen from './AuthLoading';

import ManageVehicleScreen from './Home/Profile/ManageVehicle';
import ChangePasswordScreen from './Home/Profile/ChangePassword';
import EditProfileScreen from './Home/Profile/EditProfile';

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

export default BackgroundLocationWrapper(NotificationWrapper(AppWithNavigationState));
