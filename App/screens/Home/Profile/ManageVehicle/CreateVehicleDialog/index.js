import React, { useState, useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MediumText } from 'components/Text';
import Modal from 'react-native-modal';
import BaseStyles from 'theme/base';
import { RFValue } from 'react-native-responsive-fontsize';
import { Formik, Field } from 'formik';
import TextInput from 'components/TextInput';
import api from 'services/api';
import Snackbar from 'react-native-snackbar';

const initialValues = {
  brand: '',
  plate_number: '',
  model: '',
};

export default ({ isShown, close, fetchVehicle }) => {
  const [isLoading, setIsLoading] = useState(false);

  const addVehicle = async values => {
    setIsLoading(true);
    try {
      await api({
        url: '/vehicle',
        method: 'POST',
        data: values,
      });
      Snackbar.show({
        title: 'Vehicle added successfully',
        duration: Snackbar.LENGTH_LONG,
      });
      fetchVehicle();
      close();
    } catch (e) {
      Snackbar.show({
        title: 'Error adding vehicle, please try again',
        duration: Snackbar.LENGTH_LONG,
      });
      console.log(e.response ? e.response : e);
    }
    setIsLoading(false);
  };

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
            height: RFValue(320),
            width: RFValue(330),
            alignContent: 'center',
            justifyContent: 'space-around',
            padding: 10,
          }}
        >
          <Formik onSubmit={addVehicle} initialValues={initialValues}>
            {({ handleChange, handleSubmit }) => (
              <>
                <Field
                  name="plate_number"
                  component={TextInput}
                  handleChange={handleChange}
                  label="Vehicle Plate Number"
                />
                <Field
                  name="brand"
                  component={TextInput}
                  handleChange={handleChange}
                  label="Vehicle Brand"
                />
                <Field
                  name="model"
                  component={TextInput}
                  handleChange={handleChange}
                  label="Vehicle Model"
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    ...BaseStyles.button,
                    height: RFValue(40),
                    borderRadius: 5,
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size={25} color="#FFF" />
                  ) : (
                    <MediumText customstyle={{ color: '#FFF' }}>Add Vehicle</MediumText>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};
