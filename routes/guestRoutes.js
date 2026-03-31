const express=require('express')
const router=express.Router()
// const{isLoggedIn,isAdmin}=require('../middlewares/authenticate')
const {getHome,Home,getLogin,postUserLogin,postAdminLogin,getRegister,postRegister}=require('../controllers/guestController')
router.get('/',getHome)
router.get('/home',Home)
router.get('/login',getLogin);
router.post('/login',postUserLogin);
router.post('/admin/login',postAdminLogin);
router.get('/register',getRegister);
router.post('/register',postRegister)

module.exports=router;