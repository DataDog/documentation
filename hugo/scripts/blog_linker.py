#!/usr/bin/env python3
"""
RSS Blog to Docs Linker
Automatically adds Datadog blog post links to the further_reading section
of relevant documentation pages by parsing the blog RSS feed.
"""

import argparse
import re
import subprocess
import sys
import time
from functools import lru_cache
from pathlib import Path
from typing import NamedTuple
from urllib.parse import urlparse, urlunparse
import feedparser
from io import StringIO
import requests
from bs4 import BeautifulSoup
from ruamel.yaml import YAML
from ruamel.yaml.comments import CommentedMap

# Configure YAML parser for frontmatter editing
yaml_rt = YAML()
yaml_rt.preserve_quotes = True
yaml_rt.indent(mapping=2, sequence=4, offset=2)

# ----------------------------
# Config
# ----------------------------

BLOG_RSS = "https://www.datadoghq.com/blog/index.xml"
DOCS_HOST = "docs.datadoghq.com"

# Further Reading section content to add to markdown body
FURTHER_READING_HEADING = "## Further reading"
FURTHER_READING_PARTIAL = '{{< partial name="whats-next/whats-next.html" >}}'

# Exclude list - documents that should not be modified
# Maps docs URLs to their file paths (either can be used for exclusion)
EXCLUDED_DOCS = {
    "https://docs.datadoghq.com/security/default_rules/": "content/en/security/default_rules/_index.md"
}

# URL patterns for automatic exclusion
# Documents matching these patterns will be automatically skipped
EXCLUDED_URL_PATTERNS = [
    ("https://docs.datadoghq.com/integrations", "integration-doc"),
    ("https://docs.datadoghq.com/api/", "api-doc"),
]

# Blog slug patterns to exclude from processing.
# Recurring digest and roundup posts touch many products shallowly, so they are
# excluded at the source rather than judged against each docs page they mention.
EXCLUDED_BLOG_PATTERNS = [
    re.compile(r"/blog/this-month-in-datadog"),  # monthly digest
    re.compile(r"/blog/[^/]*roundup"),           # DASH and feature roundups
]

# Per-document outcomes that are deliberate non-writes. They are reported under
# "Skipped" so an unattended run shows which pages were passed over and why.
REPORTED_SKIP_STATUSES = (
    "skipped:integration-doc",
    "skipped:api-doc",
    "skipped:generated-file",
)

# Outcomes that need no report: the page is either done or intentionally out of scope.
QUIET_STATUSES = ("updated", "noop:already-present", "skipped:excluded")

# Ordering for further_reading entries, by tag. Entries are grouped like-with-like
# and the groups appear in this sequence; anything not listed sorts to the end,
# grouped by tag name. Sorting is stable, so order within a group never changes.
# Tags render in all caps on the site, so comparison is case-insensitive.
TAG_ORDER = [
    "documentation",
    "guide",
    "faq",
    "api",
    "glossary",
    "concept",
    "best practices",
    "learning center",
    "foundation enablement",
    "knowledge center",
    "blog",
    "video",
    "release notes",
    "external site",
    "source code",
    "architecture center",
    "app",
]
TAG_RANK = {tag: i for i, tag in enumerate(TAG_ORDER)}

# Spelling variants folded into a canonical tag before ranking. Case differences
# are handled by lowercasing, so only true variants belong here.
TAG_ALIASES = {
    "doc": "documentation",
    "documenation": "documentation",  # typo present in the docs repo
    "guides": "guide",
    "release note": "release notes",
    "external": "external site",
}

# A handful of pages use 'tag' for reading time ("3 mins") rather than a content
# type. Those blocks are deliberately ordered, so never reorder a block whose
# tags start with a digit - no real type tag does.
NON_TYPE_TAG = re.compile(r"^\d")


# ----------------------------
# URL helpers
# ----------------------------

def normalize_url(u: str) -> str:
    p = urlparse(u)
    return urlunparse((p.scheme, p.netloc, p.path.rstrip("/"), "", "", ""))


