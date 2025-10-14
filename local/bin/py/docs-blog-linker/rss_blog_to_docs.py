#!/usr/bin/env python3
import os
import sys
import json
import time
import argparse
import subprocess
from pathlib import Path
from urllib.parse import urlparse, urlunparse
from datetime import datetime

# Check dependencies and provide helpful error messages
def check_dependencies():
    """Check if required dependencies are installed by parsing requirements.txt."""
    # Get the directory where this script lives
    script_dir = Path(__file__).parent
    requirements_file = script_dir / "requirements.txt"
    
    if not requirements_file.exists():
        print("WARNING: requirements.txt not found, skipping dependency check", file=sys.stderr)
        return
    
    # Parse requirements.txt
    requirements = []
    import_names = {
        'beautifulsoup4': 'bs4',
        'ruamel.yaml': 'ruamel.yaml',
    }
    
    with open(requirements_file) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                # Extract package name (before any version specifier)
                pkg = line.split('>=')[0].split('==')[0].split('<')[0].split('>')[0].strip()
                requirements.append(pkg)
    
    # Check each dependency
    missing = []
    for pkg in requirements:
        import_name = import_names.get(pkg, pkg)
        try:
            __import__(import_name)
        except ImportError:
            missing.append(pkg)
    
    if missing:
        print("ERROR: Missing required dependencies:", ", ".join(missing), file=sys.stderr)
        print("\nTo install dependencies, run:", file=sys.stderr)
        print(f"  pip install -r {requirements_file}", file=sys.stderr)
        print("\nOr install them individually:", file=sys.stderr)
        print(f"  pip install {' '.join(missing)}", file=sys.stderr)
        sys.exit(1)

check_dependencies()

import feedparser
import requests
from bs4 import BeautifulSoup

# YAML (round-trip safe) for frontmatter editing
from ruamel.yaml import YAML
from ruamel.yaml.comments import CommentedMap

yaml_rt = YAML()
yaml_rt.preserve_quotes = True
yaml_rt.indent(mapping=2, sequence=4, offset=2)

# ----------------------------
# Config
# ----------------------------

BLOG_RSS = "https://www.datadoghq.com/blog/index.xml"
DOCS_HOST = "docs.datadoghq.com"

# Exclude list - documents that should not be modified
# Maps docs URLs to their file paths (either can be used for exclusion)
EXCLUDED_DOCS = {
    "https://docs.datadoghq.com/security/default_rules/": "content/en/security/default_rules/_index.md"
}


# ----------------------------
# Shell utils
# ----------------------------

def run(cmd: list[str], cwd: Path | None = None) -> str:
    p = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True)
    if p.returncode != 0:
        raise RuntimeError(f"Command failed: {' '.join(cmd)}\n{p.stdout}\n{p.stderr}")
    return p.stdout.strip()


def get_git_username(repo_path: Path | None = None) -> str:
    """
    Get git username from git config, falling back to sensible defaults.
    Tries user.name first, then user.email (without domain), then a generic fallback.
    """
    try:
        # Try git config user.name
        name = run(["git", "config", "user.name"], cwd=repo_path)
        if name:
            # Convert to lowercase and replace spaces with hyphens for branch names
            return name.lower().replace(" ", "-")
    except Exception:
        pass
    
    try:
        # Try git config user.email and extract username part
        email = run(["git", "config", "user.email"], cwd=repo_path)
        if email and "@" in email:
            username = email.split("@")[0]
            return username.lower().replace(".", "-")
    except Exception:
        pass
    
    # Fallback to generic username
    return "blog-linker"




# ----------------------------
# URL helpers
# ----------------------------

def normalize_url(u: str) -> str:
    p = urlparse(u)
    return urlunparse((p.scheme, p.netloc, p.path.rstrip("/"), "", "", ""))


def canonicalize_docs_url(u: str) -> str:
    """
    Follow HTTP redirects to get the canonical docs URL (slug), then normalize.
    This fixes mapping when public URLs redirect to a different path.
    """
    try:
        r = requests.get(u, timeout=20, allow_redirects=True)
        r.raise_for_status()
        return normalize_url(r.url)
    except Exception:
        return normalize_url(u)


def clean_title(t: str | None) -> str | None:
    """
    Remove trailing ' | Datadog' (and variants) for nicer 'text:' in further_reading.
    """
    if not t:
        return None
    s = t.strip()
    for suf in (" | Datadog", " | Datadog Blog", "| Datadog", "| Datadog Blog"):
        if s.endswith(suf):
            return s[: -len(suf)].rstrip()
    return s


