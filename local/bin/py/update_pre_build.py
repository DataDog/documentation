#!/usr/bin/env python3
from optparse import OptionParser
from os.path import splitext, exists, basename, curdir, join, abspath, normpath, dirname
from os import sep, makedirs, getenv
from tqdm import *
import yaml
import requests
import tempfile
import csv
import glob
import fileinput
import json
import re

"""
Variables
"""
DESC_TOKEN = "{{< get-desc-from-git >}}"
DESC_ATTRIBUTE = "short_description"
INTEGRATION_FOLDER = "content/integrations/"

OVERVIEW_TOKEN = "//get-overview-from-git//"
OVERVIEW_PATTERN = r'## Overview((?s).*)## Setup'

SETUP_TOKEN = "//get-setup-from-git//"
SETUP_PATTERN = r'## Setup((?s).*)## Data Collected'

DATA_COLLECTED_TOKEN= "//get-data-collected-from-git//"
DATA_COLLECTED_PATTERN= r'## Data Collected((?s).*)## Troubleshooting'


TROUBLESHOOTING_TOKEN ="//get-troubleshooting-from-git//"
TROUBLESHOOTING_PATTERN= r'## Troubleshooting((?s).*)## Further Reading'

FURTHER_READING_TOKEN = "//get-further-reading-from-git//"
FURTHER_READING_PATTERN= r'## Further Reading((?s).*)'

METRIC_TOKEN = "{{< get-metrics-from-git >}}"
METRIC_PATERN= r'See \[metadata\.csv\].*provided by this (integration|check).'

"""
Functions
"""

def download_github_files(token, org, repo, branch, to_path, is_dogweb=False):
    """
    Using the github api downloads manifest files to a temporary location for processing

    :param token: string of github token
    :param org: string of organization
    :param repo: string of git repository
    :param branch: string of branchname
    :param to_path: where to extract
    :param is_dogweb: if dogweb repo we need to get nested data
    """
    directory = 'integration' if is_dogweb else ''
    url = 'https://api.github.com/repos/{0}/{1}/contents/{3}?ref={2}'.format(org, repo, branch, directory)
    headers = {'Authorization': 'token {}'.format(token)} if token else {}
    excludes = ['LICENSE', 'Rakefile', 'Gemfile']
    print('Downloading files from {}/{}..'.format(repo, branch))
    response = requests.get(url, headers=headers)
    
    """
    Downloading manifest.json for integrations core repo only
    """
    if response.status_code == requests.codes.ok:
        if not is_dogweb:
            for obj in tqdm(response.json()):
                name = obj.get('name', '')
                if not name.startswith('.') and not splitext(name)[1] and name not in excludes:
                    to_manifest = '{}/manifest.json'.format(name)
                    response_manifest = requests.get('https://raw.githubusercontent.com/{0}/{1}/{2}/{3}'.format(org, repo, branch, to_manifest), headers=headers)
                    if response_manifest.status_code == requests.codes.ok:
                        with open('{}{}_manifest.json'.format(to_path, name), mode='wb+') as f:
                            f.write(response_manifest.content)
    else:
        print('There was an error ({}) listing {}/{} contents..'.format(response.status_code, repo, branch))
        exit(1)

    """
    Downloading readme.md for integrations core repo only
    """
    if response.status_code == requests.codes.ok:
        if not is_dogweb:
            for obj in tqdm(response.json()):
                name = obj.get('name', '')
                if not name.startswith('.') and not splitext(name)[1] and name not in excludes:
                    to_manifest = '{}/README.md'.format(name)
                    response_manifest = requests.get('https://raw.githubusercontent.com/{0}/{1}/{2}/{3}'.format(org, repo, branch, to_manifest), headers=headers)
                    if response_manifest.status_code == requests.codes.ok:
                        with open('{}{}_readme.md'.format(to_path, name), mode='wb+') as f:
                            f.write(response_manifest.content)
    else:
        print('There was an error ({}) listing {}/{} contents..'.format(response.status_code, repo, branch))
        exit(1)


def replace_token(to_path, key_name, content_token, data):
    """
    Inline the content of data instead of the content_token in an integration file

    :param to_path:         the output path to integration md files
    :param key_name:        integration key name for root object
    :param content_token:   token to find and replace inside the file
    :param data:            data to inline in the file
    """
    try:
        # Read in the file
        with open('{}{}.md'.format(to_path,key_name), 'r') as file :
            filedata = file.read()
        
        # Replace the target string
        filedata = filedata.replace(content_token, data)

        # Write the file out again
        with open('{}{}.md'.format(to_path,key_name), 'w') as file:
            file.write(filedata)

    except Exception as error: 
        #print(error)
        pass


def file_update_content(to_path, key_name, data_array):
    """
    Take an integration file and inline all token found inside
    
    :param to_path:         the output path to integration md files
    :param key_name:        integration key name for root object
    :param data_array:      Array of data to inline, array of array [content_token,data]
    """ 
    for obj in data_array:
        replace_token(to_path, key_name,obj[0],obj[1])


