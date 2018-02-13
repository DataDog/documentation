#!/usr/bin/env python3
import glob
from optparse import OptionParser
import os
from os import getenv
import sys
import yaml
import requests
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


def send_translations(config):
    #transifex_send_translations()
    smartling_send_translations(config)


def receive_translations(config):
    #transifex_download_translations()
    smartling_download_translations()


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
    pprint(config)
    if options.send:
        send_translations(config)
    elif options.receive:
        receive_translations(config)
    else:
        print("fatal error, specify sending -s or receiving -r", file=sys.stderr)
