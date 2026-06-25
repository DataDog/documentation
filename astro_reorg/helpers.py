import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    import yaml
except ImportError:
    print("Error: PyYAML is required. Install with: pip install pyyaml", file=sys.stderr)
    sys.exit(1)

repo_root = Path(__file__).parent.parent
hugo_dir = repo_root / "hugo"

# Distinctive marker so anything we create is obvious and easy to clean up.
MARKER = "__reorg_harness__"

# (status, name, detail) tuples collected as checks run.
results = []


def record(status, name, detail=""):
    """Record a check outcome. status is one of PASS, FAIL, SKIP, WARN."""
    results.append((status, name, detail))
    symbol = {"PASS": "✅", "FAIL": "❌", "SKIP": "⏭ ", "WARN": "⚠ "}[status]
    line = f"{symbol} {status:4} {name}"
    if detail:
        line += f"\n        {detail}"
    print(line)


def git(*args, check=False):
    """Run a git command from the repo root and return the CompletedProcess."""
    return subprocess.run(
        ["git", *args],
        cwd=repo_root,
        capture_output=True,
        text=True,
        check=check,
    )


def load_config():
    """Load astro_reorg/config.yaml and return (top_level, moves_to_hugo) name sets."""
    config_path = Path(__file__).parent / "config.yaml"
    with config_path.open() as f:
        config = yaml.safe_load(f)
    return set(config.get("top_level", [])), set(config.get("moves_to_hugo", []))


def check_layout(top_level, moves_to_hugo):
    """hugo/ holds the moved dirs; nothing that moved is left at the root."""
    # Moved items that the reorg actually had to relocate (present before).
    expected_in_hugo = sorted(n for n in moves_to_hugo if (hugo_dir / n).exists())
    missing_from_hugo = sorted(
        n for n in moves_to_hugo
        if (repo_root / n).exists() and not (hugo_dir / n).exists()
    )

    # A moved name still sitting at the root means the move didn't happen.
    still_at_root = sorted(
        n for n in moves_to_hugo if (repo_root / n).exists()
    )
    if still_at_root:
        record("FAIL", "layout: moved items remain at repo root",
               ", ".join(still_at_root))
    else:
        record("PASS", "layout: no moved items remain at repo root",
               f"{len(expected_in_hugo)} item(s) confirmed under hugo/")

    if missing_from_hugo:
        record("FAIL", "layout: moved items missing under hugo/",
               ", ".join(missing_from_hugo))

    # No top_level item should have leaked into hugo/. Two names are expected to
    # appear under hugo/ and are NOT leaks: 'hugo' itself (the move target), and
    # '.gitignore' — execute_reorg.py deliberately SPLITS the root .gitignore,
    # writing a routed subset to hugo/.gitignore (verified by check_gitignore_split
    # and the "present at root and in hugo/" check below).
    expected_under_hugo = {"hugo", ".gitignore"}
    leaked = sorted(
        n for n in top_level
        if n not in expected_under_hugo and (hugo_dir / n).exists()
    )
    if leaked:
        record("FAIL", "layout: top-level items leaked into hugo/",
               ", ".join(leaked))
    else:
        record("PASS", "layout: no top-level items leaked into hugo/")

    # Critical anchors that must still exist at the root after the move.
    # package.json/node_modules/yarn.lock and go.mod/go.sum belong under hugo/
    # (each site owns its own Node setup; the Go module powers Hugo Modules),
    # so they are deliberately NOT listed here.
    must_stay = ["astro", ".husky", ".github", ".vale.ini"]
    absent = [n for n in must_stay if not (repo_root / n).exists()]
    if absent:
        record("FAIL", "layout: expected top-level items are missing",
               ", ".join(absent))
    else:
        record("PASS", "layout: top-level anchors intact",
               ", ".join(must_stay))

    # Both .gitignore files should exist (execute_reorg.py splits one into two;
    # check_gitignore_split below verifies the split routed correctly).
    if (repo_root / ".gitignore").exists() and (hugo_dir / ".gitignore").exists():
        record("PASS", "layout: .gitignore present at root and in hugo/")
    else:
        record("FAIL", "layout: missing a .gitignore copy",
               "expected both ./.gitignore and ./hugo/.gitignore")


