---
title: Synthetics CI
kind: documentation
description: Run Synthetics tests on-demand in your CI.
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "/synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
---

<div class="alert alert-warning">
This feature is in private beta.
</div>

On top of executing your tests at predefined intervals, you can also execute Datadog Synthetics tests on-demand using the dedicated API endpoints. You can execute Datadog Synthetics tests in your continuous integration (CI) pipelines, enabling you to block the deployment of branches which would break your key features and endpoints.

This function allows you to avoid spending time fixing issues on production, and to catch bugs and regressions earlier in the process.

On top of these API endpoints, Datadog provides and maintains a command line interface (CLI), allowing you to easily integrate Datadog Synthetics with your CI tooling.

## API usage

The trigger endpoint provides the list of triggered checks alongside their result identifiers. A polling endpoint is available to obtain the full results of the tests if they are available.

### Trigger tests endpoint

The test triggering endpoint supports starting up to 50 tests in one request.

{{< site-region region="us" >}}

* **Endpoint**: `https://api.datadoghq.com/api/v1/synthetics/tests/trigger/ci`
* **Method**: `POST`
* **Argument**: A JSON object containing the list of all tests to trigger and their configuration override.

{{< /site-region >}}
{{< site-region region="eu" >}}

* **Endpoint**: `https://api.datadoghq.eu/api/v1/synthetics/tests/trigger/ci`
* **Method**: `POST`
* **Argument**: A JSON object containing the list of all tests to trigger and their configuration override.

{{< /site-region >}}

#### Request data structure

```json
{
    "tests": [TEST_TO_TRIGGER, TEST_TO_TRIGGER, ...]
}
```

