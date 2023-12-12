import {
  FETCH_QUIZ_SETTING_REQUEST,
  FETCH_QUIZ_SETTING_SUCCESS,
  FETCH_QUIZ_SETTING_FAILURE,
} from "../../constants/quizSettingConstants";

const initialState = {
  quizSetting: [],
  Loading: false,
  Error: null,
};

const quizSettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZ_SETTING_REQUEST:
      return { ...state, Loading: true };

    case FETCH_QUIZ_SETTING_SUCCESS:
      return {
        ...state,
        Loading: false,
        quizSetting: action.payload,
        Error: null,
      };

    case FETCH_QUIZ_SETTING_FAILURE:
      return { ...state, Loading: false, Error: action.payload };

    default:
      return state;
  }
};

export default quizSettingReducer;
