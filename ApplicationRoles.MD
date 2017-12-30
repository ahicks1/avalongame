# Server

## Role:
Should manage connections and pass messages to target. Some basic checking on which clients can talk to which controller etc.
## Limitations:
The server should have no idea what game it is playing. The only task for the server is to pass messages between the clients and the controller.

# Controller

## Role:
Track current game state and ensure all clients stay synced. This application is responsible for all game calculations. When a client is out of sync the "real" game state is whatever is stored in this controller, not the client. This should help prevent some cheating.

Something to add later is to check that a message originated from the client it claims to be for additional security.

## Limitations:

For a first iteration some core game control functions like starting and pausing will be controlled from here, but the end goal is something like Jackbox where after the page is loaded everything is controlled from the clients.

# Client

## Role:
Display secret information and receive game input from an individual player.

## Limitations:

Each client should represent a unique player and support reconnecting as the same player if connection is lost.
