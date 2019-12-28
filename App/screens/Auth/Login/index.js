/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Alert, ScrollView, View } from 'react-native';
import BaseStyles from 'theme/base';
import TopNav from 'components/TopNav';
import { Formik } from 'formik';
import { loginRequest } from 'services/auth/actions';
import { getLogin } from 'services/auth/reducer';
import LoginForm from './Form';

const initialValues = {
  email: '',
  password: '',
};

const Login = props => {
  const { navigation, isLoading } = props;

  const login = values => {
    if (values.password && values.email) {
      const { loginRequest } = props;
      loginRequest({ credentials: values });
    } else {
      Alert.alert('', 'Please ensure all fields on the form are filled', [], { cancelable: true });
    }
  };

  return (
    <View style={BaseStyles.background}>
      <TopNav navigation={navigation} title="Login" info="please fill in all details" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          onSubmit={login}
          render={_props => <LoginForm {...{ ..._props, isLoading }} />}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: getLogin(state).inProgress,
});

export default connect(mapStateToProps, { loginRequest })(Login);
