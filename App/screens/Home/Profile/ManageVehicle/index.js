import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RegularText, MediumText } from 'components/Text';
import DashNav from 'components/DashNav';
import BaseStyles from 'theme/base';
import Colors from 'theme/colors';
import api from 'services/api';

import CreateVehicleDialog from './CreateVehicleDialog';
import UpdateVehicleDialog from './UpdateVehicleDialog';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  vehicle_item: {
    marginBottom: RFValue(20),
  },
  item_label: {
    fontSize: RFValue(13),
  },
  item_text: {
    fontSize: RFValue(18),
  },
});

export default props => {
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateVehicleDialog, setShowCreateVehicleDialog] = useState(false);
  const [showUpdateVehicleDialog, setShowUpdateVehicleDialog] = useState(false);

  const fetchVehicle = async () => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await api({
        url: '/vehicle',
        method: 'GET',
      });
      setVehicle(data);
    } catch (e) {
      console.log(e.response ? e.response : e);
    }
    setIsLoading(false);
  };

  const { navigation } = props;

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <View style={BaseStyles.background}>
      <DashNav
        navigation={navigation}
        title="Manage Vehicle"
        info="Here you can manage your vehicle"
      />
      <CreateVehicleDialog
        isShown={showCreateVehicleDialog}
        close={() => setShowCreateVehicleDialog(false)}
        fetchVehicle={fetchVehicle}
      />
      <UpdateVehicleDialog
        isShown={showUpdateVehicleDialog}
        close={() => setShowUpdateVehicleDialog(false)}
        fetchVehicle={fetchVehicle}
        vehicle={vehicle}
      />

      <View>
        {isLoading ? (
          <ActivityIndicator size={20} color={Colors.primary} />
        ) : (
          <View style={{ marginTop: RFValue(20) }}>
            {!vehicle ? (
              <>
                <RegularText customstyle={{ fontSize: 15 }}>
                  Looks like you don't have a vehicle registered yet. You can add one by clicking in
                  the bottom right corner
                </RegularText>
              </>
            ) : (
              <>
                <View style={styles.vehicle_item}>
                  <RegularText customstyle={styles.item_label}>Vehicle Brand</RegularText>
                  <MediumText customstyle={styles.item_text}>{vehicle.brand}</MediumText>
                </View>
                <View style={styles.vehicle_item}>
                  <RegularText customstyle={styles.item_label}>Vehicle Model</RegularText>
                  <MediumText customstyle={styles.item_text}>{vehicle.model}</MediumText>
                </View>
                <View style={styles.vehicle_item}>
                  <RegularText customstyle={styles.item_label}>Vehicle Plate Number</RegularText>
                  <MediumText customstyle={styles.item_text}>{vehicle.plate_number}</MediumText>
                </View>
              </>
            )}
          </View>
        )}
      </View>
      <FAB
        onClickAction={() => setShowCreateVehicleDialog(true)}
        visible={!vehicle && !isLoading}
        buttonColor={Colors.primary}
        iconTextColor="#FFFFFF"
        iconTextComponent={<Icon name="motorcycle" />}
      />
      <FAB
        onClickAction={() => setShowUpdateVehicleDialog(true)}
        visible={vehicle && !isLoading}
        buttonColor={Colors.primary}
        iconTextColor="#FFFFFF"
        iconTextComponent={<Icon name="pen" />}
      />
    </View>
  );
};
