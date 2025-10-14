# 📦 QR Code Generation API

Generate high-performance QR codes via a simple RESTful API. Deployed serverlessly on Vercel for blazing-fast response times.

## 🚀 Live Demo

Explore the API live at qrsapi.vercel.app

📘 API Documentation

🔗 Base URL

```
https://qrsapi.vercel.app
```

---

### 📥 GET /api/qr/generate

Generate a QR code via query parameters.

Example:

```
GET https://qrsapi.vercel.app/api/qr/generate?text=HelloWorld&size=200&format=png
```

Query Parameters:

| Parameter | Type   | Description                  |
|-----------|--------|------------------------------|
| text    | string | Text to encode in QR         |
| size    | number | Size in pixels (default: 200)|
| format  | string | png or svg               |

---

### 📤 POST /api/qr/generate

Generate a QR code with custom options via JSON payload.

Headers:

```
Content-Type: application/json
```

Body Example:

```json
{
  "text": "Hello World",
  "size": 300,
  "margin": 2,
  "format": "png",
  "color": "#FF0000",
  "background": "#FFFFFF"
}
```

---

### 📊 GET /api/qr/info

Returns API usage information and metadata.

---

### ❤️ GET /health

Health check endpoint to verify server status.

---

### 🛠 Tech Stack

- Serverless Functions (Vercel)
- Node.js
- QR Code generation library

📄 License

MIT

---

Made by [Nine12](https://xlst-hub.netlify.app/@Nine) for qrsapi.vercel.app
