#!/usr/bin/env python3
import re
from io import StringIO
import requests
import defusedxml.ElementTree as ET
import semver

class InvalidTokenError(Exception):
    '''
    Represents an error when no token is provided
    '''

def get_data():
    url = 'https://dd-public-oss-mirror.s3.amazonaws.com/'
    response = requests.get(url)
    if response.status_code != 200:
        print(response.text)
        raise Exception('Failed to retrieve data from the public oss mirror')
    return response.text

def get_keys(data):
    keys = []
    xml_data = ET.iterparse(StringIO(data))
    for _, element in xml_data:
        _, _, element.tag = element.tag.rpartition('}') # strip namespace
    root = xml_data.root
    for elem in root.iter():
        if elem.tag == 'Key':
            for product in PRODUCTS:
                if elem.text.startswith(product) and not re.search(r'alpha|beta', elem.text):
                    keys.append(elem.text)
    return keys

def get_tags(keys):
    '''Get the highest version for each product tag'''
    versions = {}
    for product in PRODUCTS:
        highest_version = '0.0.0'
        for key in keys:
            version = key.split('/')[-1]
            print(semver.Version.parse(version))

def return_latest_version(tags):
    return
    # valid_versions = []
    # pattern = r"^(?:(?:[0-9]*)[.](?:[0-9]*)[.](?:[0-9]*))$"
    #valid_versions = [version for version in tags if re.match(pattern, version)]
    # return sorted(valid_versions)[-1]

'''
Gets the latest version tag from the public oss mirror
'''
if __name__ == "__main__":
    PRODUCTS = ['synthetics-windows-pl']
    data = get_data()
    keys = get_keys(data)
    get_tags(keys)
    
    
    
    
    
    # print(root)
    
    # tags = get_tags(data)
    # latest_version = return_latest_version(tags)
    # print(f'Latest version: {latest_version}')
    
    # Write the latest version to the output file
    #with open(github_output, 'w', encoding='utf-8') as f:
    #    f.write(f'worker_version={latest_version}\n')