//Front-end developer test
/*
  - create a new file, add it into html
  - create a function to show realtime chat interface
  - style layout
  - call a dummy api function (supplied) to get / receive messages
  - show chat history from dummy api function

*/

var chat = new (function () {
  var _events = {};
  var responses = [
    "OK, let me check that out for you",
    "Message received. I'll see what I can do.",
    "ok, thank you.",
    "I understand.",
    "Hmm, I'm not sure I understand, can you rephrase that?",
    "Right ok, let me sort that out for you.",
  ];
  var greetings = [
    "Hello there, welcome to the site. How may I help you?",
    "Good day! How are you?",
    "Hello, what can I do for you?",
    "Hi and welcome!",
    "Greetings :-)",
  ];
  var answers = [
    "Thank you for your question.",
    "OK, let me check that out for you",
    "A very good question! Let me have a look...",
    "Hmm, ok give me a minute and I'll sort that out.",
    "Yes, I think so.",
  ];

  this.getChatHistory = getChatHistory;
  function getChatHistory(callback) {
    var chats = JSON.parse(localStorage.getItem("chat-history") || null) || [];

    if (typeof callback == "function") {
      setTimeout(callback(chats), 1000);
    }
  }

  this.clearChatHistory = clearChatHistory;
  function clearChatHistory() {
    localStorage.clear();
  }

  function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
      return "&#" + c.charCodeAt(0) + ";";
    });
  }

  function saveChatHistory(event) {
    localStorage.setItem(
      "chat-history",
      JSON.stringify([
        ...(JSON.parse(localStorage.getItem("chat-history") || null) || []),
        event,
      ])
    );
  }

  this.sendChat = sendChat;
  function sendChat(str) {
    console.log(str);
    const parsedString = htmlEncode(str);
    dispatchChatEvent(parsedString, "Visitor");
    if (
      parsedString.toLowerCase().indexOf("hello") != -1 ||
      parsedString.toLowerCase().indexOf("hi") != -1
    ) {
      setTimeout(operatorGreetingChat, 2000);
    } else if (parsedString.indexOf("&#63;") != -1) {
      setTimeout(operatorAnswerChat, 2000);
    } else {
      setTimeout(operatorChat, 2000);
    }
  }

  function operatorChat() {
    var randResponse = responses[Math.floor(Math.random() * responses.length)];
    dispatchChatEvent(randResponse, "operator");
  }
  function operatorAnswerChat() {
    var randResponse = answers[Math.floor(Math.random() * answers.length)];
    dispatchChatEvent(randResponse, "operator");
  }
  function operatorGreetingChat() {
    var randResponse = greetings[Math.floor(Math.random() * greetings.length)];
    dispatchChatEvent(randResponse, "operator");
  }

  function dispatchChatEvent(msg, from) {
    var event = new CustomEvent("chatreceived", {
      detail: { datetime: new Date().toISOString(), message: msg, from: from },
    });

    saveChatHistory({
      datetime: new Date().toISOString(),
      message: msg,
      from: from,
    });
    raiseEvent("chatreceived", event);
  }

  function dispatchChatEvent(msg, from) {
    var event = new CustomEvent("chatreceived", {
      detail: { datetime: new Date().toISOString(), message: msg, from: from },
    });
    saveChatHistory({
      datetime: new Date().toISOString(),
      message: msg,
      from: from,
    });
    raiseEvent("chatreceived", event);
  }

  this.addListener = function (eventName, callback) {
    var events = _events;
    callbacks = events[eventName] = events[eventName] || [];
    callbacks.push(callback);
  };

  function raiseEvent(eventName, args) {
    var callbacks = _events[eventName];
    if (typeof callbacks != "undefined") {
      for (var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i](args);
      }
    }
  }
})();
