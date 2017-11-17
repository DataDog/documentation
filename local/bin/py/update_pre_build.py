#!/usr/bin/env python3
from optparse import OptionParser
from os.path import splitext, exists, basename, curdir, join, abspath, normpath, dirname

from tqdm import *
from os import sep, makedirs, getenv
import platform
import yaml
import requests
import tempfile
import csv
import glob
import json
import re
import fnmatch


class GitHub:
    def __init__(self, token=None):
        self.token = token

    def headers(self):
        return {'Authorization': 'token {}'.format(self.token)} if self.token else {}

    def extract(self, data):
        out = []
        for item in data.get('tree', []):
            out.append({'path': item.get('path', ''), 'url': item.get('url', ''), 'type': item.get('type', ''), 'sha': item.get('sha', '')})
            if item.get('tree', None):
                out.append(self.extract(item.get('tree')))
        return out

    def list(self, org, repo, branch, globs=[]):
        listing = []
        # get the latest sha
        url = 'https://api.github.com/repos/{0}/{1}/git/refs/heads/{2}'.format(org, repo, branch)
        headers = self.headers()
        print('Getting latest sha from {}/{}..'.format(repo, branch))
        sha_response = requests.get(url, headers=headers)
        if sha_response.status_code == requests.codes.ok:
            sha = sha_response.json().get('object', {}).get('sha', None)
            if sha:
                print('Getting tree from {}/{} @ {}'.format(repo, branch, sha))
                tree_response = requests.get(
                    'https://api.github.com/repos/{0}/{1}/git/trees/{2}?recursive=1'.format(org, repo, sha),
                    headers=headers)
                if tree_response.status_code == 200:
                    listing = self.extract(tree_response.json())

        if globs:
            filtered_listing = []
            for item in listing:
                path = item.get('path', '')
                for glob in globs:
                    if fnmatch.fnmatch(path, glob):
                        filtered_listing.append(item)
            return filtered_listing
        else:
            return listing

    def raw(self, org, repo, branch, path_to_file, file_out):
        headers = self.headers()
        raw_response = requests.get(
            'https://raw.githubusercontent.com/{0}/{1}/{2}/{3}'.format(org, repo, branch, path_to_file),
            headers=headers
        )
        if raw_response.status_code == requests.codes.ok:
            with open(file_out, mode='wb+') as f:
                f.write(raw_response.content)


