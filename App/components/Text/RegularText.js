import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from 'theme/colors';

/**
 * @RegularText Component
 *
 * The Bold version for text component.
 */
export default props => {
  return (
    <Text style={[styles.defaultStyles, props.customstyle]} {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyles: {
    fontFamily: 'DMSans-Regular',
    fontSize: RFValue(16),
    color: Colors.black,
  },
});
