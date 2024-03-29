const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const logoutElement = document.getElementById("lo");

const urlParams = new URLSearchParams(location.search);
const username = urlParams.get("username");

document.getElementById("lo").addEventListener("click", function () {
  localStorage.removeItem(username);
  window.location.href = "http://127.0.0.1:5501/index.html";
  console.log("1234");
});

console.log();

async function btnClick() {
  const res = await fetch("http://localhost:3000/getToken", {
    headers: {
      username: username,
      "Content-Type": "application/json",
    },
  });
  const token = await res.text();

  const response = await fetch("http://localhost:3000/createMainPage", {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleElement.value,
      description: descriptionElement.value,
    }),
  });
  const data = await response.json();
  console.log(data);

  if (data.msg == "Page Added Successfully") {
    alert("Page added successfully");
    titleElement.value = "";
    descriptionElement.value = "";
  } else if (
    data.msg ==
    "Only one page can be created on a date! Reedit the previous entry"
  ) {
    alert("Only one page can be created on a date! Reedit the previous entry");
  } else {
    alert("Error somewhere");
  }
}
