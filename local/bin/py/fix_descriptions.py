#!/usr/bin/env python3
"""
Fix description issues in the CSV according to documentation standards.
"""

import csv
import re


def fix_description(desc, location):
    """Fix a single description according to the rules."""
    if not desc or desc.strip() == '':
        return '-'

    # Strip leading/trailing whitespace and newlines
    desc = desc.strip()

    # Replace smart quotes
    desc = desc.replace('\u201c', '"').replace('\u201d', '"')
    desc = desc.replace('\u2018', "'").replace('\u2019', "'")

    # Remove internal references
    if 'internal' in desc.lower() or '_dd' in location or 'debug' in desc.lower():
        # These are internal fields, keep minimal description
        if desc.startswith('DEPRECATED'):
            return 'Internal field. Deprecated and will be removed.'
        if 'internal' in desc.lower() or 'debug' in desc.lower():
            return 'Internal field for Datadog use.'

    # Remove URLs (especially internal wikis)
    desc = re.sub(r'https?://datadoghq\.atlassian\.net\S+', '', desc)
    desc = re.sub(r'https?://docs\.datadoghq\.com\S+', '', desc)

    # Fix common typos
    desc = desc.replace('Assignement', 'Assignment')
    desc = desc.replace('Indicate ', 'Indicates ')  # Fix missing 's'
    desc = desc.replace('e.g.', 'for example')
    desc = desc.replace(' etc.', '')
    desc = desc.replace('etc.', '')

    # Fix passive voice to active voice
    desc = re.sub(r'^The (.+?) is used', r'Contains \1 used', desc)
    desc = re.sub(r'^Used to ', 'Provides ', desc)

    # Clean up multi-line descriptions
    desc = ' '.join(desc.split())

    # Remove development/internal notes
    patterns_to_remove = [
        r'This is a workaround.*?\.',
        r'This field will be removed.*?\.',
        r'We are not sure.*?\.',
        r'If in the future.*?\.',
        r'This object is optimized for the FE.*?\.',
        r'The structure of the object is not user friendly.*?\.',
        r'We just need this to maintain.*?\.',
        r'this field should no longer be used.*?\.',
    ]

    for pattern in patterns_to_remove:
        desc = re.sub(pattern, '', desc, flags=re.DOTALL)

    # Clean up extra spaces
    desc = ' '.join(desc.split())

    # Remove trailing periods before adding consistent one
    desc = desc.rstrip('.')

    # Ensure sentence starts with capital
    if desc and desc[0].islower():
        desc = desc[0].upper() + desc[1:]

    # For table entries (non-objects), try to shorten
    if not location.endswith('.'):  # Not a namespace/object
        # If too long, try to simplify
        if len(desc) > 150:
            # Remove examples if present to shorten
            desc = re.sub(r' \(for example,.*?\)', '', desc)
            desc = re.sub(r' \(such as.*?\)', '', desc)
            desc = re.sub(r' \(e\.g\..*?\)', '', desc)

    # Add period at the end if not present
    if desc and not desc.endswith('.'):
        desc += '.'

    return desc


def main():
    input_file = 'local/bin/py/descriptions.csv'
    output_file = 'local/bin/py/descriptions_fixed.csv'

    rows = []

    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            location = row['Location (v2)']
            description = row['Description']

            fixed_desc = fix_description(description, location)

            rows.append({
                'Location (v2)': location,
                'Description': fixed_desc
            })

    # Write fixed descriptions
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['Location (v2)', 'Description'])
        writer.writeheader()
        writer.writerows(rows)

    print(f"Fixed {len(rows)} descriptions")
    print(f"Output written to {output_file}")


if __name__ == '__main__':
    main()
