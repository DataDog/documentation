#!/usr/bin/env python3
"""
Extract configuration keys from the Feature Parity Registry for a specific language.

This script filters the registry down to a single language, returning only the
configuration keys that language supports, with the relevant description, type,
default value, and supported version range.

## Usage
  python3 scripts/extract_registry_by_language.py --language python

## Output
  output/registry_<language>.json — array of configuration keys for that language.
"""

import argparse
import json
import os
import re
from datetime import datetime, timezone

import requests

REGISTRY_URL = "https://dd-feature-parity.azurewebsites.net/configurations/"

# Maps registry language names to Hugo code_lang output filenames.
# When a registry language maps to multiple Hugo pages (e.g. dotnet),
# the same data is written to each output file.
LANGUAGE_TO_OUTPUT_FILES = {
    "golang": ["go"],
    "dotnet": ["dotnet-core", "dotnet-framework"],
    "nodejs": ["nodejs"],
    "python": ["python"],
    "java": ["java"],
    "ruby": ["ruby"],
    "php": ["php"],
    "rust": ["rust"],
    "cpp": ["cpp"],
}

# Versions at or below this threshold are considered "initial" and the "Since"
# field is hidden (the config existed from the start of registry tracking).
# Use bare semver (no "v" prefix). Configs with from_version <= threshold
# won't display a "Since" badge.
SINCE_THRESHOLDS = {
    "golang": "2.3.0",
    "java": "1.54.0",
    "ruby": "2.22.0",
    "dotnet": "3.37.0",
    "python": "3.12.0",    # TODO: update to real initial version once known
    "rust": "0.1.0",
    "php": "1.1.1",         # TODO: update to real initial version once known
    "cpp": "1.1.1",         # TODO: update to real initial version once known
    "nodejs": "5.55.0",
}


def parse_semver(version_str: str) -> tuple:
    """Extract a (major, minor, patch) tuple from a version string.

    Handles formats like "v1.2.3", "1.2.3", "1.54", and
    "datadog-opentelemetry-v0.1.0" (strips known prefixes).
    Returns (0, 0, 0) if unparseable.
    """
    if not version_str:
        return (0, 0, 0)
    # Strip known non-semver prefixes (e.g. "datadog-opentelemetry-v0.1.0")
    match = re.search(r'v?(\d+\.\d+(?:\.\d+)?)', version_str)
    if not match:
        return (0, 0, 0)
    parts = match.group(1).split(".")
    major = int(parts[0])
    minor = int(parts[1]) if len(parts) > 1 else 0
    patch = int(parts[2]) if len(parts) > 2 else 0
    return (major, minor, patch)


def normalize_version(version_str: str) -> str:
    """Normalize a version string to always have a 'v' prefix and 3-part semver.

    "1.54" -> "v1.54.0", "v2.3.0" -> "v2.3.0",
    "datadog-opentelemetry-v0.1.0" -> "v0.1.0"
    Returns empty string if unparseable.
    """
    sem = parse_semver(version_str)
    if sem == (0, 0, 0) and version_str:
        return version_str  # can't parse, return as-is
    return f"v{sem[0]}.{sem[1]}.{sem[2]}"


