#!/usr/bin/env python3
import glob
import json
import re
from itertools import chain

import yaml
import logging
from pathlib import Path


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.WARNING)

TEMPLATE = """\
---
{front_matter}
---

{content}
"""


def security_rules(content, content_dir):
    """
    Takes the content from a file from a github repo and
    pushed it to the doc
    See https://github.com/DataDog/documentation/wiki/Documentation-Build#pull-and-push-files to learn more
    :param content: object with a file_name, a file_path, and options to apply
    :param content_dir: The directory where content should be put
    """
    logger.info("Starting security rules action...")
    for file_name in chain.from_iterable(glob.glob(pattern, recursive=True) for pattern in content["globs"]):

        data = None
        if file_name.endswith(".json"):
            with open(file_name, mode="r+") as f:
                data = json.loads(f.read())
        elif file_name.endswith(".yaml"):
            with open(file_name, mode="r+") as f:
                data = yaml.load(f.read(), Loader=yaml.FullLoader)

        p = Path(f.name)
        message_file_name = p.with_suffix('.md')

        if data and message_file_name.exists():
            # delete file or skip if staged
            # any() will return True when at least one of the elements is Truthy
            if data.get('isStaged', False) or data.get('isDeleted', False) or not data.get('isEnabled', True):
                if p.exists():
                    logger.info(f"removing file {p.name}")
                    p.unlink()
                else:
                    logger.info(f"skipping file {p.name}")
            else:
                # The message of a detection rule is located in a Markdown file next to the rule definition
                with open(str(message_file_name), mode="r+") as message_file:
                    message = message_file.read()

                    # strip out [text] e.g "[CIS Docker] Ensure that.." becomes "Ensure that..."
                    parsed_title = re.sub(r"\[.+\]\s?(.*)", "\\1", data.get('name', ''), 0, re.MULTILINE)
                    page_data = {
                        "title": parsed_title,
                        "kind": "documentation",
                        "type": "security_rules",
                        "disable_edit": True,
                        "aliases": [
                            f"{data.get('defaultRuleId', '').strip()}",
                            f"/security_monitoring/default_rules/{data.get('defaultRuleId', '').strip()}",
                            f"/security_monitoring/default_rules/{p.stem}"
                        ],
                        "rule_category": []
                    }

                    # we need to get the path relative to the repo root for comparisons
                    extract_dir, relative_path = str(p.parent).split(f"/{content['repo_name']}/")
                    # lets build up this categorization for filtering purposes
                    if 'configuration' in relative_path:
                        page_data['rule_category'].append('Cloud Configuration')
                    if 'security-monitoring' in relative_path:
                        page_data['rule_category'].append('Log Detection')
                    if 'runtime' in relative_path:
                        if 'compliance' in relative_path:
                            page_data['rule_category'].append('Infrastructure Configuration')
                        else:
                            page_data['rule_category'].append('Runtime Agent')

                    tags = data.get('tags', [])
                    if tags:
                        for tag in tags:
                            if ':' in tag:
                                key, value = tag.split(':')
                                page_data[key] = value
                    else:
                        # try build up manually
                        if content['action'] == 'compliance-rules':
                            source = data.get('source', None)
                            tech = data.get('framework', {}).get('name', '').replace('cis-', '')
                            page_data["source"] = source or tech
                            page_data["security"] = "compliance"
                            page_data["framework"] = data.get('framework', {}).get('name', '')
                            page_data["control"] = data.get('control', '')
                            page_data["scope"] = tech

                    # lowercase them
                    if page_data.get("source", None):
                        page_data["source"] = page_data["source"].lower()
                    if page_data.get("scope", None):
                        page_data["scope"] = page_data["scope"].lower()

                    front_matter = yaml.dump(page_data, default_flow_style=False).strip()
                    output_content = TEMPLATE.format(front_matter=front_matter, content=message.strip())

                    dest_dir = Path(f"{content_dir}{content['options']['dest_path']}")
                    dest_dir.mkdir(exist_ok=True)
                    dest_file = dest_dir.joinpath(p.name).with_suffix('.md')
                    logger.info(dest_file)
                    with open(dest_file, mode='w', encoding='utf-8') as out_file:
                        out_file.write(output_content)


def compliance_rules(content, content_dir):
    """
    Takes the content from a file from a github repo and
    pushed it to the doc
    See https://github.com/DataDog/documentation/wiki/Documentation-Build#pull-and-push-files to learn more
    :param content: object with a file_name, a file_path, and options to apply
    :param content_dir: The directory where content should be put
    """
    logger.info("Starting compliance rules action...")
    for file_name in chain.from_iterable(glob.glob(pattern, recursive=True) for pattern in content["globs"]):
        # Only loop over rules JSON files (not eg. Markdown files containing the messages)
        if not file_name.endswith(".json"):
            continue
        with open(file_name, mode="r+") as f:
            json_data = json.loads(f.read())
            p = Path(f.name)

            # delete file or skip if staged
            if json_data.get('isStaged', False) or json_data.get('isDeleted', False) or not json_data.get('enabled', True):
                if p.exists():
                    logger.info(f"removing file {p.name}")
                    p.unlink()
                else:
                    logger.info(f"skipping file {p.name}")
            else:
                # The message of a detection rule is located in a Markdown file next to the rule definition
                message_file_name = file_name.rsplit(".", 1)[0] + ".md"

                with open(message_file_name, mode="r+") as message_file:
                    message = message_file.read()

                    parsed_title = re.sub(r"\[.+\]\s?(.*)", "\\1", json_data.get('name', ''), 0, re.MULTILINE)
                    page_data = {
                        "title": f"{parsed_title}",
                        "kind": "documentation",
                        "type": "security_rules",
                        "disable_edit": True,
                        "aliases": [f"{json_data.get('defaultRuleId', '').strip()}"],
                        "source": f"{json_data.get('framework', {}).get('name', '').replace('cis-','')}"
                    }

                    for tag in json_data.get('tags', []):
                        key, value = tag.split(':')
                        page_data[key] = value

                    # lowercase them
                    if page_data.get("source", None):
                        page_data["source"] = page_data["source"].lower()
                    if page_data.get("scope", None):
                        page_data["scope"] = page_data["scope"].lower()

                    front_matter = yaml.dump(page_data, default_flow_style=False).strip()
                    output_content = TEMPLATE.format(front_matter=front_matter, content=message.strip())

                    dest_dir = Path(f"{content_dir}{content['options']['dest_path']}")
                    dest_dir.mkdir(exist_ok=True)
                    dest_file = dest_dir.joinpath(p.name).with_suffix('.md')
                    logger.info(dest_file)
                    with open(dest_file, mode='w', encoding='utf-8') as out_file:
                        out_file.write(output_content)
