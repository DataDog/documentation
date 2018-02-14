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


def create_reviewer_requests(org, repo, pr_num, token, reviewers=[], team_reviewers=[]):
    # there is no create reviewer request yet in PyGithub
    url = 'https://api.github.com/repos/{org}/{repo}/pulls/{pr_num}/requested_reviewers?access_token={token}'.format(
        org=org, repo=repo, pr_num=pr_num, token=token)
    data = {
      "reviewers": reviewers,
      "team_reviewers": team_reviewers
    }
    resp = requests.post(url, json=data)
    pprint(resp.content)


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
    create_reviewer_requests(config['github']['org'], config['github']['repo'], pr.number, config['github']['token'],
                             reviewers=['davidejones'])


def send_translations(config):
    # 1. just send all marked files from config
    #transifex_send_translations(config)
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


def transifex_send_translations(config):
    provider = get_provider(config)
    for source in config.get('sources', []):
        for file in glob.glob(source.get('src'), recursive=True):
            print('Uploading {}'.format(file))
            path, file_name = os.path.split(file)
            base_name, ext = os.path.splitext(file_name)
            auth = ('api', provider.get('api_key', ''))
            slug = file.replace('/', '_').replace('-', '_').replace('.', '_')
            data = {
                "i18n_type": "TXT",
                #"name": file_name,
                "name": slug,
                "slug": slug,
                'content': open(file, 'r').read()
            }
            if ext == '.md':
                data.update({
                    'i18n_type': 'GITHUBMARKDOWN',
                })
            elif ext == '.yaml':
                data.update({
                    'i18n_type': 'YML',
                })
            response = requests.post('https://www.transifex.com/api/2/project/{proj_slug}/resources/'.format(proj_slug='documentation-poc'), json=data, auth=auth)
            print(response.status_code)
            #print(response.content)


def transifex_download_translations(config):
    return []


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
        return_files = []
        for file in file_list:
            data = [
                ('apiKey', provider.get('api_key', '')),
                ('projectId', 'a2d680471'),
                ('locale', 'fr-FR'),
                ('fileUri', file.get('fileUri')),
            ]
            r = requests.get('https://api.smartling.com/v1/file/get', params=data)
            if r.status_code == 200:
                path, file_name = os.path.split(file.get('fileUri'))
                base_name, ext = os.path.splitext(file_name)
                os.makedirs('{}'.format(path), exist_ok=True)
                out_file = '{0}/{1}.{2}{3}'.format(path, base_name, 'fr', ext)
                with open(out_file, 'wb') as f:
                    f.write(r.content)
                return_files.append(out_file)
        return return_files
    else:
        print(response.content)
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