def check_gitignore_split(top_level, moves_to_hugo):
    """Verify execute_reorg.py routed .gitignore rules to the correct side.

    A .gitignore is relative to its own directory, so after the split no
    surviving rule should point at a path that lives on the OTHER side:
      - root .gitignore must not carry a rule whose first segment moved to hugo/
      - hugo/.gitignore must not carry a rule whose first segment stays at root
    Generic globs (first segment in neither config list) legitimately live in
    both files, so they are ignored here.
    """
    def first_segment(line):
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            return None
        body = stripped[1:] if stripped.startswith("!") else stripped
        return body.lstrip("/").split("/", 1)[0]

    def leaks(path, wrong_side):
        out = []
        for raw in path.read_text().splitlines():
            seg = first_segment(raw)
            if seg in wrong_side:
                out.append(f"{path.name}: {raw.strip()}  (segment {seg!r})")
        return out

    root_gi = repo_root / ".gitignore"
    hugo_gi = hugo_dir / ".gitignore"
    if not (root_gi.exists() and hugo_gi.exists()):
        record("SKIP", "gitignore: split not verifiable (a .gitignore is missing)")
        return

    problems = leaks(root_gi, moves_to_hugo) + leaks(hugo_gi, top_level - {"hugo"})
    if problems:
        record("FAIL", "gitignore: rules survive on the wrong side of the split",
               f"{len(problems)}:\n        " + "\n        ".join(problems[:20]))
    else:
        record("PASS", "gitignore: no moved-path rule left at root, "
               "no root-path rule left in hugo/")


def check_workflows(moves_to_hugo):
    """Flag references to moved paths (directories AND files) lacking hugo/.

    Routes every path-like token by its first segment, mirroring execute_reorg.py:
    a token whose first segment moved into hugo/ must be hugo/-prefixed (after a
    correct reorg its first segment is 'hugo', so it no longer matches). A token
    counts as a path reference when it contains a '/', or when the whole token is
    the exact name of a moved file — so a bare word like 'content' in prose isn't
    flagged, but a standalone 'babel.config.js' is.

    Moved files whose names also exist under astro/ (package.json, yarn.lock,
    node_modules, .nvmrc) are excluded from bare-name matching: a standalone
    'package.json' is genuinely ambiguous. They are still validated when they
    appear inside a slashed path routed by first segment.
    """
    workflows_dir = repo_root / ".github" / "workflows"
    if not workflows_dir.exists():
        record("SKIP", "workflows: .github/workflows/ not found")
        return

    moved_files = {
        n for n in moves_to_hugo
        if (hugo_dir / n).is_file() and not (repo_root / "astro" / n).exists()
    }

    # Lines that legitimately reference a moved name but are NOT paths to fix
    # (illustrative prose, external URLs). Keyed by workflow filename; a line is
    # exempt if it contains any of the listed markers.
    allowlist = {
        # Security-doc example of how untrusted paths are reported, not a real path.
        "claude_review.yml": ["__untrusted/content/"],
    }

    # A path-like token: a maximal run of path/glob characters. Whitespace,
    # quotes, ':', '@' and '!' all act as boundaries, so a leading '!' negation
    # or surrounding quotes fall away naturally.
    token_re = re.compile(r"[A-Za-z0-9_.\-*/]+")

    def first_segment(token):
        """(first path segment, ./-stripped token) for routing."""
        t = token
        while t.startswith("./"):
            t = t[2:]
        return t.split("/", 1)[0], t

    suspects = []
    for yml in sorted(workflows_dir.glob("*.yml")):
        exempt = allowlist.get(yml.name, [])
        for lineno, line in enumerate(yml.read_text().splitlines(), 1):
            if any(marker in line for marker in exempt):
                continue
            for token in token_re.findall(line):
                seg, normalized = first_segment(token)
                # Only treat a token as a path reference if it's an actual path
                # (has a '/') or is exactly the name of a moved file.
                if "/" not in normalized and normalized not in moved_files:
                    continue
                if seg in moves_to_hugo:
                    suspects.append(f"{yml.name}:{lineno}: {line.strip()}")
                    break

    # De-duplicate while keeping order.
    seen = set()
    unique = [s for s in suspects if not (s in seen or seen.add(s))]

    if unique:
        record("FAIL", "workflows: unprefixed moved paths found",
               f"{len(unique)} line(s):\n        " + "\n        ".join(unique[:20]))
    else:
        record("PASS", "workflows: all moved paths (dirs and files) are hugo/-prefixed")


