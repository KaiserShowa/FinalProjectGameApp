import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
} from "../../constants/questionConstants";

import { supabase } from "../../supabase/supabase";

export const fetchQuestionsByQuizSettingId =
  (setting_id) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_QUESTIONS_REQUEST });

      const { data, error } = await supabase
        .from("Question")
        .select("*")
        .eq("quizSetting_id", setting_id);

      //console.log(data);

      if (error) {
        console.error("Supabase error:", error); // Log the error for debugging
        dispatch({ type: FETCH_QUESTIONS_FAILURE });
        return {
          success: false,
          message: "Question fetch failure",
        };
      }

      dispatch({ type: FETCH_QUESTIONS_SUCCESS, payload: data });
    } catch (error) {
      console.error("Fetch error:", error); // Log any other errors
      dispatch({ type: FETCH_QUESTIONS_FAILURE });
      return {
        success: false,
        message: "Question fetch failure",
      };
    }
  };
