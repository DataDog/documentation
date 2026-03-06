#!/usr/bin/env python3
"""
Convert security findings JSON schema to documentation format.

Usage:
    python schema_to_docs.py <schema_url_or_file> <output_dir>

Example:
    python schema_to_docs.py https://raw.githubusercontent.com/DataDog/security-findings-schema/main/jsonschema.json content/en/security/findings/
"""

import csv
import json
import re
import sys
import urllib.request
from pathlib import Path
from typing import Any, Dict, List, Tuple


def fetch_schema(source: str) -> Dict[str, Any]:
    """Fetch schema from URL or file path."""
    if source.startswith(('http://', 'https://')):
        with urllib.request.urlopen(source) as response:
            return json.loads(response.read())
    else:
        with open(source, 'r') as f:
            return json.load(f)


def load_descriptions_csv(csv_file: str) -> Dict[str, str]:
    """Load descriptions from CSV file. Returns dict mapping location to description."""
    descriptions = {}
    if not csv_file or not Path(csv_file).exists():
        return descriptions

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            location = row['Location (v2)']
            description = row['Description']
            descriptions[location] = description

    return descriptions


def get_type_display(prop: Dict[str, Any], defs: Dict[str, Any]) -> str:
    """Get display string for property type, resolving references to basic types."""
    if '$ref' in prop:
        ref_path = prop['$ref'].split('/')[-1]
        ref_def = defs.get(ref_path, {})

        # If it's an enum, it's a string
        if 'enum' in ref_def:
            return 'string'

        # If the ref has a type, use that
        if 'type' in ref_def:
            ref_type = ref_def['type']
            # For object refs with properties, just return 'object'
            if ref_type == 'object':
                return 'object'
            return ref_type

        # Otherwise it's an object
        return 'object'

    prop_type = prop.get('type', 'unknown')

    if prop_type == 'array':
        items = prop.get('items', {})
        if '$ref' in items:
            ref_name = items['$ref'].split('/')[-1]
            ref_def = defs.get(ref_name, {})

            # Resolve the item type
            if 'enum' in ref_def:
                return 'array (string)'
            elif 'type' in ref_def:
                item_type = ref_def['type']
                return f'array ({item_type})'
            else:
                return 'array (object)'

        item_type = items.get('type', 'object')
        return f'array ({item_type})'

    if prop_type == 'object':
        return 'object'

    return prop_type


def resolve_ref(ref: str, defs: Dict[str, Any]) -> Dict[str, Any]:
    """Resolve a $ref to its definition."""
    ref_name = ref.split('/')[-1]
    return defs.get(ref_name, {})


def extract_enum_values(prop: Dict[str, Any], defs: Dict[str, Any]) -> List[str]:
    """Extract enum values from a property or its reference."""
    if 'enum' in prop:
        return prop['enum']

    if '$ref' in prop:
        ref_def = resolve_ref(prop['$ref'], defs)
        if 'enum' in ref_def:
            return ref_def['enum']

    return []


def build_attribute_table(properties: Dict[str, Any], defs: Dict[str, Any], prefix: str = '', csv_descriptions: Dict[str, str] = None) -> List[Tuple[str, str, str, List[str]]]:
    """
    Build a list of attributes with their types and descriptions.
    Returns list of tuples: (name, type, description, enum_values)
    """
    attributes = []
    csv_descriptions = csv_descriptions or {}

    for prop_name, prop_def in properties.items():
        full_name = f"{prefix}{prop_name}" if prefix else prop_name
        prop_type = get_type_display(prop_def, defs)

        # Use CSV description if available, otherwise use schema description
        description = csv_descriptions.get(full_name, prop_def.get('description', ''))
        enum_values = extract_enum_values(prop_def, defs)

        attributes.append((full_name, prop_type, description, enum_values))

    return attributes


