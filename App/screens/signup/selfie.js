import React, { Component } from 'react'
import { View,TouchableOpacity,Image } from 'react-native'
import BaseStyles from '../../shared/theme/base'
import TopNav from 'components/TopNav'
import RegularText from '../../components/apptext/RegularText';
import MediumText from '../../components/apptext/MediumText';
import BoldText from '../../components/apptext/BoldText';
import { RFValue } from 'react-native-responsive-fontsize';
import ImagePicker from 'react-native-image-crop-picker';

export default class UploadSelfie extends Component {
    state = {
        image: ''
    }
    _onContinue = () => {
        this.props.navigation.navigate('SignUpSuccessful');
    }
    //func -> add picture image
    _addProfilePicture = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true,
            compressImageQuality: 0.5,
            cropperCircleOverlay: true
        })
        .then(image => {
            this.setState({
                image: image.data
            })
        });
    }
    render() {
        return (
            <View style={BaseStyles.background}>
                <TopNav navigation={this.props.navigation} title="Signup" info="Upload selfie" />
                <View style={{height: '60%',alignItems: 'center',justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this._addProfilePicture}>
                        {this.state.image === '' ? 
                        <Image source={require('../../assets/images/selfie_default.png')} style={{width: RFValue(216),height: RFValue(216),borderRadius: RFValue(108),borderColor: '#EFF3F6',borderWidth: RFValue(10)}} />
                        : 
                        <Image source={{ uri:`data:image/jpeg;base64,${this.state.image}`}} style={{width: RFValue(216),height: RFValue(216),borderRadius: RFValue(108),borderColor: '#EFF3F6',borderWidth: RFValue(10)}} />}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this._onContinue} style={BaseStyles.button}>
                    <MediumText customstyle={{color: '#FFF'}}>Continue</MediumText>
                </TouchableOpacity>
            </View>
        )
    }
}
