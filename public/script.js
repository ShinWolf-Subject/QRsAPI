/*!
 * QRsAPI by Nine12 <fqnlst.vercel.app>
 * Copyright (c) 2025 Nine12
 * Powered by Vercel <vercel.com>
 * MIT License (./LICENSE)
 * Generate QR Code easily use Nine QRsAPI
   • Example:
     - https://qrsapi.vercel.app/api/qr/generate?text=Hello%20World&size=200&margin=2&format=png
     · https://qrsapi.vercel.app/api/qr/generate?text=${text:Hello%20World}&size=${size:50-1000}&margin=${margin:1-10}&format=${format:base32/64,hex,etc}
   * Alert: Made by Nine12, All Right Reserved.
   * <Read more in README.md>
!*/
 
 // Text for typeText animation
const text = "Nine QRsAPI";
const typedTextElement = document.getElementById("typedText");
let index = 0;

// Type Effect for (text)
function typeText() {
    if (index < text.length) {
        typedTextElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 150);
    }
}

// Timeout text typed animation
setTimeout(typeText, 600);

// GSAP Components for animation
gsap.to("#header", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.to("#demoSection", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out"
});

gsap.to("#apiDocs", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.4,
    ease: "power3.out"
});

gsap.from(".endpoint", {
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.6,
    ease: "power2.out"
});

gsap.to("#footer", {
    opacity: 1,
    duration: 1,
    delay: 0.8,
    ease: "power3.out"
});

// Create a Base URL for generate QR later.
const baseUrl = window.location.origin;
document.getElementById("baseUrl").textContent = baseUrl;
document.getElementById(
    "getExample"
).textContent = `GET ${baseUrl}/api/qr/generate?text=Hello%20World&size=200&margin=1&format=png`;

// Setup option
document.getElementById("qrForm").addEventListener("submit", async e => {
    e.preventDefault();

    const formData = {
        text: document.getElementById("text").value,
        size: document.getElementById("size").value,
        margin: document.getElementById("margin").value,
        format: document.getElementById("format").value
    };
    
    // Response
    try {
        const params = new URLSearchParams(formData);
        const response = await fetch(`${baseUrl}/api/qr/generate?${params}`);
        
        // Blob result url
        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            /* Result display & Download button */
            const resultDiv = document.getElementById("result");
            resultDiv.innerHTML = `
                <h3 class="text-2xl font-bold text-white mb-4">Your QR Code:</h3>
                <div class="inline-block border-2 border-gray-700 rounded-lg p-4 bg-gray-800/50 shadow-lg">
                    <img src="${url}" alt="QR Code" class="max-w-full" id="qrImage">
                </div>
                <p class="mt-4">
                    <a href="${url}" 
                        download="qr.${formData.format}"
                        class="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transform hover:-translate-y-1 transition-all duration-200">
                        Download QR Code
                    </a>
                </p>
            `;
            
            // Spin 180° for QR Image
            gsap.from("#qrImage", {
                scale: 0,
                rotation: -180,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
            // Error message
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
        // Error feedback
    } catch (error) {
        alert("Failed to generate QR code: " + error.message);
    }
});

/* ... */
