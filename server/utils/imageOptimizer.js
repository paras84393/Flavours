import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const optimizeImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize(1200, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80, progressive: true })
      .toFile(outputPath);

    fs.unlinkSync(inputPath);
    fs.renameSync(outputPath, inputPath);

    return inputPath;
  } catch (error) {
    console.error('Image optimization error:', error);
    throw new Error('Failed to optimize image');
  }
};