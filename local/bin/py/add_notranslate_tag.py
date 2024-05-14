#!/usr/bin/env python3

from transifex.api import transifex_api
import os

string_collection_ids = [
    'o:datadog:p:documentation_loc:r:config__default_menus_main_en_yaml',
    'o:datadog:p:documentation_loc:r:config__default_menus_api_en_yaml'
]


def add_tag():
    transifex_api.setup(auth=os.environ.get('transifex_api_key'))
    organization = transifex_api.Organization.get(slug="datadog")
    project = organization.fetch('projects').get(slug="documentation_loc")

    for collection_id in string_collection_ids:
        slug = collection_id.split(':')[-1]
        res = project.fetch('resources').get(slug=slug)

        # remove notranslate tags
        print(f"Removing tags for {slug}")
        res_strings = transifex_api.ResourceString.filter(resource=res)
        for res_str in res_strings.data:
            tags = res_str.attributes.get('tags', [])
            if 'notranslate' in tags:
                res_str.attributes['tags'] = []
        transifex_api.ResourceString.bulk_update(res_strings, ['tags'])

        # add notranslate tags again
        print(f"Adding notranslate tags for {slug}")
        res_strings = transifex_api.ResourceString.filter(resource=res)
        for res_str in res_strings.data:
            key_parts = res_str.attributes.get('key', '').split('.')
            key_val = key_parts[-1]
            if key_val != 'name':
                res_str.attributes['tags'] = ['notranslate']
        transifex_api.ResourceString.bulk_update(res_strings, ['tags'])

    print('Job complete')


if __name__ == '__main__':
    add_tag()
