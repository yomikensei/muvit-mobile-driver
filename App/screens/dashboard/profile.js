import React, { Component } from 'react'
import { View,Image,ScrollView,TouchableOpacity } from 'react-native'
import BaseStyles from '../../shared/theme/base'
import RegularText from '../../components/apptext/RegularText';
import MediumText from '../../components/apptext/MediumText';
import BoldText from '../../components/apptext/BoldText';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../../shared/theme/colors';
import DeliveryAlert from '../../components/DeliveryAlert';

export default class Profile extends Component {
    render() {
        return (
            <View style={BaseStyles.dashBackground}>
                <Image source={{uri:`https://i.pravatar.cc/300`}} style={{width: RFValue(128),height: RFValue(128),borderRadius: RFValue(64),borderWidth: RFValue(7),borderColor: '#EFF3F6',alignSelf: 'center',marginBottom: RFValue(19)}}/>
                <RegularText customstyle={{fontSize: RFValue(22),color: '#FFF',textAlign: 'center',marginBottom: RFValue(5)}}>John Smith</RegularText>
                <BoldText customstyle={{fontSize: RFValue(25),color: '#FFF',textAlign: 'center',marginBottom: RFValue(5)}}>0818 888 4545</BoldText>
                <RegularText customstyle={{fontSize: RFValue(14),color: 'rgba(255,255,255,0.8)',textAlign: 'center',marginBottom: RFValue(41)}}>johnsmith@muvit.com</RegularText>
                <View style={{paddingHorizontal: RFValue(24)}}>
                    <Action backgroundColor="#1969C5" title="Edit Profile" />
                    <Action backgroundColor="#1969C5" title="Change Password" />
                    <Action backgroundColor="#1969C5" title="Help / Support" />
                    <Action backgroundColor="#eb7c7c" title="Logout" />
                </View>
            </View>
        )
    }
}

const Action = ({title,action,backgroundColor}) => {
    return (
        <View style={{width: '100%',height: RFValue(60),backgroundColor,borderRadius: RFValue(10),paddingEnd: RFValue(13.49),flexDirection: 'row-reverse',alignItems: 'center',justifyContent: 'space-between',paddingStart: RFValue(22),marginBottom: RFValue(14)}}>
            <TouchableOpacity>
                <Image source={require('../../assets/icons/right_arrow.png')} style={{width: RFValue(6),height: RFValue(10)}} />
            </TouchableOpacity>
            <View>
                <RegularText customstyle={{color: '#FFF',fontSize: RFValue(20)}}>{title}</RegularText>
            </View>
        </View>
    )
}