# ----------------------------
# Fetching/parsing
# ----------------------------

def fetch_title(url: str) -> str | None:
    try:
        r = requests.get(url, timeout=30)
        r.raise_for_status()
        t = BeautifulSoup(r.text, "html.parser").find("title")
        return t.text.strip() if t else None
    except Exception:
        return None


def fetch_blog_links(blog_url: str) -> list[str]:
    """
    Return unique docs.datadoghq.com links in the article body.
    """
    r = requests.get(blog_url, timeout=30)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")
    body = soup.select_one(".article-content") or soup
    links = set()
    for a in body.select('a[href^="https://docs.datadoghq.com"]'):
        href = a["href"].split("#")[0].strip()
        links.add(normalize_url(href))
    return sorted(links)


# ----------------------------
# Frontmatter editing (ruamel.yaml, non-destructive)
# ----------------------------

def split_frontmatter(md_path: Path):
    """
    Return (delim, yaml_text, body_text). Supports YAML '---'.
    For non-YAML frontmatter, returns (None, None, full_text) and we skip.
    """
    text = md_path.read_text(encoding="utf-8")
    if text.startswith("---\r\n"):
        end = text.find("\r\n---\r\n", 5)
        if end != -1:
            fm = text[4:end]
            body = text[end + 7:]
            return ("---", fm, body)
    if not text.startswith("---\n"):
        return (None, None, text)
    end = text.find("\n---\n", 4)
    if end == -1:
        return (None, None, text)
    fm = text[4:end]
    body = text[end + 5:]
    return ("---", fm, body)


def load_yaml_preserve(yaml_text: str):
    from io import StringIO
    data = yaml_rt.load(StringIO(yaml_text)) or CommentedMap()
    if not isinstance(data, CommentedMap):
        # Force into CommentedMap to allow stable reordering
        cm = CommentedMap()
        for k, v in (data or {}).items():
            cm[k] = v
        data = cm
    return data


def dump_yaml_preserve(data) -> str:
    from io import StringIO
    buf = StringIO()
    yaml_rt.dump(data, buf)
    return buf.getvalue().rstrip()


def ensure_title_first(meta: CommentedMap) -> None:
    """
    Ensure 'title' key is the first key in the YAML frontmatter map, if present.
    Keeps all other keys (and their comments) in place.
    """
    if "title" in meta:
        val = meta.pop("title")
        # Insert at position 0. ruamel preserves comments on the map; if the title
        # had inline comments, they typically aren't used; acceptable trade-off.
        meta.insert(0, "title", val)


def link_already_exists_in_further_reading(further_reading: list, blog_url: str) -> bool:
    """Check if the blog URL already exists in the further_reading list."""
    normalized_url = blog_url.rstrip("/")
    existing_links = set()
    for item in further_reading:
        if isinstance(item, dict):
            link = (item.get("link") or "").rstrip("/")
            if link:
                existing_links.add(link)
    return normalized_url in existing_links


def find_further_reading_section(lines: list[str]) -> tuple[int | None, int | None]:
    """
    Find the line range of the further_reading section in YAML.
    Returns (start_line, end_line) or (None, None) if not found.
    """
    for i, line in enumerate(lines):
        if line.strip().startswith('further_reading:'):
            start = i
            # Find where this section ends
            end = None
            for j in range(i + 1, len(lines)):
                if lines[j].strip() and not lines[j].startswith(' '):
                    end = j
                    break
            if end is None:
                end = len(lines)
            return (start, end)
    return (None, None)


def detect_indentation_patterns(lines: list[str], section_start: int, section_end: int) -> tuple[int, int | None]:
    """
    Detect indentation patterns from existing further_reading items.
    Returns (list_indent_level, sub_item_indent_level).
    """
    list_item_indents = []
    sub_item_indents = []
    
    for i in range(section_start + 1, section_end):
        line = lines[i]
        if not line.strip():
            continue
        
        indent = len(line) - len(line.lstrip())
        if line.strip().startswith('- '):
            list_item_indents.append(indent)
        elif indent > 0:
            sub_item_indents.append(indent)
    
    # Determine list item indentation
    if list_item_indents and len(set(list_item_indents)) == 1:
        list_indent = list_item_indents[0]
    else:
        list_indent = 0  # Default to no indentation
    
    # Determine sub-item indentation
    sub_indent = min(sub_item_indents) if sub_item_indents else None
    
    return (list_indent, sub_indent)


