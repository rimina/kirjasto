//creating a lightweight server that provides a REST API

const express = require("express");
const cors = require("cors");
const passport = require("passport");

require("./auth/auth");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const userRouter = require("./routes/user");
const secureRoute = require("./routes/secure");

const app = express();
const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/kirjasto";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("connected", () => {
    console.log("Database connected");
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());

app.use(passport.initialize());

app.use(cors());
app.use("/", indexRouter);
app.use("/api/books", apiRouter);
app.use("/users", userRouter);
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

app.use(function (err, req, res, next) {
    console.log("general error handling");
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});
