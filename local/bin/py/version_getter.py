#!/usr/bin/env python3
import re
import os
import json
from io import StringIO
import requests
import defusedxml.ElementTree as ET
import semver


def get_highest_version(versions):
    highest_version = '0.0.0'
    for version in versions:
        if semver.compare(version, highest_version) > 0:
            highest_version = version
    return highest_version

def get_data():
    url = "https://dd-public-oss-mirror.s3.amazonaws.com/"
    response = requests.get(url)
    if response.status_code != 200:
        print(response.text)
        raise Exception("Failed to retrieve data from the public oss mirror")
    return response.text

def get_keys(data):
    keys = []
    xml_data = ET.iterparse(StringIO(data))
    for _, element in xml_data:
        _, _, element.tag = element.tag.rpartition("}") # strip namespace
    root = xml_data.root
    for elem in root.iter():
        if elem.tag == 'Key':
            for product in PRODUCTS:
                if elem.text.startswith(product) and not re.search(r'alpha|beta', elem.text):
                    keys.append(elem.text)
    return keys

def get_versions(keys):
    '''Get the highest version for each product tag'''
    product_version = {}
    product_version_array = []
    all_versions = []
    
    for product in PRODUCTS:
        for key in keys:
            pattern = r"\d{1,4}.\d{1,4}.\d{1,4}"
            try:
                version = re.search(pattern, key).group()
                product_version_array.append(version)
            except:
                continue
        highest_version = get_highest_version(product_version_array)
        product_version["client"] = product
        product_version["version"] = highest_version
        all_versions.append(product_version)
    return all_versions    

'''
Gets the latest version tag from the public oss mirror
Currently only supports synthetics-windows-pl
'''
if __name__ == "__main__":
    github_output = os.getenv('GITHUB_OUTPUT')
    PRODUCTS = ["synthetics-windows-pl"]
    data = get_data()
    keys = get_keys(data)
    try:
        current_versions = json.load(open('data/synthetics_worker_versions.json'))
    except:
        current_versions = {}
    final_versions = get_versions(keys)
    
    if current_versions != final_versions:
        print("New version detected!")
        print(final_versions)
        with open('data/synthetics_worker_versions.json', 'w') as f:
            f.write(json.dumps(final_versions, indent=4, sort_keys=True))
        with open(github_output, 'a', encoding='utf-8') as f:
            f.write('new_version=true')    
    else:
        with open(github_output, 'a', encoding='utf-8') as f:
            print("No new version detected")
            f.write('new_version=false')