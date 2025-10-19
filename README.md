# 📦 QR Code Generator API

![Powered by Vercel](/vercel.svg)

Generate high-performance QR codes via a simple RESTful API. Deployed serverlessly on Vercel for blazing-fast response times.

## 🚀 Live Demo

Explore the API live at [qrsapi.vercel.app](https://qrsapi.vercel.app)

📘 API Documentation

🔗 Base URL

`https://qrsapi.vercel.app`

---

### 📥 GET /api/qr/generate

Generate a QR code via query parameters.

Example:

```
GET https://qrsapi.vercel.app/api/qr/generate?text=Hello%20World&size=200&margin=1&format=png
```
```html
<img src="https://qrsapi.vercel.app/api/qr/generate?text=Hello%20World&size=200&margin=1&format=png" alt="QR Code" />
```
Preview:

![QR Code](https://qrsapi.vercel.app/api/qr/generate?text=Hello%20World&size=200&margin=1&format=png)

<strong>Query Parameters:</strong>

| Parameter |  Type  | Description |
| --------- | ------ | ----------- |
| text      | string | Text to encode in QR |
| size      | number | Size in pixels (default: 200) |
|  format   | string | png or svg|
| margin    | number | size in pixel (default: 1)|
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
  "size": 200,
  "margin": 1,
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

-   Serverless Functions (Vercel)
-   Node.js
-   QR Code generation library

📄 License

[MIT](LICENSE)

---

👀 Readme

[README](README.md)

---

Made by [Nine12](https://fqnlst.vercel.app) for QRsAPI



