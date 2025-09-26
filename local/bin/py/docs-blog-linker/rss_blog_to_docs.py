#!/usr/bin/env python3
import os
import json
import time
import argparse
import subprocess
from pathlib import Path
from urllib.parse import urlparse, urlunparse
from datetime import datetime

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
STATE_FILE = ".rss_state.json"
GITHUB_API_BASE = os.getenv("GITHUB_API_BASE", "https://api.github.com")

# Exclude list - documents that should not be modified
def load_excluded_docs() -> dict:
    """Load excluded docs from JSON file"""
    excluded_file = Path(__file__).parent / "excluded_docs.json"
    if excluded_file.exists():
        try:
            data = json.loads(excluded_file.read_text())
            return data.get("excluded_docs", {})
        except Exception as e:
            print(f"Warning: Could not load excluded_docs.json: {e}")
            return {}
    return {}


# ----------------------------
# Shell utils
# ----------------------------

def run(cmd: list[str], cwd: Path | None = None) -> str:
    p = subprocess.run(cmd, cwd=cwd, text=True, capture_output=True)
    if p.returncode != 0:
        raise RuntimeError(f"Command failed: {' '.join(cmd)}\n{p.stdout}\n{p.stderr}")
    return p.stdout.strip()


# ----------------------------
# State
# ----------------------------

def load_state() -> dict:
    p = Path(STATE_FILE)
    if p.exists():
        return json.loads(p.read_text())
    return {"processed": []}


def save_state(state: dict) -> None:
    Path(STATE_FILE).write_text(json.dumps(state, indent=2))


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


def safe_update_further_reading(md_file: Path, blog_url: str, blog_title: str | None) -> tuple[bool, str]:
    """
    Edit YAML frontmatter surgically, preserving exact original formatting.
    Only modifies the 'further_reading' section by appending to existing list.
    Returns (updated_bool, status_str).
    """
    delim, yaml_text, body = split_frontmatter(md_file)
    if delim != "---":
        return (False, "skipped:non-yaml-frontmatter")

    try:
        meta = load_yaml_preserve(yaml_text)
    except Exception as e:
        return (False, f"skipped:yaml-parse-error:{e}")

    fr = meta.get("further_reading")
    if fr is None:
        fr = []
    elif not isinstance(fr, list):
        return (False, "skipped:unexpected-further_reading-type")

    norm = blog_url.rstrip("/")
    existing = set()
    for item in fr:
        if isinstance(item, dict):
            link = (item.get("link") or "").rstrip("/")
            if link:
                existing.add(link)

    if norm in existing:
        # No changes needed, return without modifying the file
        return (False, "noop:already-present")

    # Instead of re-dumping the entire YAML, surgically append to the further_reading section
    # Find the further_reading section in the original YAML text and append to it
    new_item = {
        "link": blog_url,
        "tag": "Blog", 
        "text": blog_title or "Related blog post",
    }
    
    # Parse the YAML to find the further_reading section position
    lines = yaml_text.split('\n')
    fr_start = None
    fr_end = None
    indent_level = None
    sub_indent_level = None
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith('further_reading:'):
            fr_start = i
            # Find the indentation level by looking at ALL existing items
            # This ensures we match the existing pattern, even if it's no indentation
            list_item_indents = []
            sub_item_indents = []
            
            for j in range(i + 1, len(lines)):
                next_line = lines[j]
                if next_line.strip() and not next_line.startswith(' '):
                    # Found next top-level key
                    fr_end = j
                    break
                elif next_line.strip():
                    # Found a line (could be indented or not)
                    current_indent = len(next_line) - len(next_line.lstrip())
                    if next_line.strip().startswith('- '):
                        # This is a list item
                        list_item_indents.append(current_indent)
                    elif current_indent > 0:  # Only count sub-items that are actually indented
                        # This is a sub-item (like "tag:" or "text:")
                        sub_item_indents.append(current_indent)
            
            # Use the most common indentation pattern, or 0 if no indentation is used
            if list_item_indents:
                # If all items have the same indentation, use that; otherwise use 0
                if len(set(list_item_indents)) == 1:
                    indent_level = list_item_indents[0]
                else:
                    # Mixed indentation - use 0 (no indentation) as it's more common
                    indent_level = 0
            else:
                # No existing items, use 0 (no indentation)
                indent_level = 0
                
            if sub_item_indents:
                sub_indent_level = min(sub_item_indents)  # Use the smallest sub-indentation
            
            if fr_end is None:
                fr_end = len(lines)
            break
    
    if fr_start is None:
        # No further_reading section found, add it at the end
        if yaml_text.strip():
            new_yaml = yaml_text.rstrip() + '\n\nfurther_reading:\n  - link: ' + blog_url + '\n    tag: Blog\n    text: ' + (blog_title or "Related blog post") + '\n'
        else:
            new_yaml = 'further_reading:\n  - link: ' + blog_url + '\n    tag: Blog\n    text: ' + (blog_title or "Related blog post") + '\n'
    else:
        # Insert new item at the end of the further_reading list
        if indent_level is None:
            indent_level = 2  # Default indentation
        if sub_indent_level is None:
            sub_indent_level = indent_level + 2  # Default sub-indentation
        
        # Find the last item in the further_reading list
        last_item_line = fr_end - 1
        for i in range(fr_end - 1, fr_start, -1):
            if lines[i].strip() and lines[i].startswith(' ' * indent_level):
                last_item_line = i
                break
        
        # Insert the new item after the last item with matching indentation
        # Calculate proper alignment: sub-items should align with the "l" in "link"
        list_item_prefix = ' ' * indent_level + '- link: '
        sub_item_indent = len(list_item_prefix) - len('link: ')  # Align with the "l" in "link"
        
        new_item_lines = [
            list_item_prefix + blog_url,
            ' ' * sub_item_indent + 'tag: Blog',
            ' ' * sub_item_indent + 'text: ' + (blog_title or "Related blog post")
        ]
        
        # Reconstruct the YAML
        new_lines = lines[:last_item_line + 1] + new_item_lines + lines[last_item_line + 1:]
        new_yaml = '\n'.join(new_lines)
    
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


