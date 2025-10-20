# RSS Blog to Docs

Automatically adds Datadog blog post links to the `further_reading` section of relevant documentation pages.

## Overview

The `rss_blog_to_docs.py` script:
1. Processes the [Datadog blog RSS feed](https://www.datadoghq.com/blog/index.xml)
2. Finds documentation links in blog posts
3. Updates the corresponding markdown files on your current branch

By default, the script processes blog posts from the last 14 days. After it finishes running, you can manually push your branch and create a PR.

## Prerequisites

- Python 3.8+
- Access to the documentation repository

Dependencies are checked automatically.

## Run the script

From the documentation repository root:

```bash
make update-blog-links
```

To use dry run mode:
```bash
make update-blog-links-dry-run
```

### Alternative: use Python directly

For custom workflows:

1. Install dependencies (one time):
   ```bash
   pip install -r local/bin/py/docs-blog-linker/requirements.txt
   ```

2. Run the script:
   ```bash
   cd /path/to/documentation
   python local/bin/py/docs-blog-linker/rss_blog_to_docs.py
   ```

## Command line options

### Optional arguments

- `--repo PATH`: Path to the documentation repository (default: current directory).

### Processing control
- `--since DAYS`: Process only blog posts published within the last N days.
  - Example: `--since 7` (processes posts from the last week).
  - Default: `14` (processes posts from the last 2 weeks).

- `--latest N`: Process only the N most recent blog posts (ignores `--since`).
  - Example: `--latest 5` (processes the 5 newest posts regardless of age).

- `--rss URL`: Custom RSS feed URL.
  - Default: `https://www.datadoghq.com/blog/index.xml`

### Execution modes
- `--dry-run`: Skips file changes, but shows what _would_ change.
  Output shows:
    - `status: "would-update"` for each mapped doc file

## Example workflow

### Standard workflow (using Makefile)

1. Navigate to documentation repo and create a branch
   ```bash
   cd /path/to/documentation
   git checkout -b your-handle/blog-links-update
   ```

2. Test the changes first (dry-run mode)
   ```bash
   make update-blog-links-dry-run
   ```

3. Run the script to update files
   ```bash
   make update-blog-links
   ```

4. Review the changes
   ```bash
   git diff
   ```

5. Commit and push the changes
   ```bash
   git add .
   git commit -m "Add blog links to further_reading"
   git push origin your-handle/blog-links-update
   ```

6. Navigate to the [Documentation repo in GitHub](https://github.com/DataDog/documentation) to create and review the PR.

### Advanced: use Python directly

If you need more control (for example, custom date ranges):

```bash
cd /path/to/documentation
git checkout -b your-handle/blog-links-update

# Dry run
python local/bin/py/docs-blog-linker/rss_blog_to_docs.py --dry-run

# Process last 7 days
python local/bin/py/docs-blog-linker/rss_blog_to_docs.py --since 7

# Process most recent 5 posts regardless of age
python local/bin/py/docs-blog-linker/rss_blog_to_docs.py --latest 5

# Commit and push
git add .
git commit -m "Add blog links to further_reading"
git push origin your-handle/blog-links-update
```

## How it works

### Processing behavior
- By default, the script processes blog posts from the last 14 days.
- If a blog post link already exists in a doc's `further_reading` section, the script skips it (no-op).
  - This design allows the script to be run multiple times safely without duplicating links.

### Git workflow
The script does **not** interact with Git. You are responsible for:
1. Creating a branch before running the script
2. Reviewing the changes the script makes
3. Committing the changes
4. Pushing the branch
5. Creating a PR

This gives you full control over your Git workflow and follows standard security practices.

### File updates
- Adds blog post links to the `further_reading` section of relevant documentation pages.
- Preserves existing formatting and indentation.
- Skips files listed in the `EXCLUDED_DOCS` constant (in the script).
- Skips dirs that match patterns in the `EXCLUDED_URL_PATTERNS` constant (in the script).
- Updates files on whatever branch you're on.

## Output format

The script provides a human-readable summary showing:

```
SUMMARY
Blog links reviewed:
- https://www.datadoghq.com/blog/example-post-1/ (2025-01-15)
- https://www.datadoghq.com/blog/example-post-2/ (2025-01-10)

Documents updated:
- https://docs.datadoghq.com/example-page-1/ (content/en/example-page-1.md)
- https://docs.datadoghq.com/example-page-2/ (content/en/example-page-2.md)

Documents unable to update:
- https://docs.datadoghq.com/example-page-3/ (not found)

DETAILS

1. https://www.datadoghq.com/blog/example-post-1/ (2025-01-15)
   documents updated:
      https://docs.datadoghq.com/example-page-1/ (content/en/example-page-1.md)
   documents unable to update:
      https://docs.datadoghq.com/example-page-2/ (not found)
```

## Troubleshooting

### "No blog posts processed"
This usually means:
- No blog posts were published in the default lookback period (14 days)
- All blog post links already exist in the relevant docs (no-ops)
- Use `--latest N` to process the N most recent posts regardless of age
- Use `--since DAYS` with a larger number to include older posts

### File not found errors
- Verify the `--repo` path points to the correct documentation repository
- Ensure you're running from the correct directory

## License

This project is for internal use at Datadog.
