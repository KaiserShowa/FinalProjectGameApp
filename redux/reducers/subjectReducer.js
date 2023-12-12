import {
  FETCH_SUBJECTS_SUCCESS,
  FETCH_SUBJECTS_FAILURE,
  FETCH_SUBJECTS_REQUEST,
  SELECT_SUBJECT,
} from "../../constants/subjectConstant";

const initialState = {
  subject: [],
  loading: false,
  error: null,
  selectedSubject: null,
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBJECTS_REQUEST:
      return { ...state, loading: true };

    case FETCH_SUBJECTS_SUCCESS:
      return { ...state, loading: false, subject: action.payload, error: null };

    case FETCH_SUBJECTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SELECT_SUBJECT:
      return { ...state, selectedSubject: action.payload };

    default:
      return state;
  }
};

export default subjectReducer;
