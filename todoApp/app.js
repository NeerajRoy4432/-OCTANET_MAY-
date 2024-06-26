const modal = document.getElementById("popup-form");
const btn = document.getElementById("open-button");
const span = document.getElementById("close-button");
const card = document.getElementById("card_container");
const inputFiled = document.getElementsByTagName("input");
const myForm = document.getElementById("myForm");
let todo = [];

// ========================================================

//  calling the function to retrieve the data form
//  localStorage after page reload
getTodoData();
CardList();

// ========================================================

const randomIdGenerator = () => {
  // random id generator function
  let RandomNumber = Math.round(Math.random() * 1000);
  return RandomNumber;
};

// ========================================================
function getTodoData() {
  let data = localStorage.getItem("todo");
  todo = data ? JSON.parse(data) : [];
}

// ========================================================

function CardList() {
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
                <span class="title" style="background: ${
                  todoData.bgcColor
                }; color: ${todoData.txcColor}">
                  ${todoData.title}
                </span>
              </a>

              <p class="desc" style="background: ${todoData.bgcColor}; color: ${
      todoData.txcColor
    }">
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
}

// ========================================================

const updateTodoData = (id, checkbox) => {
  const checkboxValue = checkbox.checked;
  // Find the correct todoData object in the todo array and update its checkbox property
  const todoItem = todo.find((item) => item.id === id);
  if (todoItem) {
    todoItem.todoCheck = checkboxValue;
    localStorage.setItem("todo", JSON.stringify(todo));
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
        localStorage.setItem("todo", JSON.stringify(todo));
      }
    });
  }
  CardList();
};

// ========================================================

myForm.onsubmit = (e) => {
  e.preventDefault();
  let todoData = {
    // predefined values todo inputs
    id: randomIdGenerator(),
    title: "",
    description: "",
    bgcColor: "whitesmoke",
    txcColor: "black",
    todoCheck: false,
  };
  Array.from(inputFiled).forEach((inputItem, index) => {
    todoData = { ...todoData, [inputItem.name]: inputItem.value };
    if (index <= 1) inputItem.value = "";
  });

  todo.push({ ...todoData, todoCheck: false });
  if (todo.length > 0) localStorage.setItem("todo", JSON.stringify(todo));

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
