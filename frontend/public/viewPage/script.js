const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("para");
const crossElement = document.getElementsByClassName("cross");
const editElement = document.getElementsByClassName("edit");
const authorElement = document.getElementById("author");

const urlParams = new URLSearchParams(location.search);
const username = urlParams.get("username");
const pageId = urlParams.get("id");
let pageDate;

window.onload = async () => {
  const res = await fetch("http://localhost:3000/getToken", {
    headers: {
      username: username,
      "Content-Type": "application/json",
    },
  });
  const token = await res.text();

  const response = await fetch("http://localhost:3000/getPageData", {
    method: "POST",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: pageId,
    }),
  });

  const data = await response.json();

  titleElement.innerHTML = data.title;
  descriptionElement.innerHTML = data.description;
  authorElement.innerHTML = `Written by ${data.name}`;
  pageDate = new Date(data.date);

  console.log(data);
  console.log(pageDate);

  const currentDate = new Date();
  console.log(currentDate);
  console.log(typeof pageDate);

  console.log(currentDate.getDate() == pageDate.getDate());

  crossElement[0].addEventListener("click", function () {
    alert("");
    window.location.href = `http://127.0.0.1:5502/index.html?username=${username}`;
  });

  if (currentDate.getDate() == pageDate.getDate()) {
    editElement[0].addEventListener("click", function () {
      alert("edit");
      window.location.href = `http://127.0.0.1:5502/index.html?username=${username}&edit=t&id=${pageId}`;
    });
  } else {
    //   editElement[0].addEventListener("click", function () {
    //     alert("You cannot make any change in the past");
    //   });
    editElement[0].classList.add("crossNotAllowed");
  }
};