def format_new_further_reading_item(blog_url: str, blog_title: str | None, list_indent: int, sub_indent: int | None) -> list[str]:
    """
    Format a new further_reading item with proper indentation.
    Returns list of formatted lines.
    """
    list_prefix = ' ' * list_indent + '- link: '
    # Calculate sub-item indent to align with the "l" in "link"
    if sub_indent is None:
        sub_indent = len(list_prefix) - len('link: ')
    
    return [
        list_prefix + blog_url,
        ' ' * sub_indent + 'tag: Blog',
        ' ' * sub_indent + 'text: ' + (blog_title or "Related blog post")
    ]


def create_new_further_reading_section(yaml_text: str, blog_url: str, blog_title: str | None) -> str:
    """Create a new further_reading section when one doesn't exist."""
    title = blog_title or "Related blog post"
    new_section = f'\n\nfurther_reading:\n  - link: {blog_url}\n    tag: Blog\n    text: {title}\n'
    
    if yaml_text.strip():
        return yaml_text.rstrip() + new_section
    else:
        return 'further_reading:\n  - link: ' + blog_url + '\n    tag: Blog\n    text: ' + title + '\n'


def insert_item_into_further_reading(lines: list[str], section_start: int, section_end: int, 
                                     blog_url: str, blog_title: str | None) -> str:
    """Insert a new item into an existing further_reading section."""
    list_indent, sub_indent = detect_indentation_patterns(lines, section_start, section_end)
    
    # Use defaults if needed
    if list_indent is None:
        list_indent = 2
    if sub_indent is None:
        sub_indent = list_indent + 2
    
    # Find the last line of the further_reading list
    last_item_line = section_end - 1
    for i in range(section_end - 1, section_start, -1):
        if lines[i].strip() and lines[i].startswith(' ' * list_indent):
            last_item_line = i
            break
    
    # Format and insert the new item
    new_item_lines = format_new_further_reading_item(blog_url, blog_title, list_indent, sub_indent)
    updated_lines = lines[:last_item_line + 1] + new_item_lines + lines[last_item_line + 1:]
    
    return '\n'.join(updated_lines)


def safe_update_further_reading(md_file: Path, blog_url: str, blog_title: str | None) -> tuple[bool, str]:
    """
    Edit YAML frontmatter surgically, preserving exact original formatting.
    Only modifies the 'further_reading' section by appending to existing list.
    Returns (updated_bool, status_str).
    """
    # Parse the file
    delim, yaml_text, body = split_frontmatter(md_file)
    if delim != "---":
        return (False, "skipped:non-yaml-frontmatter")

    try:
        meta = load_yaml_preserve(yaml_text)
    except Exception as e:
        return (False, f"skipped:yaml-parse-error:{e}")

    # Get further_reading list
    further_reading = meta.get("further_reading", [])
    if not isinstance(further_reading, list):
        return (False, "skipped:unexpected-further_reading-type")

    # Check if link already exists
    if link_already_exists_in_further_reading(further_reading, blog_url):
        return (False, "noop:already-present")

    # Update the YAML text surgically
    lines = yaml_text.split('\n')
    section_start, section_end = find_further_reading_section(lines)
    
    if section_start is None:
        # Create new further_reading section
        new_yaml = create_new_further_reading_section(yaml_text, blog_url, blog_title)
    else:
        # Insert into existing section
        new_yaml = insert_item_into_further_reading(lines, section_start, section_end, blog_url, blog_title)
    
    # Write the updated file
    new_text = f"---\n{new_yaml}\n---\n{body}"
    md_file.write_text(new_text, encoding="utf-8")
    return (True, "updated")


# ----------------------------
# Repo mapping & PR helpers
# ----------------------------

def docs_path(repo_root: Path, docs_url: str) -> Path | None:
    """
    Map a docs URL to a Hugo content file, trying common patterns.
    """
    rel = urlparse(docs_url).path.strip("/")  # e.g., tracing/guide/ignoring_apm_resources
    candidates = [
        repo_root / "content" / "en" / rel / "index.md",
        repo_root / "content" / "en" / rel / "_index.md",
        repo_root / "content" / "en" / f"{rel}.md",
    ]
    for c in candidates:
        if c.exists():
            return c
    return None




# ----------------------------
# Main editing flow
# ----------------------------

