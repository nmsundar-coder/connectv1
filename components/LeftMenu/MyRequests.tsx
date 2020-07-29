import React from 'react'
import { View, Dimensions, Image, Text} from 'react-native'
import {Value} from 'react-native-reanimated'
import {connect} from 'react-redux'
import {clearData, getMyRequest} from '../actions/myrequest.action'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler'

type MyProps = {
    navigation:any,
    authData: any,
    myRequest: any,
    getMyRequest: (userName?:any, navigation?:any, isComplete?:any) => void,
    clearData: () => void
}
type MyState = {
    isReady: boolean,
    textOpacity: any,
    selectedCountry: any,
    settings: any
}
const {width,height} = Dimensions.get('window');
class MyRequests extends React.Component<MyProps,MyState> {

    navigation: any;
    constructor(props:any) {
        super(props);
        this.navigation = props['navigation'];
        this.state = {
            isReady: false,
            textOpacity: new Value(1),
            selectedCountry: '',
            settings: false
        }
    }
    
    componentDidMount(){
        this.props.getMyRequest(this.props.authData);
    }

    setSelectedCountry(value:any) {
        this.setState({selectedCountry: value});
    }

    render() {

        let data:any = undefined; 
        if(this.props.myRequest.data && this.props.myRequest.data.length > 0) {
            data = this.props.myRequest.data.slice(0).reverse().map((request:any) => {

                let time = new Date(request.requestedTime);

                return (<View style={{marginHorizontal: 30, marginVertical: 20, backgroundColor: '#F2F2F2', borderColor: '#d4d4d4', borderWidth: 1, borderRadius: 5}}>
                    <Text style={{margin: 5}}><Text style={{fontWeight: 'bold'}}>Request Time : </Text>{time.toUTCString()}</Text>
                    <Text style={{margin: 5}}><Text style={{fontWeight: 'bold'}}>Status : </Text><Text style={request.requestStatus==='Open'?{color: 'green'}:{color: 'red'}}>{request.requestStatus}</Text></Text>
                    <Text style={{margin: 5}}><Text style={{fontWeight: 'bold'}}>Service Type : </Text>{request.serviceType}</Text>
                    <Text style={{margin: 5}}><Text style={{fontWeight: 'bold'}}>Message : </Text></Text>
                    <Text style={{margin: 5}}>{request.message}</Text>
                </View>)
            });
        } else {
            data = (<Text style={{margin: 20}}><Text style={{fontWeight: 'bold', color: 'red'}}>Your Call back log is empty!</Text></Text>);
        }

        return (
            <KeyboardAwareScrollView style={{backgroundColor: 'black'}}>
                <View>
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
                </View>        
                <View>
                    {data}
                </View>   
            </KeyboardAwareScrollView>
        )
    }
}
const mapStateToProps = (state: any) => ({
    authData: state.authData,
    myRequest: state.myrequest
});
  
function bindToAction(dispatch: any) {
    return {
        clearData: () => dispatch(clearData()),
        getMyRequest: (userName?: string, navigation?:any, isComplete?:any) =>
            dispatch(getMyRequest(userName,navigation, isComplete)),
    };
}
  
export default connect( mapStateToProps, bindToAction)(MyRequests);