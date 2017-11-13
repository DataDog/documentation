#!/usr/bin/env python3
import glob
import itertools
import os
from bs4 import BeautifulSoup
from urllib.parse import urlparse


def main():
    local_url = 'http://localhost:1313/ja/'
    # all image links
    all_img_links = []
    patterns = ['./src/images/**/*.jpg', './src/images/**/*.png', './src/images/**/*.jpeg', './src/images/**/*.gif']
    for file_name in itertools.chain.from_iterable(glob.glob(pattern, recursive=True) for pattern in patterns):
        all_img_links.append(file_name)
    all_img_links = set(all_img_links)
    print('{} total images'.format(len(all_img_links)))

    # used images from html
    used_img_links = []
    for html_file in glob.glob('./public/**/*.html', recursive=True):
        with open(html_file, encoding='utf-8') as page:
            page_content = page.read()
            soup = BeautifulSoup(page_content, "html.parser")
            links = []
            for img in soup.find_all('img'):
                src, ext = os.path.splitext(img['src'])
                src = src.replace(local_url, './src/')
                img_no_fingerprint = '-'.join(src.split('-')[:-1]) + ext
                u = urlparse(img_no_fingerprint)
                img_no_fingerprint = img_no_fingerprint.replace('?' + u.query, '') if '?' in img_no_fingerprint else img_no_fingerprint
                links.append(img_no_fingerprint)
            used_img_links.extend(links)
    used_img_links = set(used_img_links)
    print('{} used images'.format(len(used_img_links)))

    # images to delete
    remove_img_links = all_img_links.difference(used_img_links)
    print('{} images we can remove'.format(len(remove_img_links)))

    for img in remove_img_links:
        print('removing {}'.format(img))
        os.remove(img)


if __name__ == '__main__':
    main()
