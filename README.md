# shazamjs-core

## Run
```
node index.js
```
or use
```
npm start
```

## Description
Core application that powers shazamjs applications. Edit the admin password in /lib/env.js to change password from blank. Please note anyone can connect to this socket.io server an d the information is transmitted in plain http fashion. This application is not ment to demonstrate security, but show the applications of node on a variety of platforms.

## Client Implementation
### Clients need to handle the following events emitted by the server:
```
socket.on("Refresh!", (currentAppState) => {//Handle the current appState});
```

On "Refresh!" the app state is transmitted to the client to update itself.

```
socket.on("Transform!", (currentAppState) => {//Handle the current appState});
```
On "Transform!" the app state is transmitted to the client to update itself, but it is expected the client does something special to signify the app state is changing state between Billy and Shazam.

### Clients should emit the follow information to the server:

```
socket.emit("Shazam!", {location: "A location string"})
```
Client tells server someone has clicked Shazam a long with the current location of where the event occured.

```
socket.emit("Who am I?")
```
Client requests the server send the current state. The server only broadcasts the state via the Refresh event. The server only broadcasts the Refresh event to the current socket, not globally.

## Server Implementation
The server handles the following events:

```
socket.on("Who am I?", () => { //emit "Refresh Event!"});
```
Emit a Refresh event only to the current socket that emitted the "Who Am I?" event.

```
socket.on("Shazam!", () => { //update the app state then emit "Transform!"});
```

The server increments the proper app state based upon the location string sent.


### Possible Location Strings
"coreApp", "websiteApp", "desktopApp", "hardwareApp", "consoleApp", "mobileApp"
