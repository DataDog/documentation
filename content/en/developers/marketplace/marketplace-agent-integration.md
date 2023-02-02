---
title: Create an Agent-based Integration for Marketplace
type: documentation
description: Learn how to create an Agent-based integration for the Datadog Marketplace repository.
further_reading:
- link: "/developers/integrations/python/"
  tag: "Documentation"
  text: "Set Up Python for Agent-based Integration Development"
- link: "https://partners.datadoghq.com/"
  tag: "Partner Network"
  text: "Datadog Partner Network"
- link: "/developers/marketplace/"
  tag: "Documentation"
  text: "Learn about the Datadog Marketplace"
- link: "/developers/integrations/oauth_for_integrations"
  tag: "Documentation"
  text: "Learn about using OAuth for integrations"
---

## Overview

This guide provides instructions for creating a Datadog Agent-based integration in the `marketplace` repository. For information on creating an Agent-based integration in the `integrations-extras` repo, see [Create an Agent-based integration][1].

## Setup

### Prerequisites

The required Datadog Agent integration development tools include:

- Python v3.8, [pipx][2] and the Agent Integration Developer Tool (`ddev`). For installation instructions, see [Install the Datadog Agent Integration Developer Tool][3].
- [Docker][4] to run the full test suite
- The git [command-line][5] or [GitHub desktop client][6]

## Set up a directory and clone the Marketplace repository

Follow these instructions to set up your repo for integration development:

1. Request access to the [Marketplace repository][7] by following the instructions in the [Marketplace documentation][8].

1. Create a `dd` directory:
   ```
   mkdir $HOME/dd
   ```

   The Datadog Development Toolkit command expects you to be working in the `$HOME/dd/` directory. This is not mandatory, but working in a different directory requires additional configuration steps.

1. Once you've been granted access to the Marketplace repository, clone the `marketplace` repo into your `dd` directory:
   ```
   cd $HOME/dd
   git clone git@github.com:DataDog/marketplace.git
   ```

1. Create a feature branch to work in.
   ```
   git switch -c <YOUR INTEGRATION NAME> origin/master
   ```

## Configure the developer tool

Assuming you've installed [the Agent Integration Developer Tool][3], configure the tool for the `marketplace` repo:


Set `marketplace` as the default working repository:

```
ddev config set marketplace $HOME/dd/marketplace
ddev config set repo marketplace
```

If you used a directory other than `$HOME/dd` to clone the marketplace directory, use the following command to set your working repository:

```
ddev config set marketplace <PATH/TO/MARKETPLACE>
ddev config set repo marketplace
```

## Create your integration

Once you've downloaded Docker, installed an appropriate version of Python, and prepared your development environment, you can get started with creating an Agent-based integration.

### Create scaffolding for your integration

The `ddev create` command runs an interactive tool that creates the basic file and path structure (or "scaffolding") necessary for a new Agent-based integration.

To generate the scaffolding for an Agent-based integration:
1. Make sure you're inside the `marketplace` directory:
   ```
   cd $HOME/dd/marketplace
   ```

2. Run the `ddev` command with the `-t tile` option:
   ```
   ddev create "<INTEGRATION NAME>"
   ```

## Write an Agent Check

At the core of each Agent-based integration is an *Agent Check* that periodically collects information and sends it to Datadog. Checks inherit their logic from the `AgentCheck` base class and have the following requirements:

- Integrations running on the Datadog Agent v7 or later must be compatible with Python 3; however, Agents v5 and v6 still use Python 2.7.
- Checks must derive from `AgentCheck`.
- Checks must provide a method with this signature: `check(self, instance)`.
- Checks are organized in regular Python packages under the `datadog_checks` namespace. For example, the code for Awesome lives in the `awesome/datadog_checks/awesome/` directory.
- The name of the package must be the same as the check name.
- There are no restrictions on the name of the Python modules within that package, nor on the name of the class implementing the check.

### Implement check logic

Complete your check logic in the check file located at `<INTEGRATION_NAME/datadog_checks/INTEGRATION_NAME/check.py>`.

