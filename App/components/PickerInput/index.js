import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import { RegularText } from 'components/Text';
import { RFValue } from 'react-native-responsive-fontsize';
import BaseStyles from 'theme/base';

const styles = StyleSheet.create({
  pickerField: {
    height: RFValue(25),
    margin: 0,
    padding: 0,
    fontSize: RFValue(16),
    fontFamily: 'DMSans-Medium',
    color: '#2C3F56',
    width: '100%',
  },
  pickerItem: {
    height: RFValue(25),
    margin: 0,
    padding: 0,
    fontSize: RFValue(16),
    fontFamily: 'DMSans-Regular',
    color: '#2C3F56',
    width: '100%',
  },
});

const PickerInput = props => {
  const {
    field: { name, value: selected },
    form: { setFieldValue },
    items,
    label,
  } = props;
  return (
    <View style={BaseStyles.input}>
      <RegularText customstyle={{ fontSize: RFValue(10) }}>{label}</RegularText>
      <Picker
        style={styles.pickerField}
        selectedValue={selected}
        onValueChange={_value => setFieldValue(name, _value)}
        itemStyle={styles.pickerItem}
      >
        {items.map(({ label, value }, index) => (
          <Picker.Item key={index} label={label} value={value} />
        ))}
      </Picker>
    </View>
  );
};

export default PickerInput;
