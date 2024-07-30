#!/usr/bin/env python3
import os
import requests
import tarfile
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
import glob
import shutil
from github_connect import GitHub
from functools import partial
from itertools import chain, groupby
from multiprocessing import cpu_count
from multiprocessing.pool import ThreadPool as Pool
from os import sep, getenv, makedirs
from os.path import isdir, sys, dirname, normpath


def download_from_repo(github_token, org, repo, branch, globs, extract_dir, commit_sha=None):
    """
    Takes github info and file globs and downloads files from github using multiple processes
    :param github_token: A valide Github token to download content with the Github Class
    :param org: github organization or person
    :param repo: github repo name
    :param branch: the branch name
    :param globs: list of strings in glob format of what to extract
    :param extract_dir: Directory in which to put all downloaded content.
    :param commit_sha: sha if we want to provide one
    :return:
    """
    pool_size = cpu_count()

    with GitHub(github_token) as gh:
        listing = gh.list(org, repo, branch, commit_sha, globs)
        dest = "{0}{1}{2}".format(
            extract_dir, repo, sep
        )
        with Pool(processes=pool_size) as pool:
            with requests.Session() as s:
                retries = Retry(
                    total=3,
                    read=3,
                    connect=3,
                    backoff_factor=0.3,
                    status_forcelist=[429],
                    respect_retry_after_header=True
                )
                s.mount('https://', HTTPAdapter(max_retries=retries, pool_connections=10, pool_maxsize=pool_size))
                s.mount('http://', HTTPAdapter(max_retries=retries, pool_connections=10, pool_maxsize=pool_size))
                r = [
                    x
                    for x in pool.imap_unordered(
                        partial(
                            gh.raw,
                            request_session=s,
                            org=org,
                            repo=repo,
                            branch=branch if not commit_sha else commit_sha,
                            dest_dir=dest,
                        ),
                        listing,
                    )
                ]


def download_from_local_repo(local_repo_path, org, repo, branch, globs, extract_dir, commit_sha=None):
    for path_to_file in chain.from_iterable(glob.glob('{}{}{}'.format(local_repo_path, sep, pattern), recursive=True) for pattern in globs):
        dest = "{0}{1}{2}{3}".format(extract_dir, repo, sep, normpath(path_to_file.replace(local_repo_path, '')))
        makedirs(dirname(dest), exist_ok=True)
        shutil.copyfile(path_to_file, dest)


def update_globs(new_path, globs):
    """
    Depending if the repo is local or we downloaded it we need to update the globs to match
    the final version of the repo to use
    :param new_path: new_path to update the globs with
    :param globs: list of globs to update
    """
    new_globs = []
    for item in globs:
        new_globs.append(os.path.join(new_path, item))
    return new_globs


def grouped_globs_table(list_of_contents):
    data = {}
    sorted_list_of_contents = sorted(list_of_contents, key=lambda k: k['repo_name'])
    for key, value in groupby(sorted_list_of_contents, lambda k: k['repo_name']):
        grouped_globs = [x['globs'] for x in value]
        data[key] = list(chain.from_iterable(grouped_globs))
    return data


def download_content_from_external_source(self, content):
    """
    Returns a boolean determining whether pull_config content should be downloaded from cache or external source.
    Content will be pulled from external source if:
        * cache is disabled
        * this is a local run or master pipeline
    """
    return (self.cache_enabled == False) or (getenv('CI_COMMIT_REF_NAME') in (None, 'master'))


def fetch_sourced_content_from_local_or_upstream(self, github_token, extract_dir):
    """
    This goes through the list_of_contents and check for each repo specified in order:
      * [ONLY LOCAL DEV] Check if a locally cloned version is on this developer machine; one level above this documentation repo
      * [ONLY LOCAL DEV] Check if this docs build has already pulled and stored the repos in an extract folder
      * [LOCAL DEV AND CI] If neither of the above exist, pull the remote repo to use and store in the extract folder
    :param github_token: A valide Github token to download content with the Github Class
    :param extract_dir: Directory into which to put all content downloaded.
    """
    grouped_globs = grouped_globs_table(self.list_of_sourced_contents)
    is_in_ci = os.getenv("CI_COMMIT_REF_NAME")

    for content in self.list_of_sourced_contents:
        repo = content["repo_name"]
        print(f'Downloading external content from {repo}...')
        local_repo_path = os.path.join("..", repo)
        repo_path_last_extract = os.path.join(extract_dir, repo)

        if isdir(local_repo_path) and not is_in_ci:
            print(f"\x1b[32mINFO\x1b[0m: Local version of {repo} found in: {local_repo_path}")
            download_from_local_repo(local_repo_path, content["org_name"], repo, content["branch"], grouped_globs.get(repo, content["globs"]),
                                    extract_dir, content.get("sha", None))
            content["globs"] = update_globs(
                "{0}{1}{2}".format(
                    extract_dir,
                    repo,
                    sep,
                ),
                content["globs"],
            )
        elif isdir(repo_path_last_extract) and not is_in_ci:
            print(
                f"\x1b[32mINFO\x1b[0m: Local version of {repo} found from previous extract in:"
                f" {repo_path_last_extract} "
            )
            content["globs"] = update_globs(
                repo_path_last_extract,
                content["globs"],
            )
        elif github_token != "false":
            print(
                f"\x1b[32mINFO\x1b[0m: No local version of {repo} found, downloading content from "
                f"upstream version and placing in: {extract_dir}"
            )
            download_from_repo(github_token,
                            content["org_name"],
                            repo,
                            content["branch"],
                            grouped_globs.get(repo, content["globs"]),
                            extract_dir,
                            content.get("sha", None)
                            )
            content[
                "globs"
            ] = update_globs(
                "{0}{1}{2}".format(
                    extract_dir,
                    repo,
                    sep,
                ),
                content["globs"],
            )
        elif getenv("LOCAL") == 'True':
            print("\x1b[33mWARNING\x1b[0m: No local version of {} found, no GITHUB_TOKEN available. Documentation is now in degraded mode".format(repo))
            content["action"] = "Not Available"
        else:
            print("\x1b[31mERROR\x1b[0m: No local version of {} found, no GITHUB_TOKEN available.".format(repo))
            raise ValueError