def should_exclude_url(url: str) -> tuple[bool, str | None]:
    """
    Check if a docs URL should be excluded based on pattern matching.
    Returns (should_exclude, reason) where reason is the exclusion status or None.
    """
    for pattern, reason in EXCLUDED_URL_PATTERNS:
        if url.startswith(pattern):
            return (True, f"skipped:{reason}")
    return (False, None)


def should_exclude_blog(blog_url: str) -> tuple[bool, str]:
    """
    Check if a blog URL should be excluded from processing.
    Returns (should_exclude, reason).
    """
    for pattern in EXCLUDED_BLOG_PATTERNS:
        if pattern.search(blog_url):
            return (True, "skipped:excluded-blog-pattern")
    return (False, "")


@lru_cache(maxsize=None)
def canonical_url(u: str) -> str:
    """
    Follow HTTP redirects to the canonical URL, then normalize.

    Used for both docs and blog URLs. A docs page that redirects would otherwise
    map to the wrong file, and a renamed blog post would be stored under its old
    slug, which re-adds it as a duplicate on every run because dedup compares
    URLs. Cached because the same docs pages recur across many posts.

    (Blog links already present in further_reading are not resolved: that would
    cost a request per existing entry, so a page still holding a stale slug can
    take the canonical one alongside it.)
    """
    try:
        r = requests.head(u, timeout=20, allow_redirects=True)
        if r.status_code >= 400:
            # Some pages reject HEAD; fall back to GET before giving up.
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
        # Force UTF-8: without a charset header, requests defaults to ISO-8859-1
        # and mangles curly quotes/em-dashes/accents in titles (invalid YAML).
        r.encoding = "utf-8"
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

FRONTMATTER_RE = re.compile(rb"\A---\r?\n(?P<yaml>.*?)\r?\n---\r?\n", re.DOTALL)


class ParsedDoc(NamedTuple):
    """
    A markdown file split into YAML frontmatter and body.

    yaml_text/body have their line endings normalized to '\\n' for parsing, while
    raw/body_offset keep the original bytes so the writer can splice the body back
    untouched. newline is the ending used by the frontmatter block. The writer
    rewrites the frontmatter, and appends to the body when a "Further reading"
    section has to be created, so those are the only lines whose endings we choose.
    """
    yaml_text: str
    body: str
    raw: bytes
    body_offset: int
    newline: str


def split_frontmatter(md_path: Path) -> ParsedDoc | None:
    """
    Split a markdown file into YAML '---' frontmatter and body.
    Returns None for files without YAML frontmatter, which we skip.
    """
    raw = md_path.read_bytes()
    m = FRONTMATTER_RE.match(raw)
    if not m:
        return None

    body_offset = m.end()
    # Detect the ending from the frontmatter alone. Some files mix endings, and
    # the frontmatter is the only part whose endings we get to choose; judging by
    # the whole file would flip a mostly-LF file to CRLF over one stray CRLF line.
    newline = "\r\n" if b"\r\n" in raw[:body_offset] else "\n"

    def to_text(b: bytes) -> str:
        return b.decode("utf-8").replace("\r\n", "\n")

    return ParsedDoc(
        yaml_text=to_text(m.group("yaml")),
        body=to_text(raw[body_offset:]),
        raw=raw,
        body_offset=body_offset,
        newline=newline,
    )


def load_yaml_preserve(yaml_text: str):
    data = yaml_rt.load(StringIO(yaml_text)) or CommentedMap()
    if not isinstance(data, CommentedMap):
        # Force into CommentedMap to allow stable reordering
        cm = CommentedMap()
        for k, v in (data or {}).items():
            cm[k] = v
        data = cm
    return data


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
                # List items may sit at indent 0, so a leading '-' is still inside
                # the section; only an unindented key ends it. Without the '-' the
                # section looks empty whenever the list is not indented.
                if lines[j].strip() and not lines[j].startswith((' ', '\t', '-')):
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
    sub_indent = min(sub_item_indents, default=None)

    return (list_indent, sub_indent)


