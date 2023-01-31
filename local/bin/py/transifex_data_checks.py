#!/usr/bin/env python3
from os import getenv, path
import requests

def get_transifex_files_out_of_sync():
    print('Starting...')
    transifex_api_key = getenv("TRANSIFEX_API_KEY")

    next_page_url = 'https://rest.api.transifex.com/resources?filter[project]=o:datadog:p:documentation_loc'

    while next_page_url:
        headers = {'Authorization': f'Bearer {transifex_api_key}'}
        response = requests.get(next_page_url, headers=headers)
        response.raise_for_status()
        resources_dict = response.json()
        resources_data = resources_dict.get('data', {})

        for resource in resources_data:
            attributes = resource.get('attributes', {})
            base_file_path = attributes.get('categories', [])[0]
            file_name = attributes.get('name', '')
            source_file_path = f'{base_file_path}/{file_name}'

            if not path.exists(source_file_path):
                print(f'File path does not exist in repo: {source_file_path}')

        next_page_url = resources_dict.get('links', {}).get('next', '')


get_transifex_files_out_of_sync()
