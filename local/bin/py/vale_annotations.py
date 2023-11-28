#!/usr/bin/env python3

import json
import sys
import argparse
import sys

log_list = []

def parse_log(filename_log, log_data):
    severity = log_data.get('Severity')
    line = log_data.get('Line')
    col = log_data.get('Span'[0])
    title = log_data.get('Check')
    message = log_data.get('Message')
    match severity:
        case 'suggestion': level = 'notice'
        case 'warning': level = 'warning'
        case 'error': level = 'error'
    if level == 'notice':
        message = 'Suggestion: ' + message
    # echo syntax for GitHub annotations. See https://bit.ly/44kNyPt
    command = f"::{level} file={filename_log},line={line},col={col},title={title}::{message}"
    error_present = True if level == 'error' else False
    return command, error_present

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--git_data', help="array of dictionaries: [{filename:[changed_lines]]", type=str)
    # parser.add_argument('--vale_data', help="Vale log data", type=str)
    args = parser.parse_args()
    
    git_data = json.loads(args.git_data)
    # vale_data = json.loads(args.vale_data)
    
    with open('vale_output.json') as f:
        vale_data = json.load(f)
    
    # print(f'\n{vale_data}\n')
    # print(f'\n{git_data}\n')
    
    if vale_data:
        for vale_filename, vale_output in vale_data.items():
            for item in vale_output:
                for git_filename, git_line_data in git_data.items():
                    if vale_filename == git_filename and item['Line'] in git_line_data:
                        try:
                            annotation, error_present = parse_log(git_filename, item)
                            log_list.append(annotation)
                        except:
                            raise Exception(f'Failed to parse log entry for {git_filename}')
                    else:
                        error_present = False
    for entry in log_list:
        print(entry)

    if error_present:
        print("\nYour PR contains a Vale style error. Check the annotations in your PR and address the error.")
        sys.exit(1)