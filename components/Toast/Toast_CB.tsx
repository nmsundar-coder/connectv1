import React, { Component } from 'react'
import { Text,Picker, View, StyleSheet, Dimensions, Image, Keyboard, KeyboardAvoidingView, Alert} from 'react-native'
import Animated, { Easing, Value } from 'react-native-reanimated'
import {TapGestureHandler, State, TouchableOpacity} from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {TextInput, } from 'react-native-paper'
import styles from './styles'
import commonStyles from '../Common/styles'
import countries from '../../assets/countries'
import {register, clearData} from '../actions/register.action'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

type MyProps = {
    navigation:any,
    register: (data?:any, navigation?:any) => void,
    clearData: () => void
}
type MyState = {
    fullName?: any,
    emailId?: any,
    companyName?: any,
    role?: any,
    phone?: any,
    countryCode?: any,
    country?: any,
    error?: any
}
const {width,height} = Dimensions.get('window');
class Toast extends React.Component<MyProps,MyState> {

    buttonOpacity: any = '';
    onStateChange: any = '';
    onCloseState: any = '';
    buttonY: any = '';
    bgY: any = '';
    textInputZindex: any = '';
    textInputY: any = '';
    textInputOpacity: any = '';
    rotateCross: any = '';
    keyboardDidShowListener: any = '';
    keyboardDidHideListener: any = '';
    navigation: any;
    constructor(props:any) {
        super(props);
        this.navigation = props['navigation'];
        this.state = {
            country: ''
        }
    }
    setSelectedCountry(value:any) {
        this.setState({country: value});
    }

    componentDidUpdate() {
    }

  static navigationOptions = ({navigation}:{navigation:any}) => {
    return {
      //Heading/title of the header
      title: navigation.getParam('Title', 'Left Right Custom Header'),
      //Heading style
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', 'red'),
      },
      //Heading text color
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      headerRight: (
        <TouchableOpacity onPress={() => Alert.alert('Right Menu Clicked')}>
          <Text
            style={{
              color: 'white',
            }}>
            Right Menu
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('FirstPage')}>
          <Text
            style={{
              color: 'white',
            }}>
            Left Menu
          </Text>
        </TouchableOpacity>
      ),
    };
  };
    render() {
            return (
                <KeyboardAwareScrollView>
                    <View style={{height: Dimensions.get('window').height, backgroundColor: 'white'}}>
                        <View style={{marginTop: 100, marginLeft: 'auto', marginRight: 'auto', marginBottom: 25}}>
                            <Icon name="check-circle" size={150} color="#4bccb9"></Icon>
                        </View>
                        <View style={{alignSelf: 'center'}}>
                          <Text style={{fontSize:26, color: '4bccb9', marginHorizontal: 20}}>Request registered!</Text>
                        </View>
                        <Text style={{fontSize:18, color: 'black', marginHorizontal: 20, marginBottom: 30, marginTop: 15}}>Appropriate person will get in touch with you within 24 hrs</Text>

                        <Animated.View style={[commonStyles.button1,{backgroundColor: '#6846C6'}]}>
                          <TouchableOpacity style={[{borderRadius: 5, width: 350},commonStyles.button1]} onPress={() => {
                              this.navigation.navigate('MyRequests', { name: 'Jane' });
                            }}>
                              <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20, color: 'white'}}>Go My Requests</Text>
                          </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[commonStyles.button1,{backgroundColor: '#6846C6'}]}>
                          <TouchableOpacity style={[{borderRadius: 5, width: 350},commonStyles.button1]} onPress={() => {
                              this.navigation.navigate('Home', { name: 'Jane' });
                            }}>
                              <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20, color: 'white'}}>Go Back</Text>
                          </TouchableOpacity>
                        </Animated.View>
                        <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 'auto', marginRight: 'auto'}}>
                            <Image
                                source={require('../../assets/splash_icon1.jpg')}
                                style={{width: 200, height: 75}}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            )
    }
}
const mapStateToProps = (state: any) => ({
    authData: state.authData
});
  
function bindToAction(dispatch: any) {
    return {
        register: (data?: any, navigation?:any) =>
            dispatch(register(data, navigation)),
        clearData: () => dispatch(clearData())
    };
}
  
export default connect(
    mapStateToProps,
    bindToAction
  )(Toast);