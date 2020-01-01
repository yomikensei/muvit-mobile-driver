import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';
import {BoldText, RegularText} from 'components/Text';
import * as Animatable from 'react-native-animatable';

export default props => {
  const {
    show,
    type,
    details: { message },
  } = props;
  const acceptOrder = async () => {};
  const rejectOrder = async () => {};

  return (
    <Modal
      isVisible={show}
      style={{ justifyContent: 'flex-end', zIndex: 99999999999999999 }}
      onBackButtonPress={() => {}}
      onBackdropPress={() => {}}
      hasBackdrop={true}
      animationIn="slideInUp"
      animationInTiming={750}
      coverScreen={true}
      useNativeDriver={true}
      animationOut="slideOutDown"
      animationOutTiming={800}
    >
      <View style={QCStyle.container}>
        <Animatable.Image
          animation="pulse"
          iterationCount={10}
          iterationDelay={500}
          duration={600}
          source={require('../../assets/images/location.png')}
          style={{
            width: RFValue(88),
            height: RFValue(88),
            alignSelf: 'center',
            marginBottom: RFValue(22),
          }}
        />
        <BoldText
          customstyle={{ fontSize: RFValue(23), textAlign: 'center', marginBottom: RFValue(10) }}
        >
          {`NEW ${type} ORDER`}
        </BoldText>
        <RegularText
          customstyle={{ fontSize: RFValue(17), textAlign: 'center', marginBottom: RFValue(26) }}
        >
          {message}
        </RegularText>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <TouchableOpacity
            onPress={acceptOrder}
            style={{
              width: '48%',
              height: RFValue(66),
              backgroundColor: '#55D485',
              borderRadius: RFValue(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BoldText customstyle={{ fontSize: RFValue(18), color: '#FFF' }}>ACCEPT</BoldText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={rejectOrder}
            style={{
              width: '48%',
              height: RFValue(66),
              backgroundColor: '#F75454',
              borderRadius: RFValue(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BoldText customstyle={{ fontSize: RFValue(18), color: '#FFF' }}>DECLINE</BoldText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const QCStyle = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: RFValue(10),
    backgroundColor: '#FFF',
    paddingHorizontal: RFValue(30),
    padding: RFValue(20),
    paddingTop: RFValue(30),
  },
});
