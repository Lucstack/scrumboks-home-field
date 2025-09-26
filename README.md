# Scrumboks Home Field Website

A modern, responsive website for Rugby Club de Scrumboks built with React, TypeScript, and Tailwind CSS.

## Features

- 🏉 Modern rugby club website design
- 📧 Contact form with email functionality
- 🎯 Club van 50 membership form
- 💰 Sponsorship inquiry form
- 📱 Fully responsive design
- ⚡ Fast loading with Vite
- 🎨 Beautiful UI with shadcn/ui components

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd scrumboks-home-field
```

2. Install dependencies:

```bash
npm install
```

### Running the Application

#### Option 1: Run both frontend and proxy server (Recommended)

```bash
npm run dev:full
```

This will start:

- Frontend development server on http://localhost:5173
- Proxy server on http://localhost:3001

#### Option 2: Run services separately

Terminal 1 - Start the proxy server:

```bash
npm run proxy
```

Terminal 2 - Start the frontend:

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Email Functionality

The website includes several forms that send emails:

- **Contact Form**: Sends inquiries to `secretaris@scrumboks.nl`
- **Club van 50**: Sends membership applications to `bestuur@scrumboks.nl`
- **Sponsorship**: Sends sponsorship inquiries to `bestuur@scrumboks.nl`
- **Proeftraining**: Sends trial training requests to `secretaris@scrumboks.nl`

### Email Service Architecture

The email functionality uses:

1. **Frontend**: React forms that collect user data
2. **Proxy Server**: Node.js/Express server that handles CORS and forwards requests
3. **Google Apps Script**: Backend service that actually sends the emails

The proxy server is necessary because Google Apps Script doesn't support CORS headers, which would block direct requests from the browser.

## Project Structure

```
src/
├── components/          # React components
├── lib/                # Utility functions and services
├── pages/              # Page components
├── hooks/              # Custom React hooks
└── assets/             # Static assets

proxy-server.js         # CORS proxy server
```

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express
- **Email**: Google Apps Script
- **Deployment**: GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Rugby Club de Scrumboks.
