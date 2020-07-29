import { StyleSheet, Dimensions } from "react-native";

const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({ 
  container: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
      height: 50,
      width: 165,
      backgroundColor: 'white',
      marginHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 2, height: 2},
      shadowColor: 'black',
      shadowOpacity: 0.2
  },
  button1: {
      height: 50,
      backgroundColor: '#23b3d9',
      color: 'white',
      marginHorizontal: 20,
      marginVertical: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 2, height: 2},
      shadowColor: 'black',
      shadowOpacity: 0.2
  },
  button2: {
      height: 50,
      backgroundColor: 'transparent',
      color: 'white',
      marginHorizontal: 20,
      marginVertical: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 2, height: 2},
      shadowColor: 'black',
      shadowOpacity: 0.2,
      borderWidth: 1,
      borderColor: 'white'
  },
  textInput: {
      height: 50,
      backgroundColor: 'white',
      borderRadius: 5,
      borderWidth: 0.5,
      paddingLeft: 10,
      borderColor: 'rgba(0,0,0,0.2)',
      shadowOffset: { width: 2, height: 2},
      shadowColor: 'black',
      shadowOpacity: 0.2,
      marginTop: 5,
      marginHorizontal: 20
  },
  closeButton: {
      height: 40,
      width: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: -20,
      left: width / 2 - 20,
      shadowOffset: { width: 2, height: 2},
      shadowColor: 'black',
      shadowOpacity: 0.8
  },
  signinBtn: {
    height: 52,
    color: 'white',
    backgroundColor: '#6846C6',
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  checkboxContainer1: {
    backgroundColor: 'transparent',
    color: 'white',
    borderColor: 'transparent',
    margin: 0,
  },
  registerBtn: {
    height: 52,
    color: 'white',
    backgroundColor: '#6846C6',
    width: 150,
    borderRadius: 5,
    alignItems: 'center',
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    shadowOffset: { width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2
  },

});

export default styles;