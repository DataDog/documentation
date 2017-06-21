#!/usr/bin/env python3

from functools import partial
import hashlib
import multiprocessing
import os
import re

STATICS = ['img', 'pdf', 'scripts', 'styles']
VALID_REFILES = ['.html', '.xml', '.css', '.js', '.txt', '.md']
SRC_FOLDERS = ['layouts']
STATICS_ROOT = ['static/css', 'static/js']


def version_files():
    current_dir = os.getcwd()
    all_files = []
    all_statics = []
    all_rstatics = []

    # create map of static assets
    for d in STATICS_ROOT:
        for root, dirs, files in os.walk(os.path.join(current_dir, d.strip())):
            files = [f for f in files if not f[0] == '.']
            dirs[:] = [d for d in dirs if not d[0] == '.']
            for f in files:
                all_statics.append(f)
                f_split = os.path.splitext(f)
                new_name = f_split[0] + "-" + md5(os.path.join(root, f)) + f_split[1]
                all_rstatics.append(new_name)
                os.rename(os.path.join(root, f), os.path.join(root, new_name))

    # create a list of searchable files for the multiprocessor to chew on
    for folder in SRC_FOLDERS:
        root_dir = os.path.join(current_dir, folder)
        for root, dirs, files in os.walk(root_dir):
            files = [f for f in files if not f[0] == '.']
            dirs[:] = [d for d in dirs if not d[0] == '.']
            all_files += [os.path.join(root, f) for f in files if os.path.splitext(f)[1] in VALID_REFILES]

    # run replacer for all files in the list
    replacer = partial(replace_file_refs, statics=all_statics, rstatics=all_rstatics)
    print('Replacing references to [%s]' % str(all_statics))
    print('with [%s]' % str(all_rstatics))
    with multiprocessing.Pool(2) as pool:
        pool.map(replacer, all_files)


def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()[0:7]


def replace_file_refs(file, statics, rstatics):

    with open(file, encoding='utf-8') as o_file:
        og_content = o_file.read()

    n_content = og_content
    for index, item in enumerate(statics):
        n_content = re.sub(statics[index], rstatics[index], n_content)

    if n_content != og_content:
        with open(file, 'w', encoding='utf-8') as o_file:
            print('rewritin: %s' % o_file.name)
            o_file.write(n_content)


if __name__ == "__main__":
    version_files()
