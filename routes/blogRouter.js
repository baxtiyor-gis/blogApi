const express = require('express');
const { update } = require('../models/blogModel');
const Blog = require('../models/blogModel');
const Category = require('../models/categoryModel');
const router = express.Router();



router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort('-createdAt')
      .populate('category', '_id name');

    if (blogs)
      return res.status(200).json({
        message: 'succes',
        length: blogs.length,
        blogs: blogs
      });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id })
      .populate('category', '_id name');

    if (!blog)
      return res.status(400).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'success', blog: blog });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const newBlog = {
      name: req.body.name,
      text: req.body.text,
      category: req.body.category,
      tags: req.body.tags,
      createdAt: Date.now(),
      updatedAt: null
    };
    const blog = await Blog.create(newBlog)
    if (blog)
      return res.status(200).json({ message: 'success', blog: blog });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: 'Id is required!' });

    const blog = Blog.findOne({ _id: id });
    if (!blog)
      return res.status(400).json({ message: 'Blog not found!' });

    const newBlog = {
      name: req.body.name,
      text: req.body.text,
      category: req.body.category,
      tags: req.body.tags,
      updatedAt: Date.now(),
    };
    const updateBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true, runValidators: true })
    
    if (updateBlog)
      return res.status(200).json({ message: 'succes', updateBlog });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})




router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: 'Id is required!' });

    const category = Blog.findOne({ _id: id });
    if (!category)
      return res.status(400).json({ message: 'blog not found!' });

    const deleteBlog = await Blog.findByIdAndDelete(id)
    if (deleteBlog)
      return res.status(200).json({ message: 'succes' });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})






module.exports = router;
