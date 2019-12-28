import React, { Component } from 'react'
import { View,Image,ScrollView,TouchableOpacity } from 'react-native'
import BaseStyles from '../../shared/theme/base'
import TopNav from 'components/TopNav'
import RegularText from '../../components/apptext/RegularText';
import MediumText from '../../components/apptext/MediumText';
import BoldText from '../../components/apptext/BoldText';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../../shared/theme/colors';
import DashNav from 'components/DashNav';

export default class HistoryInfo extends Component {
    render() {
        return (
            <View style={BaseStyles.background}>
                <DashNav navigation={this.props.navigation} title="History" info="Monday 28th August 2019"  />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MediumText customstyle={{color: '#B2B8BD',fontSize: RFValue(14),textAlign: 'center',marginBottom: RFValue(24)}}>User Profile</MediumText>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom: RFValue(30)}}>
                        <Image source={{uri:`https://i.pravatar.cc/300`}} style={{width: RFValue(48),height: RFValue(48),borderRadius: RFValue(24),borderWidth: RFValue(3),borderColor: '#EFF3F6'}}/>
                        <View>
                            <RegularText customstyle={{fontSize: RFValue(16)}}>Derek James</RegularText>
                            <BoldText customstyle={{fontSize: RFValue(22)}}>0819 675 3434</BoldText>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/msg1.png')} style={{width: RFValue(40),height: RFValue(40),borderRadius: RFValue(20),zIndex: 999}}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/call1.png')} style={{width: RFValue(40),height: RFValue(40),borderRadius: RFValue(20),marginStart: -10}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <MediumText customstyle={{color: '#B2B8BD',fontSize: RFValue(14),textAlign: 'center',marginBottom: RFValue(24)}}>Location</MediumText>
                    <View style={{flexDirection: 'row',alignItems: 'center',marginBottom: RFValue(20)}}>
                        <Image resizeMode="contain" source={require('../../assets/icons/dot.png')} style={{width: RFValue(28),height: RFValue(28),marginEnd: RFValue(7)}} />
                        <View>
                            <MediumText customstyle={{fontSize: RFValue(10),color: '#B2B8BD'}}>From</MediumText>
                            <MediumText customstyle={{fontSize: RFValue(18),width: '70%'}}>Eleganza, Lekki Phase 1</MediumText>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',alignItems: 'center',marginBottom: RFValue(50)}}>
                        <Image resizeMode="contain" source={require('../../assets/icons/dot.png')} style={{width: RFValue(28),height: RFValue(28),marginEnd: RFValue(7)}} />
                        <View>
                            <MediumText customstyle={{fontSize: RFValue(10),color: '#B2B8BD'}}>To</MediumText>
                            <MediumText customstyle={{fontSize: RFValue(18),width: '70%'}}>MKO Abiola Gardens,Alausa road, Lagos State</MediumText>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom: RFValue(30)}}>
                        <View style={{width: '48%',height: RFValue(103),backgroundColor: Colors.secondary,borderRadius: RFValue(10),justifyContent: 'center'}}>
                            <RegularText customstyle={{color: '#8291A4',fontSize: RFValue(20),textAlign: 'center'}}>price</RegularText>
                            <BoldText customstyle={{fontSize: RFValue(35),textAlign: 'center'}}>2,500</BoldText>
                        </View>
                        <View style={{width: '48%',height: RFValue(103),backgroundColor: Colors.secondary,borderRadius: RFValue(10),justifyContent: 'center'}}>
                            <RegularText customstyle={{color: '#8291A4',fontSize: RFValue(20),textAlign: 'center'}}>duration</RegularText>
                            <BoldText customstyle={{fontSize: RFValue(35),textAlign: 'center'}}>1h 20m</BoldText>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