def fetch_registry_configurations() -> list[dict]:
    """
    Fetch all configuration entries from the Feature Parity Registry.

    Each entry represents a Datadog env var (e.g. DD_AGENT_HOST) and contains
    an array of "configurations" (versioned definitions with per-language
    implementation details).
    """
    print(f"Fetching configurations from {REGISTRY_URL} ...")
    resp = requests.get(REGISTRY_URL, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    print(f"  Received {len(data)} registry entries")
    return data


def extract_for_language(registry_entries: list[dict], language: str) -> list[dict]:
    """
    Filter registry entries to only those implemented by the given language.

    For each registry entry, we iterate over its configuration versions and
    check if any implementation matches the requested language. When a match
    is found, we extract:
      - name:          the env var name (e.g. DD_AGENT_HOST)
      - display_name:  human-friendly name from the registry
      - description:   full description of this version's behavior
      - short_description: brief summary
      - type:          data type (string, boolean, int, etc.)
      - default_value: default if not set (can differ per version/language)
      - from_version:  earliest library version supporting this key
      - to_version:    latest library version supporting this key (or "latest")
      - deprecated:    whether this version is deprecated
      - aliases:       alternative env var names for this version
      - implem_aliases: alternative env var names from the best implementation

    If multiple implementations exist for the same language within a version
    (e.g. different branch ranges), we take the one with the broadest range
    (i.e. the one whose "to" is "latest", or the last one listed).
    """
    results = []

    for entry in registry_entries:
        entry_name = entry["name"]
        display_name = entry.get("displayName", "")

        for config in entry.get("configurations", []):
            # Find implementations matching the requested language
            matching_impls = [
                impl for impl in config.get("implementations", [])
                if impl.get("language", "").lower() == language.lower()
            ]

            if not matching_impls:
                continue

            # Pick the best implementation: prefer the one that goes to "latest",
            # otherwise take the last one (typically the most recent)
            best_impl = matching_impls[0]
            for impl in matching_impls:
                if impl.get("to") == "latest":
                    best_impl = impl
                    break

            results.append({
                "name": entry_name,
                "description": config.get("description"),
                "type": config.get("type"),
                "default_value": config.get("defaultValue"),
                "from_version": best_impl.get("from"),
                "to_version": best_impl.get("to"),
                "deprecated": config.get("deprecated", False),
                "aliases": config.get("aliases", []),
                "implem_aliases": best_impl.get("aliases", []),
            })

    # Sort alphabetically by env var name for consistent output
    results.sort(key=lambda x: x["name"])
    return results


def load_category_lookup(output_dir):
    """
    Load config_category_descriptions_registry.json and build a lookup dict
    mapping each config key name to its category info.

    Returns:
        key_to_category: dict mapping key name -> {"category": str}
            For trace_integrations keys, also includes "integration_name" and
            "integration_pattern".
    """
    categories_path = os.path.join(output_dir, "config_category_descriptions_registry.json")
    if not os.path.exists(categories_path):
        print(f"Warning: {categories_path} not found — skipping category assignment")
        return {}

    with open(categories_path) as f:
        data = json.load(f)

    key_to_category = {}

    for cat in data.get("categories", []):
        cat_id = cat["id"]

        # Regular keys listed directly
        for key in cat.get("keys", []):
            key_to_category[key] = {"category": cat_id}

        # Integration keys (trace_integrations category)
        if "integrations" in cat:
            for integration_name, key_pattern_map in cat["integrations"].items():
                for key, pattern in key_pattern_map.items():
                    key_to_category[key] = {
                        "category": cat_id,
                        "integration_name": integration_name,
                        "integration_pattern": pattern,
                    }

    return key_to_category


def annotate_categories(results, key_to_category):
    """Add category, integration_name, and integration_pattern fields to each config entry."""
    for entry in results:
        info = key_to_category.get(entry["name"], {})
        entry["category"] = info.get("category", "other")
        if "integration_name" in info:
            entry["integration_name"] = info["integration_name"]
            entry["integration_pattern"] = info["integration_pattern"]


def process_versions(results, language):
    """Normalize from_version to 'vX.Y.Z' format and remove it when at or below the threshold."""
    threshold_str = SINCE_THRESHOLDS.get(language)
    threshold = parse_semver(threshold_str) if threshold_str else None

    for entry in results:
        raw = entry.get("from_version")
        if not raw:
            entry["from_version"] = None
            continue

        normalized = normalize_version(raw)
        sem = parse_semver(raw)

        if threshold and sem <= threshold:
            entry["from_version"] = None
        else:
            entry["from_version"] = normalized


def main():
    parser = argparse.ArgumentParser(
        description="Extract registry configuration keys for a specific language."
    )
    parser.add_argument(
        "--language",
        nargs="*",
        default=list(LANGUAGE_TO_OUTPUT_FILES.keys()),
        help="Language(s) to extract (default: all). Options: python, java, golang, nodejs, dotnet, ruby, php, rust, cpp",
    )
    parser.add_argument(
        "--output-dir",
        default=os.path.join(os.path.dirname(__file__), "..", "..", "data", "registry"),
        help="Path to the output directory (default: ../../../data/registry/)",
    )
    args = parser.parse_args()

    languages = [lang.lower() for lang in args.language]
    output_dir = os.path.abspath(args.output_dir)

    invalid = [lang for lang in languages if lang not in LANGUAGE_TO_OUTPUT_FILES]
    if invalid:
        valid = ", ".join(sorted(LANGUAGE_TO_OUTPUT_FILES))
        parser.error(f"Unknown language(s): {', '.join(invalid)}. Valid options: {valid}")

    # Fetch all entries from the registry once
    registry_entries = fetch_registry_configurations()
    os.makedirs(output_dir, exist_ok=True)

    # Load category lookup from the categories file (produced by registry_generate_categories.py)
    key_to_category = load_category_lookup(output_dir)

    for language in languages:
        results = extract_for_language(registry_entries, language)
        annotate_categories(results, key_to_category)
        process_versions(results, language)

        output = {
            "metadata": {
                "generated_at": datetime.now(timezone.utc).isoformat(),
                "language": language,
                "total_registry_entries": len(registry_entries),
                "matched_entries": len(results),
            },
            "configurations": results,
        }

        for output_name in LANGUAGE_TO_OUTPUT_FILES[language]:
            output_path = os.path.join(output_dir, f"{output_name}.json")
            with open(output_path, "w") as f:
                json.dump(output, f, indent=2, ensure_ascii=False)
            print(f"Generated {output_path}")

        print(f"  Language: {language} — {len(results)} configurations")


if __name__ == "__main__":
    main()
