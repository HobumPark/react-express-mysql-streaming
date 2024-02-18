const express = require('express');
const router = express.Router();
const db = require('./config/db.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my-secret-key';
const moment = require("moment");

router.use(express.json()); 
router.use(express.urlencoded( {extended : false } ));

router.post('/login',function(req,res){
    console.log('/login');

    res.send('/login');
})

router.post('/logout',function(req,res){
    console.log('/logout');

    res.send('/logout');
})

router.get('/access_token',function(req,res){
    console.log('/access_token');

    res.send('/access_token');
})

router.get('/refresh_token',function(req,res){
    console.log('/refresh_token');

    res.send('/refresh_token');
})

module.exports = router