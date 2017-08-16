#!/usr/bin/env python3
import argparse
import os
import re
import yaml
import glob
import time

from algoliasearch import algoliasearch
from bs4 import BeautifulSoup
from markdown import markdown


def content_location():

    this_dir = os.getcwd()

    path_to_content = 'public'

    return path_to_content


def index_algolia(app_id, api_key, content_path=None):

    client = algoliasearch.Client(app_id, api_key)

    index_english = client.init_index('docs_english')
    index_japanese = client.init_index('docs_japanese')

    index_english_articles = []
    index_japanese_articles = []

    remove_articles = []

    dirs_exclude = ('js','images','fonts','en','css', 'search')
    files_to_exclude = ('404.html')

    docs_host = 'https://docs.datadoghq.com'

    try:

        content_path = content_path or content_location()
        content_location_exists = os.path.exists(content_path)

        if not content_location_exists:
            raise ValueError('Content folder path incorrect')
        else:

            for (dirpath, dirnames, filenames) in os.walk(content_path):
                dirnames[:] = [d for d in dirnames if d not in dirs_exclude]

                filenames[:] = [f for f in filenames if f.endswith('.html') and f not in files_to_exclude]

                for filename in filenames:

                    lang = ''

                    if dirpath.startswith("public/ja"):

                        lang = 'ja'

                    article = {}

                    url = ''
                    algolia_object = ''
                    with open(os.path.join(dirpath, filename), 'rt', encoding='utf-8') as myfile:

                        html = BeautifulSoup(myfile, "lxml")
                        main = html.find("div", {"main"})

                        main_text = ''
                        if main:
                            main_text = main.text
                            desc_text = main_text.split()[:100]


                        title = html.title.string

                        if not title:
                            title = html.select('h1')[0].text.strip()

                        fm_description = desc = html.findAll(attrs={"name":"description"})
                        description = ''

                        if fm_description:
                            description = desc[0]['content'].encode('utf-8')
                        else:

                            desc_text = " ".join(desc_text)
                            description = desc_text

                        url_relpermalink = [item["data-relpermalink"] for item in html.find_all() if "data-relpermalink" in item.attrs]

                        if url_relpermalink:
                            url_path = str(url_relpermalink[0])

                        url = docs_host+url_path

                        article['objectID'] = dirpath+'/'+filename
                        article['URL'] = url
                        article['title'] = title
                        article['body'] = description
                        article['file'] = dirpath+'/'+filename

                        if lang == 'ja':
                            index_japanese_articles.append(article)
                        else:
                            index_english_articles.append(article)

            # save public articles to algolia index
            try:
                index_english.save_objects(index_english_articles)
                index_japanese.save_objects(index_japanese_articles)
                print('Algolia Docs objects have been successfully updated.')
            except algoliasearch.AlgoliaException as e:
                print(e)
                exit(1)
    except ValueError as e:
        exit(str(e))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--app_id", help="Application ID")
    parser.add_argument("--api_key", help="Private Algolia API key")

    a_id = parser.parse_args().app_id
    a_key = parser.parse_args().api_key

    if not a_key:
        try:
            key = os.environ['ALGOLIA_API_KEY']
        except KeyError:
            key = input("Algolia API key: ")

    index_algolia(app_id=a_id, api_key=a_key)