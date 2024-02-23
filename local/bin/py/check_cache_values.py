#!/usr/bin/env python3

import os
import sys
import json
import subprocess
import argparse
import yaml
import requests
from yaml.loader import SafeLoader

EXIT_MESSAGE = '''
The 'enable_cache' value in one of your pullconfig files is set incorrectly.
Check the annotations in your PR and address the error.
'''

class SafeLineLoader(SafeLoader):
    def construct_mapping(self, node, deep=False):
        mapping = super(SafeLineLoader, self).construct_mapping(node, deep=deep)
        mapping['__line__'] = node.start_mark.line + 1
        return mapping

def fail_check():
    print(EXIT_MESSAGE)
    sys.exit(1)

def build_dictionary(data, file_name):
    file_dict = {}
    for entry in data:
        for _k,v in entry.items():
            try:
                file_dict[file_name] = [v['cache_enabled']]
                file_dict[file_name].append(v['__line__'])
            except TypeError:
                pass
                     
    return file_dict

def find_error(dictionary):
    for file_name,array_data in dictionary.items():
        if 'pull_config_preview.yaml' in file_name and not array_data[0] \
        or 'pull_config.yaml' in file_name and array_data[0]:
            return True
        else:
            return False

def send_slack_alert(array):
    post_data = {}
    for dictionary in array:
        for file_name,array_data in dictionary.items():
            post_data[os.path.basename(file_name)] = str(array_data[0]).lower()
    requests.post(url=slack_webhook, data=json.dumps(post_data))

def annotate(array):
    title = "Incorrect cache value"
    commands = []
    for dictionary in array:
        for file_name,array_data in dictionary.items():
            if 'pull_config_preview.yaml' in file_name and not array_data[0] \
            or 'pull_config.yaml' in file_name and array_data[0]:
                value = str(not array_data[0]).lower()
                message = f'The value for `cache_enabled` is incorrect. Switch the value to {value} before merging.'
                commands.append(f"echo '::error file={file_name},line={array_data[1]},title={title}::{message}'")
    for command in commands:
        subprocess.call(command, shell=True)

if __name__ == "__main__":
    gh_event = os.getenv('GH_EVENT')
    slack_webhook = os.getenv('SLACK_WEBHOOK')
    parser = argparse.ArgumentParser()
    parser.add_argument('--files', help="array of changed files", type=str)
    args = parser.parse_args()
    files = args.files.split(',')
    cache_data = []
    send_alert = []
    make_annotation = []

    pull_config_files = (
        'local/bin/py/build/configurations/pull_config.yaml',
        'local/bin/py/build/configurations/pull_config_preview.yaml'
        )

    for file in files:
        if file in pull_config_files:
            with open(file, 'r') as f:
                file_data = yaml.load(f, Loader=SafeLineLoader)
                cache_data.append(build_dictionary(file_data, file))
    
    for entry in cache_data:
        if not gh_event == 'pull_request':
            send_alert.append(find_error(entry))
        else:
            make_annotation.append(find_error(entry))
    
    if any(send_alert):
        send_slack_alert(cache_data)
        fail_check()

    if any(make_annotation):
        annotate(cache_data)
        fail_check()