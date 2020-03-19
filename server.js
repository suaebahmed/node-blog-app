const express = require('express')
const app = express();
const handlebars = require("express-handlebars")
const path = require('path')
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/Blog';
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'hbs');
app.engine('hbs',handlebars({
  layoutsDir : `${__dirname}/views/layout`,
  extname: 'hbs',
  defaultLayout: 'main',
}));

app.use(express.static(path.join(__dirname+'/public')));
app.use('/bootstrap',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));

mongoose.connect(url, {  useUnifiedTopology: true , useNewUrlParser: true });
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
});
db.on('error', err => {
  console.error('connection error:', err)
});
// ------------- route -----------

app.use('/',require('./routes/blog-route'));
app.use((req,res,next)=>{
    const error = new Error('Not found')
    res.status(404).json({
        msg: error.message
    })
})

app.listen(3000,()=>{
    console.log("your app is running port on 3000...")
})
