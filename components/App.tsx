import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from './Login/Login'
import Stepper from './Registration/Stepper'
import Home from './Home/Home'
import Toast from './Toast/Toast'
import Toast_CB from './Toast/Toast_CB'
import LeftNav from './LeftMenu/LeftMenu'
import RequestCallBack from './Home/RequestCallBack'
import Toast_CS from './Toast/Toast_CS';
import Toast_CI from './Toast/Toast_CI';
import Signin from './Login/Signin';
import MyRequests from './LeftMenu/MyRequests';
import Interests from './LeftMenu/Interests';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.FadeFromBottomAndroid
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="MyRequests" 
          component={MyRequests}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="Interests" 
          component={Interests}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="Registration" 
          component={Stepper}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="Callback" 
          component={RequestCallBack}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="Toast" 
          component={Toast}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="Toast_CB" 
          component={Toast_CB}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="Toast_CS" 
          component={Toast_CS}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="Toast_CI" 
          component={Toast_CI}
          options={{headerShown: false}}/>
        <Stack.Screen 
          name="LeftMenu" 
          component={LeftNav}
          options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}