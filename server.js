const express = require('express')
require('dotenv').config()
const app = express();
const connectdb = require('./config/db')
const session = require('express-session')
app.set("view engine", "ejs")
connectdb();
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    name: 'connect.sid',
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        path: '/'
    }
}))


app.use((req, res, next) => {
  res.locals.session = req.session ? req.session.user : null;
  next();
});
const guestRoutes = require('./routes/guestRoutes')
app.use('/', guestRoutes);
const authRoutes=require('./routes/guestRoutes')
app.use('/auth',authRoutes)
const staticRoutes=require('./routes/staticRoutes')
app.use('/',staticRoutes);
const userRoutes=require('./routes/userRoutes')
app.use('/',userRoutes);

app.listen(3000, '0.0.0.0',() => {
    console.log("Listening on port 3000");
})