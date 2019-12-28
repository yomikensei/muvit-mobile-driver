import React, { Component } from 'react'
import { View,Image,ScrollView,TouchableOpacity } from 'react-native'
import BaseStyles from '../../shared/theme/base'
import TopNav from 'components/TopNav'
import RegularText from '../../components/apptext/RegularText';
import MediumText from '../../components/apptext/MediumText';
import BoldText from '../../components/apptext/BoldText';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../../shared/theme/colors';
import DeliveryAlert from '../../components/DeliveryAlert';

export default class Home extends Component {
    state = {
        historyType: 'T', //T,Y,TW,
        newDelivery: false
    }
    _onChangeHistoryType = historyType => {
        this.setState({ historyType })
    }
    _onNewDelivery = () => {
        setTimeout(() => {
            this.setState({ newDelivery: true })
        }, 3000);
    }
    _onDecline = () => {
        this.setState({ newDelivery: false })
    }
    _onAccept = () => {
        this.setState({ newDelivery: false },()=>{
            this.props.navigation.navigate('RequestInfo')
        })
    }
    componentDidMount() {
        //simulate Incoming Delivery
        this._onNewDelivery();
    }
    render() {
        const { historyType,newDelivery } = this.state;
        return (
            <>
                <DeliveryAlert 
                    show={newDelivery} 
                    onDecline={this._onDecline} 
                    onAccept={this._onAccept}
                    navigation={this.props.navigation} 
                />
                <View style={BaseStyles.dashBackground}>
                    <View style={BaseStyles.dashTop}>
                        <View style={BaseStyles.dashSummaryBox}>
                            <View>
                                <MediumText customstyle={{fontSize: RFValue(12),color: 'rgba(255,255,255,0.8)'}}>Total Profit Made</MediumText>
                                <BoldText customstyle={{fontSize: RFValue(35),color: '#FFF'}}>50,000</BoldText>
                            </View>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Wallet')} style={BaseStyles.button2}>
                                <BoldText customstyle={{fontSize: RFValue(10),color: Colors.primary}}>View</BoldText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={BaseStyles.dashContent}>
                        <View style={BaseStyles.tabs}>
                            <TouchableOpacity onPress={()=>this._onChangeHistoryType('T')} style={historyType === 'T' ? {...BaseStyles.tabButton,backgroundColor: Colors.primary} : BaseStyles.tabButton}>
                                <MediumText customstyle={historyType === 'T' ? {fontSize: RFValue(10),color: '#FFF'} : {fontSize: RFValue(10)}}>Today</MediumText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this._onChangeHistoryType('Y')} style={historyType === 'Y' ? {...BaseStyles.tabButton,backgroundColor: Colors.primary} : BaseStyles.tabButton}>
                                <MediumText customstyle={historyType === 'Y' ? {fontSize: RFValue(10),color: '#FFF'} : {fontSize: RFValue(10)}}>Yesterday</MediumText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this._onChangeHistoryType('TW')} style={historyType === 'TW' ? {...BaseStyles.tabButton,backgroundColor: Colors.primary} : BaseStyles.tabButton}>
                                <MediumText customstyle={historyType === 'TW' ? {fontSize: RFValue(10),color: '#FFF'} : {fontSize: RFValue(10)}}>This Week</MediumText>
                            </TouchableOpacity>
                        </View>

                        {historyType === 'T' ? <History history={[1,2,3]} navigation={this.props.navigation} /> : null}

                        {historyType === 'Y' ? <History history={[]} navigation={this.props.navigation} /> : null}

                        {historyType === 'TW' ? <History history={[]} navigation={this.props.navigation} /> : null}
                    </View>
                </View>
            </>
        )
    }
}

// History View

const History = ({history,navigation}) => {
    if (history.length > 0) {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {history.map((h,i)=>{
                    return (
                        <TouchableOpacity onPress={()=>navigation.navigate('HistoryInfo')} style={{backgroundColor: Colors.secondary,width: '100%',height: RFValue(112),borderRadius: RFValue(10),paddingHorizontal: RFValue(15),paddingVertical: RFValue(12),marginBottom: RFValue(19)}}>
                            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                                <Image resizeMode="contain" source={require('../../assets/icons/dot.png')} style={{width: RFValue(28),height: RFValue(28),marginEnd: RFValue(7)}} />
                                <View>
                                    <MediumText customstyle={{fontSize: RFValue(10),color: '#B2B8BD'}}>From</MediumText>
                                    <MediumText numberOfLines={1} customstyle={{fontSize: RFValue(18)}}>Eleganza, Lekki Phase 1</MediumText>
                                </View>
                            </View>
                            <View style={{width: '100%',height: RFValue(1),backgroundColor: 'rgba(178,184,189,0.2)',marginVertical: RFValue(10)}} />
                            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                                <Image resizeMode="contain" source={require('../../assets/icons/dot.png')} style={{width: RFValue(28),height: RFValue(28),marginEnd: RFValue(7)}} />
                                <View>
                                    <MediumText customstyle={{fontSize: RFValue(10),color: '#B2B8BD'}}>To</MediumText>
                                    <MediumText numberOfLines={1} customstyle={{fontSize: RFValue(18)}}>MKO Abiola Gardens, Alau</MediumText>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }else {
        return (
            <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                <Image source={require('../../assets/icons/empty.png')} style={{width: RFValue(126),height: RFValue(126),marginBottom: RFValue(25)}} />
                <MediumText customstyle={{fontSize: RFValue(10)}}>No Deliveries made today</MediumText>
            </View>
        )
    }
}
