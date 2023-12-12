import {
  FETCH_QUIZ_SETTING_REQUEST,
  FETCH_QUIZ_SETTING_SUCCESS,
  FETCH_QUIZ_SETTING_FAILURE,
} from "../../constants/quizSettingConstants";

import { supabase } from "../../supabase/supabase";

export const fetchAllQuizSettingsByTopicId = (top_id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_QUIZ_SETTING_REQUEST });

    const { data, error } = await supabase
      .from("QuizSetting")
      .select()
      .eq("topic_id", top_id);

    //console.log(data);

    if (error) {
      console.error("Supabase error:", error); // Log the error for debugging
      dispatch({ type: FETCH_QUIZ_SETTING_FAILURE });
      return {
        success: false,
        message: "QuizSettings fetch failure",
      };
    }

    dispatch({ type: FETCH_QUIZ_SETTING_SUCCESS, payload: data });
  } catch (error) {
    console.error("Fetch error:", error); // Log any other errors
    dispatch({ type: FETCH_QUIZ_SETTING_FAILURE });
    return {
      success: false,
      message: "QuizSettings fetch failure",
    };
  }
};
