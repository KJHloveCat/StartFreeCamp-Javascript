const e_mContainer = document.querySelector("#error__message");
const d_day_container = document.querySelector("#d-day-container");
e_mContainer.style.color = "black";
let isStarted = false;
const documentArr = ["days", "hours", "minutes", "seconds"];
let targetDate;
let savedDate = localStorage.getItem("saved-date");

const dateFormMaker = () => {
  let inputYear = document.getElementById("year-input").value;
  let inputMonth = document.getElementById("month-input").value;
  let inputDay = document.getElementById("day-input").value;
  // let dateFormat = inputYear + "-" + inputMonth + "-" + inputDay;
  let dateFormat = `${inputYear}-${inputMonth}-${inputDay}`;
  if (dateFormat == "--") {
    // dataFormat input에 아무런 입력값이 없는경우 즉 처음 갱신했고, localStorage가 있는상태
    dateFormat = savedDate;
  }
  localStorage.setItem("saved-date", dateFormat);
  console.log(dateFormat);
  return dateFormat;
};

const counterMake = () => {
  e_mContainer.innerHTML = "";
  let nowDate = new Date();
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
    targetDate = new Date(dateFormMaker());
    interval = setInterval(counterMake, 1000);
  } else {
    e_mContainer.innerHTML = "<h3>타이머가 작동중입니다.</h3>";
  }
};

const stopButton = () => {
  isStarted = false;
  clearInterval(interval);
  for (let tag of documentArr) {
    document.getElementById(tag).textContent = 0;
  }
  localStorage.removeItem("saved-date");
  e_mContainer.innerHTML = "<h3>D-DAY를 입력해주세요.</h3>";
};

console.log(savedDate);
if (savedDate) {
  console.log("실행됨");
  runButton();
} else {
  e_mContainer.innerHTML = "<h3>D-DAY를 입력해주세요.</h3>";
}
