# Manual test plan: resolve_pr_conflicts.py

Uses `astro-reorg-master` as a fake post-reorg base branch throughout, so no
real master is touched and all test PRs can be cleaned up afterward.

Script invocation shorthand used below:
```bash
python3 astro_reorg/resolve_pr_conflicts.py --base-branch astro-reorg-master
```

---

## Part 0: One-time setup

These steps create the fake base branch and the labels the script manages.
Do them once before running any test case.

### 0.1 Create `astro-reorg-master`

This simulates post-reorg master: it contains files at their new `hugo/`
paths. The script treats this branch as the merge target for all PRs under
test.

The key point is that the file must be **moved**, not just copied: the old
path (`content/en/getting_started/_index.md`) must no longer exist on this
branch, and the new path (`hugo/content/en/getting_started/_index.md`) must.
A PR that edits the old path then conflicts (modify/delete) exactly the way a
real pre-reorg PR does. A simple copy would leave the old path in place and
the merge would succeed cleanly — no conflict to test.

```bash
# Start from current master
git fetch origin
git checkout -b astro-reorg-master origin/master

# Simulate the reorg: MOVE the test file into hugo/ (git mv = delete old +
# add new), so PRs touching the old path produce a real reorg conflict.
mkdir -p hugo/content/en/getting_started
git mv content/en/getting_started/_index.md hugo/content/en/getting_started/_index.md
git commit -m "test: simulate reorg — move getting_started/_index.md into hugo/"

git push origin astro-reorg-master
```

- [ ] Branch `astro-reorg-master` exists on origin
- [ ] `hugo/content/en/getting_started/_index.md` is present on that branch
- [ ] `content/en/getting_started/_index.md` no longer exists on that branch

### 0.2 Verify labels are created on first run

```bash
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --dry-run \
  --pr 1  # any real PR number; it won't be modified in dry-run
```

- [ ] Script prints `[dry-run] would create label: 'astro-reorg-manual-review'`
- [ ] Script prints `[dry-run] would create label: 'astro-reorg-stale'`

Run once without `--dry-run` (still with `--pr 1`) to actually create them:
```bash
python3 astro_reorg/resolve_pr_conflicts.py --base-branch astro-reorg-master --pr 1
```

- [ ] Both labels now exist in the repo (check via GitHub Labels page or
  `gh label list --repo DataDog/documentation`)
- [ ] Labels are not re-created on a second run (script is idempotent)

---

## Part 1: MERGEABLE PR — skipped

**Behavior being verified:** PRs that have no conflicts are detected and
skipped immediately without creating any branches, labels, or comments.

### 1.1 Create a PR with no conflicts

```bash
git checkout -b test/no-conflict origin/master
# Edit a file that does NOT exist at a reorg-moved path, e.g. README.md
echo "<!-- test no-conflict -->" >> README.md
git add README.md
git commit -m "test: no-conflict PR"
git push origin test/no-conflict
gh pr create --repo DataDog/documentation \
  --head test/no-conflict \
  --base astro-reorg-master \
  --title "TEST no-conflict PR" \
  --body "Test PR for resolve_pr_conflicts.py — delete after testing."
```

Note the PR number (referred to as `<PR-MERGEABLE>` below).

### 1.2 Run the script against it

```bash
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --pr <PR-MERGEABLE>
```

- [ ] Output says `mergeable: MERGEABLE` and `No conflicts — skipping.`
- [ ] No `reorg-fix/` branch was pushed
- [ ] No labels added to the PR
- [ ] No comment posted on the PR

### 1.3 Cleanup

```bash
gh pr close <PR-MERGEABLE> --repo DataDog/documentation
git push origin --delete test/no-conflict
```

---

## Part 2: Reorg-only conflicts — auto-fix, single commit

**Behavior being verified:** A PR that edits a file at a pre-reorg path
(e.g. `content/en/`) conflicts only because the reorg moved that file to
`hugo/content/en/`. The script classifies all conflicts as reorg-caused,
runs `format-patch` + `git am`, opens a fix PR, labels the original PR
`astro-reorg-stale`, and posts a comment pointing to the fix PR.

