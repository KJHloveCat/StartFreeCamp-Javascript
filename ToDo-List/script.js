const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));
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
  if (window.event.keyCode === 13 && todoInput.value) {
    createTodo();
    console.log("실행됨");
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

const weatherSearch = (position) => {
  const apiKey = "bed214c47bf220ca5766bab3a0971140";

  const openWeatherRes = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=bed214c47bf220ca5766bab3a0971140`
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json.name, json.weather[0].description);
    })
    .catch((err) => {
      console.log(err);
    });
};

const accessToGeo = (position) => {
  const positionObj = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  weatherSearch(positionObj);
};

const askForLocation = () => {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    console.log(err);
  });
};

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
