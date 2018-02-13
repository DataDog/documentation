#!/usr/bin/env python3
import glob
from optparse import OptionParser
import os
from os import getenv
import sys
import yaml
import requests
from github import Github, GithubException, InputGitTreeElement
from datetime import datetime
from pprint import pprint


def parse_config(options):
    config = {}
    with open(options.config) as file:
        config = yaml.load(file.read())
    if options.token:
        if 'github' in config:
            config['github']['token'] = options.token
        else:
            config['github'] = {'token': options.token}
    if options.apikey:
        provider = get_provider(config)
        provider['api_key'] = options.apikey
    return config


def get_provider(config):
    return list(filter(lambda x: x.get('enabled', False), config.get('provider')))[0]


def add_to_github(config, file_list):
    g = Github(config['github']['token'])
    org = g.get_organization(config['github']['org'])
    repo = org.get_repo(config['github']['repo'])

    # Create a new branch from master
    sb = repo.get_branch(config['github']['branch_from'])
    branch_name = 'translation-{}-{}'.format('fr', datetime.utcnow().strftime('%Y%m%d%H%M'))
    print('Creating branch {} from {} ..'.format(branch_name, config['github']['branch_from']))
    branch_ref = repo.create_git_ref(ref='refs/heads/' + branch_name, sha=sb.commit.sha)

    # Commit new files to branch
    print('Committing {} files to {}..'.format(len(file_list), branch_name))
    branch_sha = branch_ref.object.sha
    base_tree = repo.get_git_tree(branch_sha)
    element_list = list()
    for entry in file_list:
        with open(entry, 'r', encoding='utf-8') as input_file:
            data = str(input_file.read())
        element = InputGitTreeElement(entry, '100644', 'blob', data)
        element_list.append(element)
    tree = repo.create_git_tree(element_list, base_tree)
    parent = repo.get_git_commit(branch_sha)
    commit = repo.create_git_commit(config['github']['commit_message'], tree, [parent])
    branch_ref.edit(commit.sha)

    # create a pr from branch + pr
    pr = repo.create_pull(config['github']['pr_title'], config['github']['pr_body'], config['github']['pr_to'], branch_name)
    # there is no create reviewer request yet..


def send_translations(config):
    # 1. just send all marked files from config
    #transifex_send_translations()
    smartling_send_translations(config)


def receive_translations(config):
    # 1. download translated files
    #file_list = transifex_download_translations()
    file_list = smartling_download_translations()
    # 2. get translations into repo
    if len(file_list):
        add_to_github(config, file_list)
    else:
        print('no translations downloaded')


def smartling_send_translations(config):
    provider = get_provider(config)
    for source in config.get('sources', []):
        for file in glob.glob(source.get('src'), recursive=True):
            print('Uploading {}'.format(file))
            path, file_name = os.path.split(file)
            base_name, ext = os.path.splitext(file_name)
            files = {
                'file': (file, open(file, 'rb')),
                'apiKey': (None, provider.get('api_key', '')),
                'projectId': (None, 'a2d680471'),
                'fileUri': (None, file),
            }
            if ext == '.md':
                files.update({
                    'fileType': (None, 'plaintext'),
                    'smartling.placeholder_format_custom': (None, '\\[\\[.*?]]|]\\(.*?\\)|\\[|\\]|#+\\s|::|^[*-]\\s|^>'),
                })
            elif ext == '.yaml':
                files.update({
                    'fileType': (None, 'yaml'),
                })
            response = requests.post('https://api.smartling.com/v1/file/upload', files=files)
            print(response.status_code)
            # if response.status_code == 200:
            #     data = response.json()['response']
            #     pprint(data)
            # else:
            #     pprint(response.content)


def smartling_download_translations():
    provider = get_provider(config)
    data = [
        ('apiKey', provider.get('api_key', '')),
        ('projectId', 'a2d680471'),
        ('locale', 'fr-FR'),
        ('conditions', 'haveAllTranslated'), #haveAllApproved
    ]
    response = requests.get('https://api.smartling.com/v1/file/list', params=data)
    if response.status_code == 200:
        data = response.json()
        file_count = data['response']['data']['fileCount']
        file_list = data['response']['data']['fileList']
        print('{} files ready to download'.format(file_count))
        os.makedirs('./tmp', exist_ok=True)
        for file in file_list:
            data = [
                ('apiKey', provider.get('api_key', '')),
                ('projectId', 'a2d680471'),
                ('locale', 'fr-FR'),
                ('fileUri', file.get('fileUri')),
            ]
            r = requests.get('https://api.smartling.com/v1/file/get', params=data)
            if r.status_code == 200:
                os.makedirs('./tmp/{}'.format(os.path.split(file.get('fileUri'))[0]), exist_ok=True)
                with open('./tmp/{}'.format(file.get('fileUri')), 'wb') as f:
                    f.write(r.content)
        return [file.get('fileUri') for file in file_list if 'fileUri' in file]
    else:
        return []


if __name__ == '__main__':
    parser = OptionParser(usage="usage: %prog [options] link_type")
    parser.add_option("-t", "--token", help="github access token", default=None)
    parser.add_option("-k", "--apikey", help="api key for transifex or smartling", default=None)
    parser.add_option("-c", "--config", help="location of config file", default=None)
    parser.add_option("-s", "--send", help="sending translations", default=False, action='store_true')
    parser.add_option("-r", "--receive", help="receiving translations", default=False, action='store_true')

    options, args = parser.parse_args()
    options.token = getenv('GITHUB_TOKEN', options.token) if not options.token else options.token

    if not options.config:
        print("fatal error, config file required", file=sys.stderr)

    config = parse_config(options)
    if options.send:
        send_translations(config)
    elif options.receive:
        receive_translations(config)
    else:
        print("fatal error, specify sending -s or receiving -r", file=sys.stderr)
