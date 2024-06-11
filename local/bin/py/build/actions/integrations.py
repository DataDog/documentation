#!/usr/bin/env python3

import csv
import glob
import json
import linecache
import re
import shutil
import sys
from collections import defaultdict

import yaml
import markdown2

from json import JSONDecodeError
from itertools import chain
from shutil import copyfile
from os import sep, makedirs, getenv, remove
from os.path import (
    exists,
    basename,
    dirname,
    join,
    abspath,
    normpath
)

from actions.format_link import format_link_file
from actions.comment_conversion import replace_comments

try:
    from assetlib.classifiers import get_all_classifier_names, get_non_deprecated_classifiers
    CLASSIFIER_TAGS = get_all_classifier_names()
except ImportError:
    CLASSIFIER_TAGS = []
    if getenv("CI_COMMIT_REF_NAME"):
        print('\x1b[31mERROR\x1b[0m: CLASSIFIER_TAGS validation unavailable, Aborting')
        sys.exit(1)
finally:
    if not CLASSIFIER_TAGS:
        print(f'\x1b[33mWARNING\x1b[0m: CLASSIFIER_TAGS empty - continuing without validation')
    else:
        file_content = ['| Name | Description |\n| --- | --- |\n']
        with open('layouts/shortcodes/integration_categories.md', 'w') as file:
            for tag in get_non_deprecated_classifiers():
                file_content.append(f'| {tag["name"]} | {tag["description"]} |\n')
            file.write(''.join(file_content) + '\n')