def quote_yaml_value(value: str) -> str:
    """
    Wrap a value in double quotes for YAML, escaping any internal double quotes.
    This prevents issues with colons and special characters in values.
    """
    # Escape any existing double quotes in the value
    escaped = value.replace('"', '\\"')
    return f'"{escaped}"'


def ensure_trailing_slash(u: str) -> str:
    """
    Add a trailing slash to a blog link before writing it. Blog URLs are canonical
    with a trailing slash; the stripped form (from normalize_url) 301-redirects.
    Applied only when emitting the stored 'link:' value, not when comparing/deduping.
    """
    return u if u.endswith("/") else u + "/"


def format_new_further_reading_item(blog_url: str, blog_title: str | None, list_indent: int, sub_indent: int | None) -> list[str]:
    """
    Format a new further_reading item with proper indentation.
    Returns list of formatted lines.
    All values are quoted to handle colons and special characters.
    """
    list_prefix = ' ' * list_indent + '- link: '
    # Calculate sub-item indent to align with the "l" in "link"
    if sub_indent is None:
        sub_indent = len(list_prefix) - len('link: ')

    title = blog_title or "Related blog post"

    return [
        list_prefix + quote_yaml_value(ensure_trailing_slash(blog_url)),
        ' ' * sub_indent + 'tag: ' + quote_yaml_value("Blog"),
        ' ' * sub_indent + 'text: ' + quote_yaml_value(title)
    ]


def create_new_further_reading_section(yaml_text: str, blog_url: str, blog_title: str | None) -> str:
    """Create a new further_reading section when one doesn't exist.
    All values are quoted to handle colons and special characters."""
    title = blog_title or "Related blog post"
    quoted_url = quote_yaml_value(ensure_trailing_slash(blog_url))
    quoted_tag = quote_yaml_value("Blog")
    quoted_title = quote_yaml_value(title)
    # Single newline before the section and no trailing blank line, so the
    # generated frontmatter has no stray blanks around further_reading.
    new_section = f'\nfurther_reading:\n- link: {quoted_url}\n  tag: {quoted_tag}\n  text: {quoted_title}'

    if yaml_text.strip():
        return yaml_text.rstrip() + new_section
    else:
        return f'further_reading:\n- link: {quoted_url}\n  tag: {quoted_tag}\n  text: {quoted_title}'


def normalize_tag(raw: str) -> str:
    """Lowercase a tag and fold spelling variants, for ranking only."""
    tag = raw.strip().strip('"').strip("'").strip().lower()
    return TAG_ALIASES.get(tag, tag)


def item_tag(item_lines: list[str]) -> str:
    """Return the normalized tag of a further_reading item, or '' if it has none."""
    for line in item_lines:
        m = re.match(r'^[\s-]*tag:\s*(.*?)\s*$', line)
        if m:
            return normalize_tag(m.group(1))
    return ""


def tag_sort_key(tag: str) -> tuple[int, str]:
    """
    Rank a tag for ordering. Known tags sort by their position in TAG_ORDER;
    the second element is empty because the rank already identifies the group.
    Unknown tags all share the last rank and group by name, so like stays with
    like. Callers must use a stable sort to preserve order within a group.
    """
    if tag in TAG_RANK:
        return (TAG_RANK[tag], "")
    return (len(TAG_ORDER), tag)


