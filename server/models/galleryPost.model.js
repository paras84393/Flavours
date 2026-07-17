import mongoose from 'mongoose';

const galleryPostSchema = new mongoose.Schema({
 
  
  title: {
    type: String,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 5000
  },
  images: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      filename: String,
      path: String,
      url: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  tags: {
    type: [String],
    default: []
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

galleryPostSchema.index({ createdAt: -1 });

const GalleryPost = mongoose.model('GalleryPost', galleryPostSchema);

export default GalleryPost;