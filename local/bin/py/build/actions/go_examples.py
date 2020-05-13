#!/usr/bin/env python3
import glob
import re
from itertools import chain
from os.path import basename, dirname
from os import makedirs
import logging


logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.WARNING)


def slug(string):
    string = string.strip().replace("Api.md", "")
    return re.sub(r"[A-Z][a-z]+", lambda matched: '-' + matched.group(0), string).strip('-').lower()


def get_operation_id(string):
    RE = re.compile(r'(^|\n)(?P<level>#{2})(?P<header>.*?)#*(\n|$)')
    result = RE.search(string)
    if result:
        return result.group().replace('##', '').strip()
    else:
        return ""


def go_examples(content, content_dir):
    """
    Takes the content from a file from a github repo and
    pushed it to the doc
    See https://github.com/DataDog/documentation/wiki/Documentation-Build#pull-and-push-files to learn more
    :param content: object with a file_name, a file_path, and options to apply
    :param content_dir: The directory where content should be put
    """
    logger.info("Starting go examples...")
    regex_examples = re.compile(r"(.*)(\`\`\`go\s*)(.*)(\`\`\`)(.*)", re.DOTALL)
    for file_name in chain.from_iterable(glob.glob(pattern, recursive=True) for pattern in content["globs"]):
        with open(file_name, mode='r+') as f:
            result = f.read()
            op_id = get_operation_id(result)
            result = re.sub(regex_examples, "\\3", result, 0)
            version = "v1" if "v1" in file_name else "v2"
            slugged = slug(basename(file_name))
            dest = f"{content_dir}api/{version}/{slugged}/{op_id}.go"
            makedirs(dirname(dest), exist_ok=True)
            with open(dest, mode='w', encoding='utf-8') as out_file:
                out_file.write(result)
