const form = document.getElementById("task-form");
const editForm = document.getElementById("edit-task-form");
const taskList = document.getElementById("task-list");
const editSection = document.querySelector(".edit-task-section");
const addSection = document.querySelector(".add-task-section");
let title = document.getElementById("title");
let desc = document.getElementById("description");

// let userName = localStorage.getItem("userName");

// while (userName === "" || userName === null) {
//   userName = prompt("اسمت چیه آقا پسر؟");
//   if (userName === "" || userName == null) {
//     alert("به نظرم باید خودتو معرفی کنی");
//   }
// }
// localStorage.setItem("userName", userName);
// alert("خیلی خوش آمدید " + userName + " آقای عزیز");

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => {
    let myTaskLists = prevTasks ? JSON.parse(prevTasks) : [];
    myTaskLists.push({
      id: Number(localStorage.getItem("finalId")) + 1,
      title: json.title,
      desc: "user id: " + json.userId,
    });
    taskList.innerHTML = generateList(myTaskLists);
  });
const prevTasks = localStorage.getItem("tasks");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let finalId = Number(localStorage.getItem("finalId")) + 1 || 0;
  let curTasks = { id: finalId, title: title.value, desc: desc.value };
  localStorage.setItem("finalId", finalId);
  myTaskLists.push(curTasks);
  localStorage.setItem("tasks", JSON.stringify(myTaskLists));
  taskList.innerHTML = generateList(myTaskLists);
  title.value = "";
  desc.value = "";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let editId = document.getElementById("id-edit");
  let editItem = myTaskLists.find((item) => item.id == editId.value);
  editItem.title = document.getElementById("edit-title").value;
  editItem.desc = document.getElementById("edit-desc").value;
  localStorage.setItem("tasks", JSON.stringify(myTaskLists));
  taskList.innerHTML = generateList(myTaskLists);
  changeForm();
});

taskList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.closest(".edit")) {
    let targetId = e.target.closest(".edit").id.substring(10);
    let editItem = myTaskLists.find((item) => item.id == targetId);
    changeForm("edit");
    document.getElementById("id-edit").value = targetId;
    document.getElementById("edit-title").value = editItem.title;
    document.getElementById("edit-desc").value = editItem.desc;
  }
  if (e.target.closest(".trash")) {
    let targetId = e.target.closest(".trash").id.substring(12);
    let deleteItem = myTaskLists.find((item) => item.id == targetId);
    const answer = confirm("شما میخواهید این را حذف کنید؟");
    if (deleteItem && answer) {
      myTaskLists = myTaskLists.filter((item) => item.id != targetId);
      localStorage.setItem("tasks", JSON.stringify(myTaskLists));
      taskList.innerHTML = generateList(myTaskLists);
    }
  }
});

const search = document.getElementById("search");

search.addEventListener("input", function () {
  const searchInput = search.value.toLowerCase();
  const items = document.querySelectorAll(".task-list");

  items.forEach((row) => {
    if (
      row.children[1].textContent.includes(searchInput) ||
      row.children[2].textContent.includes(searchInput)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
  // console.log(items.children[0]);
  // console.log(searchInput);
  // console.log(items[0]);
});

function generateList(arr) {
  let newRow = "";
  arr.forEach((item, index) => {
    newRow += `          
          <tr class="task-list">
            <td>${index + 1}</td>
            <td class="title">${item.title}</td>
            <td class="desc">${item.desc}</td>
            <td>Unknown</td>
            <td>
              <button class="edit" type="button" id="edit-task-${item.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button class="trash" type="button" id="delete-task-${item.id}">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>`;
  });
  return newRow;
}

function changeForm(type) {
  if (type === "edit") {
    addSection.classList.add("hide");
    editSection.classList.remove("hide");
  } else {
    editSection.classList.add("hide");
    addSection.classList.remove("hide");
  }
}
