#!/usr/bin/env python3
import os
import argparse
from sys import exit

from github import Github, GithubIntegration


DEFAULT_OWNER = "DataDog"
DEFAULT_REPO = "datadog-api-spec"
DEFAULT_BUILD_CONTEXT = "documentation/build"
DEFAULT_STATUS = "success"
DEFAULT_DESCRIPTION = "Documentation build status."
DEFAULT_PR_ID = os.getenv("CI_COMMIT_BRANCH", "").split("/")[-1]
DEFAULT_APP_ID = os.getenv("DATADOG_API_SPEC_PIPELINE_GITHUB_APP_ID")
DEFAULT_APP_KEY = os.getenv("DATADOG_API_SPEC_PIPELINE_GITHUB_APP_PRIVATE_KEY")


parser = argparse.ArgumentParser(
    description="Submit status check."
)
parser.add_argument("--owner", "-o", required=False, default=DEFAULT_OWNER, help="Repo owner.")
parser.add_argument("--repo", "-r", required=False, default=DEFAULT_REPO, help="Repo to send status to.")
parser.add_argument("--status", "-s", required=False, default=DEFAULT_STATUS, help="Status to send.")
parser.add_argument("--build-context", "-b", required=False, default=DEFAULT_BUILD_CONTEXT, help="Build context.")
parser.add_argument("--description", "-d", required=False, default=DEFAULT_DESCRIPTION, help="Description of the status.")
parser.add_argument("--pr-id", "-p", required=False, default=DEFAULT_PR_ID, help="Id of the PR.")
parser.add_argument("--app-id", "-i", required=False, default=DEFAULT_APP_ID, help="Github app Id.")
parser.add_argument("--app-key", "-k", required=False, default=DEFAULT_APP_KEY, help="Github app key.")

args = parser.parse_args()

if not args.app_id or not args.app_key:
    print(f"Missing Github apps app id or app key")
    exit(1)
    
if not args.pr_id or not args.pr_id.isdigit():
    print(f"Invalid pr id: '{args.pr_id}'")
    exit(1)

integration = GithubIntegration(args.app_id, bytes(args.app_key, "utf-8"))
install = integration.get_installation(args.owner, args.repo)
access = integration.get_access_token(install.id)

g = Github(login_or_token=access.token)
repo = g.get_repo(f"{args.owner}/{args.repo}")
pr = repo.get_pull(int(args.pr_id))

latest_commit = pr.get_commits().reversed[0]
resp = latest_commit.create_status(args.status, description=args.description, context=args.build_context)
print("Status sent.",)
