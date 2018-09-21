const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
	code: {
		type:Number
	},
	username: String,
	password: String,
	grade: {
		type: String,
		default: "普通管理员"
	}
})

module.exports = Profile = mongoose.model("adminUser", adminUserSchema);