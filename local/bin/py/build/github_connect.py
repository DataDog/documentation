#!/usr/bin/env python3

import fnmatch
import requests
import pickle
import time

from functools import wraps
from os import makedirs
from os.path import (
    exists,
    dirname
)


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
        cb = int(time.time())
        url = "https://raw.githubusercontent.com/{0}/{1}/{2}/{3}?cb={4}".format(
            org, repo, branch, path_to_file, cb
        )
        raw_response = request_session.get(
            url,
            headers=headers,
        )
        if url == f"https://raw.githubusercontent.com/DataDog/integrations-extras/master/firefly/manifest.json?cb={cb}":
            print(url)
            print(raw_response.status_code)
            print(raw_response.content)
        if raw_response.status_code == requests.codes.ok:
            makedirs(dirname(file_out), exist_ok=True)
            with open(file_out, mode="wb+") as f:
                f.write(raw_response.content)
        else:
            print(f"\x1b[33mWARNING\x1b[0m: Github request returned an unexpected response {raw_response.status_code} {raw_response.reason} for {path_to_file}")
