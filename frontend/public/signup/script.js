const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const password = document.getElementById("password");
const username = document.getElementById("email");

async function btnClick() {
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      email: emailElement.value,
      name: nameElement.value,
    }),
  });
  const data = await response.json();
  console.log(data);
  nameElement.value = "";
  emailElement.value = "";
  password.value = "";

  if (data.msg == "User Added") {
    alert("User added successfully ! You can sign in now!");
    window.location.href = "http://127.0.0.1:5501/index.html";
  } else if (data.msg == "User Exists already!") {
    alert("User already exists!");
    window.location.href = "http://127.0.0.1:5501/index.html";
  } else {
    alert("There is an error in the server.");
  }
}
