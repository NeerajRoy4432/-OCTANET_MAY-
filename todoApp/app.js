const modal = document.getElementById("popup-form");
const btn = document.getElementById("open-button");
const span = document.getElementById("close-button");
const submitBtn = document.getElementById("btn_submit");
const card = document.getElementById("card_container");
const inputFiled = document.getElementsByTagName("input");
let todo = [];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

const CardList = () => {
  card.innerHTML = ""; // Clear the card container before adding new cards
  todo.forEach((todoData) => {
    let html = `
    <div class="card">
            <div class="content" style="background:${todoData.bgcColor}">
              <a href="#">
                <span class="title" style="background: ${todoData.bgcColor}">
                  ${todoData.title}
                </span>
              </a>

              <p class="desc" style="background: ${todoData.bgcColor}">
              ${todoData.description}
              </p>

              <a class="action" href="#">
                Find out more
                <span aria-hidden="true"> → </span>
              </a>
            </div>
          </div>
    `;
    card.innerHTML += html;
  });
};

submitBtn.onclick = function (e) {
  e.preventDefault();
  let todoData = {
    id: null,
    title: "",
    description: "",
    bgcColor: "whitesmoke",
  };
  Array.from(inputFiled).forEach((inputItem, index) => {
    todoData = { ...todoData, [inputItem.name]: inputItem.value };
  });
  console.log(todoData);
  todo.push(todoData);
  console.log(todoData);
  CardList();
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
