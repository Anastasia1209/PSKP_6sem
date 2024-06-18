const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const fs = require("fs");
require("./src/auth");

dotenv.config();

const app = express();

app.use(
    session({
        secret: "qwe",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use(passport.initialize());
app.use(express.json());
app.use(passport.session());

function isLoggedin(req, res, next) {
    req.user ? next() : res.redirect("/login");
}

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/resource",
        failureRedirect: "/login",
    })
);

app.get("/login", (req, res) => {
    const rs = fs.readFileSync("./src/public/index.html");
    res.end(rs);
});

app.get("/resource", isLoggedin, (req, res) => {
    const name = JSON.stringify(req.user);
    res.send("RESOURCE\n" + name);
});

app.get("/logout", (req, res) => {
    req.user = null;
   // const rs = fs.readFileSync("./src/public/index.html");
    res.clearCookie("connect.sid");
    res.redirect("/login");
});

app.use((req, res) => {
    res.status(404).send("Not found");
});

app.listen(3000, () => console.log(`Server running at http://localhost:${3000}/login\n`));
