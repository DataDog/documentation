#!/usr/bin/env python3

import fnmatch
import requests
import pickle

from functools import wraps
from os import makedirs
from os.path import (
    exists,
    dirname
)


def cache_by_sha(func):
    """ only downloads fresh file, if we don't have one or we do and the sha has changed """

    @wraps(func)
    def cached_func(*args, **kwargs):
        cache = {}
        list_item = args[1]
        dest_dir = kwargs.get("dest_dir")
        path_to_file = list_item.get("path", "")
        file_out = "{}{}".format(dest_dir, path_to_file)
        p_file_out = "{}{}.pickle".format(
            dest_dir, path_to_file
        )
        makedirs(dirname(file_out), exist_ok=True)
        if exists(p_file_out) and exists(file_out):
            with open(p_file_out, "rb") as pf:
                cache = pickle.load(pf)
        cache_sha = cache.get("sha", False)
        input_sha = list_item.get("sha", False)
        if (cache_sha and input_sha and cache_sha == input_sha):
            # do nothing as we have the up to date file already
            return None
        else:
            with open(p_file_out, mode="wb+") as pf:
                pickle.dump(
                    list_item, pf, pickle.HIGHEST_PROTOCOL
                )
            return func(*args, **kwargs)

    return cached_func


class GitHub:
    """ Class to handle Github connections and download content"""

    def __init__(self, token=None):
        self.token = token

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False

    def headers(self):
        return (
            {"Authorization": "token {}".format(self.token)}
            if self.token
            else {}
        )

    def extract(self, data):
        out = []
        for item in data.get("tree", []):
            out.append(
                {
                    "path": item.get("path", ""),
                    "url": item.get("url", ""),
                    "type": item.get("type", ""),
                    "sha": item.get("sha", ""),
                }
            )
            if item.get("tree", None):
                out.append(self.extract(item.get("tree")))
        return out

    def list(self, org, repo, branch, commit_sha=None, globs=None):
        globs = [] if globs is None else globs
        listing = []
        headers = self.headers()
        if commit_sha:
            print(
                "\x1b[32mINFO\x1b[0m: Using configured sha {} from {}/{}..".format(
                    commit_sha, repo, branch
                )
            )
            tree_response = requests.get(
                "https://api.github.com/repos/{0}/{1}/git/trees/{2}?recursive=1".format(
                    org, repo, commit_sha
                ),
                headers=headers,
            )
            if tree_response.status_code == 200:
                listing = self.extract(
                    tree_response.json()
                )
        else:
            print(
                "\x1b[32mINFO\x1b[0m: Getting latest sha from {}/{}..".format(
                    repo, branch
                )
            )
            # get the latest sha
            url = "https://api.github.com/repos/{0}/{1}/git/refs/heads/{2}".format(
                org, repo, branch
            )
            sha_response = requests.get(url, headers=headers)
            if sha_response.status_code == requests.codes.ok:
                sha = (
                    sha_response.json()
                    .get("object", {})
                    .get("sha", None)
                )
                if sha:
                    print(
                        "\x1b[32mINFO\x1b[0m: Getting tree from {}/{} @ {}".format(
                            repo, branch, sha
                        )
                    )
                    tree_response = requests.get(
                        "https://api.github.com/repos/{0}/{1}/git/trees/{2}?recursive=1".format(
                            org, repo, sha
                        ),
                        headers=headers,
                    )
                    if tree_response.status_code == 200:
                        listing = self.extract(
                            tree_response.json()
                        )
            else:
                msg = sha_response.json().get('message', '') or sha_response.text
                print(
                    "\x1b[33mWARNING\x1b[0m: Could not get latest sha from {}/{} response {}, {}..".format(
                        repo, branch, sha_response.status_code, msg
                    )
                )

        if globs:
            filtered_listing = []
            for item in listing:
                path = item.get("path", "")
                for glob_string in globs:
                    if fnmatch.fnmatch(path, glob_string):
                        filtered_listing.append(item)
            return filtered_listing
        else:
            return listing

    @cache_by_sha
    def raw(
        self,
        list_item,
        request_session,
        org,
        repo,
        branch,
        dest_dir,
    ):
        headers = self.headers()
        path_to_file = list_item.get("path", "")
        file_out = "{}{}".format(dest_dir, path_to_file)
        raw_response = request_session.get(
            "https://raw.githubusercontent.com/{0}/{1}/{2}/{3}".format(
                org, repo, branch, path_to_file
            ),
            headers=headers,
        )
        if raw_response.status_code == requests.codes.ok:
            makedirs(dirname(file_out), exist_ok=True)
            with open(file_out, mode="wb+") as f:
                f.write(raw_response.content)
