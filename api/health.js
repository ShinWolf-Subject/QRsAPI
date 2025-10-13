export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'QR Code API',
    platform: 'Vercel',
    environment: process.env.NODE_ENV || 'development'
  });
}
