const express = require('express');
const Category = require('../models/categoryModel');
const Blog = require('../models/blogModel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort('-createdAt');
    res.status(200).json({
      message: 'succes',
      length: categories.length,
      categories
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    if (!category)
      return res.status(400).json({ message: 'Category not found' });

    const blogs = await Blog.find({ category: category._id })
    res.status(200).json({ message: 'success', category, blogs });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = {
      name: req.body.name,
      description: req.body.description,
      createdAt: Date.now(),
      updatedAt: null,
    };
    const category = await Category.create(newCategory);
    res.status(200).json({ message: 'success', category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!req.params.id)
      return res.status(401).json({ message: 'Id is required!' });

    const category = await Category.findOne({ _id: id });
    if (!category)
      return res.status(400).json({ message: 'Category not found!' });

    const newCategory = {
      name: req.body.name,
      description: req.body.description,
      updatedAt: Date.now(),
    };
    const updateCategory = await Category.findByIdAndUpdate(id, newCategory, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: 'succes', updateCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Id is required!' });

    const category = await Category.findOne({ _id: id });
    if (!category)
      return res.status(400).json({ message: 'Category not found!' });

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (deletedCategory)
      return res.status(200).json({ message: 'succes' });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
