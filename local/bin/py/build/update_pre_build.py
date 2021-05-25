#!/usr/bin/env python3

import sys
import yaml

from pull_and_push_file import pull_and_push_file
from pull_and_push_folder import pull_and_push_folder
from content_manager import prepare_content
from integrations import Integrations
from security_rules import security_rules, compliance_rules

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

    # Loads the configurations in the configuration/ folder and attaches it to the Build Class
    def load_config(self, build_configuration_file_path, integration_merge_configuration_file_path):
        self.build_configuration = yaml.load(
            open(build_configuration_file_path), Loader=yaml.FullLoader)

        self.integration_mutations = OrderedDict(yaml.load(
            open(integration_merge_configuration_file_path), Loader=yaml.FullLoader)
        )

    # Get the list of content to work with after it gets updated with the local globs or the
    # downloaded globs from Github.
    def get_list_of_content(self, configuration):
        self.list_of_contents = prepare_content(
            configuration, self.options.token, self.extract_dir)

    # Build the documentation by injecting content from other repository.
    def build_documentation(self, list_of_contents):

        # Instanciation of the integrations class since it's needed for content management below.
        Int = Integrations(self.options.source, self.tempdir,
                           self.integration_mutations)

        # Depending of the action attached to the content the proper function is called
        for content in list_of_contents:
            try:
                if content["action"] == "integrations":
                    Int.process_integrations(content)
                elif content["action"] == "marketplace-integrations":
                    Int.process_integrations(content, marketplace=True)
                elif (content["action"] == "pull-and-push-folder"):
                    pull_and_push_folder(content, self.content_dir)
                elif content["action"] == "npm-integrations":
                    Int.process_integrations(content)
                elif content["action"] == "pull-and-push-file":
                    pull_and_push_file(content, self.content_dir)
                elif content["action"] in ("security-rules", "compliance-rules"):
                    security_rules(content, self.content_dir)
                elif content["action"] == "Not Available":
                    if getenv("LOCAL") == 'True':
                        print("\x1b[33mWARNING\x1b[0m: Processing of {} canceled, since content is not available. Documentation is in degraded mode".format(
                            content["repo_name"]))
                else:
                    print(
                        "\x1b[31mERROR\x1b[0m: Action {} unknown for {}".format(content["action"], content))
                    raise ValueError
            except Exception as e:
                print(e)
                if getenv("LOCAL") == 'True':
                    print(
                        "\x1b[33mWARNING\x1b[0m: Unsuccessful processing of {}".format(content))
                else:
                    print(
                        "\x1b[31mERROR\x1b[0m: Unsuccessful processing of {}".format(content))
                    raise ValueError

        # Once all the content is processed integrations are merged according to the integration_merge.yaml
        # configuration file. This needs to happen after all content is processed to avoid flacky integration merge
        try:
            Int.merge_integrations()
        except Exception as e:
            print(e)
            if getenv("LOCAL") == 'True':
                print(
                    "\x1b[33mWARNING\x1b[0m: Integration merge failed, documentation is now in degraded mode.")
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

    # Those hard-written variables should be set in the Makefile config later down the road.
    build_configuration_file_path = getenv("CONFIGURATION_FILE")
    integration_merge_configuration_file_path = "./local/bin/py/build/configurations/integration_merge.yaml"
    temp_directory = "./integrations_data"

    # Documentation build process:
    # 1. Instantiation of the Build class with the options (Github token) and the temp directory to work with
    # 2. Load all configuration needed to build the doc
    # 3. Retrieve the list of content to work with and updates it based of the configuration specification
    # 4. Actually build the documentation with the udpated list of content.
    build = Build(options, temp_directory)

    build.load_config(build_configuration_file_path,
                      integration_merge_configuration_file_path)

    build.get_list_of_content(build.build_configuration)

    build.build_documentation(build.list_of_contents)
