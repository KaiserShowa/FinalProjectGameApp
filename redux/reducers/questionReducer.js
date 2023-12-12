import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
} from "../../constants/questionConstants";

const initialState = {
  questions: [],
  Loadingg: false,
  Errorr: null,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return { ...state, Loadingg: true };

    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        Loadingg: false,
        questions: action.payload,
        Errorr: null,
      };

    case FETCH_QUESTIONS_FAILURE:
      return { ...state, Loadingg: false, Errorr: action.payload };

    default:
      return state;
  }
};

export default questionReducer;
