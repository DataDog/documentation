#!/usr/bin/env python3

import yaml
from pprint import pprint
import os
from os.path import isdir
import git
import argparse
import re

'''
Find the source repo for a given integration.

TODO:
- Remove from make. Add to dedicated CLI
- Make repo + branch finder a separate module
- Make branch updater a separate module / command
'''

def filter_out_dots(array):
    for dir in array:
        if dir[0] == '.':
            array.remove(dir)
    return array

# Grab DataDog repos data from pull_config
def grab_repos_data():
    with open('local/bin/py/build/configurations/pull_config.yaml', 'r') as file:
        repo_data = yaml.safe_load(file)
    for item in repo_data:
        for child in item:
            if child == 'data':
                for org in item[child]:
                    if org['org_name'] == 'DataDog':
                        dd_org_repos = org['repos']

    # collect source repos and primary branches for integrations
    integrations_repos = []
    for repo in dd_org_repos:
        for item in repo['contents']:
            if item['action'] == 'integrations' or item['action'] == 'marketplace-integrations':
                integrations_repos.append({repo['repo_name']: item['branch']})
    return integrations_repos

# Check if the repos are present locally. If not, clone them. If so, update them
def update_repos(integrations_repos):
    for repo in integrations_repos:
        for k in repo:
            local_repo_path = os.path.join('..', k)
            if isdir(local_repo_path):
                try:
                    print(f'Updating {k}: {repo[k]}')
                    local_repo = git.Repo(local_repo_path)
                    local_repo.remotes.origin.pull(repo[k])
                except: 
                    print(f'\n\x1b[33mWARNING\x1b[0m:Failed to update {k}: {repo[k]}' +
                          '\nContinuing without updating the repo. ' + 
                          f'To resolve, check {k} for a dirty feature branch and commit, ' +
                          'stash, or reset any changes and try again.\n')
            else:
                print(f'{k}: {repo[k]} not found. Cloning to {local_repo_path}')
                git.Repo.clone_from(url=f'git@github.com:DataDog/{k}.git', to_path=local_repo_path)

# Find the given integration in the integrations repos
def find_integration(integrations_repos, integration_name):
    found = []
    for repo in integrations_repos:
        for k in repo:
            integration_list = []
            location = os.path.join('..', k)
            url = f'- https://github.com/DataDog/{k}/blob/{repo[k]}/{integration_name}/README.md'
            if k == 'dogweb':
                location = location + '/integration'
                url = f'- https://github.com/DataDog/{k}/blob/{repo[k]}/integration/{integration_name}/README.md'
            integration_list = [f.name for f in os.scandir(location) if f.is_dir()]
            integration_list = filter_out_dots(integration_list)
            if integration_name in integration_list:
                found.append(f'{location}/{integration_name}/README.md\n{url}')
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

integrations_repos = grab_repos_data()
integrations = update_repos(integrations_repos)
find_integration(integrations_repos, args.integration)