### 2.1 Create the PR

```bash
# Branch off a commit BEFORE the reorg file was added to astro-reorg-master
git checkout -b test/reorg-only-conflict origin/master
# Edit the same file that the "reorg" touched, but at its old path
echo "<!-- test reorg-only edit -->" >> content/en/getting_started/_index.md
git add content/en/getting_started/_index.md
git commit -m "test: edit getting_started at old path"
git push origin test/reorg-only-conflict
gh pr create --repo DataDog/documentation \
  --head test/reorg-only-conflict \
  --base astro-reorg-master \
  --title "TEST reorg-only conflict PR" \
  --body "Test PR — single commit, reorg-only conflict."
```

Note the PR number as `<PR-REORG-ONLY>`.

### 2.2 Dry-run first

```bash
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --dry-run \
  --pr <PR-REORG-ONLY>
```

- [ ] Output classifies the conflict as reorg-caused (not in "Unrelated conflicts")
- [ ] Output prints `[dry-run] would apply 1 commit(s) to reorg-fix/pr-<PR-REORG-ONLY>`
- [ ] Output prints the commit subject line
- [ ] Output prints `[dry-run] would open PR: '[reorg fix] TEST reorg-only conflict PR'`
- [ ] No branch was pushed, no PR opened, no labels added (dry-run)

### 2.3 Run for real

```bash
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --pr <PR-REORG-ONLY>
```

- [ ] Script prints `Pushed fix to branch 'reorg-fix/pr-<PR-REORG-ONLY>'`
- [ ] Script prints `Opened fix PR: https://github.com/DataDog/documentation/pull/<FIX-PR>`
- [ ] Branch `reorg-fix/pr-<PR-REORG-ONLY>` exists on origin

On the fix PR:
- [ ] Title is `[reorg fix] TEST reorg-only conflict PR`
- [ ] Body references the original PR number and contains the original PR description
- [ ] Base branch is `astro-reorg-master`
- [ ] Commits on the fix PR have the **original author name/email** (not `reorg-fix-script`)
- [ ] Commit messages match the original PR's commits exactly
- [ ] The file path in the fix PR is `hugo/content/en/getting_started/_index.md`
  (not `content/en/...`)
- [ ] Fix PR is mergeable (no conflicts)

On the original PR `<PR-REORG-ONLY>`:
- [ ] Label `astro-reorg-stale` has been added
- [ ] A comment was posted referencing the fix PR number
- [ ] No `astro-reorg-manual-review` label was added

### 2.4 Verify re-run is idempotent

Run the script against the same PR a second time. Because the original PR was
labeled `astro-reorg-stale` on the first run, it is now skipped before any
merge test, fix branch, or comment.

```bash
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --pr <PR-REORG-ONLY>
```

- [ ] Output says `Already has a fix PR (astro-reorg-stale) — skipping.`
- [ ] Script exits without error (no `gh pr create` failure)
- [ ] No second fix PR is opened
- [ ] No duplicate comment is posted on the original PR
- [ ] The fix branch is NOT re-pushed (no force-push)

### 2.5 Cleanup

```bash
gh pr close <PR-REORG-ONLY> --repo DataDog/documentation
gh pr close <FIX-PR> --repo DataDog/documentation
git push origin --delete test/reorg-only-conflict
git push origin --delete reorg-fix/pr-<PR-REORG-ONLY>
```

---

## Part 3: Reorg-only conflicts — auto-fix, multiple commits

**Behavior being verified:** A PR with multiple commits all touching
reorg-moved paths produces a fix PR with the same number of commits, each
with the original message and authorship. This verifies `format-patch`/`am`
replay rather than squashing.

### 3.1 Create the PR

