document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const sendBtn = document.getElementById("sendBtn");
  const msgInput = document.getElementById("message");
  const allMessage = document.getElementById("messages");

  const username = prompt("Enter your username : ");
  socket.emit("join", username);

  // socket.on("connect", () => {
  //   console.log(socket.id);
  // });

  // socket.on("disconnect", () => {
  //   console.log(socket.id);
  // });
  sendBtn.addEventListener("click", () => {
    const message = msgInput.value.trim();
    socket.emit("user-message", { message });
    msgInput.value = "";
  });

  //   socket.on("user-message", (message) => {
  //     const p = document.createElement("p");
  //     p.textContent = message;
  //     allMessage.appendChild(p);
  //   });

  socket.on("receive-message", (data) => {
    const div = document.createElement("div");
    div.classList.add("message");

    if (data.id === socket.id) {
      div.classList.add("self");
    } else {
      div.classList.add("other");
    }

    div.innerText = `${data.username}: ${data.message}`;
    allMessage.appendChild(div);

    allMessage.scrollTop = allMessage.scrollHeight;
  });

  msgInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });
});
