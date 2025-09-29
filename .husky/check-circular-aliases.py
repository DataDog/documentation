#!/usr/bin/env python3

import os
import sys
import subprocess
import re
from pathlib import Path

def parse_frontmatter(content):
    """Parse YAML frontmatter from markdown content."""
    # Match frontmatter between --- delimiters
    frontmatter_pattern = r'^---\s*\n(.*?)\n---'
    match = re.match(frontmatter_pattern, content, re.DOTALL)
    
    if not match:
        return {}
    
    frontmatter_text = match.group(1)
    
    # Look for the list of aliases
    aliases = []
    in_aliases_section = False
    
    for line in frontmatter_text.split('\n'):
        line = line.strip()
        
        if line.startswith('aliases:'):
            in_aliases_section = True

            # Check if aliases are on the same line
            if ':' in line and line.split(':', 1)[1].strip():
                # Handle single line format like "aliases: [/path1, /path2]"
                aliases_part = line.split(':', 1)[1].strip()
                if aliases_part.startswith('[') and aliases_part.endswith(']'):
                    # Parse bracket format
                    aliases_content = aliases_part[1:-1]
                    for alias in aliases_content.split(','):
                        alias = alias.strip().strip('"\'')
                        if alias:
                            aliases.append(alias)
                    in_aliases_section = False
            continue
        
        if in_aliases_section:
            if line.lstrip().startswith('- '):
                # Handle list format
                alias = line.lstrip('- ').strip().strip('"\'')
                if alias:
                    aliases.append(alias)
            elif line and not line.lstrip().startswith('-'):
                # End of aliases section
                in_aliases_section = False
    
    return {'aliases': aliases} if aliases else {}

def get_staged_files():
    """Get staged markdown files or all files if no staged files."""
    try:
        result = subprocess.run(
            ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM'],
            capture_output=True,
            text=True,
            check=True
        )
        staged_files = [f for f in result.stdout.strip().split('\n') 
                       if f.endswith('.md') and f.startswith('content/en/')]
        return staged_files if staged_files != [''] else []
    except subprocess.CalledProcessError:
        # Fallback to all markdown files for testing
        content_dir = Path('content/en')
        if content_dir.exists():
            return [str(f) for f in content_dir.rglob('*.md')]
        return []

def check_circular_aliases():
    """Check for circular aliases in markdown files."""
    errors = []
    staged_files = get_staged_files()
    
    for file_path in staged_files:
        if not file_path or not os.path.exists(file_path):
            continue
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            frontmatter = parse_frontmatter(content)
            aliases = frontmatter.get('aliases', [])
            
            if not aliases:
                continue
            
            # Calculate expected location path
            if file_path.endswith('/_index.md'):
                # For _index.md files: content/en/foo/bar/_index.md -> foo/bar
                expected_location = file_path.replace('content/en/', '').replace('/_index.md', '')
            else:
                # For regular .md files: content/en/foo/bar.md -> foo/bar
                expected_location = file_path.replace('content/en/', '').replace('.md', '')
            
            # Check each alias for circular reference
            for alias in aliases:
                if not isinstance(alias, str):
                    continue
                
                # Remove leading/trailing slashes for comparison
                normalized_alias = alias.strip('/')
                normalized_location = expected_location.strip('/')
                
                if normalized_alias == normalized_location:
                    errors.append({
                        'file': file_path,
                        'location': expected_location,
                        'circular_alias': alias
                    })
        
        except Exception as e:
            print(f"Error processing file {file_path}: {e}", file=sys.stderr)
    
    return errors

def main():
    """Main function to run circular alias check."""
    errors = check_circular_aliases()
    
    if errors:
        print('\n❌ Circular alias errors found:', file=sys.stderr)
        print('=====================================', file=sys.stderr)
        
        for error in errors:
            print(f"\nFile: {error['file']}", file=sys.stderr)
            print(f"Location: {error['location']}", file=sys.stderr)
            print(f"Circular alias: \"{error['circular_alias']}\"", file=sys.stderr)
            print(f"\nA file cannot alias to itself. Please remove the alias \"{error['circular_alias']}\" from the frontmatter.", file=sys.stderr)
        
        print('\n=====================================', file=sys.stderr)
        print(f"Found {len(errors)} circular alias error(s). Please fix before committing.\n", file=sys.stderr)
        sys.exit(1)
    
    print('✅ No circular aliases found.')
    sys.exit(0)

if __name__ == '__main__':
    main()