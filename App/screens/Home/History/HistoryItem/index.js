import React from 'react';
import {Image, View} from 'react-native';
import {MediumText} from 'components/Text';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from 'theme/colors';

export default ({
  location_origin: { name: location_origin },
  location_destination: { name: location_destination },
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.secondary,
        width: '100%',
        borderRadius: RFValue(10),
        paddingHorizontal: RFValue(15),
        paddingVertical: RFValue(12),
        marginBottom: RFValue(19),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          resizeMode="contain"
          source={require('../../../../assets/icons/dot.png')}
          style={{ width: RFValue(28), height: RFValue(28), marginEnd: RFValue(7) }}
        />
        <View style={{ display: 'flex', width: '100%' }}>
          <MediumText customstyle={{ fontSize: RFValue(10), color: '#B2B8BD' }}>From</MediumText>
          <MediumText customstyle={{ fontSize: RFValue(16) }}>{location_origin}</MediumText>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: RFValue(1),
          backgroundColor: 'rgba(178,184,189,0.2)',
          marginVertical: RFValue(10),
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          resizeMode="contain"
          source={require('../../../../assets/icons/dot.png')}
          style={{ width: RFValue(28), height: RFValue(28), marginEnd: RFValue(7) }}
        />
        <View style={{ display: 'flex', width: '100%' }}>
          <MediumText customstyle={{ fontSize: RFValue(10), color: '#B2B8BD' }}>To</MediumText>
          <MediumText customstyle={{ fontSize: RFValue(16) }}>{location_destination}</MediumText>
        </View>
      </View>
    </View>
  );
};
