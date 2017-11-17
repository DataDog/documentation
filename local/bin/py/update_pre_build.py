#!/usr/bin/env python3
import linecache
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
from itertools import chain


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
        self.integration_datafile = '{0}{1}{2}'.format(abspath(normpath(self.options.source)), sep, "integrations.json")
        self.regex_h1 = re.compile(r'^\s*#\s*(\w+)', re.MULTILINE)
        self.regex_metrics = re.compile(r'(#{3} Metrics\n)(.*?)(\s*#)(.*)', re.DOTALL)
        self.datafile_json = []
        self.pool_size = 5

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
        """
        1. If we did not specify local dogweb directory and there is a token download dogweb repo files we need
        2. If we did not specify local integrations-core directory download with or without token as its public repo
        3. Process all files we have dogweb first integrations-core second with the latter taking precedence
        """
        print('Processing')
        gh = GitHub(self.options.token)

        dogweb_globs = ['integration/**/*_metadata.csv', 'integration/**/manifest.json', 'integration/**/README.md']
        integrations_globs = ['**/metadata.csv', '**/manifest.json', '**/README.md']

        # sync from dogweb, download if we don't have it (token required)
        if not self.options.dogweb:
            if self.options.token:
                listing = gh.list('DataDog', 'dogweb', 'prod', dogweb_globs)
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
            listing = gh.list('DataDog', 'integrations-core', 'master', integrations_globs)
            dest = self.extract_dir + 'integrations-core' + sep
            for item in tqdm(listing):
                path_to_file = item.get('path')
                file_out = '{}{}'.format(dest, path_to_file)
                makedirs('{}{}'.format(dest, dirname(path_to_file)), exist_ok=True)
                gh.raw('DataDog', 'integrations-core', 'master', path_to_file, file_out)
            # set integrations-core dir to our extracted
            self.options.integrations = dest

        # prep before loop
        makedirs(self.data_integrations_dir, exist_ok=True)
        makedirs(self.content_integrations_dir, exist_ok=True)
        if not exists(self.integration_datafile):
            with open(self.integration_datafile, 'w') as outfile:
                json.dump([], outfile, sort_keys=True, indent=4)

        # add any additional processing of downloaded files here
        # if you need additional files for processing add to globs above
        print('starting file processing')

        globs = ['{}{}'.format(self.options.dogweb, x) for x in dogweb_globs]
        globs.extend(['{}{}'.format(self.options.integrations, x) for x in integrations_globs])

        for file_name in tqdm(chain.from_iterable(glob.iglob(pattern, recursive=True) for pattern in globs)):
            self.process_metrics(file_name)
            self.process_integrations_datafile(file_name)
            self.process_readmes(file_name)

        with open(self.integration_datafile, 'w') as out:
            json.dump(self.datafile_json, out, sort_keys=True, indent=4)

    def process_metrics(self, file_name):
        """
        Take a single metadata csv file and convert it to yaml
        :param file_name: path to a metadata csv file
        """
        if file_name.endswith('.csv'):
            if file_name.endswith('/metadata.csv'):
                key_name = basename(dirname(normpath(file_name)))
            else:
                key_name = basename(file_name.replace('_metadata.csv', ''))
            new_file_name = '{}{}.yaml'.format(self.data_integrations_dir, key_name)
            self.csv_to_yaml(key_name, file_name, new_file_name)

    def process_integrations_datafile(self, file_name):
        """
        Take a single manifest json file and upsert to integrations.json data
        :param file_name: path to a manifest json file
        """
        if file_name.endswith('.json'):
            names = [d.get('name', '').lower() for d in self.datafile_json if 'name' in d]
            with open(file_name) as f:
                data = json.load(f)
                data_name = data.get('name', '').lower()
                if data_name in names:
                    item = [d for d in self.datafile_json if d.get('name', '').lower() == data_name]
                    if len(item) > 0:
                        item[0].update(data)
                else:
                    self.datafile_json.append(data)

    def process_readmes(self, file_name):
        """
        Take a single README.md file and
        1. extract the first h1
        2. inject metrics after ### Metrics header if metrics exists for file
        3. inject hugo front matter params
        4. write out file to content/integrations with filename changed to integrationname.md
        :param file_name: path to a readme md file
        """
        if file_name.endswith('.md'):
            dir_name = basename(dirname(file_name))
            metrics = glob.glob('{path}{sep}*metadata.csv'.format(path=dirname(file_name), sep=sep))
            metrics = metrics[0] if len(metrics) > 0 else None
            metrics_exist = metrics and exists(metrics) and linecache.getline(metrics, 2)
            manifest = '{0}{1}{2}'.format(dirname(file_name), sep, 'manifest.json')
            manifest_json = json.load(open(manifest)) if exists(manifest) else {}
            new_file_name = '{}.md'.format(basename(dirname(file_name)))
            exist_already = exists(self.content_integrations_dir + new_file_name)
            with open(file_name, 'r') as f:
                result = f.read()
                result = re.sub(self.regex_h1, '', result, 0)
                if metrics_exist:
                    result = re.sub(self.regex_metrics, r'\1{{< get-metrics-from-git >}}\3\4', result, re.DOTALL)
                result = self.add_integration_frontmatter(result, manifest_json, dir_name)
                if not exist_already:
                    with open(self.content_integrations_dir + new_file_name, 'w') as out:
                        out.write(result)

    def add_integration_frontmatter(self, content, data, dir_name):
        """
        Takes an integration README.md and injects front matter yaml based on manifest.json data of the same integration
        :param content: string of markdown content
        :param data: json dict of manifest
        :param dir_name: the integration name
        :return:
        """
        template = "---\n{front_matter}\n---\n\n{content}\n"
        yml = {
            'title': data.get('public_title', ''),
            'integration_title': dir_name,
            'kind': 'integration',
            'git_integration_title': data.get('name', '').lower(),
            'newhlevel': True,
            'description': data.get('short_description', ''),
            'aliases': data.get('aliases', [])
        }
        fm = yaml.dump(yml, default_flow_style=False).rstrip()
        return template.format(front_matter=fm, content=content)

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
