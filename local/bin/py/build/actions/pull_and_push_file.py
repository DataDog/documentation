#!/usr/bin/env python3

import re
import pathlib
import yaml

from os.path import basename
from process_agent_config import process_agent_config
from actions.comment_conversion import replace_comments

TEMPLATE = """\
---
{front_matter}
---
{content}
"""


def pull_and_push_file(content, content_dir):
    """
    Takes the content from a file from a github repo and
    pushed it to the doc
    See https://github.com/DataDog/documentation/wiki/Documentation-Build#pull-and-push-files to learn more
    :param content: object with a file_name, a file_path, and options to apply
    :param content_dir: The directory where content should be put
    """
    base_path = pathlib.Path(content["options"].get("base_path", content_dir))
    with open("".join(content["globs"]), mode="r+") as f:
        file_content = f.read()
        boundary = re.compile(r'^-{3,}$', re.MULTILINE)
        split = boundary.split(file_content, 2)
        new_yml = {}
        txt = file_content
        if len(split) == 3:
            _, fm, txt = split
            new_yml = yaml.safe_load(fm)
        elif len(split) == 1:
            txt = split[0]

        # replace html comments with shortcodes
        txt = replace_comments(txt)

        # If options include front params, then the H1 title of the source file is striped
        # and the options front params are inlined
        if "front_matters" in content["options"]:
            new_yml.update(content["options"]["front_matters"])
            front_matter = yaml.dump(new_yml, default_flow_style=False).strip()
            # remove h1 if exists
            file_content = re.sub(re.compile(r"^#{1}(?!#)(.*)", re.MULTILINE), "", txt, count=1)
            file_content = TEMPLATE.format(front_matter=front_matter, content=file_content.strip())
        elif "datadog-agent" in content["repo_name"] and "config_template.yaml" in "".join(content["globs"]):
            process_agent_config(file_content)

    output_content = content["options"].get("output_content", True)

    if output_content:
        destination_path = content["options"]["dest_path"].lstrip('/')
        dest_path_dir = base_path / pathlib.Path(destination_path)
        dest_path_dir.mkdir(parents=True, exist_ok=True)
        with open(
            dest_path_dir / pathlib.Path(basename(content["options"]["file_name"])),
            mode="w+",
            encoding="utf-8",
        ) as f:
            f.write(file_content)