def check_workflow_path_filters(moves_to_hugo):
    """Parse each workflow's on.*.paths filters and assert moved paths are prefixed.

    Unlike paths embedded in `run:` shell (which are opaque string scalars to a
    parser), `on.<event>.paths` / `paths-ignore` are structured YAML list values,
    so we can validate them precisely. Each entry is routed by its first path
    segment: if that segment moved into hugo/, the entry must be hugo/-prefixed.

    Footgun handled: under YAML 1.1, PyYAML loads the `on:` key as the boolean
    True, not the string "on" — so we look it up under both keys.
    """
    workflows_dir = repo_root / ".github" / "workflows"
    if not workflows_dir.exists():
        record("SKIP", "workflows: .github/workflows/ not found (path filters)")
        return

    def first_segment(entry):
        # Strip a leading '!' negation and any root anchor, then take segment 0.
        p = entry[1:] if entry.startswith("!") else entry
        return p.lstrip("/").split("/", 1)[0]

    problems = []
    for yml in sorted(workflows_dir.glob("*.yml")):
        try:
            doc = yaml.safe_load(yml.read_text())
        except yaml.YAMLError as exc:
            record("WARN", f"workflows: {yml.name} did not parse as YAML",
                   str(exc).splitlines()[0][:120])
            continue
        if not isinstance(doc, dict):
            continue
        triggers = doc.get("on", doc.get(True))   # `on:` -> True under YAML 1.1
        if not isinstance(triggers, dict):
            continue
        for event, spec in triggers.items():
            if not isinstance(spec, dict):
                continue
            for key in ("paths", "paths-ignore"):
                for entry in spec.get(key) or []:
                    if not isinstance(entry, str):
                        continue
                    seg = first_segment(entry)
                    anchored = entry.lstrip("!").lstrip("/")
                    if seg in moves_to_hugo and not anchored.startswith("hugo/"):
                        problems.append(f"{yml.name}: on.{event}.{key}: {entry}")

    if problems:
        record("FAIL", "workflows: on.*.paths filters missing hugo/ prefix",
               f"{len(problems)}:\n        " + "\n        ".join(problems[:20]))
    else:
        record("PASS", "workflows: on.*.paths filters are hugo/-prefixed")


def check_codeowners():
    """Flag concrete (non-glob) CODEOWNERS patterns that don't resolve correctly.

    Stale entries pointing at files absent from both hugo/ and the repo root are
    reported as informational notes but never failed. The two cases for a
    non-resolving concrete pattern:

      - hugo/-prefixed AND its de-prefixed path resolves at the repo root
        -> REGRESSION: the pattern was prefixed but the file is still at
           root (the move didn't happen / went to the wrong place). FAIL.
      - anything else that doesn't resolve -> absent from both hugo/ and root.
        Reported as an informational note, never a failure.
    """
    codeowners = repo_root / ".github" / "CODEOWNERS"
    if not codeowners.exists():
        record("SKIP", "codeowners: .github/CODEOWNERS not found")
        return

    regressions = []
    preexisting = []
    for line in codeowners.read_text().splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        pattern = stripped.split()[0]
        if pattern == "*":
            continue
        # Skip glob patterns; we can't resolve them to a single path.
        if any(ch in pattern for ch in "*?[]"):
            continue
        # Leading slash in CODEOWNERS is repo-root-anchored.
        rel = pattern.lstrip("/")
        if (repo_root / rel).exists():
            continue
        # Doesn't resolve. Is it something the reorg broke, or pre-existing rot?
        if rel.startswith("hugo/") and (repo_root / rel[len("hugo/"):]).exists():
            regressions.append(pattern)
        else:
            preexisting.append(pattern)

    if regressions:
        record("FAIL", "codeowners: patterns the reorg moved to hugo/ but whose "
               "file is still at root",
               f"{len(regressions)}:\n        " + "\n        ".join(regressions[:20]))
    elif preexisting:
        record("PASS", "codeowners: no reorg-introduced breakage",
               f"{len(preexisting)} pre-existing dangling entry(ies) ignored "
               f"(absent on master too): e.g. {', '.join(preexisting[:3])}")
    else:
        record("PASS", "codeowners: all concrete patterns resolve on disk")


