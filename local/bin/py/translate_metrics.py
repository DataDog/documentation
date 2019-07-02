#!/usr/bin/env python3
from optparse import OptionParser

import requests
from datadog import initialize, api


def main(options):
    dd_keys = {'api_key': options.corpapikey}
    initialize(**dd_keys)

    res = requests.get("https://api.transifex.com/organizations/datadog/projects/?details", auth=('api', options.apikey))
    projects = res.json()

    for project in projects:
        metrics = []
        metrics.append({
            'metric': f'translations.stringcount',
            'points': project.get('stringcount', 0),
            'tags': ['name:{}'.format(project["name"])]
        })
        metrics.append({
            'metric': f'translations.wordcount',
            'points': project.get('wordcount', 0),
            'tags': ['name:{}'.format(project["name"])]
        })
        metrics.append({
            'metric': f'translations.total_resources',
            'points': project.get('total_resources', 0),
            'tags': ['name:{}'.format(project["name"])]
        })

        # send metrics
        try:
            response = api.Metric.send(metrics)
            print(response)
        except Exception as e:
            print(e)


if __name__ == '__main__':
    parser = OptionParser(usage="usage: %prog [options]")
    parser.add_option("-k", "--apikey", help="transifex api key", default=None)
    parser.add_option("-a", "--corpapikey", help="corp api key", default=None)
    options, args = parser.parse_args()
    main(options)
