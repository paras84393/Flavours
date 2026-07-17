import express from 'express';
import upload from '../config/multer.js';
import auth from '../middleware/auth.js';
import * as galleryController from '../controllers/galleryPost.controller.js';

const router = express.Router();

router.post('/', auth, upload.array('images', 10), galleryController.createPost);
router.get('/', galleryController.getAllPosts);
router.get('/:id', galleryController.getPost);
router.patch('/:id', auth, galleryController.updatePost);
router.delete('/:id', auth, galleryController.deletePost);
router.delete('/:id/images/:imageId', auth, galleryController.deleteImage);

export default router;