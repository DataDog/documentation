#!/usr/bin/env python3

import sys
import requests
import json

def pull_rbac():
  api_endpoint = 'https://app.datadoghq.com/api/v2/permissions'
  headers = {'DD-API-KEY': sys.argv[1], 'DD-APPLICATION-KEY': sys.argv[2]}
  formatted_permissions_dict = {}

  r = requests.get(api_endpoint, headers=headers)

  if r.status_code == requests.codes.ok:
    json_result = r.json()
    data = json_result['data']

    for permission in data:
      group_name = permission['attributes']['group_name']

      if group_name not in formatted_permissions_dict.keys():
        formatted_permissions_dict[group_name] = [permission]
      else:
        formatted_permissions_dict[group_name].append(permission)

    formatted_permissions_json = json.dumps(formatted_permissions_dict)

    with open('data/permissions.json', 'w') as outfile:
      outfile.write(formatted_permissions_json)
  else:
    # API request failed
    print('API request failed')

pull_rbac()

