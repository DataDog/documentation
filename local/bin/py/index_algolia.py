#!/usr/bin/env python3
import argparse
import os

from algoliasearch import algoliasearch
from bs4 import BeautifulSoup

# indexes
DOCS_BUILD_ENGLISH = 'docs_build_english'
DOCS_LIVE_ENGLISH = 'docs_english'
DOCS_BUILD_FRENCH = 'docs_build_french'
DOCS_LIVE_FRENCH = 'docs_french'


def content_location():
    path_to_content = 'public'

    return path_to_content


def index_algolia(app_id, api_key, content_path=None):
    dirs_exclude = ['js', 'images', 'fonts', 'en', 'css', 'search', 'json', 'error', 'matts quick tips', 'videos', 'ja']
    languages = ['fr']

    files_to_exclude = ['404.html']

    docs_host = 'https://docs.datadoghq.com'

    # instantiate the algolia api
    client = algoliasearch.Client(app_id, api_key)
    index_english_build = client.init_index(DOCS_BUILD_ENGLISH)
    index_french_build = client.init_index(DOCS_BUILD_FRENCH)

    # set the root path (default)
    content_path = content_path or content_location()

    def crawl_site(path, exclusions):
        articles = []

        if not os.path.exists(path):
            raise ValueError('Content folder path incorrect')
        else:

            for (dirpath, dirnames, filenames) in os.walk(path):
                dirnames[:] = [d for d in dirnames if d not in exclusions]
                filenames[:] = [f for f in filenames if f.endswith('.html') and f not in files_to_exclude]

                for filename in filenames:

                    article = {}

                    with open(os.path.join(dirpath, filename), 'rt', encoding='utf-8') as myfile:
                        try:
                            default_description = "See metrics from all of your apps, tools & services in one place with Datadog's cloud monitoring as a service solution. Try it for free."

                            html = BeautifulSoup(myfile, "html.parser")

                            # no crawl?
                            private = html.find_all('meta', {'name': 'robots', 'content': 'noindex'})
                            refresh = html.find('meta', attrs={'http-equiv': 'refresh'})
                            if private or refresh:
                                print('skipping beta or alias or refresh: %s' % dirpath)
                            else:
                                # title
                                title = html.title.string
                                if not title:
                                    title = html.select('h1')[0].text.strip()

                                if title and '://' not in title:
                                    # strip specific html
                                    [tag.extract() for tag in html.findAll("div", {"class": "whatsnext"})]

                                    # description
                                    main = html.find("div", {'main'})
                                    if not main:
                                        main = html.find("div", {'main-api'})
                                    main = main.prettify()[:7000]

                                    fm_description = html.findAll(attrs={"itemprop": "description"})[0]['content']
                                    if fm_description != default_description and '{{' not in fm_description:
                                        description = fm_description
                                    else:
                                        p_tags = html.find('p')
                                        description = str(p_tags)
                                        next_sibling = p_tags.find_next_sibling()
                                        if next_sibling and next_sibling.name == 'ul':
                                            description += str(next_sibling)

                                    # create url
                                    url_relpermalink = [item["data-relpermalink"] for item in html.find_all() if
                                                        "data-relpermalink" in item.attrs]
                                    url = docs_host + str(url_relpermalink[0]) if url_relpermalink else docs_host

                                    # create article object
                                    article['objectID'] = dirpath + '/' + filename
                                    article['URL'] = url
                                    article['title'] = title
                                    article['body'] = main
                                    article['file'] = dirpath + '/' + filename
                                    article['page_description'] = description

                                    if dirpath.startswith('public/fr'):
                                        language = 'french'
                                    else:
                                        language = 'english'

                                    article['language'] = language

                                    articles.append(article)

                        except AttributeError:
                            print('skipping %s, invalid html' % os.path.join(dirpath, filename))
                            pass

        return articles

    index_english_articles = crawl_site(content_path, dirs_exclude + languages)
    index_french_articles = crawl_site(content_path + '/fr', dirs_exclude)

    # save to algolia
    try:
        if index_english_articles:
            index_english_build.clear_index()
            try:
                index_english_build.save_objects(index_english_articles)
                client.copy_index(DOCS_BUILD_ENGLISH, DOCS_LIVE_ENGLISH)
                print('Algolia Docs Build objects have been successfully updated.')
            except algoliasearch.AlgoliaException as e:
                print(e)
                exit(1)

        if index_french_articles:
            index_french_build.clear_index()
            try:
                index_french_build.save_objects(index_french_articles)
                client.copy_index(DOCS_BUILD_FRENCH, DOCS_LIVE_FRENCH)
                print('Algolia FR Docs Build objects have been successfully updated.')
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

    index_algolia(app_id=a_id, api_key=a_key)
