import {
  LOGIN,
  CLEAR_DATA,
  REGISTER,
  PRE_REGISTER,
  CALLBACK,
  CLEAR_ERROR
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
      case CALLBACK: {
        return {
            ...state,
            ...action.data
        }
      }
      case CLEAR_DATA: {
        return {
        }
      }
      case CLEAR_ERROR: {
        return {
          ...state,
          error: ''
        }
      }
      default:
        return state;
    }
  }
  