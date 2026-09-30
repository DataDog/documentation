#!/usr/bin/env python3

import json
import argparse
import sys

# Assigns the Vale log data to a dictionary
def munge_logs(file_contents):
    log_array = []
    for line in file_contents.splitlines():
        try:
            line_array = (line.split(':', 5))
            log_array.append({
                'Filename': line_array[0],
                'Severity': line_array[3],
                'Check': line_array[4],
                'Line': int(line_array[1]),
                'Col': int(line_array[2]),
                'Message': line_array[5]}
            )
        # Discard lines that don't match the expected format    
        except: print("line discarded: ", line) 
    return log_array

# Compares the Vale log data to the git data and returns the GitHub annotation
def compare_log(filename_log, log_data):
    severity = log_data.get('Severity')
    line = log_data.get('Line')
    title = log_data.get('Check')
    message = log_data.get('Message')
    col = log_data.get('Col')
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
    log_list = []
    error_list = []
    parser = argparse.ArgumentParser()
    parser.add_argument('--git_data', help="array of dictionaries: [{filename:[changed_lines]]", type=str)
    args = parser.parse_args()
    git_data = json.loads(args.git_data)
    
    with open('vale_output.log') as f:  
      vale_data = munge_logs(f.read())
    
    if vale_data:
        for entry in vale_data:
            vale_filename = entry['Filename']
            line = entry['Line']
            for git_filename, git_line_data in git_data.items():
                if vale_filename == git_filename and line in git_line_data:
                    try:
                        annotation, error_present = compare_log(git_filename, entry)
                        log_list.append(annotation)
                        error_list.append(error_present)
                    except:
                        raise Exception(f'Failed to parse log entry for {git_filename}')              

    for entry in log_list:
        print(entry)

    if any(error_list):
        print("\nYour PR contains a Vale style error. Check the annotations in your PR and address the error.")
        sys.exit(1)