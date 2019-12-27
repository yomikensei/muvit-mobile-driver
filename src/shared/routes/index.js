import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator,createBottomTabNavigator } from 'react-navigation';
import Welcome from '../../screens/welcome';
import * as SIGNUP from '../../screens/signup';
import * as LOGIN from '../../screens/login';
import * as DASHBOARD from '../../screens/dashboard';
import { RFValue } from 'react-native-responsive-fontsize';

const DashboardScreens = createBottomTabNavigator(
    {
      Home: {
        screen: DASHBOARD.Home,
        navigationOptions: {
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor, focused }) => (
            focused ? <Image
              source={require("../../assets/icons/dashboard/home_active.png")}
              style={{ resizeMode: 'contain', width: RFValue(18), height: RFValue(18) }}
            /> : <Image
                source={require("../../assets/icons/dashboard/home.png")}
                style={{ resizeMode: 'contain', width: RFValue(18), height: RFValue(18) }} />
          )
        }
      },
      History: {
        screen: DASHBOARD.History,
        navigationOptions: {
          tabBarLabel: "History",
          tabBarIcon: ({ tintColor, focused }) => (
            focused ? <Image
              source={require("../../assets/icons/dashboard/history_active.png")}
              style={{ resizeMode: 'contain', width: RFValue(18), height: RFValue(18) }}
            /> : <Image
                source={require("../../assets/icons/dashboard/history.png")}
                style={{ resizeMode: 'contain', width: RFValue(18), height: RFValue(18) }} />
          )
        }
      },
      Wallet: {
        screen: DASHBOARD.Wallet,
        navigationOptions: {
          tabBarLabel: "Wallet",
          tabBarIcon: ({ tintColor, focused }) => (
            focused ? <Image
              source={require("../../assets/icons/dashboard/wallet_active.png")}
              style={{ resizeMode: 'contain', width: RFValue(18), height: RFValue(18) }}
            /> : <Image
                source={require("../../assets/icons/dashboard/wallet.png")}
                style={{ resizeMode: 'contain', width: RFValue(18), height: RFValue(18) }} />
          )
        }
      },
      Profile: {
        screen: DASHBOARD.Profile,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor, focused }) => (
            focused ? <Image
              source={require("../../assets/icons/dashboard/profile_active.png")}
              style={{ resizeMode: 'contain', width: RFValue(18), height: RFValue(18) }}
            /> : <Image
                source={require("../../assets/icons/dashboard/profile.png")}
                style={{ resizeMode: 'contain', width: RFValue(18), height: RFValue(18) }} />
          )
        }
      }
    },
    {
      initialRouteName: "Home",
      tabBarOptions: {
        activeTintColor: "#2C3F56",
        inactiveTintColor: "#B2B8BD",
        labelStyle: {
          fontSize: RFValue(10),
          fontFamily: "DMSans-Medium",
          margin: 0
        },
        style: {
          height: 60,
          borderTopColor: "transparent",
          backgroundColor: "#FCFDFF"
        },
        tabStyle: {
          // paddingTop: 10,
          marginBottom: 7
        }
      }
    }
);

export const Stack = createStackNavigator(
  {
    WelcomePage: Welcome,
    PersonalInfo: SIGNUP.PersonalInfo,
    UploadSelfie: SIGNUP.UploadSelfie,
    SignUpSuccessful: SIGNUP.SignUpSuccessful,
    Login: LOGIN.Login,
    Dashboard: DashboardScreens,
    RequestInfo: DASHBOARD.RequestInfo,
    Journey: DASHBOARD.Journey,
    Summary: DASHBOARD.Summary,
    HistoryInfo: DASHBOARD.HistoryInfo
  },
  {
    initialRouteName: "WelcomePage",
    headerMode: 'none'
  }
);
