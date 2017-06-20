#!/usr/bin/env python3

"""build a hugo config file from default file and an override file

This script is meant to be run from commandline from a bash script.
See build_config.sh for actual usage

Example:
        $ gitlab/bin/py/build_config.py -b "config.yaml" -o "preview.yaml" \
        -r "" -d ""

"""
from optparse import OptionParser
import os

import yaml


def compare_keys(template_dict):
    base_keys = []

    def build_base_keys(v, prefix=''):
        if isinstance(v, dict):
            for k, v2 in v.items():
                p2 = "{}['{}']".format(prefix, k)
                build_base_keys(v2, p2)
        elif isinstance(v, list):
            for i, v2 in enumerate(v):
                p2 = "{}[{}]".format(prefix, i)
                build_base_keys(v2, p2)
        else:
            base_keys.append(prefix)

    build_base_keys(template_dict)

    for ref in base_keys:
        try:
            eval("new_dict%s" % ref)
        except KeyError:
            return False
    return True


def build_config(proj_path, base, override, distro=None, branch=None, public_dir="public"):
    # main config file
    with open(os.path.join(proj_path, base), encoding='utf-8') as template:
        content_main = template.read()
        yaml_main = yaml.load(content_main)

    # override config file
    with open(os.path.join(proj_path, override), encoding='utf-8') as template:
        content_override = template.read()
        yaml_override = yaml.load(content_override)

    def find_item(obj, key):
        if key in obj:
            return obj[key]
        for k, v in obj.items():
            if isinstance(v, dict):
                item = find_item(v, key)
                if item is not None:
                    return item

    def recurse_dict(curr_dict):
        new = {}
        for k, v in curr_dict.items():
            # recurse if this is a dictionary
            if isinstance(v, dict):
                v = recurse_dict(v)
                new[k] = v
            else:
                new_v = find_item(yaml_override, k)
                new[k] = v if new_v is None else new_v
        return new

    content_new = recurse_dict(yaml_main)

    if 'preview' in override and distro and branch:
        content_new['baseURL'] = distro + '%s/' % branch
        print(content_new['baseURL'])
        content_new['params']['branch'] = "%s" % branch
        print(content_new['params']['branch'])
        content_new['params']['static_url'] = distro + '%s/' % branch
        print(content_new['params']['static_url'])

    content_new['publishDir'] = public_dir

    with open(os.path.join(proj_path, 'build.yaml'), 'w', encoding='utf-8') as open_write:
        open_write.write(yaml.dump(content_new))


def main():
    """ build a hugo config file from default file and an override file
    :param argv: required: base-file is the default, ow-file is the env config, 
                 optional: build-url (preview only) specific (CF distro url),
                           branch_name (preview only) is used to create the unique env
    :return: void
    """

    parser = OptionParser(usage="usage: %prog [options] base_config override_config")
    parser.add_option("-b", "--branch", help="(preview only) branch name used to create url", default=None)
    parser.add_option("-d", "--distro", help="(preview only) CloudFront disto used to create menus", default=None)
    parser.add_option("-p", "--public_dir", help="folder", default="public")

    (options, args) = parser.parse_args()

    if len(args) != 2:
        parser.error("please specify both base and override files.")

    base = args[0]
    override = args[1]
    options = vars(options)

    print('using %s for base template for %s' % (base, override))
    curr_dir = os.getcwd()

    build_config(proj_path=curr_dir, base=base, override=override, distro=options['distro'], branch=options['branch'],
                 public_dir=options['public_dir'])


if __name__ == "__main__":
    main()
