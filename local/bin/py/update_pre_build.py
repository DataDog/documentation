#!/usr/bin/env python3
import csv
import fnmatch
import glob
import json
import linecache
import platform
import re
import tempfile
import shutil
from collections import OrderedDict
from functools import partial, wraps
from itertools import chain, zip_longest
from multiprocessing.pool import ThreadPool as Pool
from optparse import OptionParser
from os import sep, makedirs, getenv, remove
from os.path import exists, basename, curdir, join, abspath, normpath, dirname
import requests
import yaml
from tqdm import *
import pickle


def cache_by_sha(func):
    """ only downloads fresh file, if we don't have one or we do and the sha has changed """
    @wraps(func)
    def cached_func(*args, **kwargs):
        cache = {}
        list_item = args[1]
        dest_dir = kwargs.get('dest_dir')
        path_to_file = list_item.get('path', '')
        file_out = '{}{}'.format(dest_dir, path_to_file)
        p_file_out = '{}{}.pickle'.format(dest_dir, path_to_file)
        makedirs(dirname(file_out), exist_ok=True)
        if exists(p_file_out) and exists(file_out):
            with open(p_file_out, 'rb') as pf:
                cache = pickle.load(pf)
        cache_sha = cache.get('sha', False)
        input_sha = list_item.get('sha', False)
        if cache_sha and input_sha and cache_sha == input_sha:
            # do nothing as we have the up to date file already
            return None
        else:
            with open(p_file_out, mode='wb+') as pf:
                pickle.dump(list_item, pf, pickle.HIGHEST_PROTOCOL)
            return func(*args, **kwargs)
    return cached_func


class GitHub:
    def __init__(self, token=None):
        self.token = token

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False

    def headers(self):
        return {'Authorization': 'token {}'.format(self.token)} if self.token else {}

    def extract(self, data):
        out = []
        for item in data.get('tree', []):
            out.append({'path': item.get('path', ''), 'url': item.get('url', ''), 'type': item.get('type', ''),
                        'sha': item.get('sha', '')})
            if item.get('tree', None):
                out.append(self.extract(item.get('tree')))
        return out

    def list(self, org, repo, branch, globs=None):
        globs = [] if globs is None else globs
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
                for glob_string in globs:
                    if fnmatch.fnmatch(path, glob_string):
                        filtered_listing.append(item)
            return filtered_listing
        else:
            return listing

    @cache_by_sha
    def raw(self, list_item, org, repo, branch, dest_dir):
        headers = self.headers()
        path_to_file = list_item.get('path', '')
        file_out = '{}{}'.format(dest_dir, path_to_file)
        raw_response = requests.get(
            'https://raw.githubusercontent.com/{0}/{1}/{2}/{3}'.format(org, repo, branch, path_to_file),
            headers=headers
        )
        if raw_response.status_code == requests.codes.ok:
            makedirs(dirname(file_out), exist_ok=True)
            with open(file_out, mode='wb+') as f:
                f.write(raw_response.content)


