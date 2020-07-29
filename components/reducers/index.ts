// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import authReducer from './auth.reducer';
import registerReducer from './register.reducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
  authData: authReducer,
  registration: registerReducer
});
// Exports
export default rootReducer;