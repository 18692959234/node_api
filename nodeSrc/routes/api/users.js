const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt"); //加密解密
const gravatar = require('gravatar'); //全国公认头像
const jwt = require('jsonwebtoken'); //使用token
const passport = require("passport"); //验证
const User = require("../../models/User")
const keys = require("../../config/key");
const validateRegisterInpit = require("../../validation/res")
const validateLoginInpit = require("../../validation/login")
const isEmpty = require("../../validation/is-empty");
//返回请求的数据
router.get("/text", (req, res) => {
	res.json({
		msg: "login works"
	})
})

//router.post
router.post("/res", (req, res) => {

	const {
		errors,
		isValid
	} = validateRegisterInpit(req.body);
	//
	////判断是否通过
	if(!isValid) {
		return res.status(400).json(errors);
	}

	//查询数据库中是否拥有名字
	User.findOne({
		email: req.body.email
	}).then((user) => {
		if(user) {
			return res.status(400).json({
				name: "邮箱已存在"
			})
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			const newUser = new User({
				name: req.body.name,
				age: req.body.age,
				sex: req.body.sex,
				chat: req.body.chat,
				avatar,
				password: req.body.password,
				email: req.body.email,
			})

			//使用加密
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, function(err, hash) {
					// Store hash in your password DB.
					if(err) throw err

					newUser.password = hash;

					newUser.save().then(user => res.json(user))
						.catch(err => console.log(err))
				});
			});

		}
	})
})

//get user
router.post("/login", (req, res) => {
		console.log(req.body)
	const {
		errors,
		isValid
	} = validateLoginInpit(req.body);

	//
	////判断是否通过
	if(!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email
	const password = req.body.password

	//查询数据库 
	User.findOne({
			email
		})
		.then((user) => {
			if(!user) {
				return res.status(404).json({
					name: "用户不存在"
				})
			} else {
				bcrypt.compare(password, user.password)
					.then(isMatch => {
						if(isMatch) {
							const rule = {
								id: user.id,
								chat: user.password
							};
							jwt.sign(rule, keys.secretOrKey, {
								expiresIn: keys.vaildTime
							}, (err, token) => {
								if(err) throw err;
								res.json({
									msg: "success",
									token: "Bearer " + token, //一定要加"Bearer "
								})
							})
							//		jwt.sign("规则","加密的名字","过期时间","箭头函数")

						} else {
							return res.status(400).json({
								chat: "密码错误"
							})
						}
					})
			}
		})
})

router.get('/list', (req, res) => {
	//	res.render('errors');
	var queObj = req.query;

	if(isEmpty(queObj)) {
		var userName = {}
	} else {
		var userName = queObj;
	}
	User.find(userName, (err, data) => {
		if(!err) {
			isEmpty(data) == true ? res.status(400).jsonp({
				msg: "接口不存在"
			}) : res.json(data)
			//console.log(typeof data)

		} else {
			throw err;
		}
	})

})


router.post("/delete",(req,res)=>{
	User.deleteOne
	
})




//验证
router.get('/current', passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	//res.json({id:req.users.id})
	console.log(req.user)
})

module.exports = router