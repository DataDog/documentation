---
aliases:
- /developers/integrations/integration_sdk/
- /developers/integrations/testing/
- /integrations/datadog_checks_dev/
- /guides/new_integration/
- /developers/integrations/new_check_howto/
further_reading:
- link: /developers/integrations/
  tag: Documentation
  text: Create an integration
- link: /developers/integrations/python/
  tag: Documentation
  text: Python for Agent-based Integration Development
- link: /developers/
  tag: Documentation
  text: Learn how to develop on the Datadog platform
title: Create an Agent-based Integration
description: Learn how to develop and publish a Datadog Agent integration.
---
## Overview

This page walks Technology Partners through how to create a Datadog Agent integration, which you can list as out-of-the-box on the [Integrations page][23], or for a price on the [Marketplace page][24].

An Agent-based integration uses the [Datadog Agent][17] to submit data through custom checks written by developers. These checks can emit [metrics][34], [events][18], [service checks][25], and [logs][36] into a customer's Datadog account.

## When to use Agent-based integrations

Agent integrations are best suited for collecting data from systems or applications running with a:
- Local Area Network (LAN)
- Virtual Private Cloud (VPC)
Agent-based integrations require publishing and deploying as a Python wheel (.whl).


## Development process

The process to build an Agent-based integration looks like this:

1. Join the Datadog Partner Network
   - Apply to the [Datadog Partner Network][32]. Once accepted, an introductory call will be scheduled with the Datadog Technology Partner team. 
2. Set up your development environment
   - Request a Datadog sandbox account through the Datadog Partner Network portal.
   - Install the necessary development tools.
3. Create your integration
   - Within your Datadog sandbox, navigate to **Developer Platform** > **add a new listing**.
   - Fill in the details describing your integration.
