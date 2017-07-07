#!/usr/bin/env python3

from optparse import OptionParser
from pathlib import Path
import yaml
import os
import tarfile
import requests
import tempfile
import csv
import glob


def csv_to_yaml(keyname, csv_filename, yml_filename):
    """
    Given a file path to a single csv file convert it to a yaml file

    :param csv_filename: path to input csv file
    :param yml_filename: path to output yml file
    """
    yaml_data = {keyname: []}
    with open(csv_filename) as csv_file:
        reader = csv.DictReader(csv_file, delimiter=',')
        for line in reader:
            yaml_data[keyname].append(dict(line))
    if yaml_data[keyname]:
        with open(file=yml_filename, mode='w', encoding='utf-8') as f:
            f.write(yaml.dump(yaml_data, default_flow_style=False))


def download_github_repo_tar(token, org, repo, branch, path):
    """
    Downloads a stream tar.gz file from github of a certain organisation/branch/repo
    and extracts csv files to tmp directory for parsing

    :param token: string of github token
    :param org: string of organization
    :param repo: string of git repository
    :param branch: string of branchname
    :param path: where to extract
    """
    url = 'https://api.github.com/repos/{0}/{1}/tarball/{2}'.format(org, repo, branch)
    headers = {'Accept': 'application/vnd.github.v3.raw'}
    if token:
        headers.update({'Authorization': 'token {}'.format(token)})
    print('Downloading {} {}..'.format(repo, branch))
    response = requests.get(url, headers=headers, stream=True)
    if response.status_code == requests.codes.ok:
        with tarfile.open(mode='r|gz', fileobj=response.raw) as tar:
            tar.extractall(path=path, members=(i for i in tar if i.name.endswith('metadata.csv')))


def sync_from_dogweb(from_path=None, to_path=None):
    """
    Converts csv files to yaml for dogweb

    :param from_path: path to input csvs
    :param to_path: path to output ymls
    """
    print('Syncing integrations from dogweb')
    from_path = from_path if str(from_path).endswith(os.sep) else "{}{}".format(from_path, os.sep)
    to_path = to_path if str(to_path).endswith(os.sep) else "{}{}".format(to_path, os.sep)
    if Path(from_path).is_dir():
        for file_name in sorted(glob.glob('{}{}'.format(from_path, '**/*.csv'), recursive=True)):
            keyname = os.path.basename(file_name.replace('_metadata.csv', ''))
            new_file_name = '{}{}.yaml'.format(to_path, keyname)
            csv_to_yaml(keyname, file_name, new_file_name)


def sync_from_integrations(from_path=None, to_path=None):
    """
    Converts csv files to yaml for integrations-core

    :param from_path: path to input csvs
    :param to_path: path to output ymls
    """
    print('Syncing integrations from integrations-core')
    from_path = from_path if str(from_path).endswith(os.sep) else "{}{}".format(from_path, os.sep)
    to_path = to_path if str(to_path).endswith(os.sep) else "{}{}".format(to_path, os.sep)
    if Path(from_path).is_dir():
        for file_name in sorted(glob.glob('{}{}'.format(from_path, '**/*.csv'), recursive=True)):
            keyname = os.path.basename(os.path.dirname(os.path.normpath(file_name)))
            new_file_name = '{}{}.yaml'.format(to_path, keyname)
            csv_to_yaml(keyname, file_name, new_file_name)


def parse_args(args=None):
    """
    Given a list of arguments parse them using ArgumentParser

    :param args: list of arguments
    :return: instance of tuple of values and arguments
    """
    parser = OptionParser(usage="usage: %prog [options] link_type")
    parser.add_option("-t", "--token", help="github access token", default=None)
    parser.add_option("-w", "--dogweb", help="path to dogweb local folder", default=None)
    parser.add_option("-i", "--integrations", help="path to integrations-core local folder", default=None)
    return parser.parse_args(args)


def sync(*args):
    """
    Given optional arguments generate yaml integration data from dogweb / integrations-core
    using either local or remote data

    :param args: list of arguments
    """

    # collect arguments
    options, args = parse_args(*args)

    # attempt to get token from env vars, take explicit arg over envs
    if not options.token:
        options.token = os.getenv('GITHUB_TOKEN', options.token)

    # setup path variables
    github_extract_path = '{}'.format(''.join([tempfile.gettempdir(), os.sep, "extracted"]))
    site_root_dir = Path(__file__).joinpath(Path('../../../../')).resolve()
    yml_dest_dir = site_root_dir.joinpath(Path('data/integrations'))

    # create data/integrations if non existing
    yml_dest_dir.mkdir(exist_ok=True, parents=True)

    # sync from dogweb, download if we don't have it (token required)
    if not options.dogweb:
        if options.token:
            download_github_repo_tar(options.token, 'DataDog', 'dogweb', 'master', github_extract_path)
            options.dogweb = github_extract_path
            sync_from_dogweb(options.dogweb, yml_dest_dir)
        else:
            print('No Github token.. dogweb retrieval failed')
    else:
        sync_from_dogweb(options.dogweb, yml_dest_dir)

    # sync from integrations, download if we don't have it (public repo so no token needed)
    # (this takes precedence so will overwrite yaml files)
    if not options.integrations:
        download_github_repo_tar(options.token, 'DataDog', 'integrations-core', 'master', github_extract_path)
        options.integrations = github_extract_path
    sync_from_integrations(options.integrations, yml_dest_dir)


if __name__ == '__main__':
    sync()
