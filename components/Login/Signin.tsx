import React from 'react'
import { Text, View, Dimensions, Keyboard, Linking, Image as Image1} from 'react-native'
import Svg, {Image} from 'react-native-svg'
import Animated, { Easing } from 'react-native-reanimated'
import {TapGestureHandler, State, TouchableOpacity} from 'react-native-gesture-handler'
import styles from './styles'
import commonStyles from '../Common/styles'
import {login, clearData} from '../actions/auth.action'
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements'
import { ActivityIndicator } from 'react-native-paper'
import {TextInput, } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type MyProps = {
    authData: any,
    login: (userName?:any, password?:any, keepLoggedIn?:any, navigation?:any, isComplete?:any) => void,
    clearData: () => void
}
type MyState = {
    userName: string,
    password: string,
    keepLoggedIn: boolean,
    isComplete: boolean
}
const {width,height} = Dimensions.get('window');
const {Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate, concat } = Animated;
class Signin extends React.Component<MyProps,MyState> {

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
            keepLoggedIn: false,
            isComplete: true,
            userName: '',
            password: '',
        }
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
        return (
            <KeyboardAwareScrollView>
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white', height: height}}>
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
                <View style={{position: 'absolute', top: 0, alignSelf: 'center'}}>
                    <Image1
                        source={require('../../assets/splash_icon.png')}
                        style={{width: 350, height: 150}}
                    />
                </View>
                <View>
                    <Text style={{color: 'white', fontSize: 26, alignSelf: 'center'}}>User Login</Text>
                </View>
                <View>
                    <TextInput
                        mode="flat"
                        placeholder="Email"
                        style={[commonStyles.textInput, {marginTop: 25, height: 50}]}
                        placeholderTextColor="black"
                        value={this.state.userName}
                        onChange={this.handleUserNameChange}
                    >
                        
                    </TextInput>
                    <TextInput
                        mode="flat"
                        placeholder="Password"
                        secureTextEntry={true}
                        style={[commonStyles.textInput, {height: 50}]}
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
                            textStyle={{color: 'white', fontSize: 14}}
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
                    <Animated.View style={[commonStyles.button1,{backgroundColor: '#6846C6', height: 50}]}>
                    {this.state.isComplete?(
                        <TouchableOpacity style={[{borderRadius: 5, width: 350},commonStyles.button1,{height: 50}]} onPress={() => {
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
        login: (userName?: string, password?:string, keepLoggedIn?:string, navigation?:any, isComplete?:any) =>
            dispatch(login(userName,password,keepLoggedIn, navigation, isComplete)),
        clearData: () => dispatch(clearData())
    };
  }
  
  export default connect(
    mapStateToProps,
    bindToAction
  )(Signin);
