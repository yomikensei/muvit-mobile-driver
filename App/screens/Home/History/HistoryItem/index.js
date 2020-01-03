import React from 'react';
import {View} from 'react-native';
import {MediumText, RegularText} from 'components/Text';
import {RFValue} from 'react-native-responsive-fontsize';
import {currencyFormatter} from 'util';
import moment from 'moment';
import Colors from 'theme/colors';

export default ({
  location_origin: { name: location_origin },
  location_destination: { name: location_destination },
  createdAt,
  bill,
}) => {
  return (
    <View
      style={{
        width: '100%',
        borderRadius: RFValue(10),
        paddingVertical: RFValue(13),
        paddingHorizontal: RFValue(16),
        backgroundColor: Colors.black,
        marginBottom: RFValue(10),
      }}
    >
      <MediumText customstyle={{ color: '#FFF', fontSize: RFValue(25) }}>{`₦ ${currencyFormatter(
        bill
      )}`}</MediumText>
      <RegularText customstyle={{ color: '#FFF', fontSize: RFValue(14) }}>
        {`${location_origin} to ${location_destination}`}
      </RegularText>
      <RegularText customstyle={{ color: '#FFF', fontSize: RFValue(14) }}>
        {moment(createdAt).format('dddd, MMMM Do YYYY, h:mm a')}
      </RegularText>
    </View>
  );
};
