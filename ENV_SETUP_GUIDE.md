# 🔐 Environment Variables Setup Guide

## 📋 Overview
This guide explains how to set up environment variables for both local development and Vercel deployment.

---

## 🖥️ Local Development Setup

### 1. Create `.env.local` File

In the **root directory** of your project:

```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WHATSAPP_NUMBER=919834446217
NODE_ENV=development
PORT=5000
```

### 2. Create `client/.env.local` File

In the **client directory**:

```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WHATSAPP_NUMBER=919834446217
```

### 3. Start Development Server

```bash
npm run dev
```

The application will now use your local API at `http://localhost:5000/api`.

---

## 🚀 Vercel Deployment Setup

### Step 1: Go to Vercel Dashboard

1. Open [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Environment Variables

Click "Add New" and add the following variables:

#### For Production
```
REACT_APP_API_URL = https://auto-hybrid-services-shop.app/api
REACT_APP_WHATSAPP_NUMBER = 919834446217
NODE_ENV = production
```

#### For Preview/Staging (Optional)
```
REACT_APP_API_URL = https://preview-auto-hybrid.vercel.app/api
```

### Step 3: Save and Deploy

1. Click "Save"
2. Trigger a redeployment by pushing to main branch:
   ```bash
   git add .
   git commit -m "Update environment variables"
   git push origin main
   ```

---

## ⚙️ Environment Variables Explained

### Required Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `REACT_APP_API_URL` | `https://auto-hybrid-services-shop.app/api` | API endpoint for all requests |
| `REACT_APP_WHATSAPP_NUMBER` | `919834446217` | WhatsApp contact number |

### Optional Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `NODE_ENV` | `production` or `development` | Deployment environment |
| `PORT` | `5000` | Server port (local only) |

---

## 🔄 How Variables Work in React

### Accessing Variables in Code

```javascript
// In any React component
const apiUrl = process.env.REACT_APP_API_URL;
const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;

// Or use the global variable set in App.js
const apiUrl = window.API_BASE_URL;
```

### Example: Making API Calls

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch services
const response = await axios.get(`${API_BASE_URL}/services`);

// Create order
await axios.post(`${API_BASE_URL}/orders`, orderData);
```

---

## 🐛 Troubleshooting

### Variables Not Working?

1. **Restart development server**
   ```bash
   npm run dev
   # Press Ctrl+C to stop, then run again
   ```

2. **Clear cache**
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

3. **Check file names**
   - Ensure file is named `.env.local` (not `.env` or `env.local`)
   - Place it in the correct directory

4. **Verify variable names**
   - React variables must start with `REACT_APP_`
   - Example: `REACT_APP_API_URL` ✅
   - NOT: `API_URL` ❌

---

## 🔒 Security Notes

### ✅ Safe to Commit
- `REACT_APP_*` variables are visible in browser
- Safe to commit to GitHub

### ❌ Never Commit
- Database credentials
- Private API keys
- Firebase private keys
- Database URLs

### For Sensitive Data

1. Use Vercel's Environment Variables interface
2. Mark as **Secret** if available
3. Never add to `.env` file

---

## 📝 .env.example File

This file is provided as a template:

```env
REACT_APP_API_URL=https://auto-hybrid-services-shop.app/api
REACT_APP_WHATSAPP_NUMBER=919834446217
NODE_ENV=production
```

To use:
```bash
cp .env.example .env.local
# Then edit values as needed
```

---

## 🔗 Related Resources

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Create React App - Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Node.js dotenv Package](https://www.npmjs.com/package/dotenv)

---

## ✨ Quick Reference

```bash
# Local development
REACT_APP_API_URL=http://localhost:5000/api

# Vercel production
REACT_APP_API_URL=https://auto-hybrid-services-shop.app/api

# Always required
REACT_APP_WHATSAPP_NUMBER=919834446217
```

**Need help?** Contact: info@auto-hybrid-services-shop.app
