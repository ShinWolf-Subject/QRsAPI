export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    res.json({
        service: 'QR Code Generator API',
        version: '1.0.6',
        deployedOn: 'Vercel',
        endpoints: {
            'GET /api/qr/generate': {
                description: 'Generate QR code using API',
                parameters: {
                    text: 'Required. Text/URL to encode',
                    size: 'Optional. Size in pixels (50-1000), default: 200',
                    margin: 'Optional. Margin size (0-10), default: 1',
                    format: 'Optional. Output format (png, svg, pdf, eps), default: png'
                },
                example: 'https://qrsapi.vercel.app/api/qr/generate?text=Hello%20World&size=200&margin=2&format=png'
            },
            'POST /api/qr/generate': {
                description: 'Generate QR code with custom options',
                body: {
                    text: 'Required. Text/URL to encode',
                    size: 'Optional. Size in pixels',
                    margin: 'Optional. Margin size',
                    format: 'Optional. Output format',
                    color: 'Optional. QR code color (hex)',
                    background: 'Optional. Background color (hex)'
                }
            },
            'GET /api/qr/info': {
                description: 'Get API documentation'
            }
        }
    });
                  }
