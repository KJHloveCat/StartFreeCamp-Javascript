const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));
const savedWeatherData = JSON.parse(localStorage.getItem("saved-weather"));
console.log(savedTodoList);

const saveItemsFn = () => {
  const saveItems = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }

  saveItems.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));
};

const createTodo = (storageData) => {
  let todoContents = todoInput.value;

  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  if (storageData) {
    todoContents = storageData.contents;
    if (storageData.complete === true) {
      newLi.classList.add("complete");
    }
  }

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    saveItemsFn();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn();
  });

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  saveItemsFn();
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

const keyCodeCheck = () => {
  if (window.event.keyCode === 13 && todoInput.value.trim()) {
    createTodo();
  }
};

const deleteAll = () => {
  const liList = document.querySelectorAll("li");
  console.log(liList);
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn();
};

const weatherDataActive = ({ location, weather }) => {
  const weatherMainList = [
    "Clear",
    "Clouds",
    "Drizzle",
    "Rain",
    "Snow",
    "Thunderstorm",
  ];
  weather = weatherMainList.includes(weather) ? weather : "Fog";
  const locationNameTag = document.querySelector("#location-name-tag");
  locationNameTag.textContent = location;
  document.body.style.backgroundImage = `url('./images/${weather}.jpg')`;

  if (
    !savedWeatherData ||
    savedWeatherData.loaction !== location ||
    savedWeatherData.weather !== weather
  ) {
    localStorage.setItem(
      "saved-weather",
      JSON.stringify({ location, weather })
    );
  }
};

const weatherSearch = ({ latitude, longitude }) => {
  const apiKey = "bed214c47bf220ca5766bab3a0971140";

  const openWeatherRes = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=bed214c47bf220ca5766bab3a0971140`
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json.name, json.weather[0].main);
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });
};

const accessToGeo = ({ coords }) => {
  const { latitude, longitude } = coords;
  // shorthand property
  const positionObj = {
    latitude,
    longitude,
  };
  weatherSearch(positionObj);
};

const askForLocation = () => {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    console.log(err);
  });
};

if (savedWeatherData) {
  weatherDataActive(savedWeatherData);
}

askForLocation();

// const promiseTest = () => {
//   return new Promise((resolver, reject) => {
//     setTimeout(() => {
//       resolver("success");
//       // reject("error");
//     }, 2000);
//   });
// };

// promiseTest().then((res) => {
//   console.log(res);
// });
