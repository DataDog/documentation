#!/usr/bin/env python3
from glob import glob
import ntpath
from optparse import OptionParser
import os
import re

import yaml

DEFAULT_LANGUAGE = "en"
TEMPLATE = """\
---
{front_matter}
---

{content}
"""


def get_languages(config_location):
    with open(config_location) as config:
        c = config.read()
        c_yaml = yaml.load(c)
        d = {}
        for l in c_yaml["languages"]:
            d.update({l: c_yaml["languages"][l]})
        return d


def create_glob(files_location, lang, disclaimer=""):
    all_files = [f for f in glob(files_location + '**/*.md')]
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
        boundary = re.compile(r'^-{3,}$', re.MULTILINE)
        _, fm, content = boundary.split(content, 2)
        new_yml = yaml.load(fm)
        new_content = content
        if new_yml.get('aliases', None):
            new_aliases = []
            for alias in new_yml.get('aliases'):
                new_aliases.append('/{0}{1}'.format(new_glob['name'], alias))
            new_yml['aliases'] = new_aliases
        if new_glob["disclaimer"]:
            disclaimer = "<div class='alert alert-info'><strong>NOTICE:</strong>%s</div>\n\n" % new_glob["disclaimer"]
            new_content = disclaimer + content
            new_yml['placeholder'] = True
        content = TEMPLATE.format(front_matter=yaml.dump(new_yml, default_flow_style=False).strip(),
                                  content=new_content.strip())

    with open(new_dest, 'w') as o_file:
        o_file.write(content)
        print("creating placeholder for {0} at {1}".format(template, new_dest))

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
        print("building {0} placeholder pages for {1} ".format(len(diff), l))
        for f in diff:
            create_placeholder_file(template=f, new_glob=lang_glob)


if __name__ == "__main__":
    main()