The example below is composed of a Service Check named `awesome.search` that searches for a string on a web page. It results in `OK` if the string is present, `WARNING` if the page is accessible but the string was not found, and `CRITICAL` if the page is inaccessible. To learn how to submit metrics with your Agent Check, see [Custom Agent Check][9].

The code contained within the `check.py` file looks like this:

{{< code-block lang="python" filename="check.py" collapsible="true" >}}
import requests

from datadog_checks.base import AgentCheck, ConfigurationError


class AwesomeCheck(AgentCheck):
    """AwesomeCheck derives from AgentCheck, and provides the required check method."""

    def check(self, instance):
        url = instance.get('url')
        search_string = instance.get('search_string')

        # It's a very good idea to do some basic sanity checking.
        # Try to be as specific as possible with the exceptions.
        if not url or not search_string:
            raise ConfigurationError('Configuration error, please fix awesome.yaml')

        try:
            response = requests.get(url)
            response.raise_for_status()
        # Something went horribly wrong
        except Exception as e:
            # Ideally we'd use a more specific message...
            self.service_check('awesome.search', self.CRITICAL, message=str(e))
        # Page is accessible
        else:
            # search_string is present
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
            # search_string was not found
            else:
                self.service_check('awesome.search', self.WARNING)
{{< /code-block >}}

To learn more about the base Python class, see [Anatomy of a Python Check][10].

## Write validation tests

There are two basic types of tests:

