import React, { Component } from 'react'
import { View,Image,ScrollView,TouchableOpacity,ImageBackground } from 'react-native'
import BaseStyles from '../../shared/theme/base'
import TopNav from '../../components/topNav'
import RegularText from '../../components/apptext/RegularText';
import MediumText from '../../components/apptext/MediumText';
import BoldText from '../../components/apptext/BoldText';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../../shared/theme/colors';
import DashNav from '../../components/dashNav';

export default class Journey extends Component {
    componentDidMount() {
        //simulate user finish journey
        setTimeout(() => {
            this.props.navigation.navigate('Summary');
        }, 3000);
    }
    render() {
        return (
            <ImageBackground source={require('../../assets/images/bg2.png')} style={{flex: 1,paddingHorizontal: RFValue(30),paddingTop: RFValue(50)}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <RegularText customstyle={{color: '#FFF',fontSize: RFValue(18),textAlign: 'center',marginBottom: RFValue(24)}}>Delivering for</RegularText>
                    <Image source={{uri:`https://i.pravatar.cc/300`}} style={{width: RFValue(162),height: RFValue(162),borderRadius: RFValue(80),borderWidth: RFValue(7),borderColor: '#EFF3F6',alignSelf: 'center',marginBottom: RFValue(19)}}/>
                    <BoldText customstyle={{fontSize: RFValue(22),color: '#FFF',textAlign: 'center',marginBottom: RFValue(20)}}>Derek James</BoldText>
                    <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',marginBottom: RFValue(30)}}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/icons/msg2.png')} style={{width: RFValue(70),height: RFValue(70),borderRadius: RFValue(35),marginEnd: RFValue(20)}}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../../assets/icons/call2.png')} style={{width: RFValue(70),height: RFValue(70),borderRadius: RFValue(35),marginStart: -10}}/>
                        </TouchableOpacity>
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
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} style={{...BaseStyles.button,backgroundColor: '#F75454'}}>
                        <MediumText customstyle={{color: '#FFF'}}>End Journey</MediumText>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        )
    }
}