class PreBuild:
    def __init__(self, options):
        super().__init__()
        self.options = options
        self.tempdir = self.get_temp_dir()
        self.data_dir = '{0}{1}{2}'.format(abspath(normpath(options.source)), sep, 'data' + sep)
        self.content_dir = '{0}{1}{2}'.format(abspath(normpath(options.source)), sep, 'content' + sep)
        self.data_integrations_dir = join(self.data_dir, 'integrations') + sep
        self.content_integrations_dir = join(self.content_dir, 'integrations') + sep
        self.extract_dir = '{0}'.format(join(self.tempdir, "extracted") + sep)

    def get_temp_dir(self):
        return '/tmp' if platform.system() == 'Darwin' else tempfile.gettempdir()

    def csv_to_yaml(self, key_name, csv_filename, yml_filename):
        """
        Given a file path to a single csv file convert it to a yaml file

        :param key_name: integration key name for root object
        :param csv_filename: path to input csv file
        :param yml_filename: path to output yml file
        """
        yaml_data = {key_name: []}
        with open(csv_filename) as csv_file:
            reader = csv.DictReader(csv_file, delimiter=',')
            yaml_data[key_name] = [dict(line) for line in reader]
        if yaml_data[key_name]:
            with open(file=yml_filename, mode='w', encoding='utf-8') as f:
                f.write(yaml.dump(yaml_data, default_flow_style=False))

    def process(self):
        print('Processing')
        gh = GitHub(self.options.token)

        # sync from dogweb, download if we don't have it (token required)
        if not self.options.dogweb:
            if self.options.token:
                listing = gh.list('DataDog', 'dogweb', 'prod', ['integration/**/*_metadata.csv', 'integration/**/manifest.json', 'integration/**/README.md'])
                dest = self.extract_dir + 'dogweb' + sep
                for item in tqdm(listing):
                    path_to_file = item.get('path')
                    file_out = '{}{}'.format(dest, path_to_file)
                    makedirs('{}{}'.format(dest, dirname(path_to_file)), exist_ok=True)
                    gh.raw('DataDog', 'dogweb', 'prod', path_to_file, file_out)
                # set dogweb dir to our extracted
                self.options.dogweb = dest

        # sync from integrations-core, download if we don't have it (public repo so no token needed)
        if not options.integrations:
            listing = gh.list('DataDog', 'integrations-core', 'master', ['**/metadata.csv', '**/manifest.json', '**/README.md'])
            dest = self.extract_dir + 'integrations-core' + sep
            for item in tqdm(listing):
                path_to_file = item.get('path')
                file_out = '{}{}'.format(dest, path_to_file)
                makedirs('{}{}'.format(dest, dirname(path_to_file)), exist_ok=True)
                gh.raw('DataDog', 'integrations-core', 'master', path_to_file, file_out)
            # set integrations-core dir to our extracted
            self.options.integrations = dest

        # add any additional processing of downloaded files here
        # if you need additional files for processing add to globs above
        self.process_metrics()
        self.process_integrations_datafile()
        self.process_readmes()

    def process_metrics(self):
        print('Processing metrics into yaml files at data/integrations/')
        makedirs(self.data_integrations_dir, exist_ok=True)
        if exists(self.options.dogweb):
            for file_name in tqdm(sorted(glob.glob('{}{}'.format(self.options.dogweb, 'integration/**/*.csv'), recursive=True))):
                key_name = basename(file_name.replace('_metadata.csv', ''))
                new_file_name = '{}{}.yaml'.format(self.data_integrations_dir, key_name)
                self.csv_to_yaml(key_name, file_name, new_file_name)

        if exists(self.options.integrations):
            for file_name in tqdm(sorted(glob.glob('{}{}'.format(self.options.integrations, '**/*.csv'), recursive=True))):
                key_name = basename(dirname(normpath(file_name)))
                new_file_name = '{}{}.yaml'.format(self.data_integrations_dir, key_name)
                self.csv_to_yaml(key_name, file_name, new_file_name)

    def process_integrations_datafile(self):
        print('Processing integrations into integrations.json')
        integration_datafile = '{0}{1}{2}'.format(abspath(normpath(self.options.source)), sep, "integrations.json")
        existing_json = []

        # create the integrations datafile if for some reason its not there
        if not exists(integration_datafile):
            print('create {}...'.format(integration_datafile))
            with open(integration_datafile, 'w') as outfile:
                json.dump(existing_json, outfile, sort_keys=True, indent=4)
        else:
            with open(integration_datafile) as f:
                existing_json = json.load(f)

        # get list of names in existing json
        names = [d['name'] for d in existing_json if 'name' in d]

        if exists(self.options.dogweb):
            for file_name in tqdm(sorted(glob.glob('{}{}'.format(self.options.dogweb, 'integration/**/manifest.json'), recursive=True))):
                with open(file_name) as data_file:
                    data = json.load(data_file)
                    name = data.get('name', '')
                    if name in names:
                        # update
                        for obj in existing_json:
                            if obj.get('name', '') == name:
                                obj.update(data)
                    else:
                        # add to file
                        existing_json.append(data)
                    # write back out changes
                    with open(integration_datafile, 'w') as outfile:
                        json.dump(existing_json, outfile, sort_keys=True, indent=4)

        if exists(self.options.integrations):
            for file_name in tqdm(sorted(glob.glob('{}{}'.format(self.options.integrations, '**/manifest.json'), recursive=True))):
                with open(file_name) as data_file:
                    data = json.load(data_file)
                    name = data.get('name', '')
                    if name in names:
                        # update
                        for obj in existing_json:
                            if obj.get('name', '') == name:
                                obj.update(data)
                    else:
                        # add to file
                        existing_json.append(data)
                    # write back out changes
                    with open(integration_datafile, 'w') as outfile:
                        json.dump(existing_json, outfile, sort_keys=True, indent=4)

    def process_readmes(self):
        print('Processing integration readmes into content/integrations')
        # - mkdir integrations if it doesn't exist
        makedirs(self.content_integrations_dir, exist_ok=True)
        if exists(self.options.dogweb):
            for file_name in tqdm(sorted(glob.glob('{}{}'.format(self.options.dogweb, 'integration/**/README.md'), recursive=True))):
                dir_name = basename(dirname(file_name))
                manifest = '{0}{1}{2}'.format(dirname(file_name), sep, 'manifest.json')
                manifest_json = json.load(open(manifest)) if exists(manifest) else {}
                h1reg = re.compile(r'^\s*#\s*(\w+)', re.MULTILINE)
                metricsreg = re.compile(r'(#{3} Metrics\n)(.*?)(\s*#)(.*)', re.DOTALL)
                with open(file_name, 'r') as data_file:
                    result = data_file.read()
                    # remove h1
                    result = re.sub(h1reg, '', result, 0)
                    # update the metrics
                    result = re.sub(metricsreg, r'\1{{< get-metrics-from-git >}}\3\4', result, re.DOTALL)
                    # add required front-matter yaml for hugo
                    result = self.add_integration_frontmatter(result, manifest_json, dir_name)
                    # rename the file to be the correct integration name and write out file
                    new_file_name = '{}.md'.format(basename(dirname(file_name)))
                    with open(self.content_integrations_dir + new_file_name, 'w') as outfile:
                        outfile.write(result)

        if exists(self.options.integrations):
            for file_name in tqdm(sorted(glob.glob('{}{}'.format(self.options.integrations, '**/README.md'), recursive=True))):
                dir_name = basename(dirname(file_name))
                manifest = '{0}{1}{2}'.format(dirname(file_name), sep, 'manifest.json')
                manifest_json = json.load(open(manifest)) if exists(manifest) else {}
                h1reg = re.compile(r'^\s*#\s*(\w+)', re.MULTILINE)
                metricsreg = re.compile(r'(#{3} Metrics\n)(.*?)(\s*#)(.*)', re.DOTALL)
                with open(file_name, 'r') as data_file:
                    result = data_file.read()
                    # remove h1
                    result = re.sub(h1reg, '', result, 0)
                    # update the metrics
                    result = re.sub(metricsreg, r'\1{{< get-metrics-from-git >}}\3\4', result, re.DOTALL)
                    # add required front-matter yaml for hugo
                    result = self.add_integration_frontmatter(result, manifest_json, dir_name)
                    # rename the file to be the correct integration name and write out file
                    new_file_name = '{}.md'.format(basename(dirname(file_name)))
                    with open(self.content_integrations_dir + new_file_name, 'w') as outfile:
                        outfile.write(result)

    def add_integration_frontmatter(self, content, data, dir_name):
        template = "---\n{front_matter}\n---\n\n{content}\n"
        yml = {
            'title': data.get('public_title', ''),
            'integration_title': dir_name.lower(),
            'kind': 'integration',
            'git_integration_title': data.get('name', ''),
            'newhlevel': True,
            'description': data.get('short_description', ''),
            'aliases': data.get('aliases', [])
        }
        fm = yaml.dump(yml, default_flow_style=False).rstrip()
        return template.strip(' \t\n\r').format(front_matter=fm, content=content)

if __name__ == '__main__':
    parser = OptionParser(usage="usage: %prog [options] link_type")
    parser.add_option("-t", "--token", help="github access token", default=None)
    parser.add_option("-w", "--dogweb", help="path to dogweb local folder", default=None)
    parser.add_option("-i", "--integrations", help="path to integrations-core local folder", default=None)
    parser.add_option("-s", "--source", help="location of src files", default=curdir)

    options, args = parser.parse_args()
    options.token = getenv('GITHUB_TOKEN', options.token) if not options.token else options.token

    pre = PreBuild(options)
    pre.process()
