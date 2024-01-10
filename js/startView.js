import View from "./View";

class StartView extends View {
  _parentElement = document.querySelector("#category_option");
  _startBtn = document.querySelector(".start_btn");
  loadViewCategories(categories) {
    this._parentElement.innerHTML = "";
    categories.forEach((cat) => {
      const option = document.createElement("option");

      option.value = cat.id;
      option.textContent = cat.name;
      this._parentElement.append(option);
    });
  }

  addHandlerLoad(handler) {
    window.addEventListener("load", handler);
  }
  addHandlerClick(handler) {
    this._startBtn.addEventListener("click", handler);
  }

  getStartData() {
    return {
      numberQuestion: Number(this._numberQuestions.value),
      categoryOption: this._categoryOption.value,
      lvl: this._lvl.value,
      timeQuestion: Number(this._timeQuestion.value),
    };
  }
}

export default new StartView();
