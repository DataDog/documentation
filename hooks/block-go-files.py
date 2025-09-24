#!/usr/bin/env python3
import json
import sys
import os

def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(1)

    tool_name = input_data.get('tool_name', '')
    tool_input = input_data.get('tool_input', {})
    
    # Only check Bash commands that contain git add
    if tool_name == 'Bash':
        command = tool_input.get('command', '')
        if 'git add' in command:
            # Check if go.sum or go.mod are being added
            if 'go.sum' in command or 'go.mod' in command:
                print("ERROR: Cannot stage go.sum or go.mod files. These files should be managed automatically by Go tooling.", file=sys.stderr)
                sys.exit(2)  # Exit code 2 blocks the tool call
    
    # Allow all other operations
    sys.exit(0)

if __name__ == "__main__":
    main()