# Online chat

## Intro
This is an online chat project developed on React and Nest. 
This chat allows you to communicate with friends in private messages, and create group chats.
Message passing is implemented using the websocket protocol (socket.io).
All user data and messages are stored in the Postgres database. Authorization is implemented using JWT tokens.

## Technologies and API

* React
* Typescript
* Websocket (socket.io)
* Nest
* Postgres
* REST API (axios)

## Functional

* Sending and receiving messages online
* Authentication by email and password with JWT
* Create and manage group chats
* Search for other users

## Can be developed

* Personal profile of users
* Implement the Friends subsystem (adding and removing friends)
* Add a general news feed

## Getting Started

Run the development:

Start client: `npm run dev`

Start Server: `npm run start:dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You also need to have Postgres on your device and configure the database according to ormconfig.ts

