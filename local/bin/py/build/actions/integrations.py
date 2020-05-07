#!/usr/bin/env python3

import csv
import glob
import json
import linecache
import re
import shutil
import yaml
import markdown2

from json import JSONDecodeError
from itertools import chain
from os import sep, makedirs, getenv, remove
from os.path import (
    exists,
    basename,
    dirname,
    join,
    abspath,
    normpath
)

from format_link import format_link_file


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
        self.regex_tabs_open = re.compile(
            r"<!-- xxx tabs xxx -->", re.MULTILINE
        )
        self.regex_tabs_close = re.compile(
            r"<!-- xxz tabs xxx -->", re.MULTILINE
        )
        self.regex_tab_open = re.compile(
            r"<!-- xxx tab", re.MULTILINE
        )
        self.regex_tab_close = re.compile(
            r"<!-- xxz tab xxx -->", re.MULTILINE
        )
        self.regex_tab_end = re.compile(
            r" xxx -->", re.MULTILINE
        )
        self.regex_metrics = re.compile(
            r"(#{3} Metrics\n)([\s\S]*this integration.|[\s\S]*this check.)([\s\S]*)(#{3} Events\n)",
            re.DOTALL,
        )
        self.regex_service_check = re.compile(
            r"(#{3} Service Checks\n)([\s\S]*does not include any service checks at this time.)([\s\S]*)(#{2} Troubleshooting\n)",
            re.DOTALL,
        )
        self.regex_fm = re.compile(
            r"(?:-{3})(.*?)(?:-{3})(.*)", re.DOTALL
        )
        self.regex_source = re.compile(
            r"(\S*FROM_DISPLAY_NAME\s*=\s*\{)(.*?)\}",
            re.DOTALL,
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


    def process_integrations(self, content):
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
                self.process_integration_readme(file_name)

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
                if getenv("LOCAL") == 'True':
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
        new_file_name = "{}.json".format(
            basename(dirname(normpath(file_name)))
        )
        shutil.copy(
            file_name,
            self.data_service_checks_dir + new_file_name,
        )

    def process_integration_readme(self, file_name):
        """
        Take a single README.md file and
        1. extract the first h1, if this isn't a merge item
        2. add tabs if they exist
        3. inject metrics after ### Metrics header if metrics exists for file
        4. inject service checks after ### Service Checks if file exists
        5. inject hugo front matter params at top of file
        6. write out file to content/integrations with filename changed to integrationname.md
        :param file_name: path to a readme md file
        """
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
            except JSONDecodeError:
                no_integration_issue = False
                manifest_json = {}
                if getenv("LOCAL") == 'True':
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
        exist_already = exists(
            self.content_integrations_dir + new_file_name
        )

        regex_skip_sections_end = r"(```|\{\{< \/code-block >\}\})"
        regex_skip_sections_start = r"(```|\{\{< code-block)"

        ## Formating all link as reference to avoid any corner cases
        try:
            result = format_link_file(file_name,regex_skip_sections_start,regex_skip_sections_end)
        except Exception as e:
            print(e)

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
            result = re.sub(
                self.regex_tabs_open, "{{< tabs >}}", result, 0
            )
            result = re.sub(
                self.regex_tabs_close, "{{< /tabs >}}", result, 0
            )
            result = re.sub(
                self.regex_tab_open, "{{% tab", result, 0
            )
            result = re.sub(
                self.regex_tab_close, "{{% /tab %}}", result, 0
            )
            result = re.sub(
                self.regex_tab_end, " %}}", result, 0
            )

        if metrics_exist:
            result = re.sub(
                self.regex_metrics,
                r'\1{{< get-metrics-from-git "%s" >}}\n\3\4'
                % format(title),
                result,
                0,
            )
        if service_check_exist:
            result = re.sub(
                self.regex_service_check,
                r'\1{{< get-service-checks-from-git "%s" >}}\n\3\4'
                % format(title),
                result,
                0,
            )

        result = self.add_integration_frontmatter(
            new_file_name, result, dependencies
        )

        if not exist_already and no_integration_issue:
            with open(self.content_integrations_dir + new_file_name, "w", ) as out:
                out.write(result)

            ## Reformating all links now that all processing is done
            if tab_logic:
                final_text = format_link_file(self.content_integrations_dir + new_file_name,regex_skip_sections_start,regex_skip_sections_end)
                with open(self.content_integrations_dir + new_file_name, 'w') as final_file:
                    final_file.write(final_text)

    def add_integration_frontmatter(
        self, file_name, content, dependencies=[]
    ):
        """
        Takes an integration README.md and injects front matter yaml based on manifest.json data of the same integration
        :param file_name: new integration markdown filename e.g airbrake.md
        :param content: string of markdown content
        :return: formatted string
        """
        fm = {}
        template = "---\n{front_matter}\n---\n\n{content}\n"
        if file_name not in self.initial_integration_files:
            item = [
                d
                for d in self.datafile_json
                if d.get("name", "").lower() == basename(file_name).replace(".md", "")
            ]
            if item and len(item) > 0:
                item[0]["kind"] = "integration"
                item[0]["integration_title"] = (
                    item[0]
                    .get("public_title", "")
                    .replace("Datadog-", "")
                    .replace("Integration", "")
                    .strip()
                )
                item[0]["git_integration_title"] = (
                    item[0].get("name", "").lower()
                )
                if item[0].get("type", None):
                    item[0]["ddtype"] = item[0].get("type")
                    del item[0]["type"]
                item[0]["dependencies"] = dependencies
                fm = yaml.dump(
                    item[0], width=150, default_style='"', default_flow_style=False
                ).rstrip()
            else:
                fm = {"kind": "integration"}
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
