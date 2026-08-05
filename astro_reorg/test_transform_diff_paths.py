#!/usr/bin/env python3
"""
Verify the auto-fix patching strategy in resolve_pr_conflicts.py:

    format-patch  ->  transform_diff_paths (rewrite paths to hugo/)  ->  git am --3way

The open question from code review: after transform_diff_paths() rewrites the
patch's file paths, does `git am --3way` STAY engaged? --3way reconstructs the
patch's pre-image from the blob SHAs in the patch header and does a real 3-way
merge, which is what absorbs context drift when master moved on. If the path
rewrite breaks git's ability to find those blobs, --3way silently degrades to
plain textual application — and a patch that only survives BECAUSE of context
drift would then fail.

Each test builds a throwaway git repo under tempfile.mkdtemp() with fully
isolated git env/config. Nothing in the real documentation repo is touched, and
the temp dirs are removed in a finally block.
"""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from resolve_pr_conflicts import transform_diff_paths  # noqa: E402


def make_repo() -> Path:
    """Create an isolated git repo in a temp dir and return its path."""
    d = Path(tempfile.mkdtemp(prefix="reorg_3way_test_"))
    _git(d, "init", "-q", "-b", "master")
    _git(d, "config", "user.email", "test@example.com")
    _git(d, "config", "user.name", "Test")
    return d


def _git(cwd: Path, *args: str, input: str | None = None) -> subprocess.CompletedProcess:
    # A hermetic env: don't let the caller's git config/hooks/identity leak in.
    env = {
        **os.environ,
        "GIT_CONFIG_NOSYSTEM": "1",
        "GIT_CONFIG_GLOBAL": "/dev/null",
        "HOME": str(cwd),  # so ~/.gitconfig can't be read
    }
    return subprocess.run(
        ["git", *args], cwd=cwd, env=env,
        capture_output=True, text=True, input=input,
    )


def _write(repo: Path, rel: str, content: str) -> None:
    p = repo / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content)


# A file with several lines so we can (a) have the PR edit ONE line and
# (b) have master edit a DIFFERENT line — producing context drift without a
# real content conflict. If --3way is engaged, this merges; plain `am` fails.
BASE_CONTENT = "".join(f"line {i}\n" for i in range(1, 21))

# The PR edits line 3. A unified diff carries 3 context lines each side, so the
# PR patch's hunk spans lines ~1-6. To make --3way LOAD-BEARING, master must
# edit a line INSIDE that hunk window (so plain `am`'s context match fails) but
# NOT line 3 itself (so there's no real content overlap and --3way can merge).
# Line 5 sits inside the window, adjacent to but distinct from the PR's edit.
PR_EDIT = ("line 3\n", "line 3 EDITED BY PR\n")
MASTER_EDIT = ("line 5\n", "line 5 EDITED BY MASTER\n")

# For the genuine-conflict test: master edits the SAME line the PR edits (line
# 3) to a DIFFERENT value. This is a real content overlap that no merge
# algorithm can auto-resolve, so even --3way must fail — which is what makes
# attempt_fix() bail to manual review instead of pushing a broken branch.
MASTER_CONFLICTING_EDIT = ("line 3\n", "line 3 EDITED BY MASTER\n")


