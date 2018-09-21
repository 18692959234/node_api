const express = require('express');
const router = express.Router();
const passport = require("passport"); //验证
const mongoose = require("mongoose");

const Profile = require("../../models/profiles")
const Post= require("../../models/posts")

const validatePostInpit = require("../../validation/posts");

router.get("/text", (req, res) => {
	res.json({
		msg: "ss"
	})
})

// $route  POST api/profile
// @desc   点赞
// @access Private
router.post("/",passport.authenticate('jwt', { session: false }),(req,res) => {
const {errors,isValid} = validatePostInpit(req.body);

//   判断isValid是否通过
if(!isValid){
    return res.status(400).json(errors);
}

const newPost=new Post(
	{
		text:req.body.text,
		name:req.body.name,
		avatar:req.body.avatar,
		user:req.user.id
	}
)
newPost.save().then(data=>res.json(data))

})

// $route  GET api
// @desc   获取评论
// @access public
router.get("/", (req, res) => {
	Post.find()
	.sort({data:-1})
	.then(data=> res.json(data))
	.catch(err=>res.status(400).json({undefind:"找不到任何信息"}))
})


// $route  GET api
// @desc   获取评论
// @access public
router.get("/:id", (req, res) => {
	Post.findById(req.params.id)
	.then(data=> res.json(data))
	.catch(err=>res.status(400).json({undefind:"找不到该信息"}))
})


// $route  GET api
// @desc   获取评论
// @access private
router.delete("/:id",passport.authenticate('jwt', { session: false }),(req,res) => {
Profile.findOne({user:req.user.id}).then(profile=>{
	
		Post.findById(req.params.id)
	.then(post=>{
		if(post.user.toString()!==req.user.id){
			return res.status(401).json({msg:"用户非法操作"})
		}

			post.remove().then(()=>res.json({msg:"删除成功"}))
			

	})
	.catch(err=>res.status(400).json({postundefind:"没有该评论信息"}))


})
})


// $route  POST api/posts/like/:id
// @desc   点赞接口
// @access Private
router.post("/like/:id",passport.authenticate('jwt', { session: false }),(req,res) => {
  Profile.findOne({user:req.user.id}).then(profile => {
    Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({alreadyliked:"该用户已赞过"})
          }

          post.likes.unshift({user:req.user.id})

          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({likederror:"点赞错误"}))
  })
})


// $route  POST api/posts/unlike/:id
// @desc   取消点赞接口
// @access Private
router.post("/unlike/:id",passport.authenticate('jwt', { session: false }),(req,res) => {
  Profile.findOne({user:req.user.id}).then(profile => {
    Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({notliked:"该用户没有点过赞"})
          }

          // 获取要删掉的user id
          const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

          post.likes.splice(removeIndex,1);

          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({likederror:"取消点赞错误"}))
  })
})


// $route  POST api/posts/comment/:id
// @desc   添加评论接口
// @access Private
router.post("/comment/:id",passport.authenticate('jwt', { session: false }),(req,res) => {
  const {errors,isValid} = validatePostInput(req.body);

  // 判断isValid是否通过
  if(!isValid){
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text:req.body.text,
          name:req.body.name,
          avatar:req.body.avatar,
          user:req.user.id
        }

        post.comments.unshift(newComment);

        // save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({postnotfound:"添加评论错误"}))
})


// $route  DELETE api/posts/comment/:id
// @desc   删除评论接口
// @access Private
router.delete("/comment/:id/:comment_id",passport.authenticate('jwt', { session: false }),(req,res) => {
  
  Post.findById(req.params.id)
      .then(post => {
        if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
          return res.status(404).json({commentnotexists:"该评论不存在"})
        }

        // 找到该评论的index
        const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

        post.comments.splice(removeIndex,1);

        // save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({postnotfound:"删除评论错误"}))
})



module.exports = router