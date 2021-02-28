const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const path = require("path");

require("./models/User");
//must be after requiring User model
require("./services/passport");

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //make sure Express will serve up production assets
  app.use(express.static("client/build"));
  //serve index.js if route unrecognized
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", index.html))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
