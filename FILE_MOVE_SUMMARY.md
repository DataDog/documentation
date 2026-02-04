# File Move Summary - Declare and Describe

**Date**: Feb 3, 2026
**Status**: ✅ Complete

---

## Changes Made

### Files Moved (using git mv)

1. **declare.md**
   - **From**: `/content/en/incident_response/incident_management/declare.md`
   - **To**: `/content/en/incident_response/incident_management/investigate/declare.md`
   - **Alias added**: `/incident_response/incident_management/declare`

2. **describe.md**
   - **From**: `/content/en/incident_response/incident_management/describe.md`
   - **To**: `/content/en/incident_response/incident_management/investigate/describe.md`
   - **Alias added**: `/incident_response/incident_management/describe`

### Menu Configuration Updated

**File**: `/config/_default/menus/main.en.yaml`

Updated URLs for both menu items:
- "Declare an Incident" now points to: `incident_response/incident_management/investigate/declare`
- "Describe an Incident" now points to: `incident_response/incident_management/investigate/describe`

---

## New investigate/ Folder Structure

```
investigate/
├── _index.md           [EXISTING]
├── declare.md          [MOVED]
├── describe.md         [MOVED]
└── timeline.md         [EXISTING]
```

---

## Aliases Ensure No Broken Links

Both files now have aliases that preserve the old URLs:

### declare.md aliases:
```yaml
aliases:
- /service_management/incident_management/declare/
- /incident_response/incident_management/declare
```

### describe.md aliases:
```yaml
aliases:
- /service_management/incident_management/describe/
- /incident_response/incident_management/describe
```

This means:
- ✅ Old bookmarks will still work
- ✅ External links will redirect properly
- ✅ Search engines will find the new location
- ✅ Internal documentation links will continue to work

---

## What to Test

### 1. Local Build
```bash
cd /Users/esther.kim/repos/documentation
hugo server
```

Then verify:
- [ ] Navigate to Incident Management in the menu
- [ ] Click "Declare an Incident" - should load the page
- [ ] Click "Describe an Incident" - should load the page
- [ ] Try old URL: `http://localhost:1313/incident_response/incident_management/declare`
- [ ] Should redirect to: `http://localhost:1313/incident_response/incident_management/investigate/declare`

### 2. Check Git Status
```bash
git status
```

Should show:
- Modified: `config/_default/menus/main.en.yaml`
- Renamed: `declare.md` → `investigate/declare.md`
- Renamed: `describe.md` → `investigate/describe.md`

### 3. Review Changes Before Committing
```bash
git diff config/_default/menus/main.en.yaml
git diff --staged
```

---

## Next Steps (Optional)

If you want to continue reorganizing, consider moving these files next:

### Easy wins (few dependencies):
- [ ] `response_team.md` → `investigate/response_team.md`
- [ ] `notification.md` → `investigate/notification.md`
- [ ] `incident_ai.md` → `investigate/incident_ai.md`

### Pattern for each move:
1. `git mv <file>.md investigate/<file>.md`
2. Add alias: `/incident_response/incident_management/<file>`
3. Update menu configuration
4. Test

---

## Commands to Commit These Changes

```bash
cd /Users/esther.kim/repos/documentation

# Review what will be committed
git status
git diff config/_default/menus/main.en.yaml

# Stage and commit
git add .
git commit -m "Move declare and describe docs into investigate folder

- Move declare.md to investigate/declare.md
- Move describe.md to investigate/describe.md
- Add aliases to preserve old URLs
- Update menu configuration with new paths

DOCS-13056"
```

---

## Rollback (if needed)

If you need to undo these changes:

```bash
cd /Users/esther.kim/repos/documentation

# Undo all changes
git reset --hard HEAD

# Or revert the commit after committing
git revert HEAD
```

---

## Files That Still Reference Old Paths

After committing, you may want to update these references (optional):

```bash
# Search for references to the old paths
grep -r "incident_management/declare" content/
grep -r "incident_management/describe" content/
```

Note: Because of the aliases, these links will still work, but updating them would be cleaner.

---

**Summary**: ✅ Files successfully moved, aliases added, menu updated. Ready to test and commit!
