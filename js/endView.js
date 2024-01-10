class endView {
  _endContainer = document.querySelector(".wrapper-end-container");
  _questionContainer = document.querySelector(".wrapper_question_container");

  _render(user, totalQuestion) {
    const markup = `   <div class="end_div">
    <h1 class="title__app">Quiz App</h1>
    <div class="result_div">
      <p>Your Score</p>
      <div class="result_div_wrapper">
        <span class="result_span">${user.numCorrect}</span>
        <span class="simple-tag">/</span>
        <span class="number_of_question">${totalQuestion}</span>
      </div>
    </div>
    <button class="restart_btn">Restart quiz</button>
  </div>`;
    this._endContainer.insertAdjacentHTML("afterbegin", markup);
  }

  displayEndPanel(user, totalQuestion, state) {
    this._questionContainer.style.display = "none";
    this._endContainer.style.display = "flex";
    console.log(state);
    this._render(user, totalQuestion);
  }
}

export default new endView();
