#!/usr/bin/env python3

"""Check multiple types of links on a compiled website
Meant to run from cli.
Example:
    test_links.py "images" -s "public" -p 6 -f "monitoring-in-the-cloud-ebook.md"
"""
from itertools import chain
import multiprocessing
from optparse import OptionParser
import os
import re
import sys

from bs4 import BeautifulSoup
import cssutils
import requests


class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    ERROR = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


class LinkChecker(object):
    """
    base class for the link checker. very check type should be its own class.
    :param src_path (string): path to dir to crawl looking for links
    :param files (list) (optional): list of files to crawl in the src_path
    :param processes (int): number of processes to run
    """

    STATIC_REG = '(\.)(js|css|pdf|txt|log|png|jpe?g|gif|ico)'

    def __init__(self, src_path, files, processes, domain, static_domain, check_all, verbose, external, timeout,
                 ignore):
        self.src_path = src_path
        self.files = files.split()
        self.processes = int(processes)
        self.domain = domain
        self.static_domain = static_domain
        self.check_all = True if check_all == "True" else False
        self.sample_count = 40
        self.verbose = True if verbose == "True" else False
        self.external = True if external == "True" else False
        self.timeout = int(timeout)
        self.internal_domain_regex = 'localhost:1313|%s' % self.domain
        self.ignore = ignore
        print('pool: {0}\non: {1}\ndomain: {1}\ncheck_all: {3}'.format(
            self.processes,
            self.src_path,
            self.domain,
            self.check_all)
        )

    @staticmethod
    def parse_page(page_path):
        """
        :param page_path: path to page that will be read and parsed with beautifulSoup
        :return: BeautifulSoup object
        """
        try:
            with open(page_path, encoding='utf-8') as page:
                page_content = page.read()
            return BeautifulSoup(page_content, "html.parser")
        except Exception as e:
            print(page_path)
            print(e)
            exit(1)

    def check_page(self, page_path):
        """
        checks a page for links
        :param page_path: path to page
        :return: list of links on a page
        """
        return []

    def validate_link(self, link):
        """
        optional rules that define valid links for checking
        :param link:
        :return:
        """
        return False

    def format_link(self, link):
        """
        make sure link is in a valid format
        :param link: the link to validate (string)
        :return: validated link (string)
        """
        if link.startswith('//'):
            link = 'https:' + link
        if link.startswith('/'):
            link = self.domain + link.lstrip('/')
        if 'http' not in link:
            link = self.domain + link.lstrip('/')
        return link

    def check_link(self, link):
        """
        sends a request to the link source and returns result of query
        :param link: string of link to check
        :return: If link is valid: None. Else returns the link which gets appended to a list of failed links
        """
        link = self.format_link(link)
        # if self.verbose:
        #     print('CHECKING: %s' % link)
        if link:
            try:
                requests.packages.urllib3.disable_warnings()
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
                    'Range': 'bytes=0-10'
                }
                response = requests.get(link.strip(), allow_redirects=True, headers=headers, timeout=self.timeout)
                if int(response.status_code) not in [200, 206, 405, 422, 999]:
                    if re.search(self.internal_domain_regex, link) or re.search(LinkChecker.STATIC_REG, link):
                        print('{0}ERROR: {1} {2}'.format(Colors.ERROR, response.status_code, repr(link), Colors.ENDC))
                        return self.register_bad_link(link, 'error')
                    else:
                        print('{0}WARN: {1} {2}'.format(Colors.WARNING, response.status_code, repr(link), Colors.ENDC))
                        return self.register_bad_link(link, 'warn')
            except requests.RequestException as e:
                if 'timed out' in e.__str__():
                    print('{0}WARN: {1} timed out{2}'.format(Colors.WARNING, repr(link), Colors.ENDC))
                else:
                    if re.search(self.internal_domain_regex, link) or re.search(LinkChecker.STATIC_REG, link):
                        print('{0}ERROR: {1} {2}'.format(Colors.ERROR, 500, repr(link), Colors.ENDC))
                        return self.register_bad_link(link, 'error')
                    else:
                        print('{0}WARN: {1} {2}'.format(Colors.ERROR, 500, repr(link), Colors.ENDC))
                        return self.register_bad_link(link, 'warn')

    def register_bad_link(self, bad_link, l_type):
        return bad_link, l_type

    def crawl_site(self):
        """
        walks the source path first building a set of links to check. then checks them.
        :return: sum of failed links
        """

        if self.verbose:
            for f in list(self.files):
                print('FOUND: %s' % f)

        # get links
        with multiprocessing.Pool(self.processes) as page_pool:
            check_list = page_pool.map(self.check_page, self.files)

        check_list = list(set(chain.from_iterable(check_list)))

        # now we have a set of urls to check
        with multiprocessing.Pool(self.processes) as link_pool:
            link_prob_list = link_pool.map(self.check_link, check_list)

        return [l for l in link_prob_list if l]  # joined lists


