---
title: CI/CD Integrations Configuration
kind: documentation
description: Configure Synthetics to run test in your CI/CD pipelines
further_reading:
- link: "/synthetics/cicd_integrations"
  tag: "Documentation"
  text: "Learn about Synthetics and CI/CD"
- link: "/synthetics/ci_results_explorer"
  tag: "Documentation"
  text: "Learn about the CI Results Explorer"
- link: "/synthetics/testing_tunnel"
  tag: "Documentation"
  text: "Learn about the Testing Tunnel"
- link: https://www.datadoghq.com/blog/datadog-github-action-synthetics-ci-visibility/
  tag: "Blog"
  text: "Use Datadog's GitHub Action to add Synthetic testing to workflows"
---

## Overview

Use the `@datadog-ci` NPM package to run Synthetic tests directly within your CI/CD pipeline. You can automatically halt a build, block a deployment, and roll back a deployment when a Synthetics test detects a regression. 

To configure which URL your test starts on, provide a `startUrl` to your test object. Build your own starting URL with any part of your test's original starting URL and the following environment variables:

### Install a package

The package is published under [@datadog/datadog-ci][1] in the NPM registry.

{{< tabs >}}
{{% tab "NPM" %}}

Install the package through NPM:

```bash
npm install --save-dev @datadog/datadog-ci
```

{{% /tab %}}
{{% tab "Yarn" %}}

Install the package through Yarn:

```bash
yarn add --dev @datadog/datadog-ci
```

{{% /tab %}}
{{< /tabs >}}

### Setup a client

To setup your client, Datadog API and application keys need to be configured. These keys can be defined in three different ways:

1. As environment variables:

    ```bash
    export DATADOG_API_KEY="<API_KEY>"
    export DATADOG_APP_KEY="<APPLICATION_KEY>"
    ```

2. Passed to the CLI when running your tests:

    ```bash
    datadog-ci synthetics run-tests --apiKey "<API_KEY>" --appKey "<APPLICATION_KEY>"
    ```

