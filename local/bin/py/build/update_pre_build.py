#!/usr/bin/env python3

import sys
import yaml

from pull_and_push_file import pull_and_push_file
from pull_and_push_folder import pull_and_push_folder
from content_manager import prepare_content
from integrations import Integrations

from optparse import OptionParser
from os import sep, getenv
from os.path import (
    curdir,
    join,
    abspath,
    normpath
)


class PreBuild:
    def __init__(self, opts):
        super().__init__()
        self.options = opts
        self.list_of_contents = []
        self.tempdir = (
            "./integrations_data"
        )
        self.content_dir = "{0}{1}{2}".format(
            abspath(normpath(options.source)),
            sep,
            "content" + sep + "en" + sep,
        )
        self.extract_dir = "{0}".format(
            join(self.tempdir, "extracted") + sep
        )

    def process(self):
        """
        This represents the overall workflow of the build of the documentation
        """
        print("\x1b[34mStarting Processing...\x1b[0m")

        configuration = yaml.load(open(getenv("CONFIGURATION_FILE")))

        self.list_of_contents = prepare_content(
            configuration, self.options.token, self.extract_dir)

        try:
            self.process_filenames()
        except:
            if getenv("LOCAL") == 'True':
                print(
                    "\x1b[33mWARNING\x1b[0m: Local mode detected: Processing files failed, documentation is now in degraded mode.")
            else:
                print(
                    "\x1b[31mERROR\x1b[0m: Processing files failed, stoping build.")
                sys.exit(1)

        Int = Integrations(self.options.source)

        try:
            Int.merge_integrations()
        except:
            if getenv("LOCAL") == 'True':
                print(
                    "\x1b[33mWARNING\x1b[0m: Local mode detected: Integration merge failed, documentation is now in degraded mode.")
            else:
                print(
                    "\x1b[31mERROR\x1b[0m: Integration merge failed, stoping build.")
                sys.exit(1)

    def process_filenames(self):
        """
        Goes through the list_of_contents and for each content
        triggers the right action to apply.
        """

        Int = Integrations(self.options.source)

        for content in self.list_of_contents:
            try:
                if content["action"] == "integrations":
                    Int.process_integrations(content)

                elif (content["action"] == "pull-and-push-folder"):
                    pull_and_push_folder(content, self.content_dir)

                elif content["action"] == "pull-and-push-file":
                    pull_and_push_file(content, self.content_dir)
                elif content["action"] == "Not Available":
                    if getenv("LOCAL") == 'True':
                        print("\x1b[33mWARNING\x1b[0m: Processing of {} canceled, since content is not available. Documentation is in degraded mode".format(
                            content["repo_name"]))
                else:
                    print(
                        "\x1b[31mERROR\x1b[0m: Action {} unknown for {}".format(content["action"], content))
                    raise ValueError
            except:
                if getenv("LOCAL") == 'True':
                    print(
                        "\x1b[33mWARNING\x1b[0m: Unsuccessful processing of {}".format(content))
                else:
                    print(
                        "\x1b[31mERROR\x1b[0m: Unsuccessful processing of {}".format(content))
                    raise ValueError


if __name__ == "__main__":
    parser = OptionParser(
        usage="usage: %prog [options] link_type"
    )
    parser.add_option(
        "-t",
        "--token",
        help="github access token",
        default=None,
    )
    parser.add_option(
        "-s",
        "--source",
        help="location of src files",
        default=curdir,
    )

    options, args = parser.parse_args()
    options.token = (
        getenv("GITHUB_TOKEN", options.token)
        if not options.token
        else options.token
    )

    pre = PreBuild(options)
    pre.process()