def format_attribute_table(attributes: List[Tuple[str, str, str, List[str]]], use_html: bool = False) -> str:
    """Format attributes as a markdown or HTML table."""
    if not attributes:
        return ""

    if use_html:
        lines = [
            '<table>',
            '  <thead>',
            '    <tr>',
            '      <th style="width: 25%;">Attribute name</th>',
            '      <th style="width: 15%;">Type</th>',
            '      <th style="width: 60%;">Description</th>',
            '    </tr>',
            '  </thead>',
            '  <tbody>'
        ]

        for name, prop_type, description, enum_values in attributes:
            # Strip newlines and replace smart quotes with straight quotes
            description = description.replace('\n', ' ').replace('\r', ' ')
            description = description.replace('\u201c', '"').replace('\u201d', '"')  # Smart double quotes
            description = description.replace('\u2018', "'").replace('\u2019', "'")  # Smart single quotes

            # Replace double spaces with single space
            while '  ' in description:
                description = description.replace('  ', ' ')

            # Escape HTML characters in description
            description = description.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

            # Convert backticks to <code> tags (must happen after HTML escaping)
            description = re.sub(r'`([^`]+)`', r'<code>\1</code>', description)

            # Add enum values to description if present and not already mentioned
            if enum_values:
                # Check if description already mentions possible values or valid values
                has_values_mentioned = any(phrase in description.lower() for phrase in
                                          ['possible values', 'valid values', 'possible value'])

                if not has_values_mentioned:
                    enum_str = ', '.join(f'<code>{v}</code>' for v in enum_values)
                    if description:
                        description = f"{description} Possible values: {enum_str}."
                    else:
                        description = f"Possible values: {enum_str}."

            # Add full path with @ prefix at start of description (for custom.* fields)
            display_name = name
            if name.startswith('custom.'):
                query_path = '@' + name[7:]  # Remove 'custom.' and add '@'
                # If description is empty or just a dash, just show the path
                if not description or description.strip() == '' or description.strip() == '-':
                    description = f"<strong>Path:</strong> <code>{query_path}</code>"
                else:
                    description = f"<strong>Path:</strong> <code>{query_path}</code><br>{description}"
                # Use just the final field name for display
                display_name = name.split('.')[-1]
            else:
                # For non-custom fields (like tags), use dash if empty
                if not description or description.strip() == '':
                    description = '-'

            lines.append('    <tr>')
            lines.append(f'      <td><code>{display_name}</code></td>')
            lines.append(f'      <td>{prop_type}</td>')
            lines.append(f'      <td>{description}</td>')
            lines.append('    </tr>')

        lines.extend([
            '  </tbody>',
            '</table>'
        ])

        return '\n'.join(lines)
    else:
        # Original markdown table format
        lines = [
            "| Attribute name | Type | Description |",
            "|----------------|------|-------------|"
        ]

        for name, prop_type, description, enum_values in attributes:
            # Strip newlines and replace smart quotes with straight quotes
            description = description.replace('\n', ' ').replace('\r', ' ')
            description = description.replace('\u201c', '"').replace('\u201d', '"')  # Smart double quotes
            description = description.replace('\u2018', "'").replace('\u2019', "'")  # Smart single quotes

            # Replace double spaces with single space
            while '  ' in description:
                description = description.replace('  ', ' ')

            # Escape pipe characters in description
            description = description.replace('|', '\\|')

            # Add enum values to description if present and not already mentioned
            if enum_values:
                # Check if description already mentions possible values or valid values
                has_values_mentioned = any(phrase in description.lower() for phrase in
                                          ['possible values', 'valid values', 'possible value'])

                if not has_values_mentioned:
                    enum_str = ', '.join(f'`{v}`' for v in enum_values)
                    if description:
                        description = f"{description} Possible values: {enum_str}."
                    else:
                        description = f"Possible values: {enum_str}."

            # Add full path with @ prefix at start of description (for custom.* fields)
            display_name = name
            if name.startswith('custom.'):
                query_path = '@' + name[7:]  # Remove 'custom.' and add '@'
                # If description is empty or just a dash, just show the path
                if not description or description.strip() == '' or description.strip() == '-':
                    description = f"**Path:** `{query_path}`"
                else:
                    description = f"**Path:** `{query_path}`<br>{description}"
                # Use just the final field name for display
                display_name = name.split('.')[-1]
            else:
                # For non-custom fields (like tags), use dash if empty
                if not description or description.strip() == '':
                    description = '-'

            lines.append(f"| `{display_name}` | {prop_type} | {description} |")

        return '\n'.join(lines)


