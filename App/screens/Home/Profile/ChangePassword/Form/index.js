import React from 'react';
import { Field } from 'formik';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import BaseStyles from 'theme/base';
import { MediumText } from 'components/Text';
import TextInput from 'components/TextInput';

export default props => {
  const { handleSubmit, handleChange, isSubmitting } = props;
  return (
    <>
      <Field
        name="current_password"
        component={TextInput}
        label="Current Password"
        secureTextEntry
        returnKeyType="next"
        handleChange={handleChange}
      />
      <Field
        name="prepass"
        component={TextInput}
        label="Password"
        secureTextEntry
        returnKeyType="next"
        handleChange={handleChange}
      />
      <Field
        name="confirmation"
        component={TextInput}
        label="Confirm Password"
        secureTextEntry
        returnKeyType="done"
        handleChange={handleChange}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={{ ...BaseStyles.button, marginBottom: RFValue(50) }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size={25} color="#FFF" />
        ) : (
          <MediumText customstyle={{ color: '#FFF' }}>Change Password</MediumText>
        )}
      </TouchableOpacity>
    </>
  );
};
