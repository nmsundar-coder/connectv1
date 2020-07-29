import {
  LOGIN,
  CLEAR_DATA,
  REGISTER,
  PRE_REGISTER,
  CALLBACK
} from '../actions/types'
  
  export type INITIAL_STATE = {
  }
  
  const INITIAL_STATE: INITIAL_STATE = {
  }
  
  export default (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
      case REGISTER: {
        return {
            ...state,
            ...action.data
        }
      }
      case PRE_REGISTER: {
        return {
            ...state,
            ...action.data
        }
      }
      case PRE_REGISTER: {
        return {
            ...state,
            ...action.data
        }
      }
      case CLEAR_DATA: {
        return {
        }
      }
      default:
        return state;
    }
  }
  