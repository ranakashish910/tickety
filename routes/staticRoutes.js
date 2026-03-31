const express=require('express');
const router=express.Router();
const {getPrivacy,getTerms,getContact,getAbout,postContact,postChat}=require('../controllers/staticController')


router.get('/privacy',getPrivacy);
router.get('/terms',getTerms);
router.get('/contact',getContact);
router.post('/contact',postContact)
router.get('/about',getAbout);
router.post('/chat', postChat);

module.exports=router;