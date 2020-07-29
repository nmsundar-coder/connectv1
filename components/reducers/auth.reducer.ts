import {
  CLEAR_DATA,
  LOGIN
} from '../actions/types'
  
  export type INITIAL_STATE = {
    isLoggedIn: boolean
  }
  
  const INITIAL_STATE: INITIAL_STATE = {
    isLoggedIn: false
  }
  
  export default (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
      case LOGIN: {
        return {
            ...state,
            ...action.data
        }
      }
      case CLEAR_DATA: {
        return {
          isLoggedIn: false
        }
      }
      default:
        return state;
    }
  }
  