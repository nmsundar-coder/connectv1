import {LOGIN, CLEAR_DATA} from './types';
import { Dispatch } from "redux";
import axios from 'axios'

let jwtDecode = require('jwt-decode');

export function login(userName?: string, password?: string, keepLoggedIn?:string, navigation?:any, isComplete?:any) {
  return (dispatch: Dispatch) => {
    if(userName!=='' && password!=='') {
      axios.post(`https://noderedheroku.herokuapp.com/v1/authenticate`, { username: userName, password })
        .then(res => {
          if(res.data && res.data.token) {
            let token = res.data.token;
            if (token !== null && token !== undefined) {
              let decoded = jwtDecode(token);
              dispatch({
                type: LOGIN,
                data: {
                  ...decoded,
                  token: res.data.token,
                  isLoggedIn: true,
                  error: '',
                  keepLoggedIn
                },
              });
              isComplete();
              navigation();
            }
          } else {
            isComplete();
            dispatch({
              type: LOGIN,
              data: {
                userName,
                password,
                error: "Username and Password doesn't match",
                isLoggedIn: false,
                token: ''
              },
            });
          }
        }, err => {
          isComplete();
          dispatch({
            type: LOGIN,
            data: {
              error: "Username and Password doesn't match",
              token: ''
            },
          });
        });
    } else {
      isComplete();
      dispatch({
        type: LOGIN,
        data: {
          error: "Username and Password should not be empty",
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