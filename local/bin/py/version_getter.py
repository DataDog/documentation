#!/usr/bin/env python3
import re
import os
import json
import requests
import semver

VERSION_KEY_PATTERN = re.compile(r'^\d+\.\d+\.\d+$')
WORKER_URL_PATTERN = re.compile(
    r'datadog-synthetics-worker-(\d+\.\d+\.\d+)\.amd64\.msi'
)


def get_data(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("Failed to retrieve version information from URL: " + url)
    return response


def _max_semver_version(versions):
    if not versions:
        raise Exception("Failed to find latest release")
    return str(max(versions, key=semver.Version.parse))


def is_newer_version(latest_version, current_version):
    if not current_version:
        return True
    return semver.compare(latest_version, current_version) > 0


def get_synthetics_worker_version(data):
    '''Get the highest published worker version from installers.json.'''
    data = data.json()
    spl = data.get("synthetics-private-location", {})
    versions = []

    for key in spl:
        if VERSION_KEY_PATTERN.match(key):
            versions.append(key)

    latest_url = spl.get("latest", {}).get("x86_64", {}).get("url", "")
    if latest_url:
        match = WORKER_URL_PATTERN.search(latest_url)
        if match:
            versions.append(match.group(1))
        else:
            raise Exception("Failed to extract latest version")

    return _max_semver_version(versions)


def get_private_action_runner_version(data):
    '''Get the latest version'''
    data = data.json()
    latest_info = data.get("data", {}).get("id", "")
    if latest_info:
        # Extract version from the image tag (e.g., "gcr.io/datadoghq/private-action-runner:v1.7.0" -> "1.7.0")
        match = re.search(r":v(\d+\.\d+\.\d+)", latest_info)
        if match:
            version = match.group(1)
            return version
        else:
            raise Exception("Failed to extract version from image tag: " + latest_info)
    else:
        raise Exception("Failed to find latest release")

'''
Gets the latest version tag from
https://ddsynthetics-windows.s3.amazonaws.com/installers.json
'''
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Get latest version information')
    parser.add_argument('--url', required=True, help='URL to fetch version data from')
    parser.add_argument('--file-name', required=True, help='Target file name to update')
    
    args = parser.parse_args()
    url = args.url
    file_name = args.file_name
    
    if not url or not file_name:
        raise Exception("Missing required arguments: URL and file name are required")
    
    github_output = os.getenv('GITHUB_OUTPUT')
    data = get_data(url)
    client = ""
    if file_name == "synthetics_worker_versions.json":
        latest_version = get_synthetics_worker_version(data)
        client = "synthetics-windows-pl"
    elif file_name == "private_action_runner_version.json":
        latest_version = get_private_action_runner_version(data)
        client = "private-action-runner"
    else:
        raise Exception("Invalid file name: " + file_name)

    try:
        with open(f'data/{file_name}', 'r') as f:
            current_versions = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        current_versions = {}

    current_version = current_versions[0].get('version') if current_versions else None
    print("Current version: ", current_version)
    print("Latest version: ", latest_version)

    if is_newer_version(latest_version, current_version) and client:
        print("New version detected: ", latest_version)
        final_versions = [{
            "client": client,
            "version": latest_version
        }]
        with open(f'data/{file_name}', 'w') as f:
            f.write(json.dumps(final_versions, indent=4, sort_keys=True))
        if github_output:
            with open(github_output, 'a', encoding='utf-8') as f:
                f.write('new_version=true\n')
        else:
            print("A new version was found!")
    else:
        if current_version and semver.compare(latest_version, current_version) < 0:
            print(
                "Skipping update: remote version",
                latest_version,
                "is older than current",
                current_version,
            )
        if github_output:
            with open(github_output, 'a', encoding='utf-8') as f:
                f.write('new_version=false\n')
        else:
            print("No new version detected")
