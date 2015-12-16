# shazamjs-core

Each client establishes a connection to this socket server, any client can connected to the server as it is not password protected.

## Client Implementation
### Clients need to handle the following events emitted by the server:
```
socket-client.on("Refresh!", (currentAppState) => {//Handle the current appState});
```

On "Refresh!" the app state is transmitted to the client to update itself.

```
socket-client.on("Transform!", (currentAppState) => {//Handle the current appState});
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
