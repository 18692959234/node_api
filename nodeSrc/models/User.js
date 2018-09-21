var mongoose=require('mongoose');
var Schema=mongoose.Schema;


//Crete

const profileSchema=new Schema({
	name:String,
	age:Number,
	sex:{
		type:String,
		default:'男'
	},
	chat:String,
	avatar:String,
	password:String,
	email:String,
	
});

module.exports=User=mongoose.model("people",profileSchema)


