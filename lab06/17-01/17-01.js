const app = require("express")();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const users = require("./user.json");
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const session = require("express-session")({
    resave: false,  
    saveUninitialized: false,
    secret: "session", 
    cookie: {
        httpOnly: false
    }
});

app.use(session);
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

passport.use(
    new localStrategy((username, password, done) => {
        const user = users.find(user => user.username === username && user.password === password);
        if(!user){
            return done(null, false, { message: 'Incorrect username or password' });
        }
        return done(null, user);
    }));

app.get('/login', (request, response) =>{
    fs.readFile('login.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error: ', err);
            response.status(500).send('Server Error');
            return;
        }
        response.send(data);
    });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/resource',
    failureRedirect: '/login'
}));

app.get("/resource", (request, response) => {
    if (request.isAuthenticated()) {
        response.send(`Welcome, ${request.user.username}!`);
    } else {
        response.status(401).send("401  This is a protected resource");
    }
});

app.get("/logout", (request, response) => {
    request.logout(function(err) {
        if (err) {
            console.error('Error during logout:', err);
        }
        request.session.destroy(); 
        response.redirect("/login"); 
    });
});
  
app.use((request, response) => {
    response.status(404).send("404 Page not found");
});

app.listen(3000, () => console.log(`Server running at http://localhost:${3000}/login\n`));