- [Unit tests for specific functionality.](#write-a-unit-test)
- [Integration tests that execute the `check` method and verify proper metrics collection.](#write-an-integration-test)

[pytest][11] and [hatch][12] are used to run the tests. Tests are required if you want your integration to be included in the `marketplace` repository.

### Write a unit test

You can find a template for your unit test at `<INTEGRATION_NAME>/tests/test_INTEGRATION_NAME.py`

In the example check above, the first part of the `check` method retrieves and verifies two elements from the configuration file. This is a good candidate for a unit test.

Here is an example unit test named `test_awesome.py`:

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
import pytest

    # Don't forget to import your integration

from datadog_checks.awesome import AwesomeCheck
from datadog_checks.base import ConfigurationError


@pytest.mark.unit
def test_config():
    instance = {}
    c = AwesomeCheck('awesome', {}, [instance])

    # empty instance
    with pytest.raises(ConfigurationError):
        c.check(instance)

    # only the url
    with pytest.raises(ConfigurationError):
        c.check({'url': 'http://foobar'})

    # only the search string
    with pytest.raises(ConfigurationError):
        c.check({'search_string': 'foo'})

    # this should not fail
    c.check({'url': 'http://foobar', 'search_string': 'foo'})
{{< /code-block >}}

`pytest` has the concept of markers that can be used to group tests into categories. In the example above, `test_config` is marked as a `unit` test.

The scaffolding is set up to run all the tests located in `INTEGRATION_NAME/tests`.

To run the tests, run:

```
ddev test INTEGRATION_NAME
```

### Write an integration test

The [unit test above](#write-a-unit-test) doesn't check the collection logic. To test the logic, you need to create an environment for an integration test and write an integration test.

#### Create an environment for the integration test

To create an environment for your integration test, create a Docker Compose file at `INTEGRATION_NAME/tests/docker-compose.yml`.

For the example check, the toolkit uses `docker` to spin up an NGINX container and allows the check to retrieve the welcome page. The `docker-compose.yml` file has the following contents:

{{< code-block lang="yaml" filename="docker-compose.yml" collapsible="true" >}}
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"

{{< /code-block >}}

Next, define the environment for the integration test at `INTEGRATION_NAME/tests/conftest.py`.

Here is an example integration test for the `awesome` check:

{{< code-block lang="python" filename="conftest.py" collapsible="true" >}}
import os

import pytest

from datadog_checks.dev import docker_run, get_docker_hostname, get_here

URL = 'http://{}:8000'.format(get_docker_hostname())
SEARCH_STRING = 'Thank you for using nginx.'
INSTANCE = {'url': URL, 'search_string': SEARCH_STRING}


@pytest.fixture(scope='session')
def dd_environment():
    compose_file = os.path.join(get_here(), 'docker-compose.yml')

    # This does 3 things:
    #
    # 1. Spins up the services defined in the compose file
    # 2. Waits for the url to be available before running the tests
    # 3. Tears down the services when the tests are finished
    with docker_run(compose_file, endpoints=[URL]):
        yield INSTANCE


@pytest.fixture
def instance():
    return INSTANCE.copy()
{{< /code-block >}}

#### Add an integration test

After you've set up an environment for the integration test, add an integration test to the `INTEGRATION_NAME/tests/test_INTEGRATION_NAME.py` file:

Here is an example integration test for the `awesome` check:

{{< code-block lang="python" filename="test_awesome.py" collapsible="true" >}}
@pytest.mark.integration
@pytest.mark.usefixtures('dd_environment')
def test_service_check(aggregator, instance):
    c = AwesomeCheck('awesome', {}, [instance])

    # the check should send OK
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.OK)

    # the check should send WARNING
    instance['search_string'] = 'Apache'
    c.check(instance)
    aggregator.assert_service_check('awesome.search', AwesomeCheck.WARNING)
{{< /code-block >}}

Use the `ddev test` command to run the integration tests. You can use the `-m/--marker` option to run only the integration tests:

```
ddev test -m integration INTEGRATION_NAME
```

Your integration is almost complete. Next, add the necessary check assets.

## Complete the necessary integration asset files

The set of assets created by the `ddev` scaffolding must be populated in order for a check to be considered in the `marketplace` repo:

`spec.yaml`
: This is used to generate the `conf.yaml.example` using the `ddev` tooling (see the **Configuration template** tab below).<br><br>For more information, see [Configuration specification][13].

`conf.yaml.example`
: This contains default (or example) configuration options for your Agent Check. **Do not edit this file by hand!** It is generated from the contents of `spec.yaml`. <br><br>To generate the file, run `ddev validate config --sync <INTEGRATION_NAME>`.<br><br>For more information, see the [Configuration file reference][14].

`manifest.json`
: This contains the metadata for your Agent Check such as the title and categories. For more information, see the [Manifest file reference][15].

`metadata.csv`
: This contains the list of all metrics collected by your Agent Check. For more information, see the [Metrics metadata file reference][16].

`service_check.json`
: This contains the list of all Service Checks collected by your Agent Check. Add any service checks you created to the file. For more information, see the [Service check file reference][17].

README
: Includes an Overview, Setup, Data Collected (optional), and Support section using H2 headings (##) in Markdown.<br><br>For more information, see [README](#readme).

Media
: Add any images and a video that you want to use for the integration tile's media carousel in an `images` folder. You can add one video to each listing.<br><br>Technology Partners can use `.png` files instead of `.jpg` files to reduce image compression.

Media Carousel
: Define the images you want to add to the integration tile's media carousel in the `media` object specified in the `tile` front matter on the `manifest.json` file.<br><br>For more information, see [Media Carousel](#media-carousel).

Dashboards and Monitors
: Provide the JSON files for out-of-the-box dashboards and monitors included in the integration in a `dashboards` folder nested in the `assets` directory.<br><br>Technology Partners can create dashboards and monitors in a provisioned sandbox account, and export these assets into JSON files. For more information about dashboards, see [Best Practices for Integration Preset Dashboards][18].

Logos
: Add at least one SVG file which can be used in light and dark modes in a `logos` folder nested in the `assets` directory, or add the file(s) directly to the `assets` directory.<br><br>Technology Partners are responsible for the licensing of submitted logos.

CHANGELOG
: Document release notes and version information in the `CHANGELOG.md` file using the following format: `1.0.0 / YYYY-MM-DD`. This information is displayed in the **Release Notes** tab of the integration tile.<br><br>Technology Partners can add releases and version updates in descending order (latest version at the top).

CODEOWNERS
: The `CODEOWNERS` file belongs in the shared `.github` directory and defines the individuals or teams responsible for maintaining the content and source code in the Marketplace repository.<br><br>For information on CODEOWNER syntax, see the [GitHub code owners documentation][19].

End User License Agreement (EULA)
: Add the `eula.pdf` file in the `assets` directory.<br><br>Technology Partners are responsible for adding the EULA.

### README

{{% integrations_readme %}}

### Media carousel

{{% integrations_media_carousel %}}

## Build the wheel

The `pyproject.toml` file provides the metadata that is used to package and build the wheel. The wheel contains the files necessary for the integration to function itself, and includes the Check, configuration example file, and artifacts generated during the build of the wheel.

All additional elements, including the metadata files, are not meant to be contained within the wheel, and are used elsewhere by the Datadog platform and ecosystem. To learn more about Python packaging, see [Packaging Python Projects][20].

Once your `pyproject.toml` is ready, create a wheel:

- (Recommended) With the `ddev` tooling: `ddev release build <INTEGRATION_NAME>`.
- Without the `ddev` tooling: `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`.

## Install the wheel

The wheel is installed using the Agent `integration` command, available in [Agent v6.10.0 or later][21]. Depending on your environment, you may need to execute this command as a specific user or with specific privileges:

{{< tabs >}}
{{% tab "Linux (as dd-agent)" %}}
<pre><code>sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl</code></pre>
{{% /tab %}}

{{% tab "Mac OS (as admin)" %}}
<pre><code>sudo datadog-agent integration install -w /path/to/wheel.whl</code></pre>
{{% /tab %}}

{{% tab "Windows PowerShell" %}}

Ensure that your shell session has _administrator_ privileges.

<details>
  <summary>Agent <code>v6.11</code> or earlier</summary>

  <pre><code>& "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl</code></pre>

</details>

<details open>
  <summary>Agent<code>v6.12</code> or later</summary>

  <pre><code>& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl</code></pre>
</details>

{{% /tab %}}
{{< /tabs >}}

## Open a pull request

Before you open a pull request, run the following command to catch any problems with your integration:

```
ddev validate all <INTEGRATION_NAME>
```

Push up your feature branch and open a pull request that contains your integration tile's asset files (including images) in the [`marketplace` repository][7]. The Marketplace repository does not allow forks. For instructions on creating a clone of the repo, see the [Set up section](#set-up-a-directory-and-clone-the-marketplace-repository). After you've created your pull request, automatic checks run in Azure DevOps pipelines to verify that your pull request is in good shape and contains all the required content to be updated.

To request access to the Azure DevOps pipeline, leave a comment in the pull request requesting access.


## Review process

Once your pull request passes all the checks, reviewers from the `Datadog/agent-integrations`, `Datadog/marketplace-review`, and `Datadog/documentation` teams provide suggestions and feedback on best practices.

Once you have addressed the feedback and re-requested reviews, these reviewers approve your pull request. Contact the Marketplace team if you would like to preview the integration tile in your sandbox account. This allows you to validate and preview additional changes in the integration tile on the Datadog Marketplace before your pull request is merged.

## Coordinate GTM opportunities

Once a Marketplace tile is live, Technology Partners can meet with Datadog's Partner Marketing team to coordinate a joint go-to-market (GTM) strategy, which includes the following:

- A Datadog quote for partner press releases
- A blog post on the [Datadog Monitor][22]
- Amplification of social media posts

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/integrations/new_check_howto/
[2]: https://github.com/pypa/pipx
[3]: /developers/integrations/python/
[4]: https://docs.docker.com/get-docker/
[5]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[6]: https://desktop.github.com/
[7]: https://github.com/Datadog/marketplace
[8]: /developers/marketplace/#request-access-to-marketplace
[9]: /metrics/custom_metrics/agent_metrics_submission/?tab=count
[10]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[11]: https://docs.pytest.org/en/latest
[12]: https://github.com/pypa/hatch
[13]: https://datadoghq.dev/integrations-core/meta/config-specs/
[14]: /developers/integrations/check_references/#configuration-file
[15]: /developers/integrations/check_references/#manifest-file
[16]: /developers/integrations/check_references/#metrics-metadata-file
[17]: /developers/integrations/check_references/#service-check-file
[18]: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
[19]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
[20]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[21]: https://docs.datadoghq.com/agent/
[22]: https://datadoghq.com/blog/
