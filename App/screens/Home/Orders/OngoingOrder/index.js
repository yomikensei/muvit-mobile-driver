import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity, View,} from 'react-native';
import call from 'react-native-phone-call';
import {BoldText, MediumText, RegularText} from 'components/Text';
import DashNav from 'components/DashNav';
import BaseStyles from 'theme/base';
import {fetchWalletRequest} from 'services/wallet/actions';
import {getOrderId, getOrderStage, getOrderType} from 'services/orders/reducer';
import {commenceOrder, completeOrder} from 'services/orders/actions';
import api from 'services/api';
import Colors from 'theme/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import Snackbar from 'react-native-snackbar';
import _ from 'lodash';
import {currencyFormatter} from 'util';

const styles = StyleSheet.create({
  item: {
    marginBottom: RFValue(20),
  },
  label: {
    fontSize: RFValue(13),
  },
  text: {
    fontSize: RFValue(18),
  },
});

const mapStateToProps = state => ({
  id: getOrderId(state),
  type: getOrderType(state),
  stage: getOrderStage(state),
});

export default connect(mapStateToProps, { commenceOrder, completeOrder, fetchWalletRequest })(
  props => {
    const [isDetailsLoading, setIsDetailsLoading] = useState(false);
    const [isCommenceLoading, setIsCommenceLoading] = useState(false);
    const [isCompleteLoading, setIsCompleteLoading] = useState(false);
    const [isCancelLoading, setIsCancelLoading] = useState(false);
    const [details, setDetails] = useState(null);

    const fetchDetails = async () => {
      setIsDetailsLoading(true);
      try {
        const {
          data: { data },
        } = await api({
          url: `/${props.type.toLowerCase()}/${props.id}`,
          method: 'GET',
        });
        setDetails(data);
      } catch (e) {
        console.log(e.response ? e.response : e);
      }
      setIsDetailsLoading(false);
    };

    const _cancelOrder = async () => {
      setIsCancelLoading(true);
      try {
        console.log('Cancel Trip');
      } catch (e) {
        console.log(e.response ? e.response : e);
      }
      setIsCancelLoading(false);
    };

    const _commenceOrder = async () => {
      setIsCommenceLoading(true);
      try {
        await api({
          url: `/${props.type.toLowerCase()}/commence/${props.id}`,
          method: 'PUT',
        });
        props.commenceOrder();
        Snackbar.show({
          title: 'Trip has been commenced',
          duration: Snackbar.LENGTH_LONG,
        });
        fetchDetails();
      } catch (e) {
        console.log(e.response ? e.response : e);
        Snackbar.show({
          title: 'Failed to commence trip, please try again',
          duration: Snackbar.LENGTH_LONG,
        });
      }
      setIsCommenceLoading(false);
    };

    const _completeOrder = async () => {
      setIsCompleteLoading(true);
      try {
        await api({
          url: `/${props.type.toLowerCase()}/end/${props.id}`,
          method: 'PUT',
        });
        fetchDetails();
        props.completeOrder();
        props.fetchWalletRequest();
        Snackbar.show({
          title: 'Order has been completed successfully',
          duration: Snackbar.LENGTH_LONG,
        });
      } catch (e) {
        console.log(e.response ? e.response : e);
        Snackbar.show({
          title: 'Failed to complete trip, please try again',
          duration: Snackbar.LENGTH_LONG,
        });
      }
      setIsCompleteLoading(false);
    };

    useEffect(() => {
      fetchDetails();
    }, []);

    return (
      <View style={BaseStyles.background}>
        <DashNav
          showBackButton={props.stage === 'COMPLETE'}
          navigation={props.navigation}
          title={`${props.stage === 'COMPLETE' ? 'Completed' : 'Ongoing'} Order`}
          info={_.capitalize(props.type)}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: RFValue(10) }}>
            {isDetailsLoading ? (
              <ActivityIndicator size={30} color={Colors.primary} />
            ) : (
              details && (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: RFValue(30),
                    }}
                  >
                    <Image
                      source={{ uri: details.user.avatar || 'https://i.pravatar.cc/300' }}
                      style={{
                        width: RFValue(48),
                        height: RFValue(48),
                        borderRadius: RFValue(24),
                        borderWidth: RFValue(3),
                        borderColor: '#EFF3F6',
                      }}
                    />
                    <View>
                      <RegularText
                        customstyle={{ fontSize: RFValue(16) }}
                      >{`${details.user.firstname} ${details.user.lastname}`}</RegularText>
                      <BoldText
                        customstyle={{ fontSize: RFValue(18) }}
                      >{`+${details.user.phone_prefix} ${details.user.phone}`}</BoldText>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          call({ number: `+${details.user.phone_prefix}${details.user.phone}` })
                        }
                      >
                        <Image
                          source={require('../../../../assets/icons/call1.png')}
                          style={{
                            width: RFValue(40),
                            height: RFValue(40),
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.item}>
                    <RegularText customstyle={styles.label}>Order Code</RegularText>
                    <MediumText customstyle={styles.text}>{`#${details.code}`}</MediumText>
                  </View>

                  <MediumText
                    customstyle={{
                      color: '#B2B8BD',
                      fontSize: RFValue(14),
                      textAlign: 'center',
                      marginBottom: RFValue(24),
                    }}
                  >
                    Location
                  </MediumText>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: RFValue(20),
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={require('../../../../assets/icons/dot.png')}
                      style={{ width: RFValue(28), height: RFValue(28), marginEnd: RFValue(7) }}
                    />
                    <View>
                      <MediumText customstyle={{ fontSize: RFValue(10), color: '#B2B8BD' }}>
                        From
                      </MediumText>
                      <MediumText customstyle={{ fontSize: RFValue(16), flexWrap: 'wrap' }}>
                        {details.location_origin.address}
                      </MediumText>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: RFValue(30),
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={require('../../../../assets/icons/dot.png')}
                      style={{ width: RFValue(28), height: RFValue(28), marginEnd: RFValue(7) }}
                    />
                    <View>
                      <MediumText customstyle={{ fontSize: RFValue(10), color: '#B2B8BD' }}>
                        To
                      </MediumText>
                      <MediumText
                        customstyle={{ fontSize: RFValue(16), flex: 1, flexWrap: 'wrap' }}
                      >
                        {details.location_destination.address}
                      </MediumText>
                    </View>
                  </View>

                  <MediumText
                    customstyle={{
                      color: '#B2B8BD',
                      fontSize: RFValue(14),
                      textAlign: 'center',
                      marginBottom: RFValue(24),
                    }}
                  >
                    Payment
                  </MediumText>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: RFValue(30),
                    }}
                  >
                    <View
                      style={{
                        width: '48%',
                        height: RFValue(70),
                        backgroundColor: Colors.secondary,
                        borderRadius: RFValue(10),
                        justifyContent: 'center',
                      }}
                    >
                      <RegularText
                        customstyle={{
                          color: '#8291A4',
                          fontSize: RFValue(15),
                          textAlign: 'center',
                        }}
                      >
                        method
                      </RegularText>
                      <BoldText customstyle={[styles.text, { textAlign: 'center' }]}>
                        {_.capitalize(details.payment_method)}
                      </BoldText>
                    </View>
                    <View
                      style={{
                        width: '48%',
                        height: RFValue(70),
                        backgroundColor: Colors.secondary,
                        borderRadius: RFValue(10),
                        justifyContent: 'center',
                      }}
                    >
                      <RegularText
                        customstyle={{
                          color: '#8291A4',
                          fontSize: RFValue(15),
                          textAlign: 'center',
                        }}
                      >
                        bill
                      </RegularText>
                      <BoldText
                        customstyle={[styles.text, { textAlign: 'center' }]}
                      >{`₦ ${currencyFormatter(details.bill)}`}</BoldText>
                    </View>
                  </View>
                  {props.stage === 'ARRIVING' && (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TouchableOpacity
                        onPress={_commenceOrder}
                        disabled={isCommenceLoading || isCancelLoading}
                        style={{ ...BaseStyles.button, marginBottom: RFValue(20), width: '67%' }}
                      >
                        {isCommenceLoading ? (
                          <ActivityIndicator size={25} color="#FFF" />
                        ) : (
                          <MediumText customstyle={{ color: '#FFF' }}>Commence Trip</MediumText>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={_cancelOrder}
                        disabled={isCommenceLoading || isCancelLoading}
                        style={{
                          ...BaseStyles.button,
                          marginBottom: RFValue(20),
                          width: '30%',
                          backgroundColor: '#F75454',
                        }}
                      >
                        {isCancelLoading ? (
                          <ActivityIndicator size={25} color="#FFF" />
                        ) : (
                          <MediumText customstyle={{ color: '#FFF' }}>Cancel</MediumText>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}

                  {props.stage === 'ONGOING' && (
                    <TouchableOpacity
                      onPress={_completeOrder}
                      style={{ ...BaseStyles.button, marginBottom: RFValue(20) }}
                      disabled={isCompleteLoading}
                    >
                      {isCommenceLoading ? (
                        <ActivityIndicator size={25} color="#FFF" />
                      ) : (
                        <MediumText customstyle={{ color: '#FFF' }}>Complete Trip</MediumText>
                      )}
                    </TouchableOpacity>
                  )}
                </>
              )
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
);
