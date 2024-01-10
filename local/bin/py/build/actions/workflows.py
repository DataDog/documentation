#!/usr/bin/env python3
import glob
import json
import re
import yaml
from itertools import chain
import logging
from pathlib import Path

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.WARNING)
stability = 'stable'

TEMPLATE = """\
---
{front_matter}
---

{content}
"""


def workflows(content, content_dir):
    logger.info("Starting Workflow action...")
    options = content.get("options", {})
    dest_path = options['dest_path']
    source_comment = f"<!--  SOURCED FROM https://github.com/DataDog/{content['repo_name']} -->\n\n"

    for file_name in chain.from_iterable(glob.glob(pattern, recursive=True) for pattern in content["globs"]):
        bundle_excludes = options.get('bundle_excludes', [])
        if any(substring in file_name for substring in bundle_excludes) or file_name.endswith('manifest.schema.json'):
            logging.info(f"skipping {file_name}")
        else:
            logging.info(f"Processing {file_name}")
            if file_name.endswith(".json"):
                with open(file_name, mode="r+") as f:
                    try:
                        data = json.loads(f.read())
                    except:
                        logger.warn(f"Error parsing {file_name}")
            if data and data.get('stability', '') == stability:
                
                for action_name, action_data in get_filtered_actions(data.get('actions', {})).items():
                    action_name = re.split(r':V\d+', action_name)[0] # clean action_name. no version identifier
                    # for each action of a bundle
                    if should_show_action(action_data.get('stability'), data):
                        output_file_name = data.get('name')\
                            .replace('com.datadoghq.dd.','')\
                            .replace('com.datadoghq.','')\
                            .replace('.', '_')
                        action_data['bundle'] = data.get('name')
                        action_data['bundle_title'] = data.get('title').strip()
                        action_data['source'] = data.get('icon', {}).get('integration_id', '')
                        action_data['aliases'] = [f'/workflows/actions_catalog/{output_file_name}_{action_name}'.lower()]
                        # if this is a dd. bundle then lets use the datadog integration id
                        if not action_data['source'] and 'datadog' in action_data['bundle_title'].lower():
                            action_data['source'] = '_datadog'
                        content = source_comment + action_data.get('description', '') + "\n\n{{< workflows >}}"
                        output_content = TEMPLATE.format(front_matter=yaml.dump(action_data, default_flow_style=False).strip(), content=content)
                        dest_dir = Path(f"{content_dir}{dest_path}")
                        dest_dir.mkdir(exist_ok=True)
                        name = f"{output_file_name}_{action_name}".lower()
                        dest_file = dest_dir.joinpath(name).with_suffix('.md')
                        with open(dest_file, mode='w', encoding='utf-8') as out_file:
                            out_file.write(output_content)


def should_show_action(action_stability, data):
    """
    An 'action' should have no 'stability' key or 'stability' key equal to 'stable'
    and should not be tagged as 'internal', 'hidden' or 'deprecated'.

    @param action_stability {str}
    @param data {dict}
    @return {boolean}
    """
    return (not action_stability or action_stability == stability) and not data.get('internal') and not data.get('hidden') and not data.get('deprecated')



def get_filtered_actions(actions):
    """
    Filter a bundle's actions to only include the highest versioned action for a particular action
    e.g.
        input:
            {
                "list_distributions:V3": {<action_data>}, 
                "list_distributions": {<action_data>},
                "list_distributions:V2": {<action_data>},
                "get_invalidation": {<action_data>},
                "create_invalidation": {<action_data>} 
                "create_invalidation:V1": {<action_data>} 
            }
        output:
            {
                "list_distributions:V3": {<action_data>}, 
                "get_invalidation": {<action_data>},
                "create_invalidation:V1": {<action_data>} 
            }

    @param actions {dict}
    @return {dict}
    """
    highest_versioned_actions = {}

    for action_name in actions:
        # 'V' in the action name with a version is expected to be capitalized
        action_with_version = re.match(r"(\w+):V(\d+)", action_name)
        
        action_name = action_with_version.group(1) if action_with_version else action_name
        action_version = int(action_with_version.group(2)) if action_with_version else 0

        if (not highest_versioned_actions.get(action_name)) or (action_version > highest_versioned_actions.get(action_name)):
            highest_versioned_actions[action_name] = action_version
            

    filtered_actions = dict((f'{key}:V{v}' if v else key, actions.get(f'{key}:V{v}' if v else key)) for key, v in highest_versioned_actions.items())

    return filtered_actions