class Integrations:
    def __init__(self, source_file, temp_directory, integration_mutations):
        super().__init__()
        self.tempdir = temp_directory
        self.data_dir = "{0}{1}{2}".format(
            abspath(normpath(source_file)),
            sep,
            "data" + sep,
        )
        self.content_dir = "{0}{1}{2}".format(
            abspath(normpath(source_file)),
            sep,
            "content" + sep + "en" + sep,
        )
        self.data_integrations_dir = (
            join(self.data_dir, "integrations") + sep
        )
        self.data_service_checks_dir = (
            join(self.data_dir, "service_checks") + sep
        )
        self.data_npm_dir = (
            join(self.data_dir, "npm") + sep
        )
        self.content_integrations_dir = (
            join(self.content_dir, "integrations") + sep
        )
        self.extract_dir = "{0}".format(
            join(self.tempdir, "extracted") + sep
        )
        self.integration_datafile = "{0}{1}{2}".format(
            abspath(normpath(source_file)),
            sep,
            "integrations.json",
        )
        self.regex_h1 = re.compile(
            r"^#{1}(?!#)(.*)", re.MULTILINE
        )
        self.regex_h1_replace = re.compile(
            r"^(#{1})(?!#)(.*)", re.MULTILINE
        )
        self.regex_metrics = re.compile(
            r"(#{3} Metrics\n)([\s\S]*this integration.|[\s\S]*this check.)([\s\S]*)(#{3} Events\n)",
            re.DOTALL,
        )
        self.regex_service_check = re.compile(
            r"(#{3} Service Checks\n)([\s\S]*for a list of service checks provided by this integration.)([\s\S]*)(#{2} Troubleshooting\n)",
            re.DOTALL,
        )
        self.regex_fm = re.compile(
            r"(?:-{3})(.*?)(?:-{3})(.*)", re.DOTALL
        )
        self.regex_source = re.compile(
            r"(\S*FROM_DISPLAY_NAME\s*=\s*\{)(.*?)\}",
            re.DOTALL,
        )
        self.regex_site_region = re.compile(
            r"\{\{< ([\/]?site-region.*) >\}\}", re.MULTILINE
        )
        self.datafile_json = []
        self.integration_mutations = integration_mutations
        self.initial_integration_files = glob.glob(
            "{}*.md".format(self.content_integrations_dir)
        )
        makedirs(self.data_integrations_dir, exist_ok=True)
        makedirs(
            self.data_service_checks_dir, exist_ok=True
        )
        makedirs(
            self.data_npm_dir, exist_ok=True
        )
        makedirs(
            self.content_integrations_dir, exist_ok=True
        )

    @staticmethod
    def metric_csv_to_yaml(key_name, csv_filename, yml_filename):
        """
        Given a file path to a single csv file convert it to a yaml file

        :param key_name: integration key name for root object
        :param csv_filename: path to input csv file
        :param yml_filename: path to output yml file
        """
        yaml_data = {key_name: []}
        with open(csv_filename) as csv_file:
            reader = csv.DictReader(csv_file, delimiter=",")
            yaml_data[key_name] = [
                dict(line) for line in reader
            ]
        if yaml_data[key_name]:
            # Transforming the metric description to html in order to interpret markdown in
            # integrations metrics table.
            # the char strip is to compensate for the lib adding <p> </p><br> tags
            for metric in yaml_data[key_name]:
                metric['description'] = str(
                    markdown2.markdown(metric['description']))[3:-5]
            with open(
                file=yml_filename,
                mode="w",
                encoding="utf-8",
            ) as f:
                f.write(
                    yaml.dump(
                        yaml_data, default_flow_style=False
                    )
                )

    def inline_references(self, integration_readme, regex_skip_sections_start, regex_skip_sections_end):
        """
        Goes through a section and remove all reference links it can found.

        :param section: An array of lines representing a section.
        """

        skip = False
        all_references = []
        section_without_references = []
        section_with_all_links = []
        regex_bottom_reference_link = r"^\s*\[(\d*?)\]: (\S*)"

        # Collecting all references and removing them from section
        # looking at each line, if a line is a reference then we remove it and store the reference.

        #section = integration_file.readlines()
        for line in integration_readme.splitlines(True):
            if skip:
                section_without_references.append(line)
                if re.search(regex_skip_sections_end, line):
                    skip = False
            elif not skip:

                if re.search(regex_skip_sections_start, line):
                    section_without_references.append(line)
                    skip = True

                elif re.search(regex_bottom_reference_link, line):

                    reference = re.search(regex_bottom_reference_link, line)
                    all_references.append([reference.group(1),
                                           reference.group(2)])
                else:
                    section_without_references.append(line)

        # By the end of the for loop skip should always be false otherwise it means that a codeblock is not closed.
        if skip:
            raise ValueError

        for line in section_without_references:
            if skip:
                if re.search(regex_skip_sections_end, line):
                    skip = False
            elif not skip:
                if re.search(regex_skip_sections_start, line):
                    skip = True
                else:
                    for reference in all_references:
                        reference_index, reference_val = reference

                        curent_link = '][' + reference_index + ']'

                        line = line.replace(
                            curent_link, '](' + reference_val + ')')

            section_with_all_links.append(line)

        # By the end of the for loop skip should always be false otherwise it means that a codeblock is not closed.
        if skip:
            raise ValueError

        integration_content_with_link_inlined = ''.join(section_with_all_links)

        return integration_content_with_link_inlined

    def process_integrations(self, content, marketplace=False):
        """
        Goes through all files needed for integrations build
        and triggers the right function for the right type of file.
        #integrations to learn more.
        See https://github.com/DataDog/documentation/wiki/Documentation-Build
        :param content: integrations content to process
        """
        for file_name in chain.from_iterable(
            glob.iglob(pattern, recursive=True)
            for pattern in content["globs"]
        ):
            if file_name.endswith(".csv"):
                self.process_integration_metric(file_name)

            elif file_name.endswith("manifest.json"):
                self.process_integration_manifest(file_name)

            elif file_name.endswith("service_checks.json"):
                self.process_service_checks(file_name)

            elif file_name.endswith(".md"):
                self.process_integration_readme(file_name, marketplace, content)

            elif file_name.endswith((".png", ".svg", ".jpg", ".jpeg", ".gif")) and marketplace:
                self.process_images(file_name)

            elif file_name.endswith(".go"):
                self.process_npm_integrations(file_name)

    def merge_integrations(self):
        """ Merges integrations that come under one """
        for (
            name,
            action_obj,
        ) in self.integration_mutations.items():
            if name not in self.initial_integration_files:
                action = action_obj.get("action")
                target = action_obj.get("target")
                input_file = "{}{}.md".format(
                    self.content_integrations_dir, name
                )
                output_file = "{}{}.md".format(
                    self.content_integrations_dir, target
                )
                if action == "merge":
                    with open(
                        input_file, "r"
                    ) as content_file, open(
                        output_file, "a"
                    ) as target_file:
                        content = content_file.read()
                        content = re.sub(
                            self.regex_fm,
                            r"\2",
                            content,
                            count=0,
                        )
                        if action_obj.get(
                            "remove_header", False
                        ):
                            content = re.sub(
                                self.regex_h1,
                                "",
                                content,
                                count=0,
                            )
                        else:
                            content = re.sub(
                                self.regex_h1_replace,
                                r"##\2",
                                content,
                                count=0,
                            )
                        regex_skip_sections_end = r"(```|\{\{< \/code-block >\}\})"
                        regex_skip_sections_start = r"(```|\{\{< code-block)"

                        ## Inlining all link from the file to merge
                        ## to avoid link ref colision with the existing references.
                        content = self.inline_references(content,regex_skip_sections_start,regex_skip_sections_end)

                        target_file.write(content)

                    ## Formating all link as reference in the new merged integration file
                    try:
                        final_text = format_link_file(output_file,regex_skip_sections_start,regex_skip_sections_end)
                        with open(output_file, 'w') as final_file:
                            final_file.write(final_text)
                    except Exception as e:
                        print(e)

                    try:
                        remove(input_file)
                    except OSError:
                        print(
                            "\x1b[31mERROR\x1b[0m: The file {} was not found and could not be removed during merge action".format(
                                input_file
                            )
                        )
                elif action == "truncate":
                    if exists(output_file):
                        with open(
                            output_file, "r+"
                        ) as target_file:
                            content = target_file.read()
                            content = re.sub(
                                self.regex_fm,
                                r"---\n\1\n---\n",
                                content,
                                count=0,
                            )
                            target_file.truncate(0)
                            target_file.seek(0)
                            target_file.write(content)
                    else:
                        open(output_file, "w").close()
                elif action == "discard":
                    try:
                        remove(input_file)
                    except OSError:
                        print(
                            "\x1b[31mERROR\x1b[0m: The file {} was not found and could not be removed during discard action".format(
                                input_file
                            )
                        )
                elif action == "create":
                    with open(output_file, "w+") as f:
                        fm = yaml.dump(
                            action_obj.get("fm"),
                            default_flow_style=False,
                        ).rstrip()
                        data = "---\n{0}\n---\n".format(fm)
                        f.write(data)

    def process_integration_metric(self, file_name):
        """
        Take a single metadata csv file and convert it to yaml
        :param file_name: path to a metadata csv file
        """
        if file_name.endswith("/metadata.csv"):
            key_name = basename(
                dirname(normpath(file_name))
            )
        else:
            key_name = basename(
                file_name.replace("_metadata.csv", "")
            )
        new_file_name = "{}{}.yaml".format(
            self.data_integrations_dir, key_name
        )
        # if md already exists likely collision
        if exists("{}{}.md".format(self.content_integrations_dir, key_name)):
            collision_name = self.get_collision_alternate_name(file_name)
            new_file_name = "{}{}.yaml".format(
                self.data_integrations_dir, collision_name
            )
        self.metric_csv_to_yaml(key_name, file_name, new_file_name)

    def process_integration_manifest(self, file_name):
        """
        Take a single manifest json file and upsert to integrations.json data
        set is_public to false to hide integrations we merge later
        :param file_name: path to a manifest json file
        """

        names = [
            d.get("name", "").lower()
            for d in self.datafile_json
            if "name" in d
        ]
        with open(file_name) as f:
            try:
                data = json.load(f)
                data = self.process_manifest(data, basename(dirname(file_name)))
                data_name = data.get("name", "").lower()
                if data_name in [
                    k
                    for k, v in self.integration_mutations.items()
                    if v.get("action") == "merge"
                ]:
                    data["is_public"] = False
                if data_name in names:
                    item = [
                        d
                        for d in self.datafile_json
                        if d.get("name", "").lower() == data_name
                    ]
                    if len(item) > 0:
                        item[0].update(data)
                else:
                    self.datafile_json.append(data)
            except JSONDecodeError:
                if not getenv("CI_COMMIT_REF_NAME"):
                    print(
                        "\x1b[33mWARNING\x1b[0m: manifest could not be parsed {}".format(file_name))
                else:
                    print(
                        "\x1b[31mERROR\x1b[0m: manifest could not be parsed {}".format(file_name))
                    raise JSONDecodeError

    def process_service_checks(self, file_name):
        """
        Take a single service_checks.json file and copies it to the data folder
        as the integration name it came from e.g /data/service_checks/docker.json
        :param file_name: path to a service_checks json file
        """

        if file_name.endswith("/assets/service_checks.json"):
            file_list = file_name.split(sep)
            key_name = file_list[len(file_list)-3]
        else:
            key_name = basename(
                dirname(normpath(file_name))
            )
        new_file_name = "{}{}.json".format(
            self.data_service_checks_dir, key_name
        )

        # if md already exists likely collision
        if exists("{}{}.md".format(self.content_integrations_dir, key_name)):
            collision_name = self.get_collision_alternate_name(file_name)
            new_file_name = "{}{}.json".format(
                self.data_service_checks_dir, collision_name
            )

        shutil.copy(
            file_name,
            new_file_name,
        )

    def process_npm_integrations(self, file_name):
        """
        Save the defaults.go file from AWS as a json file
        /data/npm/aws.json
        """

        dict_npm = {}
        new_file_name = ""

        if file_name.endswith("defaults.go"):

            with open(file_name) as fh:

                line_list = filter(None, fh.read().splitlines())

                for line in line_list:
                    if line.endswith("service{"):
                        integration = line.split('"')[1]
                        dict_npm[integration] = {"name": integration}

            new_file_name = "{}aws.json".format(self.data_npm_dir)

        elif file_name.endswith("gcp_services.go") or file_name.endswith("azure_services.go"):

            with open(file_name) as fh:

                line_list = filter(None, fh.read().splitlines())

                for line in line_list:
                    if line.endswith(","):
                        integration = line.split('"')[3]
                        dict_npm[integration] = {"name": integration}

            if file_name.endswith("gcp_services.go"):
                new_file_name = "{}gcp.json".format(self.data_npm_dir)
            elif file_name.endswith("azure_services.go"):
                new_file_name = "{}azure.json".format(self.data_npm_dir)

        if new_file_name != "":
            with open(
                    file=new_file_name,
                    mode="w",
                    encoding="utf-8",
                ) as f:
                    json.dump(
                        dict_npm, f, indent = 2, sort_keys = True
                    )

    # file_name should be an extracted image file
    # e.g. ./integrations_data/extracted/marketplace/rapdev-snmp-profiles/images/2.png
    def process_images(self, file_name):
        """
        Copies a single image file to the static/images/ folder, creating a new directory if needed.
        """
        image_filename = basename(file_name) # img.png
        integration_image_path = file_name.replace('../', '') # if it found local marketplace repo
        integration_image_path = integration_image_path.replace('./integrations_data/extracted/', '') # marketplace/nerdvision/images/img.png
        integration_image_directory = dirname(integration_image_path) # marketplace/nerdvision/images/
        destination_directory = './static/images/{}'.format(integration_image_directory) # static/images/marketplace/nerdvision/images/
        full_destination_path = '{}/{}'.format(destination_directory, image_filename) # static/images/marketplace/nerdvision/images/img.png

        makedirs(destination_directory, exist_ok=True)
        copyfile(file_name, full_destination_path)

    @staticmethod
    def replace_image_src(markdown_string, integration_name):
        """
        Takes a markdown string and replaces any image markdown with our img shortcode, pointing to the static/images folder.
        This is needed when dealing with Marketplace Integrations to properly display images pulled from a private repo.
        """
        markdown_img_search_regex = r"!\[(.*?)\]\((.*?)\)"
        img_shortcode = "{{< img src=\"marketplace/" + integration_name + "/\\2\" alt=\"\\1\" >}}"
        integration_img_prefix = 'https://raw.githubusercontent.com/DataDog/marketplace/master/{}/'.format(integration_name)

        replaced_markdown_string = markdown_string.replace(integration_img_prefix, '')
        regex_result = re.sub(markdown_img_search_regex, img_shortcode, replaced_markdown_string, 0, re.MULTILINE)

        if regex_result:
            return regex_result
        else:
            return markdown_string

    @staticmethod
    def remove_h3_markdown_section(markdown_string, h3_header_string):
        """
        Removes markdown content from integration readme file starting with h3 markdown string provided,
        ending with the next h2 or h3 header or horizontal line break found in the markdown.
        """
        if not h3_header_string.startswith('###'):
            return markdown_string

        h3_markdown_regex = r"(^|\n)(#{3}) (\w+)"
        h3_list = re.finditer(h3_markdown_regex, markdown_string)
        indexes = []
        replaced_result = ''

        for match in h3_list:
            group = match.group(0)
            start = match.start()

            if h3_header_string in group:
                start_index = start
                h2_h3_regex = r"(^|\n)(#{2,3}) (\w+)"
                h2_h3_regex_matches = re.finditer(h2_h3_regex, markdown_string)
                end_index = -1

                # Find the string index of the next h2 or h3 header in markdown
                # so we can strip out all of the unwanted content
                for match in h2_h3_regex_matches:
                    if match.start() > start_index + 3:
                        end_index = match.start()
                        break

                if end_index == -1:
                    # Check to ensure footer is preserved
                    horiz_line = markdown_string.find('\n---', start_index)

                    if horiz_line != -1:
                        end_index = horiz_line
                    else:
                        # If there isn't another h2, h3, or horizontal line break
                        end_index = len(markdown_string)

                content_to_remove = markdown_string[start_index:end_index]
                indexes.append([start_index, end_index])

        # In case there are multiple h3 headers with the same name.
        # There are multiple "Pricing" headers in some integrations currently,
        # TODO: revisit this function once that is fixed.
        if len(indexes) > 0:
            for indices in reversed(indexes):
                markdown_string = markdown_string[:indices[0]] + markdown_string[indices[1]:]

        return markdown_string

    @staticmethod
    def remove_markdown_section(markdown_string, h2_header_string):
        """
        Removes a section from markdown by deleting all content starting from provided h2_header_string argument and ending one index before the next h2 header.
        h2_header_string argument is expected in markdown format; e.g. '## Steps'
        """

        if not h2_header_string.startswith('##'):
            return markdown_string

        h2_markdown_regex = r"(^|\n)(#{2}) (\w+)"
        h2_list = re.finditer(h2_markdown_regex, markdown_string)
        replaced_result = ''

        for match in h2_list:
            group = match.group(0)
            start = match.start()
            end = match.end() - 1

            if h2_header_string in group:
                start_index = start
                end_index = next(h2_list).start()
                content_to_remove = markdown_string[start_index:end_index]
                replaced_result = markdown_string.replace(content_to_remove, '')

        if replaced_result:
            return replaced_result
        else:
            return markdown_string

    @staticmethod
    def validate_marketplace_integration_markdown(markdown_string):
        """
        Validates marketplace integration markdown string does not contain sensitive content.
        The build should fail if we found any sections that should not be displayed in Docs.
        Current exclude list: ["Setup", "Pricing", "Tiered Pricing"]
        """
        setup_header_markdown_regex = r"(#{1,6})(\s*)(Setup|Pricing|Tiered Pricing|Uninstallation)"
        matches = re.search(setup_header_markdown_regex, markdown_string, re.MULTILINE | re.IGNORECASE)
        return matches == None

    def get_collision_alternate_name(self, file_name):
        dir_path = dirname(normpath(file_name))
        dir_name = basename(dir_path)
        dir_path = dir_path.replace('/assets', '') if dir_path.endswith('assets') else dir_path
        collision_name = dir_name
        manifest_json_path = f'{dir_path}/manifest.json'
        manifest_json = {}

        if exists(manifest_json_path):
            with open(manifest_json_path) as fp:
                manifest_json = json.load(fp)
                integration_id = manifest_json.get("integration_id", "") or manifest_json.get('app_id', "") or ""
                collision_name = integration_id.replace('-', '_') or manifest_json.get("name", "") or dir_name

        return collision_name

    def process_integration_readme(self, file_name, marketplace=False, content=None):
        """
        Take a single README.md file and
        1. extract the first h1, if this isn't a merge item
        2. add tabs if they exist
        3. inject metrics after ### Metrics header if metrics exists for file
        4. inject service checks after ### Service Checks if file exists
        5. inject where to purchase integration if it's a marketplace integration
        6. inject hugo front matter params at top of file
        7. write out file to content/integrations with filename changed to integrationname.md
        :param file_name: path to a readme md file
        """
        if content is None:
            content = {}
        no_integration_issue = True
        tab_logic = False
        metrics = glob.glob(
            "{path}{sep}*metadata.csv".format(
                path=dirname(file_name), sep=sep
            )
        )
        metrics = metrics[0] if len(metrics) > 0 else None
        metrics_exist = (metrics and exists(metrics)
                         and linecache.getline(metrics, 2))
        service_check = glob.glob("{file}.json".format(
            file=self.data_service_checks_dir + basename(dirname(file_name))))
        service_check = (
            service_check[0]
            if len(service_check) > 0
            else None
        )
        service_check_exist = service_check and exists(
            service_check
        )
        manifest = "{0}{1}{2}".format(
            dirname(file_name), sep, "manifest.json"
        )

        if exists(manifest):
            try:
                manifest_json = json.load(open(manifest))
                manifest_json = self.process_manifest(manifest_json, basename(dirname(file_name)))
            except JSONDecodeError:
                no_integration_issue = False
                manifest_json = {}
                if not getenv("CI_COMMIT_REF_NAME"):
                    print(
                        "\x1b[33mWARNING\x1b[0m: manifest could not be parsed {}".format(manifest))
                else:
                    print(
                        "\x1b[31mERROR\x1b[0m: manifest could not be parsed {}".format(manifest))
                    raise JSONDecodeError
        else:
            no_integration_issue = False
            manifest_json = {}
            print(
                "\x1b[33mWARNING\x1b[0m: No manifest found for {}".format(file_name))

        dependencies = self.add_dependencies(file_name)
        new_file_name = "{}.md".format(
            basename(dirname(file_name))
        )
        # is this the same as a committed hardcoded integration
        exist_already = (self.content_integrations_dir + new_file_name in self.initial_integration_files)
        # is this overwriting another generated integration
        exist_collision = exists(
            self.content_integrations_dir + new_file_name
        )

        regex_skip_sections_end = r"(```|\{\{< \/code-block |\{\{< \/site-region >\}\})"
        regex_skip_sections_start = r"(```|\{\{< code-block |\{\{< site-region)"

        ## Formating all link as reference to avoid any corner cases
        ## Replace image filenames in markdown for marketplace iterations
        result = ''
        display_on_public = True
        source_comment = f"<!--  SOURCED FROM https://github.com/DataDog/{content['repo_name']} -->\n"

        # Don't try to build markdown if display_on_public_website is False
        if manifest_json and "/dogweb/" not in file_name:
            if not manifest_json["display_on_public_website"]:
                display_on_public = False
        
        if not marketplace and display_on_public:
            try:
                result = source_comment + format_link_file(file_name,regex_skip_sections_start,regex_skip_sections_end)
            except Exception as e:
                print(e)
                print('An error occurred formatting markdown links from integration readme file(s), exiting the build now...')
                sys.exit(1)
        elif marketplace:
            with open(file_name, 'r+') as f:
                markdown_string = f.read()
                # Add static copy with link to the in-app tile, link converters called later will ensure the `site` flag is respected
                purchase_copy = f"---\nThis application is made available through the Marketplace and is supported by a Datadog Technology Partner." \
                                f" <a href=\"https://app.datadoghq.com/marketplace/app/{manifest_json['integration_id']}\" target=\"_blank\">Click Here</a> to purchase this application."

                markdown_string = f"{markdown_string}\n{purchase_copy}"
                markdown_with_replaced_images = self.replace_image_src(markdown_string, basename(dirname(file_name)))
                markdown_setup_removed = self.remove_markdown_section(markdown_with_replaced_images, '## Setup')
                markdown_uninstall_removed = self.remove_markdown_section(markdown_setup_removed, '## Uninstallation')
                updated_markdown = self.remove_h3_markdown_section(markdown_uninstall_removed, '### Pricing')
                is_marketplace_integration_markdown_valid = self.validate_marketplace_integration_markdown(updated_markdown)

                if not is_marketplace_integration_markdown_valid:
                    raise Exception('Potential setup or pricing information included in Marketplace Integration markdown.  Check {} for Setup or Pricing sections.'.format(file_name))
                else:
                    result = source_comment + updated_markdown
        else:
            print(f'Skipping markdown for: {file_name}')            

        ## Check if there is a integration tab logic in the integration file:
        if "<!-- xxx tabs xxx -->" in result:
            tab_logic = True
            ## Inlining all links
            result = self.inline_references(result,regex_skip_sections_start,regex_skip_sections_end)
        else:
            tab_logic= False

        title = manifest_json.get("name", "").lower()
        if title not in [
            k
            for k, v in self.integration_mutations.items()
            if v.get("action") == "merge"
        ]:
            result = re.sub(
                self.regex_h1, "", result, 1
            )
            result = replace_comments(result)
            # result = re.sub(
            #     self.regex_site_region, r"{{% \1 %}}", result, 0
            # )

        # if __init__.py exists lets grab the integration id
        integration_id = manifest_json.get("integration_id", "") or ""
        initpy = "{0}{1}{2}".format(dirname(file_name), sep, "__init__.py")
        if exists(initpy):
            with open(initpy) as f:
                # look for ID = "integration-name" and extract
                matches = re.search("^ID\s*=\s*(?:\'|\")([A-Z-a-z-_0-9]+)(?:\'|\")$", f.read(), re.MULTILINE)
                if matches:
                    integration_id = matches.group(1)

        # if __about__.py exists lets grab the integration version
        integration_version = manifest_json.get("integration_version", "") or ""
        integration_name = basename(dirname(file_name))
        aboutpy = "{0}{1}{2}{3}{4}{5}{6}".format(dirname(file_name), sep, "datadog_checks", sep, integration_name, sep, "__about__.py")

        if exists(aboutpy):
            with open(aboutpy) as f:
                # look for version = "integration-version" and extract
                matches = re.search("^__version__\s*=\s*(?:\'|\")([0-9.]+)(?:\'|\")$", f.read(), re.MULTILINE)
                if matches:
                    integration_version = matches.group(1)

        # determine new name is collision
        if exist_collision:
            collision_name = self.get_collision_alternate_name(file_name)
            print(f"{file_name} {collision_name}")

        # if we have merged integrations upstream in the source repo
        # there can be multiple instances of code we are trying to regex out which doesn't play nice
        # lets split the file and apply it in chunks to avoid these issues
        parts = result.split("## Data Collected")
        new_parts = []
        for part in parts:
            if metrics_exist:
                part = re.sub(
                    self.regex_metrics,
                    r'\1{{< get-metrics-from-git "%s" >}}\n\3\4'
                    % format(title if not exist_collision else collision_name),
                    part,
                    0,
                )
            if service_check_exist:
                part = re.sub(
                    self.regex_service_check,
                    r'\1{{< get-service-checks-from-git "%s" >}}\n\3\4'
                    % format(title if not exist_collision else collision_name),
                    part,
                    0,
                )
            new_parts.append(part)
        if len(new_parts) == 1:
            result = "".join(new_parts)
        else:
            result = "## Data Collected".join(new_parts)

        if not exist_already and no_integration_issue:
            out_name = self.content_integrations_dir + new_file_name
            # let's only write out file.md if it's going to be public
            if manifest_json.get("is_public", False):

                # let's make relative app links to integrations tile absolute
                regex = r"(?<!https://app.datadoghq.com)(/account/settings#integrations[^.)\s]*)"
                regex_result = re.sub(regex, "https://app.datadoghq.com\\1", result, 0, re.MULTILINE)
                if regex_result:
                    result = regex_result

                # if the same integration exists in multiple locations try name md file differently
                # integration_id.md -> name.md -> original_collision_name.md
                if exist_collision:
                    manifest_json["name"] = collision_name
                    collision_name = collision_name if collision_name.endswith('.md') else collision_name + ".md"
                    out_name = self.content_integrations_dir + collision_name
                    print("\x1b[33mWARNING\x1b[0m: Collision, duplicate integration {} trying as {}".format(
                        new_file_name, collision_name))
                    result = self.add_integration_frontmatter(
                        collision_name, result, dependencies, integration_id, integration_version, manifest_json, extra_fm=content.get("options", {}).get("front_matters", {})
                    )
                else:
                    result = self.add_integration_frontmatter(
                        new_file_name, result, dependencies, integration_id, integration_version, extra_fm=content.get("options", {}).get("front_matters", {})
                    )

                # write to content file
                with open(out_name, "w", ) as out:
                    out.write(result)

                ## Reformating all links now that all processing is done
                if tab_logic:
                    try:
                        final_text = format_link_file(out_name, regex_skip_sections_start, regex_skip_sections_end)
                        with open(out_name, 'w') as final_file:
                            final_file.write(final_text)
                    except Exception as e:
                        print(e)
                        print('An error occurred formatting markdown links from integration readme file(s), exiting the build now...')
                        sys.exit(1)
            # else:
            #     if exists(out_name):
            #         print(f"removing {integration_name} due to is_public/display_on_public_websites flag, {out_name}")
            #         remove(out_name)

    def add_integration_frontmatter(
        self, file_name, content, dependencies=[], integration_id="", integration_version="", manifest_json=None, extra_fm=None
    ):
        """
        Takes an integration README.md and injects front matter yaml based on manifest.json data of the same integration
        :param file_name: new integration markdown filename e.g airbrake.md
        :param content: string of markdown content
        :return: formatted string
        """
        if extra_fm is None:
            extra_fm = {}
        fm = {}
        template = "---\n{front_matter}\n---\n\n{content}\n"
        if file_name not in self.initial_integration_files:
            if manifest_json:
                item = manifest_json
            else:
                matches = [
                    d
                    for d in self.datafile_json
                    if d.get("name", "").lower() == basename(file_name).replace(".md", "")
                ]
                item = matches[0] if len(matches) > 0 else []
            if item:
                item["custom_kind"] = "integration"
                item["integration_title"] = (
                    item
                    .get("public_title", "")
                    .replace("Datadog-", "")
                    .replace("Integration", "")
                    .strip()
                )
                item["git_integration_title"] = (
                    item.get("name", "").lower()
                )
                if item.get("type", None):
                    del item["type"]
                item["dependencies"] = dependencies
                item["draft"] = not item.get("is_public", False)
                item["integration_id"] = item.get("integration_id", integration_id)
                item["integration_version"] = item.get("integration_version", integration_version)
                # remove aliases that point to the page they're located on
                # get the current slug from the doc_link
                if item.get('name'):
                    current_slug = 'integrations/{}'.format(item.get('name'))
                # If there are aliases and the current slug value, check to see if they match and if they do, remove it
                if (item.get('aliases')) and current_slug:
                    # loop over the aliases
                    for single_alias in item['aliases']:
                        # strip any tailing and leading / and see if the alias matches the page slug
                        if current_slug == single_alias.strip('/'):
                            # add the alias from the list
                            item['aliases'].remove(single_alias)
                            print(f"\033[94mALIAS REMOVAL\x1b[0m: Removed redundant alias: {single_alias}")
                item.update(extra_fm)
                fm = yaml.safe_dump(
                    item, width=float("inf"), default_style='"', default_flow_style=False, allow_unicode=True
                ).rstrip()
                # simple bool cleanups with replace
                fm = fm.replace('!!bool "false"', 'false')
                fm = fm.replace('!!bool "true"', 'true')
            else:
                fm = yaml.safe_dump({"custom_kind": "integration", **extra_fm}, width=float("inf"), default_style='"', default_flow_style=False,
                                    allow_unicode=True).rstrip()
        return template.format(
            front_matter=fm, content=content
        )

    def add_dependencies(self, file_name):
        """ Adds dependencies to the integration file in order to be able to find the source file in Github """
        dependencies = []
        if file_name.startswith(
            "{0}{1}{2}".format(
                self.extract_dir, "integrations-core", sep
            )
        ):
            dependencies.append(
                file_name.replace(
                    "{0}{1}{2}".format(
                        self.extract_dir,
                        "integrations-core",
                        sep,
                    ),
                    "https://github.com/DataDog/integrations-core/blob/master/",
                )
            )

        elif file_name.startswith(
            "{0}{1}{2}".format(
                self.extract_dir, "integrations-extras", sep
            )
        ):
            dependencies.append(
                file_name.replace(
                    "{0}{1}{2}".format(
                        self.extract_dir,
                        "integrations-extras",
                        sep,
                    ),
                    "https://github.com/DataDog/integrations-extras/blob/master/",
                )
            )

        return dependencies

    def validate_classifier(self, key, value):
        """
        creates a structure like this so we can easily lookup
        {
            "category": ["os system", "metrics"],
            "supported os": []
        }
        @param key: classifier key e.g category
        @param value: classifier value e.g marketplace
        """
        # build a lookup
        data = defaultdict(list)
        for tag in CLASSIFIER_TAGS:
            tag_key, tag_val = tag.lower().split("::")
            data[tag_key].append(tag_val)
        return value in data[key]

    def process_manifest(self, manifest_json, name):
        """ Takes manifest and converts v2 and above to v1 expected formats for now """
        manifest_version = (manifest_json.get("manifest_version", '1.0.0') or '1.0.0').split('.')
        split_version = manifest_version[0] if len(manifest_version) > 1 else '1'
        if split_version != '1':
            # v2 or above
            manifest_json["integration_id"] = manifest_json.get("app_id", "")
            categories = []
            supported_os = []
            manifest_classifier_tags = manifest_json.get("tile", {}).get("classifier_tags", [])
            skipped_tags = []
            for tag in manifest_classifier_tags:
                # in some cases tag was null/None
                if tag:
                    key, value = tag.lower().split("::")
                    if key == "category":
                        # if it validates or we have no classifiers (e.g
                        if self.validate_classifier(key, value) or not CLASSIFIER_TAGS:
                            categories.append(value)
                        else:
                            skipped_tags.append(value)
                    if key == "supported os":
                        supported_os.append(value)
            manifest_json["categories"] = categories
            manifest_json["supported_os"] = supported_os
            manifest_json["public_title"] = manifest_json.get("tile", {}).get("title", '')
            manifest_json["is_public"] = manifest_json.get("display_on_public_website", False)
            manifest_json["short_description"] = manifest_json.get("tile", {}).get("description", '')
            manifest_json["name"] = manifest_json.get("name", name)
            if skipped_tags:
                print(f'\x1b[33mWARNING\x1b[0m: Categories skipped on integration {manifest_json["name"]}, {skipped_tags}')

        # temporary workaround until we can source integration data from APW
        # https://datadoghq.atlassian.net/browse/WEB-4579
        if 'oauth' in manifest_json.keys(): del manifest_json['oauth']

        return manifest_json
