import os
import re
import yaml


def main():
    integrations_directory = 'content/en/integrations'
    relative_link_dict = get_relative_links_from_dir(integrations_directory)
    print(yaml.safe_dump(relative_link_dict))


def get_relative_links_from_dir(dir):
    relative_link_regex = r'^\s*\[(\d*?)\]: ([/][\S])'
    relative_link_dict = dict()

    for file_name in os.listdir(dir):
        full_file_path = os.path.join(dir, file_name)

        if os.path.isfile(full_file_path):
            open_file = open(full_file_path, 'r')
            lines = open_file.readlines()

            for line in lines:
                if re.match(relative_link_regex, line):
                    url = extract_url_from_markdown_footer_link(line)
                    relative_link_dict.setdefault(file_name, []).append(url.strip())
                    # relative_link_list.append(url.strip())

    return relative_link_dict


def extract_url_from_markdown_footer_link(markdown_link):
    extract_url_regex = r'^\s*\[(\d*?)\]:'
    return re.sub(extract_url_regex, '', markdown_link)


if __name__ == "__main__":
    main()