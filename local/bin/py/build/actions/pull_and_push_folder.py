#!/usr/bin/env python3

import glob
import re
import yaml

from itertools import chain
from os import makedirs
from os.path import basename

TEMPLATE = """\
---
{front_matter}
---
{content}
"""


def pull_and_push_folder(content, content_dir):
    """
    Take the content from a folder following github logic
    and transform it to be displayed in the doc in dest_dir folder
    See https://github.com/DataDog/documentation/wiki/Documentation-Build#pull-and-push-folder to learn more
    :param content: content to process
    :param content_dir: The directory where content should be put
    """
    for file_name in chain.from_iterable(glob.iglob(pattern, recursive=True) for pattern in content["globs"]):
        with open(file_name, mode="r+", encoding="utf-8", errors="ignore") as f:
            file_content = f.read()
            # if front matter update existing
            if "front_matters" in content["options"]:
                boundary = re.compile(r'^-{3,}$', re.MULTILINE)
                split = boundary.split(file_content, 2)
                new_yml = {}
                txt = file_content
                if len(split) == 3:
                    _, fm, txt = split
                    new_yml = yaml.load(fm, Loader=yaml.FullLoader)
                elif len(split) == 1:
                    txt = split[0]
                new_yml.update(content["options"]["front_matters"])
                front_matter = yaml.dump(new_yml, default_flow_style=False).strip()
                file_content = TEMPLATE.format(front_matter=front_matter, content=txt.strip())
            # Replacing the master README.md by _index.md to follow Hugo logic
            if file_name.endswith("README.md"):
                file_name = "_index.md"
            # Replacing links that point to the Github folder by link that point to the doc.
            new_link = (
                content["options"]["dest_dir"] + "\\2"
            )
            regex_github_link = re.compile(
                r"(https:\/\/github\.com\/{}\/{}\/blob\/{}\/{})(\S+)\.md".format(
                    content["org_name"],
                    content["repo_name"],
                    content["branch"],
                    content["options"][
                        "path_to_remove"
                    ],
                )
            )
            file_content = re.sub(
                regex_github_link,
                new_link,
                file_content,
                count=0,
            )
        # Writing the new content to the documentation file
        dirp = "{}{}".format(
            content_dir,
            content["options"]["dest_dir"][1:],
        )
        makedirs(dirp, exist_ok=True)
        with open(
            "{}{}".format(dirp, basename(file_name)),
            mode="w+",
            encoding="utf-8",
        ) as f:
            f.write(file_content)
