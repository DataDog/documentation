import os
import re
import yaml

INLINE_MD_LINK_REGEX = r'\[[^\]]*\]\([^\)]+\)'
FOOTER_MD_LINK_REGEX = r'^\s*\[(\d*?)\]: '
INLINE_AND_FOOTER_MD_LINK_REGEX = r'(^\s*\[(\d*?)\]: ([/][\S])|\[[^\]]*\]\([^\)]+\))'


def main():
    integrations_directory = 'content/en/integrations'
    relative_links_dict = get_relative_links_list(integrations_directory)
    out_file = open('integrations_readmes_with_relative_docs_links.txt', 'w+')
    out_file.write(yaml.safe_dump(relative_links_dict))


def get_relative_links_list(dir):
    relative_links_dict = dict()

    for file_name in os.listdir(dir):
        full_file_path = os.path.join(dir, file_name)

        if os.path.isfile(full_file_path):
            open_file = open(full_file_path, 'r')
            lines = open_file.readlines()

            for line in lines:
                if re.match(INLINE_AND_FOOTER_MD_LINK_REGEX, line):
                    url = extract_url_from_markdown_footer_link(line)

                    if not url.startswith('https://') and not url.startswith('mailto:'):
                        relative_links_dict.setdefault(file_name, []).append(url.strip())

    return relative_links_dict


def extract_url_from_markdown_footer_link(markdown_link):
    inline_regex_match = re.match(INLINE_MD_LINK_REGEX, markdown_link)
    footer_regex_match = re.match(FOOTER_MD_LINK_REGEX, markdown_link)

    if inline_regex_match:
        match = re.search(r'\(([^\)]+)\)', inline_regex_match[0])
        return re.sub(r'(\(|\))', '', match[0])
    elif footer_regex_match:
        return re.sub(r'^\s*\[(\d*?)\]: ', '', markdown_link)


if __name__ == "__main__":
    main()