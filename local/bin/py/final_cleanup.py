#!/usr/bin/env python3
"""
Final manual cleanup pass for specific remaining issues.
"""

import csv
import re


def final_clean(desc, location):
    """Apply final manual fixes."""

    if not desc or desc == '-' or desc.startswith('Internal field'):
        return desc

    # Fix duplicate "Contains X contains"
    desc = re.sub(r'Contains (.+?) contains (.+?)', r'Contains \1 that contains \2', desc, flags=re.IGNORECASE)
    desc = re.sub(r'Contains (.+?) section contains', r'Contains \1 with', desc, flags=re.IGNORECASE)
    desc = re.sub(r'Contains (.+?) namespace contains', r'Contains', desc, flags=re.IGNORECASE)

    # Fix double parenthesis
    desc = desc.replace('(Coordinated Universal Time))', '(Coordinated Universal Time)')
    desc = desc.replace('UTC (Coordinated Universal Time))', 'UTC')

    # Fix "True is" to "True if"
    desc = re.sub(r'\bTrue is the\b', 'True if the', desc)
    desc = re.sub(r'\bTrue is\b', 'True if', desc)

    # Fix "Indicate " (missing s) to "Indicates"
    if desc.startswith('Indicate ') and not desc.startswith('Indicates'):
        desc = 'Indicates' + desc[8:]

    # Fix "for instance" to "for example" (consistency)
    desc = desc.replace('For instance', 'For example')
    desc = desc.replace('for instance', 'for example')

    # Fix "i.e." and "i.e" to more readable form
    desc = desc.replace('i.e.', 'that is')
    desc = desc.replace(' i.e ', ' that is ')

    # Simplify verbose UTC explanations - just use "UTC" after first mention
    if location and not location.endswith('.first_seen_at'):
        desc = desc.replace(' (UTC (Coordinated Universal Time))', ' (UTC)')
        desc = desc.replace(' in milliseconds (UTC (Coordinated Universal Time))', ' in milliseconds (UTC)')

    # Fix run-on sentences by splitting at "such as" when too long
    if len(desc) > 200 and 'such as' in desc and not location.endswith('.'):
        parts = desc.split('such as')
        if len(parts) == 2 and len(parts[0]) > 100:
            # Keep just the main part if the example is making it too long
            desc = parts[0].rstrip(', ') + '.'

    # Fix awkward "Contains name of" constructions
    desc = re.sub(r'^Contains name of the (.+?) where', r'Name of the \1 where', desc)
    desc = re.sub(r'^Contains version of the (.+?) where', r'Version of the \1 where', desc)
    desc = re.sub(r'^Contains normalized name', r'Normalized name', desc)

    # Fix "that is identified" repetition
    desc = desc.replace('where the vulnerability that is identified', 'where the vulnerability is identified')

    # Clean up spacing
    desc = ' '.join(desc.split())

    # Remove trailing period and re-add to be safe
    desc = desc.rstrip('.')
    if desc and not desc.endswith('?'):
        desc += '.'

    return desc


def main():
    input_file = 'local/bin/py/descriptions_clean.csv'
    output_file = 'local/bin/py/descriptions_final.csv'

    rows = []

    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            location = row['Location (v2)']
            description = row['Description']

            cleaned = final_clean(description, location)

            rows.append({
                'Location (v2)': location,
                'Description': cleaned
            })

    # Write final descriptions
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['Location (v2)', 'Description'])
        writer.writeheader()
        writer.writerows(rows)

    print(f"✓ Final cleanup complete: {len(rows)} descriptions")
    print(f"✓ Output written to {output_file}")


if __name__ == '__main__':
    main()
