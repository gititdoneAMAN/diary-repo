const userElement = document.getElementById("username");
const passwordElemnet = document.getElementById("password");

async function btnClick() {
  const response = await fetch("http://localhost:3000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      username: userElement.value,
    },
    body: JSON.stringify({
      username: userElement.value,
      password: passwordElemnet.value,
    }),
  });

  const data = await response.json();

  if (data.msg == "Success") {
    alert("Welcome USer!");
    const jwtToken = data.token;
    window.location.href = `http://127.0.0.1:5502/index.html?username=${userElement.value}`;
  } else {
    alert("Invalid Credentials please try again");
  }

  userElement.value = "";
  passwordElemnet.value = "";
}
