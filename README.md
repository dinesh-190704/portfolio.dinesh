# portfolio.dinesh

Professional Security Portfolio - A modern React-based portfolio showcasing expertise in healthcare IT infrastructure, database administration, and security operations.

## Features

- **Modern Tech Stack:** React + Vite + Tailwind CSS
- **Security Theme**: Professional dark theme with security green (#00FF41) and blue accents
- **Smooth Animations**: Framer Motion for fluid transitions
- **Responsive Design**: Optimized for all devices
- **Glass Morphism**: Modern UI with glass card effects
- **Corporate Security Styling**: Professional appearance suitable for security professionals

## Sections

- **Hero**: Professional introduction with animated background
- **About**: Detailed professional background
- **Experience**: Healthcare IT infrastructure and database administration
- **Skills**: Technical expertise and certifications
- **Infrastructure Stack**: Enterprise technologies
- **Scale & Security**: Security metrics and compliance
- **Certifications**: Professional certifications with upload functionality
- **Resume**: Downloadable resume with admin management
- **Contact**: Professional contact information

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS with custom security theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This portfolio is automatically deployed to Cloudflare Workers using GitHub Actions.

### Setup for Automatic Deployment

1. **Configure GitHub Secrets:**
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add these repository secrets:
     - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
     - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

2. **Get Cloudflare Credentials:**
   - API Token: Go to Cloudflare Dashboard → My Profile → API Tokens → Create Token
   - Account ID: Found in Cloudflare Dashboard → right sidebar

3. **Automatic Deployment:**
   - Push to `main` or `master` branch → Automatic deployment to Cloudflare Workers
   - Pull requests → Build test (no deployment)

### Manual Deployment

```bash
# Install Wrangler CLI
npm install -g wrangler

# Deploy to Cloudflare Workers
wrangler deploy --env production
```

## Author

Dinesh M - Healthcare IT Professional | Database Administrator | Security Specialist
