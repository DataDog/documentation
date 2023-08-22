#!/usr/bin/env python3

import json
import subprocess
import sys

log_list = []

def parse_log(log_filename, log_data):
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
    # echo syntax required by GitHub Actions. See https://bit.ly/44kNyPt
    command = f"echo '::{level} file={log_filename},line={line},col={col},title={title}::{message}'"
    error_present = True if level == 'error' else False
    return command, error_present

if __name__ == '__main__':
    with open('vale_output.json', 'r') as file:
        try:
            log_entries = json.loads(file.read())
        except:
            raise Exception('Error parsing log file.')

    if log_entries:
        for file_name, data in log_entries.items():
            for item in data:
                try:
                    annotation, error_present = parse_log(file_name, item)
                    log_list.append(annotation)
                except:
                    raise Exception(f'Failed to parse log entry for {file_name}')

    for entry in log_list:
        subprocess.call(entry, shell=True)

    if error_present:
        print("\nYour PR contains a Vale style error. Check the annotations in your PR and address the error.")
        sys.exit(1)