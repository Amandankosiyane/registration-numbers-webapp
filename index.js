const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');
const RegRoutes = require('./regNumbers');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/regNumber');
const regRoutes = RegRoutes(models);
const app = express();

app.engine('.handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

app.get('/', function(req,res){
        res.redirect('/regNumbers')
})

app.get('/regNumbers', regRoutes.index);
app.get('/regNumbers', regRoutes.added);
app.post('/regNumbers', regRoutes.added);
app.get('/filter', regRoutes.filterAdd);
app.post('/filter', regRoutes.filterAdd);
app.get('/clear', regRoutes.resetRegs);
app.post('/clear', regRoutes.resetRegs);
app.get('/show', regRoutes.showRegs);
app.post('/show', regRoutes.showRegs);




const port = process.env.PORT || 3015;
app.listen(port, function(){
        console.log('web app started on port: ' + port);
})
