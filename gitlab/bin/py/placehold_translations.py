#!/usr/bin/env python3
from glob import glob
import ntpath
from optparse import OptionParser
import os
import re

import yaml

DEFAULT_LANGUAGE = "en"


def get_languages(config_location):
    with open(config_location) as config:
        c = config.read()
        c_yaml = yaml.load(c)
        d = {}
        for l in c_yaml["languages"]:
            d.update({l: c_yaml["languages"][l]})
        return d


def create_glob(files_location, lang, disclaimer=""):
    all_files = [f for f in glob(files_location + '**/*.md') if 'index' not in f]
    if lang == 'en':
        g = [f for f in all_files if len(f.split('.')) == 2]
    else:
        g = [f for f in all_files if '.{0}.md'.format(lang) in f]
    return {"name": lang, "glob": g, "disclaimer": disclaimer}


def diff_globs(base, compare):
    return [f for f in base['glob'] if f.replace('.md', '.%s.md' % compare['name']) not in compare['glob']]


def create_placeholder_file(template, new_glob):
    new_dest = os.path.dirname(template) + '/' + ntpath.basename(template).replace('.md', '.%s.md' % new_glob['name'])
    with open(template) as o_file:
        content = o_file.read()
        if new_glob["disclaimer"]:
            disclaimer = "<div class='alert alert-info'><strong>NOTICE:</strong>%s</div>\n\n" % new_glob["disclaimer"]
            fm = re.findall(r'(---\n.*---\n)', content, re.DOTALL)[0]
            content = content.replace(fm, fm + disclaimer)

    with open(new_dest, 'w') as o_file:
        o_file.write(content)

    return new_dest


def main():
    parser = OptionParser(usage="usage: %prog [options] create placeholder pages for multi-language")
    parser.add_option("-c", "--config_location", help="location of site config")
    parser.add_option("-f", "--files_location", help="location of site content files")

    (options, args) = parser.parse_args()
    options = vars(options)

    lang = get_languages(options["config_location"])
    default_glob = create_glob(options["files_location"], DEFAULT_LANGUAGE)
    del lang[DEFAULT_LANGUAGE]
    for l in lang:
        info = lang[l]
        lang_glob = create_glob(files_location=options["files_location"], lang=l, disclaimer=info["disclaimer"])
        diff = diff_globs(base=default_glob, compare=lang_glob)
        for f in diff:
            create_placeholder_file(template=f, new_glob=lang_glob)


if __name__ == "__main__":
    main()
