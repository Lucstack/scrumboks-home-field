// Google Cloud Storage service for temporary file uploads
// Handles secure file uploads with signed URLs

import { Storage } from '@google-cloud/storage';

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'scrumboks-email-service',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Path to service account key
});

const BUCKET_NAME = process.env.GOOGLE_CLOUD_BUCKET || 'scrumboks-temp-files';
const bucket = storage.bucket(BUCKET_NAME);

// File upload with temporary signed URL
export const uploadFileToCloud = async (file: File): Promise<{
  fileUrl: string;
  signedUrl: string;
  fileName: string;
} | null> => {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const fileName = `temp-uploads/${timestamp}-${randomId}.${fileExtension}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload file to Google Cloud Storage
    const fileUpload = bucket.file(fileName);
    
    await fileUpload.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        },
      },
    });

    // Generate signed URL (valid for 24 hours)
    const [signedUrl] = await fileUpload.getSignedUrl({
      action: 'read',
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // Set file to auto-delete after 24 hours
    await fileUpload.setMetadata({
      metadata: {
        ...fileUpload.metadata?.metadata,
        ttl: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    });

    return {
      fileUrl: `gs://${BUCKET_NAME}/${fileName}`,
      signedUrl: signedUrl,
      fileName: fileName,
    };
  } catch (error) {
    console.error('Error uploading file to Google Cloud Storage:', error);
    return null;
  }
};

// Cleanup expired files (run this periodically)
export const cleanupExpiredFiles = async (): Promise<void> => {
  try {
    const [files] = await bucket.getFiles({
      prefix: 'temp-uploads/',
    });

    const now = new Date();
    const expiredFiles = files.filter(file => {
      const metadata = file.metadata?.metadata;
      if (!metadata?.expiresAt) return false;
      
      const expiresAt = new Date(metadata.expiresAt);
      return now > expiresAt;
    });

    // Delete expired files
    await Promise.all(
      expiredFiles.map(file => file.delete())
    );

    console.log(`Cleaned up ${expiredFiles.length} expired files`);
  } catch (error) {
    console.error('Error cleaning up expired files:', error);
  }
};

// Get file info
export const getFileInfo = async (fileName: string) => {
  try {
    const file = bucket.file(fileName);
    const [metadata] = await file.getMetadata();
    return metadata;
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
};
