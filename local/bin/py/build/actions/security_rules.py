#!/usr/bin/env python3
import glob
import json
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

## Overview

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
        # Only loop over rules JSON files (not eg. Markdown files containing the messages)
        if not file_name.endswith(".json"):
            continue
        with open(file_name, mode="r+") as f:
            json_data = json.loads(f.read())
            p = Path(f.name)

            # delete file or skip if staged
            if json_data.get('isStaged', False) or json_data.get('isDeleted', False) or not json_data.get('isEnabled', True):
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

                    page_data = {
                        "title": f"{json_data.get('name', '')}",
                        "kind": "documentation",
                        "type": "security_rules",
                        "disable_edit": True,
                        "aliases": [f"{json_data.get('defaultRuleId', '').strip()}"]
                    }

                    for tag in json_data.get('tags', []):
                        key, value = tag.split(':')
                        page_data[key] = value

                    front_matter = yaml.dump(page_data, default_flow_style=False).strip()
                    output_content = TEMPLATE.format(front_matter=front_matter, content=message.strip())

                    dest_dir = Path(f"{content_dir}{content['options']['dest_path']}")
                    dest_dir.mkdir(exist_ok=True)
                    dest_file = dest_dir.joinpath(p.name).with_suffix('.md')
                    logger.info(dest_file)
                    with open(dest_file, mode='w', encoding='utf-8') as out_file:
                        out_file.write(output_content)

