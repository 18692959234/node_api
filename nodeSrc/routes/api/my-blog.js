const express = require("express");
const router = express.Router();
const myBlog = require("../../models/my-blog");
const jwt = require('jsonwebtoken'); //使用token
const passport = require("passport"); //验证
const keys = require("../../config/key");
const validateMyBlogInpit = require("../../validation/myBlog");
var oString=require("../../rand")



router.get("/",(req,res)=>{
	res.send("hello")
})

router.post("/iusse",(req,res)=>{
	
	const newBlog= new myBlog(
		{
			posts:{
			oString:{
			author:req.body.author,
			catrgories:req.body.catrgories,
			},
			content:req.body.content,
			title:req.body.title
			}
		}
	)
	



newBlog.save().then(data=>res.json(data))
			

	

	
//	newBlog.save().then(data=>res.json(data))
	
	
})

module.exports = router