3. Or defined in a global configuration file:

     The global JSON configuration file can specify additional advanced options. Specify the path to this file using the flag `--config` [when launching your tests](#run-tests). If you set the name of your global configuration file to `datadog-ci.json`, that name is the default.

In the global configuration file, you can configure the following options: 

`apiKey`
: The API key used to query the Datadog API.

`appKey`
: The application key used to query the Datadog API.

`datadogSite`
: The Datadog instance to which request is sent. The default is `datadoghq.com`. Your Datadog site is {{< region-param key="dd_site" code="true" >}}.

`files`
: Glob pattern to detect Synthetic tests config files.

`global`
: Overrides of Synthetic tests applied to all tests ([see below for descriptions of each field](#configure-tests)).

`proxy`
: The proxy to be used for outgoing connections to Datadog. `host` and `port` keys are mandatory arguments, `protocol` key defaults to `http`. Supported values for `protocol` key are `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http`, `pac+https`. The library used to configure the proxy is the [proxy-agent][2] library.

`subdomain`
: The name of the custom subdomain set to access your Datadog application. If the URL used to access Datadog is `myorg.datadoghq.com`, the `subdomain` value then needs to be set to `myorg`.

`tunnel`
: Use the [secure tunnel][3] to execute your test batch.

`testSearchQuery`
: Pass a query to select which Synthetic tests to run. If you are running tests in the CLI, use the `-s` flag.

For example: 

{{< code-block lang="json" filename="Global Configuration File" disable_copy="false" collapsible="true" >}}
{
    "apiKey": "<DATADOG_API_KEY>",
    "appKey": "<DATADOG_APPLICATION_KEY>",
    "datadogSite": "datadoghq.com",
    "files": "{,!(node_modules)/**/}*.synthetics.json",
    "global": {
        "allowInsecureCertificates": true,
        "basicAuth": { "username": "test", "password": "test" },
        "body": "{\"fakeContent\":true}",
        "bodyType": "application/json",
        "cookies": "name1=value1;name2=value2;",
        "deviceIds": ["laptop_large"],
        "followRedirects": true,
        "headers": { "<NEW_HEADER>": "<NEW_VALUE>" },
            "locations": ["aws:us-west-1"],
        "retry": { "count": 2, "interval": 300 },
        "executionRule": "blocking",
        "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
        "variables": { "titleVariable": "new value" },
        "pollingTimeout": 180000
    },
    "proxy": {
      "auth": {
        "username": "login",
        "password": "pwd"
      },
      "host": "127.0.0.1",
      "port": 3128,
      "protocol": "http"
    },
    "subdomain": "subdomainname",
    "tunnel": true
}
{{< /code-block >}}

### Configure tests

By default, the client automatically discovers and runs all tests specified in `**/*.synthetics.json` files. This path can be configured in the [global configuration file](#setup-a-client). 

These files have a `tests` key which contains an array of objects with the IDs of the tests to run and any potential test configuration overrides.

For example: 

{{< code-block lang="json" filename="Basic Test Configuration File" disable_copy="false" collapsible="true" >}}
{
    "tests": [
        {
            "id": "<TEST_PUBLIC_ID>"
        },
        {
            "id": "<TEST_PUBLIC_ID>"
        }
    ]
}
{{< /code-block >}}

#### Additional configuration

The default configurations used for the tests are the original tests' configurations, which are visible in the UI or by [getting your tests' configurations from the API][4].

However, in the context of your CI deployment, you may decide to override some or all of your test parameters with the overrides below. To define overrides for all of your tests, set the same parameters at the [global configuration file](#setup-a-client) level.

`allowInsecureCertificates`
: **Type**: boolean<br>
Disable certificate checks in HTTP tests.

`basicAuth`
: **Type**: object<br>
Credentials to provide in case a basic authentication is encountered in HTTP or browser tests.
  - `username`: string. Username to use in basic authentication.
  - `password`: string. Password to use in basic authentication.

`body`
: **Type**: string<br>
Data to send in HTTP tests.

`bodyType`
: **Type**: string<br>
Type of the data sent in HTTP tests.

`cookies`
: **Type**: string<br>
Use provided string as cookie header in HTTP or browser tests.

`deviceIds`
: **Type**: array<br>
List of devices on which to run the browser test.

`followRedirects`
: **Type**: boolean<br>
Indicates whether to follow redirections in HTTP tests.

`headers`
: **Type**: object<br>
Headers to replace in the HTTP or browser test. This object should contain the name of the header to replace as keys and the new value of the header as values.

`locations`
: **Type**: array<br>
List of locations from which the test runs.

`retry`
: **Type**: object<br>
Retry policy for the test.
  - `count`: integer. Number of attempts to perform in case of test failure.
  - `interval`: integer. Interval between the attempts (in milliseconds).

`executionRule`
: **Type**: string<br>
Execution rule of the test that defines the CLI behavior in case of a failing test:
  - `blocking`: The CLI returns an error if the test fails.
  - `non_blocking`: The CLI only prints a warning if the test fails.
  - `skipped`: The test is not executed at all.

`startUrl`
: **Type**: string<br>
New start URL to provide to the HTTP or browser test.

`variables`
: **Type**: object<br>
Variables to replace in the test. This object should contain the name of the variable to replace as keys and the new value of the variable as values.

`pollingTimeout`
: **Type**: integer<br>
The duration in milliseconds after which `datadog-ci` stops polling for test results. The default is 120,000 ms. At the CI level, test results completed after this duration are considered failed.

**Note**: The test's overrides take precedence over global overrides.

{{< code-block lang="json" filename="Advanced Test Configuration File" disable_copy="false" collapsible="true" >}}
{
    "tests": [
        {
            "id": "<TEST_PUBLIC_ID>",
            "config": {
                "allowInsecureCertificates": true,
                "basicAuth": { "username": "test", "password": "test" },
                "body": "{\"fakeContent\":true}",
                "bodyType": "application/json",
                "cookies": "name1=value1;name2=value2;",
                "deviceIds": ["laptop_large"],
                "followRedirects": true,
                "headers": { "<NEW_HEADER>": "<NEW_VALUE>" },
            "locations": ["aws:us-west-1"],
                "retry": { "count": 2, "interval": 300 },
                "executionRule": "skipped",
                "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
                "variables": { "titleVariable": "new value" },
                "pollingTimeout": 180000
            }
        }
    ]
}

{{< /code-block >}}

#### Execution rule

Use the drop-down menu next to **CI Execution** to define the execution rule for each test at the test level.

{{< img src="synthetics/cicd_integrations/execution_rule.mp4" alt="CI Execution Rule" video="true" width="100%">}}

The execution rule associated with the test is the most restrictive one in the configuration file. The options range from most to least restrictive: `skipped`, `non_blocking`, and `blocking`. For example, if your test is configured as `skipped` in the UI but `blocking` in the configuration file, it is `skipped` when your test runs.

#### Starting URL

`URL`
: Test's original starting URL <br>
**Example**: `https://www.example.org:81/path/to/something?abc=123#target`

`DOMAIN`
: Test's domain name<br>
**Example**: `example.org`

`HASH`
: Test's hash<br>
**Example**: `#target`

`HOST`
: Test's host<br>
**Example**: `www.example.org:81`

`HOSTNAME`
: Test's hostname<br>
**Example**: `www.example.org`

`ORIGIN`
: Test's origin<br>
**Example**: `https://www.example.org:81`

`PARAMS`
: Test's query parameters<br>
**Example**: `?abc=123`

`PATHNAME`
: Test's URl path<br>
**Example**: `/path/to/something`

`PORT`
: Test's host port<br>
**Example**: `81`

`PROTOCOL`
: Test's protocol<br>
**Example**: `https:`

`SUBDOMAIN`
: Test's sub domain<br>
**Example**: `www`

Whether you use Synthetic tests to control your CI/CD deployments in production or staging, you can run Synthetic tests against a generated staging URL instead of in production by setting local environment variables in your test's starting URL. 

To trigger an existing Synthetics test on a staging endpoint instead of in production, set the `$SUBDOMAIN` environment variable to `staging-example` and the `$PORT` environment variable to a port used for staging. Your Synthetic tests run against the generated staging URL instead of running in production. 

For example, you can write `https://app.datadoghq.com/synthetics/details/abc-123-zyx?live=1h#test-results` as:

* `{{PROTOCOL}}//{{SUBDOMAIN}}.{{DOMAIN}}:{{PORT}}{{PATHNAME}}{{PARAMS}}{{HASH}}`
* `{{PROTOCOL}}//{{HOST}}{{PATHNAME}}{{PARAMS}}{{HASH}}`
* `{{URL}}`

**Note:** If you have environment variables with names corresponding to one of the reserved variables above, your environment variables are ignored and replaced with the corresponding component parsed from your test's `startUrl`. 

### Run tests

You can decide to have the CLI auto-discover all your `**/*.synthetics.json` Synthetic tests (or all the tests associated to the path specified in your [global configuration file](#setup-a-client)) or to specify the tests you want to run using the `-p,--public-id` flag.

Run tests by executing the CLI:

{{< tabs >}}
{{% tab "Yarn" %}}

```bash
yarn datadog-ci synthetics run-tests
```

**Note**: If you are launching your tests with a custom global configuration file, append your command with `--config <PATH_TO_GLOBAL_CONFIG_FILE`.

{{% /tab %}}
{{% tab "NPM" %}}

Add the following to your `package.json`:

```json
{
  "scripts": {
    "datadog-ci-synthetics": "datadog-ci synthetics run-tests"
  }
}
```

Then, run:

```bash
npm run datadog-ci-synthetics
```

**Note**: If you are launching your tests with a custom global configuration file, append the command associated to your `datadog-ci-synthetics` script with `--config <PATH_TO_GLOBAL_CONFIG_FILE`.

{{% /tab %}}
{{< /tabs >}}

### Use the testing tunnel

The [@datadog/datadog-ci][1] NPM package also comes with secure tunnelling, allowing you to trigger Synthetic tests on your internal applications. 

The testing tunnel creates an end-to-end encrypted HTTP proxy between your infrastructure and Datadog that allows all test requests sent through the CLI to be automatically routed through the `datadog-ci` client. 

For more information, see [Testing Tunnel][3].

### Visualize test results

#### In your CI

You can see the outcome of test executions directly in your CI as your tests are being executed.

{{< img src="synthetics/cicd_integrations/successful_test_result.png" alt="Successful Test Result"  style="width:100%;">}}

You can identify what caused a test to fail by looking at the execution logs and searching for causes of the failed assertion:

{{< img src="synthetics/cicd_integrations/failed_test_result.png" alt="Failed Test Result" style="width:100%;">}}

#### In the Datadog application

You can also see your CI test results listed in the [CI Results Explorer][5] and on test details pages:

{{< img src="synthetics/ci_results_explorer/ci_results_explorer.png" alt="CI Results Explorer" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/TooTallNate/node-proxy-agent
[3]: /synthetics/testing_tunnel/
[4]: /api/latest/synthetics/#get-a-test-configuration
[5]: /synthetics/ci_results_explorer
