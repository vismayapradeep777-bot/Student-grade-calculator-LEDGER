const r=require('express').Router(),c=require('../controllers/jsonController');r.post('/login',c.login);module.exports=r;