def test_3way_survives_context_drift_after_path_rewrite() -> tuple[bool, str]:
    repo = make_repo()
    try:
        # 1. Base commit: file at the PRE-reorg path.
        _write(repo, "content/en/foo.md", BASE_CONTENT)
        _git(repo, "add", "-A")
        _git(repo, "commit", "-q", "-m", "base")
        base_sha = _git(repo, "rev-parse", "HEAD").stdout.strip()

        # 2. PR branch: edit line 3 (at the old path). This is the change we
        #    want to replay onto post-reorg master.
        _git(repo, "checkout", "-q", "-b", "pr")
        pr_content = BASE_CONTENT.replace(*PR_EDIT)
        _write(repo, "content/en/foo.md", pr_content)
        _git(repo, "add", "-A")
        _git(repo, "commit", "-q", "-m", "pr: edit line 3")

        # 3. Post-reorg master: move the file to hugo/ AND edit a line INSIDE
        #    the PR patch's hunk window (line 5). This corrupts the patch's
        #    context so plain `am` can't apply it, while leaving no real content
        #    overlap — so only --3way can reconcile the two edits.
        _git(repo, "checkout", "-q", "master")
        drifted = BASE_CONTENT.replace(*MASTER_EDIT)
        _write(repo, "hugo/content/en/foo.md", drifted)
        os.remove(repo / "content" / "en" / "foo.md")
        _git(repo, "add", "-A")
        _git(repo, "commit", "-q", "-m", "reorg: move foo.md to hugo/ + unrelated edit")

        # 4. Export the PR commit as a patch (against the merge base = base_sha),
        #    exactly as attempt_fix() does.
        fp = _git(repo, "format-patch", "--stdout", f"{base_sha}..pr")
        assert fp.returncode == 0, fp.stderr
        transformed = transform_diff_paths(fp.stdout)

        # Sanity: the rewrite actually retargeted the path.
        if "hugo/content/en/foo.md" not in transformed:
            return False, "transform_diff_paths did NOT rewrite the path to hugo/"

        # 5. Replay onto master with --3way, mirroring attempt_fix().
        am = _git(repo, "am", "--3way", input=transformed)

        if am.returncode != 0:
            _git(repo, "am", "--abort")
            return False, (
                "git am --3way FAILED on a patch that only conflicts in context, "
                "not content. This means --3way could not reconstruct the ancestor "
                "blob after the path rewrite (silent degradation to plain apply).\n"
                f"    stderr: {am.stderr.strip()[:300]}"
            )

        # 6. The merged file must contain BOTH edits: the PR's line-3 change and
        #    master's line-5 change. If plain apply had run, the PR's change
        #    would have landed but we'd verify the merge actually reconciled both.
        merged = (repo / "hugo" / "content" / "en" / "foo.md").read_text()
        has_pr = "line 3 EDITED BY PR" in merged
        has_master = "line 5 EDITED BY MASTER" in merged
        if not (has_pr and has_master):
            return False, (
                f"merge lost an edit: PR-edit present={has_pr}, "
                f"master-edit present={has_master}"
            )

        return True, "am --3way stayed engaged and reconciled both edits"
    finally:
        shutil.rmtree(repo, ignore_errors=True)


def test_plain_am_fails_proving_3way_is_load_bearing() -> tuple[bool, str]:
    """Control: the SAME patch under plain `git am` (no --3way) MUST fail.

    This is what makes test 1 meaningful. If plain am also succeeded, the drift
    wasn't reaching the hunk context and test 1's pass would be trivial (any
    apply method would work). By asserting plain am FAILS on the exact patch
    test 1 succeeds on, we prove --3way is the load-bearing piece — not an
    incidental flag on a patch that would have applied anyway.
    """
    repo = make_repo()
    try:
        _write(repo, "content/en/foo.md", BASE_CONTENT)
        _git(repo, "add", "-A")
        _git(repo, "commit", "-q", "-m", "base")
        base_sha = _git(repo, "rev-parse", "HEAD").stdout.strip()

        _git(repo, "checkout", "-q", "-b", "pr")
        pr_content = BASE_CONTENT.replace(*PR_EDIT)
        _write(repo, "content/en/foo.md", pr_content)
        _git(repo, "add", "-A")
        _git(repo, "commit", "-q", "-m", "pr: edit line 3")

        _git(repo, "checkout", "-q", "master")
        drifted = BASE_CONTENT.replace(*MASTER_EDIT)
        _write(repo, "hugo/content/en/foo.md", drifted)
        os.remove(repo / "content" / "en" / "foo.md")
        _git(repo, "add", "-A")
        _git(repo, "commit", "-q", "-m", "reorg move + in-hunk edit")

        fp = _git(repo, "format-patch", "--stdout", f"{base_sha}..pr")
        transformed = transform_diff_paths(fp.stdout)

        am = _git(repo, "am", input=transformed)  # NO --3way
        plain_failed = am.returncode != 0
        if not plain_failed:
            _git(repo, "am", "--abort")
            return False, (
                "plain `am` SUCCEEDED — the drift did not corrupt the hunk "
                "context, so test 1 is not exercising --3way. Move MASTER_EDIT "
                "closer to the PR's edit (inside the 3-line context window)."
            )
        return True, "plain am FAILED as required — --3way is provably load-bearing"
    finally:
        shutil.rmtree(repo, ignore_errors=True)


