import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { RFValue } from 'react-native-responsive-fontsize';
import Profile from './Profile';
import Wallet from './Wallet';
import Dashboard from './Dashboard';
import History from './History';

const HomeStack = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: () => ({
        header: null,
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={18} color={tintColor} />,
      }),
    },
    History: {
      screen: History,
      navigationOptions: () => ({
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => <Icon name="clock" size={18} color={tintColor} />,
      }),
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: () => ({
        tabBarLabel: 'Wallet',
        tabBarIcon: ({ tintColor }) => <Icon name="wallet" size={18} color={tintColor} />,
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <Icon name="user" size={18} color={tintColor} />,
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#2C3F56',
      inactiveTintColor: '#B2B8BD',
      labelStyle: {
        fontSize: RFValue(10),
        fontFamily: 'DMSans-Medium',
        margin: 0,
      },
      style: {
        height: 60,
        borderTopColor: 'transparent',
        backgroundColor: '#FCFDFF',
      },
      tabStyle: {
        marginBottom: 7,
      },
    },
    initialRouteName: 'Dashboard',
  }
);

export default createAppContainer(HomeStack);
