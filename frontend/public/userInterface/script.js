const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");

async function btnClick() {
  const response = await fetch("http://localhost:3000/createMainPage", {
    method: "POST",
    headers: {
      authorization: localStorage.getItem(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleElement.value,
      description: descriptionElement.value,
    }),
  });
}
