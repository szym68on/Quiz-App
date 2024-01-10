import { getJSON } from "./js/helper";
import * as model from "./js/model.js";
import startView from "./js/startView.js";
import questionView from "./js/questionView.js";
import timeView from "./js/timeView.js";
const controlCategories = async function () {
  try {
    await model.loadCategories("https://opentdb.com/api_category.php");
    startView.loadViewCategories(model.state.categories);
  } catch (err) {
    console.log(err);
  }
};

const controlQuestionPanel = async function () {
  try {
    questionView.disableStartPanel();
    questionView.enableQuestionPanel();
    model.setMainSettings(startView.getStartData());

    await model.loadQuestions();
    questionView.render(
      model.state.questions[model.actualQuestionFun()],
      model.state.actualQuestion,
      model.state.mainSettings.numberQuestion
    );
    timeView.setTime();
    timeView.displayTimerInfo();
  } catch (err) {
    console.log(err);
  }
};

const controlNextQuestion = function () {
  questionView.render(
    model.state.questions[model.actualQuestionFun()],
    model.state.actualQuestion,
    model.state.mainSettings.numberQuestion,
    model.state.user,
    model.state
  );
  timeView.setTime();
  timeView.displayTimerInfo();
};

const controlUserChoice = function (inputs) {
  const result = model.userChoiceFun(inputs);

  questionView.markAnswer(
    result,
    model.state.questions[model.state.actualQuestion - 1]
  );
};

const init = function () {
  startView.addHandlerLoad(controlCategories);
  startView.addHandlerClick(controlQuestionPanel);
  questionView.addHandlerClickForm(controlUserChoice);
  questionView.addHandlerClick(controlNextQuestion);
};
init();
