#!/usr/bin/env python3

import sys
import yaml
import shutil
import os
import glob

from actions.pull_and_push_file import pull_and_push_file
from actions.pull_and_push_folder import pull_and_push_folder
from content_manager import prepare_content, download_cached_content_into_repo
from actions.integrations import Integrations
from actions.security_rules import security_rules
from actions.workflows import workflows

from collections import OrderedDict
from os import sep, getenv
from os.path import (
    curdir,
    join,
    abspath,
    normpath
)


class Build:
    def __init__(self, tempdir):
        super().__init__()
        self.github_token = getenv('GITHUB_TOKEN')
        self.source_dir = curdir
        self.list_of_sourced_contents = []
        self.list_of_cached_contents = []
        self.build_configuration = []
        self.integration_mutations = OrderedDict()
        self.cache_enabled = False
        self.tempdir = tempdir
        self.relative_en_content_path = 'content/en'
        self.content_dir = "{0}{1}{2}".format(
            abspath(normpath(self.source_dir)),
            sep,
            "content" + sep + "en" + sep,
        )
        self.extract_dir = "{0}".format(
            join(self.tempdir, "extracted") + sep
        )

        # Should match directory name in integrations_data/extracted
        # All marketplace integrations are sourced through APW now
        self.apw_integrations = [
            'ably',
            'akamai_mpulse'
        ]        

    def load_config(self, build_configuration_file_path, integration_merge_configuration_file_path, disable_cache_on_retry=False):
        """
        Loads configurations for external content to pull from source or cache, and attaches it to the Build Class
        """
        self.build_configuration = yaml.safe_load(open(build_configuration_file_path))

        if disable_cache_on_retry:
            self.cache_enabled = False
        else:
            self.cache_enabled = self.build_configuration[0].get('config', {}).get('cache_enabled', False)

        if not self.cache_enabled:
            self.integration_mutations = OrderedDict(yaml.safe_load(open(integration_merge_configuration_file_path)))


    # Get the list of content to work with after it gets updated with the local globs or the
    # downloaded globs from Github.
    def get_list_of_content(self, configuration):
        prepare_content(self, configuration, self.github_token, self.extract_dir)

        # remove integrations that will be sourced from websites-sources/APW
        # this accounts for duplicates from dogweb/other integration repos
        for integration in self.apw_integrations:
            integration_glob = f"{self.extract_dir}**/{integration}/"
            extracted_integration_dirs = glob.glob(integration_glob, recursive=True)
            
            for integration_dir in extracted_integration_dirs:
                shutil.rmtree(integration_dir)


    def build_documentation(self):
        # Instantiation of the integrations class since it's needed for content management below.
        Int = Integrations(self.source_dir, self.tempdir, self.integration_mutations)

        # Depending on the action attached to the content the proper function is called
        for content in self.list_of_sourced_contents:
            try:                
                if content["action"] == "integrations":
                    Int.process_integrations(content)
                elif content["action"] == "marketplace-integrations":
                    Int.process_integrations(content, marketplace=True)
                elif content["action"] == "pull-and-push-folder":
                    pull_and_push_folder(content, self.content_dir)
                elif content["action"] == "npm-integrations":
                    Int.process_integrations(content)
                elif content["action"] == "pull-and-push-file":
                    pull_and_push_file(content, self.content_dir)
                elif content["action"] in ("security-rules", "compliance-rules"):
                    security_rules(content, self.content_dir)
                elif content['action'] == "workflows":
                    workflows(content, self.content_dir)
                elif content["action"] == "Not Available":
                    if not getenv("CI_COMMIT_REF_NAME"):
                        print("\x1b[33mWARNING\x1b[0m: Processing of {} canceled, since content is not available. Documentation is in degraded mode".format(
                            content["repo_name"]))
                else:
                    print(
                        "\x1b[31mERROR\x1b[0m: Action {} unknown for {}".format(content["action"], content))
                    raise ValueError

            except Exception as e:
                print(e)
                print(
                    "\x1b[31mERROR\x1b[0m: Unsuccessful processing of {}".format(content))
                raise ValueError

        # Once all the content is processed integrations are merged according to the integration_merge.yaml
        # configuration file. This needs to happen after all content is processed to avoid flacky integration merge
        # If the integrations are being pulled from cache we can skip this step.
        if not self.cache_enabled:
            try:
                Int.merge_integrations()
            except Exception as e:
                print(e)
                if not getenv("CI_COMMIT_REF_NAME"):
                    print(
                        "\x1b[33mWARNING\x1b[0m: Integration merge failed, documentation is now in degraded mode.")
                else:
                    print(
                        "\x1b[31mERROR\x1b[0m: Integration merge failed, stopping build.")
                    sys.exit(1)

        if len(self.list_of_cached_contents) > 0:
            try:
                download_cached_content_into_repo(self)
            except Exception as err:
                print(err)

                if os.path.isdir('temp'): shutil.rmtree('temp')

                if not getenv("CI_COMMIT_REF_NAME"):
                    print('Downloading cached content failed, documentation is now in degraded mode.')
                else:
                    print('Download cached content failed, retrying with full build from external sources.')
                    main(True)


def main(disable_cache_on_retry=False):
    # Those hard-written variables should be set in the Makefile config later down the road.
    build_configuration_file_path = getenv("CONFIGURATION_FILE")
    integration_merge_configuration_file_path = "./local/bin/py/build/configurations/integration_merge.yaml"
    temp_directory = "./integrations_data"

    # Documentation build process:
    # 1. Instantiation of the Build class with the options (Github token) and the temp directory to work with
    # 2. Load all configuration needed to build the doc
    # 3. Retrieve the list of content to work with and updates it based of the configuration specification
    # 4. Actually build the documentation with the udpated list of content.
    build = Build(temp_directory)
    build.load_config(build_configuration_file_path, integration_merge_configuration_file_path, disable_cache_on_retry)
    build.get_list_of_content(build.build_configuration)
    build.build_documentation()


if __name__ == "__main__":
    main()