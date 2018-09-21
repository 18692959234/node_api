const express=require('express');
const mongoose=require("mongoose");
const bodyParser=require("body-parser")
const passport=require("passport");
const app=new express();
const port=process.env.PORT || 5000;

//user
const users=require("./nodeSrc/routes/api/users")

//profile
const profile=require("./nodeSrc/routes/api/profiles")


//admin
const adminUser=require("./nodeSrc/routes/api/admin")


//posts
const posts=require("./nodeSrc/routes/api/posts")

//posts
const myBlog=require("./nodeSrc/routes/api/my-blog")


//  DB
const db=require("./nodeSrc/config/key").mongoUrl;

//使用中间件允许跨域
//app.use((req,res,next)=>{
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//  next();
//})


//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//初始化passport
app.use(passport.initialize());
require("./nodeSrc/config/passport.js")(passport)
//connect

mongoose.connect(db).then(()=>{
	console.log('连接成功')
}).catch(err=>console.log(err))

//使用routes
app.use("/api/users",users);


//使用profile
app.use("/api/profile",profile);

//使用admin
app.use("/api/admin",adminUser);

//使用posts
app.use("/api/posts",posts);


//myBlog
app.use("/api/blog",myBlog);

app.get('/',(req,res)=>{
	
	res.send('LoseControl')
})


app.listen(port,()=>{
	console.log(`Server is running on port ${port}`)
})

