#!/usr/bin/env python3
"""
Extract and generate configuration docs from the Feature Parity Registry.

Examples:
  # Export raw per-language JSON
  python3 local/bin/py/read_configs_from_feature_parity.py --language golang

  # Export JSON and generate per-product markdown docs
  python3 local/bin/py/read_configs_from_feature_parity.py --language golang --generate-docs
"""

import argparse
import json
import os
import re
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone

REGISTRY_URL = "https://dd-feature-parity.azurewebsites.net/configurations/"

PRODUCTS = {
    "DD_AI_GUARD": {
        "folder": "content/en/security/ai_guard",
        "name": "ai_guard",
        "displayName": "AI Guard",
        "exampleBased": False,
        "platform": "",
        "section": "Additional configurations",
    },
    "DD_API_SECURITY": {
        "folder": "content/en/security/application_security",
        "name": "application_security",
        "displayName": "Application Security",
        "exampleBased": True,
        "platform": "multi",
    },
    "DD_APPSEC": {
        "folder": "content/en/security/application_security",
        "name": "application_security",
        "displayName": "Application Security",
        "exampleBased": True,
        "platform": "multi",
    },
    "DD_CIVISIBILITY": {
        "folder": "content/en/tests",
        "name": "tests",
        "displayName": "Continuous Integration Visibility",
        "exampleBased": True,
        "platform": "multi",
        "skip": False,
    },
    "DD_DATA_STREAMS": {
        "folder": "content/en/data_streams",
        "name": "data_streams",
        "displayName": "Data Streams",
        "exampleBased": True,
        "platform": "multi",
    },
    "DD_DYNAMIC_INSTRUMENTATION": {
        "folder": "content/en/tracing/trace_collection/dynamic_instrumentation",
        "name": "dynamic_instrumentation",
        "displayName": "Dynamic Instrumentation",
        "exampleBased": True,
        "platform": "multi",
    },
    "DD_EXCEPTION_REPLAY": {
        "folder": "content/en/error_tracking",
        "name": "error_tracking",
        "displayName": "Error Tracking",
        "exampleBased": False,
        "platform": "",
    },
    "DD_GIT_COMMIT": {
        "folder": "content/en/tests",
        "name": "tests",
        "displayName": "Continuous Integration Visibility",
        "exampleBased": False,
        "platform": "multi",
    },
    "DD_TEST_MANAGEMENT": {
        "folder": "content/en/tests",
        "name": "tests",
        "displayName": "Continuous Integration Visibility",
        "exampleBased": False,
        "platform": "multi",
    },
    "DD_TEST_OPTIMIZATION": {
        "folder": "content/en/tests",
        "name": "tests",
        "displayName": "Continuous Integration Visibility",
        "exampleBased": False,
        "platform": "multi",
    },
    "DD_IAST_REDACTION": {
        "folder": "content/en/security/code_security/iast/",
        "name": "code_security",
        "displayName": "Code Security",
        "exampleBased": False,
        "platform": "",
    },
    "DD_METRICS_OTEL": {
        "folder": "content/en/opentelemetry",
        "name": "opentelemetry",
        "displayName": "OpenTelemetry",
        "exampleBased": False,
        "platform": "",
    },
    "DD_PROFILING": {
        "folder": "content/en/profiler",
        "name": "profiler",
        "displayName": "Profiler",
        "exampleBased": True,
        "platform": "multi",
    },
    "DD_REMOTE_CONFIG": {
        "folder": "content/en/remote_configuration",
        "name": "remote_configuration",
        "displayName": "Remote Configuration",
        "exampleBased": False,
        "platform": "",
    },
    "DD_RUNTIME_METRICS": {
        "folder": "content/en/tracing/metrics/runtime_metrics",
        "name": "runtime_metrics",
        "displayName": "Runtime Metrics",
        "exampleBased": False,
        "platform": "multi",
    },
    "DD_TRACE_": {
        "folder": "content/en/tracing/trace_collection/library_config",
        "name": "tracing",
        "displayName": "Tracing",
        "exampleBased": False,
        "platform": "multi",
    },
    "OTEL_": {
        "folder": "content/en/opentelemetry",
        "name": "opentelemetry",
        "displayName": "OpenTelemetry",
        "exampleBased": False,
        "platform": "multi",
    },
    "OTEL_EXPORTER_OTLP": {
        "folder": "content/en/opentelemetry",
        "name": "opentelemetry",
        "displayName": "OpenTelemetry",
        "exampleBased": False,
        "platform": "multi",
    },
}

