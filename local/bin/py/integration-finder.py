#!/usr/bin/env python3

import os
from os.path import isdir
import git
import argparse

def filter_out_dots(array):
    for dir in array:
        if dir[0] == '.':
            array.remove(dir)
    return array

# Hardcode integration data
integrations_repos = {
    'integrations-core': 'master',
    'integrations-extras': 'master',
    'integrations-internal-core': 'main',
    'marketplace':'master'
}

# Check if the repos are present locally. If not, clone them. If so, update them
def update_repos(integrations_repos):
    for repo, branch in integrations_repos.items():
        local_repo_path = os.path.join('..', repo)
        if isdir(local_repo_path):
            try:
                print(f'Updating {repo}')
                local_repo = git.Repo(local_repo_path)
                # Check if working tree is clean
                # If there are uncommitted changes, stash them before pulling updates
                if local_repo.is_dirty():
                    print(f'\n\x1b[33mWARNING\x1b[0m: {repo} has uncommitted changes. Stashing changes before pulling updates.')
                    local_repo.git.stash('save', 'Stashing changes before pulling updates')
                local_repo.git.checkout(branch)
                # Pull the latest changes from the remote repository
                print(f'\tPulling latest changes from {repo} on branch {branch}')
                local_repo.remotes.origin.pull(branch)
            except: 
                print(f'\n\x1b[33mWARNING\x1b[0m:Failed to update {repo}' +
                        '\nContinuing without updating the repo. ' + 
                        f'To resolve, check {repo} for a dirty feature branch and commit, ' +
                        'stash, or reset any changes and try again.\n')
        else:
            print(f'{repo} not found. Cloning to {local_repo_path}')
            git.Repo.clone_from(url=f'git@github.com:DataDog/{repo}.git', to_path=local_repo_path)

# Find the given integration in the integrations repos
def find_integration(integrations_repos, integration_name):
    found = []
    for repo,branch in integrations_repos.items():
        integration_list = []
        location = os.path.join('..', repo)
        url = f'https://github.com/DataDog/{repo}/blob/{branch}/{integration_name}/README.md'
        integration_list = [f.name for f in os.scandir(location) if f.is_dir()]
        integration_list = filter_out_dots(integration_list)
        if integration_name in integration_list:
            readme_path = os.path.join(location, integration_name, 'README.md')
            if os.path.exists(readme_path):
                found.append(f'{location}/{integration_name}/README.md\n- {url}')
    if len(found) == 0:
        print(f'\nIntegration "{integration_name}" not found. Check the spelling and try again.')
    elif len(found) == 1:
        print(f'\nYou can find {integration_name} here:\n- {"".join(found)}')
    else:
        
        print('\nMore than one integration with that name was found. Check the following:')
        for entry in found:
            print(f'{entry}\n')

parser = argparse.ArgumentParser(description="Find an integration")
parser.add_argument('integration', help="The name of the integration to search for", type=str)
args = parser.parse_args()

integrations = update_repos(integrations_repos)
find_integration(integrations_repos, args.integration)