```bash
git checkout -b test/reorg-multi-commit origin/master
echo "<!-- commit 1 -->" >> content/en/getting_started/_index.md
git add content/en/getting_started/_index.md
git commit -m "test: first edit at old path"

echo "<!-- commit 2 -->" >> content/en/getting_started/_index.md
git add content/en/getting_started/_index.md
git commit -m "test: second edit at old path"

git push origin test/reorg-multi-commit
gh pr create --repo DataDog/documentation \
  --head test/reorg-multi-commit \
  --base astro-reorg-master \
  --title "TEST multi-commit reorg PR" \
  --body "Two commits, both at pre-reorg paths."
```

Note the PR number as `<PR-MULTI>`.

### 3.2 Run for real

```bash
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --pr <PR-MULTI>
```

- [ ] Output says `would apply 2 commit(s)` (or applies 2 commits when not dry-run)
- [ ] Fix PR has exactly 2 commits
- [ ] Commit 1 message: `test: first edit at old path`
- [ ] Commit 2 message: `test: second edit at old path`
- [ ] Both commits have the original author, not `reorg-fix-script`
- [ ] Original PR labeled `astro-reorg-stale`

### 3.3 Cleanup

```bash
gh pr close <PR-MULTI> --repo DataDog/documentation
gh pr close <FIX-PR-MULTI> --repo DataDog/documentation
git push origin --delete test/reorg-multi-commit
git push origin --delete reorg-fix/pr-<PR-MULTI>
```

---

## Part 4: Mixed conflicts — reorg + unrelated

**Behavior being verified:** When a PR has at least one conflict that is NOT
at a reorg-moved path, the script must not touch the PR content. It labels
the PR `astro-reorg-manual-review` only, opens no fix PR, and adds no
`astro-reorg-stale` label.

### 4.1 Create the PR

```bash
git checkout -b test/mixed-conflict origin/master
# Reorg-path edit (will conflict with astro-reorg-master)
echo "<!-- reorg conflict -->" >> content/en/getting_started/_index.md
git add content/en/getting_started/_index.md
# Non-reorg-path edit: edit README.md too, and make astro-reorg-master conflict it
echo "<!-- mixed conflict -->" >> README.md
git add README.md
git commit -m "test: mixed reorg + non-reorg edits"
git push origin test/mixed-conflict
```

Now create a conflicting edit to README.md on `astro-reorg-master`:
```bash
git checkout astro-reorg-master
echo "<!-- astro-reorg-master edit -->" >> README.md
git add README.md
git commit -m "test: conflicting README edit on base branch"
git push origin astro-reorg-master
```

```bash
gh pr create --repo DataDog/documentation \
  --head test/mixed-conflict \
  --base astro-reorg-master \
  --title "TEST mixed conflict PR" \
  --body "Has both reorg and non-reorg conflicts."
```

Note the PR number as `<PR-MIXED>`.

### 4.2 Run the script

```bash
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --pr <PR-MIXED>
```

- [ ] Output lists both a reorg conflict (`hugo/content/en/...` or `content/en/...`)
  and an unrelated conflict (`README.md`)
- [ ] Output says `Non-reorg conflicts present — labeling for manual review.`
- [ ] Label `astro-reorg-manual-review` added to `<PR-MIXED>`
- [ ] Label `astro-reorg-stale` NOT added
- [ ] No fix PR opened
- [ ] No comment posted on the PR

### 4.3 Cleanup

```bash
gh pr close <PR-MIXED> --repo DataDog/documentation
git push origin --delete test/mixed-conflict
# Revert the README edit on astro-reorg-master if desired
```

---

## Part 5: Wrong-path addition (no conflict marker)

**Behavior being verified:** When a PR adds a brand-new file at a pre-reorg
path (e.g. `content/en/new_file.md`), git merges it silently at the wrong
path with no conflict marker. The script detects this via
`get_wrong_path_additions()` and treats it as a reorg conflict, triggering
the auto-fix.

### 5.1 Create the PR