def get_origin_repo_slug(repo_root: Path) -> tuple[str, str]:
    """
    Returns (host, owner/repo) from the 'origin' remote.
    """
    url = run(["git", "remote", "get-url", "origin"], cwd=repo_root).rstrip(".git")
    host = "github.com"
    owner_repo = ""
    if url.startswith("git@"):
        host = url.split("@", 1)[1].split(":", 1)[0]
        owner_repo = url.split(":", 1)[1]
    elif url.startswith("https://") or url.startswith("http://"):
        parts = url.split("/")
        host = parts[2]
        owner_repo = "/".join(parts[3:])
    return host, owner_repo


def create_or_get_github_pr(repo_root: Path, branch: str, title: str, body: str, base: str = "master") -> str | None:
    """
    Creates a PR from `branch` into `base` on GitHub. Requires ddtool authentication.
    Returns PR html_url, or None if creation fails.
    """
    # ddtool handles authentication, so we don't need a token
    # Just make the API call and let ddtool handle auth
    _, owner_repo = get_origin_repo_slug(repo_root)
    api = GITHUB_API_BASE.rstrip("/")
    headers = {"Accept": "application/vnd.github+json"}

    # If an open PR for this branch already exists, return it
    r = requests.get(
        f"{api}/repos/{owner_repo}/pulls",
        headers=headers,
        timeout=30,
        params={"head": f"{owner_repo.split('/')[0]}:{branch}", "state": "open"},
    )
    try:
        data = r.json()
    except Exception:
        data = []
    if isinstance(data, list) and data:
        return data[0].get("html_url")

    payload = {"title": title, "head": branch, "base": base, "body": body}
    r = requests.post(f"{api}/repos/{owner_repo}/pulls", headers=headers, json=payload, timeout=30)
    if r.status_code in (200, 201):
        return r.json().get("html_url")
    return None


# ----------------------------
# Main editing flow
# ----------------------------

