#!/usr/bin/env python3

import re
import sys
from pathlib import Path

def find_reference_links(content):
    """Find all reference-style links in the content."""
    # Pattern to match [text][number] style links
    link_pattern = r'\[([^\]]+)\]\[(\d+)\]'
    return re.findall(link_pattern, content)

def find_reference_definitions(content):
    """Find all reference definitions at the bottom of the file."""
    # Pattern to match [number]: url style definitions
    def_pattern = r'\[(\d+)\]:\s*(.+)$'
    return re.findall(def_pattern, content, re.MULTILINE)

def check_link_references(file_path):
    """Check if link references are in the correct order."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all reference links and their definitions
        links = find_reference_links(content)
        definitions = find_reference_definitions(content)
        
        # Extract just the numbers for comparison
        link_numbers = [int(num) for _, num in links]
        def_numbers = [int(num) for num, _ in definitions]
        
        # Check if all numbers match
        if set(link_numbers) != set(def_numbers):
            print(f"\n{file_path}:")
            print("❌ Missing or extra reference definitions")
            print(f"Links found: {sorted(link_numbers)}")
            print(f"Definitions found: {sorted(def_numbers)}")
            return False
        
        # Check if definitions are in the same order as first appearance of links
        first_appearance = []
        for num in def_numbers:
            for i, (_, link_num) in enumerate(links):
                if int(link_num) == num:
                    first_appearance.append(i)
                    break
        
        if first_appearance != sorted(first_appearance):
            print(f"\n{file_path}:")
            print("❌ Reference definitions are not in order of first appearance")
            print(f"Current order: {def_numbers}")
            print(f"Expected order: {[def_numbers[i] for i in sorted(first_appearance)]}")
            return False
        
        return True
        
    except Exception as e:
        print(f"\n{file_path}:")
        print(f"❌ Error processing file: {str(e)}")
        return False

def main():
    if len(sys.argv) < 2:
        print("Usage: python check_link_references.py <file_path>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    if not Path(file_path).exists():
        print(f"Error: File {file_path} does not exist")
        sys.exit(1)
    
    if check_link_references(file_path):
        print(f"\n✅ {file_path}: Link references are correctly ordered")

if __name__ == "__main__":
    main() 