def test_true_content_conflict_makes_3way_fail_cleanly() -> tuple[bool, str]:
    """A genuine content overlap must make `git am --3way` FAIL and leave the
    tree in a resolvable (aborted-able) state.

    attempt_fix() (resolve_pr_conflicts.py line ~817) checks the am return code
    and, on failure, runs `git am --abort` and returns False so the caller
    routes the PR to manual review. This test proves the precondition that logic
    depends on: when the PR and master edit the SAME line, --3way genuinely
    fails rather than silently producing a "merged" file. If --3way ever
    auto-resolved a real conflict (e.g. by favoring one side), attempt_fix would
    push a branch with the wrong content and no conflict marker to warn anyone —
    the worst possible outcome, so it's worth pinning down.
    """
    repo = make_repo()
    try:
        _write(repo, "content/en/foo.md", BASE_CONTENT)
        _git(repo, "add", "-A")
        _git(repo, "commit", "-q", "-m", "base")
        base_sha = _git(repo, "rev-parse", "HEAD").stdout.strip()

        # PR edits line 3 to one value...
        _git(repo, "checkout", "-q", "-b", "pr")
        pr_content = BASE_CONTENT.replace(*PR_EDIT)
        _write(repo, "content/en/foo.md", pr_content)
        _git(repo, "add", "-A")
        _git(repo, "commit", "-q", "-m", "pr: edit line 3")

        # ...and post-reorg master edits the SAME line 3 to a different value.
        _git(repo, "checkout", "-q", "master")
        conflicting = BASE_CONTENT.replace(*MASTER_CONFLICTING_EDIT)
        _write(repo, "hugo/content/en/foo.md", conflicting)
        os.remove(repo / "content" / "en" / "foo.md")
        _git(repo, "add", "-A")
        _git(repo, "commit", "-q", "-m", "reorg move + conflicting edit on line 3")

        fp = _git(repo, "format-patch", "--stdout", f"{base_sha}..pr")
        transformed = transform_diff_paths(fp.stdout)

        am = _git(repo, "am", "--3way", input=transformed)
        if am.returncode == 0:
            # --3way auto-resolved a real conflict — the dangerous case.
            merged = (repo / "hugo" / "content" / "en" / "foo.md").read_text()
            _git(repo, "am", "--abort")
            return False, (
                "am --3way SUCCEEDED on a true content conflict — it should have "
                "failed. attempt_fix() would push a silently-wrong branch.\n"
                f"    resulting line 3: "
                f"{[l for l in merged.splitlines() if l.startswith('line 3')]}"
            )

        # Failure is correct. Verify the tree is in the expected mid-am state so
        # `git am --abort` (what attempt_fix does next) can recover it.
        status = _git(repo, "status", "--porcelain").stdout
        abort = _git(repo, "am", "--abort")
        if abort.returncode != 0:
            return False, (
                "am failed as expected, but `git am --abort` could not recover "
                f"the tree: {abort.stderr.strip()[:200]}"
            )
        return True, (
            "am --3way FAILED on the real conflict and `git am --abort` cleanly "
            "recovered — attempt_fix would correctly route to manual review "
            f"(conflict state seen: {status.strip().splitlines()[:1]})"
        )
    finally:
        shutil.rmtree(repo, ignore_errors=True)


if __name__ == "__main__":
    results = []
    for name, fn in [
        ("3way survives context drift after path rewrite",
         test_3way_survives_context_drift_after_path_rewrite),
        ("control: plain am behavior",
         test_plain_am_fails_proving_3way_is_load_bearing),
        ("true content conflict fails cleanly (routes to manual review)",
         test_true_content_conflict_makes_3way_fail_cleanly),
    ]:
        ok, msg = fn()
        mark = "PASS" if ok else "FAIL"
        results.append(ok)
        print(f"[{mark}] {name}\n       {msg}")
    sys.exit(0 if all(results) else 1)
