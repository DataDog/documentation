# RSS Blog to Docs

Automatically adds Datadog blog post links to the `further_reading` section of relevant documentation pages.

## Quick Start

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment:**
   ```bash
   export GIT_USER="your_github_username"  
   ```

3. **Run the script:**
   ```bash
   python rss_blog_to_docs.py --repo /path/to/documentation --since 7
   ```

## Documentation

For detailed usage instructions, command-line options, and troubleshooting, see [RSS_BLOG_TO_DOCS_USAGE.md](RSS_BLOG_TO_DOCS_USAGE.md).

## What It Does

- Fetches blog posts from the Datadog RSS feed
- Extracts documentation URLs from blog post content
- Updates the `further_reading` section of relevant markdown files, preserving existing YAML frontmatter formatting
- Creates Git branch and pull request for changes

## Requirements

- Python 3.8+
- GitHub token with repository permissions
- Access to the documentation repository

## License

This project is for internal use at Datadog.
