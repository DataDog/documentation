#!/usr/bin/env python3
import re
from optparse import OptionParser


def array_line_to_text(array_of_lines):
    text = ""
    for line in array_of_lines:
        text += str(line)
    return text


def prepare_file(file):
    """
    Goes through a file and parses it into different sections. Those sections are a list of lines and are put within an Array.
    The first item of the Array is the main section, all other item if any are sub sections, a.k.a tabs within the page.
    :param file: file to break down into sections
    :return: array of sections, each section is a list of lines within this section
    """

    # A state machine is used here, the function takes line within the file one by one, and depending of the states, either
    # 1. Consider it is in the main section
    # 2. Consider it is within a tabs group
    # 3. Consider within a tab
    #
    # We keep the {{< tabs >}} lines and co. in the main section since it will be used to inline the proper content afterwards.
    state = "main"

    main_section = []
    sub_sections = []
    temp_section = []
    i = 0

    with open(file, "r", encoding="utf-8") as f:
        for line in f:
            if state == "main":
                main_section.append(line)
                if re.search(r"{{< tabs >}}", line.strip()):
                    state = "tabs"
            elif state == "tabs":
                main_section.append(line)
                if re.search(r"{{% tab ", line.strip()):
                    state = "tab"
                if re.search(r"{{< /tabs >}}", line.strip()):
                    state = "main"
            elif state == "tab":
                if re.search(r"{{% /tab %}}", line.strip()):
                    state = "tabs"
                    main_section.append(line)
                    sub_sections.append(temp_section)
                    temp_section = []
                else:
                    temp_section.append(line)

        if state == "main":
            file_broken = [main_section]
            file_broken = file_broken + sub_sections
            return file_broken
        else:
            return 0


def process_section(section, regex_skip_sections_start, regex_skip_sections_end):
    """
    Goes through a section. A section is an array of lines

    :param section: array of lines to handle
    :param regex_skip_sections_start: regex defining the start line that indicates a block of line that shouldn't be processed
    :param regex_skip_sections_end: regex defining the end line that indicates a block of line that shouldn't be processed
    :return: section_with_references which is an array of lines.
    """

    regex_link_inlined = r"\[.*?\]\((?!#)(.*?)\)"
    regex_bottom_reference_link = r"^\s*\[(\d*?)\]: (.*)"

    split_text_without_references = r"((.|\n)*)\n\[\d\]: .*"

    skip = False
    all_references = []
    section_without_references = []

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
                all_references.append([reference.group(1), reference.group(2)])
            else:
                section_without_references.append(line)

    # Inlining refrences
    # Looking at each line, it replaces reference link [.*][\d] by the full inlined link

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
                    curent_link = "][" + reference[0] + "]"
                    line = line.replace(curent_link, "](" + reference[1] + ")")
        section_with_all_links.append(line)

    skip = False

    # Collecting all links from file
    # Looking at each line, it extracts all links it can found and add it to all_links array

    all_links = []
    for line in section_with_all_links:
        if skip:
            if re.search(regex_skip_sections_end, line):
                skip = False
        elif not skip:
            if re.search(regex_skip_sections_start, line):
                skip = True
            else:
                line_links = re.findall(regex_link_inlined, line, re.MULTILINE)
                if not line_links == []:
                    for link in line_links:
                        # If the link is already in the array, then it doesn't add it to avoid duplicated link
                        if link not in all_links:
                            all_links.append(link)

    # Now that all link are extracted, it creates a new section with all inlined referenced link
    section_with_references = []

    for line in section_with_all_links:
        if skip:
            if re.search(regex_skip_sections_end, line):
                skip = False
        elif not skip:
            if re.search(regex_skip_sections_start, line):
                skip = True
            else:
                i = 1
                for link in all_links:
                    link_to_reference = "](" + str(link) + ")"
                    line = line.replace(link_to_reference, "][" + str(i) + "]")

                    i += 1
        section_with_references.append(line)

    # Finally it adds all refrerences at the end of the section

    i = 1

    for link in all_links:
        section_with_references.append("[" + str(i) + "]: " + link + "\n")
        i += 1

    return section_with_references


def inline_section(file_prepared):

    # inlining sections
    final_text = str(file_prepared[0])
    i = 1
    regex_section = r"({{% tab \".*?\" %}}\n(.*?){{% /tab %}})"
    # taking into account that adding a section text creates an offset for the whole file
    offset = 0
    offset_current = 0
    for section in re.finditer(regex_section, file_prepared[0], re.MULTILINE):
        offset = offset_current + section.end() - 12
        final_text = final_text[:offset] + str(file_prepared[i]) + final_text[offset:]
        offset_current = offset_current + len(file_prepared[i])

        i = i + 1
    return final_text


if __name__ == "__main__":
    parser = OptionParser(usage="usage: %prog [options] file")
    parser.add_option(
        "-f", "--file", help="file to format link in reference", default=None,
    )

    options, args = parser.parse_args()
    not_issue = True

    prepared_file = prepare_file(options.file)

    if prepared_file != 0:
        final_text = []

        regex_skip_sections_end = r"(```|\{\{< \/code-block >\}\})"
        regex_skip_sections_start = r"(```|\{\{< code-block)"

        for section in prepared_file:
            try:
                final_text.append(
                    array_line_to_text(
                        process_section(
                            section, regex_skip_sections_start, regex_skip_sections_end
                        )
                    )
                )

            except:
                not_issue = False
                print(
                    "\x1b[31mERROR\x1b[0m: There was an issue processing section:\n {}".format(
                        section
                    )
                )

        if not_issue:
            with open(options.file, "w") as final_file:
                final_file.write(str(inline_section(final_text)))
        else:
            print(
                "\x1b[31mERROR\x1b[0m: FAILURE: There was an issue formating file: {} \n ".format(
                    options.file
                )
            )

    else:
        print(
            "\x1b[31mERROR\x1b[0m: Couldn't split the file into multiple section correctly, check the file: {}".format(
                options.file
            )
        )
