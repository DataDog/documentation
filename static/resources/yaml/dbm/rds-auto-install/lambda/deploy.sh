#!/bin/bash

# Prep and upload Lambda zip file
# Avoid including the parent directories in the zip file
echo "Installing npm dependencies"
npm ci
hashFile="$(tar c index.js package.json package-lock.json | md5 -q).zip"
echo "Zipping lambda function"
mkdir -p zips
zip -r "zips/$hashFile" ./* >/dev/null
aws s3 cp "zips/$hashFile" "s3://rds-auto-install-demo/$hashFile"
