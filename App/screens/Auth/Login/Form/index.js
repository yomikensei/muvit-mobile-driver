import React from 'react';
import { Field } from 'formik';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import BaseStyles from 'theme/base';
import { MediumText } from 'components/Text';
import TextInput from 'components/TextInput';

export default props => {
  const { handleSubmit, handleChange, isLoading } = props;
  return (
    <>
      <Field
        name="email"
        component={TextInput}
        label="Email"
        keyboardType="email-address"
        returnKeyType="next"
        handleChange={handleChange}
      />
      <Field
        name="password"
        component={TextInput}
        label="Password"
        secureTextEntry
        returnKeyType="done"
        handleChange={handleChange}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={{ ...BaseStyles.button, marginBottom: RFValue(50) }}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size={25} color="#FFF" />
        ) : (
          <MediumText customstyle={{ color: '#FFF' }}>Continue</MediumText>
        )}
      </TouchableOpacity>
    </>
  );
};
