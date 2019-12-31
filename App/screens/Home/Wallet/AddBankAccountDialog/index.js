import React, { useState, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MediumText } from 'components/Text';
import Modal from 'react-native-modal';
import BaseStyles from 'theme/base';
import { RFValue } from 'react-native-responsive-fontsize';
import { Formik, Field } from 'formik';
import TextInput from 'components/TextInput';
import PickerInput from 'components/PickerInput';
import api from 'services/api';
import Snackbar from 'react-native-snackbar';
import Colors from 'theme/colors';
import { RegularText } from 'components/Text';

const { height, width } = Dimensions.get('window');

const initialDetails = {
  account_name: '',
  account_number: '',
  bank_code: '',
};

export default ({ isShown, close, fetchBankAccounts }) => {
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [details, setDetails] = useState(initialDetails);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [isBankListLoading, setIsBankListLoading] = useState(false);
  
  const fetchBankList = async () => {
    setIsBankListLoading(true);
    try {
      const {
        data: { data },
      } = await api({
        url: '/bank-list',
        method: 'GET',
      });
      setBankList(data);
    } catch (e) {
      console.log(e.response ? e.response : e);
    }
    setIsBankListLoading(false);
  };

  const verifyAccount = async values => {
    setIsVerifyLoading(true);
    try {
      const {
        data: { data },
      } = await api({
        url: '/bank-account/verify',
        method: 'POST',
        data: values,
      });
      setDetails(data);
      setIsVerified(true);
    } catch (e) {
      setIsVerified(false);
      Snackbar.show({
        title: 'Failed to verify bank account, please verify details',
        duration: Snackbar.LENGTH_LONG,
      });
    }
    setIsVerifyLoading(false);
  };

  const addAccount = async values => {
    setIsSubmitLoading(true);
    try {
      await api({
        url: '/bank-account',
        method: 'POST',
        data: {
          ...values,
          name: values.account_name,
        },
      });
      Snackbar.show({ title: 'Bank account added successfully', duration: Snackbar.LENGTH_LONG });
      setDetails(initialDetails);
      setIsVerified(false);
      close();
      fetchBankAccounts();
    } catch (e) {
      console.log(e.response ? e.response : e);
      Snackbar.show({
        title: 'Error add bank account, please try again',
        duration: Snackbar.LENGTH_LONG,
      });
    }
    setIsSubmitLoading(false);
  };

  useEffect(() => {
    fetchBankList();
  }, []);

  return (
    <View>
      <Modal
        avoidKeyboard
        backdropOpacity={0.7}
        isVisible={isShown}
        onBackButtonPress={close}
        onBackdropPress={close}
      >
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: '#FFF',
            borderRadius: 10,
            height: RFValue(isVerified ? 320 : 250),
            width: width * 0.8,
            alignContent: 'center',
            justifyContent: 'space-around',
            padding: 10,
          }}
        >
          {isBankListLoading ? (
            <ActivityIndicator color={Colors.primary} size={20} />
          ) : (
            bankList.length === 0 && (
              <View>
                <RegularText>Error fetching list of banks, please try again</RegularText>
                <TouchableOpacity
                  onPress={fetchBankList}
                  style={{
                    ...BaseStyles.button,
                    height: RFValue(40),
                    borderRadius: 5,
                  }}
                  disabled={isVerifyLoading}
                >
                  <MediumText customstyle={{ color: '#FFF' }}>Fetch Banks</MediumText>
                </TouchableOpacity>
              </View>
            )
          )}

          <Formik enableReinitialize initialValues={details} onSubmit={verifyAccount}>
            {({ handleChange, handleSubmit }) => (
              <>
                <Field
                  name="account_number"
                  component={TextInput}
                  handleChange={handleChange}
                  keyboardType="number-pad"
                  label="Account Number"
                  enabled={!isVerified}
                />
                <Field
                  name="bank_code"
                  component={PickerInput}
                  mode="dialog"
                  handleChange={handleChange}
                  label="Bank"
                  items={bankList}
                  enabled={!isVerified}
                />
                {isVerified ? (
                  <>
                    <Field
                      name="account_name"
                      component={TextInput}
                      handleChange={handleChange}
                      label="Account Name"
                      enabled={false}
                    />
                    <TouchableOpacity
                      onPress={() => addAccount(details)}
                      style={{
                        ...BaseStyles.button,
                        height: RFValue(40),
                        borderRadius: 5,
                      }}
                      disabled={isSubmitLoading}
                    >
                      {isSubmitLoading ? (
                        <ActivityIndicator size={25} color="#FFF" />
                      ) : (
                        <MediumText customstyle={{ color: '#FFF' }}>Add Account</MediumText>
                      )}
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      ...BaseStyles.button,
                      height: RFValue(40),
                      borderRadius: 5,
                    }}
                    disabled={isVerifyLoading}
                  >
                    {isVerifyLoading ? (
                      <ActivityIndicator size={25} color="#FFF" />
                    ) : (
                      <MediumText customstyle={{ color: '#FFF' }}>Verify Account</MediumText>
                    )}
                  </TouchableOpacity>
                )}
              </>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};
