# Migrate images from service_management/ to a new path

Migrates a `static/images/service_management/<folder>/` image directory to a new location, updates all markdown references, and validates the result.

**Usage:** `/migrate-images <source-subfolder> <target-path>`

**Example:** `/migrate-images incidents incident_response`

This maps `static/images/service_management/incidents/` → `static/images/incident_response/`.

---

## Step 1: Audit

Run the full audit and present results before touching any files. Do not proceed until the user confirms.

### 1a. Image inventory

- List all files under `static/images/service_management/$SOURCE/` recursively
- Count total files
- For each image, check references using two passes:
  1. **Exact path match**: search `content/en/` for the full relative path (e.g. `service_management/$SOURCE/subfolder/image.png`) — if found, mark **EN**. Also record which `content/en/` files reference it — you'll need this for the content mismatch check below.
  2. If not found in `en/` by exact path, search all other `content/` subdirectories by exact path — if found, mark **TRANSLATED ONLY**
  3. If not found anywhere by exact path, run a **filename-only search** across all `content/` (all languages) for just the filename (e.g. `image.png`) — if found, mark **UNREFERENCED (wrong path in N file(s))** and list the files with the mismatched references. These images are referenced but with an incorrect path and must NOT be deleted.
  4. If not found by either method, mark **UNREFERENCED** — safe to delete

- **Content mismatch check**: For every EN-referenced image, compare the `content/en/` file that references it against the proposed target path (`static/images/$TARGET/`). Derive the expected content directory from `$TARGET` by replacing `static/images/` with `content/en/` (e.g. `static/images/incident_response/incident_management/` → `content/en/incident_response/incident_management/`). If the referencing file lives outside that expected content directory, mark the image **CONTENT MISMATCH** and note both the referencing file and the directory it suggests the image should belong to instead. These images should not be moved to `$TARGET` — flag them for the user to decide the correct destination before proceeding. Only use `content/en/` references for this check — translated files are excluded since they may be out of sync with the current English structure.

- **Subfolder alignment check**: For images that pass the content mismatch check, compare the image's subfolder path within `$TARGET` against the subfolder structure of `content/en/$TARGET_CONTENT_DIR/`. For each image subfolder that does not have a corresponding directory in the content tree, flag it as a **POTENTIAL SUBFOLDER MISMATCH** and list the image subfolder alongside the actual content subfolders. This is advisory — do not block migration on it — but surface it clearly so the user can decide whether to realign subfolder names as part of this migration. Only compare against `content/en/` — translated folder structures are excluded.

### 1b. Legacy content links

Search `content/en/` for non-image references to the old path — `ref` shortcodes, markdown links, `relref` — that still use `service_management/$SOURCE`. List every affected file and the specific line.

### 1c. Audit summary

Present a structured summary:
- Total images, breakdown by coverage (EN / translated-only / content mismatch / unreferenced (wrong path) / unreferenced)
- List of truly unreferenced image files (safe to delete)
- List of images with wrong-path references (must NOT be deleted — flag the files and mismatched paths for manual correction)
- List of content mismatch images — for each, show the referencing file and the directory it implies the image belongs in instead
- List of potential subfolder mismatches — image subfolders with no corresponding directory in the content tree, shown alongside actual content subfolders for comparison
- List of files with legacy content links (file path + line)
- Proposed move: `static/images/service_management/$SOURCE/` → `static/images/$TARGET/`

**Stop here. Ask the user:**
1. Whether to delete truly unreferenced images (if any exist) — do not include wrong-path or content mismatch images in this offer
2. For each content mismatch image, where it should actually go (the user decides the correct target)
3. Whether to proceed with the migration

Do not continue until the user explicitly confirms.

---

## Step 2: Delete unreferenced images (if requested)

Only perform this step if the user confirmed deletion in Step 1.

- Delete only truly unreferenced images (those with no references anywhere, by any path). Never delete images marked as "unreferenced (wrong path)" — those are referenced but with incorrect paths and must be preserved and migrated.
- Stage and commit only the deletions:

```
Remove unreferenced images from service_management/$SOURCE/

Deleted N image(s) with no references in any content files.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

---

## Step 3: Move folder and update English references

- Copy `static/images/service_management/$SOURCE/` to `static/images/$TARGET/`
- Delete the old folder at `static/images/service_management/$SOURCE/`
- In all `content/en/` markdown files, replace image src paths: `service_management/$SOURCE/` → `$TARGET/`
  - **Skip alias lines**: do not modify any lines that match the YAML frontmatter alias pattern (`^- /` or `^- ` at the start of a line within an `aliases:` block). These are URL redirects, not image paths, and must be preserved.
  - To avoid hitting alias lines, target only lines containing image/media indicators: `src=`, `![`, `.png`, `.jpg`, `.gif`, `.svg`, `.webp`, `.mp4`
- Stage all changes (moved images + updated en content files)
- Commit:

```
Move $SOURCE images from service_management/ to $TARGET/

Relocates static/images/service_management/$SOURCE/ to static/images/$TARGET/
and updates all markdown image references in English content.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

---

## Step 4: Update translated content references

- In all non-`en` `content/` subdirectories, replace image src paths: `service_management/$SOURCE/` → `$TARGET/`
  - Apply the same alias-line exclusion as Step 3
- Stage all changed translated files
- Commit:

```
Update $SOURCE image paths in translated content

Updates service_management/$SOURCE/ image references to $TARGET/ across
translated content files to match the English path migration.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

---

## Step 5: Final QA

Run all three checks and report results. Flag any failures explicitly.

### 5a. Alias integrity check

- Diff all committed files and confirm no alias lines were modified
- An alias line is any line matching `^- /` or `^- [a-z]` inside a frontmatter `aliases:` block
- Report: **PASS** (no aliases touched) or list every alias line that changed

### 5b. Image reference validation

- For every updated image reference in `content/` (all languages), confirm the referenced file now exists under `static/images/$TARGET/`
- Report: **PASS** or list every broken reference with file path and line number

### 5c. Content link validation

- For every legacy content link identified in Step 1b that was updated, confirm the target path exists in `content/en/`
- Report: **PASS** or list every reference pointing to a non-existent page

Present the full QA report before closing out.
