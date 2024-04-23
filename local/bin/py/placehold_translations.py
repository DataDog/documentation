#!/usr/bin/env python3
import ntpath
import os
import re
import argparse
from glob import glob
from shutil import copyfile
from functools import partial
from multiprocessing import cpu_count
from multiprocessing.pool import Pool
import logging

import yaml

DEFAULT_LANGUAGE = "en"
TEMPLATE = """\
---
{front_matter}
---

{content}
"""


def get_disclaimer_from_params(config_location, key):
    try:
        with open('{0}/params.{1}.yaml'.format(os.path.dirname(config_location), key)) as f:
            c_yaml = yaml.safe_load(f.read())
            return c_yaml.get('disclaimer', '') or ''
    except:
        logging.error("Error getting disclaimer")


def get_languages(config_location):
    with open(config_location) as config:
        c = config.read()
        c_yaml = yaml.safe_load(c)
        d = {}
        if 'en' in c_yaml:
            # this is languages.yaml
            d = c_yaml
            # uncomment this when we move disclaimer to params.yaml files like docs
            # for key, data in d.items():
            #    data['disclaimer'] = get_disclaimer_from_params(config_location, key)
        else:
            # this is config.yaml
            for l in c_yaml["languages"]:
                d.update({l: c_yaml["languages"][l]})
        return d


def create_glob(files_location, lang, disclaimer="", lang_as_dir=False, ignores=None):
    if ignores is None:
        ignores = []
    logging.info(f'Ignores are: {ignores}')
    all_files = [f for f in glob(files_location + '**/*.md', recursive=True) if all([not os.path.dirname(f).startswith(ignore) for ignore in ignores])]
    if lang == 'en':
        g = [f for f in all_files if len(f.split('.')) == 2]
    else:
        if lang_as_dir:
            g = [f for f in all_files if '.md'.format(lang) in f]
        else:
            g = [f for f in all_files if '.{0}.md'.format(lang) in f]
    return {"name": lang, "glob": g, "disclaimer": disclaimer}


def create_data_glob(data_location, lang, disclaimer="", lang_as_dir=False, ignores=None):
    if ignores is None:
        ignores = []
    location = data_location if data_location.endswith(os.path.sep) else '{}{}'.format(data_location, os.path.sep)
    location += lang + os.path.sep
    all_files = [f for f in glob(location + '**/*.yaml', recursive=True) if all([not os.path.dirname(f).startswith(ignore) for ignore in ignores])]
    if lang == 'en':
        g = [f for f in all_files if len(f.split('.')) == 2]
    else:
        if lang_as_dir:
            g = [f for f in all_files if '.yaml'.format(lang) in f]
        else:
            g = [f for f in all_files if '.{0}.yaml'.format(lang) in f]
    return {"name": lang, "glob": g, "disclaimer": disclaimer}


def diff_globs(base, compare, lang_as_dir=False):
    if lang_as_dir:
        return [f for f in base['glob'] if
                f.replace('/%s/' % base['name'], '/%s/' % compare['name']) not in compare['glob']]
    else:
        return [f for f in base['glob'] if f.replace('.md', '.%s.md' % compare['name']) not in compare['glob']]


def diff_data_globs(base, compare, lang_as_dir=False):
    if lang_as_dir:
        return [f for f in base['glob'] if
                f.replace('/%s/' % base['name'], '/%s/' % compare['name']) not in compare['glob']]
    else:
        return [f for f in base['glob'] if f.replace('.yaml', '.%s.yaml' % compare['name']) not in compare['glob']]


def create_placeholder_file(template, new_glob, lang_as_dir, files_location):
    if lang_as_dir:
        content_path = files_location
        sub_path = os.path.dirname(template).replace('content/en', '')
        # add trailing slash if we don't have one and its not an empty string
        sub_path = sub_path if not sub_path or sub_path.endswith('/') else sub_path + '/'
        # remove leading slash if we have one
        sub_path = sub_path[1:] if sub_path.startswith('/') else sub_path
        new_dest = "{content_path}{sub_path}{template}".format(content_path=content_path, sub_path=sub_path,
                                                               template=ntpath.basename(template))
    else:
        new_dest = os.path.dirname(template) + '/' + ntpath.basename(template).replace('.md',
                                                                                       '.%s.md' % new_glob['name'])

    with open(template) as o_file:
        content = o_file.read()
        boundary = re.compile(r'^-{3,}\s*$', re.MULTILINE)
        # U+FEFF is the Byte Order Mark character, which should only occur at the start of a document.
        content = content.replace(u'\ufeff', '').strip()
        split = boundary.split(content, 2)
        new_yml = {}
        split_len = len(split)
        if split_len == 3:
            _, fm, content = split
            try:
                new_yml = yaml.safe_load(fm)
            except yaml.scanner.ScannerError as e:
                new_yml = {}
                logging.error("Something went wrong while parsing yaml in {}".format(template))
                logging.error(e)
        elif split_len == 1:
            content = split[0]
            new_yml = {}
        elif split_len == 2:
            fm, content = split
            try:
                new_yml = yaml.safe_load(fm)
            except yaml.scanner.ScannerError as e:
                new_yml = {}
                logging.error("Something went wrong while parsing yaml in {}".format(template))
                logging.error(e)
        new_content = content
        if not new_yml:
            new_yml = {}
            logging.warning("new_yml was none for {}".format(template))
        if new_yml.get('aliases', None):
            new_aliases = []
            for alias in new_yml.get('aliases'):
                new_aliases.append('/{0}{1}'.format(new_glob['name'], alias))
            new_yml['aliases'] = new_aliases
        if new_yml.get('url', None):
            new_yml['url'] = '/{0}/{1}'.format(new_glob['name'], new_yml['url'].strip("/"))
        if new_glob["disclaimer"]:
            # disclaimer = "<div class='alert alert-info'>%s</div>\n\n" % new_glob["disclaimer"]
            new_content = content
            new_yml['placeholder'] = True
            new_yml['noindex'] = True
            new_yml['disclaimer'] = "%s" % new_glob["disclaimer"]
        content = TEMPLATE.format(front_matter=yaml.dump(new_yml, default_flow_style=False).strip(),
                                  content=new_content.strip())

    os.makedirs(os.path.dirname(new_dest), exist_ok=True)
    if os.path.exists(new_dest):
        logging.info("overwriting {}".format(new_dest))
    with open(new_dest, 'w') as o_file:
        o_file.write(content)
        logging.info("creating placeholder for {0} at {1}".format(template, new_dest))

    return new_dest