The `TEST_TO_TRIGGER` objects are composed of the `public_id` (required) of the test to trigger and optional configuration overrides ([see below](#configure-tests) for a description of each field).

The public identifier of a test can be either the identifier of the test found in the URL of a test details page (for `https://app.datadoghq.com/synthetics/details/abc-def-ghi`, it would be `abc-def-ghi`) or the full URL to the details page (that is, `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

#### Example request

{{< site-region region="us" >}}

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
}' "https://api.datadoghq.com/api/v1/synthetics/tests/trigger/ci"
```

{{< /site-region >}}
{{< site-region region="eu" >}}


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
}' "https://api.datadoghq.eu/api/v1/synthetics/tests/trigger/ci"
```

{{< /site-region >}}


#### Example response

```json
{
  "results": [
    {
      "result_id": "0123456789012345678",
      "public_id": "abc-def-ghi",
      "location": 1
    },
  ],
  "triggered_check_ids": [
    "abc-def-ghi"
  ]
}
```

### Poll results endpoint

{{< site-region region="us" >}}

* **Endpoint**: `https://api.datadoghq.com/api/v1/synthetics/tests/poll_results`
* **Method**: `GET`
* **Parameters**: A JSON array containing the list of result identifiers to obtain results from.

{{< /site-region >}}
{{< site-region region="eu" >}}

* **Endpoint**: `https://api.datadoghq.eu/api/v1/synthetics/tests/poll_results`
* **Method**: `GET`
* **Parameters**: A JSON array containing the list of result identifiers to obtain results from.

{{< /site-region >}}

#### Example request

{{< site-region region="us" >}}

```bash
#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -G \
    "https://api.datadoghq.com/api/v1/synthetics/tests/poll_results" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "result_ids=[%220123456789012345678%22]"
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```bash
#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -G \
    "https://api.datadoghq.eu/api/v1/synthetics/tests/poll_results" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "result_ids=[%220123456789012345678%22]"
```

{{< /site-region >}}

#### Example response

```json
{
  "results": [
    {
      "check_id": "123456",
      "timestamp": 1585841351642,
      "orgID": 2,
      "result": {
        "unhealthy": false,
        "eventType": "finished",
        "timings": {
          "firstByte": 14.7,
          "tcp": 11.6,
          "ssl": 45.7,
          "dns": 12.484235048294067,
          "download": 0.2,
          "total": 84.7
        },
        "mainDC": "us1.prod",
        "runType": 2,
        "httpStatusCode": 200,
        "responseSize": 9201,
        "healthCheckRatio": 1
      },
      "dc_id": 1,
      "resultID": "0123456789012345678"
    }
  ]
}
```

## CLI usage

### Package installation

The package is published privately under [@datadog/datadog-ci][1] in the NPM registry.

Until it is made public, an NPM token is needed to access it. If you do not have an NPM token to access the package, reach out to [Datadog support][2].

{{< tabs >}}
{{% tab "NPM" %}}

Set the below in your `~/.npmrc` file:

```conf
registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=<TOKEN>
```

Then, install the package through NPM:

```bash
npm install --save-dev @datadog/datadog-ci
```

{{% /tab %}}
{{% tab "Yarn" %}}

In Yarn v2, you can scope the token to the `@datadog` scope in the `.yarnrc` file:

```yaml
npmScopes:
  datadog:
    npmRegistryServer: "https://registry.npmjs.org"
    npmAuthToken: "<TOKEN>"
```

Then, install the package through Yarn:

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

     You can also create a JSON configuration file to specify more advanced options. The path to this global configuration file can be set using the flag `--config` [when launching your tests](#running-tests). If the name of your global configuration file is set to `datadog-ci.json`, it defaults to it.

    * **apiKey**: The API key used to query the Datadog API.
    * **appKey**: The application key used to query the Datadog API.
    * **datadogSite**: The Datadog instance to which request is sent (choices are `datadoghq.com` or `datadoghq.eu`). The default is `datadoghq.com`.
    * **files**: Glob pattern to detect synthetics tests config files.
    * **global**: Overrides of synthetics tests applied to all tests ([see below for description of each field](#configure-tests)).
    * **proxy**: The proxy to be used for outgoing connections to Datadog. `host` and `port` keys are mandatory arguments, `protocol` key defaults to `http`. Supported values for `protocol` key are `http`, `https`, `socks`, `socks4`, `socks4a`, `socks5`, `socks5h`, `pac+data`, `pac+file`, `pac+ftp`, `pac+http`, `pac+https`. The library used to configure the proxy is [proxy-agent][3] library.
    * **subdomain**: The name of the custom subdomain set to access your Datadog application. If the URL used to access Datadog is `myorg.datadoghq.com` the `subdomain` value then needs to be set to `myorg`.
    * **timeout**: Duration after which synthetics tests are considered failed (in milliseconds).

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
            "variables": { "titleVariable": "new value" }
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
        "timeout": 120000
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

* **allowInsecureCertificates**: (_Boolean_) Disable certificate checks in API tests.
* **basicAuth**: (_object_) Credentials to provide in case a basic authentication is encountered.
     * **username**: (_string_) Username to use in basic authentication.
     * **password**: (_string_) Password to use in basic authentication.
* **body**: (_string_) Data to send in a synthetics API test.
* **bodyType**: (_string_) Type of the data sent in a synthetics API test.
* **cookies**: (_string_) Use provided string as cookie header in API or browser test.
* **deviceIds**: (_array_) List of devices on which to run the browser test.
* **followRedirects**: (_Boolean_) Indicates whether to follow HTTP redirections in API tests.
* **headers**: (_object_) Headers to replace in the test. This object should contain, as keys, the name of the header to replace and, as values, the new value of the header.
* **locations**: (_array_) List of locations from which the test should be run.
* **retry**: (_object_) Retry policy for the test:
     * **count**: (_integer_) Number of attempts to perform in case of test failure.
     * **interval**: (_integer_) Interval between the attempts (in milliseconds).
* **executionRule**: (_string_) Execution rule of the test: defines the behavior of the CLI in case of a failing test:
     * **blocking**: The CLI returns an error if the test fails.
     * **non_blocking**: The CLI only prints a warning if the test fails.
     * **skipped**: The test is not executed at all.
* **startUrl**: (_string_) New start URL to provide to the test.
* **variables**: (_object_) Variables to replace in the test. This object should contain, as keys, the name of the variable to replace and, as values, the new value of the variable.

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
                "variables": { "titleVariable": "new value" }
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

| Environment variable | Description                  | Example                                                |
|----------------------|------------------------------|--------------------------------------------------------|
| `URL`                | Test's original starting URL | `https://www.example.org:81/path/to/something?abc=123` |
| `DOMAIN`             | Test's domain name           | `example.org`                                          |
| `HOST`               | Test's host                  | `www.example.org:81`                                   |
| `HOSTNAME`           | Test's hostname              | `www.example.org`                                      |
| `ORIGIN`             | Test's origin                | `https://www.example.org:81`                           |
| `PARAMS`             | Test's query parameters      | `?abc=123`                                             |
| `PATHNAME`           | Test's URl path              | `/path/to/something`                                   |
| `PORT`               | Test's host port             | `81`                                                   |
| `PROTOCOL`           | Test's protocol              | `https:`                                               |
| `SUBDOMAIN`          | Test's sub domain            | `www`                                                  |

For instance, if your test's starting URL is `https://www.example.org:81/path/to/something?abc=123`, it can be written as:

* `{{PROTOCOL}}//{{SUBDOMAIN}}.{{DOMAIN}}:{{PORT}}{{PATHNAME}}{{PARAMS}}`
* `{{PROTOCOL}}//{{HOST}}{{PATHNAME}}{{PARAMS}}`
* `{{URL}}`

### Running tests

You can decide to have the CLI autodiscover all your `**/*.synthetics.json` Synthetics tests (or all the tests associated to the path specified in your [global configuration file](#setup-the-client)) or to specify the tests you want to run using the `-p,--public-id` flag.

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

[1]: https://www.npmjs.com/login?next=/package/@datadog/datadog-ci
[2]: /help/
[3]: https://github.com/TooTallNate/node-proxy-agent
[4]: /api/v1/synthetics/#get-test