class PreBuild:
    def __init__(self, opts):
        super().__init__()
        self.options = opts
        if self.options.dogweb and not self.options.dogweb.endswith(sep):
            self.options.dogweb = self.options.dogweb + sep
        if self.options.integrations and not self.options.integrations.endswith(sep):
            self.options.integrations = self.options.integrations + sep
        if self.options.extras and not self.options.extras.endswith(sep):
            self.options.extras = self.options.extras + sep
        self.tempdir = '/tmp' if platform.system() == 'Darwin' else tempfile.gettempdir()
        self.data_dir = '{0}{1}{2}'.format(abspath(normpath(options.source)), sep, 'data' + sep)
        self.content_dir = '{0}{1}{2}'.format(abspath(normpath(options.source)), sep, 'content' + sep)
        self.data_integrations_dir = join(self.data_dir, 'integrations') + sep
        self.data_service_checks_dir = join(self.data_dir, 'service_checks') + sep
        self.content_integrations_dir = join(self.content_dir, 'integrations') + sep
        self.extract_dir = '{0}'.format(join(self.tempdir, "extracted") + sep)
        self.integration_datafile = '{0}{1}{2}'.format(abspath(normpath(self.options.source)), sep, "integrations.json")
        self.regex_h1 = re.compile(r'^#{1}(?!#)(.*)', re.MULTILINE)
        self.regex_h1_replace = re.compile(r'^(#{1})(?!#)(.*)', re.MULTILINE)
        self.regex_metrics = re.compile(r'(#{3} Metrics\n)([\s\S]*this integration.|[\s\S]*this check.)([\s\S]*)(#{3} Events\n)', re.DOTALL)
        self.regex_service_check = re.compile(r'(#{3} Service Checks\n)([\s\S]*does not include any service check at this time.)([\s\S]*)(#{2} Troubleshooting\n)', re.DOTALL)
        self.regex_fm = re.compile(r'(?:-{3})(.*?)(?:-{3})(.*)', re.DOTALL)
        self.regex_source = re.compile(r'(\S*FROM_DISPLAY_NAME\s*=\s*\{)(.*?)\}', re.DOTALL)
        self.datafile_json = []
        self.pool_size = 5
        self.integration_mutations = OrderedDict({
            'hdfs': {'action': 'create', 'target': 'hdfs', 'remove_header': False, 'fm': {'is_public': True, 'kind': 'integration', 'integration_title': 'Hdfs', 'short_description': 'Track cluster disk usage, volume failures, dead DataNodes, and more.'}},
            'mesos': {'action': 'create', 'target': 'mesos', 'remove_header': False, 'fm': {'is_public': True, 'kind': 'integration', 'integration_title': 'Mesos', 'short_description': 'Track cluster resource usage, master and slave counts, tasks statuses, and more.'}},
            'activemq_xml': {'action': 'merge', 'target': 'activemq', 'remove_header': False},
            'cassandra_nodetool': {'action': 'merge', 'target': 'cassandra', 'remove_header': False},
            'datadog_checks_base': {'action': 'discard', 'target': 'none', 'remove_header': False},
            'datadog_checks_tests_helper': {'action': 'discard', 'target': 'none', 'remove_header': False},
            'dev': {'action': 'discard', 'target': 'none', 'remove_header': False},
            'docs': {'action': 'discard', 'target': 'none', 'remove_header': False},
            'gitlab_runner': {'action': 'merge', 'target': 'gitlab', 'remove_header': False},
            'hdfs_datanode': {'action': 'merge', 'target': 'hdfs', 'remove_header': False},
            'hdfs_namenode': {'action': 'merge', 'target': 'hdfs', 'remove_header': False},
            'mesos_master': {'action': 'merge', 'target': 'mesos', 'remove_header': True},
            'mesos_slave': {'action': 'merge', 'target': 'mesos', 'remove_header': False},
            'kafka_consumer': {'action': 'merge', 'target': 'kafka', 'remove_header': False},
            'kube_dns': {'action': 'discard', 'target': 'none', 'remove_header': False},
            'kube_proxy': {'action': 'discard', 'target': 'none', 'remove_header': False},
            'kubernetes_state': {'action': 'discard', 'target': 'none', 'remove_header': False},
            'system_core': {'action': 'discard', 'target': 'system', 'remove_header': False},
            'system_swap': {'action': 'discard', 'target': 'system', 'remove_header': False},
            'hbase_regionserver': {'action': 'merge', 'target': 'hbase_master', 'remove_header': False},
        })
        self.initial_integration_files = glob.glob('{}*.md'.format(self.content_integrations_dir))
        makedirs(self.data_integrations_dir, exist_ok=True)
        makedirs(self.data_service_checks_dir, exist_ok=True)
        makedirs(self.content_integrations_dir, exist_ok=True)

    @staticmethod
    def csv_to_yaml(key_name, csv_filename, yml_filename):
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

    def download_from_repo(self, org, repo, branch, globs):
        """
        Takes github info and file globs and downloads files from github using multiple processes
        :param org: github organization or person
        :param repo: github repo name
        :param branch: the branch name
        :param globs: list of strings in glob format of what to extract
        :return:
        """
        with GitHub(self.options.token) as gh:
            listing = gh.list(org, repo, branch, globs)
            dest = '{0}{1}{2}'.format(self.extract_dir, repo, sep)
            with Pool(processes=self.pool_size) as pool:
                r = [x for x in tqdm(
                    pool.imap_unordered(partial(gh.raw, org=org, repo=repo, branch=branch, dest_dir=dest), listing))]

    def process(self):
        """
        1. If we did not specify local dogweb directory and there is a token download dogweb repo files we need
        2. If we did not specify local integrations-core directory download with or without token as its public repo
        3. Process all files we have dogweb first integrations-core second with the latter taking precedence
        """
        print('Processing')

        dogweb_globs = ['integration/**/*_metadata.csv', 'integration/**/manifest.json',
                        'integration/**/service_checks.json', 'integration/**/README.md',
                        'dd/utils/context/source.py']
        integrations_globs = ['*[!}]/metadata.csv', '*[!}]/manifest.json', '*[!}]/service_checks.json', '*[!}]/README.md', 'docs/**']
        extras_globs = ['**/metadata.csv', '**/manifest.json', '**/service_checks.json', '**/README.md']

        # sync from dogweb, download if we don't have it (token required)
        if not self.options.dogweb:
            if self.options.token:
                self.download_from_repo('DataDog', 'dogweb', 'prod', dogweb_globs)
                self.options.dogweb = '{0}{1}{2}'.format(self.extract_dir, 'dogweb', sep)

        # sync from integrations-core, download if we don't have it (public repo so no token needed)
        if not options.integrations:
            self.download_from_repo('DataDog', 'integrations-core', 'master', integrations_globs)
            self.options.integrations = '{0}{1}{2}'.format(self.extract_dir, 'integrations-core', sep)

        # sync from integrations-extras, download if we don't have it (public repo so no token needed)
        if not options.extras:
            self.download_from_repo('DataDog', 'integrations-extras', 'master', extras_globs)
            self.options.extras = '{0}{1}{2}'.format(self.extract_dir, 'integrations-extras', sep)

        globs = []

        for d_glob, i_glob, e_glob  in zip_longest(dogweb_globs, integrations_globs, extras_globs):
            if d_glob:
                globs.append('{}{}'.format(self.options.dogweb, d_glob))
            if i_glob:
                globs.append('{}{}'.format(self.options.integrations, i_glob))
            if e_glob:
                globs.append('{}{}'.format(self.options.extras, e_glob))

        for file_name in tqdm(chain.from_iterable(glob.iglob(pattern, recursive=True) for pattern in globs)):
            self.process_source_attribute(file_name)
            self.process_integration_metric(file_name)
            self.process_integration_manifest(file_name)
            self.process_service_checks(file_name)
            self.process_integration_readme(file_name)
            self.dev_doc_integrations_core(file_name)

        self.merge_integrations()

    def merge_integrations(self):
        """ Merges integrations that come under one """
        for name, action_obj in self.integration_mutations.items():
            if name not in self.initial_integration_files:
                action = action_obj.get('action')
                target = action_obj.get('target')
                input_file = '{}{}.md'.format(self.content_integrations_dir, name)
                output_file = '{}{}.md'.format(self.content_integrations_dir, target)
                if action == 'merge':
                    with open(input_file, 'r') as content_file, open(output_file, 'a') as target_file:
                        content = content_file.read()
                        content = re.sub(self.regex_fm, r'\2', content, count=0)
                        if action_obj.get('remove_header', False):
                            content = re.sub(self.regex_h1, '', content, count=0)
                        else:
                            content = re.sub(self.regex_h1_replace, r'##\2', content, count=0)
                        target_file.write(content)
                    try:
                        remove(input_file)
                    except OSError:
                        print('the file {} was not found and could not be removed during merge action'.format(input_file))
                elif action == 'truncate':
                    if exists(output_file):
                        with open(output_file, 'r+') as target_file:
                            content = target_file.read()
                            content = re.sub(self.regex_fm, r'---\n\1\n---\n', content, count=0)
                            target_file.truncate(0)
                            target_file.seek(0)
                            target_file.write(content)
                    else:
                        open(output_file, 'w').close()
                elif action == 'discard':
                    try:
                        remove(input_file)
                    except OSError:
                        print('the file {} was not found and could not be removed during discard action'.format(input_file))
                elif action == 'create':
                    with open(output_file, 'w+') as f:
                        fm = yaml.dump(action_obj.get('fm'), default_flow_style=False).rstrip()
                        data = '---\n{0}\n---\n'.format(fm)
                        f.write(data)

    def process_source_attribute(self, file_name):
        """
        Take a single source.py file extracts the FROM_DISPLAY_NAME dict values
        and inserts them into the file something.md
        :param file_name: path to a source.py file
        """
        if file_name.endswith('dd/utils/context/source.py'):
            out = '|Integration name | API source attribute|\n'
            out += '|:---|:---|\n'
            with open(file_name, 'r') as f:
                result = f.read()
                m = re.search(self.regex_source, result)
                result = m.group(2) if m else result
                result = re.sub(r'[^0-9A-Za-z:, ]', '', result)
                for line in result.split(','):
                    pair = line.split(':')
                    if len(pair) > 1:
                        out += '|{0}|{1}|\n'.format(pair[0].strip().title(), pair[1].strip())
            with open('{}{}'.format(self.options.source, '/content/integrations/faq/list-of-api-source-attribute-value.md'), mode='r+', encoding='utf-8') as f:
                boundary = re.compile(r'^-{3,}$', re.MULTILINE)
                _, fm, content = boundary.split(f.read(), 2)
                template = "---\n{front_matter}\n---\n\n{content}\n"
                new_content = template.format(front_matter=fm.strip(), content=out)
                f.truncate(0)
                f.seek(0)
                f.write(new_content)

    def process_integration_metric(self, file_name):
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

    def dev_doc_integrations_core(self, file_name):
        """
        Take the content from https://github.com/DataDog/integrations-core/tree/master/docs/dev 
        and transform it to be displayed on the doc in the /developers/integrations section
        :param file_name: path to a file
        """
        relative_path_on_github = '/integrations-core/docs/dev/'
        doc_directory = '/developers/integrations/'

        if (relative_path_on_github in file_name and file_name.endswith('.md')): 
            
            with open(file_name, mode='r+') as f:
                content = f.read()

                # Replacing the master README.md by _index.md to follow Hugo logic
                if file_name.endswith('README.md'):
                    file_name = '_index.md'

                #Replacing links that point to the Github folder by link that point to the doc.
                new_link = doc_directory +'\\2'
                regex_github_link = re.compile(r'(https:\/\/github\.com\/DataDog\/integrations-core\/blob\/master\/docs\/dev\/)(\S+)\.md')
                content = re.sub(regex_github_link, new_link, content, count=0)

            # Writing the new content to the documentation file
            dirp = '{}{}'.format(self.content_dir, doc_directory[1:])
            makedirs(dirp, exist_ok=True)
            with open('{}{}'.format(dirp, basename(file_name)), mode='w+', encoding='utf-8') as f:
                f.write(content)

    def process_integration_manifest(self, file_name):
        """
        Take a single manifest json file and upsert to integrations.json data
        set is_public to false to hide integrations we merge later
        :param file_name: path to a manifest json file
        """
        if file_name.endswith('manifest.json'):
            names = [d.get('name', '').lower() for d in self.datafile_json if 'name' in d]
            with open(file_name) as f:
                data = json.load(f)
                data_name = data.get('name', '').lower()
                if data_name in [k for k, v in self.integration_mutations.items() if v.get('action') == 'merge']:
                    data['is_public'] = False
                if data_name in names:
                    item = [d for d in self.datafile_json if d.get('name', '').lower() == data_name]
                    if len(item) > 0:
                        item[0].update(data)
                else:
                    self.datafile_json.append(data)

    def process_service_checks(self, file_name):
        """
        Take a single service_checks.json file and copies it to the data folder
        as the integration name it came from e.g /data/service_checks/docker.json
        :param file_name: path to a service_checks json file
        """
        if file_name.endswith('service_checks.json'):
            new_file_name = '{}.json'.format(basename(dirname(normpath(file_name))))
            shutil.copy(file_name, self.data_service_checks_dir + new_file_name)

    def process_integration_readme(self, file_name):
        """
        Take a single README.md file and
        1. extract the first h1, if this isn't a merge item
        2. inject metrics after ### Metrics header if metrics exists for file
        3. inject service checks after ### Service Checks if file exists
        4. inject hugo front matter params at top of file
        5. write out file to content/integrations with filename changed to integrationname.md
        :param file_name: path to a readme md file
        """
        if file_name.endswith('.md'):
            dependencies = []
            if file_name.startswith(self.options.integrations):
                dependencies.append(file_name.replace(self.options.integrations, "https://github.com/DataDog/integrations-core/blob/master/"))
            elif file_name.startswith(self.options.extras):
                dependencies.append(file_name.replace(self.options.extras, "https://github.com/DataDog/integrations-extras/blob/master/"))
            metrics = glob.glob('{path}{sep}*metadata.csv'.format(path=dirname(file_name), sep=sep))
            metrics = metrics[0] if len(metrics) > 0 else None
            metrics_exist = metrics and exists(metrics) and linecache.getline(metrics, 2)
            service_check = glob.glob('{file}.json'.format(file=self.data_service_checks_dir + basename(dirname(file_name))))
            service_check = service_check[0] if len(service_check) > 0 else None
            service_check_exist = service_check and exists(service_check)
            manifest = '{0}{1}{2}'.format(dirname(file_name), sep, 'manifest.json')
            manifest_json = json.load(open(manifest)) if exists(manifest) else {}
            new_file_name = '{}.md'.format(basename(dirname(file_name)))
            exist_already = exists(self.content_integrations_dir + new_file_name)
            with open(file_name, 'r') as f:
                result = f.read()
                title = manifest_json.get('name', '').lower()
                if title not in [k for k, v in self.integration_mutations.items() if v.get('action') == 'merge']:
                    result = re.sub(self.regex_h1, '', result, 1)
                if metrics_exist:
                    result = re.sub(self.regex_metrics, r'\1{{< get-metrics-from-git "%s" >}}\n\3\4'%format(title), result, 0)
                if service_check_exist:
                    result = re.sub(self.regex_service_check, r'\1{{< get-service-checks-from-git "%s" >}}\n\3\4' % format(title), result, 0)
                result = "{0}\n\n{1}".format(result, '{{< get-dependencies >}}')
                result = self.add_integration_frontmatter(new_file_name, result, dependencies)
                if not exist_already:
                    with open(self.content_integrations_dir + new_file_name, 'w') as out:
                        out.write(result)

    def add_integration_frontmatter(self, file_name, content, dependencies=[]):
        """
        Takes an integration README.md and injects front matter yaml based on manifest.json data of the same integration
        :param file_name: new integration markdown filename e.g airbrake.md
        :param content: string of markdown content
        :return: formatted string
        """
        fm = {}
        template = "---\n{front_matter}\n---\n\n{content}\n"
        if file_name not in self.initial_integration_files:
            item = [d for d in self.datafile_json if d.get('name', '').lower() == basename(file_name).replace('.md', '')]
            if item and len(item) > 0:
                item[0]['kind'] = 'integration'
                item[0]['integration_title'] = item[0].get('public_title', '').replace('Datadog-', '').replace(
                    'Integration', '').strip()
                item[0]['git_integration_title'] = item[0].get('name', '').lower()
                if item[0].get('type', None):
                    item[0]['ddtype'] = item[0].get('type')
                    del item[0]['type']
                item[0]['dependencies'] = dependencies
                fm = yaml.dump(item[0], default_flow_style=False).rstrip()
            else:
                fm = {'kind': 'integration'}
        return template.format(front_matter=fm, content=content)


if __name__ == '__main__':
    parser = OptionParser(usage="usage: %prog [options] link_type")
    parser.add_option("-t", "--token", help="github access token", default=None)
    parser.add_option("-w", "--dogweb", help="path to dogweb local folder", default=None)
    parser.add_option("-i", "--integrations", help="path to integrations-core local folder", default=None)
    parser.add_option("-e", "--extras", help="path to integrations-extras local folder", default=None)
    parser.add_option("-s", "--source", help="location of src files", default=curdir)

    options, args = parser.parse_args()
    options.token = getenv('GITHUB_TOKEN', options.token) if not options.token else options.token

    pre = PreBuild(options)
    pre.process()
