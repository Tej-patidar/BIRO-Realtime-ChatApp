const socket = io();
let textarea = document.querySelector("#textarea");

const messageArea = document.querySelector(".message-area");
let name;

// these is for prompt
do {
  name = prompt("please Enter Your Name !!");
} while (!name);

// these is for entering text in textarea

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  const msg = {
    user: name,
    message: message.trim(),
  };

  // AppendMessage ........

  appendMessage(msg, "outgoing");
  textarea.value = " ";
  scrolltoBottom();

  // Send to server ......

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markUp = `
<h4>${msg.user}</h4>
<p>${msg.message}</P>
`;
  mainDiv.innerHTML = markUp;
  messageArea.appendChild(mainDiv);
}

// Receive Messages

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrolltoBottom();
});

// For scrool to the last message

function scrolltoBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
