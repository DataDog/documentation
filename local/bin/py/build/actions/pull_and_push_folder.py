#!/usr/bin/env python3

import glob
import re
import yaml

from itertools import chain
from os import makedirs
from os.path import basename
from pathlib import Path

from actions.comment_conversion import replace_comments

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
        print(f'Processing: {file_name.replace("./integrations_data/extracted", "")}')
        source_comment = f"<!--  SOURCED FROM https://github.com/DataDog/{content['repo_name']} -->\n"

        # add shortcodes for static analysis rules
        is_static_analysis_rules = content["options"].get("dest_dir", "") == "/code_analysis/static_analysis_rules/"
        try_rule_cta = "\n{{< try-rule-cta >}}" if is_static_analysis_rules else ""
        try_rule_banner = "\n{{< try-rule-banner >}}" if is_static_analysis_rules else ""

        with open(file_name, mode="r+", encoding="utf-8", errors="ignore") as f:
            file_name_path = Path(file_name)
            # get the path without integrations_data/extracted/<repo_name>/
            path_to_file_from_repo_dir = file_name_path.relative_to(*file_name_path.parts[:3])
            # subtract path_to_remove, and get our final path without filename
            path_to_remove = Path(content["options"].get("path_to_remove", ""))
            directory = path_to_file_from_repo_dir.relative_to(path_to_remove).parent
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
            # if front matter update existing
            if "front_matters" in content["options"]:
                new_yml.update(content["options"]["front_matters"])
                # if the dependency ends with a `/` e.g folder then lets try replace with the actual filename
                new_deps = []
                for dep in new_yml.get("dependencies", []):
                    if dep.endswith('/'):
                        new_deps.append('{}{}'.format(
                            dep,
                            basename(file_name)
                        ))
                new_yml['dependencies'] = new_deps
                new_yml['group_id'] = directory.as_posix()
            front_matter = yaml.dump(new_yml, default_flow_style=False).strip()
            # Replacing links that point to the Github folder by link that point to the doc.
            new_link = (
                content["options"]["dest_dir"] + directory.as_posix() + "\\2"
            )
            regex_github_link = re.compile(
                r"(https:\/\/github\.com\/{}\/{}\/blob\/{}\/{})(\S+)\.md".format(
                    content["org_name"],
                    content["repo_name"],
                    content["branch"],
                    path_to_remove / directory,
                )
            )
            txt = re.sub(
                regex_github_link,
                new_link,
                txt,
                count=0,
            )

            # replace html comments with shortcodes, add source comment, and other ui shortcode 
            txt = source_comment + try_rule_cta + replace_comments(txt) + try_rule_banner

            file_content = TEMPLATE.format(front_matter=front_matter, content=txt.strip())
            # Replacing the master README.md by _index.md to follow Hugo logic
            if file_name.endswith("README.md"):
                file_name = "_index.md"
        # Writing the new content to the documentation file
        dirp = (Path(content_dir) / Path(content["options"]["dest_dir"].lstrip('/')) / directory).resolve()
        dirp.mkdir(exist_ok=True)
        with open(
            dirp / file_name_path.name,
            mode="w+",
            encoding="utf-8",
        ) as f:
            f.write(file_content)