def extract_sourced_and_cached_content_from_pull_config(self, configuration):
    """
    This pulls the content from the configuration file at `configuration` location
    then parses it to determine whether content should be downloaded from external source
    or cache, and populates the associated class property to be processed later.
    :param configuration: Documentation build configuration file path.
    """
    pull_config_content = configuration[1].get('data', {})

    for org in pull_config_content:
        for repo in org["repos"]:
            for content in repo["contents"]:
                if download_content_from_external_source(self, content):
                    content_temp = {}
                    content_temp["org_name"] = org[
                        "org_name"
                    ]
                    content_temp["repo_name"] = repo[
                        "repo_name"
                    ]
                    content_temp["branch"] = content[
                        "branch"
                    ]
                    content_temp["sha"] = content.get("sha", None)
                    content_temp["action"] = content[
                        "action"
                    ]
                    content_temp["globs"] = content["globs"]

                    if content["action"] in ("pull-and-push-folder", "pull-and-push-file", "security-rules", "compliance-rules", "workflows", "marketplace-integrations"):
                        content_temp["options"] = content["options"]

                    self.list_of_sourced_contents.append(content_temp)
                else:
                    output_content = content.get('options', {}).get('output_content', True)

                    if output_content != False:
                        self.list_of_cached_contents.append(content)


def prepare_content(self, configuration, github_token, extract_dir):
    """
    Prepares the content for the documentation build. It checks for all content whether or
    not it's available locally or if it should be downloaded.
    :param configuration: Documentation build configuration file path.
    :param github_token: A valide Github token to download content with the Github Class
    :param extract_dir: Directory into which to put all content downloaded.
    """
    try:
        extract_sourced_and_cached_content_from_pull_config(self, configuration)
        fetch_sourced_content_from_local_or_upstream(self, github_token, extract_dir)
    except Exception as e:
        if not getenv("CI_COMMIT_REF_NAME"):
            print(f"\x1b[33mWARNING\x1b[0m: Downloading files failed, documentation is now in degraded mode. {e}")
        else:
            print("\x1b[31mERROR\x1b[0m: Downloading files failed, stopping build.")
            sys.exit(1)


def download_and_extract_cached_files_from_s3():
    s3_url = f'https://origin-static-assets.s3.amazonaws.com/build_artifacts/master/latest-cached.tar.gz'
    r = requests.get(s3_url)
    with open('./latest-cached.tar.gz', 'wb') as f:
        f.write(r.content)
    with tarfile.open("./latest-cached.tar.gz", "r:gz") as artifact_tarfile:
        artifact_tarfile.extractall('temp')


def download_cached_content_into_repo(self):
    download_and_extract_cached_files_from_s3()

    for content in self.list_of_cached_contents:
        action = content.get('action', '')
        final_file_destination = ''

        if action == 'pull-and-push-file':
            destination_path = content.get('options', {}).get('dest_path')
            destination_base_path = content.get('options', {}).get('base_path')
            destination_file_name = content.get('options', {}).get('file_name')

            # we need this solution for single-sourced files that don't belong under content/ dir
            # please use base_path = '' under options in pull_config for these cases.
            if destination_base_path is not None and destination_base_path == '':
                destination_path = destination_path.lstrip('/')
                full_dest_path = f'{destination_path}{destination_file_name}'
            else:
                full_dest_path = f'{self.relative_en_content_path}{destination_path}{destination_file_name}'

            if destination_file_name.endswith('.md'):
                print(f'Copying {full_dest_path} from cache')
                os.makedirs(os.path.dirname(full_dest_path), exist_ok=True)
                shutil.copy(f'temp/{full_dest_path}', full_dest_path)
        elif action == 'pull-and-push-folder':
            final_file_destination = content.get('options', {}).get('dest_dir', '')
        elif action in ('workflows', 'security-rules'):
            final_file_destination = content.get('options', {}).get('dest_path', '')
        elif action not in ('integrations', 'marketplace-integrations', 'npm-integrations'):
            raise ValueError(f'Action {action} unsupported, cannot copy from cache.')

        if final_file_destination != '':
            print(f'Copying {self.relative_en_content_path}{final_file_destination} from cache')
            shutil.copytree(f'temp/{self.relative_en_content_path}{final_file_destination}', f'{self.relative_en_content_path}{final_file_destination}', dirs_exist_ok=True)

    # Integrations are handled separately for now (there is active work underway to improve this)
    if self.cache_enabled:
        print('Copying integrations from cache...')

        for integration in self.apw_integrations:
            cache_path = f"temp/content/en/integrations/{integration}.md"

            if os.path.isfile(cache_path):
                print(f'ignoring APW integrations: {cache_path}')
                os.remove(cache_path)

        shutil.copytree(f'temp/{self.relative_en_content_path}/integrations', f'{self.relative_en_content_path}/integrations', dirs_exist_ok=True)

        # Copying generated data files
        if os.path.isdir('temp/data'):
            print('Copying generated data from cache...')
            shutil.copytree('temp/data', 'data', dirs_exist_ok=True)

    # Cleanup temporary dir after cache download complete
    if os.path.isdir('temp'):
        shutil.rmtree('temp')
