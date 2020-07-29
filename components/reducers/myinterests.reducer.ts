import {
  CLEAR_DATA,
  MYINTEREST
} from '../actions/types'
  
  export type INITIAL_STATE = {
  }
  
  const INITIAL_STATE: INITIAL_STATE = {
  }
  
  export default (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
      case MYINTEREST: {
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
  