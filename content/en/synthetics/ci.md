---
title: Synthetics CI
kind: documentation
description: Synthetics CI
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
- link: "synthetics/browser_tests"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "synthetics/api_tests"
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

* **Endpoint**: `https://api.datadoghq.com/api/v1/synthetics/tests/trigger/ci`
* **Method**: `POST`
* **Argument**: A JSON object containing the list of all tests to trigger and their configuration override.

#### Request data structure

```json
{
    "tests": [TEST_TO_TRIGGER, TEST_TO_TRIGGER, ...]
}
```

The `TEST_TO_TRIGGER` objects are composed of the `public_id` (required) of the test to trigger and optional configuration overrides ([see below][#adding-and-running-tests] for description of each field).

The public identifier of a test can be either the identifier of the test found in the URL of a test details page (for `https://app.datadoghq.com/synthetics/details/abc-def-ghi`, it would be `abc-def-ghi`) or the full URL to the details page (that is, `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

#### Example request

```bash
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
            "variables": { "titleVariable": "new title" }
        }
    ]
}' "https://api.datadoghq.com/api/v1/synthetics/tests/trigger/ci"
```

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

* **Endpoint**: `https://api.datadoghq.com/api/v1/synthetics/tests/poll_results`
* **Method**: `GET`
* **Parameters**: A JSON array containing the list of result identifiers to obtain results from.

#### Example request

```bash
curl -G \
    "https://api.datadoghq.com/api/v1/synthetics/tests/poll_results" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "result_ids=[%220123456789012345678%22]"
```

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

```
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

### Adding and running tests

The configuration of synthetics test occurs in `**/*.synthetics.json` (configurable in the global configuration file). These files have a `tests` key, which contains an array of objects with the IDs of the tests to run and any configuration overrides for these tests.

**Example configuration file**:

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
                "headers": { "NEW_HEADER": "NEW VALUE" },
            "locations": ["aws:us-west-1"],
                "retry": { "count": 2, "interval": 300 },
                "skip": true,
                "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
                "variables": { "titleVariable": "new title" },
            }
        }
    ]
}
```

#### Running tests

Run tests by executing the CLI:

{{< tabs >}}
{{% tab "Yarn" %}}

```bash
yarn datadog-ci synthetics run-tests
```

{{% /tab %}}
{{% tab "Script" %}}

Add the following to your `package.json`:

```json
{
  ...
  "scripts": {
    "datadog-ci-synthetics": "datadog-ci synthetics run-tests",
  },
  "devDependencies": {
    "@datadog/datadog-ci": "7.4.5",
  }
}
```

Then, run:

```
npm run datadog-ci-synthetics
```

{{% /tab %}}
{{< /tabs >}}

#### Further configuration

More configuration options are available in a `datadog-ci.json` file containing a JSON object with the following keys:

* **apiKey**: The API key used to query the Datadog API.
* **appKey**: The application key used to query the Datadog API.
* **datadogSite**: The Datadog instance to which request is sent (choices are datadoghq.com or datadoghq.eu).
* **files**: Glob pattern to detect synthetics tests config files.
* **global**: Overrides of synthetics tests applied to all tests.
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
    * **skip**: (_string_) Execution rule of the test: defines the behavior of the CLI in case of a failing test:
        * **blocking**: The CLI returns an error if the test fails.
        * **non_blocking**: The CLI only prints a warning if the test fails.
        * **skipped**: The test is not executed at all.
    * **startUrl**: (_string_) New start URL to provide to the test.
    * **variables**: (_object_) Variables to replace in the test. This object should contain, as keys, the name of the variable to replace and, as values, the new value of the variable.
* **timeout**: Duration after which synthetics tests are considered failed (in milliseconds).

The path of the global configuration file can be set using the flag `--config`.

**Note**: The _execution rule_ of each test can also be defined in-app, at the test level. Use the drop-down menu next to **CI Execution**.

The execution rule associated with the test is always the most restrictive one that was set in the configuration file. From the most restrictive to the least restrictive: `skipped`, `non_blocking`, `blocking`. For example, if your test is configured to be `skipped` in the UI but to `blocking` in the configuration file, it is `skipped` when running your tests. 

**Example configuration file**:

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
        "headers": { "NEW_HEADER": "NEW VALUE" },
        "locations": ["aws:us-east-1"],
        "retry": { "count": 2, "interval": 300 },
        "skip": true,
        "startUrl": "{{URL}}?static_hash={{STATIC_HASH}}",
        "variables": { "titleVariable": "new title" },
    },
    "timeout": 120000,
}

```


[1]: https://www.npmjs.com/login?next=/package/@datadog/datadog-ci
[2]: /help
