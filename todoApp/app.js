const modal = document.getElementById("popup-form");
const btn = document.getElementById("open-button");
const span = document.getElementById("close-button");
const submitBtn = document.getElementById("btn_submit");
const inputFiled = document.getElementsByTagName("input");
let todo = [];
btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

Array.from(inputFiled).forEach((inputItem, index) => {
  // Do something with each input field
  inputItem.addEventListener("change", (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(e.target.name);
    inputItem = "";
    let INputValue = { [e.target.name]: e.target.value };
    console.log(INputValue);
  });
});

submitBtn.onclick = function (e) {
  console.log(e.target);
  e.preventDefault();
  getInputValue();
  modal.style.display = "none";
};

inputFiled.onchange = function (e) {
  console.log(e.target.value);
  console.log(e.target.name);
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
