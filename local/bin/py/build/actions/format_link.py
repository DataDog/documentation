#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import glob
from optparse import OptionParser


def prepare_file(file):
    """
    Goes through a file and parses it into different sections. Those sections are a list of lines and are put within an Array.
    The first item of the Array is the main section, all other item if any are sub sections, a.k.a tabs within the page.

    :param file: file to break down into sections.
    :return array_of_sections: Each section is a list of lines within this section.
    """

    # A state machine is used here, the function takes line within the file one by one, and depending of the states, either
    # 1. Consider it is in the main section
    # 2. Consider it is within a tabs group
    # 3. Consider within a tab
    #
    # We keep the {{< tabs >}} lines and co. in the main section since it will be used to inline the proper content afterwards.
    state = 'main'

    main_section = []
    sub_sections = []
    temp_section = []

    with open(file, 'r', encoding='utf-8') as f:
        for line in f:
            if state == 'main':
                main_section.append(line)
                if (re.search(r"{{< (tabs|programming-lang-wrapper|site-region) >}}", line.strip())):
                    state = 'tabs'
            elif state == 'tabs':
                main_section.append(line)
                if (re.search(r"{{% (tab|programming-lang) ", line.strip())):
                    state = 'tab'
                if (re.search(r"{{< /(tabs|programming-lang-wrapper|site-region) >}}", line.strip())):
                    state = 'main'
            elif state == 'tab':
                if (re.search(r"{{% /(tab|programming-lang) %}}", line.strip())):
                    state = 'tabs'
                    main_section.append(line)
                    sub_sections.append(temp_section)
                    temp_section = []
                else:
                    temp_section.append(line)

    if state != 'main':
        raise ValueError

    return [main_section] + sub_sections


def check_references(all_references):
    """
    Goes through a list of reference link and dedupe it, and if two references share the same index, throw an error.

    :param all_references: An array of references
    :return all_references_deduped: An array of references deduped.
    """
    all_references_deduped = []
    reference_indexes_used = []
    duplicated_references = []
    is_duplicated = False

    for reference in all_references:
        if reference not in all_references_deduped:

            reference_index, reference_val = reference

            if reference_index not in reference_indexes_used:
                reference_indexes_used.append(reference_index)
                all_references_deduped.append(reference)
            else:
                duplicated_references.append(reference)
                is_duplicated = True

    if is_duplicated:
        for duplicated_reference in duplicated_references:
            duplicated_reference_index, duplicated_reference_val = duplicated_reference
            print('Duplicated reference: [{}]: {}'.format(
                duplicated_reference_index, duplicated_reference_val))
        raise AssertionError

    return all_references_deduped


def remove_reference(section, regex_skip_sections_start,
                     regex_skip_sections_end):
    """
    Goes through a section and remove all reference links it can found.

    :param section: An array of lines representing a section.
    :param regex_skip_sections_start: regex defining the start line that indicates a block of line that shouldn't be processed.
    :param regex_skip_sections_end: regex defining the end line that indicates a block of line that shouldn't be processed.
    :return [all_references, section_without_references]: Returns an array of array, the first item contains all references found in the section
                                                          The second item contains the section without any reference in it.
    """
    skip = False
    all_references = []
    section_without_references = []
    regex_bottom_reference_link = r"^\s*\[(\d*?)\]: (\S*)"

    # Collecting all references and removing them from section
    # looking at each line, if a line is a reference then we remove it and store the reference.

    for line in section:
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

    try:
        all_references_checked = check_references(all_references)
    except AssertionError:
        raise AssertionError

    return [all_references_checked, section_without_references]


def inlining_all_links(
        section_without_references,
        all_references,
        regex_skip_sections_start,
        regex_skip_sections_end):
    """
    Goes through a section with a list of references and inline all references.

    :param section_without_references: An array of lines representing a section, for this function to work, all reference should be removed previously from the section.
    :param regex_skip_sections_start: regex defining the start line that indicates a block of line that shouldn't be processed.
    :param regex_skip_sections_end: regex defining the end line that indicates a block of line that shouldn't be processed.
    :return section_with_all_links: A section (an array of lines) is returned without any references in it, just pure inlined links.
    """

    section_with_all_links = []
    skip = False

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

    return section_with_all_links


