import {REGISTER, CLEAR_DATA, PRE_REGISTER, CALLBACK} from './types';
import { Dispatch } from "redux";
import axios from 'axios'

export function register(data: any, navigation?:any) {
  return (dispatch: Dispatch) => {
    data['phoneNo'] = data['countryCode'] + ' ' + data['phone'];
    if(data.fullName !== '' && data.email !== '' && data.country !== '') {
      axios.post(`https://noderedheroku.herokuapp.com/v2/register`, data)
        .then(res => {
          if(res.data && res.data.success === "true") {
            dispatch({
              type: REGISTER,
              data: {
                success: true,
                error: ''
              },
            });
            navigation();
          } else {
            dispatch({
              type: REGISTER,
              data: {
                error: "Registration was interupted, please check after some time",
                success: false
              },
            });
          }
        }, err => {
          dispatch({
            type: REGISTER,
            data: {
              error: "Internal error, please check after some time",
              token: ''
            },
          });
        });
    } else {
      dispatch({
        type: REGISTER,
        data: {
          error: "Please fill in the registration form",
          token: ''
        },
      });
    }
  };
}

export function preRegister(data: any, navigation?:any) {
  return (dispatch: Dispatch) => {
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(data.firstName !== '' && data.lastName !== '' && data.gender !== '' && data.emailId !== '' 
    && data.countryCode !== '' && data.phone !== '' && data.country !== '' && data.companyName !== ''  && data.role !== '' ) {
     
      if(data.firstName.match("^[a-zA-Z ]*$") != null && data.lastName.match("^[a-zA-Z ]*$") != null && reg.test(data.emailId) !== false &&
      data.phone.match("^[0-9 ]*$") != null && data.companyName.match("^[a-zA-Z ]*$") != null && data.role.match("^[a-zA-Z ]*$") != null){
         dispatch({
          type: PRE_REGISTER,
          data: {
            ...data,
            success: true,
            error: ''
          },
        });
        navigation();
      }else{
        dispatch({
          type: PRE_REGISTER,
          data: {
            error: "Please fill valid data",
            token: ''
          },
        });
      }     
     
    } else {
      dispatch({
        type: PRE_REGISTER,
        data: {
          error: "Please fill in the registration form",
          token: ''
        },
      });
    }
  };
}

export function clearData(){
  return (dispatch:Dispatch) => {
    dispatch({
      type: CLEAR_DATA,
      data: {},
    });
  }
}

export function registerCallBack(data: any, authData:any, navigation?:any, isComplete?:any) {
  return (dispatch: Dispatch) => {
    console.log(122);
    data['userId'] = authData['emailId'];
    if(data.message !== '' && data.serviceType !== '') {
      axios.post(`https://noderedheroku.herokuapp.com/v1/requestCallback`, data)
      .then(res => {
        console.log(133, res.data);
        if(res.data && res.data.success) {
          dispatch({
            type: CALLBACK,
            data: {
              success: true,
              error: ''
            },
          });
          isComplete();
          navigation();
        } else {
          isComplete();
          dispatch({
            type: CALLBACK,
            data: {
              error: "Your request was interupted, please check after some time",
              success: false
            },
          });
        }
      }, err => {
        isComplete();
        dispatch({
          type: CALLBACK,
          data: {
            error: "Internal error, please check after some time",
            token: ''
          },
        });
      });
    } else {
      isComplete();
      dispatch({
        type: CALLBACK,
        data: {
          success: true,
          error: 'Please fill all the mandatory fields'
        },
      });
    }
  };
}
