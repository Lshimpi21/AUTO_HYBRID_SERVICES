# ProGarage - Car Service Platform

A modern, full-featured React application for managing car garage services including maintenance, painting, denting, and more.

## Features

- **Service Catalog**: Browse all available car services with images, prices, and descriptions
- **Service Management**: Admin panel to add, edit, and delete services
- **Shopping Cart**: Add multiple services to cart before checkout
- **Order Management**: Track and manage service orders
- **Real-time Updates**: Live order status tracking
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Easy Deployment**: Deploy to Google App Engine with one command

## Project Structure

```
project_one/
├── server/
│   ├── index.js                 # Express server
│   ├── config/
│   │   └── firebase.js          # Firebase configuration
│   └── routes/
│       ├── services.js          # Services API endpoints
│       └── orders.js            # Orders API endpoints
├── client/
│   ├── src/
│   │   ├── App.js               # Main App component
│   │   ├── index.js             # React entry point
│   │   ├── index.css            # Global styles
│   │   ├── App.css              # App styles
│   │   └── pages/
│   │       ├── ServiceCatalog.js    # Service listing page
│   │       ├── ServiceCatalog.css   # Service styles
│   │       ├── ServiceManagement.js # Admin management panel
│   │       ├── Cart.js              # Shopping cart page
│   │       └── OrderHistory.js      # Order tracking page
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── package.json
│   ├── tailwind.config.js       # Tailwind CSS config
│   └── postcss.config.js        # PostCSS config
├── package.json                 # Root package.json
├── app.yaml                     # Google App Engine config
├── .gcloudignore               # Files to ignore on deployment
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## Prerequisites

- Node.js 16+ and npm
- Google Cloud Account (for App Engine deployment)
- Firebase Project (for database)

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo>
cd project_one

# Install all dependencies
npm run install:all
```

### 2. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Go to Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Copy the JSON content
6. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

7. Edit `.env` and paste your Firebase credentials:

```
PORT=5000
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
GOOGLE_CLOUD_PROJECT=your-project-id
```

### 3. Enable Firestore in Firebase

1. In Firebase Console, go to Firestore Database
2. Click "Create database"
3. Select "Start in production mode"
4. Choose your region
5. Click "Create"

## Development

Run both the React app and Express server concurrently:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Building for Production

Build the React app for deployment:

```bash
npm run build
```

This creates an optimized build in `client/build/`

## Deployment to Google App Engine

### 1. Prepare Google Cloud Project

```bash
# Install Google Cloud CLI if you haven't already
# https://cloud.google.com/sdk/docs/install

# Initialize gcloud and authenticate
gcloud init
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID
```

### 2. Enable Required APIs

```bash
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 3. Build React App

```bash
npm run build
```

### 4. Deploy to App Engine

```bash
# Deploy the application
gcloud app deploy

# View logs
gcloud app logs read -n 50

# Open the app
gcloud app browse
```

### 5. Set Environment Variables in App Engine

```bash
gcloud app update --update-env-variables \
  FIREBASE_SERVICE_ACCOUNT="$(cat .env | grep FIREBASE_SERVICE_ACCOUNT | cut -d '=' -f 2-)" \
  FIREBASE_DATABASE_URL="YOUR_DATABASE_URL" \
  GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
```

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Add new service (requires authentication)
- `PUT /api/services/:id` - Update service (requires authentication)
- `DELETE /api/services/:id` - Delete service (requires authentication)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (requires authentication)

## Service Categories

The platform supports the following service categories:
- Maintenance
- Painting
- Denting
- Welding
- Repair
- Detailing

You can customize these categories in the admin panel.

## Admin Panel

Toggle admin mode by clicking the "Admin" button in the top-right navigation. You'll have access to:
- Add new services with images
- Edit existing services
- Delete services
- Set pricing and duration
- Manage service descriptions

## Styling

The project uses Tailwind CSS for styling. Customize the theme in:
- `client/tailwind.config.js` - Theme configuration
- `client/src/index.css` - Global styles
- `client/src/pages/*.css` - Page-specific styles

## Troubleshooting

### Services not loading
- Check if Firebase is properly configured
- Verify Firestore database is created
- Check browser console for errors

### Deployment issues
- Ensure `client/build` folder exists
- Check that all environment variables are set
- Review App Engine logs: `gcloud app logs read`

### Firebase connection errors
- Verify `.env` file has correct credentials
- Check Firebase project ID matches
- Ensure Firestore Database is enabled

## Future Enhancements

- [ ] User authentication system
- [ ] Payment integration
- [ ] Email notifications
- [ ] Service availability calendar
- [ ] Staff management
- [ ] Customer reviews and ratings
- [ ] Mobile app
- [ ] SMS notifications

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please create an issue in the repository.
