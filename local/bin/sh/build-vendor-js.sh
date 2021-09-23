#!/bin/bash

echo "Bundling vendor JS dependencies..."

ASSETS_VENDOR_DIR=assets/scripts/vendor/
mkdir -p $ASSETS_VENDOR_DIR
cp node_modules/jquery/dist/jquery.min.js $ASSETS_VENDOR_DIR
cp node_modules/popper.js/dist/umd/popper.min.js $ASSETS_VENDOR_DIR
cp node_modules/bootstrap/dist/js/bootstrap.min.js $ASSETS_VENDOR_DIR
cp node_modules/bootstrap/dist/js/bootstrap.min.js.map $ASSETS_VENDOR_DIR

