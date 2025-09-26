import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3005;

// Google Apps Script Webhook URL
const WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx68igBvEbzb0WV8BEmbRdKK7efRiqHASfPHRxm4KJnIrXlWwnEyJHaSFSNBV4pE5Ud/exec';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Local fallback for development (when Google Cloud is not configured)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}.${file.originalname
      .split('.')
      .pop()}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: localStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// Store temporary file URLs (fallback for local development)
const tempFiles = new Map();

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://scrumboks.nl',
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proxy endpoint for Google Apps Script
app.get('/api/email', async (req, res) => {
  try {
    console.log('Proxy GET request received:', req.query);

    // Forward the request to Google Apps Script
    const response = await fetch(
      `${WEBHOOK_URL}?${new URLSearchParams(req.query).toString()}`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'Scrumboks-Website/1.0',
        },
      }
    );

    // Get the response text first
    const responseText = await response.text();
    console.log('Google Apps Script response:', responseText);

    // Check if the response is ok
    if (!response.ok) {
      console.error('Google Apps Script error:', {
        status: response.status,
        statusText: response.statusText,
        response: responseText
      });
      
      // Return error response but don't crash
      return res.status(500).json({
        success: false,
        error: `Google Apps Script error: ${response.status} - ${responseText}`,
        timestamp: new Date().toISOString(),
      });
    }

    // Return success response
    res.json({
      success: true,
      message: 'Email sent successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// POST endpoint for large data (like photos)
app.post('/api/email', async (req, res) => {
  try {
    console.log('Proxy POST request received:', req.body);

    // Convert body to URL parameters for Google Apps Script
    const params = new URLSearchParams(req.body);

    // Forward the request to Google Apps Script
    const response = await fetch(`${WEBHOOK_URL}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Scrumboks-Website/1.0',
      },
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(
        `Google Apps Script responded with status: ${response.status}`
      );
    }

    // Get the response text
    const responseText = await response.text();
    console.log('Google Apps Script response:', responseText);

    // Return success response
    res.json({
      success: true,
      message: 'Email sent successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
    }

    if (isCloudinaryConfigured()) {
      // Use Cloudinary
      try {
        // Convert file to base64
        const fileBuffer = req.file.buffer || fs.readFileSync(req.file.path);
        const base64 = fileBuffer.toString('base64');
        const dataUri = `data:${req.file.mimetype};base64,${base64}`;

        // Upload to Cloudinary with optimization
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
            },
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

        res.json({
          success: true,
          fileId: result.public_id,
          fileUrl: result.secure_url,
          optimizedUrl: optimizedUrl,
          thumbnailUrl: thumbnailUrl,
          originalName: req.file.originalname,
          size: result.bytes,
          mimetype: result.format,
          storage: 'cloudinary',
        });
      } catch (cloudError) {
        console.error('Cloudinary error:', cloudError);
        // Fallback to local storage
        return handleLocalUpload(req, res);
      }
    } else {
      // Use local storage (development fallback)
      return handleLocalUpload(req, res);
    }
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Local upload handler (fallback)
const handleLocalUpload = (req, res) => {
  const fileId = uuidv4();
  const fileUrl = `http://localhost:${PORT}/api/file/${fileId}`;

  // Store file info with expiration (1 hour)
  tempFiles.set(fileId, {
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    expiresAt: Date.now() + 60 * 60 * 1000, // 1 hour
  });

  // Schedule cleanup
  setTimeout(() => {
    cleanupFile(fileId);
  }, 60 * 60 * 1000); // 1 hour

  res.json({
    success: true,
    fileId: fileId,
    fileUrl: fileUrl,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    storage: 'local',
  });
};

// File download endpoint
app.get('/api/file/:fileId', (req, res) => {
  try {
    const fileId = req.params.fileId;
    const fileInfo = tempFiles.get(fileId);

    if (!fileInfo) {
      return res.status(404).json({
        success: false,
        error: 'File not found or expired',
      });
    }

    if (Date.now() > fileInfo.expiresAt) {
      cleanupFile(fileId);
      return res.status(410).json({
        success: false,
        error: 'File has expired',
      });
    }

    // Set appropriate headers
    res.setHeader('Content-Type', fileInfo.mimetype);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${fileInfo.originalName}"`
    );

    // Stream the file
    const fileStream = fs.createReadStream(fileInfo.path);
    fileStream.pipe(res);

    fileStream.on('error', error => {
      console.error('File stream error:', error);
      res.status(500).json({
        success: false,
        error: 'Error reading file',
      });
    });
  } catch (error) {
    console.error('File download error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Cleanup function
const cleanupFile = fileId => {
  const fileInfo = tempFiles.get(fileId);
  if (fileInfo) {
    try {
      fs.unlinkSync(fileInfo.path);
      tempFiles.delete(fileId);
      console.log(`Cleaned up file: ${fileInfo.originalName}`);
    } catch (error) {
      console.error('Error cleaning up file:', error);
    }
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Scrumboks Email Proxy',
    tempFiles: tempFiles.size,
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Scrumboks Email Proxy Server running on port ${PORT}`);
  console.log(`📧 Proxy endpoint: http://localhost:${PORT}/api/email`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
