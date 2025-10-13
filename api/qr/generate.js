import qr from 'qr-image';
import { createHash } from 'crypto';

// Helper function for rate limiting
function getRateLimitKey(req) {
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'anonymous';
  return createHash('md5').update(ip).digest('hex');
}

// Simple in-memory rate limiting (for demo - use Redis in production)
const rateLimitStore = new Map();

function checkRateLimit(key, limit = 50, windowMs = 900000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Clean old entries
  for (const [k, data] of rateLimitStore.entries()) {
    if (data.lastRequest < windowStart) {
      rateLimitStore.delete(k);
    }
  }
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, {
      count: 1,
      lastRequest: now
    });
    return true;
  }
  
  const data = rateLimitStore.get(key);
  if (data.lastRequest < windowStart) {
    data.count = 1;
    data.lastRequest = now;
    return true;
  }
  
  if (data.count >= limit) {
    return false;
  }
  
  data.count++;
  data.lastRequest = now;
  return true;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Rate limiting
  const rateLimitKey = getRateLimitKey(req);
  if (!checkRateLimit(rateLimitKey)) {
    res.status(429).json({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.'
    });
    return;
  }

  try {
    if (req.method === 'GET') {
      await handleGetRequest(req, res);
    } else if (req.method === 'POST') {
      await handlePostRequest(req, res);
    } else {
      res.status(405).json({
        error: 'Method not allowed',
        message: 'Only GET and POST methods are supported'
      });
    }
  } catch (error) {
    console.error('QR Generation Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate QR code'
    });
  }
}

async function handleGetRequest(req, res) {
  const { query } = req;
  const { text, size = 200, margin = 1, format = 'png' } = query;

  // Validation
  if (!text) {
    res.status(400).json({
      error: 'Missing required parameter',
      message: 'The "text" parameter is required'
    });
    return;
  }

  if (text.length > 1000) {
    res.status(400).json({
      error: 'Text too long',
      message: 'Text must be less than 1000 characters'
    });
    return;
  }

  const sizeNum = parseInt(size);
  const marginNum = parseInt(margin);

  if (isNaN(sizeNum) || sizeNum < 50 || sizeNum > 1000) {
    res.status(400).json({
      error: 'Invalid size',
      message: 'Size must be between 50 and 1000'
    });
    return;
  }

  if (isNaN(marginNum) || marginNum < 0 || marginNum > 10) {
    res.status(400).json({
      error: 'Invalid margin',
      message: 'Margin must be between 0 and 10'
    });
    return;
  }

  const supportedFormats = ['png', 'svg', 'pdf', 'eps'];
  if (!supportedFormats.includes(format.toLowerCase())) {
    res.status(400).json({
      error: 'Unsupported format',
      message: `Supported formats: ${supportedFormats.join(', ')}`
    });
    return;
  }

  // Generate QR code
  const qrImage = qr.image(text, {
    type: format,
    size: sizeNum,
    margin: marginNum
  });

  // Set response headers
  const contentType = {
    png: 'image/png',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    eps: 'application/postscript'
  }[format];

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `inline; filename="qr-code.${format}"`);
  res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
  res.setHeader('CDN-Cache-Control', 'public, max-age=86400');
  res.setHeader('Vercel-CDN-Cache-Control', 'public, max-age=86400');

  qrImage.pipe(res);
}

async function handlePostRequest(req, res) {
  const { 
    text, 
    size = 200, 
    margin = 1, 
    format = 'png',
    color = '#000000',
    background = '#FFFFFF'
  } = req.body;

  // Validation
  if (!text) {
    res.status(400).json({
      error: 'Missing required parameter',
      message: 'The "text" field is required'
    });
    return;
  }

  // Generate QR code with custom colors
  const qrOptions = {
    type: format,
    size: parseInt(size),
    margin: parseInt(margin),
    color: color,
    background: background
  };

  const qrImage = qr.image(text, qrOptions);
  
  const contentType = {
    png: 'image/png',
    svg: 'image/svg+xml',
    pdf: 'application/pdf',
    eps: 'application/postscript'
  }[format];

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `inline; filename="qr-code.${format}"`);
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.setHeader('CDN-Cache-Control', 'public, max-age=86400');
  res.setHeader('Vercel-CDN-Cache-Control', 'public, max-age=86400');

  qrImage.pipe(res);
      }
