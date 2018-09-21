const Validator = require("validator") //验证
const isEmpty = require("./is-empty");

module.exports = function validateMyBlogInpit(data) {
	let errors = {};
	//console.log(data)

	data.author = !isEmpty(data.author) ? data.author : '';
	data.catrgories = !isEmpty(data.catrgories) ? data.catrgories : '';

	data.content = !isEmpty(data.content) ? data.content : '';
	data.content = !isEmpty(data.content) ? data.content : '';
//	if(Validator.isLength(data.author, {
//			min: 2,
//			max: 30
//		})) {
//		errors.author = "作者不能少于2个字符,且不能大于30个字符"
//	}

	if(Validator.isEmpty(data.author)) {
		errors.author = "作者不能为空"
	}
	if(Validator.isEmpty(data.catrgories)) {
		errors.catrgories = "类别不能为空"
	}
	if(Validator.isEmpty(data.content)) {
		errors.content = "内容不能为空"
	}

//	if(Validator.isLength(data.title, {
//			min: 2,
//			max: 30
//		})) {
//		errors.title = "标题不能少于2个字符,且不能大于30个字符"
//	}

	if(Validator.isEmpty(data.title)) {
		errors.title = "标题不能为空"
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
}