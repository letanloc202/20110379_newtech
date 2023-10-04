const express = require('express');
const router = express.Router();
const blogModel = require('../models/blogModel');
const comment = require('../models/comment')

// Main page - post
router.get('/', (req, res) => {
    const posts = blogModel.getAllPosts();
    res.render('index', { posts, style: 'home.css' });
});

router.post('/post/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogModel.getPostById(postId);
    res.render('post', { post });
});
//Add comment
router.post('/post/:id/comment', (req, res) => {
    const postId = (req.params.id);
    const comment = req.body.comment;
    console.log(postId)
    console.log(comment)

    const comments = blogModel.addCmt(postId, comment)
    console.log(comments)
    if (!comments) {
        // page not found
        res.status(404).send("Bài viết không tồn tại.");
        return;
    }
    res.redirect(`/post/${postId}`);

});
// Post details
router.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogModel.getPostById(postId);
    res.render('post', { post });
});


// Delete post
router.get('/delete/:id', (req, res) => {
    const postId = req.params.id;
    blogModel.deletePost(postId);
    res.redirect('/');
});

// Edit post
router.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogModel.getPostById(postId);
    res.render('edit', { post });
});

// Edit post(show form edit)
router.post('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const updatedPost = {
        id: postId,
        title: req.body.title,
        content: req.body.content,
    };
    blogModel.updatePost(updatedPost);
    res.redirect('/');
});

// Add post
router.get('/add', (req, res) => {
    res.render('add', { style: 'add.css' });
});

router.post('/add', (req, res) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content,
    };
    blogModel.addPost(newPost);
    res.redirect('/');
});

module.exports = router;