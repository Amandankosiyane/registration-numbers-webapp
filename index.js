const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');
const RegRoutes = require('./regNumbers');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/registrationNumbers');
const regRoutes = RegRoutes(models);
const app = express();


app.engine('.handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

//regRoutes.index is for showing the added registration numbers
app.get('/', function(req,res){
        res.redirect('/regNumbers')
})

//regRoutes.index is for adding the car registration numbers
app.get('/regNumbers', regRoutes.added);
app.post('/regNumbers', regRoutes.added);




const port = 3010;
app.listen(port, function(){
        console.log('web app started on port: ' + port);
})
