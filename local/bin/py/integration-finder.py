#!/usr/bin/env python3

import os
from os.path import isdir
import git
import argparse
import json

def filter_out_dots(array):
    for dir in array:
        if dir[0] == '.':
            array.remove(dir)
    return array

def normalize(s):
    return s.strip().lower().replace('_', '-')

# Hardcode integration data
integrations_repos = {
    'integrations-core':          {'branch': 'master', 'github': True},
    'integrations-extras':        {'branch': 'master', 'github': True},
    'integrations-internal-core': {'branch': 'main',   'github': True},
    'marketplace':                {'branch': 'master', 'github': True},
    'publishing-platform':        {'branch': 'main',   'github': False},
}

# Check if the repos are present locally. If not, clone them. If so, update them
def update_repos(integrations_repos):
    for repo, cfg in integrations_repos.items():
        branch = cfg['branch']
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
    target = normalize(integration_name)
    for repo, cfg in integrations_repos.items():
        branch = cfg['branch']
        is_github = cfg['github']
        location = os.path.join('..', repo)
        dirs = [f.name for f in os.scandir(location) if f.is_dir()]
        dirs = filter_out_dots(dirs)
        for dir_name in dirs:
            manifest_path = os.path.join(location, dir_name, 'manifest.json')
            if not os.path.exists(manifest_path):
                continue
            try:
                with open(manifest_path) as fp:
                    manifest = json.load(fp)
            except Exception:
                continue
            app_id = manifest.get('app_id', '')
            if not app_id or normalize(app_id) != target:
                continue
            readme_path = os.path.join(location, dir_name, 'README.md')
            if is_github:
                url = f'https://github.com/DataDog/{repo}/blob/{branch}/{dir_name}/README.md'
                found.append(f'{readme_path}\n- {url}')
            else:
                found.append(f'{readme_path}\n- {app_id} is published through the publishing platform')
            break  # short-circuit within this repo; continue to other repos
    if len(found) == 0:
        print(f'\nIntegration "{integration_name}" not found. Check the spelling and try again.')
    elif len(found) == 1:
        print(f'\nYou can find {integration_name} here:\n- {"".join(found)}')
    else:
        print('\nMore than one integration with that name was found. Check the following:')
        for entry in found:
            print(f'{entry}\n')

parser = argparse.ArgumentParser(description="Find an integration")
parser.add_argument('integration', help="The app-id of the integration to search for (for example, rapdev-box)", type=str)
args = parser.parse_args()

integrations = update_repos(integrations_repos)
find_integration(integrations_repos, args.integration)