def create_data_placeholder_file(template, new_glob, lang_as_dir, files_location):
    src = template
    dst = src.replace('/en/', '/{}/'.format(new_glob['name']))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if not os.path.exists(dst):
        logging.info("creating data placeholder for {0} at {1}".format(src, dst))
        copyfile(src, dst)
    else:
        logging.info('data file {0} exists skipping'.format(dst))


def main():
    print("Starting placeholder creation for translations")
    
    # Set up logger
    root_dir = os.path.abspath(os.sep)
    log_dir = os.path.join(root_dir, 'logs')
    os.makedirs(log_dir, exist_ok=True)
    log_file = os.path.join(log_dir, 'translations-logs.txt')
    # print path for CI
    log_file = os.path.join(log_dir, 'translations-logs.txt')
    print("Log file path:", log_file)

    logging.basicConfig(
        level=logging.WARNING,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(log_file),
            logging.StreamHandler()
        ]
    )
    
    parser = argparse.ArgumentParser(usage="usage: %prog [options] create placeholder pages for multi-language")
    parser.add_argument("-c", "--config_location", help="location of site config")
    parser.add_argument("-f", "--files_location", help="location of site content files", default="")
    parser.add_argument("-d", "--data_location", help="location of site data files", default="")
    parser.add_argument("-l", "--lang_as_dir", help="use dir lang instead of suffix", default=True)
    parser.add_argument("-i", "--ignore", help="paths to ignore", type=str, nargs="+", default=[])

    pool_size = cpu_count()

    args = parser.parse_args()
    options = vars(args)

    lang = get_languages(options["config_location"])
    default_glob = create_glob(options["files_location"] or "content/en/", DEFAULT_LANGUAGE,
                               lang_as_dir=options["lang_as_dir"], ignores=options["ignore"])
    default_data_glob = create_data_glob(options["data_location"] or "data/", DEFAULT_LANGUAGE,
                                         lang_as_dir=options["lang_as_dir"], ignores=options["ignore"])
    default_content_resources_glob = create_data_glob("content/", DEFAULT_LANGUAGE,
                               lang_as_dir=options["lang_as_dir"], ignores=options["ignore"])
    del lang[DEFAULT_LANGUAGE]
    for l in lang:
        info = lang[l].get("params")
        if info.get("fullTranslation", False) or False:
            if options["files_location"]:
                files_location = options["files_location"]
            else:
                files_location = info.get('contentDir', 'content/{}/'.format(l))
                files_location = files_location if files_location.endswith('/') else files_location + '/'
            # markdown
            # lang_glob = create_glob(files_location=options["files_location"], lang=l, disclaimer=info.get("disclaimer", ""))
            lang_glob = create_glob(files_location=files_location, lang=l, disclaimer=info["disclaimer"],
                                    lang_as_dir=options["lang_as_dir"])
            diff = diff_globs(base=default_glob, compare=lang_glob, lang_as_dir=options["lang_as_dir"])
            logging.info("building {0} placeholder pages for {1} ".format(len(diff), l))
            with Pool(processes=pool_size) as pool:
                # call the function for each item in parallel
                pool.map(partial(create_placeholder_file, new_glob=lang_glob, lang_as_dir=options["lang_as_dir"],
                                        files_location=files_location), diff)

            # content page resources e.g content/en/product/apm/pricing.yaml
            lang_content_resources_glob = create_data_glob(data_location=files_location, lang=l, disclaimer=info.get("disclaimer", ""))
            content_resources_diff = diff_data_globs(base=default_content_resources_glob, compare=lang_content_resources_glob, lang_as_dir=options["lang_as_dir"])
            logging.info("building {0} placeholder page resource files for {1} ".format(len(content_resources_diff), l))
            with Pool(processes=pool_size) as pool:
                pool.map(partial(create_data_placeholder_file, new_glob=lang_content_resources_glob, lang_as_dir=options["lang_as_dir"], files_location=files_location), content_resources_diff)

            # data
            lang_data_glob = create_data_glob(data_location=options["data_location"], lang=l,
                                              disclaimer=info.get("disclaimer", ""))
            data_diff = diff_data_globs(base=default_data_glob, compare=lang_data_glob, lang_as_dir=options["lang_as_dir"])
            logging.info("building {0} placeholder data files for {1} ".format(len(data_diff), l))
            with Pool(processes=pool_size) as pool:
                pool.map(partial(create_data_placeholder_file, new_glob=lang_data_glob, lang_as_dir=options["lang_as_dir"], files_location=files_location), data_diff)
        else:
            logging.info("skipping {0} as fullTranslation set to false".format(l))
    print('Placeholder creation complete')


if __name__ == "__main__":
    main()
