const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // memory storage
const Blog = require('../models/blogModel');
const CommentDB = require('../models/commentModel');
const path = require('path');



router.post('/', upload.none(), async (req, res) => {
  const { title, content } = req.body;

  
  const blog = await Blog.create({
    title,
    content,
    createdBy: req.user._id,
  });
  return res.status(200).json({BlogID: blog._id});
});

router.get('/addBlog', async (req, res) => {
  return res.render('addBlog');
});

router.get('/:id', async (req, res) => {

  console.log('handos handnsdjfsf');
  const blogID = req.params.id;
  const blog = await Blog.findById(blogID);

  if (!blog) {
    return res.status(404).json({message:'Blog not found'});
  }

  const comments = await CommentDB.find({ blogId: blogID }).populate('CommentBy');
   return res.status(200).json({blog, comments});

})


router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;