CONFIGURATION_FIELD_LABEL_BY_LANGUAGE = {
    "nodejs": "Configuration",
    "php": "INI",
    "dotnet": "TracerSettings property",
}

LANGUAGE_ALIASES = {
    "go": "golang",
    "dotnet-core": "dotnet",
}

OTHER_PRODUCT = {
    "name": "other",
    "displayName": "Other",
}

TRACE_INSTRUMENTATION_ENABLED_PATTERN = re.compile(r"^DD_TRACE_[A-Z0-9_]+_ENABLED$")
COLLAPSED_TRACE_INTEGRATION_KEY = "DD_TRACE_<INTEGRATION_NAME>_ENABLED"


def fetch_registry_configurations() -> list[dict]:
    """Fetch all configuration entries from the Feature Parity Registry."""
    print(f"Fetching configurations from {REGISTRY_URL} ...")
    with urllib.request.urlopen(REGISTRY_URL, timeout=30) as response:
        data = json.load(response)
    print(f"  Received {len(data)} registry entries")
    return data


def normalize_language(language: str) -> str:
    return LANGUAGE_ALIASES.get(language.lower(), language.lower())


def build_key_language_index(registry_entries: list[dict]) -> dict[str, set[str]]:
    """
    Build an index of configuration key -> languages that implement it.
    """
    key_languages: dict[str, set[str]] = {}
    for entry in registry_entries:
        entry_name = entry.get("name")
        if not entry_name:
            continue
        for config in entry.get("configurations", []):
            for impl in config.get("implementations", []):
                language = (impl.get("language") or "").lower()
                if not language:
                    continue
                key_languages.setdefault(entry_name, set()).add(language)
    return key_languages


def pick_best_implementation(matching_impls: list[dict]) -> dict:
    """
    Pick the best implementation row for one config version.

    Prefer the one that reaches latest; otherwise use the last row, which tends
    to be the most recent definition.
    """
    best_impl = matching_impls[-1]
    for impl in matching_impls:
        if impl.get("to") == "latest":
            return impl
    return best_impl


def extract_for_language(registry_entries: list[dict], language: str) -> list[dict]:
    """
    Filter registry entries to those implemented by the requested language.

    The output keeps one row per (key, configuration version) to preserve
    historical version coverage.
    """
    results = []

    for entry in registry_entries:
        entry_name = entry.get("name")
        if not entry_name:
            continue
        entry_internal = bool(entry.get("internal"))

        for config in entry.get("configurations", []):
            matching_impls = [
                impl
                for impl in config.get("implementations", [])
                if impl.get("language", "").lower() == language
            ]
            if not matching_impls:
                continue

            best_impl = pick_best_implementation(matching_impls)

            results.append(
                {
                    "name": entry_name,
                    "description": config.get("description"),
                    "type": config.get("type"),
                    "default_value": config.get("defaultValue"),
                    "from_version": best_impl.get("from"),
                    "to_version": best_impl.get("to"),
                    "deprecated": config.get("deprecated", False),
                    "aliases": config.get("aliases", []),
                    "internal": entry_internal,
                    # Some API payloads may provide this field on implementations.
                    # If absent, markdown generation omits this line.
                    "configuration": best_impl.get("configuration"),
                }
            )

    results.sort(key=lambda x: x["name"])
    return results


