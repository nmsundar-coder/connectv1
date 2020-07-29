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
    }
  });

export default styles;