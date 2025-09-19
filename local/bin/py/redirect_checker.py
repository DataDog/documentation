'''
This script checks to ensure that all moved, renamed, or deleted files have a redirect in place.
- Before you run this script, run a build so your Hugo server is running at http://localhost:1313.

The script finds a list of all files that have been moved, renamed, or deleted from the content/en directory in the current branch.
It then uses a curl request to the Hugo server to check if the file has a redirect in place.

The script will then print out a list of files that do not have a redirect in place.
'''

import requests
import os

def check_redirects():
    '''
    Check if the file has a redirect in place.
    '''
    no_redirects = []
    # Get the list of files that have been moved, renamed, or deleted
    files = get_files()
    # Check if the file has a redirect in place
    for file_info in files:
        if not check_redirect(file_info):
            print(f"No redirect found for {file_info['file_path']}")
            no_redirects.append(file_info)
    print(f"\n--------------------------------\nFound {len(no_redirects)} files without redirects:")
    print_files(no_redirects)
    return True

   
def get_files():
    '''
    Get the list of files that have been moved, renamed, or deleted in the current git branch.
    Returns a list of dictionaries with 'file_path' and 'url_path' keys.
    ''' 
    # Get the merge base (the commit where the feature branch diverged from master)
    merge_base = os.popen('git merge-base HEAD master').read().strip()
    print(f"Comparing against merge base: {merge_base}")
    
    # Get files that exist in the merge base but not in current branch (i.e., files that were moved or deleted)
    base_files = set(os.popen(f'git ls-tree -r --name-only {merge_base}').read().splitlines())
    current_files = set(os.popen('git ls-tree -r --name-only HEAD').read().splitlines())
    file_paths = list(base_files - current_files)
    # Filter the list to only include files in the content/en directory
    file_paths = [file for file in file_paths if file.startswith('content/en/')]
    file_paths = [file for file in file_paths if not file.endswith('.json')]
    
    # Convert to dictionary format with file_path and url_path
    files = []
    for file_path in file_paths:
        url_path = file_path.replace('content/en/', '').replace('.md', '').replace('_index', '')
        files.append({
            'file_path': file_path,
            'url_path': url_path
        })
    
    print(f"Found {len(files)} renamed, moved, or deleted files")
    return files
    
def check_redirect(file_info):
    '''
    Check if the file has a redirect in place
    Takes a dictionary with 'file_path' and 'url_path' keys
    '''
    url_path = file_info['url_path']
    # Get the file from the Hugo server
    response = requests.get(f'http://localhost:1313/{url_path}')
    
    # Check for 404 status code
    if response.status_code == 404:
        return False
    # Check if the response is a redirect
    if response.status_code == 301 or response.status_code == 302:
        print(f"  Redirect found: {response.headers.get('Location', 'Unknown')}")
        return True
    # Check if we got a successful response (might be the new location)
    if response.status_code == 200:
        return True
    # Other status codes indicate potential issues
    print(f"  Unexpected status code: {response.status_code}")
    return False
    
def print_files(files):
    '''
    Print the list of files
    Takes a list of dictionaries with 'file_path' and 'url_path' keys
    '''
    for file_info in files:
        print(f"File path: {file_info['file_path']}")
        print(f"URL path: http://localhost:1313/{file_info['url_path']}")
        print("---")
        
        
if __name__ == "__main__":
    check_redirects()
    print("Done")