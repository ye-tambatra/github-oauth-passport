## Required .env variables for the <b>client</b>

- VITE_SERVER_URL : <i>Url of the server (in case you're doing on it locally, it will be just <b>http://localhost:\<Your port\></b>)</i>

## Required .env variables for the <b>server</b>

- PORT
- CLIENT_URL : <i>Url of the client (if you're doing it locally, it will be <b>http://localhost:5173</b></i>
- GITHUB_CLIENT_ID : <i>The client ID that Github provides you on your oauth app setting</i>
- GITHUB_CLIENT_SECRET : <i>The client secret from the same as above</i>
- SESSION_SECRET : <i>The secret key for your session (using express-session)</i>
