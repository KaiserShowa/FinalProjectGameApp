import {
  FETCH_SUBJECTS_SUCCESS,
  FETCH_SUBJECTS_FAILURE,
  FETCH_SUBJECTS_REQUEST,
} from "../../constants/subjectConstant";

import { supabase } from "../../supabase/supabase";

export const fetchAllSubjects = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SUBJECTS_REQUEST });

    const { data, error } = await supabase.from("Subject").select("*");

    //console.log(data);

    if (error) {
      console.error("Supabase error:", error); // Log the error for debugging
      dispatch({ type: FETCH_SUBJECTS_FAILURE });
      return {
        success: false,
        message: "Subject fetch failure",
      };
    }

    dispatch({ type: FETCH_SUBJECTS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Fetch error:", error); // Log any other errors
    dispatch({ type: FETCH_SUBJECTS_FAILURE });
    return {
      success: false,
      message: "Subject fetch failure",
    };
  }
};
