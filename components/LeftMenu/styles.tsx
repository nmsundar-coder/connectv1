import { StyleSheet, Dimensions } from "react-native";

const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({ 
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
    profileText: {
        fontSize: 20,
        color: 'white',
        margin: 20
    },
    checkboxContainer: {
        backgroundColor: 'white',
        color: 'black',
        borderColor: 'transparent',
        marginVertical: 5,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 5
    },
    checkboxContainer1: {
        backgroundColor: 'transparent',
        color: 'white',
        borderColor: 'transparent',
        margin: 0,
    }
  });

export default styles;