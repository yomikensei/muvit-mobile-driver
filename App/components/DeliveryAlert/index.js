import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { BoldText } from 'components/Text';
import * as Animatable from 'react-native-animatable';

export default props => {
  return (
    <Modal
      isVisible={props.show}
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
          customstyle={{ fontSize: RFValue(25), textAlign: 'center', marginBottom: RFValue(26) }}
        >
          New Delivery Order
        </BoldText>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <TouchableOpacity
            onPress={props.onAccept}
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
            onPress={props.onDecline}
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
    height: RFValue(292),
    borderRadius: RFValue(10),
    backgroundColor: '#FFF',
    paddingHorizontal: RFValue(30),
    paddingTop: RFValue(36),
  },
});
