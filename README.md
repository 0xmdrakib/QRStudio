# QR Studio

A Base Mini App and web app for generating clean, downloadable QR codes from any text, URL, wallet address, or short note.

Live app: [https://qr-studio-plum.vercel.app](https://qr-studio-plum.vercel.app)

---

## Overview

QR Studio is a lightweight QR code utility built for both the Base app Mini App environment and regular web browsers. It lets users paste or type any content, preview a QR code instantly, adjust the QR size, and export the result as a PNG image.

The app is designed around simple, privacy-friendly QR creation: QR content is generated on the client for preview/copy/download actions, while the server API provides a direct PNG fallback for Mini App and webview environments where browser downloads or clipboard image access may be limited.

## Features

- Generate QR codes from any text, link, wallet address, contact, or message
- Optional label field for naming the QR image
- Live QR preview with automatic URL/text detection
- QR size slider for adjusting the preview canvas
- Character-count indicator with a warning for dense QR content
- Paste-from-clipboard and clear controls
- Copy QR as PNG when browser clipboard support is available
- Download QR as PNG in regular web browsers
- Mini App-friendly direct image/download fallback through the QR API route
- Share QR Studio through Farcaster/Base Mini App compose flow
- Add QR Studio to the user's Mini App list
- Prefill QR content and label from URL query parameters
- Save/share fallback screen for mobile or embedded webview environments
- No server-side storage of generated QR content

## Supported platform

QR Studio supports:

- **Base Mini App / Farcaster Mini App clients** through Mini App metadata and SDK actions
- **Regular web browsers** through the same Next.js app
- **Direct QR PNG generation** through the `/api/qr` route

## Tech stack

- **Next.js** — App Router application framework
- **React** — UI rendering and client-side interactivity
- **TypeScript** — typed application code
- **Farcaster Mini App SDK** — Mini App lifecycle and client actions
- **Farcaster Frame SDK** — ready signal compatibility for older clients
- **qrcode.react** — client-side QR canvas rendering
- **qrcode** — server-side PNG QR generation
- **Plain CSS** — custom responsive UI styling in `app/globals.css`

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

## Project structure

```txt
QRStudio-main/
├── app/
│   ├── .well-known/farcaster.json/route.ts  # Serves the Mini App manifest
│   ├── api/qr/route.ts                      # Server-side PNG QR generator
│   ├── save/page.tsx                        # Save/share fallback route
│   ├── save/save-client.tsx                 # Client logic for QR image save/share flow
│   ├── ClientReady.tsx                      # SDK ready signal for embedded clients
│   ├── globals.css                          # App styling system
│   ├── layout.tsx                           # Metadata and root layout
│   ├── page.tsx                             # Main app route wrapper
│   ├── qr-studio-client.tsx                 # Main QR Studio UI and interaction logic
│   ├── icon.png                             # Tab icon
│   ├── icon.png                             # Tab icon
│   └── apple-icon.png                       # iPhone icon  
├── public/
│   ├── .well-known/farcaster.json           # Mini App manifest and account association
│   ├── embed.png                            # Mini App embed image
│   ├── hero.png                             # Hero/social preview image
│   ├── icon.png                             # App icon
│   ├── logo.png                             # App logo
│   ├── og.png                               # Open Graph image
│   ├── screen1.png                          # Screenshot asset
│   └── splash.png                           # Mini App splash image
├── next.config.mjs                          # Next.js standalone output config
├── package.json                             # Scripts and dependencies
├── tsconfig.json                            # TypeScript configuration
└── LICENSE                                  # MIT license
```

## License

This project is licensed under the [MIT License](./LICENSE).
