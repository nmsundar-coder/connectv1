import React, { Component } from 'react'
import { Text,Picker, View, StyleSheet, Dimensions, Image, Keyboard, KeyboardAvoidingView, Alert, TouchableOpacity} from 'react-native'
import Animated, { Easing, Value } from 'react-native-reanimated'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import {clearData} from '../actions/auth.action'

type MyProps = {
    navigation:any,
    authData: any,
    clearData: () => void
}
type MyState = {
    isReady: boolean,
    textOpacity: any,
    selectedCountry: any
}
const {width,height} = Dimensions.get('window');
class LeftMenu extends React.Component<MyProps,MyState> {

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
            <View>
                <View>
                    <Image
                        source={require('../../assets/bg1.png')}
                        style={{width: undefined, height: 250}}
                        >
                    </Image>
                    <Image
                        source={require('../../assets/user.png')}
                        style={{marginLeft: 110, backgroundColor: 'white', marginRight: 110, marginTop: -225, width: 200, height: 200, borderColor: 'white', borderWidth: 1, borderRadius: 200}}
                        ></Image>
                </View>
                <View style={{backgroundColor: 'black', height: '100%'}}>
                    <View style={{marginTop: 20, marginLeft: 'auto', marginRight: 'auto'}}>
                        <Text style={styles.profileText}>Welcome, <Text style={{fontWeight: 'bold'}}>{this.props.authData.firstName} {this.props.authData.lastName} {this.props.authData.isApproved==='Y'?(<Icon name="check-circle" size={22} color="#66e066"></Icon>):(<Icon name="exclamation-triangle" size={22} color="#e6d800"></Icon>)}</Text></Text>
                    </View>
                    <View style={{margin: 20}}>
                        <Icon name="database" size={22} color="#fff">
                            <Text style={styles.profileText}>  My Requests</Text>
                        </Icon>
                    </View>
                    <View style={{margin: 20}}>
                        <Icon name="user-circle" size={22} color="#fff">
                            <Text style={styles.profileText}>  My Profile</Text>
                        </Icon>
                    </View>
                    <View style={{margin: 20}}>
                        <Icon name="newspaper-o" size={22} color="#fff">
                            <Text style={styles.profileText}>  News</Text>
                        </Icon>
                    </View>
                    <View style={{margin: 20}}>
                        <Icon name="cogs" size={22} color="#fff">
                            <Text style={styles.profileText}>  Settings</Text>
                        </Icon>
                    </View>
                    <View style={{margin: 20}}>
                    <TouchableOpacity onPress={() => {
                            this.props.clearData();
                            this.navigation.navigate('Login')
                        }}>
                        <Icon name="sign-out" size={22} color="#fff">
                        <Text style={[styles.profileText]}>  Logout</Text>  
                        </Icon>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
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
  
export default connect( mapStateToProps, bindToAction)(LeftMenu);