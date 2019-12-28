import React, { Component } from 'react'
import { View,Image,ScrollView,TouchableOpacity,ImageBackground } from 'react-native'
import BaseStyles from '../../shared/theme/base'
import TopNav from 'components/TopNav'
import RegularText from '../../components/apptext/RegularText';
import MediumText from '../../components/apptext/MediumText';
import BoldText from '../../components/apptext/BoldText';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../../shared/theme/colors';
import DashNav from 'components/DashNav';

export default class Summary extends Component {
    render() {
        return (
            <ImageBackground source={require('../../assets/images/bg2.png')} style={{flex: 1,paddingHorizontal: RFValue(30),paddingTop: RFValue(50)}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <RegularText customstyle={{color: '#FFF',fontSize: RFValue(18),textAlign: 'center',marginBottom: RFValue(24)}}>Journey Ended</RegularText>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom: RFValue(70)}}>
                        <Image source={{uri:`https://i.pravatar.cc/300`}} style={{width: RFValue(48),height: RFValue(48),borderRadius: RFValue(24),borderWidth: RFValue(3),borderColor: '#EFF3F6'}}/>
                        <View>
                            <RegularText customstyle={{fontSize: RFValue(16),color: '#FFF'}}>Derek James</RegularText>
                            <BoldText customstyle={{fontSize: RFValue(22),color: '#FFF'}}>0819 675 3434</BoldText>
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
                    <View style={{marginBottom: RFValue(60)}}>
                        <RegularText customstyle={{color: '#FFF',fontSize: RFValue(18),textAlign: 'center',marginBottom: RFValue(5)}}>Price</RegularText>
                        <BoldText customstyle={{color: '#FFF',fontSize: RFValue(70),textAlign: 'center'}}>2,700</BoldText>
                        <RegularText customstyle={{color: 'rgba(255,255,255,0.8)',fontSize: RFValue(12),textAlign: 'center'}}>Cash payment</RegularText>
                    </View>
                    <View style={{flexDirection: 'row',alignItems: 'center',marginBottom: RFValue(20)}}>
                        <Image resizeMode="contain" source={require('../../assets/icons/dot2.png')} style={{width: RFValue(28),height: RFValue(28),marginEnd: RFValue(7)}} />
                        <View>
                            <MediumText customstyle={{fontSize: RFValue(10),color: 'rgba(255,255,255,0.6)'}}>From</MediumText>
                            <MediumText customstyle={{fontSize: RFValue(18),color: '#FFF'}}>Eleganza, Lekki Phase 1</MediumText>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',alignItems: 'center',marginBottom: RFValue(50)}}>
                        <Image resizeMode="contain" source={require('../../assets/icons/dot2.png')} style={{width: RFValue(28),height: RFValue(28),marginEnd: RFValue(7)}} />
                        <View>
                            <MediumText customstyle={{fontSize: RFValue(10),color: 'rgba(255,255,255,0.6)'}}>To</MediumText>
                            <MediumText customstyle={{fontSize: RFValue(18),width: '70%',color: '#FFF'}}>MKO Abiola Gardens,Alausa road, Lagos State</MediumText>
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} style={{...BaseStyles.button,backgroundColor: '#55D485',marginBottom: RFValue(17)}}>
                        <MediumText customstyle={{color: '#FFF'}}>Confirm</MediumText>
                    </TouchableOpacity>
                    <BoldText customstyle={{color: '#FFF',fontSize: RFValue(12),textAlign: 'center',marginBottom: RFValue(24)}}>Report Journey</BoldText>
                </ScrollView>
            </ImageBackground>
        )
    }
}
