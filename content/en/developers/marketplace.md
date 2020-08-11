---
title: Marketplace
type: documentation
---

<div class="alert alert-info">Want to be a marketplace partner? Contact us at <a href="mailto:marketplace@datadog.com">marketplace@datadog.com</a> to let us know your idea!</div>

## Before you begin

Before you begin the release process, you need your marketplace application approved by Datadog, access to the marketplace repo, a built integration, and you need to set up Datadog's Developer toolkit, [ddev][1].

## Releasing your integration

Making a release requires the maintainer to update two files in the same pull request (PR).

1. Update the CHANGELOG.md file
    This file can be automatically updated by ddev using the following command:
    ```
    ddev release changelog <INTEGRATION_NAME> <VERSION>
    ```
    The command lists all merged PRs since the last release and creates a changelog entry based on the pull request labels. For changelog types, adhere to those defined by [Keep a Changelog][2].

2. Update the `about.py` file
    Every Agent-based integration always has the same hierarchy of files, and the one and only source of truth for an integration version is always the `datadog_checks/<INTEGRATION>/about.py` file. For example, see the [Aqua][3] check.
Updating the file is a manual process.

3. Push these changes to a branch of the Datadog Marketplace repo and create a PR. When the PR is merged to master, a release is triggered with the specified version number in the `about.py` file. A few moments later (~15min), the new release gets pushed to Datadog's repository located here, and the integration can be installed using the command:

    ```
    sudo -u dd-agent datadog-agent integration install --third-party datadog-<INTEGRATION_NAME>==X.Y.Z
    ```




[1]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_dev
[2]: https://keepachangelog.com/en/1.1.0/#how
[3]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/__about__.py#L4
