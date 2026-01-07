#!/usr/bin/env python3
"""
Comprehensive description cleaner applying all documentation standards.
"""

import csv
import re


def is_internal_field(location):
    """Check if this is an internal field."""
    return (location.startswith('custom._dd') or
            'internal' in location.lower() or
            'debug' in location.lower())


def clean_description(desc, location):
    """Clean a single description according to documentation standards."""

    # Handle empty
    if not desc or not desc.strip():
        return '-'

    desc = desc.strip()

    # Internal fields get minimal description
    if is_internal_field(location):
        if 'DEPRECATED' in desc.upper() or 'deprecated' in desc.lower():
            return 'Internal field. Deprecated and will be removed.'
        return 'Internal field for Datadog use.'

    # Remove internal URLs
    desc = re.sub(r'https?://datadoghq\.atlassian\.net\S+', '', desc)
    desc = re.sub(r'https?://docs\.datadoghq\.com\S+', '', desc)

    # Remove internal development notes
    remove_patterns = [
        r'This is a workaround.*',
        r'This field will be removed.*',
        r'We are not sure.*',
        r'If in the future.*',
        r'This object is optimized for the FE.*',
        r'The structure of the object is not user friendly.*',
        r'We just need this to maintain.*',
        r'this field should no longer be used.*',
        r'used for debugging\.?',
        r'This field is used by the public API.*',
    ]

    for pattern in remove_patterns:
        desc = re.sub(pattern, '', desc, flags=re.IGNORECASE|re.DOTALL)

    # Replace newlines with spaces
    desc = ' '.join(desc.split())

    # Replace smart quotes
    desc = desc.replace('\u201c', '"').replace('\u201d', '"')
    desc = desc.replace('\u2018', "'").replace('\u2019', "'")

    # Fix common typos
    desc = desc.replace('Assignement', 'Assignment')
    desc = desc.replace('datadog', 'Datadog')  # Fix lowercase
    desc = desc.replace('e.g.', 'for example')
    desc = desc.replace('etc.', '')
    desc = desc.replace('varies', 'not applicable')
    desc = desc.replace('TBD', 'not yet defined')

    # Remove forbidden phrases
    desc = re.sub(r',?\s*etc\.?', '', desc)

    # Fix "The X is" to "Contains X" for brevity
    if desc.startswith('The ') and ' is ' in desc and not desc.startswith('The unique'):
        desc = re.sub(r'^The (.+?) is ', r'Contains \1 that is ', desc)

    # Fix passive "is used" constructions
    desc = re.sub(r' is used to ', ' provides ', desc, flags=re.IGNORECASE)
    desc = re.sub(r' are used to ', ' provide ', desc, flags=re.IGNORECASE)

    # Fix passive "is potentially synchronized"
    desc = re.sub(r' is potentially synchronized ', ' may be synchronized ', desc)

    # Clean up extra spaces
    desc = ' '.join(desc.split())

    # Remove trailing period
    desc = desc.rstrip('.')

    # Capitalize first letter
    if desc and desc[0].islower():
        desc = desc[0].upper() + desc[1:]

    # For non-object fields, try to keep under 150 chars by removing examples if too long
    is_object = (location.endswith('.workflow') or location.endswith('.risk') or
                 location.endswith('.custom') or location.endswith('_details') or
                 location.endswith('.triage') or location.endswith('.mute'))

    if not is_object and len(desc) > 150:
        # Try to shorten by removing parenthetical examples
        shortened = re.sub(r' \(for example,.*?\)', '', desc)
        shortened = re.sub(r' \(such as.*?\)', '', shortened)
        shortened = re.sub(r', such as .*', '', shortened)
        if len(shortened) > 50:  # Make sure we didn't remove too much
            desc = shortened

    # Spell out UTC
    desc = desc.replace('UTC)', 'UTC (Coordinated Universal Time))', 1)  # Only first occurrence
    desc = desc.replace('UTC ', 'UTC ', 1)  # Already spelled out

    # Fix UNIX to milliseconds for consistency
    desc = desc.replace('UNIX timestamp (UTC)', 'Timestamp in milliseconds (UTC)')
    desc = desc.replace('UNIX timestamp', 'Timestamp in milliseconds')

    # Add period at end
    if desc and not desc.endswith('.'):
        desc += '.'

    return desc


def main():
    input_file = 'local/bin/py/descriptions.csv'
    output_file = 'local/bin/py/descriptions_clean.csv'

    rows = []

    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            location = row['Location (v2)']
            description = row['Description']

            cleaned = clean_description(description, location)

            rows.append({
                'Location (v2)': location,
                'Description': cleaned
            })

    # Write cleaned descriptions
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['Location (v2)', 'Description'])
        writer.writeheader()
        writer.writerows(rows)

    print(f"✓ Cleaned {len(rows)} descriptions")
    print(f"✓ Output written to {output_file}")

    # Show some stats
    internal_count = sum(1 for r in rows if r['Description'].startswith('Internal'))
    dash_count = sum(1 for r in rows if r['Description'] == '-')
    print(f"✓ {internal_count} internal fields")
    print(f"✓ {dash_count} empty fields")


if __name__ == '__main__':
    main()
