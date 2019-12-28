import React, { Component } from 'react'
import { View,TextInput,ScrollView,TouchableOpacity } from 'react-native'
import BaseStyles from '../../shared/theme/base'
import TopNav from '../../components/topNav'
import RegularText from '../../components/apptext/RegularText';
import MediumText from '../../components/apptext/MediumText';
import BoldText from '../../components/apptext/BoldText';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Login extends Component {
    _onContinue = () => {
        this.props.navigation.navigate('Dashboard');
    }
    render() {
        return (
            <View style={BaseStyles.background}>
                <TopNav navigation={this.props.navigation} title="Login" info="please fill in all details" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={BaseStyles.input}>
                        <RegularText customstyle={{fontSize: RFValue(12)}}>Email address / Phone number</RegularText>
                        <TextInput 
                            style={{height: RFValue(30),margin: 0,padding: 0,fontSize: RFValue(18),fontFamily: 'DMSans-Medium',color: '#2C3F56'}} 
                            placeholder="John"
                        />
                    </View>
                    <View style={BaseStyles.input}>
                        <RegularText customstyle={{fontSize: RFValue(12)}}>Password</RegularText>
                        <TextInput 
                            style={{height: RFValue(30),margin: 0,padding: 0,fontSize: RFValue(18),fontFamily: 'DMSans-Medium',color: '#2C3F56'}} 
                            placeholder="*********"
                        />
                    </View>
                    <TouchableOpacity onPress={this._onContinue} style={{...BaseStyles.button,marginBottom: RFValue(35)}}>
                        <MediumText customstyle={{color: '#FFF'}}>Login</MediumText>
                    </TouchableOpacity>
                    <RegularText customstyle={{textAlign: 'center',fontSize: RFValue(12), color: '#B2B8BD'}}>forgot password ?</RegularText>
                </ScrollView>
            </View>
        )
    }
}
