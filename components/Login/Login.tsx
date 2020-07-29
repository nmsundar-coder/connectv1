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
    userName: string,
    password: string,
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
            userName: '',
            password: '',
        }
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.buttonOpacity = new Value(1);
        this.onStateChange = event([
            {
                nativeEvent: ({ state }:any) =>
                block([
                    cond(
                    eq(state, State.END),
                    set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                    )
                ])
            }
        ]);

        this.onCloseState =  event([
            {
                nativeEvent: ({ state }:any) =>
                block([
                    cond(
                    eq(state, State.END),
                    set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                    )
                ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [100, 0],
        extrapolate: Extrapolate.CLAMP
        });
    
        this.bgY = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [-height / 3 - 50, 0],
        extrapolate: Extrapolate.CLAMP
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1,-1],
        extrapolate: Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [0,100],
        extrapolate: Extrapolate.CLAMP
        });
 
        this.textInputOpacity = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1,0],
        extrapolate: Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [180,360],
        extrapolate: Extrapolate.CLAMP
        });
    }

    componentDidUpdate() {
    }

    componentDidMount () {
        //this.props.clearData();
        console.log(1, this.props.authData);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({textOpacity: new Value(0)});
    }
    _keyboardDidHide = () =>  {
        this.setState({textOpacity: new Value(1)});
    }

    handleUserNameChange(event:any) {
        let processedData = event.nativeEvent.text;
        this.setState({userName: processedData});
    }

    handlePasswordChange(event:any) {
        let processedData = event.nativeEvent.text;
        this.setState({password: processedData});
    }

    render() {
        if(this.props.authData!==undefined) {
            if(this.props.authData.keepLoggedIn!==undefined) {
                if(this.props.authData.keepLoggedIn) {
                    this.navigation.navigate('Home');
                }
            }
        }

        const tOp = this.textOpacity;
        const animateYaxis: any = {
            transform: [
                { translateY: this.buttonY }
            ]
          }

        const animateBgYaxis: any = {
            transform: [
                { translateY: this.bgY}
            ]
        }

        const animateTextInputY: any = {
            transform: [
                { translateY: this.textInputY}
            ]
        }

        const animateCross: any = {
            transform: [{rotate: concat(this.rotateCross, 'deg')}]
        }

        return (
            <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'white'}}>
                <Animated.View style={[commonStyles.container, animateBgYaxis]}>
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
                    <Animated.View style={{opacity: this.state.textOpacity}}>
                        <Text style={{fontSize: 18, color: 'white', margin: 20, textAlign: 'justify'}}>
                            Expleo is an engineering, quality services and management consulting company. The company is active in a variety of industries, including banking and financial services, insurance, automotive and manufacturing, retail and logistics, telecommunications, energy and utilities and public services. 
                        </Text>        
                    </Animated.View>       
                </Animated.View>
                <View style={{height:'10%', flexDirection: 'row', marginHorizontal: 20}}>
                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <Animated.View style={[styles.signinBtn,{ opacity: this.buttonOpacity}, animateYaxis]}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>SIGN IN</Text>
                        </Animated.View>
                    </  TapGestureHandler>
                    <Animated.View style={[styles.registerBtn,{ opacity: this.buttonOpacity, backgroundColor: '#6846C6'}, animateYaxis]}>
                        <TouchableOpacity style={[commonStyles.button, {backgroundColor: 'transparent'}]} onPress={() => this.navigation.navigate('Registration', { name: 'Jane' })}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>REGISTER</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <Animated.View style={[{height:'10%',justifyContent: 'center',alignItems: 'center'},{ opacity: this.buttonOpacity}, animateYaxis]}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Or</Text>
                </Animated.View>
                <Animated.View style={[{justifyContent: 'center',alignItems: 'center', height: 50, marginBottom: '10%', opacity: this.buttonOpacity}, animateYaxis]}>
                    <TouchableOpacity style={{borderRadius: 5, backgroundColor: 'transparent', borderWidth: 1, borderColor: 'white',}} onPress={() => Linking.openURL('https://expleogroup.com/about-us/')}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20, color: 'white'}}>Discover Expleo</Text>
                    </TouchableOpacity>
                </Animated.View>    
                <Animated.View style={[{height: height/3+10}, commonStyles.container, {zIndex: this.textInputZindex, opacity: this.textInputOpacity, top: undefined, justifyContent: 'center', backgroundColor: 'white'}, animateTextInputY]}>
                    <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                        <Animated.View style={[styles.closeButton]}>
                            <Animated.Text style={[{fontSize: 15}, animateCross]}>X</Animated.Text>
                        </Animated.View>
                    </TapGestureHandler>
                    <TextInput
                        placeholder="Email"
                        style={[commonStyles.textInput, {marginTop: 25}]}
                        placeholderTextColor="black"
                        value={this.state.userName}
                        onChange={this.handleUserNameChange}
                    >
                        
                    </TextInput>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        style={commonStyles.textInput}
                        placeholderTextColor="black"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    >
                    </TextInput>
                    <View>
                        <CheckBox
                            title='Keep me logged in'
                            checked={this.state.keepLoggedIn}
                            containerStyle={styles.checkboxContainer1}
                            textStyle={{color: 'black', fontSize: 14}}
                            onPress={()=>{
                                let value = this.state.keepLoggedIn;
                                this.setState({
                                    keepLoggedIn: !value
                                })
                            }}
                        />
                    </View>
                    {this.props.authData.error?(
                    <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <Text style={{color: 'red', fontSize: 14, fontWeight: 'bold'}}>{this.props.authData.error}</Text>
                    </View>):undefined}
                    <Animated.View style={[commonStyles.button1,{backgroundColor: '#6846C6', height: 40}]}>
                    {this.state.isComplete?(
                        <TouchableOpacity style={[{borderRadius: 5, width: 350},commonStyles.button1,{height: 40}]} onPress={() => {
                            this.setState({isComplete: false});
                            this.props.login(this.state.userName, this.state.password, this.state.keepLoggedIn,()=>{
                                this.navigation.navigate('Home', { name: 'Jane' })
                            }, ()=> {
                                this.setState({isComplete: true})
                            });
                        }}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20, color: 'white'}}>SIGN IN</Text>
                        </TouchableOpacity>)
                        :(<ActivityIndicator size="small" color="#00ff00"></ActivityIndicator>)
                    }
                    </Animated.View>
                </Animated.View>
            </View>
        )
    }
}

function runTiming(clock:any, value:any, dest:any) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0)
    };
  
    const config = {
      duration: 500,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease)
    };
  
    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]),
      timing(clock, state, config),
      cond(state.finished, debug('stop clock', stopClock(clock))),
      state.position
    ]);
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
