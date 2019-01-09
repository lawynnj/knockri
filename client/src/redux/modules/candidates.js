export const FETCH_CANDIDATES_FAIL = 'FETCH_CANDIDATES_FAIL';
export const FETCH_CANDIDATES_REQUEST = 'FETCH_CANDIDATES_REQUEST';
export const FETCH_CANDIDATES_SUCCESS = 'FETCH_CANDIDATES_SUCCESS';

const orderById = candidates => {
  return candidates.reduce((result, item) => {
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
    case FETCH_CANDIDATES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    
    case FETCH_CANDIDATES_SUCCESS:
      return {
        data: orderById(action.payload),
        isLoading: false
      };
    
    case FETCH_CANDIDATES_FAIL:
      return {
        isLoading: false,
        ...state
      };

    default:
      return state;
  }
}


export const fetchCandidates = () => async dispatch => {
  try {
    dispatch({ type: FETCH_CANDIDATES_REQUEST });
    const res = await fetch('http://localhost:3010/candidates');
    const data = await res.json();
    dispatch({ type: FETCH_CANDIDATES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CANDIDATES_FAIL });
  }
};