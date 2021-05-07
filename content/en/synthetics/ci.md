---
title: Synthetic CI/CD Testing
kind: documentation
description: Run Synthetic tests on-demand in your CI/CD pipelines.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Synthetic tests into your CI/CD pipeline"
- link: "https://learn.datadoghq.com/course/view.php?id=37"
  tag: "Learning Center"
  text: "Learn how to run Synthetic tests in CI/CD pipelines"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"

---

In addition to running tests at predefined intervals, you can also run Datadog Synthetic tests on-demand using API endpoints. You can run Datadog Synthetic tests in your continuous integration (CI) pipelines, letting you block the deployment of branches that would break your product.

Synthetic CI/CD testing can also be used to **run tests as part of your CD process**, evaluating the state of your production application immediately after a deployment finishes. This lets you detect potential regressions that could impact your users—and automatically trigger a rollback whenever a critical test fails.

This function allows you to avoid spending time fixing issues on production, and to catch bugs and regressions earlier in the process.

On top of these API endpoints, Datadog provides and maintains a command line interface (CLI), allowing you to easily integrate Datadog Synthetic tests with your CI tooling. Synthetic CI/CD testing is open-source, and its source code is available on GitHub at [DataDog/datadog-ci][1].

## API usage

The trigger endpoint provides the list of triggered checks alongside their result identifiers. A polling endpoint is available to obtain the full results of the tests if they are available.

### Trigger tests endpoint

The test triggering endpoint supports starting up to 50 tests in one request.

* **Endpoint**: `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/trigger/ci`
* **Method**: `POST`
* **Argument**: A JSON object containing the list of all tests to trigger and their configuration override.

#### Request data structure

```json
{
    "tests": [TEST_TO_TRIGGER, TEST_TO_TRIGGER, ...]
}
```

