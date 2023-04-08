const clientList = document.getElementById("clients");

const socket = io();

socket.emit("landing", () => {
  console.log("eiei");
});

socket.on("clientJoin", ({ clients }) => {
  outputName(clients);
});

function outputName(users) {
  clientList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    clientList.appendChild(li);
  });
}
