import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createReduxContainer } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import NotificationWrapper from 'components/NotificationWrapper';

import AuthStack from './Auth';
import HomeStack from './Home';
import AuthLoadingScreen from './AuthLoading';

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

export default NotificationWrapper(AppWithNavigationState);
