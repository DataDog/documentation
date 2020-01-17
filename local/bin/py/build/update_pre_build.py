#!/usr/bin/env python3

import sys
import yaml

from pull_and_push_file import pull_and_push_file
from pull_and_push_folder import pull_and_push_folder
from content_manager import prepare_content
from integrations import Integrations

from collections import OrderedDict
from optparse import OptionParser
from os import sep, getenv
from os.path import (
    curdir,
    join,
    abspath,
    normpath
)


class Build:
    def __init__(self, opts, tempdir):
        super().__init__()
        self.options = opts
        self.list_of_contents = []
        self.tempdir = tempdir
        self.content_dir = "{0}{1}{2}".format(
            abspath(normpath(options.source)),
            sep,
            "content" + sep + "en" + sep,
        )
        self.extract_dir = "{0}".format(
            join(self.tempdir, "extracted") + sep
        )
        self.build_configuration = []

    def load_config(self, build_configuration_file_path, integration_merge_configuration_file_path):
        self.build_configuration = yaml.load(
            open(build_configuration_file_path))

        self.integration_mutations = OrderedDict(yaml.load(
            open(integration_merge_configuration_file_path))
        )

    def get_list_of_content(self, configuration):
        self.list_of_contents = prepare_content(
            configuration, self.options.token, self.extract_dir)

    def build_documentation(self, list_of_contents):

        Int = Integrations(self.options.source, self.tempdir,
                           self.integration_mutations)

        for content in list_of_contents:
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
        try:
            Int.merge_integrations()
        except:
            if getenv("LOCAL") == 'True':
                print(
                    "\x1b[33mWARNING\x1b[0m:Integration merge failed, documentation is now in degraded mode.")
            else:
                print(
                    "\x1b[31mERROR\x1b[0m: Integration merge failed, stoping build.")
                sys.exit(1)


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

    build_configuration_file_path = getenv("CONFIGURATION_FILE")
    integration_merge_configuration_file_path = "./local/bin/py/build/configurations/integration_merge.yaml"
    temp_directory = "./integrations_data"

    build = Build(options, temp_directory)

    build.load_config(build_configuration_file_path,
                      integration_merge_configuration_file_path)

    build.get_list_of_content(build.build_configuration)

    build.build_documentation(build.list_of_contents)
