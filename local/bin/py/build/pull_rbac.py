#!/usr/bin/env python3

import argparse
import sys
import requests
import json
from os import getenv
from collections import defaultdict


def pull_rbac():
    parser = argparse.ArgumentParser()
    parser.add_argument('apikey', default='')
    parser.add_argument('appkey', default='')
    args = parser.parse_args()
    api_endpoint = 'https://app.datadoghq.com/api/v2/permissions'
    headers = {'DD-API-KEY': args.apikey, 'DD-APPLICATION-KEY': args.appkey}
    formatted_permissions_dict = {}
    json_result = None

    try:
        r = requests.get(api_endpoint, headers=headers)
        r.raise_for_status()
        json_result = r.json()
    except Exception as e:
        if getenv("CI_COMMIT_REF_NAME"):
            print('\x1b[31mERROR\x1b[0m: RBAC api request failed. Aborting')
            raise e
        else:
            print('\x1b[33mWARNING\x1b[0m: RBAC api request failed. Acceptable behavior locally when missing api/app keys')
            print(f'\x1b[33mWARNING\x1b[0m: RBAC api request failure reason: {e}')
            pass

    if json_result:
        data = json_result.get('data', [])

        for permission in data:
            group_name = permission['attributes']['group_name']
            permission_name = permission['attributes']['name']

            # Remove legacy logs permissions from dictionary before converting to JSON.  These legacy permissions are hard-coded in rbac-permissions-table partial until they can be deprecated.
            if permission_name in ('logs_live_tail', 'logs_read_index_data'):
                continue
            else:
                formatted_permissions_dict.setdefault(group_name, []).append(permission)

        formatted_permissions_json = json.dumps(formatted_permissions_dict)

        with open('data/permissions.json', 'w+') as outfile:
            outfile.write(formatted_permissions_json)

pull_rbac()
