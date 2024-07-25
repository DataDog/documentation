import requests
import re
from os import environ

class InvalidTokenError(Exception):
    '''
    Represents an error when no token is provided
    '''

def get_data():
    url = 'https://api.github.com/repos/DataDog/synthetics-worker/git/refs/tags'
    headers = {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    }
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        raise Exception('Failed to get tags')
    return response.json()

def get_tags(data):
    versions = []
    for tag in data:
        version = tag.get('ref', '').split('/')[-1]
        if version:
            versions.append(version)    
    return versions

def return_latest_version(tags):
    valid_versions = []
    pattern = r"^(?:(?:[0-9]*)[.](?:[0-9]*)[.](?:[0-9]*))$"
    valid_versions = [version for version in tags if re.match(pattern, version)]
    return sorted(valid_versions)[-1]

'''
Gets the latest version tag from the synthetics-worker repo
'''
if __name__ == "__main__":
    token = environ.get('GH_TOKEN')
    github_output = environ.get('GITHUB_OUTPUT')
    if token is None:
        raise InvalidTokenError('No token provided')
    data = get_data()
    tags = get_tags(data)
    latest_version = return_latest_version(tags)
    print(f'Latest version: {latest_version}')
    
    # Write the latest version to the output file
    with open(github_output, 'w', encoding='utf-8') as f:
        f.write(f'worker_version={latest_version}\n')