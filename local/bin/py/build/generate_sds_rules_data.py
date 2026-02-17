#!/usr/bin/env python3
"""
Generate sds_rules.json data file for the Sensitive Data Scanner library rules documentation page.

This script:
1. Reads all standard scanning rules from sds-shared-library
2. Loads data type restrictions from data/sds_rule_data_types.yaml
3. Generates data/sds_rules.json with multifilter-search format
"""

import json
import yaml
import os
from pathlib import Path
from typing import Dict, List, Any

# Paths
SCRIPT_DIR = Path(__file__).parent
DOCS_ROOT = SCRIPT_DIR.parent.parent.parent.parent
SDS_SHARED_LIB = Path.home() / "sds-shared-library"
STANDARD_RULES_DIR = SDS_SHARED_LIB / "sds" / "data" / "standard_rules"
METADATA_FILE = DOCS_ROOT / "data" / "sds_rule_data_types.yaml"
OUTPUT_FILE = DOCS_ROOT / "data" / "sds_rules.json"

# Category name mappings (display names)
CATEGORY_NAMES = {
    "credentials": "Credentials",
    "credit_cards": "Credit Cards",
    "cryptocurrency": "Cryptocurrency",
    "email_address": "Email Address",
    "iban_code": "IBAN Code",
    "ip_address": "IP Address",
    "mac_address": "MAC Address",
    "network_device_information": "Network Device Information",
    "personal_identifiable_information": "Personal Identifiable Information",
    "url": "URL"
}

def load_metadata() -> Dict[str, List[str]]:
    """Load data type restrictions from metadata file."""
    if not METADATA_FILE.exists():
        print(f"Warning: Metadata file not found at {METADATA_FILE}")
        return {}

    with open(METADATA_FILE, 'r') as f:
        metadata = yaml.safe_load(f)

    # Build a mapping of rule ID -> supported data types
    restrictions = {}
    for rule in metadata.get('restricted_rules', []):
        rule_id = rule.get('id')
        supported_types = rule.get('supported_data_types', [])
        if rule_id:
            restrictions[rule_id] = supported_types

    return restrictions, metadata.get('default_supported_data_types', ['logs', 'apm', 'rum', 'llm_obs'])

def format_data_types(types: List[str]) -> str:
    """Format data types for display."""
    if len(types) == 1 and types[0] == 'logs':
        return "Logs (Log Management)"

    # Map internal names to display names
    type_map = {
        'logs': 'Logs',
        'apm': 'APM',
        'rum': 'RUM',
        'llm_obs': 'LLM Observability',
        'observability_pipelines': 'Observability Pipelines',
        'secret_scanning': 'Secret Scanning',
        'cloud_storage': 'Cloud Storage'
    }

    display_types = [type_map.get(t, t) for t in types]

    # If it's all default types, show as "All"
    if len(display_types) == 7:
        return "All data sources"

    return ", ".join(display_types)

def load_rule(rule_file: Path) -> Dict[str, Any]:
    """Load a single rule from YAML file."""
    with open(rule_file, 'r') as f:
        return yaml.safe_load(f)

def collect_all_rules() -> List[Dict[str, Any]]:
    """Collect all rules from standard_rules directory."""
    rules = []

    if not STANDARD_RULES_DIR.exists():
        print(f"Error: Standard rules directory not found at {STANDARD_RULES_DIR}")
        return rules

    # Iterate through category directories
    for category_dir in STANDARD_RULES_DIR.iterdir():
        if not category_dir.is_dir():
            continue

        category = category_dir.name
        category_display = CATEGORY_NAMES.get(category, category.replace('_', ' ').title())

        # Iterate through rule files in category
        for rule_file in category_dir.glob("*.yaml"):
            try:
                rule = load_rule(rule_file)
                rule['_category'] = category_display
                rules.append(rule)
            except Exception as e:
                print(f"Warning: Failed to load rule from {rule_file}: {e}")

    return rules

def generate_multifilter_data(rules: List[Dict[str, Any]], restrictions: Dict[str, List[str]], default_types: List[str]) -> Dict[str, Any]:
    """Generate multifilter-search compatible data structure."""

    headers = [
        {"id": "name", "name": "Rule Name", "filter_by": False},
        {"id": "category", "name": "Category", "filter_by": True},
        {"id": "data_types", "name": "Available For", "filter_by": True}
    ]

    data = []
    for rule in rules:
        rule_id = rule.get('id', '')

        # Determine supported data types
        if rule_id in restrictions:
            supported_types = restrictions[rule_id]
        else:
            supported_types = default_types

        data_types_display = format_data_types(supported_types)

        row = {
            "name": rule.get('name', 'Unknown'),
            "category": rule.get('_category', 'Other'),
            "data_types": data_types_display
        }
        data.append(row)

    # Sort by category, then by name
    data.sort(key=lambda x: (x['category'], x['name']))

    return {
        "multifiltersearch": {
            "headers": headers,
            "data": data
        }
    }

def main():
    print(f"Generating SDS rules data...")
    print(f"  Source: {STANDARD_RULES_DIR}")
    print(f"  Metadata: {METADATA_FILE}")
    print(f"  Output: {OUTPUT_FILE}")

    # Load metadata
    restrictions, default_types = load_metadata()
    print(f"  Loaded {len(restrictions)} restricted rules")

    # Collect all rules
    rules = collect_all_rules()
    print(f"  Collected {len(rules)} rules")

    if not rules:
        print("Error: No rules found. Exiting.")
        return

    # Generate multifilter data
    output_data = generate_multifilter_data(rules, restrictions, default_types)

    # Write output
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(output_data, f, indent=2)

    print(f"✅ Generated {OUTPUT_FILE} with {len(output_data['multifiltersearch']['data'])} rules")

if __name__ == "__main__":
    main()
