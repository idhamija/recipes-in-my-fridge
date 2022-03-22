const mongoose = require("mongoose");
const express = require("express");
const app = express();

const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");

app.use(xss());
app.use(helmet());
app.use(mongoSanitize());

app.use(cookieParser());
app.use(express.json());

require("dotenv/config");
const cors = require("cors");
const { join } = require("path");

const auth = require("./routes/auth");
const ingredient = require("./routes/ingredient");
const ingredients = require("./routes/ingredients");
const preferences = require("./routes/preferences");
const recipe = require("./routes/recipe");
const spoonacular = require("./routes/spoonacular");
const general = require("./routes/general");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "client", "build")));

  app.use("/user/auth", auth);
  app.use("/user/ingredient", ingredient);
  app.use("/user/ingredients", ingredients);
  app.use("/user/preferences", preferences);
  app.use("/user/recipe", recipe);
  app.use("/spoon", spoonacular);
  app.use("/general", general);

  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(
    cors({
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      origin: ["http://localhost:3000"],
    })
  );

  app.use("/user/auth", auth);
  app.use("/user/ingredient", ingredient);
  app.use("/user/ingredients", ingredients);
  app.use("/user/preferences", preferences);
  app.use("/user/recipe", recipe);
  app.use("/spoon", spoonacular);
  app.use("/general", general);
}

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