def check_codeowners_prefixing(moves_to_hugo):
    """Every CODEOWNERS pattern whose first segment moved into hugo/ must carry
    the hugo/ prefix — globs included.

    check_codeowners() above only proves that *concrete* paths still RESOLVE on
    disk; it skips every glob (layouts/shortcodes/**/*.md) and never confirms a
    moved pattern was actually repathed. Here we route each pattern by its first
    path segment exactly as execute_reorg.py's route_codeowners_pattern does and assert
    that a moved segment is prefixed. After a correct reorg the pattern's first
    segment is 'hugo', so a flagged pattern means a substitution was missed.
    """
    codeowners = repo_root / ".github" / "CODEOWNERS"
    if not codeowners.exists():
        record("SKIP", "codeowners: .github/CODEOWNERS not found (prefixing)")
        return

    def first_segment(pattern):
        body = pattern[1:] if pattern.startswith("/") else pattern   # un-anchor
        seg = body.split("/", 1)[0]
        # execute_reorg.py normalizes the '.local' typo to 'local' before routing.
        return "local" if seg == ".local" else seg

    unprefixed = []
    for line in codeowners.read_text().splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        pattern = stripped.split()[0]
        if pattern == "*":
            continue
        if first_segment(pattern) not in moves_to_hugo:
            continue
        if not pattern.lstrip("/").startswith("hugo/"):
            unprefixed.append(pattern)

    if unprefixed:
        record("FAIL", "codeowners: moved patterns missing the hugo/ prefix",
               f"{len(unprefixed)} (globs included):\n        "
               + "\n        ".join(unprefixed[:20]))
    else:
        record("PASS", "codeowners: every moved pattern is hugo/-prefixed "
               "(globs included)")


def run_hook(script_name):
    """Run a .husky hook script from the repo root; return CompletedProcess."""
    return subprocess.run(
        ["python3", str(repo_root / ".husky" / script_name)],
        cwd=repo_root,
        capture_output=True,
        text=True,
    )


def check_husky_circular_aliases():
    """Plant a self-aliasing page and confirm the hook rejects it."""
    rel = f"hugo/content/en/{MARKER}_alias/selftest.md"
    target = repo_root / rel
    if target.exists():
        record("WARN", "husky: circular-aliases test skipped (temp path exists)", rel)
        return

    # An alias equal to the file's own location is the circular case.
    body = (
        "---\n"
        "title: Reorg Harness Self Test\n"
        "aliases:\n"
        f"  - /{MARKER}_alias/selftest\n"
        "---\n\n"
        "Temporary file created by astro_reorg/validate_reorg.py.\n"
    )
    try:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(body)
        git("add", "-f", rel)
        proc = run_hook("check-circular-aliases.py")
        if proc.returncode != 0 and "circular" in (proc.stdout + proc.stderr).lower():
            record("PASS", "husky: circular-aliases hook rejects bad input")
        else:
            record("FAIL", "husky: circular-aliases hook did NOT reject bad input",
                   "hook may not be referencing hugo/content/en/ "
                   f"(exit={proc.returncode})")
    finally:
        git("reset", "-q", "HEAD", rel)
        if target.exists():
            target.unlink()
        _rmdir_if_empty(target.parent)


def check_husky_section_index():
    """Plant a new top-level section with no _index.md and confirm rejection."""
    section = f"{MARKER}_section"
    rel = f"hugo/content/en/{section}/page.md"
    target = repo_root / rel
    if target.exists() or (hugo_dir / "content" / "en" / section).exists():
        record("WARN", "husky: section-index test skipped (temp path exists)", rel)
        return

    body = "---\ntitle: Reorg Harness Page\nprivate: true\n---\n\nTemp page.\n"
    try:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(body)
        git("add", "-f", rel)
        proc = run_hook("check-section-index.py")
        if proc.returncode != 0 and "_index.md" in (proc.stdout + proc.stderr):
            record("PASS", "husky: section-index hook rejects missing _index.md")
        else:
            record("FAIL", "husky: section-index hook did NOT reject bad input",
                   "hook may not be referencing hugo/content/en/ "
                   f"(exit={proc.returncode})")
    finally:
        git("reset", "-q", "HEAD", rel)
        if target.exists():
            target.unlink()
        _rmdir_if_empty(target.parent)


