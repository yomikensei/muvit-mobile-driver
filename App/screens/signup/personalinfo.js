import React, { Component } from 'react'
import { View,TextInput,ScrollView,TouchableOpacity } from 'react-native'
import BaseStyles from '../../shared/theme/base'
import TopNav from 'components/TopNav'
import RegularText from '../../components/apptext/RegularText';
import MediumText from '../../components/apptext/MediumText';
import BoldText from '../../components/apptext/BoldText';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Personalinfo extends Component {
    _onContinue = () => {
        this.props.navigation.navigate('UploadSelfie');
    }
    render() {
        return (
            <View style={BaseStyles.background}>
                <TopNav navigation={this.props.navigation} title="Signup" info="please fill in all details" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={BaseStyles.input}>
                        <RegularText customstyle={{fontSize: RFValue(12)}}>Firstname</RegularText>
                        <TextInput 
                            style={{height: RFValue(30),margin: 0,padding: 0,fontSize: RFValue(18),fontFamily: 'DMSans-Medium',color: '#2C3F56'}} 
                            placeholder="John"
                        />
                    </View>
                    <View style={BaseStyles.input}>
                        <RegularText customstyle={{fontSize: RFValue(12)}}>Lastname</RegularText>
                        <TextInput 
                            style={{height: RFValue(30),margin: 0,padding: 0,fontSize: RFValue(18),fontFamily: 'DMSans-Medium',color: '#2C3F56'}} 
                            placeholder="Smith"
                        />
                    </View>
                    <View style={BaseStyles.input}>
                        <RegularText customstyle={{fontSize: RFValue(12)}}>Email address</RegularText>
                        <TextInput 
                            style={{height: RFValue(30),margin: 0,padding: 0,fontSize: RFValue(18),fontFamily: 'DMSans-Medium',color: '#2C3F56'}} 
                            placeholder="johnsmith@muvit.com"
                        />
                    </View>
                    <View style={BaseStyles.input}>
                        <RegularText customstyle={{fontSize: RFValue(12)}}>Home address</RegularText>
                        <TextInput 
                            style={{height: RFValue(30),margin: 0,padding: 0,fontSize: RFValue(18),fontFamily: 'DMSans-Medium',color: '#2C3F56'}} 
                            placeholder="22 Road, Festac town"
                        />
                    </View>
                    <View style={BaseStyles.input}>
                        <RegularText customstyle={{fontSize: RFValue(12)}}>State</RegularText>
                        <TextInput 
                            style={{height: RFValue(30),margin: 0,padding: 0,fontSize: RFValue(18),fontFamily: 'DMSans-Medium',color: '#2C3F56'}} 
                            placeholder="Lagos"
                        />
                    </View>
                    <View style={BaseStyles.input}>
                        <RegularText customstyle={{fontSize: RFValue(12)}}>Phone number</RegularText>
                        <TextInput 
                            style={{height: RFValue(30),margin: 0,padding: 0,fontSize: RFValue(18),fontFamily: 'DMSans-Medium',color: '#2C3F56'}} 
                            placeholder="0818 233 4444"
                        />
                    </View>
                    <View style={BaseStyles.input}>
                        <RegularText customstyle={{fontSize: RFValue(12)}}>Password</RegularText>
                        <TextInput 
                            style={{height: RFValue(30),margin: 0,padding: 0,fontSize: RFValue(18),fontFamily: 'DMSans-Medium',color: '#2C3F56'}} 
                            placeholder="********"
                        />
                    </View>
                    <TouchableOpacity onPress={this._onContinue} style={{...BaseStyles.button,marginBottom: RFValue(50)}}>
                        <MediumText customstyle={{color: '#FFF'}}>Continue</MediumText>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}
