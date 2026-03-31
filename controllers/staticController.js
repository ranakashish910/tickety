const Contact=require('../models/contact') 
const axios = require('axios');
require('dotenv').config();

const getPrivacy=(req,res)=>{
    res.render('privacy');
}
const getTerms=(req,res)=>{
    res.render('terms');
}
const getContact=(req,res)=>{
    res.render('contact');
}
const postContact=async(req,res)=>{
    try{
    const {name,email,subject,message}=req.body;
    const newContact= new Contact({name,email,subject,message});
    await newContact.save();
    res.render('contact',{success:""})
    }catch(err){
        console.log(err);
        res.send('Server error')
    }
}
const getAbout=(req,res)=>{
    res.render('about');
}
const postChat=async(req,res)=>{
     try {
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: "You are Tickety AI. Always reply in the language in which customer asks question. Keep your answers concise (max 2 sentences written in attractive way). Help with bookings. Mention TICKETY fees are 10₹ + 1% only when asked." },
                { role: "user", content: req.body.message }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.choices) {
            res.json({ reply: response.data.choices[0].message.content });
        } else {
            res.json({ reply: "Something went wrong with AI response." });
        }
    } catch (err) {
        console.error("GROQ API ERROR:", err.response ? err.response.data : err.message);
        res.status(500).json({ reply: "Contact Tickety Support!" });
    }
}

module.exports={getPrivacy,getTerms,getContact,getAbout,postContact,postChat}