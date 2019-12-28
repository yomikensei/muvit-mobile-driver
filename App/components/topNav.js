import React, { Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import BoldText from './apptext/BoldText';
import RegularText from './apptext/RegularText';


export default class TopNav extends Component {
    render() {
        const { title,exit,navigation,info } = this.props;
        return (
            <View style={{width: '100%',marginBottom: RFValue(46)}}>
                <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: "center",width: "100%",marginBottom: RFValue(10)}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image source={require('../assets/icons/back.png')} style={{width: RFValue(22),height: RFValue(14)}} resizeMode="contain" />
                    </TouchableOpacity>
                    <BoldText customstyle={{fontSize: RFValue(20)}}>{title}</BoldText>
                    <TouchableOpacity>
                        <Image source={require('../assets/icons/exit.png')} style={{width: RFValue(14),height: RFValue(14)}} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
                <RegularText customstyle={{color: '#B2B8BD',fontSize: RFValue(12),textAlign: 'center'}}>{info}</RegularText>
            </View>
        )
    }
}