def get_nested_properties(prop_def: Dict[str, Any], defs: Dict[str, Any]) -> Dict[str, Any]:
    """Get nested properties from an object property or its reference."""
    if '$ref' in prop_def:
        ref_def = resolve_ref(prop_def['$ref'], defs)
        return ref_def.get('properties', {})

    return prop_def.get('properties', {})


def generate_section(name: str, properties: Dict[str, Any], defs: Dict[str, Any], level: int = 2, use_html: bool = False) -> str:
    """Generate a documentation section for a namespace."""
    heading = '#' * level
    sections = []

    # Build attribute table for top-level properties
    attributes = build_attribute_table(properties, defs)

    if attributes:
        section = f"{heading} {name.replace('_', ' ').title()}\n\n"
        section += format_attribute_table(attributes, use_html)
        sections.append(section)

    return '\n\n'.join(sections)


def generate_nested_section(name: str, prop_def: Dict[str, Any], defs: Dict[str, Any], level: int = 4, use_html: bool = False, parent_path: str = '', use_collapse: bool = True, csv_descriptions: Dict[str, str] = None) -> str:
    """Generate documentation for nested object properties."""
    nested_props = get_nested_properties(prop_def, defs)
    csv_descriptions = csv_descriptions or {}

    if not nested_props:
        return ""

    # Build full path for this section
    current_path = f"{parent_path}.{name}" if parent_path else name

    # Use CSV description if available, otherwise use schema description
    description = csv_descriptions.get(current_path, prop_def.get('description', ''))

    # Clean description: strip newlines and replace smart quotes
    if description:
        description = description.replace('\n', ' ').replace('\r', ' ')
        description = description.replace('\u201c', '"').replace('\u201d', '"')  # Smart double quotes
        description = description.replace('\u2018', "'").replace('\u2019', "'")  # Smart single quotes

        # Replace double spaces with single space
        while '  ' in description:
            description = description.replace('  ', ' ')

    # Create section title
    section_title = name.replace('_', ' ').title()

    if use_collapse:
        # Use collapse-content shortcode for top-level sections
        heading_level = f"h{level}" if level <= 6 else "h6"
        section = f'{{{{% collapse-content title="{section_title}" level="{heading_level}" %}}}}\n\n'
    else:
        # Use regular heading for nested sections
        heading = '#' * level
        section = f"{heading} {section_title}\n\n"

    # Add description if it's not empty and not just a dash
    if description and description.strip() and description.strip() != '-':
        section += f"{description}\n\n"

    # Pass the current path as prefix to build_attribute_table
    attributes = build_attribute_table(nested_props, defs, prefix=current_path + '.', csv_descriptions=csv_descriptions)
    section += format_attribute_table(attributes, use_html)

    # Check for deeply nested objects - use regular headings for nested sections
    # Start at h3 (###) for first nested level and increment from there
    nested_sections = []
    for nested_name, nested_def in nested_props.items():
        if nested_def.get('type') == 'object' and 'properties' in nested_def:
            # First nested level starts at h3, then increments
            nested_level = 3 if use_collapse else level + 1
            nested_section = generate_nested_section(nested_name, nested_def, defs, nested_level, use_html, current_path, use_collapse=False, csv_descriptions=csv_descriptions)
            if nested_section:
                nested_sections.append(nested_section)
        elif '$ref' in nested_def:
            ref_def = resolve_ref(nested_def['$ref'], defs)
            if ref_def.get('type') == 'object' and 'properties' in ref_def:
                # First nested level starts at h3, then increments
                nested_level = 3 if use_collapse else level + 1
                # Pass nested_def (not ref_def) to preserve the description on the property
                nested_section = generate_nested_section(nested_name, nested_def, defs, nested_level, use_html, current_path, use_collapse=False, csv_descriptions=csv_descriptions)
                if nested_section:
                    nested_sections.append(nested_section)

    if nested_sections:
        section += '\n\n' + '\n\n'.join(nested_sections)

    # Close collapse-content shortcode only if we used it
    if use_collapse:
        section += '\n\n{{% /collapse-content %}}'

    return section


