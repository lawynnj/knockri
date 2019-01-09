export const FETCH_QUESTIONS_FAIL = 'FETCH_QUESTIONS_FAIL';
export const FETCH_QUESTIONS_REQUEST = 'FETCH_QUESTIONS_REQUEST';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';

const orderById = questions => {
  return questions.reduce((result, item) => {
    result[item.id] = item;
    return result;
  }, {});
};

const initState = {
  isLoading: false,
  data: {}
};

export default function(state = initState, action) {
  switch(action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    
    case FETCH_QUESTIONS_SUCCESS:
      return {
        data: orderById(action.payload),
        isLoading: false
      };
    
    case FETCH_QUESTIONS_FAIL:
      return {
        isLoading: false,
        ...state
      };

    default:
      return state;
  }
}

export const fetchQuestions = () => async dispatch => {
  try {
    dispatch({ type: FETCH_QUESTIONS_REQUEST });
    const res = await fetch('http://localhost:3010/questions');
    const data = await res.json();
    dispatch({ type: FETCH_QUESTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_QUESTIONS_FAIL });
  }
};

