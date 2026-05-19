// Profile photo placeholder - replace base64 string with your own photo
const profilePhoto = 'data:image/svg+xml;base64,' + btoa(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f0f0f0"/>
      <stop offset="100%" style="stop-color:#e0e8f0"/>
    </linearGradient>
    <linearGradient id="suit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#9aa5b0"/>
      <stop offset="100%" style="stop-color:#7a8590"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <ellipse cx="200" cy="420" rx="130" ry="120" fill="url(#suit)"/>
  <polygon points="175,280 200,320 225,280" fill="#fff"/>
  <polygon points="193,285 200,340 207,285" fill="#7ecbcf"/>
  <ellipse cx="200" cy="260" rx="30" ry="35" fill="#c49a6c"/>
  <ellipse cx="200" cy="200" rx="65" ry="75" fill="#c49a6c"/>
  <ellipse cx="200" cy="145" rx="60" ry="40" fill="#1a1a1a"/>
  <ellipse cx="165" cy="165" rx="20" ry="30" fill="#1a1a1a"/>
  <ellipse cx="235" cy="165" rx="20" ry="30" fill="#1a1a1a"/>
  <ellipse cx="180" cy="200" rx="8" ry="6" fill="#1a1a1a"/>
  <ellipse cx="220" cy="200" rx="8" ry="6" fill="#1a1a1a"/>
  <path d="M 180 225 Q 200 245 220 225" stroke="#8b5e3c" stroke-width="3" fill="none"/>
  <path d="M 170 188 Q 180 183 190 186" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
  <path d="M 210 186 Q 220 183 230 188" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
</svg>
`);

export default profilePhoto;