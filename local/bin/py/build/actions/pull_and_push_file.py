#!/usr/bin/env python3

import re
import yaml

from os.path import basename
from os import makedirs


def pull_and_push_file(content, content_dir):
    """
    Takes the content from a file from a github repo and
    pushed it to the doc
    See https://github.com/DataDog/documentation/wiki/Documentation-Build#pull-and-push-files to learn more
    :param content: object with a file_name, a file_path, and options to apply
    :param content_dir: The directory where content should be put
    """

    makedirs("{}{}".format(content_dir,content["options"]["dest_path"][1:]), exist_ok=True)

    with open("".join(content["globs"]), mode="r+") as f:
        file_content = f.read()
        # If options include front params, then the H1 title of the source file is striped
        # and the options front params are inlined
        if "front_matters" in content["options"]:
            front_matters = "---\n" + \
                yaml.dump(content["options"]["front_matters"],
                          default_flow_style=False) + "---\n"
            file_content = re.sub(
                r'^(#{1}).*', front_matters, file_content, count=1)

        if "link_relative" in content["options"]:
            # Replacing links that point to the Github folder by link that point to the doc.
            new_link = (content["options"]["dest_path"] + "\\2" + "/")

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
            file_content = re.sub(regex_github_link,new_link,file_content,count=0)

    with open(
        "{}{}{}".format(
            content_dir,
            content["options"]["dest_path"][1:],
            basename(content["options"]["file_name"]),
        ),
        mode="w+",
        encoding="utf-8",
    ) as f:
        f.write(file_content)
