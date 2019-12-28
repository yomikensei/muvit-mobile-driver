import { createStackNavigator } from 'react-navigation';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';

export default createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Welcome',
  }
);
