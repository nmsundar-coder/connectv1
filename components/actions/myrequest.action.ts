import {CLEAR_DATA, MYREQUEST, MYINTEREST} from './types';
import { Dispatch } from "redux";
import axios from 'axios'

export function getMyRequest(data: any, navigation?:any, isComplete?:any) {
  return (dispatch: Dispatch) => {
      axios.get(`https://expleoconnect.azurewebsites.net/v1/requestCallbacks?userId=`+data.emailId, {
        headers: {
          Authorization: 'Bearer '+ data.token
        }
      })
        .then(res => {
          dispatch({
            type: MYREQUEST,
            data: res.data,
          });
        }, err => {
          dispatch({
            type: MYREQUEST,
            data: {
              error: "Internal error, please check after some time",
              token: ''
            },
          });
        });
  };
}

export function getInterests(data: any, setInterests?:any, isComplete?:any) {
  return (dispatch: Dispatch) => {
      axios.get(`https://expleoconnect.azurewebsites.net/v1/userInterests/`+data.emailId, {
        headers: {
          Authorization: 'Bearer '+ data.token
        }
      })
        .then(res => {
          setInterests(res.data);
          dispatch({
            type: MYINTEREST,
            data: res.data,
          });
        }, err => {
          dispatch({
            type: MYINTEREST,
            data: {
              error: "Internal error, please check after some time",
              token: ''
            },
          });
        });
  };
}

export function updateInterests(data: any, navigation?:any, isComplete?:any) {
  return (dispatch: Dispatch) => {
    axios.put(`https://expleoconnect.azurewebsites.net/v1/userInterests`,
      {
        emailId: data.emailId,
        interests: data.interests
      },
      {
        headers: {
          Authorization: 'Bearer '+ data.token
        }
      })
      .then(res => {
        isComplete();
        navigation();
      }, err => {
        dispatch({
          type: MYINTEREST,
          data: {
            error: "Internal error, please check after some time",
            token: ''
          },
        });
      });
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
