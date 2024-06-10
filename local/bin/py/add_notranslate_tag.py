#!/usr/bin/env python3

from transifex.api import transifex_api
import os

transifex_bulk_operation_limit = 150
fields_to_translate = [
    'name',
    'title',
    'text',
    'desc',
    'description',
    'link_text'
]
string_collection_ids = [
    'o:datadog:p:documentation_loc:r:config__default_menus_main_en_yaml',
    'o:datadog:p:documentation_loc:r:config__default_menus_api_en_yaml',
    'o:datadog:p:documentation_loc:r:data_partials_home_yaml',
    'o:datadog:p:documentation_loc:r:data_partials_requests_yaml',
    'o:datadog:p:documentation_loc:r:data_partials_questions_yaml'
]

def remove_tags(resource_strings):
    for resource_string in resource_strings:
        tags = resource_string.attributes.get('tags', [])
        if 'notranslate' in tags:
            resource_string.attributes['tags'] = []
    transifex_api.ResourceString.bulk_update(resource_strings, ['tags'])


def add_tags(resource_strings):
    for resource_string in resource_strings:
        key_parts = resource_string.attributes.get('key', '').split('.')
        key_val = key_parts[-1]
        if key_val not in fields_to_translate:
            resource_string.attributes['tags'] = ['notranslate']
    transifex_api.ResourceString.bulk_update(resource_strings, ['tags'])


def process_tags():
    transifex_api.setup(auth=os.environ.get('transifex_api_key'))
    organization = transifex_api.Organization.get(slug="datadog")
    project = organization.fetch('projects').get(slug="documentation_loc")

    for collection_id in string_collection_ids:
        slug = collection_id.split(':')[-1]
        res = project.fetch('resources').get(slug=slug)

        print(f"Removing tags for {slug}")
        resource_strings = list(transifex_api.ResourceString.filter(resource=res).all())

        for index in range(0, len(resource_strings), transifex_bulk_operation_limit):
            remove_tags(resource_strings[index:index+transifex_bulk_operation_limit])

        print(f"Adding notranslate tags for {slug}")
        resource_strings = list(transifex_api.ResourceString.filter(resource=res).all())

        for index in range(0, len(resource_strings), transifex_bulk_operation_limit):
            add_tags(resource_strings[index:index+transifex_bulk_operation_limit])

    print('Job complete')


if __name__ == '__main__':
    process_tags()