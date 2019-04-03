# Chatbox
This is a project to learn about **websockets** using [socket.io](https://socket.io) library and plain javascript.
The idea is to write a **chatbox** with basic functionalities and improve it step by step.

Actually, the features in the chatbox are:
- **Send** and **recive** messages.
- **List** the messages.
- Display the **status of the connection**.
- Show all the **current users**.
- **Save** the last 20 messages.
- Show an user **connection or disconnection**.

Future features that might be added:
- Allow **private messages** between users.
- Implement **private rooms**.
- Integrate **giphy api** to send GIFS.
- Implement a **clear button** to clear the chat without having to refresh.
- Implement **Dark theme** and an option to toogle between normal theme and dark theme.
- Integrate **WYSIWYG** editor.
- Implement **Push notifications* for web clients.
- Other implementations suggested by users.

# Instalation & Requirements
To run this chatbox you need to have installed [Node](https://nodejs.org/) and [NPM](https://www.npmjs.com).
After cloning the repository, you will need to do an `npm install` in the root folder to install all the libraries that will be needed to run the aplication.
Then, run the `node startServer.js` command to start it. After that, you will see that your application is running in the port 3000 and you can access it from: `127.0.0.1:3000`

# Sharing 
You can make it accesible to anyone that is connected into the same network by typeing the public ip and the port you opened in the server script. Normally it would look something like this: `192.168.1.XX:3000`.
To knew your public IP just tip `ipconfig` in your CMD and look for it.

# Bugs & Collaborations
This is just a test application to improve my knowledge about websockets and plain javascript, so there will be a lot of bugs and improvements that can be done. Since it's a test application, I won't answer questions about implementations or fixes that are

Feel free to make a `pull-request` and collaborate with this project, or send an email to __lluiscf92@gmail.com__.

# License
### MIT License
Copyright (c) [2019] [Baltimer]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
