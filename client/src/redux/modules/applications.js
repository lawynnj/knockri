export const FETCH_APPLICATIONS_FAIL = 'FETCH_APPLICATIONS_FAIL';
export const FETCH_APPLICATIONS_REQUEST = 'FETCH_APPLICATIONS_REQUEST';
export const FETCH_APPLICATIONS_SUCCESS = 'FETCH_APPLICATIONS_SUCCESS';

export const SAVE_COMMENT_FAIL = 'FETCH_COMMENT_FAIL';
export const SAVE_COMMENT_REQUEST = 'FETCH_COMMENT_REQUEST';
export const SAVE_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';

const orderById = applications => {
  // convert array of applications to a map using the application id as key
  return applications.reduce((result, item) => {
    const temp = {...item};
    // convert array of videos to a map using questionId as key
    temp.videos = item.videos.reduce((res, vid) => {
      res[vid.questionId] = vid;
      return res;
    }, {});

    result[item.id] = temp;
    return result;
  }, {});
};

const initState = {
  isLoading: false,
  saveSuccess: true,
  data: {}
};

export default function(state = initState, action) {
  switch(action.type) {
    case FETCH_APPLICATIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    
    case FETCH_APPLICATIONS_SUCCESS:
      return {
        data: orderById(action.payload),
        isLoading: false
      };
    
    case FETCH_APPLICATIONS_FAIL:
      return {
        isLoading: false,
        ...state
      };
    
    case SAVE_COMMENT_SUCCESS:
      return {
        ...state,
        saveSuccess: true
      };
    
    case SAVE_COMMENT_FAIL:
      return {
        ...state,
        saveSuccess: false,
      };

    default:
      return state;
  }
}

export const fetchApplications = () => async dispatch => {
  try {
   
    dispatch({ type: FETCH_APPLICATIONS_REQUEST });
    const res = await fetch('http://localhost:3010/applications');
    const data = await res.json();
    dispatch({ type: FETCH_APPLICATIONS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: FETCH_APPLICATIONS_FAIL });
  }
};

export const saveComment = (appId, questionId, comment, successCB, failCB) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAVE_COMMENT_REQUEST });
    
    // append new comment to existing comments for the video
    const comments = getState().applications.data[appId].videos[questionId].comments;
    const newComments = comments.length ? `${comments},${comment}` : comment; //assuming they never use commas in their comments

    // try to post comment
    const res = await fetch(`http://localhost:3010/applications/${appId}/videos?questionId=${questionId}/comment`, {
      method: 'POST',
      headers: {
        'Content-type': 'text/plain'
      },
      body: newComments
    });

    if(res.status === 200 && Response.ok) {
      dispatch({ type: SAVE_COMMENT_SUCCESS });
      successCB();
      return;
    }

    throw new Error('failed to save comments.');    
  
  } catch (error) {
    dispatch({ type: SAVE_COMMENT_FAIL });
    failCB();    
  }
};