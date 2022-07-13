#!/usr/bin/env python3

import sys
import requests
import json
from os import getenv
from collections import defaultdict

def pull_rbac():
  api_endpoint = 'https://app.datadoghq.com/api/v2/permissions'
  headers = {'DD-API-KEY': sys.argv[1], 'DD-APPLICATION-KEY': sys.argv[2]}
  formatted_permissions_dict = {}

  r = requests.get(api_endpoint, headers=headers)

  if r.status_code == requests.codes.ok:
    json_result = r.json()
    data = json_result.get('data', []);

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
  else:
    print(r)

    # if in gitlab we need to exit with failure
    # if in local we need to continue
    if getenv("CI_COMMIT_REF_NAME"):
        print('\x1b[31mERROR\x1b[0m: RBAC api request failed. Aborting')
        sys.exit(1)
    else:
        print('\x1b[33mWARNING\x1b[0m: RBAC api request failed. Acceptable behavior locally when missing api keys')

pull_rbac()