def check_husky_cdocs_gitignore():
    """
    Append a harness pattern to hugo/content/.gitignore, force-track a matching
    compiled file (with a .mdoc.md sibling), and confirm the hook flags it.
    """
    content_gitignore = hugo_dir / "content" / ".gitignore"
    if not content_gitignore.exists():
        record("SKIP", "husky: cdocs-gitignore test skipped (no hugo/content/.gitignore)")
        return

    pattern = f"/en/{MARKER}_cdocs.md"
    compiled_rel = f"hugo/content/en/{MARKER}_cdocs.md"
    source_rel = f"hugo/content/en/{MARKER}_cdocs.mdoc.md"
    compiled = repo_root / compiled_rel
    source = repo_root / source_rel
    if compiled.exists() or source.exists():
        record("WARN", "husky: cdocs-gitignore test skipped (temp path exists)",
               compiled_rel)
        return

    original_gitignore = content_gitignore.read_text()
    try:
        content_gitignore.write_text(
            original_gitignore.rstrip("\n") + f"\n{pattern}\n"
        )
        source.write_text("Temp Cdocs source.\n")
        compiled.write_text("Temp compiled Cdocs output.\n")
        git("add", "-f", compiled_rel)  # force past the gitignore to simulate the mistake
        proc = run_hook("check-cdocs-gitignore.py")
        if proc.returncode != 0 and MARKER in (proc.stdout + proc.stderr):
            record("PASS", "husky: cdocs-gitignore hook flags tracked compiled file")
        else:
            record("FAIL", "husky: cdocs-gitignore hook did NOT flag tracked file",
                   "hook may not be referencing hugo/content/.gitignore "
                   f"(exit={proc.returncode})")
    finally:
        git("reset", "-q", "HEAD", compiled_rel)
        for p in (compiled, source):
            if p.exists():
                p.unlink()
        content_gitignore.write_text(original_gitignore)


def _rmdir_if_empty(path):
    """Remove a directory only if it is empty (safety guard)."""
    try:
        path.rmdir()
    except OSError:
        pass


def check_build_presence():
    """Static check; the real build is the manual `make start` in todo #5."""
    # Hugo's build entrypoints all need to be co-located under hugo/: the Makefile,
    # the Node manifest, and go.mod (required by Hugo Modules at the project root).
    required = ["Makefile", "package.json", "go.mod"]
    missing = [n for n in required if not (hugo_dir / n).exists()]
    if not missing:
        record("PASS", "build: hugo/{Makefile,package.json,go.mod} present",
               "run `cd hugo && make start` (todo #5) to verify the full build")
    else:
        record("FAIL", "build: missing Hugo build entrypoint(s) under hugo/",
               ", ".join(f"hugo/{n}" for n in missing))


