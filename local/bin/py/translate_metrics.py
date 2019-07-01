#!/usr/bin/env python3
from optparse import OptionParser

import requests
from datadog import initialize, api


def main(options):
    dd_keys = {'api_key': options.corpapikey}
    initialize(**dd_keys)

    res = requests.get("https://api.transifex.com/organizations/datadog/projects/?details", auth=('api', options.apikey))
    projects = res.json()

    docs_project = {}
    for project in projects:
        if project.get('name', '') == 'Documentation':
            docs_project = project

    # build and send metrics if we have the docs project data
    if docs_project:
        metrics = []
        metrics.append({
          'metric': f'translations.{docs_project["slug"]}.stringcount',
          'points': docs_project.get('stringcount', 0),
          'tags': ['docs_translations']
        })
        metrics.append({
          'metric': f'translations.{docs_project["slug"]}.wordcount',
          'points': docs_project.get('wordcount', 0),
          'tags': ['docs_translations']
        })
        metrics.append({
          'metric': f'translations.{docs_project["slug"]}.total_resources',
          'points': docs_project.get('total_resources', 0),
          'tags': ['docs_translations']
        })

        # send metrics
        try:
            response = api.Metric.send(metrics)
            print(response)
        except Exception as e:
            print(e)
    else:
        print("There was a problem retrieving project stats")


if __name__ == '__main__':
    parser = OptionParser(usage="usage: %prog [options]")
    parser.add_option("-k", "--apikey", help="transifex api key", default=None)
    parser.add_option("-a", "--corpapikey", help="corp api key", default=None)
    options, args = parser.parse_args()
    main(options)
