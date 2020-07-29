import React from 'react'
import { Text, View, Dimensions, Keyboard, Linking} from 'react-native'
import Svg, {Image} from 'react-native-svg'
import Animated, { Easing } from 'react-native-reanimated'
import {TapGestureHandler, State, TextInput, TouchableOpacity} from 'react-native-gesture-handler'
import styles from './styles'
import commonStyles from '../Common/styles'
import {login, clearData} from '../actions/auth.action'
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements'
import { ActivityIndicator } from 'react-native-paper'

type MyProps = {
    navigation:any,
    updateEmail: any,
    authData: any,
    login: (userName?:any, password?:any, keepLoggedIn?:any, navigation?:any, isComplete?:any) => void,
    clearData: () => void
}
type MyState = {
    isReady: boolean,
    textOpacity: any,
    keepLoggedIn: boolean,
    isComplete: boolean
}
const {width,height} = Dimensions.get('window');
const {Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate, concat } = Animated;
class Login extends React.Component<MyProps,MyState> {

    buttonOpacity: any = '';
    textOpacity: any = '';
    onStateChange: any = '';
    onCloseState: any = '';
    buttonY: any = '';
    bgY: any = '';
    textInputZindex: any = '';
    textInputY: any = '';
    textInputOpacity: any = '';
    rotateCross: any = '';
    keyboardDidShowListener: any = '';
    keyboardDidHideListener: any = ''
    navigation:any;
    constructor(props:any) {
        super(props);
        this.navigation = props['navigation'];
        this.state = {
            isReady: false,
            keepLoggedIn: false,
            isComplete: true,
            textOpacity: new Value(1),
        }
    }

    render() {
        if(this.props.authData!==undefined) {
            if(this.props.authData.keepLoggedIn!==undefined) {
                if(this.props.authData.keepLoggedIn) {
                    this.navigation.navigate('Home');
                }
            }
        }
        return (
            <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'white'}}>
                <Animated.View style={[commonStyles.container]}>
                    <Svg height={height+50} width={width}>
                        {/* <ClipPath id='clip'>
                            <Circle r={height+40} cx={width/2}></Circle>
                        </ClipPath> */}
                        <Image
                            href={require('../../assets/bg.png')}
                            height={height+60}
                            width={width}
                            preserveAspectRatio='xMidYMid slice'
                            clipPath='url(#clip)'
                        />
                    </Svg>
                </Animated.View>
                <Animated.View style={{flex:1}}>
                    <Svg height={height/4} width={width}>
                        <Image
                            href={require('../../assets/splash_icon.png')}
                            height={height/4}
                            width={width}
                            onPress={Keyboard.dismiss}
                        />
                    </Svg>
                    <Animated.View>
                        <Text style={{fontSize: 18, color: 'white', marginHorizontal: 10, textAlign: 'justify'}}>
                        Expleo is a trusted partner for end-to-end, integrated engineering, quality services and management consulting for digital transformation. We help businesses harness unrelenting technological change to successfully deliver innovations that will help them gain a competitive advantage and improve the everyday lives of people around the globe. We operate in over 30 countries.
                        </Text>        
                    </Animated.View>       
                </Animated.View>
                <View style={{height:'10%', flexDirection: 'row', marginHorizontal: 20}}>
                    <Animated.View>
                        <TouchableOpacity style={[styles.signinBtn]}
                        onPress={() => this.navigation.navigate('Signin', { name: 'Jane' })}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>SIGN IN</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.registerBtn,{backgroundColor: '#6846C6'}]}>
                        <TouchableOpacity style={[commonStyles.button, {backgroundColor: 'transparent'}]} onPress={() => this.navigation.navigate('Registration', { name: 'Jane' })}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>REGISTER</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <Animated.View style={[{height:'10%',justifyContent: 'center',alignItems: 'center'}]}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Or</Text>
                </Animated.View>
                <Animated.View style={[{justifyContent: 'center',alignItems: 'center', height: 50, marginBottom: '10%'}]}>
                    <TouchableOpacity style={{borderRadius: 5, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'white',}} onPress={() => Linking.openURL('https://expleogroup.com/about-us/')}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20, color: 'white'}}>Discover Expleo</Text>
                    </TouchableOpacity>
                </Animated.View>    
            </View>
        )
    }
}

const mapStateToProps = (state: any) => ({
    authData: state.authData
  });
  
  function bindToAction(dispatch: any) {
    return {
        login: (userName?: string, password?:string, keepLoggedIn?:string, navigation?:any, isComplete?:any) =>
            dispatch(login(userName,password,keepLoggedIn, navigation, isComplete)),
        clearData: () => dispatch(clearData())
    };
  }
  
  export default connect(
    mapStateToProps,
    bindToAction
  )(Login);
