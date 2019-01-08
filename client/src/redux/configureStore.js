import { combineReducers } from 'redux';

import candidates from './modules/candidates';
import applications from './modules/applications';
import questions from './modules/questions';

const rootReducer = combineReducers({
  candidates,
  applications,
  questions
});

export default rootReducer;