def generate_docs(schema: Dict[str, Any], use_html: bool = False, examples_file: str = None, csv_descriptions: Dict[str, str] = None) -> str:
    """Generate full markdown documentation from schema."""
    defs = schema.get('$defs', {})
    root_props = schema.get('properties', {})
    custom_props = root_props.get('custom', {}).get('properties', {})
    csv_descriptions = csv_descriptions or {}

    # Read examples section if file exists
    examples_content = ""
    if examples_file and Path(examples_file).exists():
        with open(examples_file, 'r', encoding='utf-8') as f:
            examples_content = f.read().strip()

    doc = f"""---
title: Security Findings Schema Reference
description: "Complete reference for the Security Findings schema, including all attributes, namespaces, and data model for querying vulnerabilities, misconfigurations, and security risks."
disable_toc: true
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Cloud Security Management"
- link: "/security/code_security/"
  tag: "Documentation"
  text: "Code Security"
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Application Security"
---

## Overview

Security findings in Datadog represent vulnerabilities, misconfigurations, and security risks identified across your infrastructure and applications. Each finding contains structured data organized into namespaces that describe the nature, impact, status, and context of the security issue.

All findings share a common schema that enables unified querying and analysis across different security products.

## Examples

{examples_content}

## Schema Reference

The following sections describe all available attributes in the Security Findings schema, organized by namespace.

"""

    # Group properties by category
    core_attrs = ['severity', 'base_severity', 'status', 'finding_type', 'finding_id',
                  'title', 'description', 'resource_id', 'resource_name', 'resource_type',
                  'first_seen_at', 'last_seen_at', 'detection_changed_at', 'origin',
                  'exposure_time_seconds', 'is_in_security_inbox', 'detection_tool']

    workflow_props = custom_props.get('workflow', {})
    risk_props = custom_props.get('risk', {})
    risk_details_props = custom_props.get('risk_details', {})
    rule_props = custom_props.get('rule', {})
    advisory_props = custom_props.get('advisory', {})
    vulnerability_props = custom_props.get('vulnerability', {})
    remediation_props = custom_props.get('remediation', {})
    compliance_props = custom_props.get('compliance', {})

    # Resource identification
    cloud_resource_props = custom_props.get('cloud_resource', {})
    iac_resource_props = custom_props.get('iac_resource', {})
    k8s_props = custom_props.get('k8s', {})
    host_props = custom_props.get('host', {})
    service_props = custom_props.get('service', {})
    container_image_props = custom_props.get('container_image', {})

    # Code-related
    git_props = custom_props.get('git', {})
    code_location_props = custom_props.get('code_location', {})
    package_props = custom_props.get('package', {})
    secret_props = custom_props.get('secret', {})
    api_endpoint_props = custom_props.get('api_endpoint', {})

    # Core attributes - use CSV descriptions if available
    core_attributes = [(f"custom.{name}", get_type_display(custom_props[name], defs),
                       csv_descriptions.get(f"custom.{name}", custom_props[name].get('description', '')),
                       extract_enum_values(custom_props[name], defs))
                      for name in core_attrs if name in custom_props]

    # Wrap core attributes in collapse section too
    doc += '\n\n{{% collapse-content title="Core Attributes" level="h3" %}}\n\n'
    doc += "These attributes are present on all security findings and describe the fundamental nature and status of the finding.\n\n"
    doc += format_attribute_table(core_attributes, use_html)
    doc += '\n\n{{% /collapse-content %}}'

    # Workflow namespace
    if workflow_props:
        doc += "\n\n" + generate_nested_section('workflow', workflow_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    # Risk namespace - both as separate collapse sections
    if risk_props:
        doc += "\n\n" + generate_nested_section('risk', risk_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if risk_details_props:
        doc += "\n\n" + generate_nested_section('risk_details', risk_details_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    # Vulnerability information - all as separate collapse sections
    if rule_props:
        doc += "\n\n" + generate_nested_section('rule', rule_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if advisory_props:
        doc += "\n\n" + generate_nested_section('advisory', advisory_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if vulnerability_props:
        doc += "\n\n" + generate_nested_section('vulnerability', vulnerability_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    # Remediation
    if remediation_props:
        doc += "\n\n" + generate_nested_section('remediation', remediation_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    # Compliance
    if compliance_props:
        doc += "\n\n" + generate_nested_section('compliance', compliance_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    # Resource identification - all as separate collapse sections
    if cloud_resource_props:
        doc += "\n\n" + generate_nested_section('cloud_resource', cloud_resource_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if iac_resource_props:
        doc += "\n\n" + generate_nested_section('iac_resource', iac_resource_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if k8s_props:
        doc += "\n\n" + generate_nested_section('k8s', k8s_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if host_props:
        doc += "\n\n" + generate_nested_section('host', host_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if service_props:
        doc += "\n\n" + generate_nested_section('service', service_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if container_image_props:
        doc += "\n\n" + generate_nested_section('container_image', container_image_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    # Code context - all as separate collapse sections
    if git_props:
        doc += "\n\n" + generate_nested_section('git', git_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if code_location_props:
        doc += "\n\n" + generate_nested_section('code_location', code_location_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if package_props:
        doc += "\n\n" + generate_nested_section('package', package_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if secret_props:
        doc += "\n\n" + generate_nested_section('secret', secret_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    if api_endpoint_props:
        doc += "\n\n" + generate_nested_section('api_endpoint', api_endpoint_props, defs, level=3, use_html=use_html, parent_path='custom', csv_descriptions=csv_descriptions)

    # Tags
    doc += "\n\n## Tags\n\n"
    doc += "Key-value metadata in the format `name:value`. Enables flexible filtering and grouping of findings. Must include at least `source` and `origin`.\n\n"

    doc += "\n\n## Further reading\n\n"
    doc += "{{< partial name=\"whats-next/whats-next.html\" >}}\n"

    return doc


def main():
    if len(sys.argv) < 3:
        print("Usage: python schema_to_docs.py <schema_url_or_file> <output_dir> [--html]")
        print("\nExample:")
        print("  python schema_to_docs.py https://raw.githubusercontent.com/DataDog/security-findings-schema/main/jsonschema.json content/en/security/findings/")
        print("  python schema_to_docs.py schema.json output/ --html  # Use HTML tables with fixed widths")
        sys.exit(1)

    schema_source = sys.argv[1]
    output_dir = Path(sys.argv[2])
    use_html = '--html' in sys.argv

    # Create output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)

    # Fetch and parse schema
    print(f"Fetching schema from {schema_source}...")
    schema = fetch_schema(schema_source)

    # Look for examples.md in the output directory
    examples_file = output_dir / "examples.md"

    # Don't use CSV descriptions - use only the JSON schema
    csv_descriptions = {}

    # Generate documentation
    print(f"Generating documentation (HTML tables: {use_html})...")
    docs = generate_docs(schema, use_html, examples_file=str(examples_file) if examples_file.exists() else None, csv_descriptions=csv_descriptions)

    # Write to file
    output_file = output_dir / "data_collected.md"
    output_file.write_text(docs)

    print(f"Documentation written to {output_file}")
    print(f"Total lines: {len(docs.splitlines())}")


if __name__ == "__main__":
    main()
