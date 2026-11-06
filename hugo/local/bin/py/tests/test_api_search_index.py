"""Render the API search template with Hugo, without full-site dependencies.

Run with: HUGO_BIN=/path/to/hugo python3 local/bin/py/tests/test_api_search_index.py
"""

import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


HUGO_ROOT = Path(__file__).resolve().parents[4]


class ApiSearchIndexTest(unittest.TestCase):
    def render_record(self, renamed=True, shared=False, localized=False):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)

            def write(path, content):
                target = root / path
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(content)

            write("hugo.toml", 'baseURL = "https://example.org/"\ndisableKinds = ["taxonomy", "term", "RSS", "sitemap"]\n')
            write("content/api/latest/case-management/_index.md", '---\ntitle: Work Management\ntype: api\n---\n')
            operation = {
                "operationId": "WatchCase",
                "summary": "Watch a work item" if renamed else "Watch a case",
                "description": "Watch updates.",
            }
            if renamed:
                operation["x-docs-original-summary"] = "Watch a case"
            for version in ("v1", "v2"):
                paths = {"/api/v2/cases/{case_id}/watchers": {"post": operation}} if shared or version == "v2" else {}
                write(f"data/api/{version}/full_spec_deref.json", json.dumps({"paths": paths}))
            write("data/operation.json", json.dumps(operation))
            translations = {"WatchCase": {"summary": "Surveiller un dossier"}} if localized else {}
            write("data/translations.json", json.dumps(translations))
            for partial in ("algolia/api-page-index.json", "api/load-specs.html"):
                target = root / "layouts/partials" / partial
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(HUGO_ROOT / "layouts/partials" / partial, target)
            write("layouts/index.html", '''
{{ $page := .Site.GetPage "/api/latest/case-management" }}
{{ partial "algolia/api-page-index.json" (dict
    "context" . "page" $page "title" $page.Title "lang" "en"
    "api_version" "v2" "endpoint_data" .Site.Data.operation
    "endpoint_path" "/api/v2/cases/{case_id}/watchers" "method" "post"
    "translate_actions" .Site.Data.translations) }}
{{ .Scratch.Get "algoliaindex" | jsonify | safeHTML }}
''')
            subprocess.run([os.environ.get("HUGO_BIN", "hugo"), "--source", str(root)], check=True, capture_output=True, text=True)
            record = json.loads((root / "public/index.html").read_text())
            return record[0] if isinstance(record, list) else record

    def test_display_name_keeps_original_url(self):
        record = self.render_record()
        self.assertEqual(record["section_header"], "Watch a work item")
        self.assertEqual(record["relpermalink"], "/api/latest/case-management/watch-a-case/")
        self.assertEqual(record["full_url"], "https://example.org/api/latest/case-management/watch-a-case/")

    def test_unrenamed_operation(self):
        record = self.render_record(renamed=False)
        self.assertEqual(record["section_header"], "Watch a case")
        self.assertEqual(record["relpermalink"], "/api/latest/case-management/watch-a-case/")

    def test_shared_versions_keep_display_title_tab_anchor(self):
        record = self.render_record(shared=True)
        self.assertEqual(record["relpermalink"], "/api/latest/case-management/watch-a-case/#watch-a-work-item-v2")

    def test_localized_label_does_not_change_url(self):
        record = self.render_record(localized=True)
        self.assertEqual(record["section_header"], "Surveiller un dossier")
        self.assertEqual(record["relpermalink"], "/api/latest/case-management/watch-a-case/")


if __name__ == "__main__":
    unittest.main()
