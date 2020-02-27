#!/usr/bin/env python3
import argparse
import json
import os
import re
from bs4 import BeautifulSoup
from optparse import OptionParser

def find_private_url(path, exclusions):
    """
    Look at all files within a given folder tree (starting from path) except
    For the `exclusions` folders
    :param path: Root folder into which to look for private URL
    :param exclusions: Array of folder names to exclude for looking for private files.
    :return private_urls: A list of HTML doc private file paths.
    """
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
                  print('\x1b[32mINFO\x1b[0m: Skipping private page: %s' % dirpath)
                  private_urls.append(dirpath)

    return private_urls

def transform_url(private_urls):
    """
    Transforms URL returned by removing the public/ (name of the local folder with all hugo html files)
    into "real" documentation links for Algolia
    :param private_urls: Array of file links in public/ to transform into doc links.
    :return new_private_urls: A list of documentation URL links that correspond to private doc files.
    """
    new_private_urls = []
    for url in private_urls:

        ## We check if the url is not a localised FAQ url, or an API page if so we don't include it in list of stopped url
        ## Since Localised FAQs are not indexed anyway and the API page is indexed as a whole
        if not (re.match(r"public/fr/.*/faq/.*", url) or re.match(r"public/ja/.*/faq/.*", url) or re.match(r"public/ja/api/.*", url) or re.match(r"public/fr/api/.*", url)):

          ## We add /$ to all links in order to make them all "final", in fact
          ## Algolia stop_url parameter uses regex and not "perfect matching" link logic
          new_private_urls.append(url.replace('public/','docs.datadoghq.com/') + '/$')

    return new_private_urls

def update_algolia_private_url(docs_index_config,private_urls):
    """
    Updates the Algolia Docsearch configuration file with the list of private links to exclude from
    Algolia indexes.
    :param docs_index_config: Original configuration file for the Algolia Doc search
    :param private_urls: A list of documentation URL links that correspond to private doc files.
    """
    with open(docs_index_config, 'rt', encoding='utf-8') as json_file:
        print("\x1b[32mINFO\x1b[0m: Configuration file {} correctly loaded.".format(docs_index_config))
        config = json.load(json_file)

        print("\x1b[32mINFO\x1b[0m: Adding list of private URLs.")

        ## adding list or private urls while removing duplicates + sorting the global list
        config["stop_urls"] = sorted(list(dict.fromkeys(config["stop_urls"] + private_urls)))

    print("\x1b[32mINFO\x1b[0m: Addition complete, updating Algolia main configuration file with the new one.")

    with open(docs_index_config, 'w+', encoding='utf-8') as json_file:
        json.dump(config, json_file)


if __name__ == "__main__":
    parser = OptionParser(usage="usage: %prog [options] create placeholder pages for multi-language")
    parser.add_option("-c", "--config_location", help="location of the doc search config", default='')
    parser.add_option("-d", "--excluded_directory", help="directories to skip from detecting private", default='[]')
    parser.add_option("-l", "--excluded_language", help="languages to skip from detecting private", default='[]')

    (options, args) = parser.parse_args()
    options = vars(options)

    print("\x1b[32mINFO\x1b[0m: Detecting the list of URL flagged noindex, nofollow:\n")
    if options["excluded_language"] != []:
        private_urls = find_private_url('public', options["excluded_directory"])
    else:
        private_urls = find_private_url('public', options["excluded_directory"] + options["excluded_language"])

    print("\x1b[32mINFO\x1b[0m: Transforming links to make them match the algolia logic:\n")
    private_urls=transform_url(private_urls)

    print("\x1b[32mINFO\x1b[0m: Updating Algolia docsearch configuration file:\n")
    update_algolia_private_url(options["config_location"],private_urls)

    print("\x1b[32mINFO\x1b[0m: Algolia docsearch config update \o/")
