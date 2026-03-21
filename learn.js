async function sendInfo(url) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const myUrl = await fetch(url);
  if (myUrl.ok) {
    const result = await myUrl.json();
    return result;
  } else {
    throw new Error(myUrl.status);
  }
}

function notify(text) {
  const notifications = document.querySelector("#notifications");
  if (text) {
    notifications.innerHTML += "<br>" + text;
  } else {
    notifications.textContent = "Nothing to Show...!";
  }
}

function myName() {
  const btn = document.getElementById("my-test-btn");
  btn.disabled = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Mohammad");
    }, 5000);
  });
}

function sayMyName() {
  myName().then((data) => {
    const btn = document.getElementById("my-test-btn");
    btn.disabled = false;
    console.log(data);
  });
}