def collect_all_links(section_with_all_links,
                      regex_skip_sections_start,
                      regex_skip_sections_end):
    """
    Goes through a section and extract all inlined links it can found.

    :param section_with_all_links: An array of lines representing a section. For this function to work, all links must be inlined first.
    :param regex_skip_sections_start: regex defining the start line that indicates a block of line that shouldn't be processed.
    :param regex_skip_sections_end: regex defining the end line that indicates a block of line that shouldn't be processed.
    :return all_links: An array of all unique links that where found within a section.
    """
    regex_link_inlined = r"\[.*?\]\((?![#?])(\S*?)\)"
    all_links = []
    skip = False
    for line in section_with_all_links:
        if skip:
            if re.search(regex_skip_sections_end, line):
                skip = False
        elif not skip:
            if re.search(regex_skip_sections_start, line):
                skip = True
            else:
                line_links = re.findall(regex_link_inlined, line,
                                        re.MULTILINE)
                if not line_links == []:
                    for link in line_links:

                        # If the link is already in the array, then it doesn't add it to avoid duplicated link

                        if link not in all_links:
                            all_links.append(link)

    # By the end of the for loop skip should always be false otherwise it means that a codeblock is not closed.
    if skip:
        raise ValueError

    return all_links


def transform_link_to_references(
    section_with_all_links,
    all_links,
    regex_skip_sections_start,
    regex_skip_sections_end,
):
    """
    Goes through a section where all link are inlined and transform them in references

    :param section_with_all_links: An array of lines representing a section where all link are inlined.
    :param all_links: An array of links representing all unique list associated to section_with_all_links.
    :param regex_skip_sections_start: regex defining the start line that indicates a block of line that shouldn't be processed.
    :param regex_skip_sections_end: regex defining the end line that indicates a block of line that shouldn't be processed.
    :return section_with_references: A section (an array of lines), with all inlined links transformed into a reference link.
    """

    section_with_references = []

    skip = False

    for line in section_with_all_links:
        if skip:
            if re.search(regex_skip_sections_end, line):
                skip = False
        elif not skip:
            if re.search(regex_skip_sections_start, line):
                skip = True
            else:
                for i, link in enumerate(all_links):
                    link_to_reference = '](' + str(link) + ')'
                    # i is incremented by one in order to start references indexes at 1
                    line = line.replace(link_to_reference,
                                        '][' + str(i + 1) + ']')

        section_with_references.append(line)

    # By the end of the for loop skip should always be false otherwise it means that a codeblock is not closed.
    if skip:
        raise ValueError

    return section_with_references


def process_section(section, regex_skip_sections_start,
                    regex_skip_sections_end):
    """
    Goes through a section. A section is an array of lines from a file and format all links to transform them into reference link.

    :param section: Array of lines to analyse.
    :param regex_skip_sections_start: regex defining the start line that indicates a block of line that shouldn't be processed.
    :param regex_skip_sections_end: regex defining the end line that indicates a block of line that shouldn't be processed.
    :return section_with_references: Returns the section but with all link set as reference.
    """
    try:
        all_references, section_without_references = remove_reference(
            section, regex_skip_sections_start, regex_skip_sections_end)
    except AssertionError:
        print('\x1b[31mERROR\x1b[0m: Some references are duplicated.')
        raise AssertionError
    except ValueError:
        print('\x1b[31mERROR\x1b[0m: A skip section is not closed')
        raise ValueError

    # Inlining refrences
    # Looking at each line, it replaces reference link [.*][\d] by the full inlined link

    section_with_all_links = \
        inlining_all_links(section_without_references, all_references,
                           regex_skip_sections_start,
                           regex_skip_sections_end)

    # Collecting all links from file
    # Looking at each line, it extracts all links it can found and add it to all_links array

    all_links = collect_all_links(section_with_all_links,
                                  regex_skip_sections_start,
                                  regex_skip_sections_end)

    # Now that all link are extracted, it creates a new section with all inlined referenced link

    section_with_references = \
        transform_link_to_references(section_with_all_links, all_links,
                                     regex_skip_sections_start, regex_skip_sections_end)

    # Finally it adds all refrerences at the end of the section

    for i, link in enumerate(all_links):

        # 1 is added to i in order to start references link index at 1 instead of 0

        section_with_references.append('[' + str(i + 1) + ']: ' + link + '\n')

    return section_with_references


