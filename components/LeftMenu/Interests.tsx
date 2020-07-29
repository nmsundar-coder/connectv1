import React from 'react'
import { View, Dimensions, Image, Text, Animated} from 'react-native'
import {Value} from 'react-native-reanimated'
import {connect} from 'react-redux'
import {clearData, getMyRequest, getInterests, updateInterests} from '../actions/myrequest.action'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBox } from 'react-native-elements'
import commonStyles from '../Common/styles'
import styles from './styles'
import { ActivityIndicator } from 'react-native-paper'

type MyProps = {
    navigation:any,
    authData: any,
    myRequest: any,
    myInterests: any,
    getMyRequest: (userName?:any, navigation?:any, isComplete?:any) => void,
    getInterests: (userName?:any, setInterests?:any, isComplete?:any) => void,
    updateInterests: (data?:any, navigation?:any, isComplete?:any) => void,
    clearData: () => void
}
type MyState = {
    isReady: boolean,
    textOpacity: any,
    selectedCountry: any,
    settings: any,
    interests?:any,
    isComplete?:any
}
const {width,height} = Dimensions.get('window');
class Interests extends React.Component<MyProps,MyState> {

    navigation: any;
    data: any = undefined;
    constructor(props:any) {
        super(props);
        this.navigation = props['navigation'];
        this.state = {
            isReady: false,
            textOpacity: new Value(1),
            selectedCountry: '',
            settings: false,
            isComplete: true,
            interests: {
                engineering: false,
                management: false,
                spacedefense: false,
                blockchain: false,
                testing: false,
                aiml: false,
                bankingfinance: false,
                insurance: false,
                telemedia: false
            }
        }
    }
    
    componentDidMount(){
        this.props.getInterests(this.props.authData, (interests:any)=> {
            this.setState({
                interests: {
                    ...interests
                }
            })
        });
    }

    setSelectedCountry(value:any) {
        this.setState({selectedCountry: value});
    }

