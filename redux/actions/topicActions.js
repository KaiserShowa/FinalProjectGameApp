import {
  FETCH_TOPIC_REQUEST,
  FETCH_TOPIC_SUCCESS,
  FETCH_TOPIC_FAILURE,
} from "../../constants/topicConstants";

import { supabase } from "../../supabase/supabase";

export const fetchAllTopicById = (Subject_id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TOPIC_REQUEST });

    const { data, error } = await supabase
      .from("Topic")
      .select()
      .eq("subject_id", Subject_id);

    //console.log(data);

    if (error) {
      console.error("Supabase error:", error); // Log the error for debugging
      dispatch({ type: FETCH_TOPIC_FAILURE });
      return {
        success: false,
        message: "Topics fetch failure",
      };
    }

    dispatch({ type: FETCH_TOPIC_SUCCESS, payload: data });
  } catch (error) {
    console.error("Fetch error:", error); // Log any other errors
    dispatch({ type: FETCH_TOPIC_FAILURE });
    return {
      success: false,
      message: "Topics fetch failure",
    };
  }
};
