import {StyleSheet} from 'react-native';
import {
  DEEP_BLUE,
  WHITE,
  GREY,
  GREY1,
  GREY2,
  GREY3,
  GREY4,
  GREY5,
  GREY6,
  GREY7,
  RED,
  BLUE
} from './Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderRadius: 37,
    paddingLeft: '8%',
    paddingRight: '8%',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '15%',
    marginBottom: '15%',
  },
  containerDeepBlue: {
    // flex: 1,
    // flexDirection: 'column',
    backgroundColor: DEEP_BLUE,
  },
  containerGrey: {
    // flex: 1,
    // flexDirection: 'column',
    backgroundColor: GREY,
  },
  fieldNameTextStyle: {
    color: BLUE,
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  fieldValueTextStyle: {
    color: '#918b8b',
    marginBottom: 10,
  },
  fieldInputTextStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1070d4',
    marginVertical: 10,
  },
  fieldValueSmallTextStyle: {
    color: '#918b8b',
    fontSize: 10,
    marginBottom: 4,
  },
  headerTextCenterStyle: {
    color: WHITE,
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 84,
  },
  headerTextLeftStyle: {
    color: WHITE,
    fontSize: 18,
  },
  inputTextStyle: {
    height: 36,
    backgroundColor: GREY1,
    color: WHITE,
    borderRadius: 10,
    paddingHorizontal: '3%',
  },
  inputTextStyleTransparent: {
    height: 36,
    color: WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GREY,
    paddingHorizontal: 10,
  },
  dividerLineStyle: {
    borderColor: '#000000',
    borderWidth: 0.3,
    marginVertical: 10,
  },
  dividerHorLineStyle: {
    borderColor: '#000000',
    borderWidth: 0.3,
    marginHorizontal: 10,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  rightContainer: {
    textAlign: 'right',
  },
  centerContainer: {
    textAlign: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: BLUE,
  },
  fieldChangeMarginStyle: {
    marginBottom: 20,
  },
  imageSubmitStyle: {
    width: 56,
    height: 56,
  },
  imageKeyPeopleStyle: {
    width: 314,
    height: 246,
  },
  textH1: {
    color: WHITE,
    fontSize: 40,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  textH2: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
  },
  textH3: {
    fontSize: 24,
    fontFamily: 'Roboto-Medium',
  },
  textH4: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
  },
  textH5: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  textH6: {
    fontSize: 14,
    fontFamily: 'Roboto-Italic',
  },
  marginLeft1: {
    marginLeft: '1%',
  },
  marginTop2: {
    marginTop: '2%',
  },
  marginBottom2: {
    marginBottom: '2%',
  },
  marginBottom5: {
    marginBottom: '5%',
  },
  marginTop5: {
    marginTop: '5%',
  },
  marginTop8: {
    marginTop: '8%',
  },
  marginTop10: {
    marginTop: '10%',
  },
  marginTop15: {
    marginTop: '15%',
  },
  paddingStart5: {
    paddingStart: '5%',
  },
  paddingEnd5: {
    paddingEnd: '5%',
  },
  paddingTop10: {
    paddingTop: '10%',
  },
  paddingBottom5: {
    paddingBottom: '5%',
  },
  paddingBottom10: {
    paddingBottom: '10%',
  },
  marginTop40: {
    marginTop: '40%',
  },
  paddingHorizontal1: {
    paddingHorizontal: '1%',
  },
  paddingHorizontal5: {
    paddingHorizontal: '5%',
  },
  paddingVertical5: {
    paddingVertical: '5%',
  },
  paddingHorizontal7: {
    paddingHorizontal: '7%',
  },
  marginStart7: {
    marginStart: '7%',
  },
  marginEnd7: {
    marginEnd: '7%',
  },
  marginEnd3: {
    marginEnd: '3%',
  },
  textDeepBlue: {
    color: DEEP_BLUE,
  },
  textRed: {
    color: RED,
  },
  textBlue: {
    color: BLUE,
  },
  textGrey: {
    color: GREY,
  },
  textGrey1: {
    color: GREY1,
  },
  textGrey2: {
    color: GREY2,
  },
  textGrey3: {
    color: GREY3,
  },
  textGrey4: {
    color: GREY4,
  },
  textGrey5: {
    color: GREY5,
  },
  textGrey6: {
    color: GREY6,
  },
  textGrey7: {
    color: GREY7,
  },
  textWhite: {
    color: WHITE,
  },
  headerHost: {
    backgroundColor: BLUE,
    borderTopStartRadius: 11,
    borderTopEndRadius: 11,
    paddingLeft: '8%',
    paddingVertical: '1%',
  },
  cardHost: {
    backgroundColor: GREY,
    borderRadius: 25,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  flexContainer: {
    flex: 1,
  },
  flexRowContainer: {
    flexDirection: 'row',
  },
  textInputRoundBorder: {
    height: 42,
    borderColor: GREY5,
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: '3%',
  },
  iconDimens: {
    width: 30,
    height: 30,
  },
  accordionContainer: {
    backgroundColor: WHITE,
    borderRadius: 37,
    paddingHorizontal: '5%',
    marginTop: '2%',
  },
  justifyContentEnd: {
    justifyContent: 'flex-end',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfRight: {
    alignSelf: 'flex-end',
  },
  signatureLabel: {
    marginTop: 5,
    marginBottom: 5,
  },
  signature: {
    flex: 1,
    height: 200,
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: '3%',
    borderColor: '#E4E4E4',
    //marginVertical: 10,
    marginBottom: 20,
  },
});
