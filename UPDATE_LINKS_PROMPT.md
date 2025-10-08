# Update Documentation Links After Restructuring

## Context

We are the Datadog SDKs team restructuring our public [RUM Documentation](https://docs.datadoghq.com/real_user_monitoring) to provide a consistent structure across all platforms (Browser, iOS, Android, Flutter, etc.).

Our documentation site is built with **Hugo** and uses **Markdown (.md) files**.

## What Has Changed

Browser documentation pages have been moved from:

- **Old location:** `/real_user_monitoring/browser/`
- **New location:** `/real_user_monitoring/application_monitoring/browser/`

## Objective

Update all internal markdown links throughout the **English documentation only** that reference the old browser path to use the new path.

## Link Format Used

Our markdown files use reference-style links at the end of files:

```markdown
[1]: /real_user_monitoring/browser/data_collected/
[2]: /real_user_monitoring/browser/my_page/
```

## What to Update

Update the following in markdown files:

1. **Reference-style links** at the end of files (e.g., `[1]: /path/`)
2. **Inline links** in the body content
3. **`further_reading:` links** in the front matter

## What NOT to Touch

**DO NOT modify the `aliases:` section in the front matter** of markdown files. The front matter is at the top of each file between the `---` delimiters. Example:

```yaml
---
title: "Page Title"
aliases:
  - /real_user_monitoring/browser/old_page/  # DO NOT CHANGE
  - /some/other/old/path/                     # DO NOT CHANGE
further_reading:
  - link: "/real_user_monitoring/browser/data_collected/"  # UPDATE THIS
    tag: "Documentation"
---
```

The `aliases:` section must remain with old paths to preserve backward compatibility for existing external links. However, **DO update** the `further_reading:` links in the front matter.

## Required Changes

Replace all links matching this pattern (outside of the front matter aliases section):

- **Find:** `/real_user_monitoring/browser/[path]`
- **Replace with:** `/real_user_monitoring/application_monitoring/browser/[path]`

## Examples

- `/real_user_monitoring/browser/data_collected/` → `/real_user_monitoring/application_monitoring/browser/data_collected/`
- `/real_user_monitoring/browser/my_page/` → `/real_user_monitoring/application_monitoring/browser/my_page/`

## Important Constraints

1. **Language scope:** Only update files in `content/en/` - **DO NOT modify** other language directories (`content/es/`, `content/fr/`, `content/ja/`, `content/ko/`)
2. **Front matter aliases:** DO NOT modify the `aliases:` array in the YAML front matter (between the `---` delimiters at the top of files) - these must preserve old paths for redirects
3. **Precision:** Only update paths that match the exact pattern `/real_user_monitoring/browser/` - do not modify other paths

## Expected Outcome

All internal documentation links in the English documentation should point to the new browser documentation structure under `application_monitoring/`, ensuring no broken links. Other language versions remain unchanged.
