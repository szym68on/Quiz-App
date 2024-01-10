//Wszystko do poprawy
import * as model from "./model.js";
import questionView from "./questionView.js";
class timeView {
  _textTimer = document.querySelector(".in_progress_text");
  _progressBar = document.querySelector(".in_progress");
  _time;
  _timeSelectEl = document.querySelector("#time_question");
  _startTimer;
  _permTime;

  _decreaseTime() {
    if (this._time <= 0) {
      clearInterval(this._startTimer);

      return;
    }
    this._time--;
  }

  _startClock() {
    this._startTimer = setInterval(() => {
      this._decreaseTime();

      this._render();
    }, 1000);
  }

  setTime() {
    this._time = +this._timeSelectEl.selectedOptions[0].value;
    this._permTime = +this._timeSelectEl.selectedOptions[0].value;
  }
  _render() {
    let widthBar = (this._time * 100) / this._permTime;
    this._progressBar.style.width = `${widthBar}%`;
    this._textTimer.textContent = this._time;
  }

  displayTimerInfo() {
    clearInterval(this._startTimer);
    this._render();
    this._startClock();
  }
}

export default new timeView();
