#!/usr/bin/env python3

import argparse
import requests
import json
from os import getenv


def pull_rbac():
    print("Pulling latest permissions data")
    parser = argparse.ArgumentParser()
    parser.add_argument('apikey', default='')
    parser.add_argument('appkey', default='')
    args = parser.parse_args()

    permissions_api_endpoint = 'https://app.datadoghq.com/api/v2/permissions'
    roles_api_endpoint = 'https://app.datadoghq.com/api/v2/roles/templates'
    headers = {'DD-API-KEY': args.apikey, 'DD-APPLICATION-KEY': args.appkey}
    
    formatted_permissions_dict = {}
    permissions_json = None
    roles_json = None

    try:
        permissions_res = requests.get(permissions_api_endpoint, headers=headers)
        roles_res = requests.get(roles_api_endpoint, headers=headers)
        
        permissions_res.raise_for_status()
        roles_res.raise_for_status()
        
        permissions_json = permissions_res.json()
        roles_json = roles_res.json()

    except Exception as e:
        if getenv("CI_COMMIT_REF_NAME"):
            print('\x1b[31mERROR\x1b[0m: RBAC api request failed. Aborting')
            raise e
        else:
            print('\x1b[33mWARNING\x1b[0m: RBAC api request failed. Acceptable behavior locally when missing api/app keys')
            print(f'\x1b[33mWARNING\x1b[0m: RBAC api request failure reason: {e}')
            pass

    if permissions_json and roles_json:
        permissions_data = permissions_json.get('data', [])
        default_roles_data = roles_json.get('data', [])

        # ignores UI template roles ('Datadog Billing Admin Role' and 'Datadog Security Admin Role')
        # reliable ordered structure of roles for lookup. from least permissive (read only) -> most permissive (admin)
        role_hierarchy = ['Datadog Read Only Role', 'Datadog Standard Role', 'Datadog Admin Role']
        default_roles_hierarchy = []
        
        # create hierarchical role list
        for role_x in role_hierarchy:
            for role_y in default_roles_data:
                if role_y['attributes']['name'] == role_x:
                    default_roles_hierarchy.append(role_y)
                    break
            

        for permission in permissions_data:
            synthetics_settings_url = 'https://docs.datadoghq.com/synthetics/platform/settings/?tab=specifyvalue#default-settings'
            synthetics_settings_permissions = ['synthetics_default_settings_read', 'synthetics_default_settings_write']
            group_name = permission['attributes']['group_name']
            permission_name = permission['attributes']['name']
            permission_description = permission['attributes']['description']
            permission_role_name = ''

            if permission_name in synthetics_settings_permissions:
                permission['attributes']['description_link'] = synthetics_settings_url

            # lookup. get least permissive role for a permission
            for role in default_roles_hierarchy:
                if permission_role_name:
                    break # permission role name is found. stop iterating over default roles
                role_name = role['attributes']['name']
                role_permissions = role['relationships']['permissions']['data']

                for role_permission in role_permissions:
                    # Match permission id to a role. assign permission_role_name
                    # assign permission_role_name - relies on order of Admin, Standard, and Read Only roles in default_role_hierarchy.
                    if role_permission['id'] == permission['id']:
                        permission_role_name = role_name
                        break # once permission role name is found, stop iterating through role permissions
        
            # Ignore legacy logs permissions from dictionary before converting to JSON.  
            # These legacy permissions are hard-coded in rbac-permissions-table partial until they can be deprecated.
            # Ignore Deprecated permissions
            if (permission_name not in ('logs_live_tail', 'logs_read_index_data')) and ("Deprecated" not in permission_description):
                permission.setdefault('role_name', permission_role_name) # add role name
                formatted_permissions_dict.setdefault(group_name, []).append(permission) # {group_name: permissions[]}

        formatted_permissions_json = json.dumps(formatted_permissions_dict)

        with open('data/permissions.json', 'w+') as outfile:
            outfile.write(formatted_permissions_json)


pull_rbac()
