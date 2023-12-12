import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchAllTopicById } from "../../redux/actions/topicActions";
import { fetchAllQuizSettingsByTopicId } from "../../redux/actions/quizSettingActions";
import { fetchQuestionsByQuizSettingId } from "../../redux/actions/questionAction";
import { useSelector, useDispatch } from "react-redux";

const Quiz = ({ route }) => {
  const dispatch = useDispatch();

  const [settings, setSettings] = useState({});

  //FETCHING ALL TOPICS BY SUBJECT IDS__________________________________________________________
  const { Sub_Id } = route.params;
  //console.log("Subject id is: " + Sub_Id);
  useEffect(() => {
    dispatch(fetchAllTopicById(Sub_Id)); // Dispatch action to fetch subjects when component mounts
  }, [dispatch]);

  const topicList = useSelector((state) => state.topic);
  const { loading, error, topics } = topicList;

  //ENDFETCHING ALL TOPICS BY SUBJECT IDS__________________________________________________________

  //   console.log("_____________________________________________");
  //   console.log(topicList);

  //FETCHING ALL QUIZSETTINGS BY TOPICS IDS__________________________________________________________

  useEffect(() => {
    topicList.topic.forEach((topic) => {
      dispatch(fetchAllQuizSettingsByTopicId(topic.topic_id));
    });
  }, [dispatch, topics]);

  const quizSettingList = useSelector((state) => state.quizSetting);

  const { Loading, Error, quizSetting } = quizSettingList;

  //ENDFETCHING ALL TOPICS BY SUBJECT IDS__________________________________________________________

  console.log("_____________________________________________");
  console.log(quizSetting);

  //FETCHING ALL QUESTIONS BY QUIZSETTING IDS__________________________________________________________

  useEffect(() => {
    if (quizSettingList && quizSettingList.quizSetting) {
      quizSettingList.quizSetting.forEach((quizSetting) => {
        dispatch(fetchQuestionsByQuizSettingId(quizSetting.QuizSetting_id));
      });
    }
  }, [dispatch, quizSettingList]);

  const questionsList = useSelector((state) => state.question);

  const { Loadingg, Errorr, question } = questionsList;

  //ENDFETCHING ALL TOPICS BY SUBJECT IDS__________________________________________________________

  console.log("_____________________LIST OF QUESTIONS________________________");
  console.log(questionsList);

  return (
    <View>
      <Text>Quiz</Text>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  contents: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
