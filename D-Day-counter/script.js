const e_mContainer = document.querySelector("#error__message");
const d_day_container = document.querySelector("#d-day-container");
e_mContainer.style.color = "red";
let isStarted = false;

const dateFormMaker = () => {
  let inputYear = document.getElementById("year-input").value;
  let inputMonth = document.getElementById("month-input").value;
  let inputDay = document.getElementById("day-input").value;

  // let dateFormat = inputYear + "-" + inputMonth + "-" + inputDay;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDay}`;
  return dateFormat;
};

const counterMake = () => {
  const documentArr = ["days", "hours", "minutes", "seconds"];

  let nowDate = new Date();
  // let targetDate = new Date("2023-01-06");
  let targetDate = new Date(dateFormMaker());
  let remaining = targetDate - nowDate;
  // 만약, reamining이 0이라면, 타이머가 종료 되었습니다. 출력
  // 수도코드
  if (remaining <= 0) {
    e_mContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    isStarted = false;
    clearInterval(interval);

    for (let tag of documentArr) {
      document.getElementById(tag).textContent = 0;
    }
  } else if (isNaN(remaining)) {
    // 만약, 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다. 출력
    e_mContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    isStarted = false;
    clearInterval(interval);

    for (let tag of documentArr) {
      document.getElementById(tag).textContent = 0;
    }
  } else {
    const remainingObj = {
      remainingDay: Math.floor(remaining / 1000 / 3600 / 24),
      remainingHour: Math.floor((remaining / 1000 / 3600 + 9) % 24),
      remainingMin: Math.floor((remaining / 1000 / 60) % 60),
      remainingSec: Math.floor((remaining / 1000) % 60),
    };

    const timeKeys = Object.keys(remainingObj);
    let i = 0;
    for (let tag of documentArr) {
      document.getElementById(tag).textContent = remainingObj[timeKeys[i]];
      i = i + 1;
    }
  }

  //   console.log(
  //     remainingDay + "일",
  //     remainingHour + "시",
  //     remainingMin + "분",
  //     remainingSec + "초"
  //   );
};

const runButton = () => {
  if (isStarted === false) {
    isStarted = true;
    interval = setInterval(function () {
      counterMake();
    }, 1000);
  } else {
  }
};
