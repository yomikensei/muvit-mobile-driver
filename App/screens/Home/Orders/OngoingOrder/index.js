import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MediumText, RegularText} from 'components/Text';
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

export default connect(mapStateToProps, { commenceOrder, completeOrder, fetchWalletRequest })(props => {
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isCommenceLoading, setIsCommenceLoading] = useState(false);
  const [isCompleteLoading, setIsCompleteLoading] = useState(false);
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
        info="Details on current ride or delivery"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: RFValue(10) }}>
          {isDetailsLoading ? (
            <ActivityIndicator size={30} color={Colors.primary} />
          ) : (
            details && (
              <>
                <View style={styles.item}>
                  <RegularText customstyle={styles.label}>Name</RegularText>
                  <MediumText
                    customstyle={styles.text}
                  >{`${details.user.firstname} ${details.user.lastname}`}</MediumText>
                </View>
                <View style={styles.item}>
                  <RegularText customstyle={styles.label}>Phone</RegularText>
                  <MediumText
                    customstyle={styles.text}
                  >{`+${details.user.phone_prefix}-${details.user.phone}`}</MediumText>
                </View>
                <View style={styles.item}>
                  <RegularText customstyle={styles.label}>Order Type</RegularText>
                  <MediumText customstyle={styles.text}>{_.capitalize(props.type)}</MediumText>
                </View>
                <View style={styles.item}>
                  <RegularText customstyle={styles.label}>Order Code</RegularText>
                  <MediumText customstyle={styles.text}>{`#${details.code}`}</MediumText>
                </View>
                <View style={styles.item}>
                  <RegularText customstyle={styles.label}>Origin</RegularText>
                  <MediumText customstyle={styles.text}>
                    {details.location_origin.address}
                  </MediumText>
                </View>
                <View style={styles.item}>
                  <RegularText customstyle={styles.label}>Destination</RegularText>
                  <MediumText customstyle={styles.text}>
                    {details.location_destination.address}
                  </MediumText>
                </View>

                <View style={styles.item}>
                  <RegularText customstyle={styles.label}>Payment Method</RegularText>
                  <MediumText customstyle={styles.text}>
                    {_.capitalize(details.payment_method)}
                  </MediumText>
                </View>
                <View style={styles.item}>
                  <RegularText customstyle={styles.label}>Bill</RegularText>
                  <MediumText customstyle={styles.text}>{`₦ ${currencyFormatter(
                    details.bill
                  )}`}</MediumText>
                </View>

                {props.stage === 'ARRIVING' && (
                  <TouchableOpacity
                    onPress={_commenceOrder}
                    style={{ ...BaseStyles.button, marginBottom: RFValue(20) }}
                    disabled={isCommenceLoading}
                  >
                    {isCommenceLoading ? (
                      <ActivityIndicator size={25} color="#FFF" />
                    ) : (
                      <MediumText customstyle={{ color: '#FFF' }}>Commence Trip</MediumText>
                    )}
                  </TouchableOpacity>
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
});