def version_for_display(version: str | None) -> str | None:
    """Strip a leading 'v' for semantic versions (e.g. v1.2.3 -> 1.2.3)."""
    if not version:
        return None
    if version.startswith("v") and len(version) > 1 and version[1].isdigit():
        return version[1:]
    return version


def default_for_display(default_value) -> str:
    """Render default value according to docs requirements."""
    if default_value is None:
        return "N/A"

    if isinstance(default_value, str):
        normalized = default_value.strip()
        if normalized == "":
            return '""'
        if normalized.lower() == "null":
            return "N/A"
        return default_value

    if isinstance(default_value, bool):
        return "true" if default_value else "false"

    return str(default_value)


def description_for_display(description: str | None) -> str:
    if description is None:
        return "No description available."

    normalized = description.strip()
    if not normalized or normalized.lower() == "null":
        return "No description available."

    return description


def type_for_display(config_type: str | None) -> str:
    if config_type is None:
        return "N/A"
    normalized = str(config_type).strip()
    if not normalized or normalized.lower() == "null":
        return "N/A"
    return normalized


def format_description_for_definition_list(description: str) -> str:
    """
    Keep multiline descriptions inside the same markdown definition-list item.
    """
    lines = description.splitlines()
    if not lines:
        return description

    formatted = [lines[0]]
    for line in lines[1:]:
        if line.strip():
            formatted.append(f"  {line}")
        else:
            # Preserve paragraph/list separation within definition-list content.
            formatted.append("  ")
    return "\n".join(formatted)


def version_sort_key(version: str | None) -> tuple:
    normalized = version_for_display(version) or ""
    numbers = tuple(int(part) for part in re.findall(r"\d+", normalized))
    if numbers:
        return (0, numbers, normalized)
    return (1, (), normalized)


def find_product_for_key(key_name: str) -> dict | None:
    """Match key names against known product prefixes (longest prefix wins)."""
    for prefix in sorted(PRODUCTS.keys(), key=len, reverse=True):
        if key_name.startswith(prefix):
            return PRODUCTS[prefix]
    return None


def render_key_block(
    config_key: str,
    config_rows: list[dict],
    language: str,
    lowest_platform_version: str | None = None,
) -> str:
    """Render one definition-list markdown block for a configuration key."""
    latest = config_rows[-1]
    deprecated = bool(latest.get("deprecated"))
    suffix = " (Deprecated)" if deprecated else ""
    since_versions = []
    for row in config_rows:
        version = version_for_display(row.get("from_version"))
        if version and version not in since_versions:
            since_versions.append(version)
    since_lower_bound = min(since_versions, key=version_sort_key) if since_versions else None
    since_text = since_lower_bound if since_lower_bound else "N/A"
    show_since = True
    if (
        lowest_platform_version
        and since_lower_bound
        and len(since_versions) == 1
        and since_lower_bound == lowest_platform_version
    ):
        show_since = False

    default_text = default_for_display(latest.get("default_value"))
    type_text = type_for_display(latest.get("type"))
    description_text = format_description_for_definition_list(
        description_for_display(latest.get("description"))
    )
    configuration_value = latest.get("configuration")
    configuration_label = CONFIGURATION_FIELD_LABEL_BY_LANGUAGE.get(language, "Configuration")

    details: list[str] = []
    if show_since:
        details.append(f"**Since**: {since_text} <br>")

    if configuration_value not in (None, "", "null"):
        details.append(f"**{configuration_label}**: `{configuration_value}`<br>")

    aliases: list[str] = []
    for row in config_rows:
        for alias in row.get("aliases") or []:
            if alias != config_key and alias not in aliases:
                aliases.append(alias)
    if aliases:
        rendered_aliases = ", ".join(f"`{alias}`" for alias in aliases)
        details.append(f"**Aliases**: {rendered_aliases}<br>")

    if type_text == "N/A":
        details.append("**Type**: N/A<br>")
    else:
        details.append(f"**Type**: `{type_text}`<br>")

    if default_text == "N/A":
        details.append("**Default**: N/A<br>")
    else:
        details.append(f"**Default**: `{default_text}`<br>")

    details.append(description_text)

    lines = [f"`{config_key}{suffix}`", f": {details[0]}"]
    lines.extend(details[1:])
    return "\n".join(lines)