def check_rollback_roundtrip():
    """execute_reorg.py then rollback.py must restore the tree byte-for-byte.

    This is the only check that exercises rollback.py at all. Rather than
    mutate the live repo (and risk leaving it half-reorganized if a step fails),
    it builds a small throwaway git repo holding one representative item for
    every code path the two scripts touch — a mixed .gitignore (rules that route
    to hugo/, to root, and to both), a workflow with substitutable paths, a
    CODEOWNERS with a moved rule, a husky hook with a substitutable path, plus a
    few moved/stayed files — then:

        snapshot -> run execute_reorg.py (answering y to every prompt)
                 -> run rollback.py -> snapshot again
                 -> assert byte-identical.

    It specifically catches the easy-to-miss case where execute_reorg.py edits a file in
    place (the root .gitignore split) that rollback must restore from git rather
    than merely delete.
    """
    if shutil.which("python3") is None or shutil.which("git") is None:
        record("SKIP", "rollback: python3/git not both available")
        return

    workdir = tempfile.mkdtemp(prefix=f"{MARKER}_rollback_")
    work = Path(workdir)

    def write(rel, text):
        p = work / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(text)

    def git_work(*args):
        return subprocess.run(["git", *args], cwd=work,
                              capture_output=True, text=True)

    def snapshot():
        """relpath -> bytes for every file under work/, excluding .git/."""
        tree = {}
        for path in sorted(work.rglob("*")):
            if path.is_dir():
                continue
            rel = path.relative_to(work)
            if rel.parts and rel.parts[0] == ".git":
                continue
            tree[str(rel)] = path.read_bytes()
        return tree

    try:
        # Representative fixture. Every top-level name here must appear in
        # astro_reorg/config.yaml or execute_reorg.py refuses to run; the mix below routes
        # across moves_to_hugo, top_level, and generic-glob cases.
        write(".gitignore",
              "# build\n"
              "public/*\n"
              "data/generated\n"
              "content/en/api/**/*.go\n"
              "node_modules\n"
              "\n"
              "# generic (kept in both)\n"
              "*.log\n"
              "\n"
              "# root-only tooling\n"
              ".github/preview-links-template.md\n")
        write(".github/workflows/sample.yml",
              "name: sample\n"
              "on:\n"
              "  pull_request:\n"
              "    paths:\n"
              "      - 'content/en/**/*.md'\n"
              "jobs:\n"
              "  build:\n"
              "    runs-on: ubuntu-latest\n"
              "    steps:\n"
              "      - run: python local/bin/foo.py\n")
        write(".github/CODEOWNERS",
              "*  @DataDog/documentation\n"
              "/content/  @DataDog/team-a\n"
              "data/  @DataDog/team-b\n"
              "README.md  @DataDog/team-c\n")
        write(".husky/check-sample.py",
              "from pathlib import Path\n"
              'repo_pattern = "content"\n'
              "p = Path('content/en')\n")
        write("README.md", "# Fixture\n")
        write("astro/package.json", '{"name": "astro-fixture"}\n')
        write("content/en/page.md", "---\ntitle: Page\n---\n\nBody.\n")
        write("data/sample.yaml", "key: value\n")
        write("Makefile", "start:\n\techo build\n")
        write("package.json", '{"name": "hugo-fixture"}\n')
        write("go.mod", "module example.com/fixture\n\ngo 1.21\n")
        write("babel.config.js", "module.exports = {};\n")

        # The scripts resolve repo_root as their parent's parent, so place them
        # under an astro_reorg/ subfolder that mirrors the real repo layout.
        (work / "astro_reorg").mkdir()
        for tool in ("execute_reorg.py", "rollback.py", "config.yaml"):
            shutil.copy2(repo_root / "astro_reorg" / tool, work / "astro_reorg" / tool)

        git_work("init", "-q")
        git_work("add", "-A")
        commit = git_work("-c", "user.email=harness@example.com",
                          "-c", "user.name=reorg harness",
                          "-c", "commit.gpgsign=false",
                          "commit", "-q", "-m", "fixture")
        if commit.returncode != 0:
            record("FAIL", "rollback: could not commit fixture repo",
                   (commit.stderr or commit.stdout).strip()[:200])
            return

        before = snapshot()

        # execute_reorg.py is interactive (single y/N per mutation section); answer y to
        # all. Far more lines than prompts is fine — the extras are ignored.
        reorg = subprocess.run(
            ["python3", str(work / "astro_reorg" / "execute_reorg.py")],
            cwd=work, capture_output=True, text=True, input="y\n" * 100,
        )
        if reorg.returncode != 0 or not (work / "hugo").exists():
            record("FAIL", "rollback: execute_reorg.py failed on the fixture",
                   (reorg.stderr or reorg.stdout).strip()[:200])
            return

        rollback = subprocess.run(
            ["python3", str(work / "astro_reorg" / "rollback.py")],
            cwd=work, capture_output=True, text=True,
        )
        if rollback.returncode != 0 or (work / "hugo").exists():
            record("FAIL", "rollback: rollback.py failed on the fixture",
                   (rollback.stderr or rollback.stdout).strip()[:200])
            return

        after = snapshot()

        added = sorted(set(after) - set(before))
        removed = sorted(set(before) - set(after))
        changed = sorted(p for p in before.keys() & after.keys()
                         if before[p] != after[p])
        if added or removed or changed:
            diffs = ([f"+ {p}" for p in added]
                     + [f"- {p}" for p in removed]
                     + [f"~ {p} (in-place edit not reverted)" for p in changed])
            record("FAIL", "rollback: tree not byte-identical after reorg + rollback",
                   f"{len(diffs)} diff(s):\n        " + "\n        ".join(diffs[:20]))
        else:
            record("PASS", "rollback: reorg + rollback restores the tree byte-for-byte",
                   f"{len(before)} file(s) round-tripped, incl. the .gitignore split")
    finally:
        shutil.rmtree(work, ignore_errors=True)
