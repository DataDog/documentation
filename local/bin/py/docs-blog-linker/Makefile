.PHONY: help install check dry-run run clean

# Default target
help:
	@echo "RSS Blog to Docs - Makefile Commands"
	@echo "====================================="
	@echo ""
	@echo "Available commands:"
	@echo "  make install    - Install Python dependencies"
	@echo "  make check      - Check if dependencies are installed"
	@echo "  make dry-run    - Test what would change (no files modified)"
	@echo "  make run        - Run the script and update docs"
	@echo "  make clean      - Remove Python cache files"
	@echo ""
	@echo "Quick start:"
	@echo "  1. cd /path/to/documentation"
	@echo "  2. make install"
	@echo "  3. make run"

# Install dependencies
install:
	@echo "Installing dependencies..."
	pip install -r requirements.txt
	@echo "✓ Dependencies installed successfully!"

# Check if dependencies are installed
check:
	@echo "Checking dependencies..."
	@python3 -c "import feedparser, requests, bs4; from ruamel.yaml import YAML" 2>/dev/null && echo "✓ All dependencies are installed!" || (echo "✗ Missing dependencies. Run 'make install' first." && exit 1)

# Dry run - show what would change
dry-run:
	@echo "Running dry-run (no changes will be made)..."
	@python3 rss_blog_to_docs.py --dry-run

# Run the script
run:
	@echo "Running blog linker..."
	@python3 rss_blog_to_docs.py

# Clean Python cache files
clean:
	@echo "Cleaning up..."
	@find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name "*.pyc" -delete 2>/dev/null || true
	@echo "✓ Cleanup complete!"

