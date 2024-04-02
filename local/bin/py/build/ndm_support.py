#!/usr/bin/env python3

import os
import yaml

DIRNAME = os.path.dirname(__file__)

# reads the contents of each device profile in the directory
# returns device_profiles dictionary
def find_profiles(directory):
    final_array = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.yaml'):
                with open(os.path.join(root, file), 'r') as f:
                    # read the file as YAML
                    profile = yaml.safe_load(f)
                    if profile.get('metadata'):
                        if profile.get('metadata').get('device'):
                            if profile.get('metadata').get('device').get('fields'):
                                vendor = profile.get('metadata').get('device').get('fields').get('vendor')
                                type = profile.get('metadata').get('device').get('fields').get('type')
                                if vendor and type:
                                    final_array.append[{'vendor': vendor, 'type': type}]
                    
                    
    

if __name__ == '__main__':
    ndm_device_path = DIRNAME + 'integrations_data/extracted/integrations-core/snmp/datadog_checks/snmp/data/default_profiles'
    device_profiles = find_profiles(ndm_device_path)
    print(f"Device profiles: {device_profiles}")
    # Build a dictionary of device profiles:
    # device_profiles = { [vendor: "", model: "", link: ""] }