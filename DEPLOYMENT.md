# Deployment Guide for Google App Engine

## Quick Start Deployment

### 1. Setup Firebase
- Go to https://console.firebase.google.com
- Create new project
- Go to Settings → Service Accounts → Generate Private Key
- Copy JSON and create `.env` file

### 2. Build React App
```bash
npm run build
```

### 3. Deploy
```bash
gcloud init
gcloud config set project YOUR_PROJECT_ID
gcloud app create --region=us-central
gcloud app deploy
```

### 4. View Logs
```bash
gcloud app logs read -n 50 -f
```

## Environment Variables in App Engine

Set variables via Cloud Console or:
```bash
gcloud app update --update-env-variables FIREBASE_SERVICE_ACCOUNT="..."
```

## Cost Optimization
- 28 compute hours/month free
- Firestore free tier: 50k reads/day
- Set min_instances: 0 to scale to zero
