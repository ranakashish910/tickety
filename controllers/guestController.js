const Event = require('../models/events')
const User = require('../models/users')
const sendWelcomeEmail=require('../utils/mailer')
const hashed = require('../utils/hashedPassword')
const bcrypt=require('bcrypt')
const getHome = (req, res) => {
    res.redirect('/home')
}
const Home = async (req, res) => {
    try {
        const events = await Event.find()
        res.render('auth/guestDashboard', { events })
    } catch (err) {
        console.log(err);
        res.send("Error")
    }
}
const getLogin = (req, res) => {
    res.render('auth/login')
}
const postUserLogin=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email:email,role:'customer'});
        if(!user){
            res.render('auth/login',{error:"User not found",success:null})
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            res.render('auth/login',{error:"Invalid Password!",success:null})
        }
        req.session.userId=user._id;
        req.session.role=user.role;
        console.log("User Login")
        res.redirect('/dashboard');
    }catch(err){
        console.log(err);
        res.render('auth/login',{error:"Server Error",success:null})
    }
}
const postAdminLogin=async(req,res)=>{
    try{
        const {adminEmail,adminPassword,secretKey}=req.body;
        if(secretKey!=process.env.ADMIN_SECRET_KEY){
            res.render('auth/login', { error: "Invalid Admin Secret Key!", success: null });
        }
        const admin=await User.findOne({email:adminEmail,role:'admin'});
        if (!admin) {
            return res.render('auth/login', { error: "Admin account not found!", success: null });
        }
        const match=bcrypt.compare(adminPassword,admin.password);
        if(!match){
            res.render('auth/login',{error:"Invalid Password!",success:null})
        }
        req.session.id=admin._id;
        req.session.role=admin.role;
        res.redirect('/admin/dashboard');
    }catch(err){
        console.log(err);
        res.render('auth/login',{error:"Server error",success:null})
    }
}

const getRegister = (req, res) => {
    res.render('auth/register', { error: null });
}
const postRegister = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        const hashedPassword = await hashed(password);
        if (!name || !email || !password || !confirmPassword) {
            return res.render("auth/register", { error: "All fields are mandatory!"});
        } if (password !== confirmPassword) {
            return res.render("auth/register", {
                error: "Passwords do not match!",
                oldData: { name, email }
            });
        }
        const userExists = await User.findOne({ email })
        console.log("DB Result:", userExists); 
        if (userExists) {
            return res.render("auth/register", { error: "User Already Exists!" });
        }
        const newUser = new User({ name, email, password: hashedPassword })
        sendWelcomeEmail(newUser.email,newUser.name)
        await newUser.save();
        res.render("auth/login", { error: null,success: "Registration Successful! You can now login."});
    } catch (err) {
        console.log(err);
        res.render("auth/register",{error:"Error"})
    }
}


module.exports = { getHome, Home, getLogin, getRegister, postRegister ,postUserLogin,postAdminLogin}