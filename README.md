# kirjasto
My coding assignment for Buutti. This is the first time I ever use react.js and it's really a first time in 4 years that I develop a web app.

# Requirements
This app uses MongoDB. Install MongoDB from [https://www.mongodb.com/try/download/community]

## Server
Install the server dependencies on the folder App with 'npm install'.

Server default path is 'localhost:5000'.
To change the port change line 10 in 'server.js'.
The DB path is default 'mongodb://localhost:27017/kirjasto'
To change the DB path change line 13 in 'server.js'.
(Yes, I should have made a config file for this...)

The rest API is responding to 'localhost:5000/api'

Start the server with 'node server.js'.
Make sure that mongoDB is up and runing before starting the server!


## Client
Client of the app is located in App/client folder.
Install the client dependencies on folder App/client with 'npm install'.

If you changed the server path, change line 10 in App/client/App.js to correspondingly.

To build the client run 'npm run build' in App/client folder.
To start the client in development mode run 'npm start' App/client folder.


## API

| Method | Path     | Description                                                                                                         |
|--------|----------|---------------------------------------------------------------------------------------------------------------------|
| GET    | /api     | All the books on the database                                                                                       |
| GET    | /api/:id | Returns info of a book with 'id' on the database                                                                    |
| POST   | /api     | Adds new book to the database. The book has to have fields 'author' and 'title'. Book can have field 'description'. |
| PUT    | /api/:id | Modifies info of a book corresponding to 'id' in the database.                                                      |
| DELETE | /api/:id | Deletes an item from the database     