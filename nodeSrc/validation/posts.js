const Validator = require("validator") //验证
const isEmpty = require("./is-empty");

module.exports = function validatePostInpit(data) {
	let errors = {};
	//console.log(data)

	data.text = !isEmpty(data.text) ? data.text : '';

	if(Validator.isLength(data.text,{min:10,max:300}))
	{
		errors.email = "评论不能少于10个字符,且不能大于300个字符"
	}

	if(Validator.isEmpty(data.text)) {
		errors.text = "文本不能为空"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}