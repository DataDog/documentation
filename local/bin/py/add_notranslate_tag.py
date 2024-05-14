#!/usr/bin/env python3

import json
import requests
import os

api_url = 'https://rest.api.transifex.com'
string_collection_ids = [
    'o:datadog:p:documentation_loc:r:config__default_menus_main_en_yaml',
    'o:datadog:p:documentation_loc:r:config__default_menus_api_en_yaml'
]

def get_bearer_authorization_header():
    """
    Return authorization header containing Transifex API key
    to be used when making network calls to Transifex
    """
    api_key = os.environ['transifex_api_key']
    return {'Authorization': f'Bearer {api_key}'}

# Build payload for updating resource string
def build_payload(string_id,tag=None):
    tagArr = []
    if(tag is not None):
        tagArr.append(tag)
        
    payload = {
        "data": {
            "attributes": {
                "tags": tagArr
            },
            "id": string_id,
            "type": "resource_strings"
        }
    }
    return json.dumps(payload)

# Update resource string
def update_resource_string(string_id,payload):
    try:
        url = f"{api_url}/resource_strings/{string_id}"
        headers = get_bearer_authorization_header()
        headers['Content-Type'] = 'application/vnd.api+json'
        requests.patch(url, headers=headers, data=payload)
    except requests.exceptions.RequestException as e:
        print(e)
       

# Fetch string collection
def get_string_collection(url):
    try:
        headers = get_bearer_authorization_header()
        response = requests.get(url, headers=headers)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(e)
        return None

# Loop through JSON object
# If key is not 'name', update resource string with notranslate tag
def iterate_collection(collection):
    for entry in collection['data']:
        string_id = entry['id']
        key_parts = entry['attributes']['key'].split('.') # assumption that the last value in array will be the key name
        key_val = key_parts[len(key_parts) - 1]
        if key_val != 'name':
            update_resource_string(string_id,build_payload(string_id)) # clear out existing tags
            update_resource_string(string_id,build_payload(string_id,'notranslate')) # add notranslate tag


# Get string collection and store as JSON object
def add_tag():
    for collection_id in string_collection_ids:
        next_page_url = f"{api_url}/resource_strings?filter[resource]={collection_id}"
        
        while next_page_url:
            data = get_string_collection(next_page_url)
            if data is not None:
                iterate_collection(data)
            else:
                print('Failed to fetch string collection ' + collection_id)
            
            next_page_url = data.get('links', {}).get('next', '')
            
    print('Job complete')

# Start script
add_tag()