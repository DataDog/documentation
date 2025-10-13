#!/bin/bash
# Simple wrapper script for RSS Blog to Docs tool
# Place this in the docs repo root for easy access

set -e

# Get the directory where this script lives
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}ℹ ${NC}$1"
}

print_error() {
    echo -e "${RED}✗ ${NC}$1" >&2
}

print_warning() {
    echo -e "${YELLOW}⚠ ${NC}$1"
}

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is required but not found."
    print_error "Please install Python 3.8 or higher."
    exit 1
fi

# Parse command line arguments
DRY_RUN=""
if [ "$1" = "--dry-run" ] || [ "$1" = "-n" ]; then
    DRY_RUN="--dry-run"
    print_warning "Running in dry-run mode (no changes will be made)"
fi

# Check if dependencies are installed
print_info "Checking dependencies..."
if ! python3 -c "import feedparser, requests, bs4; from ruamel.yaml import YAML" 2>/dev/null; then
    print_warning "Dependencies not installed. Installing now..."
    pip3 install -r "${SCRIPT_DIR}/requirements.txt" || {
        print_error "Failed to install dependencies."
        print_error "Try running: pip3 install -r ${SCRIPT_DIR}/requirements.txt"
        exit 1
    }
    print_info "Dependencies installed successfully!"
else
    print_info "Dependencies OK"
fi

# Run the script
print_info "Running RSS Blog to Docs tool..."
python3 "${SCRIPT_DIR}/rss_blog_to_docs.py" $DRY_RUN

print_info "Done!"

