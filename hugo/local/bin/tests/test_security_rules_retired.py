"""Render retired-rule behavior with the production templates and a small Hugo site.

Run from hugo/: HUGO_BIN=/path/to/hugo python3 local/bin/tests/test_security_rules_retired.py
"""
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import unittest


HUGO_ROOT = Path(__file__).resolve().parents[3]
LANGUAGES = ("en", "fr", "ja", "ko", "es")
REMOVED = ("def-000-zyx", "def-002-s3d")
RETAINED = ("def-000-m2c", "def-000-2nd", "def-000-ee1")


class RetiredRuleRenderingTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        binary = os.environ.get("HUGO_BIN") or shutil.which("hugo")
        if not binary:
            candidate = HUGO_ROOT / "node_modules/.bin/hugo"
            if candidate.exists():
                binary = str(candidate)
        if not binary:
            raise unittest.SkipTest("Install Hugo or set HUGO_BIN to run rendering checks")
        cls.temp = tempfile.TemporaryDirectory()
        cls.addClassCleanup(cls.temp.cleanup)
        cls.root = Path(cls.temp.name)

        def write(name, content):
            path = cls.root / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content)

        def copy(name):
            write(name, (HUGO_ROOT / name).read_text())

        config = (HUGO_ROOT / "config/_default/config.yaml").read_text()
        ignore = config[config.index("ignoreFiles:"):config.index("\npublishDir:")]
        write("hugo.yaml", """baseURL: https://example.com/
defaultContentLanguage: en
languages:
  en:
    contentDir: content/en
  fr:
    contentDir: content/fr
  ja:
    contentDir: content/ja
  ko:
    contentDir: content/ko
  es:
    contentDir: content/es
outputs:
  home: [HTML, Search, Redirects, URLMap]
outputFormats:
  Search:
    baseName: search
    isPlainText: true
    mediaType: application/json
  Redirects:
    baseName: redirects
    isPlainText: true
    mediaType: text/plain
  URLMap:
    baseName: urlmap
    isPlainText: true
    mediaType: application/json
""" + ignore)
        copy("data/security_rules_retired.yaml")
        manifest = (HUGO_ROOT / "data/security_rules_retired.yaml").read_text()
        cls.inactive = re.findall(r"^  - (def-[\w-]+)$", manifest.split("inactive:\n", 1)[1], re.M)
        for name in (
            "layouts/security_rules/list.html",
            "layouts/security_rules/single.html",
            "layouts/partials/grouped-item-listings.html",
            "layouts/partials/algolia/page-sections.json",
            "layouts/_default/list.search.json",
            "layouts/_default/list.redirects.txt",
            "layouts/_default/list.urlmap.json",
            "layouts/sitemap.xml",
            "layouts/sitemapindex.xml",
        ):
            copy(name)
        write("layouts/_default/baseof.html", '{{ block "main" . }}{{ end }}')
        write("layouts/_default/list.html", '{{ define "main" }}{{ .Content }}{{ end }}')
        for name, content in {
            "breadcrumbs.html": "",
            "integrations-logo.html": '{{ return "" }}',
            "img-resource.html": "image.svg",
            "icon.html": "",
            "translate_status_banner/translate_status_banner.html": "",
            "algolia/api-pages-full-index.json": "",
            "algolia/standard-attributes.json": "",
            "algolia/glossary.json": "",
        }.items():
            write("layouts/partials/" + name, content)
        for lang in LANGUAGES:
            write(f"content/{lang}/_index.md", "---\ntitle: Docs\n---\n")
            write(f"content/{lang}/security/_index.md", "---\ntitle: Security\n---\n")
            directory = f"content/{lang}/security/default_rules"
            write(f"{directory}/_index.md", "---\ntitle: OOTB Rules\ntype: security_rules\n---\n")
            for rule in (*REMOVED, *cls.inactive, *RETAINED):
                category = "Cloud Security Misconfigurations" if rule.endswith("ee1") else "Attack Paths"
                metadata = dict(title=rule, type="security_rules", source="aws", scope="s3", rule_category=[category],
                                view_rule_url=f"https://app.example.com/rules/{rule}",
                                view_findings_url=f"https://app.example.com/findings/{rule}")
                body = "## Description\nReference information.\n"
                if rule in cls.inactive:
                    body = "This rule is being deprecated on 18 November 2026.\n\n" + body
                write(f"{directory}/{rule}.md", json.dumps(metadata) + "\n" + body)
        subprocess.run([binary, "--source", str(cls.root), "--environment", "live"], check=True)
        cls.public = cls.root / "public"

    def test_all_languages_remove_pages_and_catalog_entries(self):
        self.assertEqual(len(self.inactive), 30)
        for lang in LANGUAGES:
            prefix = "" if lang == "en" else lang + "/"
            directory = self.public / prefix / "security/default_rules"
            catalog = (directory / "index.html").read_text()
            for rule in (*REMOVED, *self.inactive):
                self.assertNotIn(f'data-name="{rule}', catalog)
            for rule in REMOVED:
                self.assertFalse((directory / rule / "index.html").exists())
            for rule in RETAINED:
                self.assertIn(f'data-name="{rule}', catalog)
            for rule in self.inactive:
                page = (directory / rule / "index.html").read_text()
                self.assertIn("no longer generates new findings", page)
                self.assertIn("18 November 2026", page)
                self.assertNotIn("VIEW RULE IN DATADOG", page)
                self.assertIn(f"https://app.example.com/findings/{rule}", page)
            self.assertIn("VIEW RULE IN DATADOG", (directory / RETAINED[0] / "index.html").read_text())

    def test_search_sitemap_and_urlmap(self):
        records = json.loads((self.public / "search.json").read_text())
        for lang in LANGUAGES:
            prefix = "" if lang == "en" else lang + "/"
            for rule in REMOVED:
                self.assertFalse(any(f"/{rule}/" in r["full_url"] for r in records))
            for rule in self.inactive:
                matches = [r for r in records if r["language"] == lang and f"/{rule}/" in r["full_url"]]
                self.assertTrue(matches, (lang, rule))
                self.assertTrue(all(r["title"].endswith(" (inactive)") for r in matches))
            for rule in RETAINED:
                self.assertTrue(any(r["language"] == lang and f"/{rule}/" in r["full_url"] for r in records))
        sitemap = "".join(p.read_text() for p in self.public.rglob("*.xml"))
        urlmap = (self.public / "urlmap.json").read_text()
        for rule in REMOVED:
            self.assertNotIn(rule, sitemap)
            self.assertNotIn(rule, urlmap)
        for rule in (*self.inactive, *RETAINED):
            self.assertIn(rule, sitemap)

    def test_redirects_survive_ignored_page_aliases(self):
        redirects = (self.public / "redirects.txt").read_text().splitlines()
        for lang in LANGUAGES:
            prefix = "" if lang == "en" else lang + "/"
            target = f"/{prefix}security/default_rules/"
            for rule in (*REMOVED, "sec-issue-aws-public-s3-sensitive"):
                for route in ("security/default_rules", "security_monitoring/default_rules", "security_platform/default_rules", "cloud_siem/default_rules"):
                    for suffix in ("/", ".md"):
                        self.assertIn(f"{prefix}{route}/{rule}{suffix} {target}", redirects)


if __name__ == "__main__":
    unittest.main()
