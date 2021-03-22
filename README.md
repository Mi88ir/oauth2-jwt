## Repo Details

This repository is a good template for anyone looking to have a OAuth2 and JWT implemented for Express (REST) app.

Please note: Concepts on technical understanding/implementation are derived from Zach Gollwitzer, the author at freeCodeCamp.

## How to use this Repo

- npm install
- npm start

### Prerequisites

1. npm 6+
2. node 12+
3. mongodb
4. postman or insomnia

### Before your Start

Create a .env file with three properties

1. NODE_ENV=`development/production`
2. DB_STRING=`<your db path>`
3. DB_STRING_PROD=`<your db path>`

- Run `node generateKeypair.js`, this should create a private and a public key.
- Finally `npm start`

### Endpoints

- http://localhost:3000/users/register
  - No Headers
  - body `{"username":"test",password:"test"}`
  - Creates your account
- http://localhost:3000/users/login
  - No Headers
  - body `{"username":"test",password:"test"}`
  - If authorization goes through it should return with a `token`, copy that.
- http://localhost:3000/users/protected
  - Headers: `{Authorization: <token(the one that you copied)>`}`
  - No Body

### Thank you