def update_docs_with_blog_links(
    repo_root: Path,
    blog_url: str,
    doc_urls: list[str],
    branch: str,
    dry_run: bool = False,
) -> dict:
    """
    For each docs URL: map to repo file, update further_reading, and commit locally.
    - dry_run: no edits, no branch.
    Script does NOT push or create PRs - user must manually push and create PR.
    """
    out = {"branch": None, "changes": []}
    title = clean_title(fetch_title(blog_url))

    for d in doc_urls:
        # Skip integration docs (pattern-based exclusion) - check before path resolution
        if d.startswith("https://docs.datadoghq.com/integrations"):
            out["changes"].append({"doc": d, "status": "skipped:integration-doc", "file": "N/A"})
            continue
            
        path = docs_path(repo_root, d)
        if not path:
            out["changes"].append({"doc": d, "status": "skipped:not-found"})
            continue
        
        # Check if this document is in the exclude list
        relative_path = str(path.relative_to(repo_root))
            
        # Skip docs in the EXCLUDED_DOCS list
        if d in EXCLUDED_DOCS or relative_path in EXCLUDED_DOCS.values():
            out["changes"].append({"doc": d, "status": "skipped:excluded", "file": relative_path})
            continue
            
        if dry_run:
            out["changes"].append({"doc": d, "status": "would-update", "file": relative_path})
            continue
        updated, status = safe_update_further_reading(path, blog_url, title)
        out["changes"].append({
            "doc": d,
            "status": "updated" if updated else status,
            "file": relative_path,
        })

    any_updates = any(c["status"] == "updated" for c in out["changes"])

    if dry_run:
        out["branch"] = "(no branch created)"
        return out

    # Stage & commit if changes exist
    if any_updates:
        run(["git", "add", "."], cwd=repo_root)
        commit_msg = f"add '{title}' link(s) to further_reading in relevant docs\n\nSource: {blog_url}" if title else f"add blog link(s) to further_reading in relevant docs\n\nSource: {blog_url}"
        run(["git", "commit", "-m", commit_msg], cwd=repo_root)
        out["branch"] = branch
    else:
        out["branch"] = branch + " (no changes)"

    return out


# ----------------------------
# Output formatting
# ----------------------------

def print_readable_summary(results: list) -> None:
    """
    Print a readable summary of the results instead of JSON.
    """
    if not results:
        print("No blog posts processed.")
        return
    
    # Collect summary data
    blog_links_reviewed = []
    documents_updated = []
    documents_unable_to_update = []
    
    for result in results:
        blog_url = result.get("blog", "")
        pub_date = result.get("published", "")
        # Store as tuple (url, date)
        blog_links_reviewed.append((blog_url, pub_date))
        
        changes = result.get("changes", [])
        for change in changes:
            doc_url = change.get("doc", "")
            status = change.get("status", "")
            file_path = change.get("file", "")
            
            if status == "updated":
                documents_updated.append(f"{doc_url} ({file_path})")
            elif status not in ["noop:already-present", "skipped:excluded", "skipped:integration-doc"]:
                documents_unable_to_update.append(f"{doc_url} ({status})")
    
    # Print SUMMARY section
    print("\nSUMMARY")
    print("=" * 50)
    
    print("\nBlog links reviewed:")
    for link, pub_date in blog_links_reviewed:
        if pub_date:
            print(f"- {link} ({pub_date})")
        else:
            print(f"- {link}")
    
    print("\nDocuments updated:")
    if documents_updated:
        for doc in documents_updated:
            print(f"- {doc}")
    else:
        print("- None")
    
    print("\nDocuments unable to update:")
    if documents_unable_to_update:
        for doc in documents_unable_to_update:
            print(f"- {doc}")
    else:
        print("- None")
    
    # Print DETAILS section
    print("\n\nDETAILS")
    print("=" * 50)
    
    for i, result in enumerate(results, 1):
        blog_url = result.get("blog", "")
        pub_date = result.get("published", "")
        changes = result.get("changes", [])
        
        if pub_date:
            print(f"\n{i}. {blog_url} ({pub_date})")
        else:
            print(f"\n{i}. {blog_url}")
        
        # Separate changes by status
        updated_changes = [c for c in changes if c.get("status") == "updated"]
        unable_changes = [c for c in changes if c.get("status") not in ["updated", "noop:already-present", "skipped:excluded", "skipped:integration-doc"]]
        
        if updated_changes:
            print("   documents updated:")
            for change in updated_changes:
                doc_url = change.get("doc", "")
                file_path = change.get("file", "")
                print(f"      {doc_url} ({file_path})")
        
        if unable_changes:
            print("   documents unable to update:")
            for change in unable_changes:
                doc_url = change.get("doc", "")
                status = change.get("status", "")
                print(f"      {doc_url} ({status})")
        
        if not updated_changes and not unable_changes:
            print("   no documents linked")
    
    # Add final newline
    print()