def parse_further_reading_items(lines: list[str], section_start: int, section_end: int,
                                list_indent: int) -> tuple[list[tuple[str, list[str]]] | None, list[str]]:
    """
    Split a further_reading block into items, keeping each item's lines verbatim.
    An item starts at a '- ' line at list_indent and runs until the next one.

    Returns (items, trailing), where items is a list of (tag, lines) and trailing
    is any blank lines after the last item. Returns (None, []) when the block has
    a shape whose reordering would be ambiguous - a standalone comment, a blank
    line between items, or content before the first item - so the caller can fall
    back to appending rather than relocate the wrong lines.
    """
    prefix = ' ' * list_indent + '-'
    items: list[list[str]] = []
    trailing: list[str] = []
    current: list[str] | None = None

    for line in lines[section_start + 1:section_end]:
        stripped = line.strip()
        if stripped.startswith('#'):
            return (None, [])  # comment ownership is ambiguous
        if not stripped:
            trailing.append(line)  # only valid at the very end
            continue
        if trailing:
            return (None, [])  # blank line in the middle of the block
        is_item_start = line.startswith(prefix) and line[len(prefix):len(prefix) + 1] in ('', ' ', '\t')
        if is_item_start:
            current = [line]
            items.append(current)
        elif current is None:
            return (None, [])  # content before the first item
        else:
            current.append(line)

    if not items:
        return (None, [])
    return ([(item_tag(item), item) for item in items], trailing)


def can_reorder(items: list[tuple[str, list[str]]]) -> bool:
    """Blocks that use 'tag' for something other than a content type are left alone."""
    return not any(NON_TYPE_TAG.match(tag) for tag, _ in items)


def insert_item_into_further_reading(lines: list[str], section_start: int, section_end: int,
                                     blog_url: str, blog_title: str | None) -> str:
    """
    Insert a new item into an existing further_reading section.

    Where the block can be parsed unambiguously, the whole block is re-sorted by
    tag so the new entry lands in its conventional position and existing drift is
    corrected. Items are moved as intact runs of their original lines, never
    re-serialized, so quoting, indentation and spacing are preserved exactly.
    Otherwise the item is appended to the end of the list, as it always was.
    """
    list_indent, sub_indent = detect_indentation_patterns(lines, section_start, section_end)

    # Use defaults if needed
    if list_indent is None:
        list_indent = 2
    if sub_indent is None:
        sub_indent = list_indent + 2

    # Format the new item
    new_item_lines = format_new_further_reading_item(blog_url, blog_title, list_indent, sub_indent)

    # Reordering is a nicety; adding the link is the point. If anything here goes
    # wrong, warn and fall through to the append path rather than abort the run.
    try:
        items, trailing = parse_further_reading_items(lines, section_start, section_end, list_indent)
        if items is not None and can_reorder(items):
            items.append((normalize_tag("Blog"), new_item_lines))
            # Stable, so the new entry lands at the end of the existing Blog group
            # and every other group keeps its internal order.
            items.sort(key=lambda item: tag_sort_key(item[0]))
            block = [line for _, item_lines in items for line in item_lines]
            updated_lines = lines[:section_start + 1] + block + trailing + lines[section_end:]
            return '\n'.join(updated_lines)
    except Exception as e:
        print(f"WARNING: could not reorder further_reading, appending instead: {e}",
              file=sys.stderr)

    # Find the last line of the further_reading list
    last_item_line = section_end - 1
    for i in range(section_end - 1, section_start, -1):
        if lines[i].strip() and lines[i].startswith(' ' * list_indent):
            last_item_line = i
            break

    # Append the new item
    updated_lines = lines[:last_item_line + 1] + new_item_lines + lines[last_item_line + 1:]

    return '\n'.join(updated_lines)


def safe_update_further_reading(md_file: Path, blog_url: str, blog_title: str | None) -> tuple[bool, str]:
    """
    Edit YAML frontmatter surgically, preserving exact original formatting.
    Only modifies the 'further_reading' section by appending to existing list.
    Also adds the Further Reading section and partial to the body if missing.
    Returns (updated_bool, status_str).
    """
    # Parse the file
    doc = split_frontmatter(md_file)
    if doc is None:
        return (False, "skipped:non-yaml-frontmatter")

    try:
        meta = load_yaml_preserve(doc.yaml_text)
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
    lines = doc.yaml_text.split('\n')
    section_start, section_end = find_further_reading_section(lines)

    if section_start is None:
        # Create new further_reading section
        new_yaml = create_new_further_reading_section(doc.yaml_text, blog_url, blog_title)
    else:
        # Insert into existing section
        new_yaml = insert_item_into_further_reading(lines, section_start, section_end, blog_url, blog_title)

    def with_endings(text: str) -> bytes:
        return text.replace("\n", doc.newline).encode("utf-8")

    # Rewrite the frontmatter, then splice the body back as its original bytes.
    # The body is either untouched or only appended to, so files that mix line
    # endings keep theirs instead of being rewritten whole.
    out = with_endings(f"---\n{new_yaml}\n---\n")
    body_bytes = doc.raw[doc.body_offset:]
    if has_further_reading_section(doc.body):
        out += body_bytes
    else:
        out += body_bytes.rstrip() + with_endings(
            f"\n\n{FURTHER_READING_HEADING}\n\n{FURTHER_READING_PARTIAL}\n"
        )

    md_file.write_bytes(out)
    return (True, "updated")


