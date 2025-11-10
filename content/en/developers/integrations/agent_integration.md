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

This page guides Technology Partners through the process of creating an official Datadog Agent integration. 

Agent-based integrations are designed to collect telemetry from software or systems running on customer-managed infrastructure, where the Datadog Agent is installed or has network access. These integrations use the [Datadog Agent][1] to collect and submit data through custom agent checks developed by approved Technology Partners. 

Agent checks can emit [metrics][2], [events][3], and [logs][5] into a customer's Datadog account. Each agent-based integration is as a Python package built on top of the Datadog Agent, allowing customers to easily [install][6] it through the Datadog Agent.

## Building an agent-based integration
Before you begin, ensure that you've [joined the Datadog Partner Network][7], have access to a partner developer organization, and have [created a listing in the Developer Platform][8].

Follow these steps to create your agent-based integration:

1. [Install the required development tools](#prerequisites).
2. [Configure the Datadog Agent integration developer tool](#configure-the-datadog-agent-integration-developer-tool).
3. [Generate your integration scaffolding](#generate-your-scaffolding).
4. [Develop your agent check](#develop-your-agent-check).
5. [Test your integration](#test-your-agent-check).
6. [Submit your code for review](#submit-your-code-for-review).

### Prerequisites

Ensure following tools are installed:

- [pipx][9] for installing development tooling and dependencies
- [Datadog Agent Integration Developer Tool][10] (`ddev`) to generate scaffolding and manage integration development
- [Docker][11] to run the full test suite
- Git ([command line][12] or [GitHub Desktop client][13])

### Configure the Datadog Agent integration developer tool
Use the Datadog Agent developer tool to build and test your integration. The setup steps differ depending on whether you're developing an [out-of-the-box (OOTB) integration or a Marketplace integration][23]. Select the appropriate tab below.

{{< tabs >}}

{{% tab "OOTB integration" %}}

1. Create a working directory. The developer tool expects your work to be located in `$HOME/dd/`:

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. Fork the [Datadog/integrations-extras][101] repository to your GitHub account.

3. Clone your fork into the `dd` directory:

   ```shell
   git clone git@github.com:<YOUR_USERNAME>/integrations-extras.git
   ```

4. Create and switch to a new branch for your integration:

   ```shell
   cd integrations-extras
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

5. Set `extras` as the default working repository: 

   ```shell
   ddev config set repo extras
   ```

   If your repository is stored outside `$HOME/dd/`, specify the path before setting it as the default:

   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ddev config set repo extras 
   ```

[101]: https://github.com/Datadog/integrations-extras

{{% /tab %}}

{{% tab "Marketplace integration" %}}

1. Create a working directory. The developer tool expects your work to be located in `$HOME/dd/`:

   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. Clone the [Datadog/marketplace][101] repository. If you don't have access, request it from your Datadog contact.

   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

3. Create and switch to a new branch for your integration:

   ```shell
   cd marketplace
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

4. Set `marketplace` as the default working repository:

   ```shell
   ddev config set repo marketplace
   ```

   If your repository is stored outside `$HOME/dd/`, specify the path before setting it as the default:

   ```shell
   ddev config set repos.marketplace "/path/to/marketplace"
   ddev config set repo marketplace
   ```

[101]: https://github.com/DataDog/marketplace

{{% /tab %}}

{{< /tabs >}}

### Generate your scaffolding

Use the `ddev create` command to generate the initial file and directory structure for your agent-based integration.

<div class="alert alert-info">See the Configuration Method tab in the Developer Platform for the correct command for your integration.</div>

1. **Run a dry run (recommended)**

    Use the `-n` or `--dry-run` flag to preview the files that are generated, without writing anything to disk. Confirm that the output path matches the expected repository location.

    ```shell
    ddev create -nt check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

2. **Generate the files** 

    After verifying the directory location, run the same command without the `-n` to create the scaffolding. Follow the prompts to provide integration details.

    ```shell
    ddev create -t check_only <YOUR_INTEGRATION_NAME> --skip-manifest
    ```

### Develop your agent check

Each agent-based integration centers around an agent check, a Python class that periodically collects telemetry and submits it to Datadog.

Agent [checks][16] inherit from the `AgentCheck` base class and must meet the following requirements:

- **Python compatibility**:
    - Integrations for Datadog Agent v7+ must support Python 3. All new integrations must target v7+.
    - Integrations for Datadog Agent v5-v6 use Python 2.7.
- **Class inheritance**: Each check must subclass `AgentCheck`.
- **Entry point**: Each check must implement a `check(self, instance)` method.
- **Package structure**: Checks are organized under the `datadog_checks` namespace. For example, an integration named `<INTEGRATION_NAME>` lives in: `<integration_name>/datadog_checks/<integration_name>/`.
- **Naming**:
    - The package name must match the check name.
    - Python module and class names within the package can be freely chosen.

#### Implement check logic

The following example shows logic for an integration named `Awesome`.

This check defines a [service check][4] called `awesome.search`, which searches a webpage for a specific string:
- Returns `OK` if the string is found.
- Returns `WARNING` if the page loads but the string is missing.
- Returns `CRITICAL` if the page cannot be reached.

To learn how to submit additional data from your check, see:

- [Custom Agent Check][17] for submitting metrics.
- [Agent Integration Log Collection][5] for collecting logs from your AgentCheck using `send_log`. Best for single-source log emission.
- [HTTP Crawler Tutorial][24] for collecting logs from multiple log sources, such as when pollin several endpoints or external HTTP APIs.

The file `awesome/datadog_checks/awesome/check.py` might look like this:

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

To learn more about the base Python class, see [Anatomy of a Python Check][18].

### Write validation tests

There are two types of tests:

- [Unit tests for specific functionality](#write-a-unit-test)
- [Integration tests that execute the `check` method and verify proper metrics collection](#write-an-integration-test)

[pytest][19] and [hatch][20] are used to run the tests. Tests are required to publish your integration.

#### Write a unit test

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

#### Write an integration test

The [unit test above](#write-a-unit-test) doesn't check the collection logic. To test the logic, you need to [create an environment for an integration test](#create-an-environment-for-the-integration-test) and [write an integration test](#add-an-integration-test).

##### Create an environment for the integration test

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

## Test your agent check

Agent-based integrations are distributed as Python wheel (.whl) files that customers install through the Datadog Agent. Before publishing your integration, you can locally test it by manually bulding and installing the wheel package.

### Build the wheel

The `pyproject.toml` file provides the metadata that is used to package and build the wheel. The wheel contains the files necessary for the functioning of the integration itself, which includes the agent check, configuration example file, and artifacts generated during the wheel build.

To learn more about Python packaging, see [Packaging Python Projects][21].

After your `pyproject.toml` is ready, create a wheel using one of the following options:

- (Recommended) With the `ddev` tooling: `ddev release build <INTEGRATION_NAME>`.
- Without the `ddev` tooling: `cd <INTEGRATION_DIR> && pip wheel . --no-deps --wheel-dir dist`.

### Install the wheel

The wheel is installed using the Agent `integration` command, available in [Agent v6.10.0 or later][1]. Depending on your environment, you may need to execute this command as a specific user or with specific privileges:

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

For customer install commands for both host and container environments, see the [Community and Marketplace Integrations documentation][22].

## Submit your code for review

Open a pull request with your integration directory in the appropriate repo, either [Datadog/integrations-extras][14] or [Datadog/marketplace][15]. The pull request is reviewed in parallel with your Developer Platform submission.

## Updating your integration

After your integration is published, you can release updates through the Developer Platform.

### Bumping an integration version
A version bump is needed whenever you add, remove, or modify functionality (for example, when introducing new metrics, updating dashboards, or changing integration code). It's not required for non-functional updates, such as changes to written content, branding, logos, or images.

In Developer Platform, include a new entry in the **Release Notes** tab following this format:
    
```
## Version Number / Date (YYYY-MM-DD)

***Added***:

* Description of new feature
* Description of new feature

***Fixed***:

* Description of fix
* Description of fix

***Changed***:

* Description of update or improvement
* Description of update or improvement

***Removed***:

* Description of removed feature
* Description of removed feature
```

Make sure to update all references to the version number across the integration's documentation and installation instructions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/agent/
[2]: https://docs.datadoghq.com/metrics/
[3]: https://docs.datadoghq.com/service_management/events/
[4]: /developers/service_checks/
[5]: https://docs.datadoghq.com/logs/log_collection/agent_checks/
[6]: https://docs.datadoghq.com/agent/guide/integration-management/?tab=linux#install
[7]: /developers/integrations/?tab=integrations#join-the-datadog-partner-network
[8]: /developers/integrations/build_integration/#create-a-listing
[9]: https://github.com/pypa/pipx
[10]: /developers/integrations/python/
[11]: https://docs.docker.com/get-docker/
[12]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[13]: https://desktop.github.com/
[14]: https://github.com/Datadog/integrations-extras
[15]: https://github.com/DataDog/marketplace
[16]: https://docs.datadoghq.com/glossary/#check
[17]: /metrics/custom_metrics/agent_metrics_submission/?tab=count
[18]: https://github.com/DataDog/datadog-agent/blob/6.2.x/docs/dev/checks/python/check_api.md
[19]: https://docs.pytest.org/en/latest
[20]: https://github.com/pypa/hatch
[21]: https://packaging.python.org/en/latest/tutorials/packaging-projects/
[22]: https://docs.datadoghq.com/agent/guide/use-community-integrations/
[23]: /developers/integrations/?tab=integrations#out-of-the-box-integrations-vs-marketplace-offerings
[24]: https://datadoghq.dev/integrations-core/tutorials/logs/http-crawler/