class ImageCheck(LinkChecker):
    """
    Image checker. Will match on png, jpg, jpeg, and gif. Update the img regex to allow more.
    """

    def check_page(self, page_path):
        """
        checks a page for links
        :param page_path: path to page
        :return: list of links on a page
        """
        if self.verbose:
            print('Pulling links from: %s' % page_path)
        s_content = LinkChecker.parse_page(page_path)
        # check img tags
        img_links = s_content.find_all('img', class_=lambda x: x != 'no-check', src=True)
        img_links = [img['src'] for img in img_links]

        # check css backgrounds
        e_style = s_content.find_all(
            lambda tag: len(tag.attrs) and 'style' in tag.attrs and 'url' in tag['style'])
        for element in e_style:
            style = cssutils.parseStyle(element['style'])
            if (style['background-image'] or style['background']) \
                    and (re.search(r'(png|jpg|jpe?g|gif)', style.cssText, flags=re.IGNORECASE)):
                bgi = style['background-image'] if style['background-image'] \
                    else style['background']
                bgi = re.sub(r'(.*?\(\'*\"*)(.*?\.)(png|jpg|jpe?g|gif)(.*?\'*\"*\))',
                             r'\2\3', bgi, flags=re.I)
                bgi = re.sub(r'(.*?\.png|gif|jpe?g)(.*)', r'\1', bgi, flags=re.I)
                img_links.append(bgi)
        return img_links


class AnchorCheck(LinkChecker):
    def check_page(self, page_path):
        """
        checks a page for links
        :param page_path: path to page
        :return: list of links on a page
        """
        s_content = LinkChecker.parse_page(page_path)
        missing_ids = []
        # check anchor tags whose href starts with #
        anc_links = s_content.select('a[href^="#"]')
        anc_links = [anc['href'] for anc in anc_links if len(anc['href']) > 1]

        # check if no id for the given anchor exists
        for anc in anc_links:
            a_id = s_content.find_all(id=anc.strip('#'))
            if not a_id and '%s, %s' % (page_path, anc) not in missing_ids:
                missing_ids.append('%s, %s' % (page_path, anc))

        return missing_ids


class StaticCheck(LinkChecker):
    def check_page(self, page_path):
        """
        checks a page for links. validates <script>, and <link> tags
        :param page_path: path to page
        :return: list of links on a page
        """
        if self.verbose:
            print('Pulling links from: %s' % page_path)
        # js links
        js_links = LinkChecker.parse_page(page_path).find_all('script', class_=lambda x: x != 'no-check', src=True)
        js_links = [js['src'] for js in js_links]
        # css links
        link_tags = LinkChecker.parse_page(page_path).find_all('link')
        link_tags = [link_tag['href'] for link_tag in link_tags if "stylesheet" in link_tag.get("rel", [])]
        return js_links + link_tags


class LinkCheck(LinkChecker):
    def validate_link(self, link):
        """
        rules that define valid links for checking
        :param link:
        :return:
        """
        try:

            # anchor links
            if link.startswith('#'):
                return False

            # sometimes img refs are put into href="" for modal ref
            if re.search(r'\.png|\.jpe?g|\.gif', link):
                return False

            # if external flag is not set then filter out external links
            if not self.external and self.domain not in link and self.static_domain not in link:
                return False

            # other no-no links
            with open(self.ignore) as ignore_links:
                nope_list = ignore_links.read().splitlines()
            is_valid = not any([pattern in link for pattern in nope_list])
            return is_valid
        except TypeError:  # we expect link to be a string, if it is not then bail
            pass

    def check_page(self, page_path):
        """
        checks a page for links. validates <a>, <script>, and <link> tags
        :param page_path: path to page
        :return: list of links on a page
        """
        anc_links = LinkChecker.parse_page(page_path).find_all('a', class_=lambda x: x != 'no-check', href=True)
        anc_links = [anc['href'] for anc in anc_links if self.validate_link(anc.get('href'))]

        return anc_links


def main():
    """Check multiple types of links on a compiled website
    Meant to run from cli.
    Example:
            test_links.py "images" -s "public" -p 6 -f "monitoring-in-the-cloud-ebook.md"
    :return exit 0, exit 1
    """
    link_types = {
        'images': ImageCheck,
        'links': LinkCheck,
        'anchors': AnchorCheck,
        'static': StaticCheck
    }

    parser = OptionParser(usage="usage: %prog [options] link_type")
    parser.add_option("-s", "--src_path", help="location of the source you want to crawl",
                      default=os.getcwd() + '/public')
    parser.add_option("-f", "--files", help="list of files to crawl", default="")
    parser.add_option("-p", "--processes", help="number of process to consume the pool",
                      default=multiprocessing.cpu_count() - 1)
    parser.add_option("-d", "--domain",
                      help="domain for the site; used for distinguishing between internal and external links",
                      default="")
    parser.add_option("-t", "--static_domain", help="domain for static assets")
    parser.add_option("-a", "--check_all", help="check all links. default is false (just sample)")
    parser.add_option("-v", "--verbose", help="print all messages")
    parser.add_option("-e", "--external", help="check external links")
    parser.add_option("-T", "--timeout", help="seconds to try link for", default=1)
    parser.add_option("-i", "--ignore", help="path to links.ignore", default="")

    (options, args) = parser.parse_args()

    if len(args) != 1:
        parser.error("please specify one of the following link types: %s" % link_types.keys())

    crawler = link_types.get(args[0])(**vars(options))
    alert_list = crawler.crawl_site()
    errors = [l for l in alert_list if l[1] == 'error']
    warnings = [l for l in alert_list if l[1] == 'warn']

    with open('/tmp/warn_links', 'w') as error_log:
        for link in warnings:
            error_log.write("{0}\n".format(link[0]))

    if errors:
        print('Please fix the following broken %s and try again.\n %s' % (args[0], errors))
        sys.exit(1)
    else:
        print('{0}OK. No broken {1} found{2}'.format(Colors.OKBLUE, args[0], Colors.ENDC))
        sys.exit(0)


if __name__ == "__main__":
    main()
