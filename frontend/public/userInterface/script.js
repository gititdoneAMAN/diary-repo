const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const logoutElement = document.getElementById("lo");

const leftArea = document.getElementsByClassName("left-area");

const urlParams = new URLSearchParams(location.search);
const username = urlParams.get("username");
const edit = urlParams.get("edit");
const pageEditId = urlParams.get("id");

let renderData;
let count = 0;

async function renderFunction() {
  if (edit) {
    const resToken = await fetch("http://localhost:3000/getToken", {
      headers: {
        username: username,
        "Content-Type": "application/json",
      },
    });
    const editToken = await resToken.text();

    const responseEdit = await fetch("http://localhost:3000/getPageData", {
      method: "POST",
      headers: {
        authorization: editToken,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: pageEditId,
      }),
    });
    const editPageData = await responseEdit.json();

    titleElement.value = editPageData.title;
    descriptionElement.value = editPageData.description;
  }

  leftArea[0].innerHTML = ""; // Clear existing content
  const top = document.createElement("h2");
  top.innerHTML = "Pages";
  leftArea[0].appendChild(top);

  renderData.forEach((page) => {
    let div = document.createElement("div");
    let para = document.createElement("p");
    let header = document.createElement("h3");
    let i = document.createElement("i");

    div.className = "pages";
    header.id = `c${count}`;
    i.className = "bx bxs-trash";
    i.id = count;

    const dateArray = page.date.split("-");

    const dateData = `${dateArray[2].substr(0, 2)}/${dateArray[1]}/${
      dateArray[0]
    }`;
    para.innerHTML = `${dateData}`;
    header.innerHTML = `${page.title}`;

    div.appendChild(para);
    div.appendChild(header);
    div.appendChild(i);

    leftArea[0].appendChild(div);

    document
      .getElementById(`${count}`)
      .addEventListener("click", async function (event) {
        alert("Deleted");

        const res = await fetch("http://localhost:3000/getToken", {
          headers: {
            username: username,
            "Content-Type": "application/json",
          },
        });
        const token = await res.text();

        const response = await fetch("http://localhost:3000/deletePage", {
          method: "DELETE",
          headers: {
            authorization: token,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id: page.pageId,
          }),
        });
        const data = await response.json();

        if ((data.msg = "Page deleted successfully")) {
          window.location.reload();
        }
        event.stopPropagation();
      });

    const pagesElement = document.getElementById(`c${count}`);
    pagesElement.addEventListener("click", () => {
      window.location.href = `http://127.0.0.1:5503/viewPage.html?username=${username}&date=${dateArray[2].substr(
        0,
        2
      )}&id=${page.pageId}`;
    });

    count++;
  });
}

window.onload = async () => {
  try {
    const res = await fetch("http://localhost:3000/getToken", {
      headers: {
        username: username,
        "Content-Type": "application/json",
      },
    });
    const token = await res.text();
    const response = await fetch("http://localhost:3000/userData", {
      method: "GET",
      headers: {
        authorization: token,
        username: username,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    renderData = data.content;
    console.log(typeof renderData);

    renderFunction();
  } catch (e) {
    console.error("Error in the onload:", e);
  }
};

document.getElementById("lo").addEventListener("click", async function () {
  const res = await fetch("http://localhost:3000/getToken", {
    headers: {
      username: username,
      "Content-Type": "application/json",
    },
  });
  const token = await res.text();

  const response = await fetch("http://localhost:3000/logout", {
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (data.msg == "Logged out successfully") {
    alert("logout successful!");
    window.location.href = "http://127.0.0.1:5501/index.html";
  }
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

  if (!edit) {
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
      alert(
        "Only one page can be created on a date! Reedit the previous entry"
      );
    } else {
      alert("Error somewhere");
    }

    window.location.reload();
  } else {
    const response = await fetch("http://localhost:3000/updateMainPage", {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: pageEditId,
        title: titleElement.value,
        description: descriptionElement.value,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (data.msg == "Data updated successfully!") {
      alert("Page updated successfully");
      titleElement.value = "";
      descriptionElement.value = "";
    } else if (
      data.msg ==
      "Only one page can be created on a date! Reedit the previous entry"
    ) {
      alert(
        "Only one page can be created on a date! Reedit the previous entry"
      );
    } else {
      alert("Error somewhere");
    }

    window.location.reload();
  }
}
