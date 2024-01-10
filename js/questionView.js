import View from "./View";
import shuffle from "../node_modules/lodash/shuffle.js";
import { bind } from "lodash";
import endView from "./endView.js";
class QuestionView extends View {
  _questionContainer = document.querySelector(".wrapper_question_container");
  _questionInfo = document.querySelector(".wrapper_question_info");
  _answerForm = document.querySelector(".answer_form");
  _inputs;
  _btn;
  constructor() {
    super();
  }
  disableStartPanel() {
    this._startPanel.style.display = "none";
  }
  enableQuestionPanel() {
    this._questionContainer.style.display = "flex";
  }
  _renderQuestion(question, actualQuestion, totalQuestion) {
    this._questionInfo.innerHTML = "";
    const markup = `
    <h2 class="question_title">
              Question <span class="number_of_question">${actualQuestion} </span
              ><span class="simple_tag">/</span>
              <span class="total_question">${totalQuestion} </span>
    </h2>
            <p class="main_question">
              ${question}
            </p>
    `;
    this._questionInfo.insertAdjacentHTML("afterbegin", markup);
  }
  _renderButton() {
    const markup = ' <button type="button" class="submit_btn">Submit</button>';
    this._answerForm.insertAdjacentHTML("beforeend", markup);
  }

  _renderAnswers(answers) {
    this._answerForm.innerHTML = "";

    const markup = answers
      .map((answer, index) => {
        return `
        <label for="answer-${index}" class="answer_form_label">


      <div class="answer_div">
        <label for="answer-${index}" class="answer_form_label">${answer}</label>
        <input
        type="radio"
        name="question_field"
        class="answer_radio_input"
        id="answer-${index}"
      />
    </div>
    </label>

      `;
      })
      .join("");

    // this._answerForm.insertAdjacentElement("afterbegin", markup);
    this._answerForm.insertAdjacentHTML("afterbegin", markup);
    // _answerForm.insertAdjacentHTML("afterbegin", markup);
  }

  render(question, actualQuestion, totalQuestion, user, state) {
    if (!question) {
      endView.displayEndPanel(user, totalQuestion, state);
      return;
    }
    this._renderQuestion(question.question, actualQuestion, totalQuestion);

    this._renderAnswers(question.answers);
    this._renderButton();
  }

  _disableInput() {
    this._inputs.forEach((inpt) => {
      inpt.disabled = true;
    });
  }
  _disabledBtn() {
    this._btn.disabled = true;
  }

  markAnswer(result, questionObj) {
    const userDiv = this._inputs.find((inpt) => inpt.checked)?.parentElement;

    const correctAnswer = questionObj.correct_answer;
    let correctInpt;
    this._inputs.forEach((inpt) => {
      if (inpt.previousElementSibling.textContent === correctAnswer) {
        correctInpt = inpt.previousElementSibling;
      }
    });
    const correctDiv = correctInpt.parentElement;
    if (!userDiv) {
      correctDiv.style.border = "1px solid lightgreen";
      return;
    }
    if (result) userDiv.style.border = "1px solid lightgreen";
    else if (!result) {
      userDiv.style.border = "1px solid red";
      correctDiv.style.border = "1px solid lightgreen";
    }

    this._disableInput();
  }

  addHandlerClickForm(handler) {
    const bindObject = this;

    this._questionContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".submit_btn");
      if (!btn) return;
      bindObject._btn = btn;
      const elements = Array.from(bindObject._answerForm.elements);
      bindObject._inputs = elements.filter((el) => el.nodeName === "INPUT");

      handler(bindObject._inputs);
    });
  }
  addHandlerClick(handler) {
    const bindObject = this;
    this._questionContainer.addEventListener("click", function (e) {
      const btn = e.target.closest(".submit_btn");
      if (!btn) return;
      bindObject._disabledBtn();
      setTimeout(handler, 1000);
    });
  }
}

export default new QuestionView();
