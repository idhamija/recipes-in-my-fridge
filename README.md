# Recipes In My Fridge

A web application to get recipe recommends based on the ingredients and special dietary preferences / intolerances users have.

Hosted live at: [https://recipes-in-my-fridge.herokuapp.com](https://recipes-in-my-fridge.herokuapp.com/)

Created using MongoDB database.

### Installation

```
git clone https://github.com/idhamija/recipes-in-my-fridge.git
cd recipes-in-my-fridge
npm run install-dependencies
```

### Setup

Create an account for [Spoonacular API](https://spoonacular.com/) to get the API key.

Create a .env file in the following format:

```
MONGO_URI = <MONGO_DB_URI>

JWT_SECRET = <JWT_SECRET_STRING>
JWT_ISS = <JWT_ISS_STRING>
JWT_LIFETIME = <JWT_LIFETIME_LENGTH>

SPOONACULAR_API_KEY = <SPOONACULAR_API_KEY>

```

### Run Development Server

```
npm run dev
```

### Built Using

- [React](https://reactjs.org/) - JavaScript Library for Building User Interfaces
- [Node](https://nodejs.org/) - JavaScript Runtime Built on Chrome's V8 JavaScript Engine
- [Express](https://expressjs.com/) - Node.js Framework for HTTPS Server
- [Mongoose](http://mongoosejs.com/) - Node.js ORM for MongoDB Database
- [Passport](http://www.passportjs.org/) - Node.js Middleware for Authentication
