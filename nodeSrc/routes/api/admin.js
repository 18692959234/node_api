const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); //加密解密
const adminUser = require("../../models/adminUser");
const jwt = require('jsonwebtoken'); //使用token
const passport = require("passport"); //验证
const keys = require("../../config/key");

router.post('/res', (req, res) => {


	adminUser.findOne({
			username: req.body.username
		})
		.then((admin) => {
					
			if(admin){
				res.status(400).josn({code:0,msg:"用户已存在"})
			}
			else{
				
				const newAdminUser = new adminUser({
				username:req.body.username,
				password:req.body.password
				
			})
	
			
						//使用加密
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newAdminUser.password, salt, function(err, hash) {
					// Store hash in your password DB.
					if(err) throw err

					newAdminUser.password = hash;

					newAdminUser.save().then(user => res.json(user))
						.catch(err => console.log(err))
				});
			});
				
			}
	
		})

})

router.post('/login',(req,res)=>{
	
	const username=req.body.username;
	const password=req.body.password;
//	console.log('user'+username)
//console.log('ps'+password)
	adminUser.findOne({username:req.body.username})
	.then((admin)=>{
		if(!admin){
		res.json({code:0,msg:"用户不存在"})	
		}
		else{
						bcrypt.compare(password, admin.password)
					.then(isMatch => {
						if(isMatch) {
							const rule = {
								id: admin.id,
								username:admin.username
							};
							jwt.sign(rule, keys.secretOrKey, {
								expiresIn: keys.vaildTime
							}, (err, token) => {
								if(err) throw err;
								res.json({
									code:200,
									msg: "success",
									token: "Bearer " + token,//一定要加"Bearer "
									admin,
								})
							})
							//		jwt.sign("规则","加密的名字","过期时间","箭头函数")

						} else {
							return res.json({
								code:0,
								msg: "密码错误"
							})
						}
					})
		}
	})
	
})


module.exports = router