The `TEST_TO_TRIGGER` objects are composed of the `public_id` (required) of the test to trigger and optional configuration overrides ([see below](#configure-tests) for a description of each field).

The public identifier of a test can be either the identifier of the test found in the URL of a test details page (for `https://app.datadoghq.com/synthetics/details/abc-def-ghi`, it would be `abc-def-ghi`) or the full URL to the details page (that is, `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

#### Example request

```bash
#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
-H 'Content-Type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "tests": [
        {
            "public_id": "abc-def-ghi",
            "allowInsecureCertificates": true,
            "basicAuth": { "username": "test", "password": "test" },
            "body": "{\"fakeContent\":true}",
            "bodyType": "application/json",
            "cookies": "name1=value1;name2=value2;",
            "deviceIds": ["laptop_large"],
            "followRedirects": true,
            "headers": { "NEW_HEADER": "NEW VALUE" },
            "locations": ["aws:us-west-1"],
            "retry": { "count": 2, "interval": 300 },
            "startUrl": "http://new.url/",
            "variables": { "titleVariable": "new value" }
        }
    ]
}' "https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/trigger/ci"
```

#### Example response

```json
{
  "batch_id": null,
  "results": [
    {
      "result_id": "0123456789012345678",
      "public_id": "abc-def-ghi",
      "location": 30019
    }
  ],
  "triggered_check_ids": [
    "abc-def-ghi"
  ],
  "locations": [
    {
      "display_name": "N. California (AWS)",
      "name": "aws:us-west-1",
      "region": "Americas",
      "is_active": true,
      "is_public": true,
      "id": 30019
    }
  ]
}
```

### Poll results endpoint

* **Endpoint**: `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/poll_results`
* **Method**: `GET`
* **Parameters**: A JSON array containing the list of result identifiers to obtain results from.

#### Example request

```bash
#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -G \
    "https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/poll_results" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "result_ids=[220123456789012345678]"
```

#### Example response

{{< tabs >}}

{{% tab "API Test" %}}

```json
{
  "results": [
    {
      "check": {
        "config": {
          "assertions": [
            {
              "operator": "lessThan",
              "target": 2000,
              "type": "responseTime"
            }
          ],
          "configVariables": [],
          "request": {
            "basicAuth": {
              "password": "test",
              "username": "test"
            },
            "body": "{\"fakeContent\":true}",
            "headers": {
              "Content-Type": "application/json",
              "Cookie": "name1=value1;name2=value2;",
              "NEW_HEADER": "NEW VALUE"
            },
            "method": "GET",
            "timeout": 30,
            "url": "http://new.url/"
          }
        },
        "locations": [
          30019
        ],
        "options": {
          "allow_insecure": true,
          "follow_redirects": true,
          "min_failure_duration": 0,
          "min_location_failed": 1,
          "monitor_options": {
            "include_tags": true,
            "locked": false,
            "new_host_delay": 300,
            "notify_audit": false,
            "notify_no_data": false,
            "renotify_interval": 0
          },
          "retry": {
            "count": 2,
            "interval": 300
          },
          "tick_every": 60
        },
        "subtype": "http",
        "type": "api"
      },
      "check_id": "7654321",
      "check_version": 2,
      "config_override": {
        "allowInsecureCertificates": true,
        "basicAuth": {
          "password": "test",
          "username": "test"
        },
        "body": "{\"fakeContent\":true}",
        "bodyType": "application/json",
        "cookies": "name1=value1;name2=value2;",
        "deviceIds": [
          "laptop_large"
        ],
        "followRedirects": true,
        "headers": {
          "Content-Type": "application/json",
          "Cookie": "name1=value1;name2=value2;",
          "NEW_HEADER": "NEW VALUE"
        },
        "locations": [
          "aws:us-west-1"
        ],
        "public_id": "abc-def-ghi",
        "retry": {
          "count": 2,
          "interval": 300
        },
        "startUrl": "http://example.org/",
        "variables": {
          "titleVariable": "new value"
        }
      },
      "dc_id": 30019,
      "orgID": 2,
      "result": {
        "assertionResults": [
          {
            "actual": 27.92,
            "valid": true
          }
        ],
        "dnsServer": "8.8.8.8",
        "eventType": "finished",
        "healthCheckRatio": 1,
        "httpStatusCode": 400,
        "mainDC": "us1.prod",
        "passed": true,
        "resolvedIp": "93.184.216.34",
        "responseSize": 349,
        "runType": 2,
        "subtype": "http",
        "timings": {
          "dns": 24.6,
          "download": 0.1,
          "firstByte": 1.4,
          "tcp": 1.8,
          "total": 27.9
        },
        "unhealthy": false
      },
      "resultID": "220123456789012345678",
      "timestamp": 1612404331304
    }
  ]
}
```

{{% /tab %}}

{{% tab "Browser Test" %}}

```json
{
  "results": [
    {
      "check_id": "123456",
      "timestamp": 1601639904704,
      "orgID": 2,
      "result": {
        "runType": 2,
        "artifactsBucketKey": "2/e2e-tests/abc-def-ghi/results/17221670732431167/chrome.laptop_large/artifacts__1601639913277.json",
        "browserType": "chrome",
        "eventType": "finished",
        "stepDetails": [
          {
            "browserErrors": [],
            "skipped": false,
            "description": "Navigate to start URL",
            "warnings": [],
            "url": "about:blank",
            "value": "https://example.com",
            "duration": 1002,
            "allowFailure": false,
            "screenshotBucketKey": "2/e2e-tests/abc-def-ghi/results/17221670732431167/chrome.laptop_large/step-0__1601639913294.jpeg",
            "type": "goToUrlAndMeasureTti",
            "stepId": -1
          },
          {
            "browserErrors": [],
            "stepElementUpdates": {
              "version": 1,
              "multiLocator": {
                "ab": "/*[local-name()=\"html\"][1]/*[local-name()=\"body\"][1]/*[local-name()=\"div\"][1]/*[local-name()=\"h1\"][1]",
                "co": "[{\"text\":\"example domain\",\"textType\":\"directText\"}]",
                "cl": "/*[local-name()=\"html\"]/*[local-name()=\"body\"]/*[local-name()=\"div\"][1]/*[local-name()=\"h1\"][1]",
                "at": "/*[local-name()=\"html\"]/*[local-name()=\"body\"]/*[local-name()=\"div\"][1]/*[local-name()=\"h1\"][1]",
                "clt": "/descendant::*[text()[normalize-space(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞŸŽŠŒ', 'abcdefghijklmnopqrstuvwxyzàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿžšœ')) = \"example domain\"]]",
                "ro": "//*[local-name()=\"h1\"]"
              }
            },
            "skipped": false,
            "description": "Test heading \"Example Domain\" content",
            "url": "https://www.example.com/",
            "checkType": "contains",
            "value": "Example Domain",
            "duration": 204,
            "allowFailure": false,
            "screenshotBucketKey": "2/e2e-tests/abc-def-ghi/results/17221670732431167/chrome.laptop_large/step-1__1601639913410.jpeg",
            "type": "assertElementContent",
            "stepId": 2275176
          }
        ],
        "browserVersion": "84.0.4147.135",
        "mainDC": "us1.prod",
        "timeToInteractive": 269,
        "device": {
          "name": "Laptop Large",
          "height": 1100,
          "width": 1440,
          "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
          "id": "chrome.laptop_large",
          "isMobile": false,
          "browser": "chrome"
        },
        "passed": true,
        "duration": 1206,
        "startUrl": "https://www.example.com",
        "metadata": {}
      },
      "dc_id": 30005,
      "resultID": "17221670732431167",
      "metadata": {}
    }
  ]
}
```

{{% /tab %}}

{{< /tabs >}}

## CLI usage

### Package installation

The package is published under [@datadog/datadog-ci][2] in the NPM registry.

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

### Setup the client

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

     The global JSON configuration file can specify additional advanced options. Specify the path to this file using the flag `--config` [when launching your tests](#running-tests). If the name of your global configuration file is set to `datadog-ci.json`, it defaults to it.

In the global configuration file, you can configure the following options: 

`apiKey`
: The API key used to query the Datadog API.

`appKey`
: The application key used to query the Datadog API.

`datadogSite`
: The Datadog instance to which request is sent. The default is `datadoghq.com`. Your Datadog site is {{< region-param key="dd_site" code="true" >}}.

`files`
: Glob pattern to detect synthetic tests config files.

`global`
: Overrides of synthetic tests applied to all tests ([see below for description of each field](#configure-tests)).

`proxy`
: The proxy to be used for outgoing connections to Datadog. `host` and `port` keys are mandatory arguments, `protocol` key defaults to `http`. Supported values for `protocol` key are `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http`, `pac+https`. The library used to configure the proxy is [proxy-agent][3] library.

`subdomain`
: The name of the custom subdomain set to access your Datadog application. If the URL used to access Datadog is `myorg.datadoghq.com` the `subdomain` value then needs to be set to `myorg`.

**Example global configuration file**:

```json
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
        "executionRule": "skipped",
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
    "subdomain": "subdomainname"
}
```

### Configure tests

By default, the client automatically discovers and runs all tests specified in `**/*.synthetics.json` files (the path can be configured in the [global configuration file](#setup-the-client). These files have a `tests` key, which contains an array of objects with the IDs of the tests to run and any potential configuration overrides for these tests.

**Example basic test configuration file**:

```json
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
```

#### Further configuration

The default configurations used for the tests are the original tests' configurations (visible in the UI or when [getting your tests' configurations from the API][4]).

However, in the context of your CI deployment, you can optionally decide to override some (or all) of your tests parameters by using the below overrides. If you want to define overrides for all of your tests, these same parameters can be set at the [global configuration file](#setup-the-client) level.


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
Headers to replace in the HTTP or browser test. This object should contain, as keys, the name of the header to replace and, as values, the new value of the header.

`locations`
: **Type**: array<br>
List of locations from which the test should be run.

`retry`
: **Type**: object<br>
Retry policy for the test:
  - `count`: integer. Number of attempts to perform in case of test failure.
  - `interval`: integer. Interval between the attempts (in milliseconds).

`executionRule`
: **Type**: string<br>
Execution rule of the test: defines the behavior of the CLI in case of a failing test:
  - `blocking`: The CLI returns an error if the test fails.
  - `non_blocking`: The CLI only prints a warning if the test fails.
  - `skipped`: The test is not executed at all.

`startUrl`
: **Type**: string<br>
New start URL to provide to the HTTP or browser test.

`variables`
: **Type**: object<br>
Variables to replace in the test. This object should contain, as keys, the name of the variable to replace and, as values, the new value of the variable.

`pollingTimeout`
: **Type**: integer<br>
Duration after which synthetic tests are considered failed (in milliseconds).

**Note**: Tests' overrides take precedence over global overrides.

**Example advanced test configuration file**:

```json
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
```

#### Execution rule

The _execution rule_ of each test can also be defined in-app, at the test level. Use the drop-down menu next to **CI Execution**.

{{< img src="synthetics/ci/execution_rule.mp4" alt="CI Execution Rule" video="true" width="100%">}}

The execution rule associated with the test is always the most restrictive one that was set in the configuration file. From the most restrictive to the least restrictive: `skipped`, `non_blocking`, `blocking`. For example, if your test is configured to be `skipped` in the UI but to `blocking` in the configuration file, it is `skipped` when running your tests.

#### Start URL

You can configure on which url your test starts by providing a `startUrl` to your test object and build your own starting URL using any part of your test's original starting URL and the following environment variables:


`URL`
: Test's original starting URL <br>
**Example**: `https://www.example.org:81/path/to/something?abc=123`

`DOMAIN`
: Test's domain name<br>
**Example**: `example.org`

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

For instance, if your test's starting URL is `https://www.example.org:81/path/to/something?abc=123`, it can be written as:

* `{{PROTOCOL}}//{{SUBDOMAIN}}.{{DOMAIN}}:{{PORT}}{{PATHNAME}}{{PARAMS}}`
* `{{PROTOCOL}}//{{HOST}}{{PATHNAME}}{{PARAMS}}`
* `{{URL}}`

### Running tests

You can decide to have the CLI autodiscover all your `**/*.synthetics.json` Synthetic tests (or all the tests associated to the path specified in your [global configuration file](#setup-the-client)) or to specify the tests you want to run using the `-p,--public-id` flag.

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

## Visualize test results

### In your CI

You can see the outcome of test executions directly in your CI as your tests are being executed.

{{< img src="synthetics/ci/successful_test_result.png" alt="Successful Test Result"  style="width:80%;">}}

You can identify what caused a test to fail by looking at the execution logs and searching for causes of the failed assertion:

{{< img src="synthetics/ci/failed_test_result.png" alt="Failed Test Result" style="width:80%;">}}

### In Datadog application

You can also see the results of your tests listed on your Datadog test details page:

{{< img src="synthetics/ci/test_results.png" alt="Successful Test Result" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/TooTallNate/node-proxy-agent
[4]: /api/v1/synthetics/#get-test