# ----------------------------
# Further Reading body section
# ----------------------------

def has_further_reading_section(body: str) -> bool:
    """
    Check if the markdown body already has a Further Reading section.
    Looks for the heading (case-insensitive) or the partial.
    """
    body_lower = body.lower()
    return (
        "## further reading" in body_lower or
        'partial name="whats-next/whats-next.html"' in body
    )


# ----------------------------
# Repo mapping
# ----------------------------

# Directories under the repo root that may hold the Hugo tree, in priority order.
# The documentation repo moved everything under 'hugo/' in August 2026 to make room
# for an Astro build; '' keeps older checkouts and branches working.
CONTENT_BASES = ["hugo", ""]


def find_content_base(repo_root: Path) -> Path | None:
    """
    Return the directory containing the Hugo 'content/en' tree, or None if the
    repo does not look like a documentation checkout. Paths are reported relative
    to this base, so they stay the same on either layout.
    """
    for base in CONTENT_BASES:
        candidate = repo_root / base if base else repo_root
        if (candidate / "content" / "en").exists():
            return candidate
    return None


@lru_cache(maxsize=None)
def gitignored_content(content_base: Path) -> frozenset[str]:
    """
    Content paths that git ignores, relative to content_base.

    Some docs pages are pulled from other repositories at build time and are
    gitignored in the documentation repo. Writing to one succeeds and reports
    success, but the edit is discarded the next time the build fetches it, so
    those pages have to be skipped rather than silently lost.

    Returns an empty set if git is unavailable, which loses the check but never
    blocks a run.
    """
    try:
        completed = subprocess.run(
            ["git", "-C", str(content_base), "ls-files", "--others", "--ignored",
             "--exclude-standard", "--", "content/en"],
            capture_output=True, text=True, timeout=60, check=True,
        )
    except Exception:
        return frozenset()
    return frozenset(completed.stdout.split("\n")) - {""}


def docs_path(content_base: Path, docs_url: str) -> Path | None:
    """
    Map a docs URL to a Hugo content file, trying common patterns.
    """
    rel = urlparse(docs_url).path.strip("/")  # e.g., tracing/guide/ignoring_apm_resources
    candidates = [
        content_base / "content" / "en" / rel / "index.md",
        content_base / "content" / "en" / rel / "_index.md",
        content_base / "content" / "en" / f"{rel}.md",
    ]
    for c in candidates:
        if c.exists():
            return c
    return None




# ----------------------------
# Main editing flow
# ----------------------------

def update_docs_with_blog_links(
    content_base: Path,
    blog_url: str,
    doc_urls: list[str],
    dry_run: bool = False,
) -> dict:
    """
    For each docs URL: map to repo file, update further_reading.
    - dry_run: no edits.
    Script does NOT interact with Git - user manages their own Git workflow.
    """
    out = {"changes": []}
    title = clean_title(fetch_title(blog_url))

    for d in doc_urls:
        # Check URL pattern exclusions
        excluded, exclusion_reason = should_exclude_url(d)
        if excluded:
            out["changes"].append({"doc": d, "status": exclusion_reason, "file": "N/A"})
            continue

        path = docs_path(content_base, d)
        if not path:
            out["changes"].append({"doc": d, "status": "skipped:not-found"})
            continue

        # Relative to the content base, not the repo root, so the value matches
        # EXCLUDED_DOCS (and reads the same) on either repo layout.
        relative_path = str(path.relative_to(content_base))

        # Skip docs in the EXCLUDED_DOCS list
        if d in EXCLUDED_DOCS or relative_path in EXCLUDED_DOCS.values():
            out["changes"].append({"doc": d, "status": "skipped:excluded", "file": relative_path})
            continue

        # Skip pages the build pulls from another repo; edits to them are discarded
        if relative_path in gitignored_content(content_base):
            out["changes"].append({"doc": d, "status": "skipped:generated-file", "file": relative_path})
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

    return out


