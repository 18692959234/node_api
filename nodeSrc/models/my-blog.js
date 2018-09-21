var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Crete

let counter = 1;
let CountedId = {type: Number, default: () => counter++};
const myBlogSchema = new Schema({
	type: 'object',
	posts: {
		oString:{
			author: {
				type: String,
				required: true
			},
			catrgories: {
				type: Array,
				required: true
			}
		},

		content: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	},
	uid:CountedId,

});

const myBlog = mongoose.model("myBlog", myBlogSchema);

myBlog.find({ id: { $gt: 0 } }).sort({ id: -1 })
    .then(([first, ...others]) => {
        if (first)
            counter = first.id + 1;
    });


module.exports = myBlog;