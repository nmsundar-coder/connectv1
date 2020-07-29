import { StyleSheet, Dimensions } from "react-native";

const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({ 
    textInput: {
      height: 52,
      marginLeft: 20,
      marginRight: 20,
      marginVertical: 5,
      backgroundColor: 'white',
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: 'rgba(0,0,0,0.2)',
      shadowOffset: { width: 2, height: 2},
      shadowColor: 'black',
      shadowOpacity: 0.2
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
    checkboxContainer: {
      backgroundColor: 'transparent',
      color: 'white',
      borderColor: 'transparent',
      margin: 0,
      marginLeft: 40,
      padding: 5,
      width: '70%'
    },
    checkboxContainer1: {
      backgroundColor: 'transparent',
      color: 'white',
      borderColor: 'transparent',
      margin: 0,
    },
    terms: {
      height: 450,
      margin: 20,
      borderRadius: 5
    },
    container: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#fff',
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      height: 30,
      marginVertical: 10
    },
    box: {
      width: (Dimensions.get('window').width / 3), /* minus some value for adjust the gap between boxes */
      paddingHorizontal: 20,
      color: '#fff',
      fontSize: 18, 
      flex: 1,
      justifyContent: 'flex-end'
    }
  });

export default styles;