def find_lowest_recorded_platform_version(config_rows: list[dict]) -> str | None:
    """
    Find the earliest recorded "from version" for the current platform/language.

    When a key's only recorded "since" version equals this floor, docs can omit
    the explicit Since line because the true introduction predates registry data.
    """
    versions = {
        version_for_display(row.get("from_version"))
        for row in config_rows
        if version_for_display(row.get("from_version"))
    }
    if not versions:
        return None
    return min(versions, key=version_sort_key)


def dedupe_config_rows(rows: list[dict]) -> list[dict]:
    """
    Remove duplicate version rows for the same key while preserving order.

    Duplicate rows can appear in registry data over time. We compare the fields
    used to render output so generated docs stay stable.
    """
    seen: set[tuple] = set()
    deduped = []
    for row in rows:
        aliases = tuple(sorted(set(row.get("aliases") or [])))
        signature = (
            row.get("from_version"),
            row.get("to_version"),
            row.get("deprecated"),
            row.get("type"),
            row.get("default_value"),
            row.get("description"),
            row.get("configuration"),
            aliases,
        )
        if signature in seen:
            continue
        seen.add(signature)
        deduped.append(row)
    return deduped


def collapse_language_unique_trace_enabled_entries(
    rows_by_key: defaultdict[str, list[dict]],
    registry_language: str,
    key_language_index: dict[str, set[str]],
) -> None:
    """
    Replace many language-unique DD_TRACE_*_ENABLED entries with one synthetic entry.
    """
    collapse_keys = []
    for key in sorted(rows_by_key.keys()):
        if not TRACE_INSTRUMENTATION_ENABLED_PATTERN.match(key):
            continue
        if key_language_index.get(key) != {registry_language}:
            continue
        latest_row = rows_by_key[key][-1]
        if str(latest_row.get("type", "")).lower() != "boolean":
            continue
        default_value = latest_row.get("default_value")
        if not (
            default_value is True
            or (isinstance(default_value, str) and default_value.strip().lower() == "true")
        ):
            continue
        collapse_keys.append(key)
    if not collapse_keys:
        return

    all_rows = []
    for key in collapse_keys:
        all_rows.extend(rows_by_key[key])

    since_versions = []
    for row in all_rows:
        version = row.get("from_version")
        if version and version not in since_versions:
            since_versions.append(version)
    since_versions.sort(key=version_sort_key)

    instrumentation_names = [
        key.removeprefix("DD_TRACE_").removesuffix("_ENABLED") for key in collapse_keys
    ]

    description_lines = [
        "Enables/disables instrumentations. When disabled, no span operations are not created for the specific instrumentation.",
        "",
        "Integrations:",
        "",
    ]
    description_lines.extend(f"- {name}" for name in instrumentation_names)
    aggregated_description = "\n".join(description_lines)

    synthetic_rows = []
    if since_versions:
        for version in since_versions:
            synthetic_rows.append(
                {
                    "from_version": version,
                    "deprecated": False,
                    "type": "boolean",
                    "default_value": True,
                    "description": aggregated_description,
                    "configuration": None,
                }
            )
    else:
        synthetic_rows.append(
            {
                "from_version": None,
                "deprecated": False,
                "type": "boolean",
                "default_value": True,
                "description": aggregated_description,
                "configuration": None,
            }
        )

    for key in collapse_keys:
        rows_by_key.pop(key, None)
    rows_by_key[COLLAPSED_TRACE_INTEGRATION_KEY] = synthetic_rows


