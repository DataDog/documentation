#!/usr/bin/env python3
import re
from optparse import OptionParser


def prepare_file(file):

    state = "main"
    # main_section: an array of line representing the main section of the document

    main_section = []

    # sub_sections: an array of array of lines representing the different independant sub-sections of the document
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
        file_broken = [main_section]
        file_broken = file_broken + sub_sections
        return file_broken


def process_section(section, regex_skip_sections_start, regex_skip_sections_end):

    regex_link_inlined = r"\s\[.*?\]\((?!#)(.*?)\)"
    regex_bottom_reference_link = r"^\s*\[(\d*?)\]: (.*)"

    split_text_without_references = r"((.|\n)*)\n\[\d\]: .*"

    skip = False
    all_references = []
    section_without_references = []

    # Collecting all references and removing them from section

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

    skip = False

    # Inlining refrences
    section_with_all_links = []
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
                        if link not in all_links:
                            all_links.append(link)

    # Adding reference in text
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
                    link_to_reference = "\]\(" + link + "\)"
                    line = re.sub(
                        re.compile(link_to_reference), "][" + str(i) + "]", line
                    )
                    i += 1
        section_with_references.append(line)

    # Adding refrerence at the end of the section

    i = 1

    for link in all_links:
        section_with_references.append("[" + str(i) + "]: " + link + "\n")
        i += 1

    return section_with_references


def array_line_to_text(array_of_lines):
    text = ""
    for line in array_of_lines:
        text += str(line)
    return text


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

    prepared_file = prepare_file(options.file)

    final_text = []

    regex_skip_sections_end = r"(```|\{\{< \/code-block >\}\})"
    regex_skip_sections_start = r"(```|\{\{< code-block)"

    for section in prepared_file:
        final_text.append(
            array_line_to_text(
                process_section(
                    section, regex_skip_sections_start, regex_skip_sections_end
                )
            )
        )

    with open(options.file, "w") as final_file:
        final_file.write(str(inline_section(final_text)))
