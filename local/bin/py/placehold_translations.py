#!/usr/bin/env python3
from glob import glob
import ntpath
from optparse import OptionParser
import os
import re
import logging
import sys
from functools import partial
from multiprocessing import cpu_count
from multiprocessing.pool import Pool
import yaml

DEFAULT_LANGUAGE = "en"
TEMPLATE = """\
---
{front_matter}
---

{content}
"""

logger = logging.getLogger(__name__)
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)


def get_disclaimer_from_params(config_location, key):
    try:
        with open(os.path.dirname(config_location) + f'/params.{key}.yaml') as f:
            c_yaml = yaml.safe_load(f.read())
            return c_yaml.get('disclaimer', '') or ''
    except:
        print("\x1b[31mERROR\x1b[0m: Error getting disclaimer")


def get_languages(config_location):
    with open(config_location) as config:
        c = config.read()
        c_yaml = yaml.safe_load(c)
        d = {}
        if 'en' in c_yaml:
            # this is languages.yaml
            d = c_yaml
            for key, data in d.items():
              data['disclaimer'] = get_disclaimer_from_params(config_location, key)
        else:
            # this is config.yaml
            for l in c_yaml["languages"]:
                d.update({l: c_yaml["languages"][l]})
        return d


def create_glob(files_location, lang, disclaimer="", lang_as_dir=False, ignores=None):
    if ignores is None:
        ignores = []
    print(f'Ignores are: {ignores}')
    all_files = [f for f in glob(files_location + '**/*.md', recursive=True) if
                 all([not os.path.dirname(f).startswith(ignore) for ignore in ignores])]
    if lang == 'en':
        g = [f for f in all_files if len(f.split('.')) == 2]
    else:
        if lang_as_dir:
            g = [f for f in all_files if '.md'.format(lang) in f]
        else:
            g = [f for f in all_files if '.{0}.md'.format(lang) in f]
    return {"name": lang, "glob": g, "disclaimer": disclaimer}


def diff_globs(base, compare, lang_as_dir=False):
    if lang_as_dir:
        return [f for f in base['glob'] if f.replace('/%s/' % base['name'], '/%s/' % compare['name']) not in compare['glob']]
    else:
        return [f for f in base['glob'] if f.replace('.md', '.%s.md' % compare['name']) not in compare['glob']]


def md_update_links(this_lang_code, content):
    """ Update footer links in markdown to be language relative """
    result = content
    try:
        common_lang_codes = ["en/", "es/", "de/", "fr/", "es/", "ja/", "ko/", "resources/"]
        exclude_common_langs = "|".join(list(map(lambda code: f"{code}",common_lang_codes)))
        relative_regex = re.compile("^(\\[[0-9]+]\:\\s*)(\/(?!" + exclude_common_langs + ").*)$", re.MULTILINE | re.IGNORECASE)
        substitute = "\g<1>/" + this_lang_code.lower() + "\g<2>"
        result = relative_regex.sub(substitute, content)
    except Exception as e:
        result = content
        logger.exception("fail to update md links")
    finally:
        return result


def create_placeholder_file(template, new_glob, lang_as_dir, files_location):
    if lang_as_dir:
        content_path = files_location
        sub_path = os.path.dirname(template).replace('content/en', '')
        # add trailing slash if we don't have one and its not an empty string
        sub_path = sub_path if not sub_path or sub_path.endswith('/') else sub_path + '/'
        # remove leading slash if we have one
        sub_path = sub_path[1:] if sub_path.startswith('/') else sub_path
        new_dest = "{content_path}{sub_path}{template}".format(content_path=content_path, sub_path=sub_path, template=ntpath.basename(template))
    else:
        new_dest = os.path.dirname(template) + '/' + ntpath.basename(template).replace('.md', '.%s.md' % new_glob['name'])

    with open(template) as o_file:
        content = o_file.read()
        boundary = re.compile(r'^-{3,}$', re.MULTILINE)
        split = boundary.split(content, 2)
        new_yml = {}
        if len(split) == 3:
            _, fm, content = split
            new_yml = yaml.safe_load(fm)
        elif len(split) == 1:
            content = split[0]
            new_yml = {}
        new_content = content
        if new_yml.get('aliases', None):
            new_aliases = []
            for alias in new_yml.get('aliases'):
                # if alias is relative e.g no leading slash we need to resolve its abs path to be able to prepend /lang/
                # e.g alias 13a-810-14c in security_monitor/default_rules/file.md
                # becomes /ja/security_monitor/default_rules/13a-810-14c/
                if not alias.startswith("/"):
                    alias = f"/{sub_path}{alias}"
                new_aliases.append('/{0}{1}'.format(new_glob['name'], alias))
            new_yml['aliases'] = new_aliases
        if new_glob["disclaimer"]:
            disclaimer = "<div class='alert alert-info'>%s</div>\n\n" % new_glob["disclaimer"]
            new_content = disclaimer + content
            new_yml['placeholder'] = True

        new_content = md_update_links(new_glob['name'], new_content.strip())

        content = TEMPLATE.format(front_matter=yaml.dump(new_yml, default_flow_style=False).strip(),
                                  content=new_content.strip())

    os.makedirs(os.path.dirname(new_dest), exist_ok=True)
    if os.path.exists(new_dest):
        logger.info("overwriting {}".format(new_dest))
    with open(new_dest, 'w') as o_file:
            o_file.write(content)

    return new_dest


def main():
    parser = OptionParser(usage="usage: %prog [options] create placeholder pages for multi-language")
    parser.add_option("-c", "--config_location", help="location of site config")
    parser.add_option("-f", "--files_location", help="location of site content files", default="")
    parser.add_option("-d", "--lang_as_dir", help="use dir lang instead of suffix", default=True)
    parser.add_option("-i", "--ignore", help="paths to ignore", default=["content/en/meta"])

    pool_size = cpu_count()

    (options, args) = parser.parse_args()
    options = vars(options)

    lang = get_languages(options["config_location"])
    default_glob = create_glob(options["files_location"] or "content/en/", DEFAULT_LANGUAGE, lang_as_dir=options["lang_as_dir"], ignores=options["ignore"])
    del lang[DEFAULT_LANGUAGE]
    for l in lang:
        info = lang[l]
        if options["files_location"]:
            files_location = options["files_location"]
        else:
            files_location = info.get('contentDir', 'content/{lang_code}/'.format(lang_code=l))
            files_location = files_location if files_location.endswith('/') else files_location + '/'
        lang_glob = create_glob(files_location=files_location, lang=l, disclaimer=info["disclaimer"], lang_as_dir=options["lang_as_dir"], ignores=options["ignore"])
        diff = diff_globs(base=default_glob, compare=lang_glob, lang_as_dir=options["lang_as_dir"])
        print("\x1b[32mINFO\x1b[0m: building {0} placeholder pages for {1} ".format(len(diff), l))
        with Pool(processes=pool_size) as pool:
            # call the function for each item in parallel
            pool.map(partial(create_placeholder_file, new_glob=lang_glob, lang_as_dir=options["lang_as_dir"], files_location=files_location), diff)


if __name__ == "__main__":
    # if in gitlab we need to exit with failure
    # if in local we skip building the placeholders
    if os.getenv("CI_COMMIT_REF_NAME"):
        main()
    else:
        print('\x1b[32mINFO\x1b[0m: Skipping placeholders locally')