# ----------------------------
# Output formatting
# ----------------------------

def shorten_docs_url(url: str) -> str:
    """Remove the https://docs.datadoghq.com prefix for cleaner output."""
    prefix = "https://docs.datadoghq.com"
    if url.startswith(prefix):
        return url[len(prefix):]
    return url


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
    documents_skipped = []

    for result in results:
        blog_url = result.get("blog", "")
        pub_date = result.get("published", "")
        status = result.get("status", "")  # Will be set for excluded blogs
        # Store as tuple (url, date, status)
        blog_links_reviewed.append((blog_url, pub_date, status))

        changes = result.get("changes", [])
        for change in changes:
            doc_url = shorten_docs_url(change.get("doc", ""))
            status = change.get("status", "")

            if status == "updated":
                documents_updated.append(doc_url)
            elif status in REPORTED_SKIP_STATUSES:
                documents_skipped.append(f"{doc_url} ({status.split(':', 1)[1]})")
            elif status not in QUIET_STATUSES:
                documents_unable_to_update.append(f"{doc_url} ({status})")

    # Print SUMMARY section
    print("\nSUMMARY")
    print("=" * 50)

    print("\nBlog links reviewed:")
    for link, pub_date, status in blog_links_reviewed:
        status_suffix = f" [{status}]" if status else ""
        if pub_date:
            print(f"- {link} ({pub_date}){status_suffix}")
        else:
            print(f"- {link}{status_suffix}")

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

    print("\nSkipped:")
    if documents_skipped:
        for doc in documents_skipped:
            print(f"- {doc}")
    else:
        print("- None")

    # Print DETAILS section
    print("\n\nDETAILS")
    print("=" * 50)

    # Filter out excluded blogs from details
    non_excluded_results = [r for r in results if not r.get("status", "").startswith("skipped:")]
    
    for i, result in enumerate(non_excluded_results, 1):
        blog_url = result.get("blog", "")
        pub_date = result.get("published", "")
        changes = result.get("changes", [])
        docs = result.get("docs", [])

        # Calculate indent based on number width (accounts for double digits)
        number_width = len(str(i)) + 2  # +2 for ". "
        indent = " " * number_width

        if pub_date:
            print(f"\n{i}. {blog_url} ({pub_date})")
        else:
            print(f"\n{i}. {blog_url}")

        # Separate changes by status
        updated_changes = [c for c in changes if c.get("status") == "updated"]
        already_present_changes = [c for c in changes if c.get("status") == "noop:already-present"]
        skipped_changes = [c for c in changes if c.get("status") in REPORTED_SKIP_STATUSES]
        unable_changes = [c for c in changes
                          if c.get("status") not in QUIET_STATUSES + REPORTED_SKIP_STATUSES]

        if updated_changes:
            print(f"{indent}documents updated:")
            for change in updated_changes:
                doc_url = shorten_docs_url(change.get("doc", ""))
                print(f"{indent}   {doc_url}")

        if unable_changes:
            print(f"{indent}documents unable to update:")
            for change in unable_changes:
                doc_url = shorten_docs_url(change.get("doc", ""))
                status = change.get("status", "")
                print(f"{indent}   {doc_url} ({status})")

        if skipped_changes:
            print(f"{indent}skipped:")
            for change in skipped_changes:
                doc_url = shorten_docs_url(change.get("doc", ""))
                reason = change.get("status", "").split(":", 1)[-1]
                print(f"{indent}   {doc_url} ({reason})")

        # Determine the appropriate message when no updates were made
        if not updated_changes and not unable_changes and not skipped_changes:
            if not docs:
                # Blog didn't link to any docs pages
                print(f"{indent}no docs links found in blog")
            elif already_present_changes:
                # Blog had docs links, but they were all already present
                print(f"{indent}all docs already have this blog linked ({len(already_present_changes)} docs)")

    # Add final newline
    print()


