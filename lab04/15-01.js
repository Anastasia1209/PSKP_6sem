const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const qs = require('qs');
const app = express();
const port = 3000;

const handlebars = expressHandlebars.create({
	defaultLayout: 'main', 
	extname: 'hbs',
	helpers: {
		exit: `document.location='/main'`
	}
});

app.engine('hbs', handlebars.engine);
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, 'views');
app.use(express.static(publicPath));

app.get('/main', async function(req, res) {
	fs.readFile('DB.json', 'utf8', (err, users) => {
		if (err) {console.error(err);return;}
		res.render("./main.hbs", {users:JSON.parse(users), clickable:false});
	});
});


app.get('/add', (req, res) => {
    fs.readFile('DB.json', 'utf8', (err, users) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server Error");
        }
        try {
            const parsedUsers = JSON.parse(users);
            res.render("add", { users: parsedUsers, clickable: true });
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
            return res.status(500).send("Server Error");
        }
    });
});

app.post('/add', async function(req, res) {
    let data = '';
    let filePath = 'DB.json';

    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', () => {
        let newUser = {};
        let name = qs.parse(data)['name'];
        let number = qs.parse(data)['number'];

        try {
            let DB = fs.readFileSync(filePath, 'utf8');
            DB = JSON.parse(DB);
            newUser.id = DB.length > 0 ? DB[DB.length - 1].id + 1 : 1;
            newUser.name = name;
            newUser.number = number;
            DB.push(newUser);

            fs.writeFile(filePath, JSON.stringify(DB, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err.message);
                    return res.status(500).send("Server Error");
                } else {
                    console.log('Written successfully');
                    res.writeHead(302, {
                        'Location': '/main'
                    });
                    res.end();
                }
            });
        } catch (error) {
            console.error('Error reading file:', error.message);
            return res.status(500).send("Server Error");
        }
    });
});

app.get('/update', async function(req, res){
    fs.readFile('DB.json', 'utf8', (err, users) =>{
        if (err) {console.error(err);
        return; }
        let data = JSON.parse(users);
        let user = data.find((elem) => elem.id == req.query.id)
        res.render("update.hbs", {
            users:data,
            iser:user,
            clickable:true
        });
    });
});

app.post('/update', async function(req, res) {
    let data = '';
    let filePath = 'DB.json';

    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', () => {
        let DB;

        let name = qs.parse(data)['name'];
        let number = qs.parse(data)['number'];
        let id = qs.parse(data)['id'];

        try {
            DB = fs.readFileSync(filePath, 'utf8');
            DB = JSON.parse(DB);

            let newUser = { "id": id, "name": name, "number": number };

            for (let i = 0; i < DB.length; i++) {
                if (id == DB[i].id) {
                    DB[i] = newUser;
                    break;
                }
            }

            fs.writeFile(filePath, JSON.stringify(DB, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file:', err.message);
                    return res.status(500).send("Server Error");
                } else {
                    console.log('Written successfully.');
                    res.writeHead(302, {
                        'Location': '/main'
                    });
                    res.end();
                }
            });
        } catch (error) {
            console.error('Error reading file:', error.message);
            return res.status(500).send("Server Error");
        }
    });
});

app.delete('/delete/:id', async function(req, res) {
    let filePath = 'DB.json';
    let id = req.params.id;

    try {
        let DB = fs.readFileSync(filePath, 'utf8');
        DB = JSON.parse(DB);

        for (let i = 0; i < DB.length; i++) {
            if (Number(id) === Number(DB[i].id)) {
                DB.splice(i, 1);
                break;
            }
        }
        fs.writeFile(filePath, JSON.stringify(DB, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err.message);
                return res.status(500).send("Server Error");
            } else {
                console.log('Written successfully.');
                res.redirect('/main');
            }
        });
    } catch (error) {
        console.error('Error reading file:', error.message);
        return res.status(500).send("Server Error");
    }
});



app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
