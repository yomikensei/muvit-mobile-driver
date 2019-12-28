import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import BaseStyles from 'theme/base';
import { RegularText } from 'components/Text';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  TextInput: {
    height: RFValue(25),
    margin: 0,
    padding: 0,
    fontSize: RFValue(16),
    fontFamily: 'DMSans-Medium',
    color: '#2C3F56',
  },
});

export default props => {
  const {
    label,
    field: { name },
    form: { handleChange },
    ...rest
  } = props;
  return (
    <View style={BaseStyles.input}>
      <RegularText customstyle={{ fontSize: RFValue(10) }}>{label}</RegularText>
      <TextInput style={styles.TextInput} onChangeText={handleChange(name)} {...rest} />
    </View>
  );
};