# ----------------------------
# CLI
# ----------------------------

def parse_date_arg(s: str, flag: str) -> str:
    """Validate a YYYY-MM-DD CLI date, exiting with a clear error if malformed."""
    try:
        time.strptime(s, "%Y-%m-%d")
        return s
    except ValueError:
        print(f"ERROR: {flag} must be a valid date in YYYY-MM-DD format (got {s!r}).", file=sys.stderr)
        sys.exit(1)


def main():
    ap = argparse.ArgumentParser(
        description="Pull new Datadog blog posts and update docs further_reading.",
        epilog=(
            "Run this script from the documentation repository root, or use --repo to specify the path.\n"
            "To back-fill a specific window, use --start-date/--end-date, e.g. "
            "--start-date 2026-06-01 --end-date 2026-06-30. Note the RSS feed is a rolling window "
            "(roughly the last two months of posts), so ranges older than that return no entries."
        )
    )
    ap.add_argument("--rss", default=BLOG_RSS, help="RSS URL (default: Datadog blog index.xml)")
    ap.add_argument("--repo", required=False, help="Path to local documentation repo (default: current directory)")
    ap.add_argument("--since", type=int, default=14, help="Only process posts published in the last N days (default: 14)")
    ap.add_argument("--limit", type=int, default=None,
                    help="Max items to process (default: no limit, oldest posts dropped first)")
    ap.add_argument("--latest", type=int, default=None, help="Process the most recent N items (ignores --since)")
    ap.add_argument("--start-date", dest="start_date", default=None,
                    help="Only process posts published on or after this date (YYYY-MM-DD, inclusive). "
                         "Takes precedence over --since.")
    ap.add_argument("--end-date", dest="end_date", default=None,
                    help="Only process posts published on or before this date (YYYY-MM-DD, inclusive). "
                         "Takes precedence over --since.")
    ap.add_argument("--dry-run", action="store_true", help="Do not modify files")
    args = ap.parse_args()

    # Validate and reconcile the date-range flags.
    if args.start_date:
        args.start_date = parse_date_arg(args.start_date, "--start-date")
    if args.end_date:
        args.end_date = parse_date_arg(args.end_date, "--end-date")

    use_date_range = bool(args.start_date or args.end_date)

    if use_date_range and args.latest is not None:
        print("ERROR: --latest cannot be combined with --start-date/--end-date "
              "(--latest ignores publish dates).", file=sys.stderr)
        sys.exit(1)

    if args.start_date and args.end_date and args.start_date > args.end_date:
        print(f"ERROR: --start-date ({args.start_date}) must not be after "
              f"--end-date ({args.end_date}).", file=sys.stderr)
        sys.exit(1)

    feed = feedparser.parse(args.rss)
    entries = feed.entries
    now = time.time()

    # Choose entries
    if args.latest:
        # Process the N most recent items regardless of age
        sorted_entries = sorted(entries, key=lambda x: x.get("published_parsed") or time.gmtime(0), reverse=True)
        new_entries = sorted_entries[: args.latest]
    elif use_date_range:
        # Process posts published within an inclusive [start-date, end-date] window.
        # Dates are compared as YYYY-MM-DD strings, which sorts correctly for ISO dates
        # and avoids timezone/day-boundary issues.
        start = args.start_date or "0000-00-00"
        end = args.end_date or "9999-99-99"
        new_entries = []
        sorted_entries = sorted(entries, key=lambda x: x.get("published_parsed") or time.gmtime(0), reverse=True)

        for e in sorted_entries:
            if not e.get("published_parsed"):
                continue
            pub_day = time.strftime("%Y-%m-%d", e.published_parsed)
            if start <= pub_day <= end:
                new_entries.append(e)

        if not new_entries:
            # The feed is a rolling window; a range outside it legitimately matches nothing.
            feed_days = sorted(
                time.strftime("%Y-%m-%d", e.published_parsed)
                for e in entries if e.get("published_parsed")
            )
            span = f"{feed_days[0]} to {feed_days[-1]}" if feed_days else "unknown"
            print(f"No posts found published between {start} and {end}.", file=sys.stderr)
            print(f"The RSS feed currently spans {span}; ranges outside this window "
                  f"return no entries.", file=sys.stderr)
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

    # Truncation is the last step in selection, and it is loud: silently processing
    # only part of a window looks identical to a window that had nothing else in it.
    if args.limit is not None and len(new_entries) > args.limit:
        print(f"WARNING: {len(new_entries)} posts selected but --limit is {args.limit}; "
              f"keeping the {args.limit} most recent and skipping the rest.", file=sys.stderr)
        new_entries = new_entries[: args.limit]

    # Determine repository path (use --repo or current directory)
    repo_root = Path(args.repo).expanduser().resolve() if args.repo else Path.cwd()

    # Verify we're in a docs repo, and locate the Hugo tree within it
    content_base = find_content_base(repo_root)
    if content_base is None:
        print(f"ERROR: {repo_root} does not appear to be a documentation repository.", file=sys.stderr)
        print("Expected to find hugo/content/en/ or content/en/ directory.", file=sys.stderr)
        print("\nPlease run this script from the documentation repository root:", file=sys.stderr)
        print("  cd /path/to/documentation", file=sys.stderr)
        print("  make update-blog-links", file=sys.stderr)
        sys.exit(1)

    results = []
    seen_blogs = set()
    for e in sorted(new_entries, key=lambda x: x.get("published_parsed") or time.gmtime(0)):
        # Resolve redirects so a renamed post is stored under its current slug
        blog_url = canonical_url(e.link)

        # Format publication date
        pub_date = None
        if e.get("published_parsed"):
            pub_date = time.strftime("%Y-%m-%d", e.published_parsed)

        # Two feed entries can resolve to the same post after a rename
        if blog_url in seen_blogs:
            continue
        seen_blogs.add(blog_url)

        # Check if this blog should be excluded
        excluded, exclusion_reason = should_exclude_blog(blog_url)
        if excluded:
            summary = {"blog": blog_url, "published": pub_date, "docs": [], "changes": [], "status": exclusion_reason}
            results.append(summary)
            continue

        # Extract docs links and canonicalize before mapping. A post that cannot be
        # fetched is recorded and skipped: aborting here would leave the files
        # already written this run as a partial, unexplained diff.
        try:
            docs = [canonical_url(d) for d in fetch_blog_links(blog_url)]
        except Exception as exc:
            results.append({"blog": blog_url, "published": pub_date, "docs": [], "changes": [],
                            "status": f"error:fetch-failed:{type(exc).__name__}"})
            continue

        summary = {"blog": blog_url, "published": pub_date, "docs": docs}
        if docs:
            fx = update_docs_with_blog_links(
                content_base,
                blog_url,
                docs,
                dry_run=args.dry_run,
            )
            summary.update(fx)
        else:
            summary.update({"changes": []})

        results.append(summary)

    # Print readable summary
    print_readable_summary(results)

    # Print next steps if files were updated
    any_actual_updates = any(
        c.get("status") == "updated" 
        for r in results 
        for c in r.get("changes", [])
    )

    if any_actual_updates and not args.dry_run:
        print("\n" + "=" * 50)
        print("NEXT STEPS")
        print("=" * 50)
        print("\nFiles have been updated on your current branch.")
        print("\nTo commit and push your changes:")
        print("  git add .")
        print("  git commit -m 'Add blog links to further_reading'")
        print("  git push")
        print("\nThen create a PR on GitHub.\n")


if __name__ == "__main__":
    main()