import GalleryPost from '../models/galleryPost.model.js';
import path from 'path';
import fs from 'fs';
import { optimizeImage } from '../utils/imageOptimizer.js';
import mongoose from 'mongoose';

export const createPost = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    

    

    if (!description || description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Description must be at least 10 characters'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one image is required'
      });
    }

    const images = [];
    for (const file of req.files) {
      try {
        await optimizeImage(
          file.path,
          path.join(path.dirname(file.path), `optimized-${file.filename}`)
        );

        images.push({
          _id: new mongoose.Types.ObjectId(),
          filename: file.filename,
          path: file.path,
          url: `/uploads/gallery/default/${file.filename}`,
          uploadedAt: new Date()
        });
      } catch (error) {
        console.error(`Error processing image ${file.filename}:`, error);
      }
    }

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Failed to process images'
      });
    }

    const galleryPost = new GalleryPost({
     
      title: title || 'Untitled Post',
      description,
      images,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      isPublished: true
    });

    await galleryPost.save();

    res.status(201).json({
      success: true,
      message: 'Gallery post created successfully',
      data: galleryPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await GalleryPost.find({ isPublished: true })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("GET ALL POSTS ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await GalleryPost.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Gallery post not found'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;
    

    const post = await GalleryPost.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Gallery post not found'
      });
    }

    

    if (title) post.title = title;
    if (description) post.description = description;
    if (tags) post.tags = tags.split(',').map(tag => tag.trim());

    post.updatedAt = new Date();
    await post.save();

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
   

    const post = await GalleryPost.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Gallery post not found'
      });
    }

    

    for (const image of post.images) {
      try {
        if (fs.existsSync(image.path)) {
          fs.unlinkSync(image.path);
        }
      } catch (err) {
        console.error(`Error deleting file ${image.path}:`, err);
      }
    }

    await GalleryPost.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Gallery post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id, imageId } = req.params;
    const restaurantId = req.admin?.restaurantId;

    const post = await GalleryPost.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Gallery post not found'
      });
    }

    if (post.restaurantId.toString() !== restaurantId.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const image = post.images.id(imageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }

    try {
      if (fs.existsSync(image.path)) {
        fs.unlinkSync(image.path);
      }
    } catch (err) {
      console.error('Error deleting file:', err);
    }

    post.images.id(imageId).deleteOne();
    await post.save();

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};