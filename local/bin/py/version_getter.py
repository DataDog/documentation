#!/usr/bin/env python3
import re
import os
import json
import requests

def get_data():
    url = "https://ddsynthetics-windows.s3.amazonaws.com/installers.json"
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("Failed to list ddsynthetics-windows bucket")
    return response


def get_version(data):
    '''Get the latest version'''
    data = data.json()
    latest_info = data.get("synthetics-private-location", {}).get("latest", {}).get("x86_64", {}).get("url", "")
    if latest_info:
        # Extract version number from the URL
        match = re.search(r"datadog-synthetics-worker-(\d+\.\d+\.\d+)\.amd64\.msi", latest_info)
        if match:
            version=match.group(1)
        else:
            raise Exception("Failed to extract latest version")
    else:
        raise Exception("Failed to find latest release")
    
    return version    

'''
Gets the latest version tag from
https://ddsynthetics-windows.s3.amazonaws.com/installers.json
'''
if __name__ == "__main__":
    github_output = os.getenv('GITHUB_OUTPUT')
    data = get_data()
    latest_version = get_version(data)

    try:
        current_versions = json.load(open('data/synthetics_worker_versions.json'))
    except:
        current_versions = {}

    current_version = current_versions[0].get('version')
    print("Current version: ", current_version)

    if current_version != latest_version:
        print("New version detected: ", latest_version)
        final_versions = [{
            "client": "synthetics-windows-pl",
            "version": latest_version
        }]
        with open('data/synthetics_worker_versions.json', 'w') as f:
            f.write(json.dumps(final_versions, indent=4, sort_keys=True))
        with open(github_output, 'a', encoding='utf-8') as f:
            f.write('new_version=true')    
    else:
        with open(github_output, 'a', encoding='utf-8') as f:
            print("No new version detected")
            f.write('new_version=false')