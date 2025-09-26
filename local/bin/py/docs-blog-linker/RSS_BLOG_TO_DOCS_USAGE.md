# RSS Blog to Docs Script Usage Guide

## Overview
The `rss_blog_to_docs.py` script adds blog post links to the `further_reading` section of documentation pages that are referenced in Datadog blog posts. It does the following:
1. Processes the [Datadog blog RSS feed](https://www.datadoghq.com/blog/index.xml)
2. Finds documentation links in blog posts
3. Updates the corresponding markdown files
4. Commits the changes on a new branch, and pushes that branch to remote

## Prerequisites

1. [`ddtool`](https://datadoghq.atlassian.net/wiki/spaces/docs4docs/pages/3960766866/Build+setup+guide#Set-up-ddtool-for-token-handling) is installed.

2. Required Python libraries are installed:
   ```bash
   pip install -r requirements.txt
   ```
3. The following environment variable is set for branch naming:
   ```bash
   export GIT_USER="your_github_username"  
   ```
   Branches are named `<GIT_USER>/blog-links-update-{timestamp}`.

## Run the script

```bash
python /path/to/rss_blog_to_docs.py --repo /path/to/documentation [options]
```

## Command line options

### Required arguments
- `--repo PATH`: Path to the documentation repository. Use `.` if running from repo root.

### Optional arguments

#### Processing control
- `--since DAYS`: Process only blog posts published within the last N days.
  - Example: `--since 7` processes posts from the last week
  - Default: No time limit (processes all unprocessed posts).

- `--latest N`: Process only the N most recent blog posts (ignores state file).
  - Example: `--latest 5` processes the 5 newest posts.
  - Default: No limit (processes all unprocessed posts).

- `--rss URL`: Custom RSS feed URL.
  - Default: `https://www.datadoghq.com/blog/index.xml`

#### Execution modes
- `--dry-run`: Skips file changes and Git operations, but shows what _would_ change.
  Output will show:
    - `status: "would-update"` for each mapped doc file
    - `branch: "(no branch created)"`

- `--local-only`: Edits files and commits them to a new branch locally, but does not push to GitHub.

## Example workflow

1. Set up environment

   ```bash
   export GIT_USER="your_github_username"
   ```

2. Navigate to documentation repo
   ```bash
   cd /path/to/documentation
   ```

3. Test the changes first
   ```bash
   python /path/to/rss_blog_to_docs.py --repo . --since 7 --dry-run
   ```

4. Run locally to see actual changes
   ```bash
   python /path/to/rss_blog_to_docs.py --repo . --since 7 --local-only
   ```

5. Run the full script to push changes to remote
   ```bash
   python /path/to/rss_blog_to_docs.py --repo . --since 7
   ```

6. Navigate to the [Documentation repo in GitHub](https://github.com/DataDog/documentation) to review the changes and open a PR. Compare the file changes against the script's summary output to help validate.

## How it works

### State management
- The script maintains a `.rss_state.json` file to track which blog posts have been processed
- This prevents duplicate processing of the same blog posts
- The state file is automatically created and updated

### Git workflow
1. Creates a branch for the changes
2. Pulls the latest changes from the main branch
3. Updates documentation files with `further_reading` entries
4. Commits changes with a descriptive message
5. Pushes the branch to remote

### File updates
- Adds blog post links to the `further_reading` section of relevant documentation pages
- Preserves existing formatting and indentation
- Skips files listed in `excluded_docs.json`
- Skips integration documentation pages (`/integrations/*`) 

## Output format

The script provides a human-readable summary showing:

```
SUMMARY
Blog links reviewed:
- https://www.datadoghq.com/blog/example-post-1/
- https://www.datadoghq.com/blog/example-post-2/

Documents updated:
- https://docs.datadoghq.com/example-page-1/ (content/en/example-page-1.md)
- https://docs.datadoghq.com/example-page-2/ (content/en/example-page-2.md)

Documents unable to update:
- https://docs.datadoghq.com/example-page-3/ (not found)

DETAILS

1. https://www.datadoghq.com/blog/example-post-1/
   documents updated:
      https://docs.datadoghq.com/example-page-1/ (content/en/example-page-1.md)
   documents unable to update:
      https://docs.datadoghq.com/example-page-2/ (not found)
```

## Troubleshooting

### "No blog posts processed"
This usually means:
- All recent blog posts have already been processed (check `.rss_state.json`)
- Use `--latest N` to force processing of recent posts
- Use `--since DAYS` with a larger number to include older posts

### Permission errors
- Ensure you've run `ddtool auth github login` and are authenticated

### File not found errors
- Verify the `--repo` path points to the correct documentation repository
- Ensure you're running from the correct directory