def generate_markdown_docs(
    config_rows: list[dict],
    output_language: str,
    registry_language: str,
    docs_root: str,
    key_language_index: dict[str, set[str]],
) -> list[str]:
    """
    Generate per-product markdown docs for one language.

    Output format:
      content/en/tracing/trace_collection/library_config/<language>/<product_name>.md
    """
    grouped_by_product: dict[str, dict] = {}
    lowest_platform_version = find_lowest_recorded_platform_version(config_rows)
    for row in config_rows:
        if row.get("internal"):
            continue
        product = find_product_for_key(row["name"])
        if product and product.get("skip"):
            continue
        if not product:
            product = OTHER_PRODUCT

        product_name = product["name"]
        config_key = row["name"].strip()
        if not config_key:
            continue

        if product_name not in grouped_by_product:
            grouped_by_product[product_name] = {
                "display_name": product["displayName"],
                "rows_by_key": defaultdict(list),
            }
        grouped_by_product[product_name]["rows_by_key"][config_key].append(row)

    language_dir = os.path.join(docs_root, output_language)
    os.makedirs(language_dir, exist_ok=True)

    generated_paths = []
    for product_name, details in sorted(grouped_by_product.items()):
        display_name = details["display_name"]
        rows_by_key = details["rows_by_key"]
        collapse_language_unique_trace_enabled_entries(rows_by_key, registry_language, key_language_index)

        blocks = [f"### {display_name}", ""]
        for config_key in sorted(rows_by_key.keys()):
            deduped_rows = dedupe_config_rows(rows_by_key[config_key])
            blocks.append(
                render_key_block(
                    config_key,
                    deduped_rows,
                    registry_language,
                    lowest_platform_version=lowest_platform_version,
                )
            )
            blocks.append("")

        content = "\n".join(blocks).rstrip() + "\n"
        output_path = os.path.join(language_dir, f"{product_name}.md")
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(content)
        generated_paths.append(output_path)

    return generated_paths


def main():
    parser = argparse.ArgumentParser(
        description="Extract registry configuration keys for a specific language."
    )
    parser.add_argument(
        "--language",
        required=True,
        help="Language to filter by (for example: go, golang, java, nodejs, dotnet, ruby, php, rust, python).",
    )
    parser.add_argument(
        "--output-dir",
        default=os.path.join(os.path.dirname(__file__), "..", "output"),
        help="Path to the JSON output directory (default: ../output).",
    )
    parser.add_argument(
        "--generate-docs",
        action="store_true",
        help="Generate per-product markdown docs under content/en/tracing/trace_collection/library_config/<language>/.",
    )
    parser.add_argument(
        "--docs-root",
        default=os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                "..",
                "..",
                "..",
                "content",
                "en",
                "tracing",
                "trace_collection",
                "library_config",
            )
        ),
        help="Base docs path for generated markdown (default: content/en/tracing/trace_collection/library_config).",
    )
    parser.add_argument(
        "--output-language",
        default=None,
        help="Override the output language directory name. Defaults to --language value.",
    )
    args = parser.parse_args()

    requested_language = args.language.lower()
    registry_language = normalize_language(requested_language)
    output_language = (args.output_language or requested_language).lower()
    output_dir = os.path.abspath(args.output_dir)

    registry_entries = fetch_registry_configurations()
    key_language_index = build_key_language_index(registry_entries)
    results = extract_for_language(registry_entries, registry_language)

    output = {
        "metadata": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "language": registry_language,
            "requested_language": requested_language,
            "total_registry_entries": len(registry_entries),
            "matched_entries": len(results),
        },
        "configurations": results,
    }

    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, f"registry_{requested_language}.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\nGenerated {output_path}")
    print(f"  Registry language: {registry_language}")
    print(f"  Matched configurations: {len(results)}")

    if args.generate_docs:
        generated_paths = generate_markdown_docs(
            results,
            output_language,
            registry_language,
            os.path.abspath(args.docs_root),
            key_language_index,
        )
        print(f"  Generated markdown files: {len(generated_paths)}")
        for path in generated_paths:
            print(f"    - {path}")


if __name__ == "__main__":
    main()
