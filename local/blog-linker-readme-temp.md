# Blog Linker

The `blog_linker.py` script automatically adds Datadog blog post links to the `further_reading` section of relevant documentation pages.

## Overview

The script:

- Processes the Datadog blog RSS feed
- Finds documentation links within blog posts
- Updates the corresponding markdown files on your current branch
- Adds the Further Reading section and Hugo partial to pages that don't have it

By default, the script processes blog posts from the last 14 days. After it finishes running, you can manually push your branch and create a PR.

## Prerequisites

- Python 3.8+
- Access to the documentation repository
- Dependencies are installed automatically via the Python virtual environment

## Run the script

From the documentation repository root:

```bash
make update-blog-links
```

## Example workflow

1. Navigate to the documentation repo and create a branch:

```bash
cd /path/to/documentation
git checkout -b your-handle/blog-links-update
```

2. Run the script to update files:

```bash
make update-blog-links
```

3. Review the changes:

```bash
git diff
```

4. Commit and push the changes:

```bash
git add .
git commit -m "Add blog links to further_reading"
git push origin your-handle/blog-links-update
```

5. Navigate to the Documentation repo in GitHub to create and review the PR.

## Advanced usage: Running the script with flags

For more control over the script's behavior, you can run it directly with command-line flags instead of using the Makefile.

### Setup

1. Navigate to the documentation repository and activate the Python environment:

```bash
cd /path/to/documentation
. hugpython/bin/activate
```

2. Run the script from the `websites-images` repository:

```bash
python /path/to/websites-images/services/webops-site-build/bin/docs-ci/blog_linker.py [OPTIONS]
```

### Available flags

| Flag | Description | Default |
|------|-------------|---------|
| `--dry-run` | Preview changes without modifying any files | Off |
| `--since N` | Process blog posts from the last N days | 14 |
| `--latest N` | Process the N most recent posts (ignores `--since`) | None |
| `--limit N` | Maximum number of posts to process | 20 |
| `--repo PATH` | Path to the documentation repository | Current directory |
| `--rss URL` | Custom RSS feed URL | Datadog blog RSS |

### Examples

**Preview changes without modifying files:**

```bash
python /path/to/websites-images/services/webops-site-build/bin/docs-ci/blog_linker.py --dry-run
```

**Process only the 5 most recent blog posts:**

```bash
python /path/to/websites-images/services/webops-site-build/bin/docs-ci/blog_linker.py --latest 5
```

**Process blog posts from the last 30 days:**

```bash
python /path/to/websites-images/services/webops-site-build/bin/docs-ci/blog_linker.py --since 30
```

**Combine flags (dry-run with last 10 posts):**

```bash
python /path/to/websites-images/services/webops-site-build/bin/docs-ci/blog_linker.py --dry-run --latest 10
```

## How it works

### What gets processed

**Blogs:**
- By default, processes blog posts from the last 14 days
- Automatically excludes "This Month in Datadog" posts (configurable via `EXCLUDED_BLOG_PATTERNS`)

**Docs:**
- Finds all `docs.datadoghq.com` links within each blog post
- Automatically skips integration docs (`/integrations/*`) and API docs (`/api/*`)
- Skips any docs listed in `EXCLUDED_DOCS` or matching `EXCLUDED_URL_PATTERNS`

### What changes are made

For each valid doc page, the script:

- Adds a new entry to the `further_reading` frontmatter section with the blog link
- Adds the `## Further reading` heading and Hugo partial to the page body (if missing)
- Wraps YAML values in quotes to prevent build failures from special characters (like colons in titles)
- Preserves existing formatting and indentation

### Safe to re-run

The script is idempotent—if a blog link already exists in a doc's `further_reading` section, the script skips it. This means you can safely run the script multiple times without creating duplicate links.

### Git workflow

The script does **not** interact with Git. You are responsible for:

- Creating a branch before running the script
- Reviewing the changes the script makes
- Committing the changes
- Pushing the branch
- Creating a PR

This gives you full control over your Git workflow and follows standard security practices.

## Output format

The script provides a human-readable summary showing:

```
SUMMARY
==================================================

Blog links reviewed:
- https://www.datadoghq.com/blog/example-post-1 (2025-01-15)
- https://www.datadoghq.com/blog/example-post-2 (2025-01-10)

Documents updated:
- /example/page-1
- /example/page-2

Documents unable to update:
- /example/page-3 (would-update)

Skipped (integration/API docs):
- /integrations/example
- /api/latest/example


DETAILS
==================================================

1. https://www.datadoghq.com/blog/example-post-1 (2025-01-15)
   documents updated:
      /example/page-1
   documents unable to update:
      /example/page-2 (skipped:not-found)

2. https://www.datadoghq.com/blog/example-post-2 (2025-01-10)
   skipped (integration/API docs):
      /integrations/example

3. https://www.datadoghq.com/blog/example-post-3 (2025-01-08)
   all docs already have this blog linked (2 docs)

4. https://www.datadoghq.com/blog/example-post-4 (2025-01-05)
   no docs links found in blog
```

## Troubleshooting

### "No blog posts processed"

This usually means:

- No blog posts were published in the default lookback period (14 days)
- Try using `--since 30` to look back further

### "all docs already have this blog linked"

This means the blog post had links to docs, but those docs already have this blog in their `further_reading` section. No action needed.

### File not found errors

Ensure you're running from the correct directory (documentation repository root).

## Limitations

- The script only updates pages in the documentation repo (you may need to update other repo pages manually)
- Integration docs (`/integrations/*`) and API docs (`/api/*`) are automatically skipped

## Advanced: Updating the source code

The blog linker source code lives in the `websites-images` repository, not the documentation repository. The local copy in `local/bin/py/blog_linker.py` is pulled from the source during setup and is gitignored.

### Source file location

```
websites-images/services/webops-site-build/bin/docs-ci/blog_linker.py
```

### To make changes

1. Clone the `websites-images` repository (if you haven't already):

```bash
cd /path/to/your/repos
git clone https://github.com/DataDog/websites-images.git
```

2. Create a branch and make your changes:

```bash
cd websites-images
git checkout -b your-handle/blog-linker-updates
# Edit the file at: services/webops-site-build/bin/docs-ci/blog_linker.py
```

3. Test your changes locally by running the script directly:

```bash
cd /path/to/documentation
. hugpython/bin/activate
python /path/to/websites-images/services/webops-site-build/bin/docs-ci/blog_linker.py --dry-run
```

4. Once satisfied, commit and push your changes:

```bash
cd /path/to/websites-images
git add services/webops-site-build/bin/docs-ci/blog_linker.py
git commit -m "Update blog linker script"
git push -u origin your-handle/blog-linker-updates
```

5. Create a PR in the `websites-images` repository on GitHub.

### After your PR is merged

Other users will get your updates when they run `make setup-build-scripts` in the documentation repository, which pulls the latest scripts from `websites-images`.

### Configuration options in the script

The following constants at the top of the script can be modified:

- `EXCLUDED_DOCS`: Specific documents that should never be modified
- `EXCLUDED_URL_PATTERNS`: URL patterns for docs to automatically skip (e.g., integrations, API)
- `EXCLUDED_BLOG_PATTERNS`: Blog URL patterns to exclude from processing (e.g., "This Month in Datadog")