4. Build your agent check and test your integration
   - Create your Agent Check following [these steps](#write-an-agent-check). 
4. Submit for review
   - Submit your integration content through the Developer Platform.
   - Open a GitHub pull request with the code for your Agent check.
   - The Datadog team will schedule a final demo to review your integration.

## Prerequisites

The required Datadog Agent integration development tools include the following:

- Python v3.12, [pipx][2], and the Agent Integration Developer Tool (`ddev`). For installation instructions, see [Install the Datadog Agent Integration Developer Tool][3].
- [Docker][4] to run the full test suite.
- The git [command line][5] or [GitHub Desktop client][19].

<div class="alert alert-info">Select a tab for instructions on building an out-of-the-box Agent-based integration on the Integrations page, or an Agent-based integration on the Marketplace page.</div>

{{< tabs >}}
{{% tab "Build an out-of-the-box integration" %}}

To build an out-of-the-box integration:

Create a `dd` directory:

```shell
mkdir $HOME/dd && cd $HOME/dd
```

   The Datadog Development Toolkit expects you to work in the `$HOME/dd/` directory. This is not mandatory, but working in a different directory requires additional configuration steps.

1. Fork the [`integrations-extras` repository][101].

1. Clone your fork into the `dd` directory:
   ```shell
   git clone git@github.com:<YOUR USERNAME>/integrations-extras.git
   ```

1. Create a feature branch to work in:
   ```shell
   git switch -c <YOUR INTEGRATION NAME> origin/master
   ```

## Configure the developer tool

The Agent Integration Developer Tool allows you to create scaffolding when you are developing an integration by generating a skeleton of your integration tile's assets and metadata. For instructions on installing the tool, see [Install the Datadog Agent Integration Developer Tool][102].

To configure the tool for the `integrations-extras` repository:

1. Optionally, if your `integrations-extras` repo is somewhere other than `$HOME/dd/`, adjust the `ddev` configuration file:
   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ```

1. Set `integrations-extras` as the default working repository:
   ```shell
   ddev config set repo extras
   ```

[101]: https://github.com/Datadog/integrations-extras
[102]: https://docs.datadoghq.com/developers/integrations/python

{{% /tab %}}

{{% tab "Build a Marketplace integration" %}}

To build an integration:

1. See [Build a Marketplace Offering][102] to request access to the [Marketplace repository][101].
1. Create a `dd` directory:

   ```shell
   mkdir $HOME/dd```

   The Datadog Development Toolkit command expects you to be working in the `$HOME/dd/` directory. This is not mandatory, but working in a different directory requires additional configuration steps.

1. Once you have been granted access to the Marketplace repository, create the `dd` directory and clone the `marketplace` repository:

   ```shell
   git clone git@github.com:DataDog/marketplace.git```

1. Create a feature branch to work in:

   ```shell
   git switch -c <YOUR INTEGRATION NAME> origin/master```

## Install and configure the Datadog development toolkit

The Agent Integration Developer Tool allows you to create scaffolding when you are developing an integration by generating a skeleton of your integration tile's assets and metadata. For instructions on installing the tool, see [Install the Datadog Agent Integration Developer Tool][103].

Once you have installed the Agent Integration Developer Tool, configure it for the Marketplace repository.

1. Set `marketplace` as the default working repository:

   ```shell

   ddev config set repos.marketplace $HOME/dd/marketplace
   ddev config set repo marketplace
   ```

1. If you used a directory other than `$HOME/dd` to clone the `marketplace` directory, use the following command to set your working repository:

   ```shell

   ddev config set repos.marketplace <PATH/TO/MARKETPLACE>
   ddev config set repo marketplace
   ```

[101]: https://github.com/Datadog/marketplace
[102]: https://docs.datadoghq.com/developers/integrations/marketplace_offering
[103]: https://docs.datadoghq.com/developers/integrations/python

{{% /tab %}}

{{< /tabs >}}

## Create your integration

Once you've downloaded Docker, installed an appropriate version of Python, and prepared your development environment, you can start creating an Agent-based integration.

The following instructions use an example integration called `Awesome`. Follow along using the code from Awesome, or replace Awesome with your own code, as well as the name of your integration within the commands. For example, use `ddev create <your-integration-name>` instead of `ddev create Awesome`.

### Create scaffolding for your integration

The `ddev create` command runs an interactive tool that creates the basic file and path structure (or scaffolding) necessary for an Agent-based integration.

1. Before you create your first integration directory, try a dry-run using the `-n/--dry-run` flag, which doesn't write anything to the disk:
   ```shell
   ddev create -n Awesome
   ```

   This command displays the path where the files would have been written, as well as the structure itself. Make sure the path in the first line of output matches your repository location.

1. Run the command without the `-n` flag. The tool asks you for an email and name and then creates the files you need to get started with an integration.

    <div class="alert alert-info">If you are creating an integration for the Datadog Marketplace, ensure that your directory follows the pattern of {partner name}_{integration name}.</div>

   ```shell
   ddev create Awesome
   ```

## Write an Agent check

At the core of each Agent-based integration is an *Agent Check* that periodically collects information and sends it to Datadog.

[Checks][30] inherit their logic from the `AgentCheck` base class and have the following requirements:

- Integrations running on the Datadog Agent v7 or later must be compatible with Python 3. Integrations running on the Datadog Agent v5 and v6 still use Python 2.7.
- Checks must derive from `AgentCheck`.
- Checks must provide a method with this signature: `check(self, instance)`.
- Checks are organized in regular Python packages under the `datadog_checks` namespace. For example, the code for Awesome lives in the `awesome/datadog_checks/awesome/` directory.
- The name of the package must be the same as the check name.
- There are no restrictions on the name of the Python modules within that package, nor on the name of the class implementing the check.

### Implement check logic

For Awesome, the Agent Check is composed of a [service check][25] named `awesome.search` that searches for a string on a web page. It results in `OK` if the string is present, `WARNING` if the page is accessible but the string was not found, and `CRITICAL` if the page is inaccessible.

To learn how to submit metrics with your Agent Check, see [Custom Agent Check][7]. To learn how to submit logs from your Agent Check, see [Agent Integration Log Collection][36].

The code contained within `awesome/datadog_checks/awesome/check.py` looks something like this:

{{< code-block lang="python" filename="check.py" collapsible="true" >}}

import requests
import time

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
            # Submit an error log
            self.send_log({
                'message': f'Failed to access {url}: {str(e)}',
                'timestamp': time.time(),
                'status': 'error',
                'service': 'awesome',
                'url': url
            })
        # Page is accessible
        else:
            # search_string is present
            if search_string in response.text:
                self.service_check('awesome.search', self.OK)
                # Submit an info log
                self.send_log({
                    'message': f'Successfully found "{search_string}" at {url}',
                    'timestamp': time.time(),
                    'status': 'info',
                    'service': 'awesome',
                    'url': url,
                    'search_string': search_string
                })
            # search_string was not found
            else:
                self.service_check('awesome.search', self.WARNING)
                # Submit a warning log
                self.send_log({
                    'message': f'String "{search_string}" not found at {url}',
                    'timestamp': time.time(),
                    'status': 'warning',
                    'service': 'awesome',
                    'url': url,
                    'search_string': search_string
                })
{{< /code-block >}}

To learn more about the base Python class, see [Anatomy of a Python Check][8].

## Write validation tests

There are two types of tests:

- [Unit tests for specific functionality](#write-a-unit-test)
- [Integration tests that execute the `check` method and verify proper metrics collection](#write-an-integration-test)

[pytest][9] and [hatch][10] are used to run the tests. Tests are required in order to publish your integration.

### Write a unit test

The first part of the `check` method for Awesome retrieves and verifies two elements from the configuration file. This is a good candidate for a unit test.

Open the file at `awesome/tests/test_awesome.py` and replace the contents with the following:

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

`pytest` has the concept of markers that can be used to group tests into categories. Notice that `test_config` is marked as a `unit` test.

The scaffolding is set up to run all the tests located in `awesome/tests`. To run the tests, run the following command:
```
ddev test awesome
```

### Write an integration test

The [unit test above](#write-a-unit-test) doesn't check the collection logic. To test the logic, you need to [create an environment for an integration test](#create-an-environment-for-the-integration-test) and [write an integration test](#add-an-integration-test).

#### Create an environment for the integration test

The toolkit uses `docker` to spin up an NGINX container and lets the check retrieve the welcome page.

To create an environment for the integration test, create a docker-compose file at `awesome/tests/docker-compose.yml` with the following contents:

{{< code-block lang="yaml" filename="docker-compose.yml" collapsible="true" >}}
version: "3"

services:
  nginx:
    image: nginx:stable-alpine
    ports:
      - "8000:80"

{{< /code-block >}}

Next, open the file at `awesome/tests/conftest.py` and replace the contents with the following:

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

After you've setup an environment for the integration test, add an integration test to the `awesome/tests/test_awesome.py` file:

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

To speed up development, use the `-m/--marker` option to run integration tests only:
   ```
   ddev test -m integration awesome
   ```
Your integration is almost complete. Return to the Developer Platform in your sandbox to finalize your submission. 

## Build the wheel

The `pyproject.toml` file provides the metadata that is used to package and build the wheel. The wheel contains the files necessary for the functioning of the integration itself, which includes the Agent Check, configuration example file, and artifacts generated during the wheel build.

All additional elements, including the metadata files, are not meant to be contained within the wheel, and are used elsewhere by the Datadog platform and ecosystem.

To learn more about Python packaging, see [Packaging Python Projects][16].

Once your `pyproject.toml` is ready, create a wheel using one of the following options:

- (Recommended) With the `ddev` tooling: `ddev release build <INTEGRATION_NAME>`.
- Without the `ddev` tooling: `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`.

## Install the wheel

The wheel is installed using the Agent `integration` command, available in [Agent v6.10.0 or later][17]. Depending on your environment, you may need to execute this command as a specific user or with specific privileges:

**Linux** (as `dd-agent`):
```bash
sudo -u dd-agent datadog-agent integration install -w /path/to/wheel.whl
```

**OSX** (as admin):
```bash
sudo datadog-agent integration install -w /path/to/wheel.whl
```

**Windows PowerShell** (Ensure that your shell session has _administrator_ privileges):

<details>
  <summary>Agent <code>v6.11</code> or earlier</summary>

  ```ps
  & "C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe" integration install -w /path/to/wheel.whl
  ```

</details>

<details open>
  <summary>Agent<code>v6.12</code> or later</summary>

  ```ps
  & "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" integration install -w /path/to/wheel.whl
  ```
</details>

For installing your wheel to test in Kubernetes environments:
1. Mount the `.whl` file into an initContainer.
2. Run the wheel install in the initContainer.
3. Mount the initContainer in the Agent container while it's running.

For customer install commands for both host and container environments, see the [Community and Marketplace Integrations documentation][35].

## Submit your code for review

Follow the steps outlined within the Developer Platform to submit your Agent check code for review in GitHub. The pull request will be released with your integration upon approval.

## Update your integration
* If you are editing or adding new integration code, a version bump is required.

* If you are editing or adding new README content, manifest information, or assets such as dashboards and monitor templates, a version bump is not needed.

### Bumping an integration version
In addition to any code changes, the following is required when bumping an integration version:
1. Update `__about__.py` to reflect the new version number. This file can be found in your integration's directory under `/datadog_checks/<your_check_name>/__about__.py`.
2. Add an entry to the **Release Notes** in the Developer Platform that adheres to the following format:
   ```
   ## Version Number / Date in YYYY-MM-DD

   ***Added***:

   * New feature
   * New feature

   ***Fixed***:

   * Bug fix
   * Bug fix

   ***Changed***:

   * Feature update
   * Feature update

   ***Removed***:

   * Feature removal
   * Feature removal
   ```
3. Update all references to the version number mentioned in installation instructions and elsewhere. Installation instructions often include the version number, which needs to be updated.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/developers/#creating-your-own-solution
[2]: https://github.com/pypa/pipx
[3]: https://docs.datadoghq.com/developers/integrations/python/
[4]: https://docs.docker.com/get-docker/
[5]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[6]: https://github.com/datadog/integrations-extras
[7]: /metrics/custom_metrics/agent_metrics_submission/?tab=count
[8]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[9]: https://docs.pytest.org/en/latest
[10]: https://github.com/pypa/hatch
[11]: https://datadoghq.dev/integrations-core/meta/config-specs/
[12]: /developers/integrations/check_references/#configuration-file
[13]: /developers/integrations/check_references/#manifest-file
[14]: /developers/integrations/check_references/#metrics-metadata-file
[15]: /developers/integrations/check_references/#service-check-file
[16]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[17]: https://docs.datadoghq.com/agent/
[18]: https://docs.datadoghq.com/service_management/events/
[19]: https://desktop.github.com/
[20]: https://docs.datadoghq.com/developers/integrations/
[21]: https://github.com/Datadog/integrations-extras
[22]: https://github.com/Datadog/marketplace
[23]: https://app.datadoghq.com/integrations
[24]: https://app.datadoghq.com/marketplace
[25]: https://docs.datadoghq.com/developers/service_checks/
[26]: https://docs.datadoghq.com/logs/
[27]: https://docs.datadoghq.com/monitors/
[28]: https://docs.datadoghq.com/dashboards/
[29]: https://docs.datadoghq.com/logs/log_configuration/pipelines/
[30]: https://docs.datadoghq.com/glossary/#check
[31]: https://docs.datadoghq.com/developers/integrations/
[32]: https://partners.datadoghq.com/
[33]: https://docs.datadoghq.com/developers/integrations/check_references/
[34]: https://docs.datadoghq.com/metrics/
[35]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[36]: https://docs.datadoghq.com/logs/log_collection/agent_checks/
