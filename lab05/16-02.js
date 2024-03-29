const express = require("express");
const passport = require("passport");
const DigestStrategy = require("passport-http").DigestStrategy;
const users = require("./user.json");

const app = express();

const session = require("express-session")({
    resave: false,  
    saveUninitialized: false,
    secret: "session", 
  });

const getUser = (user) => {
  let us = users.find((e) => {
    return e.user.toUpperCase() == user.toUpperCase();
  });
  return us;
};

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

passport.use(new DigestStrategy({ qop: 'auth' },
 (user, done) => {
    let result = null;
    let currentUs = getUser(user);
    if (!currentUs) result = done(null, false);
    else result = done(null, currentUs.user, currentUs.password);
    return result;
  },
  (params, done) => {
    done(null, true);
  }
));

app
  .get(
    "/login",
    (request, responce, next) => {
      if (request.session.logout && request.headers["authorization"]) {
        request.session.logout = false;
        delete request.headers["authorization"];
      }
      next();
    },
    passport.authenticate("digest",{session: false}),
    (request, response, next) => {
      next();
    }
  )
  .get("/login", (request, responce) => {
      responce.send(`Welcome, ${request.user}!`);

  }
  );

app.get("/resource", (request, responce) => {
  if (request.headers["authorization"]) {
    responce.send("RESOURSE");
  } else {
    responce.redirect("/login");
  }
});
app.get("/logout", (request, responce) => {
  request.session.logout = true;
  responce.redirect("/login");
});

app.use((request, responce) => {
    responce.status(404).send("404 Страница не найдена");
  });

app.listen(3000, () => console.log(`Server running at http://localhost:${3000}/login\n`));