def inline_section(file_prepared):
    """
    Takes a prepared file (and Array of sections prepared) and transform it into the final file that can be written back.

    :param file_prepared: Array of sections, where the first item is the main section, an all the other one are sub sections in order of appearance.
    :return final_text: Returns text with all sections with reference link inlined in the main section.
    """
    # inlining sections

    final_text = []

    end_section_pattern = r"\s*{{% /(tab|programming-lang|site-region) %}}.*"

    i = 1

    try:
        for line in file_prepared[0]:
            if (re.match(end_section_pattern, line)):
                final_text += file_prepared[i]
                i += 1
            final_text.append(line)
    except:
        raise ValueError

    return ''.join(final_text)


def format_link_file(file, regex_skip_sections_start,
                     regex_skip_sections_end):
    """
    Take a file and transform all links into reference link within this file.

    :param file: Array of lines to analyse.
    :param regex_skip_sections_start: regex defining the start line that indicates a block of line that shouldn't be processed.
    :param regex_skip_sections_end: regex defining the end line that indicates a block of line that shouldn't be processed.
    :return final_text: Returns the file but with all links set as reference.
    """

    try:
        prepared_file = prepare_file(file)
    except ValueError:
        print("\x1b[31mERROR\x1b[0m: Couldn't split the file into multiple section correctly for file: {}".format(file))
        raise ValueError

    final_text = []

    for section in prepared_file:
        try:
            final_text.append(process_section(section,
                                              regex_skip_sections_start,
                                              regex_skip_sections_end))
        except:
            print(
                '\x1b[31mERROR\x1b[0m: There was an issue processing a section for file: {}'.format(file))
            raise ValueError

    try:
        file_with_references = inline_section(final_text)
    except ValueError:
        print(
            '\x1b[31mERROR\x1b[0m: Could not inline sections properly for file: {}'.format(file))
        raise ValueError

    return file_with_references


if __name__ == '__main__':
    parser = OptionParser(usage='usage: %prog [options] file')
    parser.add_option('-f', '--file',
                      help='File to format link in reference',
                      default=None)
    parser.add_option('-d', '--directory',
                      help='Directory to format link in reference for all markdown file', default=None)

    (options, args) = parser.parse_args()

    regex_skip_sections_end = r"(```|\{\{< \/code-block >\}\})"
    regex_skip_sections_start = r"(```|\{\{< code-block)"

    if options.file:
        try:
            final_text = format_link_file(options.file,
                                          regex_skip_sections_start, regex_skip_sections_end)
            with open(options.file, 'w') as final_file:
                final_file.write(final_text)
        except:
            print('\x1b[31mERROR\x1b[0m: Processing file {}'.format(
                options.file))

    elif options.directory:
        for filepath in glob.iglob(options.directory + '**/*.md',
                                   recursive=True):

            print('\x1b[32mINFO\x1b[0m: Formating file {}'.format(filepath))
            try:
                final_text = format_link_file(filepath,
                                              regex_skip_sections_start,
                                              regex_skip_sections_end)
                with open(filepath, 'w') as final_file:
                    final_file.write(final_text)
            except:
                print(
                    '\x1b[31mERROR\x1b[0m: Processing file {}'.format(filepath))

    else:
        print('\x1b[31mERROR\x1b[0m: Please specify a file or a directory')
