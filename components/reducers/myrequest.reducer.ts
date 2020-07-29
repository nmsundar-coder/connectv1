import {
  CLEAR_DATA,
  MYREQUEST
} from '../actions/types'
  
  export type INITIAL_STATE = {
  }
  
  const INITIAL_STATE: INITIAL_STATE = {
  }
  
  export default (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
      case MYREQUEST: {
        return {
          data: action.data
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
  