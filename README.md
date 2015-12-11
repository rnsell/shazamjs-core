# shazamjs-core

Each client establishes a connection to this socket server, any client can connected to the server as it is not password protected.

## Client Implementation
Clients need to handle the following events emitted by the server:

socket-client.on("Refresh!", function(currentAppState){});

socket-client.on("Transform!", function(currentAppState){});


Clients should emit the follow information to the server:

socket.emit("Shazam!", {location: "See possible location strings"})

socket.emit("Who am I?")



## Server Implementation
The server handles the following events:
socket.on("Who am I?", function(){ //emit "Refresh Event!"});

socket.on("Shazam!", function(){ //update the app state then emit "Transform!"});

The server increments the proper app state based upon the location string sent. The possible locations strings are:

"coreApp", "websiteApp", "desktopApp", "hardwareApp", "consoleApp", "mobileApp"
