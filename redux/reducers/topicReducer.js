import {
  FETCH_TOPIC_REQUEST,
  FETCH_TOPIC_SUCCESS,
  FETCH_TOPIC_FAILURE,
} from "../../constants/topicConstants";

const initialState = {
  topics: [],
  loading: false,
  error: null,
};

const topicReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPIC_REQUEST:
      return { ...state, loading: true };

    case FETCH_TOPIC_SUCCESS:
      return { ...state, loading: false, topic: action.payload, error: null };

    case FETCH_TOPIC_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default topicReducer;
