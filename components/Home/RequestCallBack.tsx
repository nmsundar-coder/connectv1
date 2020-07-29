import React from 'react'
import { Text,Picker, View, Dimensions, Image, Linking, ActivityIndicator} from 'react-native'
import Animated, { Value } from 'react-native-reanimated'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import commonStyles from '../Common/styles'
import {clearData, registerCallBack} from '../actions/register.action'
import { connect } from 'react-redux';
import {TextInput } from 'react-native-paper'
import styles from '../Login/styles'

type MyProps = {
    navigation:any,
    authData: any,
    registerCallBack: (data?:any, authData?:any, navigation?:any, isComplete?:any) => void,
    registration: any
}
type MyState = {
    userId: any,
    serviceType: any,
    message: any,
    isComplete: any
}
const {width,height} = Dimensions.get('window');
class RequestCallBack extends React.Component<MyProps,MyState> {

    navigation: any;
    constructor(props:any) {
        super(props);
        this.navigation = props['navigation'];
        this.state = {
            userId: '',
            serviceType: '',
            message: '',
            isComplete: true
        }
    }

    setMessage(value:any) {
        this.setState({serviceType: value});
    }

    handleOnChange(id:string, event:any) {
        const newState = { [id]: event.nativeEvent.text } as Pick<MyState, keyof MyState>;
        this.setState(newState);
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={{height: Dimensions.get('window').height}}>
                    <Image
                        source={require('../../assets/bg.png')}
                        height={height}
                        width={width}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                        }}
                    />
                    <View style={{backgroundColor: 'black', height: 50}}>
                        <View style={{flexDirection: 'row', flex:1}}>
                            <View style={{flexDirection: 'row',justifyContent: 'flex-start'}}>
                                <Image
                                source={require('../../assets/splash_icon.png')}
                                style={{width: 150, height: 40}}
                                />
                            </View>
                            {this.props.authData.isLoggedIn?
                            (<View style={{flexDirection: 'row',flex:1,justifyContent: 'flex-end', alignContent:'center', marginTop: 15, marginRight: 10}}>
                                <TouchableOpacity style={[{backgroundColor: 'transparent'}]} onPress={() => this.navigation.navigate('LeftMenu', { name: 'Jane' })}>
                                    <Image
                                        source={require('../../assets/hamburger.png')}
                                        style={{width: 20, height: 12}}
                                    />
                                </TouchableOpacity>
                            </View>):(undefined)}
                        </View>  
                    </View>                  
                    <Text style={{fontSize:25, color: 'white', marginTop: 25, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20}}>REQUEST A CALLBACK</Text>
                    <View style={{backgroundColor: 'white', marginLeft: 20, marginRight: 20, marginTop: 5, borderRadius: 5}}>
                        <Picker
                            selectedValue={this.state.serviceType}
                            onValueChange={(itemValue, itemIndex) => this.setMessage(itemValue)}>
                            <Picker.Item label="Choose a Reason" value="" />
                            <Picker.Item label="Technical Support" value="Technical Support" />
                            <Picker.Item label="Query related to Proposal" value="Query related to Proposal" />
                            <Picker.Item label="Contact Sales" value="Contact Sales" />
                            <Picker.Item label="Contact Product Manager" value="Contact Product Manager" />
                            <Picker.Item label="Others" value="Others" />
                        </Picker>
                    </View>
                    <View>
                    <TextInput
                        style={[{
                            backgroundColor: 'white',
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 5,
                            borderRadius: 5
                        },
                        (this.props.registration.error!=='' && this.props.registration.error!==undefined)?((this.state.message!==undefined && this.state.message!=='')?{}:{borderWidth:1, borderColor: 'red'}):{}]}
                        multiline={true}
                        numberOfLines={6}
                        onChange={this.handleOnChange.bind(this, 'message')}
                        />
                    </View>
                    <Animated.View style={[commonStyles.button1,{backgroundColor: '#6846C6', height: 40}]}>
                    {this.state.isComplete?(
                        <TouchableOpacity onPress={() => {
                            console.log(111);
                            this.setState({isComplete: false});
                            this.props.registerCallBack(this.state, this.props.authData, ()=> {
                                this.navigation.navigate('Toast_CB', { name: 'Jane' })
                            }, ()=> {
                                this.setState({isComplete: true});
                            });
                        }}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20, color: 'white'}}>SUBMIT</Text>
                        </TouchableOpacity>
                    ):(<ActivityIndicator size="small" color="#00ff00"></ActivityIndicator>)}
                    </Animated.View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}
const mapStateToProps = (state: any) => ({
    authData: state.authData,
    registration: state.registration
});
  
function bindToAction(dispatch: any) {
    return {
        registerCallBack: (data?: any, authData?:any, navigation?:any, isComplete?:any) =>
            dispatch(registerCallBack(data, authData, navigation, isComplete)),
        clearData: () => dispatch(clearData())
    };
}
  
export default connect( mapStateToProps, bindToAction)(RequestCallBack);