const nums = [5, 10, 2, 8, 18, 26, 2];
const result = nums.reduce((acc, curr) => (acc > curr ? acc : curr));
console.log(result);

function notify(text) {
  const notifications = document.querySelector("#notifications");
  if (text) {
    notifications.innerHTML += "<br>" + text;
  } else {
    notifications.textContent = "Nothing to Show...!";
  }
}