def update_docs_with_blog_links(
    repo_root: Path,
    blog_url: str,
    doc_urls: list[str],
    branch: str,                  # <— new param
    dry_run: bool = False,
    local_only: bool = False,
) -> dict:
    """
    For each docs URL: map to repo file, update further_reading, and commit.
    - dry_run: no edits, no branch.
    - local_only: create branch, write & commit, but do NOT push or open a PR.
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
        excluded_docs = load_excluded_docs()
            
        # Skip docs in the excluded_docs.json file
        if d in excluded_docs or relative_path in excluded_docs.values():
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

    # Stage & commit if changes exist (branch already created above)
    if any_updates:
        run(["git", "add", "."], cwd=repo_root)
        commit_msg = f"add '{title}' link(s) to further_reading in relevant docs\n\nSource: {blog_url}" if title else f"add blog link(s) to further_reading in relevant docs\n\nSource: {blog_url}"
        run(["git", "commit", "-m", commit_msg], cwd=repo_root)
    out["branch"] = branch + (" (local-only)" if local_only else "")

    # Local-only: stop here (no push, no PR)
    if local_only:
        return out

    # Push and open PR if changes exist
    if any_updates:
        run(["git", "push", "-u", "origin", branch], cwd=repo_root)
        pr_title = f"Add blog link(s) to further_reading"
        pr_body = "Automated update from RSS script.\n\nSource: " + blog_url + "\n\n```json\n" + json.dumps(out, indent=2) + "\n```"
        pr_url = create_or_get_github_pr(repo_root, branch, pr_title, pr_body, base="master")
        if pr_url:
            out["pr"] = pr_url
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
        blog_links_reviewed.append(blog_url)
        
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
    for link in blog_links_reviewed:
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
        changes = result.get("changes", [])
        
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
    ap = argparse.ArgumentParser(description="Pull new Datadog blog posts and update docs further_reading.")
    ap.add_argument("--rss", default=BLOG_RSS, help="RSS URL (default: Datadog blog index.xml)")
    ap.add_argument("--repo", required=False, help="Path to local documentation repo (enables editing)")
    ap.add_argument("--since", type=int, default=None, help="Only process posts published in the last N days")
    ap.add_argument("--limit", type=int, default=20, help="Max new items to consider")
    ap.add_argument("--latest", type=int, default=None, help="Process the most recent N items (ignores state/--since)")
    ap.add_argument("--dry-run", action="store_true", help="Do not modify files, do not create a branch")
    ap.add_argument("--local-only", action="store_true",
                    help="Make local changes and commit to a new branch, but do NOT push or open a PR")
    args = ap.parse_args()

    state = load_state()
    processed = set(state.get("processed", []))

    feed = feedparser.parse(args.rss)
    entries = feed.entries
    now = time.time()
    
    

    # Choose entries
    if args.latest:
        sorted_entries = sorted(entries, key=lambda x: x.get("published_parsed") or time.gmtime(0), reverse=True)
        new_entries = sorted_entries[: args.latest]
    else:
        new_entries = []
        
        # Sort entries by publication date (newest first) to find recent posts
        sorted_entries = sorted(entries, key=lambda x: x.get("published_parsed") or time.gmtime(0), reverse=True)
        
        for e in sorted_entries:
            guid = e.get("id") or e.get("guid") or e.get("link")
            if not guid:
                continue
            if guid in processed:
                continue
            if args.since and e.get("published_parsed"):
                age_days = (now - time.mktime(e.published_parsed)) / 86400.0
                if age_days > args.since:
                    continue
            new_entries.append(e)
            if len(new_entries) >= args.limit:
                break

    # Create ONE branch for the entire run (if we have a repo and not dry-run)
    run_branch = None
    repo_root = None
    if args.repo:
        repo_root = Path(args.repo).resolve()
        if not args.dry_run:
            git_user = os.getenv("GIT_USER", "ddtool-user")
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            run_branch = f"{git_user}/blog-links-update-{timestamp}"
            
            # Create and switch to the branch ONCE for this run
            run(["git", "checkout", "master"], cwd=repo_root)
            run(["git", "pull", "origin", "master"], cwd=repo_root)
            run(["git", "checkout", "-b", run_branch], cwd=repo_root)

    results = []
    for e in sorted(new_entries, key=lambda x: x.get("published_parsed") or time.gmtime(0)):
        guid = e.get("id") or e.get("guid") or e.get("link")
        blog_url = normalize_url(e.link)

        # Extract docs links and canonicalize before mapping
        docs = fetch_blog_links(blog_url)
        docs = [canonicalize_docs_url(d) for d in docs]

        summary = {"blog": blog_url, "docs": docs}
        if docs and args.repo:
            fx = update_docs_with_blog_links(
                repo_root,
                blog_url,
                docs,
                branch=run_branch, 
                dry_run=args.dry_run,
                local_only=args.local_only,
            )
            summary.update(fx)
        else:
            summary.update({"branch": None, "changes": []})

        results.append(summary)
        if not args.latest:
            processed.add(guid)

    state["processed"] = sorted(processed)
    save_state(state)
    
    # Print readable summary instead of JSON
    print_readable_summary(results)


if __name__ == "__main__":
    main()
