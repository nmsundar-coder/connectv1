import React, { Component } from 'react'
import { Text,Picker, View, StyleSheet, Dimensions, Image, Alert} from 'react-native'
import Animated, { color } from 'react-native-reanimated'
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {TextInput, } from 'react-native-paper'
import styles from './styles'
import commonStyles from '../Common/styles'
import countries from '../../assets/countries'
import {register, clearData, preRegister} from '../actions/register.action'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import {terms} from '../util/text';

type MyProps = {
    navigation:any,
    register: (data?:any, navigation?:any) => void,
    preRegister: (data?:any, navigation?:any) => void,
    clearData: () => void,
    registration: any
}
type MyState = {
    firstName?: any,
    lastName?: any,
    emailId?: any,
    companyName?: any,
    role?: any,
    phone?: any,
    countryCode?: any,
    country?: any,
    error?: any,
    interests?:any,
    engineering?:any,
    management?:any,
    terms?:any,
    termsForm?: any,
    gender?: any,
    step?: number
}
const {width,height} = Dimensions.get('window');
class Stepper extends React.Component<MyProps,MyState> {

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
            country: '',
            gender: '',
            interests: {
                qmc: true,
                engineering: true,
                management: true,
                spacedefense: true,
                blockchain: true,
                testing: true,
                aiml: true,
                bankingfinance: true,
                insurance: true,
                telemedia: true
            },
            engineering: true,
            management: true,
            terms: false,
            termsForm: false,
            step: 1
        }
    }

    setSelectedCountry(value:any) {
        this.setState({country: value});
    }

    setCountryCode(value:any) {
        this.setState({countryCode: value});
    }

    setGender(value:any) {
        this.setState({gender: value});
    }

    componentDidUpdate() {
    }

    handleOnChange(id:string, event:any) {
        const newState = { [id]: event.nativeEvent.text } as Pick<MyState, keyof MyState>;
        this.setState(newState);
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
        const countryList = countries.map(data => {
             return <Picker.Item key={data.code} label={data.name + '(+'+ data.callingCode+')'} value={data.code} />
        });

        const countryCode = countries.map(data => {
            return <Picker.Item key={data.code} label={'(+'+ data.callingCode+') '+data.name} value={data.callingCode} />
        });
        const termsAndCondition = (
            <View style={{height: height+80}}>
                <Image
                    source={require('../../assets/bg.png')}
                    width={width}
                    height={height}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: Dimensions.get('window').width,
                        flex:1,
                        resizeMode: 'cover'
                    }}
                />
                <View style={[commonStyles.button1,{backgroundColor: 'transparent', marginTop: 5, marginBottom: 5}]}>
                    <Image
                        source={require('../../assets/splash_icon.png')}
                        style={{width: 200, height: 75, marginLeft:0, marginRight: 0}}
                    />
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={{height: '100%'}} onPress={() => {
                                this.setState({step: 1});}}>
                        <Text style={styles.box}>Personal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height: '100%'}} onPress={() => {
                                this.setState({step: 2});}}>
                        <Text style={styles.box}>Interests</Text>
                    </TouchableOpacity>
                    <Text style={[styles.box, {backgroundColor: '#fff', color: '#000'}]}>Terms</Text>
                </View>
                <View style={{marginHorizontal: 20, backgroundColor: 'white', borderRadius: 5, maxHeight: 500, overflow: 'hidden'}}>
                    <ScrollView style={{margin: 5}}>
                        <Text>
                            {terms}
                        </Text>
                    </ScrollView>
                </View>
                <View>
                    <CheckBox
                        title='I have read and agree to the terms and conditions'
                        checked={this.state.terms}
                        containerStyle={styles.checkboxContainer1}
                        textStyle={{color: 'white', fontSize: 13}}
                        onPress={()=>{
                            let value = this.state.terms;
                            this.setState({
                                terms: !value
                            })
                        }}
                    />
                </View>
                <View>
                    <Text style={{fontSize:14, color: 'red', marginLeft: 20, marginRight: 20}}>{this.state.error}{this.props.registration.error}</Text>
                </View>
                <Animated.View style={[commonStyles.button1,this.state.terms?{backgroundColor: '#6846C6'}:{backgroundColor: '#d2d2d2'}]}>
                    <TouchableOpacity style={[{backgroundColor: '#000',borderRadius: 5, width: 350},commonStyles.button1,this.state.terms?{backgroundColor: '#6846C6'}:{backgroundColor: '#d2d2d2'}]} onPress={() => {
                        if(this.state.terms) {
                            this.props.register(this.state,()=>{
                                this.navigation.navigate('Toast', { name: 'Jane' })
                            });
                            this.setState({error: ''});
                        } else {
                            this.setState({error: 'Please agree to the terms and conditions'});
                        }
                    }}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20, color: 'white'}}>REGISTER</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );  
        const regForm = (
            <View style={{height: height+80}}>
                    <Image
                        source={require('../../assets/bg.png')}
                        width={width}
                        height={height}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: Dimensions.get('window').width,
                            flex:1,
                            resizeMode: 'cover'
                        }}
                        />
                    <View style={[commonStyles.button1,{backgroundColor: 'transparent', marginTop: 5, marginBottom: 5}]}>
                        <Image
                            source={require('../../assets/splash_icon.png')}
                            style={{width: 200, height: 75, marginLeft:0, marginRight: 0}}
                            />
                    </View>
                    <View style={styles.container}>
                        <View>
                            <Text style={[styles.box, {backgroundColor: '#fff', color: '#000'}]}>Personal</Text>
                        </View>
                        <TouchableOpacity style={{height: '100%'}} onPress={() => {
                                //this.setState({step: 2});
                                }}>
                            <Text style={styles.box}>Interests</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{height: '100%'}} onPress={() => {
                            this.setState({step: 3});
                        }}>
                            <Text style={styles.box}>Terms</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TextInput
                            mode="flat"
                            label="First Name"
                            placeholder="Enter Your First Name"
                            style={[styles.textInput,(this.props.registration.error!=='' && this.props.registration.error!==undefined)?((this.state.firstName!==undefined && this.state.firstName!=='')?{}:{borderWidth:1, borderColor: 'red'}):{}]}
                            placeholderTextColor="#d4d4d4"
                            onChange={this.handleOnChange.bind(this, 'firstName')}
                            value={this.state.firstName}
                            />
                    </View>
                    <View style={{flex: 1}}>
                        <TextInput
                            mode="flat"
                            label="Last Name"
                            placeholder="Enter Your Last Name"
                            style={[styles.textInput,(this.props.registration.error!=='' && this.props.registration.error!==undefined)?((this.state.lastName!==undefined && this.state.lastName!=='')?{}:{borderWidth:1, borderColor: 'red'}):{}]}
                            placeholderTextColor="#d4d4d4"
                            onChange={this.handleOnChange.bind(this, 'lastName')}
                            value={this.state.lastName}
                            />
                    </View>
                    <View style={[{flex: 1, marginLeft: 20, marginRight: 20}]}>
                        <View style={[{backgroundColor: 'white', borderRadius: 5},(this.props.registration.error!=='' && this.props.registration.error!==undefined)?((this.state.gender!==undefined && this.state.gender!=='')?{}:{borderWidth:1, borderColor: 'red'}):{}]}>
                            <Picker
                                selectedValue={this.state.gender}
                                onValueChange={(itemValue, itemIndex) => this.setGender(itemValue)}>
                                <Picker.Item label="Select a Gender" value="" />
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Prefer not to disclose" value="other" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                    <TextInput
                        mode="flat"
                        label="Email ID"
                        placeholder="Enter Your Email ID"
                        style={[styles.textInput,{marginVertical: 5}, (this.props.registration.error!=='' && this.props.registration.error!==undefined)?((this.state.emailId!==undefined && this.state.emailId!=='')?{}:{borderWidth:1, borderColor: 'red'}):{}]}
                        placeholderTextColor="#d4d4d4"
                        onChange={this.handleOnChange.bind(this, 'emailId')}
                        value={this.state.emailId}
                        keyboardType="email-address"
                        />
                    </View>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={[{justifyContent: 'flex-start', height: 52, width: '36%', marginLeft: 20
                            ,borderWidth: 1, borderColor: '#fff', marginVertical: 5, borderRadius: 5, backgroundColor: '#fff'},
                            (this.props.registration.error!=='' && this.props.registration.error!==undefined)?((this.state.countryCode!==undefined && this.state.countryCode!=='')?{}:{borderWidth:1, borderColor: 'red'}):{}]}>
                            <Picker
                                selectedValue={this.state.countryCode}
                                onValueChange={(itemValue, itemIndex) => this.setCountryCode(itemValue)}
                                style={[{marginRight: 5, borderRadius: 5}]}>
                                <Picker.Item label="Code" value="" />
                                {countryCode}
                            </Picker>
                        </View>
                        <View style={{justifyContent: 'flex-start', width: '100%'}}>
                        <TextInput
                            mode="flat"
                            label="Phone Number"
                            placeholder="Enter Your Phone"
                            style={[styles.textInput, {marginLeft: 5, width: '52%'}, (this.props.registration.error!=='' && this.props.registration.error!==undefined)?((this.state.phone!==undefined && this.state.phone!=='')?{}:{borderWidth:1, borderColor: 'red'}):{}]}
                            placeholderTextColor="#d4d4d4"
                            keyboardType="numeric"
                            onChange={this.handleOnChange.bind(this, 'phone')}
                            value={this.state.phone}
                            />
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <TextInput
                            mode="flat"
                            label="Company Name"
                            placeholder="Enter Your Organization"
                            style={[styles.textInput, (this.props.registration.error!=='' && this.props.registration.error!==undefined)?((this.state.companyName!==undefined && this.state.companyName!=='')?{}:{borderWidth:1, borderColor: 'red'}):{}]}
                            placeholderTextColor="#d4d4d4"
                            onChange={this.handleOnChange.bind(this, 'companyName')}
                            value={this.state.companyName}
                            />
                    </View>    
                    <View style={{flex:1}}>              
                        <TextInput
                            mode="flat"
                            label="Your Role"
                            placeholder="Enter Your Role in Organization"
                            style={[styles.textInput, (this.props.registration.error!=='' && this.props.registration.error!==undefined)?((this.state.role!==undefined && this.state.role!=='')?{}:{borderWidth:1, borderColor: 'red'}):{}]}
                            placeholderTextColor="#d4d4d4"
                            onChange={this.handleOnChange.bind(this, 'role')}
                            value={this.state.role}
                            />
                    </View>
                    <View style={[{backgroundColor: 'white', marginLeft: 20, marginRight: 20, borderRadius: 5, marginVertical: 5, height: 52},(this.props.registration.error!=='' && this.props.registration.error!==undefined)?((this.state.country!==undefined && this.state.country!=='')?{}:{borderWidth:1, borderColor: 'red'}):{}]}>
                        <Picker
                            selectedValue={this.state.country}
                            onValueChange={(itemValue, itemIndex) => this.setSelectedCountry(itemValue)}>
                            <Picker.Item label="Select a Country" value="" />
                            {countryList}
                        </Picker>
                    </View>
                    {this.props.registration.error?(
                    <View>
                        <Text style={{fontSize:14, color: 'red', marginLeft: 20, marginRight: 20}}>{this.props.registration.error}</Text>
                    </View>
                    ):undefined}
                    <Animated.View style={[commonStyles.button1,{backgroundColor: '#6846C6'}]}>
                        <TouchableOpacity style={[{borderRadius: 5, width: 350},commonStyles.button1]} onPress={() => {
                            
                            this.props.preRegister(this.state, ()=> {
                                this.setState({termsForm: true,
                                    step: 2
                                });
                            })
                        }}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20, color: 'white'}}>CONTINUE</Text>
                        </TouchableOpacity>
                    </Animated.View>
{/*                     
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <Text style={{fontSize:18, color: 'white', marginLeft: 20}}>Already have an account?</Text>
                        <TouchableOpacity style={[{backgroundColor: 'transparent'}]} onPress={() => this.navigation.navigate('Login', { name: 'Jane' })}>
                            <Text style={{fontSize: 18, color: 'white', marginLeft:20}}>Sign In</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            );
            const interests = (
                <View style={{height: height+80}}>
                    <Image
                        source={require('../../assets/bg.png')}
                        width={width}
                        height={height}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: Dimensions.get('window').width,
                            flex:1,
                            resizeMode: 'cover'
                        }}
                        />
                    <View style={[commonStyles.button1,{backgroundColor: 'transparent', marginTop: 5, marginBottom: 5}]}>
                        <Image
                            source={require('../../assets/splash_icon.png')}
                            style={{width: 200, height: 75, marginLeft:0, marginRight: 0}}
                            />
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity style={{height: '100%'}} onPress={() => {
                            this.setState({step: 1});}}>
                            <Text style={styles.box}>Personal</Text>
                        </TouchableOpacity>
                        <Text style={[styles.box, {backgroundColor: '#fff', color: '#000'}]}>Interests</Text>
                        <TouchableOpacity style={{height: '100%'}}>
                            <Text style={styles.box}>Terms</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{fontSize:18, color: 'white', marginLeft: 10, marginVertical: 5}}>Choose what you are interested in</Text>
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
                    </View>
                    <Animated.View style={[commonStyles.button1,{backgroundColor: '#6846C6'}]}>
                        <TouchableOpacity style={[{borderRadius: 5, width: 350},commonStyles.button1]} onPress={() => {
                            this.setState({step: 3});
                        }}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 15, marginLeft: 20, marginRight: 20, color: 'white'}}>CONTINUE</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            ); 
            
            return (
                <KeyboardAwareScrollView>
                {this.state.step===1?regForm:undefined}
                {this.state.step===2?interests:undefined}
                {this.state.step===3?termsAndCondition:undefined}
            </KeyboardAwareScrollView>
        )
    }
}
const mapStateToProps = (state: any) => ({
    registration: state.registration
});

function bindToAction(dispatch: any) {
    return {
        register: (data?: any, navigation?:any) =>
            dispatch(register(data, navigation)),
        clearData: () => dispatch(clearData()),
        preRegister: (data?: any, navigation?:any) => dispatch(preRegister(data, navigation))
    };
}
  
export default connect(
    mapStateToProps,
    bindToAction
  )(Stepper);