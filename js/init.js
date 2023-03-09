function appendNewMessage(from, datetime, message) {
  const floatRightText = from === "Visitor" ? "visitor-message" : "";

  var liItem = document.createElement("li");
  liItem.className = `message-item ${floatRightText}`;
  liItem.innerHTML = `<div class="message-data">
          <span class="message-data-time" >${parseDateStr(
            datetime
          )}</span> &nbsp; • &nbsp;
          <span class="message-data-name" >${from}</span>
      </div>
      <div class="message">${message}</div>`;

  document.getElementById("chatHistory").appendChild(liItem);
}

function removeMessages() {
  document.getElementById("chatHistory").innerHTML = "";
}

function onChatReceivedCallback(event) {
  const { datetime, message, from } = event?.detail || {};

  appendNewMessage(from, datetime, message);
}

function loadData(chats) {
  chats?.forEach(({ from, datetime, message } = {}) => {
    appendNewMessage(from, datetime, message);
  });
}

function onLoad() {
  //fetch message history data from local storage when page loaded
  chat.getChatHistory(loadData);

  chat.addListener("chatreceived", onChatReceivedCallback);

  //when click send button
  document.getElementById("chatSubmit").onclick = function () {
    const text = document.getElementById("chatInput").value;
    if (text !== "") {
      chat.sendChat(text);
      document.getElementById("chatInput").value = "";
    }
  };

  //ctrl+Enter event
  document.getElementById("chatInput").onkeydown = function (e) {
    if (e.ctrlKey && e.key === "Enter") {
      const text = document.getElementById("chatInput").value;
      if (text !== "") {
        chat.sendChat(text);
        document.getElementById("chatInput").value = "";
      }
    }
  };
}
