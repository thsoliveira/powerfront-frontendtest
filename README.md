## Requirements

### Must

- Create a new JS file to handle the display of the live chat program
- Use the supplied function 'chat.getChatHistory(callback)' to load and display the chat
  history in the '#chatHistory' container. This will simulate a server request for data
- Use the supplied function 'chat.sendChat(message)' to send a chat typed into the input
  box - Bind to the event "chat received" using "chat.addListener('chat received', function
  (data) { ... })" to receive and display any chats sent, as well as the dummy responses
- Display chat messages with datetime, from and message
- Modify the existing HTML and CSS files as required
- Fix any existing bugs in the code
- Add styling, this is a front end developer test. Style matters
- The app should be well presented with a clear and amazing UI

### Bonus

- Implement responsive design - done
- Protect against XSS and other forms of hacking - done (?)
- Display the time in the readable format. Be creative - done
- Add some animations when the messages are added to the history
- Fix the message textarea and button to the bottom of the page - done
- Make the User Experience as simple as possible - done
- Convert the code to not rely on jQuery - done
