#!/usr/bin/env python3
import re
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
    versions = {}
    version_array = []
    for product in PRODUCTS:
        for key in keys:
            pattern = r"\d{1,4}.\d{1,4}.\d{1,4}"
            try:
                version = re.search(pattern, key).group()
                version_array.append(version)
            except:
                continue
        highest_version = get_highest_version(version_array)
        versions[product] = highest_version
    return versions    

def return_latest_version(tags):
    return
    # valid_versions = []
    # pattern = r"^(?:(?:[0-9]*)[.](?:[0-9]*)[.](?:[0-9]*))$"
    #valid_versions = [version for version in tags if re.match(pattern, version)]
    # return sorted(valid_versions)[-1]

'''
Gets the latest version tag from the public oss mirror
Currently only supports synthetics-windows-pl
'''
if __name__ == "__main__":
    PRODUCTS = ["synthetics-windows-pl"]
    data = get_data()
    keys = get_keys(data)
    final_versions = get_versions(keys)
    print(final_versions)
    
    # TODO:
    # Write the latest version to a partial file
    # Check for changes and open a PR if there are any