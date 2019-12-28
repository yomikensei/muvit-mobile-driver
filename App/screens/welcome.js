import React, { Component } from 'react'
import { View,ImageBackground,TouchableOpacity,StatusBar } from 'react-native'
import RegularText from '../components/apptext/RegularText';
import MediumText from '../components/apptext/MediumText';
import BoldText from '../components/apptext/BoldText';
import * as Animatable from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
import BaseStyles from '../shared/theme/base';

export default class Welcome extends Component {
    render() {
        return (
            <ImageBackground source={require('../assets/images/bg.png')} style={{flex: 1,paddingHorizontal: RFValue(30),paddingTop: RFValue(36),justifyContent: 'space-between'}}>
                <BoldText customstyle={{color: '#FFF',fontSize: RFValue(30),textAlign: 'center'}}>Muvit</BoldText>
                <View style={{marginBottom: RFValue(66)}}>
                    <Animatable.View duration={600} animation="slideInLeft" style={{width: '100%',marginBottom: RFValue(17)}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('PersonalInfo')} style={{...BaseStyles.button,backgroundColor: '#FFF'}}>
                            <MediumText>Get Started</MediumText>
                        </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View duration={600} animation="slideInRight" style={{width: '100%'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}  style={BaseStyles.button}>
                            <MediumText customstyle={{color: '#FFF'}}>Login</MediumText>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
            </ImageBackground>
        )
    }
}
