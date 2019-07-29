#!/usr/bin/env python3
import argparse
import json
import os
from bs4 import BeautifulSoup
from optparse import OptionParser

def find_private_url(path, exclusions):

    private_urls=[]

    if not os.path.exists(path):
        raise ValueError('Content folder path incorrect')
    else:
        for (dirpath, dirnames, filenames) in os.walk(path):
            dirnames[:] = [d for d in dirnames if d not in exclusions]
            filenames[:] = [f for f in filenames if f.endswith('.html')]
            for filename in filenames:
                with open(os.path.join(dirpath, filename), 'rt', encoding='utf-8') as current_file:
                        html = BeautifulSoup(current_file, "html.parser")

                        if html.find_all('meta', {'name': 'robots', 'content': 'noindex, nofollow'}):
                            print('skipping private: %s' % dirpath)
                            private_urls.append(dirpath)

    return private_urls

def transform_url(private_urls):
    new_private_urls = []

    for url in private_urls:
        new_private_urls.append(url.replace('public/','docs.datadoghq.com/') + '/$')

    return new_private_urls

def update_algolia_private_url(docs_index_config,private_urls):

    with open(docs_index_config, 'rt', encoding='utf-8') as json_file:
        print("Configuration file {} correctly loaded.".format(docs_index_config))
        config = json.load(json_file)

        print("Adding list of private URLs.")
        for url in private_urls:
            config["stop_urls"].append(url)

    print("Addition complete, updating Algolia main configuration file with the new one: \n {} \n".format(config))

    with open(docs_index_config, 'w+', encoding='utf-8') as json_file:
        json.dump(config, json_file)

if __name__ == "__main__":
    parser = OptionParser(usage="usage: %prog [options] create placeholder pages for multi-language")
    parser.add_option("-c", "--config_location", help="location of the doc search config")
    parser.add_option("-d", "--excluded_directory", help="directories to skip from detecting private")
    parser.add_option("-l", "--excluded_language", help="languages to skip from detecting private")

    (options, args) = parser.parse_args()
    options = vars(options)

    print("Detecting the list of URL to not index:\n")
    private_urls = find_private_url('public', options["excluded_directory"] + options["excluded_language"])

    print("Transforming links to make them match the algolia logic:\n")
    private_urls=transform_url(private_urls)

    print("List of URLs to not index with Algolia:\n {} \n".format(private_urls))

    print("Updating Algolia docsearch configuration file:\n")
    update_algolia_private_url(options["config_location"],private_urls)

    print("Algolia docsearch config update \o/")
