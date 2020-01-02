import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {schemeDark2} from 'd3-scale-chromatic';
import moment from 'moment';
import {BoldText, MediumText, RegularText} from 'components/Text';
import BaseStyles from 'theme/base';
import {RFValue} from 'react-native-responsive-fontsize';
import AccountItem from './AccountItem';
import {getBalance, getNextWithdrawalDate, getTotalProfit} from 'services/wallet/reducer';
import {currencyFormatter} from 'util';
import colors from 'theme/colors';
import Colors from 'theme/colors';
import api from 'services/api';
import AddBankAccountDialog from './AddBankAccountDialog';

const Wallet = props => {
  const [bankAccounts, setBankAccounts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAddBankAccountDialog, setShowAddBankAccountDialog] = useState(false);

  const fetchBankAccounts = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await api({
        url: '/bank-account',
        method: 'GET',
      });
      const _data = {};
      data.forEach(item => {
        _data[item.id] = item;
      });
      setBankAccounts(_data);
    } catch (e) {
      console.log(e.response ? e.response : e);
    }
    setIsLoading(false);
  };

  const { balance, total_profit, next_withdrawal } = props;

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  return (
    <View style={BaseStyles.dashBackground}>
      <View style={BaseStyles.dashTop}>
        <View style={{ ...BaseStyles.dashSummaryBox, marginBottom: RFValue(17) }}>
          <View>
            <MediumText customstyle={{ fontSize: RFValue(12), color: 'rgba(255,255,255,0.8)' }}>
              Pending Amount
            </MediumText>
            <BoldText customstyle={{ fontSize: RFValue(35), color: '#FFF' }}>
              {`₦ ${currencyFormatter(balance)}`}
            </BoldText>
          </View>
          {props.next_withdrawal && !moment().isAfter(moment(next_withdrawal)) && (
            <TouchableOpacity style={BaseStyles.button2}>
              <BoldText customstyle={{ fontSize: RFValue(10), color: colors.primary }}>
                Withdraw
              </BoldText>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ ...BaseStyles.dashSummaryBox, marginBottom: RFValue(17) }}>
          <View>
            <MediumText customstyle={{ fontSize: RFValue(12), color: 'rgba(255,255,255,0.8)' }}>
              Total Profit Made
            </MediumText>
            <BoldText customstyle={{ fontSize: RFValue(35), color: '#FFF' }}>
              {`₦ ${currencyFormatter(total_profit)}`}
            </BoldText>
          </View>
        </View>

        {props.next_withdrawal && !moment().isAfter(moment(next_withdrawal)) && (
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <RegularText customstyle={{ color: 'rgba(255,255,255,0.6)', fontSize: RFValue(12) }}>
              next payment date
            </RegularText>
            <BoldText customstyle={{ color: '#FFF', fontSize: RFValue(12) }}>
              {moment(next_withdrawal).format('dddd, MMMM Do YYYY, h:mm a')}
            </BoldText>
          </View>
        )}
      </View>
      <View style={BaseStyles.dashContent}>
        {isLoading ? (
          <ActivityIndicator size={30} color={Colors.primary} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              refreshing={isLoading && Object.values(bankAccounts).length === 0}
              data={Object.values(bankAccounts)}
              renderItem={({ item, index }) => (
                <AccountItem {...{ ...item, backgroundColor: schemeDark2[index % 12] }} />
              )}
              keyExtractor={item => item.id}
              ListEmptyComponent={() => (
                <RegularText>
                  No bank accounts available, you can add one by clicking the button in the bottom
                  right
                </RegularText>
              )}
              onRefresh={fetchBankAccounts}
            />
          </ScrollView>
        )}
      </View>
      <AddBankAccountDialog
        isShown={showAddBankAccountDialog}
        close={() => setShowAddBankAccountDialog(false)}
        fetchBankAccounts={fetchBankAccounts}
      />
      <FAB
        visible
        onClickAction={() => setShowAddBankAccountDialog(true)}
        buttonColor={Colors.primary}
        iconTextColor="#FFFFFF"
        iconTextComponent={<Icon name="plus" />}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  total_profit: getTotalProfit(state),
  balance: getBalance(state),
  next_withdrawal: getNextWithdrawalDate(state),
});

export default connect(mapStateToProps)(Wallet);
