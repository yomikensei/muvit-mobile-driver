import React, { Component } from 'react'
import { View,ImageBackground,Image,TouchableOpacity } from 'react-native'
import BaseStyles from '../../shared/theme/base'
import TopNav from '../../components/topNav'
import RegularText from '../../components/apptext/RegularText';
import MediumText from '../../components/apptext/MediumText';
import BoldText from '../../components/apptext/BoldText';
import { RFValue } from 'react-native-responsive-fontsize';

export default class SignUpSuccessful extends Component {
    _onNext = () => {
        this.props.navigation.navigate('WelcomePage');
    }
    render() {
        return (
            <ImageBackground source={require('../../assets/images/bg2.png')} style={{flex: 1,paddingHorizontal: RFValue(30)}}>
                <View style={{height: '75%',justifyContent: 'center',alignItems: 'center',paddingTop: RFValue(70)}}>
                    <Image source={require('../../assets/images/mark.png')} style={{width: RFValue(172),height: RFValue(172),marginBottom: RFValue(57)}} />
                    <BoldText customstyle={{color: '#FFF',fontSize: RFValue(25)}}>Signup Successful</BoldText>
                </View>
                <TouchableOpacity onPress={this._onNext} style={{...BaseStyles.button,backgroundColor: '#FFF'}}>
                    <MediumText>Next</MediumText>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}
