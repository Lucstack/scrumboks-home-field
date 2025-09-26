// Cloudinary service for image uploads with automatic optimization
// Handles secure image uploads with transformations and temporary URLs

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary with optimization
export const uploadImageToCloudinary = async (file: File): Promise<{
  publicId: string;
  secureUrl: string;
  optimizedUrl: string;
  thumbnailUrl: string;
} | null> => {
  try {
    // Convert File to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload with transformations
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'scrumboks/temp-uploads',
      resource_type: 'auto',
      quality: 'auto:good', // Automatic quality optimization
      fetch_format: 'auto', // Automatic format optimization (WebP when supported)
      flags: 'attachment', // Force download instead of display
      transformation: [
        {
          width: 800,
          height: 600,
          crop: 'limit', // Don't crop, just resize if larger
          quality: 'auto:good',
        }
      ],
      // Auto-delete after 24 hours
      tags: ['temp-upload', 'auto-delete'],
    });

    // Generate optimized URLs
    const optimizedUrl = cloudinary.url(result.public_id, {
      quality: 'auto:good',
      fetch_format: 'auto',
      width: 800,
      height: 600,
      crop: 'limit',
    });

    const thumbnailUrl = cloudinary.url(result.public_id, {
      quality: 'auto:good',
      fetch_format: 'auto',
      width: 200,
      height: 200,
      crop: 'fill',
      gravity: 'face', // Focus on faces for thumbnails
    });

    return {
      publicId: result.public_id,
      secureUrl: result.secure_url,
      optimizedUrl: optimizedUrl,
      thumbnailUrl: thumbnailUrl,
    };
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return null;
  }
};

// Delete image from Cloudinary
export const deleteImageFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return false;
  }
};

// Cleanup old temp uploads (run this periodically)
export const cleanupTempUploads = async (): Promise<void> => {
  try {
    // Find all temp uploads older than 24 hours
    const result = await cloudinary.api.resources_by_tag('temp-upload', {
      resource_type: 'image',
      max_results: 100,
    });

    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const oldUploads = result.resources.filter((resource: any) => {
      const uploadDate = new Date(resource.created_at);
      return uploadDate < oneDayAgo;
    });

    // Delete old uploads
    for (const resource of oldUploads) {
      await cloudinary.uploader.destroy(resource.public_id);
      console.log(`Deleted old temp upload: ${resource.public_id}`);
    }

    console.log(`Cleaned up ${oldUploads.length} old temp uploads`);
  } catch (error) {
    console.error('Error cleaning up temp uploads:', error);
  }
};

// Get image info
export const getImageInfo = async (publicId: string) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return result;
  } catch (error) {
    console.error('Error getting image info:', error);
    return null;
  }
};
