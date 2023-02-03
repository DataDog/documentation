#!/usr/bin/env python3
from os import getenv, path
from sys import exit
import requests


def list_out_of_sync_transifex_resources():
    """
    Identifies transifex resources that no longer exist in the repo and can be removed from the Transifex.
    *Note* on local runs please do `make clean-all && make start` first so files built via single-sourcing are included.
    """
    print('Identifying files out of sync with Transifex...')
    transifex_api_key = getenv("TRANSIFEX_API_KEY")

    if not transifex_api_key:
        print('Transifex API key was not found, exiting')
        exit(1)

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


if __name__ == "__main__":
    list_out_of_sync_transifex_resources()