# ----------------------------
# CLI
# ----------------------------

def main():
    ap = argparse.ArgumentParser(
        description="Pull new Datadog blog posts and update docs further_reading.",
        epilog="Run this script from the documentation repository root, or use --repo to specify the path."
    )
    ap.add_argument("--rss", default=BLOG_RSS, help="RSS URL (default: Datadog blog index.xml)")
    ap.add_argument("--repo", required=False, help="Path to local documentation repo (default: current directory)")
    ap.add_argument("--since", type=int, default=14, help="Only process posts published in the last N days (default: 14)")
    ap.add_argument("--limit", type=int, default=20, help="Max items to process (default: 20)")
    ap.add_argument("--latest", type=int, default=None, help="Process the most recent N items (ignores --since)")
    ap.add_argument("--dry-run", action="store_true", help="Do not modify files, do not create a branch")
    args = ap.parse_args()

    feed = feedparser.parse(args.rss)
    entries = feed.entries
    now = time.time()

    # Choose entries
    if args.latest:
        # Process the N most recent items regardless of age
        sorted_entries = sorted(entries, key=lambda x: x.get("published_parsed") or time.gmtime(0), reverse=True)
        new_entries = sorted_entries[: args.latest]
    else:
        # Process posts from the last N days (default: 14 days)
        new_entries = []
        sorted_entries = sorted(entries, key=lambda x: x.get("published_parsed") or time.gmtime(0), reverse=True)
        
        for e in sorted_entries:
            if not e.get("published_parsed"):
                continue
            age_days = (now - time.mktime(e.published_parsed)) / 86400.0
            if age_days > args.since:
                continue
            new_entries.append(e)
            if len(new_entries) >= args.limit:
                break

    # Determine repository path (use --repo or current directory)
    repo_root = Path(args.repo).resolve() if args.repo else Path.cwd()
    
    # Verify we're in a docs repo
    if not (repo_root / "content" / "en").exists():
        print(f"ERROR: {repo_root} does not appear to be a documentation repository.", file=sys.stderr)
        print("Expected to find content/en/ directory.", file=sys.stderr)
        print("\nPlease run this script from the documentation repository root:", file=sys.stderr)
        print("  cd /path/to/documentation", file=sys.stderr)
        print("  make update-blog-links", file=sys.stderr)
        sys.exit(1)
    
    # Create ONE branch for the entire run (if not dry-run)
    run_branch = None
    if not args.dry_run:
        git_user = get_git_username(repo_root)
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        run_branch = f"{git_user}/blog-links-update-{timestamp}"
        
        print(f"Creating branch: {run_branch}")
        
        # Create and switch to the branch ONCE for this run
        run(["git", "checkout", "master"], cwd=repo_root)
        run(["git", "pull", "origin", "master"], cwd=repo_root)
        run(["git", "checkout", "-b", run_branch], cwd=repo_root)

    results = []
    for e in sorted(new_entries, key=lambda x: x.get("published_parsed") or time.gmtime(0)):
        blog_url = normalize_url(e.link)
        
        # Format publication date
        pub_date = None
        if e.get("published_parsed"):
            pub_date = time.strftime("%Y-%m-%d", e.published_parsed)

        # Extract docs links and canonicalize before mapping
        docs = fetch_blog_links(blog_url)
        docs = [canonicalize_docs_url(d) for d in docs]

        summary = {"blog": blog_url, "published": pub_date, "docs": docs}
        if docs:
            fx = update_docs_with_blog_links(
                repo_root,
                blog_url,
                docs,
                branch=run_branch, 
                dry_run=args.dry_run,
            )
            summary.update(fx)
        else:
            summary.update({"branch": None, "changes": []})

        results.append(summary)
    
    # Print readable summary
    print_readable_summary(results)
    
    # Print next steps if a branch was created
    if run_branch and any(r.get("changes") for r in results):
        any_actual_updates = any(
            c.get("status") == "updated" 
            for r in results 
            for c in r.get("changes", [])
        )
        if any_actual_updates:
            print("\n" + "=" * 50)
            print("NEXT STEPS")
            print("=" * 50)
            print(f"\nBranch created: {run_branch}")
            print("\nTo push and create a PR:")
            print(f"  cd {repo_root}")
            print(f"  git push -u origin {run_branch}")
            print("  # Then create a PR on GitHub\n")


if __name__ == "__main__":
    main()
