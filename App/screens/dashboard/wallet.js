import React, { Component } from 'react'
import { View,Image,ScrollView,TouchableOpacity } from 'react-native'
import BaseStyles from '../../shared/theme/base'
import RegularText from '../../components/apptext/RegularText';
import MediumText from '../../components/apptext/MediumText';
import BoldText from '../../components/apptext/BoldText';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../../shared/theme/colors';
import DeliveryAlert from '../../components/deliveryalert';

export default class Wallet extends Component {
    render() {
        return (
            <View style={BaseStyles.dashBackground}>
                <View style={BaseStyles.dashTop}>
                    <View style={{...BaseStyles.dashSummaryBox,marginBottom: RFValue(17)}}>
                        <View>
                            <MediumText customstyle={{fontSize: RFValue(12),color: 'rgba(255,255,255,0.8)'}}>Balance</MediumText>
                            <BoldText customstyle={{fontSize: RFValue(35),color: '#FFF'}}>5,000</BoldText>
                        </View>
                        <TouchableOpacity style={BaseStyles.button2}>
                            <BoldText customstyle={{fontSize: RFValue(10),color: Colors.primary}}>Withdraw</BoldText>
                        </TouchableOpacity>
                    </View>
                    <View style={{...BaseStyles.dashSummaryBox,marginBottom: RFValue(17)}}>
                        <View>
                            <MediumText customstyle={{fontSize: RFValue(12),color: 'rgba(255,255,255,0.8)'}}>Pending amount</MediumText>
                            <BoldText customstyle={{fontSize: RFValue(35),color: '#FFF'}}>22,500</BoldText>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
                        <RegularText customstyle={{color: 'rgba(255,255,255,0.6)',fontSize: RFValue(12)}}>next payment date</RegularText>
                        <BoldText customstyle={{color: '#FFF',fontSize: RFValue(12)}}>Monday, 28th August 2019</BoldText>
                    </View>
                </View>
                <View style={BaseStyles.dashContent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <RegularText customstyle={{fontSize: RFValue(14),marginBottom: RFValue(30)}}>Accounts</RegularText>
                        <Accounts 
                            backgroundColor={Colors.primary} 
                            accountNumber="0006566463"
                            bank="Access Bank"
                        />
                        <Accounts 
                            backgroundColor="#55D485"
                            accountNumber="0006566463"
                            bank="Access Bank"
                        />
                        <Accounts 
                            backgroundColor="#8291A4"
                            accountNumber="0006566463"
                            bank="Access Bank"
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const Accounts = ({backgroundColor,accountNumber,bank}) => {
    return (
        <View style={{width: '100%',height: RFValue(88),backgroundColor,borderRadius: RFValue(10),paddingEnd: RFValue(13.49),flexDirection: 'row-reverse',alignItems: 'center',justifyContent: 'space-between',paddingStart: RFValue(22),marginBottom: RFValue(14)}}>
            <TouchableOpacity>
                <Image source={require('../../assets/icons/exit2.png')} style={{width: RFValue(20),height: RFValue(20)}} />
            </TouchableOpacity>
            <View>
                <BoldText customstyle={{color: '#FFF',fontSize: RFValue(25)}}>{accountNumber}</BoldText>
                <RegularText customstyle={{color: '#FFF',fontSize: RFValue(14)}}>{bank}</RegularText>
            </View>
        </View>
    )
}