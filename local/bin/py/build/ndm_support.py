#!/usr/bin/env python3

import os
import yaml
from collections import defaultdict
from pprint import pprint

DIRNAME = os.path.dirname(__file__)

def get_array(directory):
    final_array = []
    device_vendor = ""
    for root, dirs, files in os.walk(directory):
        for file in files:
            filename = f'[{file}](https://github.com/DataDog/integrations-core/blob/master/snmp/datadog_checks/snmp/data/default_profiles/{file})'
            if file.endswith('.yaml'):
                with open(os.path.join(root, file), 'r') as f:
                    # read the file as YAML
                    profile = yaml.safe_load(f)
                    if profile.get('device'):
                        vendor = profile.get('device').get('vendor')
                        final_array.append([vendor, filename])
                    elif profile.get('metadata'):
                        if profile.get('metadata').get('device'):
                            if profile.get('metadata').get('device').get('fields'):
                                if profile.get('metadata').get('device').get('fields').get('vendor'):
                                        vendor = profile.get('metadata').get('device').get('fields').get('vendor').get('value')
                                        final_array.append([vendor, filename])
    return final_array

def build_dict(device_array):
    device_profiles = defaultdict(list)
    for device in device_array:
        if device[0] not in device_profiles:
            device_profiles[device[0]] = [device[1]]
        else:
            device_profiles[device[0]].append(device[1])
    sorted_dict = dict(sorted(device_profiles.items()))
    return sorted_dict

def write_markdown(device_profiles):
    with open('layouts/shortcodes/ndm_support.md', 'w') as f:
        # f.write('# Device Profiles\n\n')
        f.write('| Vendor | Config files |\n')
        f.write('| ---  | ----------- |')
        for vendor in device_profiles:
            file_string = ''
            f.write(f'\n| {vendor} | ')
            for file in device_profiles[vendor]:
                file_string += f'{file} <br>'
            f.write(f'{file_string} |')
            

if __name__ == '__main__':
    ndm_device_path = 'integrations_data/extracted/integrations-core/snmp/datadog_checks/snmp/data/default_profiles'
    if not os.path.exists(ndm_device_path):
        print(f"Path {ndm_device_path} does not exist")
    device_array = get_array(ndm_device_path)
    print(f'{len(device_array)} vendors found')
    device_profiles = build_dict(device_array)
    # pprint(device_profiles)
    try:
        write_markdown(device_profiles)
    except: 
        print("Error creating markdown file")
        exit(1)