import React from 'react';
import {connect} from 'react-redux';
import {Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getUser} from 'services/auth/reducer';
import {logout} from 'services/auth/actions';
import BaseStyles from 'theme/base';
import DashNav from 'components/DashNav';
import {RFValue} from 'react-native-responsive-fontsize';
import {BoldText, RegularText} from 'components/Text';
import Colors from 'theme/colors.json';

const Profile = props => {
  const {
    user: { firstname, lastname, email, phone, id },
    logout: Logout,
    navigation,
    navigation: { navigate },
  } = props;
  return (
    <View style={BaseStyles.background}>
      <DashNav navigation={navigation} title="Profile" />
      <Image
        source={{ uri: `https://api.adorable.io/avatars/${RFValue(285)}/${id}` }}
        style={{
          width: RFValue(128),
          height: RFValue(128),
          borderRadius: RFValue(64),
          borderWidth: RFValue(7),
          borderColor: Colors.secondary,
          alignSelf: 'center',
          marginBottom: RFValue(19),
        }}
      />
      <RegularText
        customstyle={{
          fontSize: RFValue(22),
          color: Colors.black,
          textAlign: 'center',
          marginBottom: RFValue(5),
        }}
      >
        {`${firstname} ${lastname}`}
      </RegularText>
      <BoldText
        customstyle={{
          fontSize: RFValue(25),
          color: Colors.black,
          textAlign: 'center',
          marginBottom: RFValue(5),
        }}
      >
        {phone}
      </BoldText>
      <RegularText
        customstyle={{
          fontSize: RFValue(14),
          color: Colors.black,
          textAlign: 'center',
          marginBottom: RFValue(20),
        }}
      >
        {email}
      </RegularText>
      <View style={{ paddingHorizontal: RFValue(24) }}>
        {/*<Action*/}
        {/*  backgroundColor="#1969C5"*/}
        {/*  title="Edit Profile"*/}
        {/*  action={() => navigate('EditProfile')}*/}
        {/*/>*/}
        <Action
          backgroundColor="#1969C5"
          title="Change Password"
          action={() => navigate('ChangePassword')}
        />
        <Action
          backgroundColor="#1969C5"
          title="Manage Vehicle"
          action={() => navigate('ManageVehicle')}
        />
        <Action backgroundColor="#BD0000" title="Logout" action={Logout} />
      </View>
    </View>
  );
};

const Action = ({ title, action, backgroundColor }) => (
  <TouchableOpacity
    style={{
      backgroundColor,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: RFValue(50),
      borderRadius: RFValue(7),
      paddingEnd: RFValue(13.49),
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingStart: RFValue(22),
      marginBottom: RFValue(14),
    }}
    onPress={action}
  >
    <RegularText customstyle={{ color: '#FFF', fontSize: RFValue(16) }}>{title}</RegularText>
    <Icon name="chevron-right" size={18} color="#FFF" />
  </TouchableOpacity>
);

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps, { logout })(Profile);
