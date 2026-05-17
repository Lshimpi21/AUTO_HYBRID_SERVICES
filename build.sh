#!/bin/bash
set -e

echo "Installing root dependencies..."
npm install

echo "Installing client dependencies..."
cd client
npm ci

echo "Building React app..."
npm run build

echo "Build complete!"