def manifest_get_data(to_path,key_name,attribute):
    """
    Extract an attribute value from the manifest of an integration
    
    :param to_path:     the output path to integration md files
    :param key_name:    integration key name for root object
    :param attribute:   attribute to get data from
    :return: manifest.json attribute
    """ 
    with open('{}{}_manifest.json'.format(to_path, key_name)) as manifest:
        manifest_json = json.load(manifest)
        return manifest_json[attribute]

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
    parser.add_option("-s", "--source", help="location of src files", default=curdir)
    return parser.parse_args(args)


def readme_get_section(from_path,key_name):
    """
    Take an integration readme file, extract all sections following this pattern:
        ## Overview
        ## Setup
        ## Data Collected
        ## Troubleshooting
        ## Further Reading

    :param: from_path: folder where the integration readme is
    :param key_name:    integration key name for root object
    :return: an array of [TOKEN, section_scraped ] 
    """

    data_array=[]
    with open('{}{}_readme.md'.format(from_path, key_name)) as readme:
        filedata = readme.read()

        result = re.search(OVERVIEW_PATTERN, filedata)
        if result:
            data_array.append([OVERVIEW_TOKEN,result.group(1)])
        else:
            print("unable to find the pattern {} in file {}{}".format(OVERVIEW_PATTERN,from_path, key_name))

        result = re.search(SETUP_PATTERN, filedata)
        if result:
            data_array.append([SETUP_TOKEN,result.group(1)])
        else:
            print("unable to find the pattern {} in file {}{}".format(SETUP_PATTERN,from_path, key_name))

        result = re.search(DATA_COLLECTED_PATTERN, filedata)
        if result:
            try:
                #Inlining metric token to display metric array
                result = re.sub(METRIC_PATERN,METRIC_TOKEN, result.group(1))
            except Exception as error:
                print(error)
                pass
            data_array.append([DATA_COLLECTED_TOKEN,result])
        else:
            print("unable to find the pattern {} in file {}{}".format(DATA_COLLECTED_PATTERN,from_path, key_name))

        result = re.search(TROUBLESHOOTING_PATTERN, filedata)
        if result:
            data_array.append([TROUBLESHOOTING_TOKEN,result.group(1)])
        else:
            print("unable to find the pattern {} in file {}{}".format(TROUBLESHOOTING_PATTERN,from_path, key_name))

        result = re.search(FURTHER_READING_PATTERN, filedata)
        if result:
            data_array.append([FURTHER_READING_TOKEN,result.group(1)])
        else:
            print("unable to find the pattern {} in file {}{}".format(FURTHER_READING_PATTERN,from_path, key_name))

    return data_array

def update_integration_pre_build(from_path=None, to_path=None):
    """
    All modifications that may happen to a integration content are here
    
    :param from_path:   the input path where we scrap data from
    :param to_path:     the output path to integration md files
    """
    
    if exists(from_path):
        pattern = '**/*_manifest.json'
        for file_name in tqdm(sorted(glob.glob('{}{}'.format(from_path, pattern), recursive=True))):
            key_name = basename(file_name.replace('_manifest.json', ''))
            
            """
            Scraping all sections that we can found
            """
            data_array = readme_get_section(from_path, key_name)

            """
            Gathering the manifest short description and adding the right token
            """

            data_array.append([DESC_TOKEN,manifest_get_data(from_path,key_name,DESC_ATTRIBUTE)])

            """
            Inlining the data in the doc file
            """
            file_update_content(to_path, key_name, data_array)
    else:
        print('Path does not exist: {}'.format(from_path))
        exit(1)

def sync(*args):
    """
    Given optional arguments generate yaml integration data from dogweb / integrations-core
    using either local or remote data

    :param args: list of arguments
    """

    # collect arguments
    options, args = parse_args(*args)

    # attempt to get token from env vars, take explicit arg over envs
    options.token = getenv('GITHUB_TOKEN', options.token) if not options.token else options.token

    # setup path variables
    extract_path = '{}'.format(join(tempfile.gettempdir(), "extracted") + sep)
    dogweb_extract_path = '{}'.format(extract_path + 'dogweb' + sep)
    integrations_extract_path = '{}'.format(extract_path + 'integrations-core' + sep)
    dest_dir = '{}{}{}'.format(abspath(normpath(options.source)), sep, join('data', 'integrations') + sep)
    
    if options.integrations:
        options.integrations = abspath(normpath(options.integrations))
        if not options.integrations.endswith(sep):
            options.integrations += sep

    if options.dogweb:
        options.dogweb = abspath(normpath(options.dogweb))
        if not options.dogweb.endswith(sep):
            options.dogweb += sep

    # create data/integrations and other dirs if non existing
    makedirs(dest_dir, exist_ok=True)
    makedirs(dogweb_extract_path, exist_ok=True)
    makedirs(dogweb_extract_path + 'integration' + sep, exist_ok=True)
    makedirs(integrations_extract_path, exist_ok=True)


    # sync from integrations, download if we don't have it (public repo so no token needed)
    # (this takes precedence so will overwrite yaml files)
    if not options.integrations:
        options.integrations = integrations_extract_path
        download_github_files(options.token, 'DataDog', 'integrations-core', 'master', options.integrations)
    
    print('Updating integrations description...')
    update_integration_pre_build(options.integrations, INTEGRATION_FOLDER)

if __name__ == '__main__':
    sync()
