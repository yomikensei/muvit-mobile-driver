import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from './colors';

const BaseStyles = StyleSheet.create({
  button: {
    width: '100%',
    height: RFValue(51),
    borderRadius: RFValue(10),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    width: RFValue(92),
    height: RFValue(28),
    backgroundColor: '#FFF',
    borderRadius: RFValue(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    width: RFValue(67),
    height: RFValue(29),
    borderRadius: RFValue(10),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: RFValue(36),
    paddingHorizontal: RFValue(29),
  },
  dashBackground: {
    flex: 1,
    backgroundColor: '#0058BF',
    paddingTop: RFValue(41),
  },
  input: {
    width: '100%',
    height: RFValue(67),
    backgroundColor: Colors.secondary,
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(17),
    justifyContent: 'center',
    marginBottom: RFValue(17),
  },
  dashTop: {
    paddingHorizontal: RFValue(27),
    marginBottom: RFValue(34),
  },
  dashContent: {
    flex: 1,
    borderTopStartRadius: RFValue(50),
    borderTopEndRadius: RFValue(50),
    backgroundColor: '#FFF',
    paddingHorizontal: RFValue(24),
    paddingTop: RFValue(35),
  },
  dashSummaryBox: {
    width: '100%',
    height: RFValue(86),
    borderRadius: RFValue(10),
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: RFValue(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(32),
  },
});

export default BaseStyles;
