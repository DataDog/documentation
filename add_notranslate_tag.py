import json
import requests
api_url = 'https://rest.api.transifex.com'
bearer_token = 'your token here' # DO NOT COMMIT
string_collection_id = 'o:datadog:p:websites-modules:r:config__default_menus_menus_en_yaml' # Hardcoded collection id pointing to menus.en.yamml

# Build payload for updating resource string
def build_payload(string_id):
    payload = {
        "data": {
            "attributes": {
                "tags": [
                    "notranslate"
                ]
            },
            "id": string_id,
            "type": "resource_strings"
        }
    }
    return json.dumps(payload)

# Update resource string
def update_resource_string(string_id, token):
    try:
        url = f"{api_url}/resource_strings/{string_id}"
        headers = {
            "Content-Type": "application/vnd.api+json",
            "Authorization": f"Bearer {token}"
        }
        payload = build_payload(string_id)
        response = requests.patch(url, headers=headers, data=payload)
        return response
    except requests.exceptions.RequestException as e:
        print(e)
        return None

# Fetch string collection
def get_string_collection(string_collection_id, token):
    try:
        url = f"{api_url}/resource_strings?filter[resource]={string_collection_id}"
        headers = {
            "Authorization": f"Bearer {token}"
        }
        response = requests.get(url, headers=headers)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(e)
        return None

# Loop through JSON object
# If key is not 'name', update resource string with notranslate tag
def iterate_collection(collection):
    for entry in collection['data'][:2]: # Hardcoded to 2 for testing purposes
        string_id = entry['id']
        key_parts = entry['attributes']['key'].split('.')
        key_val = key_parts[len(key_parts) - 1]
        if key_val != 'name':
            resp = update_resource_string(string_id, bearer_token)
            if resp is not None:
                print('Successfully updated resource string ' + string_id)
            else:
                print('Failed to update resource string' + string_id)

# Get string collection and store as JSON object
def main():
    data = get_string_collection(string_collection_id, bearer_token)
    if data is not None:
        iterate_collection(data)
    else:
        print('Failed to fetch string collection')

main()




