#!/usr/bin/env python3
import multiprocessing
from optparse import OptionParser

import htmlmin


def minify_page(page):
    with open(page, encoding='utf-8') as o_file:
        old_html = o_file.read()

    new_html = htmlmin.minify(old_html, remove_empty_space=True, remove_comments=True)

    with open(page, 'w', encoding='utf-8') as o_file:
        o_file.write(new_html)


def minify_html(file_list):
    print('minifying html...')
    with multiprocessing.Pool(4) as pool:
        pool.map(minify_page, file_list)


def main():
    parser = OptionParser(usage="usage: %prog [options] link_type")

    (options, args) = parser.parse_args()

    if len(args) != 1:
        parser.error("please provide a list of files to minimize")

    minify_html(args[0].split())

if __name__ == "__main__":
    main()
