import { getJSON } from "./helper.js";
import shuffle from "../node_modules/lodash/shuffle.js";
export const state = {
  mainSettings: {},
  categories: [],
  questions: [],

  actualQuestion: 0,
  user: {
    numCorrect: 0,
    userChoice: "",
    ifCorrect: false,
  },
  userTimeSec: 0,
};
export const loadCategories = async function (url) {
  try {
    const { trivia_categories: dataCategories } = await getJSON(url);
    dataCategories.forEach((category) => {
      state.categories.push(category);
    });
  } catch (err) {
    console.log(err);
  }
};

export const setMainSettings = function (settings) {
  Object.assign(state.mainSettings, settings);
};

export const loadQuestions = async function () {
  const url = `https://opentdb.com/api.php?amount=${state.mainSettings.numberQuestion}&category=${state.mainSettings.categoryOption}&difficulty=${state.mainSettings.lvl}&type=multiple`;
  try {
    const data = await getJSON(url);

    data.results.forEach((result) => {
      const questionObj = {
        question: result.question,
        correct_answer: result.correct_answer,
        incorrect_answers: result.incorrect_answers,
        answers: [result.correct_answer, ...result.incorrect_answers],
      };
      questionObj.answers = shuffle(questionObj.answers);
      state.questions.push(questionObj);
    });
  } catch (err) {
    console.log(err);
  }
};

export const actualQuestionFun = function () {
  if (state.actualQuestion === state.mainSettings.numberQuestion) return;
  return state.actualQuestion++;
};

const checkResult = function (userAnswer = "", curQuestion = "") {
  if (userAnswer === curQuestion.correct_answer) {
    state.user.numCorrect++;
    state.user.ifCorrect = true;
  } else {
    state.user.ifCorrect = false;
  }
  return state.user.ifCorrect;
};

export const userChoiceFun = function (elements = "") {
  const userInput = elements.find((el) => el.checked);

  if (!userInput) {
    state.user.userChoice = "";
    return checkResult();
  }
  const idUser = userInput.id.slice(-1);
  const questionObj = state.questions[state.actualQuestion - 1];
  state.user.userChoice = questionObj.answers[idUser];

  return checkResult(questionObj.answers[idUser], questionObj);
};
