/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Alert, ScrollView, View } from 'react-native';
import { signupRequest } from 'services/auth/actions';
import { getSignup } from 'services/auth/reducer';
import BaseStyles from 'theme/base';
import TopNav from 'components/TopNav';
import { Formik } from 'formik';
import SignupForm from './Form';

const initialValues = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  phone_prefix: '234',
  prepass: '',
  confirmation: '',
};

const Signup = props => {
  const { navigation, isLoading } = props;

  const signup = async values => {
    const { prepass, confirmation, firstname, lastname, phone, email } = values;
    if (prepass && confirmation && firstname && lastname && phone && email) {
      if (prepass !== confirmation) {
        Alert.alert('', 'Passwords do not match', [], { cancelable: true });
      } else props.signupRequest({ credentials: values });
    } else {
      Alert.alert('', 'Please ensure all fields on the form are filled', [], {
        cancelable: true,
      });
    }
  };

  return (
    <View style={BaseStyles.background}>
      <TopNav navigation={navigation} title="Signup" info="please fill in all details" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          onSubmit={signup}
          render={_props => <SignupForm {...{ ..._props, isLoading }} />}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: getSignup(state).inProgress,
});

export default connect(mapStateToProps, { signupRequest })(Signup);
