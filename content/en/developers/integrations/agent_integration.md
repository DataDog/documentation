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

This page guides Technology Partners through creating an official Datadog agent integration. Agent integrations are best suited for collecting telemetry from software or systems that run on customer-managed infrastructure, where the Datadog Agent can be installed.

An Agent-based integration uses the [Datadog Agent][1] to submit data through custom agent checks written by approved Technolgoy Partners. These checks can emit [metrics][2], [events][3], [service checks][4], and [logs][5] into a customer's Datadog account. Agent-based integrations are published as a Python packages that easily allows customers to [install][6] via the Datadog Agent.

## Building an agent-based integration
These steps assume you've [joined the Datadog Partner Network][7], have access to a partner developer organization, and have [created a listing in the Developer Platform][8].

1. [Install the required development tools](#preqrequisites).
2. [Configure the Datadog Agent integration developer tool](#configure-the-datadog-agent-integration-developer-tool).
3. [Create the scaffolding for your integration](#create-the-scaffolding).
4. [Write your agent check](#write-your-agent-check).
5. [Test your agent check](#test-your-agent-check).
6. [Submit your code for review](#submit-your-code-for-review).

### Preqrequisites

- Python v3.12 installed.
- [pipx][9] to install the development tooling and dependencies.
- [Datadog Agent Integration Developer Tool][10] (`ddev`) to create the necessary scaffolding.
- [Docker][11] to run the full test suite.
- Git ([command line][12] or [GitHub Desktop client][13]).

### Configure the Datadog Agent integration developer tool
Use the Datadog Agent developer tool (ddev) to build and test your integration. The setup steps differ depending on whether you’re developing an [out-of-the-box (OOTB) integration or a Marketplace integration][23]. Select the appropriate tab below.

{{< tabs >}}

{{% tab "OOTB integration" %}}

1. **Create a working directory**
   The developer tool expects your work to be located in `$HOME/dd/`:
   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. **Fork the repository**
   Fork the [Datadog/integrations-extras][14] repository to your GitHub account.

3. **Clone your fork** 
   Clone your fork into the `dd` directory:
   ```shell
   git clone git@github.com:<YOUR_USERNAME>/integrations-extras.git
   ```

4. **Create a feature branch**
   Create and switch to a new branch for your integration:
   ```shell
   cd integrations-extras
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

5. **Configure the default respository**
   Set `extras` as the default working repository: 
   ```shell
   ddev config set repo extras
   ```
   If your repository is stored outside `$HOME/dd/`, specify the path before setting it as the default:
   ```shell
   ddev config set repos.extras "/path/to/integrations-extras"
   ddev config set repo extras 
   ```

{{% /tab %}}

{{% tab "Marketplace integration" %}}

1. **Create a working directory**
   The developer tool expects your work to be located in `$HOME/dd/`:
   ```shell
   mkdir $HOME/dd && cd $HOME/dd
   ```

2. **Clone the repository**
   Clone the [Datadog/marketplace][15] repository. If you don’t have access, request it from your Datadog contact.
   ```shell
   git clone git@github.com:DataDog/marketplace.git
   ```

3. **Create a feature branch** 
   Create and switch to a new branch for your integration:
   ```shell
   cd marketplace
   git switch -c <YOUR_INTEGRATION_NAME> origin/master
   ```

4. **Configure the default repository**
   Set `marketplace` as the default working repository:
   ```shell
   ddev config set repo marketplace
   ```
   If your repository is stored outside `$HOME/dd/`, specify the path before setting it as the default:
   ```shell
   ddev config set repos.marketplace "/path/to/marketplace"
   ddev config set repo marketplace
   ```
{{% /tab %}}

{{< /tabs >}}

### Create the scaffolding

Use the `ddev create` command to generate the basic file and directory structure for an agent-based integration.

1. Test the setup first with a dry run (`-n` or `--dry-run`), which shows the paths and structure without writing to disk. Verify the output path matches the expected repository.

   ```shell
   ddev create -nt check_only <YOUR_INTEGRATION_NAME> --skip-manifest
   ```

2. When ready, run the command without `-n` to create the files. The tool will prompt you for integration details.

   ```shell
   ddev create -t check_only <YOUR_INTEGRATION_NAME> --skip-manifest
   ```

### Write your agent check

At the core of each Agent-based integration is an *Agent Check* that periodically collects information and sends it to Datadog.

[Checks][16] inherit their logic from the `AgentCheck` base class and have the following requirements:

- Integrations running on the Datadog Agent v7 or later must be compatible with Python 3. Integrations running on the Datadog Agent v5 and v6 still use Python 2.7.
- Checks must derive from `AgentCheck`.
- Checks must provide a method with this signature: `check(self, instance)`.
- Checks are organized in regular Python packages under the `datadog_checks` namespace. For example, the code for Awesome lives in the `awesome/datadog_checks/awesome/` directory.
- The name of the package must be the same as the check name.
- There are no restrictions on the name of the Python modules within that package, nor on the name of the class implementing the check.

#### Implement check logic

The following example is for an integration named `Awesome`.

The Agent Check is composed of a [service check][4] named `awesome.search` that searches for a string on a web page. It results in `OK` if the string is present, `WARNING` if the page is accessible but the string was not found, and `CRITICAL` if the page is inaccessible.

To learn how to submit metrics with your Agent Check, see [Custom Agent Check][17]. To learn how to submit logs from your Agent Check, see [Agent Integration Log Collection][5].

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

To learn more about the base Python class, see [Anatomy of a Python Check][18].

### Write validation tests

There are two types of tests:

- [Unit tests for specific functionality](#write-a-unit-test)
- [Integration tests that execute the `check` method and verify proper metrics collection](#write-an-integration-test)

[pytest][19] and [hatch][20] are used to run the tests. Tests are required in order to publish your integration.

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
Your integration is almost complete. Return to the Developer Platform in your sandbox to finalize your submission. 

## Test your agent check

Agent-based integrations are distributed as Python wheel (.whl) files that customers install through the Datadog Agent. Before publishing your integration, you can locally test it by manually bulding and installing the wheel package.

### Build the wheel

The `pyproject.toml` file provides the metadata that is used to package and build the wheel. The wheel contains the files necessary for the functioning of the integration itself, which includes the Agent Check, configuration example file, and artifacts generated during the wheel build.

All additional elements, including the metadata files, are not meant to be contained within the wheel, and are used elsewhere by the Datadog platform and ecosystem.

To learn more about Python packaging, see [Packaging Python Projects][21].

Once your `pyproject.toml` is ready, create a wheel using one of the following options:

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

Open a pull request with your integration directory in the approriate repo, either [Datadog/integrations-extras][14] or [Datadog/marketplace][15]. The pull request will be review in parrallel with your Developer Platform submission.

## Updating your integration
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

[1]: https://docs.datadoghq.com/agent/
[2]: https://docs.datadoghq.com/metrics/
[3]: https://docs.datadoghq.com/service_management/events/
[4]: https://docs.datadoghq.com/developers/service_checks/
[5]: https://docs.datadoghq.com/logs/log_collection/agent_checks/
[6]: https://docs.datadoghq.com/agent/guide/integration-management/?tab=linux#install
[7]: /developers/integrations/?tab=integrations#join-the-datadog-partner-network
[8]: /developers/integrations/build_integration/#create-a-listing
[9]: https://github.com/pypa/pipx
[10]: https://docs.datadoghq.com/developers/integrations/python/
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
[23]: https://docs.datadoghq.com/developers/integrations/?tab=integrations#out-of-the-box-integrations-vs-marketplace-offerings