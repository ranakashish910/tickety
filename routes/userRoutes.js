const express=require('express')
const router=express.Router();
const {getDashboard}=require('../controllers/userController')
const{isLoggedIn,isAdmin}=require('../middlewares/authenticate')

router.get('/dashboard',getDashboard);

module.exports=router;