```bash
git checkout -b test/wrong-path-addition origin/master
# Add a brand-new file that doesn't exist anywhere yet
echo "# New page" > content/en/brand_new_test_page.md
git add content/en/brand_new_test_page.md
git commit -m "test: add new page at pre-reorg path"
git push origin test/wrong-path-addition
gh pr create --repo DataDog/documentation \
  --head test/wrong-path-addition \
  --base astro-reorg-master \
  --title "TEST wrong-path addition PR" \
  --body "Adds a new file at a pre-reorg path — no conflict marker expected."
```

Note the PR number as `<PR-WRONG-PATH>`.

### 5.2 Run the script

```bash
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --pr <PR-WRONG-PATH>
```

- [ ] Output shows `Wrong-path additions: ['content/en/brand_new_test_page.md']`
- [ ] Output shows this under reorg-caused conflicts (not unrelated)
- [ ] Fix PR is opened
- [ ] On the fix PR, the new file appears at `hugo/content/en/brand_new_test_page.md`
  (not `content/en/...`)
- [ ] Original PR labeled `astro-reorg-stale`

### 5.3 Cleanup

```bash
gh pr close <PR-WRONG-PATH> --repo DataDog/documentation
gh pr close <FIX-PR-WRONG-PATH> --repo DataDog/documentation
git push origin --delete test/wrong-path-addition
git push origin --delete reorg-fix/pr-<PR-WRONG-PATH>
```

---

## Part 6: UNKNOWN mergeability — skipped

**Behavior being verified:** GitHub computes mergeability lazily. PRs that
return `UNKNOWN` are skipped without error so they can be re-checked later.

This state is hard to manufacture reliably, but can be observed naturally on
a freshly pushed PR before GitHub has computed its mergeability. Watch the
output of a run against a PR you just created:

```bash
# Run the script immediately after opening a PR, before GitHub has processed it
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --pr <ANY-NEWLY-OPENED-PR>
```

- [ ] If mergeability is `UNKNOWN`, output says
  `Mergeability not yet computed by GitHub — skipping.`
- [ ] No changes made to the PR

---

## Part 7: `--dry-run` flag

**Behavior being verified:** `--dry-run` reports all intended actions without
making any changes — no branches pushed, no PRs opened, no labels applied,
no comments posted.

Use `<PR-REORG-ONLY>` from Part 2 (re-create it if already cleaned up).

```bash
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --dry-run \
  --pr <PR-REORG-ONLY>
```

- [ ] Output starts with `DRY-RUN mode — no branches or PRs will be modified.`
- [ ] Output shows `[dry-run] would apply N commit(s)`
- [ ] Output shows `[dry-run] would open PR: '[reorg fix] ...'`
- [ ] No branch `reorg-fix/pr-<PR-REORG-ONLY>` exists on origin after the run
- [ ] No labels added to the PR
- [ ] No comment posted on the PR

---

## Part 8: `--pr` flag (targeted run)

**Behavior being verified:** Without `--pr`, the script queries all open PRs.
With `--pr`, it checks only the specified PR(s). This is the main way to
avoid processing hundreds of PRs when testing.

```bash
# Run against two specific PRs
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --dry-run \
  --pr <PR-A> --pr <PR-B>
```

- [ ] Output says `Found 2 open PR(s) to check.`
- [ ] Only `<PR-A>` and `<PR-B>` appear in the output

---

## Part 9: Full scan (no `--pr` filter)

**Behavior being verified:** Without `--pr`, the script lists all open PRs
from the repo and processes each one. Run this only when ready, as it will
make real changes to conflicting PRs.

```bash
python3 astro_reorg/resolve_pr_conflicts.py \
  --base-branch astro-reorg-master \
  --dry-run
```

- [ ] Output says `Found N open PR(s) to check.` for the real open PR count
- [ ] Each PR appears in the output with its mergeability status
- [ ] No changes made (dry-run)

---

## Part 10: Teardown

After all tests, clean up the fake base branch:

```bash
git push origin --delete astro-reorg-master
git branch -D astro-reorg-master
```

If you created the labels in Part 0 and want to remove them:
```bash
gh label delete astro-reorg-manual-review --repo DataDog/documentation --yes
gh label delete astro-reorg-stale --repo DataDog/documentation --yes
```
