# RSS Blog to Docs

Automatically adds Datadog blog post links to the `further_reading` section of relevant documentation pages.

## Overview

The `rss_blog_to_docs.py` script:
1. Processes the [Datadog blog RSS feed](https://www.datadoghq.com/blog/index.xml)
2. Finds documentation links in blog posts
3. Updates the corresponding markdown files
4. Commits the changes to a new local branch
5. You manually push the branch and create a PR

## Quick Start

### Recommended: Using the Docs Makefile

From the documentation repository root:

```bash
make update-blog-links
```

**Dry run mode:** `make update-blog-links-dry-run`

This uses the existing docs build infrastructure (`hugpython` virtual environment) - **no separate setup needed!**

### Alternative: Using Python Directly

For advanced users or custom workflows:

1. **Install dependencies** (one time):
   ```bash
   pip install -r local/bin/py/docs-blog-linker/requirements.txt
   ```

2. **Run the script:**
   ```bash
   cd /path/to/documentation
   python local/bin/py/docs-blog-linker/rss_blog_to_docs.py
   ```

**What happens automatically:**
- Auto-detects the documentation repository
- Processes blog posts from the last 14 days
- Uses your git config for branch naming (no environment variables needed!)
- Checks dependencies and provides helpful error messages if anything is missing

## Prerequisites

- Python 3.8+
- Access to the documentation repository
- Dependencies will be checked automatically with helpful error messages

**No environment variables required!** The script automatically:
- Detects your git username from `git config user.name` or `git config user.email`
- Finds the documentation repository if you run it from within the repo

## Command Line Options

### Optional arguments

- `--repo PATH`: Path to the documentation repository. If not specified, the script will auto-detect the repo by looking for `content/en/` directory.

### Processing control
- `--since DAYS`: Process only blog posts published within the last N days.
  - Example: `--since 7` processes posts from the last week
  - Default: `14` (processes posts from the last 2 weeks).

- `--latest N`: Process only the N most recent blog posts (ignores `--since`).
  - Example: `--latest 5` processes the 5 newest posts regardless of age.
  - Useful for backfilling or catching up on older posts.

- `--rss URL`: Custom RSS feed URL.
  - Default: `https://www.datadoghq.com/blog/index.xml`

### Execution modes
- `--dry-run`: Skips file changes and Git operations, but shows what _would_ change.
  Output will show:
    - `status: "would-update"` for each mapped doc file
    - `branch: "(no branch created)"`

## Example Workflow

### Standard Workflow (using Makefile)

1. Navigate to documentation repo
   ```bash
   cd /path/to/documentation
   ```

2. Test the changes first (dry-run mode)
   ```bash
   make update-blog-links-dry-run
   ```

3. Run the script to create branch and commit changes
   ```bash
   make update-blog-links
   ```

4. Review the changes locally
   ```bash
   git diff master
   ```

5. Push the branch and create a PR
   ```bash
   git push -u origin <branch-name>
   ```
   (The branch name will be shown in the script output)

6. Navigate to the [Documentation repo in GitHub](https://github.com/DataDog/documentation) to create and review the PR.

### Advanced: Using Python Directly

If you need more control (e.g., custom date ranges):

```bash
cd /path/to/documentation

# Dry run
python local/bin/py/docs-blog-linker/rss_blog_to_docs.py --dry-run

# Process last 7 days
python local/bin/py/docs-blog-linker/rss_blog_to_docs.py --since 7

# Process most recent 5 posts regardless of age
python local/bin/py/docs-blog-linker/rss_blog_to_docs.py --latest 5
```

## How It Works

### Processing behavior
- By default, the script processes blog posts from the last 14 days
- If a blog post link already exists in a doc's `further_reading` section, the script skips it (no-op)
- This design allows the script to be run multiple times safely without duplicating links

### Git workflow
1. Creates a branch for the changes (based on `master`)
2. Pulls the latest changes from the main branch
3. Updates documentation files with `further_reading` entries
4. Commits changes with a descriptive message
5. **Stops here** - you manually push and create the PR

### File updates
- Adds blog post links to the `further_reading` section of relevant documentation pages
- Preserves existing formatting and indentation
- Skips files listed in the `EXCLUDED_DOCS` constant (in the script)
- Skips integration documentation pages (`/integrations/*`)

## Output Format

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
