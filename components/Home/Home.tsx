import React from 'react'
import { Text, View, Dimensions, Image, Linking} from 'react-native'
import { Value } from 'react-native-reanimated'
import {TouchableOpacity} from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {clearData} from '../actions/register.action'
import { connect } from 'react-redux';

type MyProps = {
    navigation:any,
    authData: any
}
type MyState = {
    isReady: boolean,
    textOpacity: any,
    selectedCountry: any
}
const {width,height} = Dimensions.get('window');
class Home extends React.Component<MyProps,MyState> {

    navigation: any;
    constructor(props:any) {
        super(props);
        this.navigation = props['navigation'];
        this.state = {
            isReady: false,
            textOpacity: new Value(1),
            selectedCountry: ''
        }
    }

    setSelectedCountry(value:any) {
        this.setState({selectedCountry: value});
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
                    
                    <View style={{height: '25%', marginHorizontal: 30, marginVertical: 20, backgroundColor: '#fff', flex: 1, justifyContent: 'flex-end', borderColor: '#d4d4d4', borderWidth: 1}}>
                        <TouchableOpacity style={{justifyContent: 'flex-end', height: '100%'}} onPress={() => {
                            this.navigation.navigate('Callback', { name: 'Jane' });
                        }}>
                            <Image
                                source={require('../../assets/callback.jpg')}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: '100%',
                                    height: '100%',
                                }} />
                                
                            <View style={{height: '30%', backgroundColor: '#fff', opacity: 0.7, justifyContent: 'center'}}>
                                <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold', marginLeft: 20}}> Request a Callback</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.props.authData.isApproved==='Y'?(
                    <View style={{height: '25%', marginHorizontal: 30, marginVertical: 20, backgroundColor: '#fff', flex: 1, justifyContent: 'flex-end', borderColor: '#d4d4d4', borderWidth: 1}}>
                        <TouchableOpacity style={{justifyContent: 'flex-end', height: '100%'}} onPress={() => {
                            this.navigation.navigate('Toast_CS')    
                        }}>
                            <Image
                                source={require('../../assets/interests.jpg')}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: '100%',
                                    height: '100%',
                                }} />
                                
                            <View style={{height: '30%', backgroundColor: '#fff', opacity: 0.7, justifyContent: 'center'}}>
                                <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold', marginLeft: 20}}> My Interests</Text>
                            </View>
                        </TouchableOpacity>
                    </View>):undefined}
                    {this.props.authData.isApproved==='Y'?(
                    <View style={{height: '25%', marginHorizontal: 30, marginVertical: 20, backgroundColor: '#fff', flex: 1, justifyContent: 'flex-end', borderColor: '#d4d4d4', borderWidth: 1}}>
                        <TouchableOpacity style={{justifyContent: 'flex-end', height: '100%'}} onPress={() => {
                            this.navigation.navigate('Toast_CS')    
                        }}>
                            <Image
                                source={require('../../assets/accounts.jpg')}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: '100%',
                                    height: '100%',
                                }} />
                                
                            <View style={{height: '30%', backgroundColor: '#fff', opacity: 0.7, justifyContent: 'center'}}>
                                <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold', marginLeft: 20}}> My Accounts</Text>
                            </View>
                        </TouchableOpacity>
                    </View>):undefined}
                    <View style={{height: '25%', marginHorizontal: 30, marginVertical: 20, backgroundColor: '#fff',flex: 1, justifyContent: 'flex-end', borderColor: '#d4d4d4', borderWidth: 1}}>
                        <TouchableOpacity style={{justifyContent: 'flex-end', height: '100%'}} onPress={() => Linking.openURL('https://expleogroup.com/about-us/')}>
                            <Image
                                source={require('../../assets/explore.jpg')}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: '100%',
                                    height: '100%',
                                }} />
                                
                            <View style={{height: '30%', backgroundColor: '#fff', opacity: 0.7, justifyContent: 'center'}}>
                                <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold', marginLeft: 20}}> Discover Expleo</Text>
                            </View>
                        </TouchableOpacity>
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
        clearData: () => dispatch(clearData())
    };
}
  
export default connect( mapStateToProps, bindToAction)(Home);