import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import registerReducer from './register.reducer'
import myRequestReducer from './myrequest.reducer'
import myInterestsReducer from './myinterests.reducer'
import myinterestsReducer from './myinterests.reducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authData: authReducer,
  registration: registerReducer,
  myrequest: myRequestReducer,
  myInterests: myinterestsReducer
});
// Exports
export default rootReducer;