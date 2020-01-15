import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {MediumText, RegularText} from 'components/Text';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from 'theme/colors';
import BaseStyles from 'theme/base';
import DashNav from 'components/DashNav';
import api from 'services/api';
import HistoryItem from './HistoryItem';

export default props => {
  const [tab, setTab] = useState('RIDES');
  const [rides, setRides] = useState({});
  const [deliveries, setDeliveries] = useState({});

  const [isRidesLoading, setIsRidesLoading] = useState(false);
  const [isDeliveriesLoading, setIsDeliveriesLoading] = useState(false);

  const fetchRides = async () => {
    setIsRidesLoading(true);
    try {
      const {
        data: { data },
      } = await api({
        url: '/ride',
        method: 'GET',
      });
      const _data = {};
      data.forEach(item => {
        _data[item.id] = item;
      });
      setRides(_data);
    } catch (e) {
      console.log(e.response ? e.response : e);
    }
    setIsRidesLoading(false);
  };

  const fetchDeliveries = async () => {
    setIsDeliveriesLoading(true);
    try {
      const {
        data: { data },
      } = await api({
        url: '/delivery',
        method: 'GET',
      });
      const _data = {};
      data.forEach(item => {
        _data[item.id] = item;
      });
      setDeliveries(_data);
    } catch (e) {
      console.log(e.response ? e.response : e);
    }
    setIsDeliveriesLoading(false);
  };

  useEffect(() => {
    fetchRides();
    fetchDeliveries();
  }, []);

  const { navigation } = props;
  return (
    <View style={BaseStyles.background}>
      <DashNav
        navigation={navigation}
        title="History"
        info="Rides and deliveries history for all time"
      />

      <View style={BaseStyles.tabs}>
        <TouchableOpacity
          onPress={() => setTab('RIDES')}
          style={
            tab === 'RIDES'
              ? { ...BaseStyles.tabButton, backgroundColor: colors.primary }
              : BaseStyles.tabButton
          }
        >
          <MediumText
            customstyle={
              tab === 'RIDES' ? { fontSize: RFValue(10), color: '#FFF' } : { fontSize: RFValue(10) }
            }
          >
            Rides
          </MediumText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('DELIVERIES')}
          style={
            tab === 'DELIVERIES'
              ? { ...BaseStyles.tabButton, backgroundColor: colors.primary }
              : BaseStyles.tabButton
          }
        >
          <MediumText
            customstyle={
              tab === 'DELIVERIES'
                ? { fontSize: RFValue(10), color: '#FFF' }
                : { fontSize: RFValue(10) }
            }
          >
            Deliveries
          </MediumText>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          refreshing={
            ((tab === 'RIDES' && isRidesLoading) ||
              (tab === 'DELIVERIES' && isDeliveriesLoading)) &&
            Object.values(tab === 'RIDES' ? rides : deliveries).length === 0
          }
          data={Object.values(tab === 'RIDES' ? rides : deliveries)}
          renderItem={({ item }) => <HistoryItem {...{ ...item }} />}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => (
            <RegularText
              customstyle={{ textAlign: 'center' }}
            >{`You haven't completed any ${tab.toLowerCase()} yet`}</RegularText>
          )}
          onRefresh={tab === 'RIDES' ? fetchRides : fetchDeliveries}
        />
      </ScrollView>
    </View>
  );
};
