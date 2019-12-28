/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getIsLoggedIn } from 'services/auth/reducer';

const AuthLoading = props => {
  const authCheck = () => {
    const { navigation, isLoggedIn } = props;
    if (isLoggedIn) navigation.navigate('Home');
    else navigation.navigate('Auth');

  }

  useEffect(() => {
    authCheck();
  }, [])

  return (
    <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} color="#0000ff" size={50} />
  );

}

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

export default connect(mapStateToProps, {})(AuthLoading);
