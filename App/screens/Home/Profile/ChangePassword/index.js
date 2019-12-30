import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { RegularText } from 'components/Text';
import DashNav from 'components/DashNav';
import Snackbar from 'react-native-snackbar';
import BaseStyles from 'theme/base';
import { Formik } from 'formik';
import ChangePasswordForm from './Form';
import api from 'services/api';
import { saveState } from 'app/localStorage';

const initialValues = {
  current_password: '',
  prepass: '',
  confirmation: '',
};

export default props => {
  const { navigation } = props;

  const changePassword = async (values, actions) => {
    const { setSubmitting, resetForm } = actions;
    try {
      const {
        data: {
          data: { user, token },
        },
      } = await api({
        url: '/user/change-password',
        method: 'POST',
        data: values,
      });
      await saveState({ user, token });
      resetForm();
      Snackbar.show({
        title: 'Password updated successfully',
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (e) {
      console.log(e.response ? e.response : e);
      Snackbar.show({
        title: 'Error updating password, please try again',
        duration: Snackbar.LENGTH_LONG,
      });
    }
    setSubmitting(false);
  };

  return (
    <View style={BaseStyles.background}>
      <DashNav
        navigation={navigation}
        title="Change Password"
        info="Here you can update your password"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          onSubmit={changePassword}
          render={_props => <ChangePasswordForm {..._props} />}
        />
      </ScrollView>
    </View>
  );
};
