const modal = document.getElementById("popup-form");
const btn = document.getElementById("open-button");
const span = document.getElementById("close-button");
const submitBtn = document.getElementById("btn_submit");
const card = document.getElementById("card_container");
const inputFiled = document.getElementsByTagName("input");
let todo = [];

// ========================================================

const randomIdGenerator = () => {
  // random id generator function
  let RandomNumber = Math.round(Math.random() * 1000);
  return RandomNumber;
};

// ========================================================

const CardList = () => {
  card.innerHTML = ""; // Clear the card container before adding new cards
  todo.forEach((todoData) => {
    let html = `
    <div class="card">
    <div class="content" style="background:${todoData.bgcColor}; ${
      todoData.todoCheck
        ? "text-decoration: line-through"
        : "text-decoration: none"
    }">
          <input type="checkbox" 
            onclick="updateTodoData(${todoData.id}, this)" 
            id="todoCheck" 
            name="todoCheck" 
          
            ${todoData.todoCheck ? "checked" : ""}
          />
          
              <a>
                <span class="title" style="background: ${todoData.bgcColor}">
                  ${todoData.title}
                </span>
              </a>

              <p class="desc" style="background: ${todoData.bgcColor}">
              ${todoData.description}
              </p>
              
              <i onclick="deleteTodoData(${
                todoData.id
              })" class="fa-regular fa-trash-can" id="delete" style=" background: ${
      todoData.bgcColor
    }; ${todoData.todoCheck ? "display: block" : "display: none"}" ></i>
              
            </div>
          </div>
    `;
    card.innerHTML += html;
  });
};

// ========================================================

const updateTodoData = (id, checkbox) => {
  const checkboxValue = checkbox.checked;
  // Find the correct todoData object in the todo array and update its checkbox property
  const todoItem = todo.find((item) => item.id === id);
  if (todoItem) {
    todoItem.todoCheck = checkboxValue;
  }
  CardList();
};

// ========================================================

const deleteTodoData = (id) => {
  // Find the correct todoData object in the todo array and delete
  const todoItem = todo.find((item) => item.id === id);
  if (todoItem) {
    todo.forEach((item) => {
      if (item.id === todoItem.id) {
        todo.splice(todo.indexOf(item), 1);
      }
    });
  }
  CardList();
};

// ========================================================

submitBtn.onclick = (e) => {
  e.preventDefault();
  let todoData = {
    // predefined values todo inputs
    id: randomIdGenerator(),
    title: "",
    description: "",
    bgcColor: "whitesmoke",
    todoCheck: false,
  };
  Array.from(inputFiled).forEach((inputItem, index) => {
    todoData = { ...todoData, [inputItem.name]: inputItem.value };
    if (index <= 1) inputItem.value = "";
  });

  todo.push({ ...todoData, todoCheck: false });

  CardList();
  modal.style.display = "none"; // close input field box after submit
};

// ====================================================

window.onclick = (event) => {
  // close input field box

  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// ====================================================

btn.onclick = () => {
  // appear input filed box
  modal.style.display = "block";
};

// ====================================================

span.onclick = () => {
  // disappear input filed box
  modal.style.display = "none";
};
