const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const postsSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "people"
	},
	text: {
		type: String,
		required: true
	},

	name: {
		type: String,

	},
	avatar: {
		type:String
	},
	likes: [{
		user: {
			type: Schema.Types.ObjectId,
			ref: "people"
		}
	}],
	comments: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: "people"
			},
			text: {
				type: String,
				required: true
			}

		}
	],

	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = posts = mongoose.model("posts", postsSchema);