    render() {

        return (
            <KeyboardAwareScrollView>
                <View style={{backgroundColor: 'black', height: height}}>
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
                    <Text style={{color: 'white', fontSize: 20, margin: 20}}>Choose what you are interested in</Text>
                    <CheckBox
                            title='Management'
                            checked={this.state.interests['management']}
                            containerStyle={styles.checkboxContainer}
                            textStyle={{color: 'black', fontSize: 16}}
                            onPress={()=>{
                                let value = this.state.interests['management']?this.state.interests['management']:false;
                                this.setState({
                                    interests: {
                                        ...this.state.interests,
                                        management: !value
                                    }
                                })
                            }}
                            />
                        <CheckBox
                            title='Engineering'
                            checked={this.state.interests['engineering']}
                            containerStyle={styles.checkboxContainer}
                            textStyle={{color: 'black', fontSize: 16}}
                            onPress={()=>{
                                let value = this.state.interests['engineering']?this.state.interests['engineering']:false;
                                this.setState({
                                    interests: {
                                        ...this.state.interests,
                                        engineering: !value
                                    }
                                })
                            }}
                            />
                        {/* <CheckBox
                            title='Management consulting'
                            checked={this.state.interests['management']}
                            containerStyle={styles.checkboxContainer}
                            textStyle={{color: 'black', fontSize: 16}}
                            onPress={()=>{
                                let value = this.state.interests['management']?this.state.interests['management']:false;
                                this.setState({
                                    interests: {
                                        ...this.state.interests,
                                        management: !value
                                    }
                                })
                            }}
                            /> */}
                        <CheckBox
                            title='Space and Defense'
                            checked={this.state.interests['spacedefense']}
                            containerStyle={styles.checkboxContainer}
                            textStyle={{color: 'black', fontSize: 16}}
                            onPress={()=>{
                                let value = this.state.interests['spacedefense']?this.state.interests['spacedefense']:false;
                                this.setState({
                                    interests: {
                                        ...this.state.interests,
                                        spacedefense: !value
                                    }
                                })
                            }}
                            />
                        <CheckBox
                            title='Blockchain'
                            checked={this.state.interests['blockchain']}
                            containerStyle={styles.checkboxContainer}
                            textStyle={{color: 'black', fontSize: 16}}
                            onPress={()=>{
                                let value = this.state.interests['blockchain']?this.state.interests['blockchain']:false;
                                this.setState({
                                    interests: {
                                        ...this.state.interests,
                                        blockchain: !value
                                    }
                                })
                            }}
                            />
                        <CheckBox
                            title='Testing'
                            checked={this.state.interests['testing']}
                            containerStyle={styles.checkboxContainer}
                            textStyle={{color: 'black', fontSize: 16}}
                            onPress={()=>{
                                let value = this.state.interests['testing']?this.state.interests['testing']:false;
                                this.setState({
                                    interests: {
                                        ...this.state.interests,
                                        testing: !value
                                    }
                                })
                            }}
                            />
                        <CheckBox
                            title='AI and Machine Learning'
                            checked={this.state.interests['aiml']}
                            containerStyle={styles.checkboxContainer}
                            textStyle={{color: 'black', fontSize: 16}}
                            onPress={()=>{
                                let value = this.state.interests['aiml']?this.state.interests['aiml']:false;
                                this.setState({
                                    interests: {
                                        ...this.state.interests,
                                        aiml: !value
                                    }
                                })
                            }}
                            />
                        <CheckBox
                            title='Banking and Financial'
                            checked={this.state.interests['bankingfinance']}
                            containerStyle={styles.checkboxContainer}
                            textStyle={{color: 'black', fontSize: 16}}
                            onPress={()=>{
                                let value = this.state.interests['bankingfinance']?this.state.interests['bankingfinance']:false;
                                this.setState({
                                    interests: {
                                        ...this.state.interests,
                                        bankingfinance: !value
                                    }
                                })
                            }}
                            />
                        <CheckBox
                            title='Insurance'
                            checked={this.state.interests['insurance']}
                            containerStyle={styles.checkboxContainer}
                            textStyle={{color: 'black', fontSize: 16}}
                            onPress={()=>{
                                let value = this.state.interests['insurance']?this.state.interests['insurance']:false;
                                this.setState({
                                    interests: {
                                        ...this.state.interests,
                                        insurance: !value
                                    }
                                })
                            }}
                            />
                        <CheckBox
                            title='Telecoms and Media'
                            checked={this.state.interests['telemedia']}
                            containerStyle={styles.checkboxContainer}
                            textStyle={{color: 'black', fontSize: 16}}
                            onPress={()=>{
                                let value = this.state.interests['telemedia']?this.state.interests['telemedia']:false;
                                this.setState({
                                    interests: {
                                        ...this.state.interests,
                                        telemedia: !value
                                    }
                                })
                            }}
                            />
                    <Animated.View style={[commonStyles.button1,{backgroundColor: '#6846C6'}]}>
                        {this.state.isComplete?(
                        <TouchableOpacity style={[{borderRadius: 5, width: 350},commonStyles.button1]} onPress={() => {
                            this.setState({isComplete: false});
                            this.props.updateInterests({
                                emailId: this.props.authData.emailId,
                                interests: this.state.interests
                            },()=> {
                                this.navigation.navigate('Toast_CI', { name: 'Jane' })
                            }, ()=> {
                                this.setState({isComplete: true});
                            })
                        }}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20, color: 'white'}}>Update</Text>
                        </TouchableOpacity>): (
                            <ActivityIndicator size="small" color="#00ff00"></ActivityIndicator>
                        )}
                    </Animated.View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}
const mapStateToProps = (state: any) => ({
    authData: state.authData,
    myRequest: state.myrequest,
    myInterests: state.myInterests
});
  
function bindToAction(dispatch: any) {
    return {
        clearData: () => dispatch(clearData()),
        getMyRequest: (userName?: string, navigation?:any, isComplete?:any) =>
            dispatch(getMyRequest(userName,navigation, isComplete)),
        getInterests: (userName?: string, setInterests?:any, isComplete?:any) =>
            dispatch(getInterests(userName, setInterests, isComplete)),
        updateInterests: (data?: any, navigation?:any, isComplete?:any) => 
            dispatch(updateInterests(data, navigation, isComplete))
    };
}
  
export default connect( mapStateToProps, bindToAction)(Interests);