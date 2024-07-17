---
dependencies:
- https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests/blob/main/README.md
title: Continuous Testing and Bitrise
---
![GitHub Release](https://img.shields.io/github/v/release/DataDog/synthetics-test-automation-bitrise-step-run-tests)
[![Build Status](https://app.bitrise.io/app/7846c17b-8a1c-4fc7-aced-5f3b0b2ec6c4/status.svg?token=480MdFpG78E6kZASg5w1dw&branch=main)](https://app.bitrise.io/app/7846c17b-8a1c-4fc7-aced-5f3b0b2ec6c4)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Overview

With the `synthetics-test-automation-bitrise-step-run-tests` step, you can run Synthetic tests during your Bitrise CI, ensuring that all your teams using Bitrise can benefit from Synthetic tests at every stage of the software lifecycle. This step uses the [Datadog CI Synthetics command][2].

## Setup

This step is not available on the official Bitrise Step Library.
To get started:

1. Add the following git URL to your workflow. See the [official Bitrise documentation][3] on how to do that though the Bitrise app. You can also configure it locally by referencing the git URL in your `bitrise.yml` file.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.0.1:
```

2. Add your API and application keys to your [secrets in Bitrise][4].
3. [Configure your step inputs][5]. You can also configure them in your `bitrise.yml` file. The only required inputs are the two secrets you configured earlier. For a comprehensive list of inputs, see the [Inputs section](#inputs).

## How to use this step locally

You can run this step directly using the [Bitrise CLI][6].

To run this step locally:

1. Open your terminal or command line.
2. `git clone` the [Bitrise repository][6].
3. `cd` into the directory of the step (the one you just `git clone`d).
4. Create a `.bitrise.secrets.yml` file in the same directory of `bitrise.yml`. The `.bitrise.secrets.yml` file is a Git-ignored file, so you can store your secrets in it.
5. Check the `bitrise.yml` file for any secret you should set in `.bitrise.secrets.yml`.
6. Once you have the required secret parameters in your `.bitrise.secrets.yml` file, run this step with the [Bitrise CLI][6]: `bitrise run test`.

An example `.bitrise.secrets.yml` file:

```yml
envs:
- A_SECRET_PARAM_ONE: the value for secret one
- A_SECRET_PARAM_TWO: the value for secret two
```

## Simple usage

### Example using public IDs

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.0.1:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
```

### Example task using existing `synthetics.json` files

```yaml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.0.1:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - files: 'e2e-tests/*.synthetics.json'
```

For an example test file, see this [`test.synthetics.json` file][7].

## Complex usage

### Example task using the `testSearchQuery`

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.0.1:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - test_search_query: 'tag:e2e-tests'
```

### Example task using the `testSearchQuery` and variable overrides

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.0.1:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - test_search_query: 'tag:e2e-tests'
   - variables: |
      START_URL=https://staging.website.com
      PASSWORD=$STAGING_PASSWORD
```

### Example task using a global configuration override with `configPath`

This task overrides the path to the global `datadog-ci.config.json` file.

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.0.1:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './synthetics-config.json'
```

For an example configuration file, see the [`global.config.json` file][8].

### Example including all possible configurations

For reference, this is an example of a complete configuration:

```yml
- git::https://github.com/DataDog/synthetics-test-automation-bitrise-step-run-tests.git@1.0.1:
   inputs:
   - api_key: <DATADOG_API_KEY>
   - app_key: <DATADOG_APP_KEY>
   - config_path: './global.config.json'
   - device_ids: 'apple iphone se (2022),15.4.1, apple iphone 14 pro,16.1'
   - fail_on_critical_errors: true
   - fail_on_missing_tests: true
   - fail_on_timeout: true
   - files: 'e2e-tests/*.synthetics.json'
   - junit_report: 'e2e-test-junit'
   - locations: 'aws:us-west-1'
   - mobile_application_version: '01234567-8888-9999-abcd-efffffffffff'
   - mobile_application_version_file_path: 'path/to/application.apk'
   - polling_timeout: 4200000
   - public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
   - site: 'datadoghq.com'
   - subdomain: 'myorg'
   - test_search_query: 'tag:e2e-tests'
   - tunnel: true
   - variables: |
      START_URL=https://staging.website.com
      PASSWORD=$STAGING_PASSWORD
```

## Inputs

| Name                               | Requirement | Description                                                                                                                                                                                                                         |
| -----------------------------------| :---------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apiKey`                           | _required_  | Your Datadog API key. This key is created by your [Datadog organization][9] and will be accessed as an environment variable.                                                                                                     |
| `appKey`                           | _required_  | Your Datadog application key. This key is created by your [Datadog organization][9] and will be accessed as an environment variable.                                                                                             |
| `configPath`                       | _optional_  | The global JSON configuration is used when launching tests. See the [example configuration][10] for more details.                                                                                                                 |
| `deviceIds`                        | _optional_  | Override the mobile device(s) to run your mobile test.                                                                                                                                                                              |
| `locations`                        | _optional_  | String of locations separated by semicolons to override the locations where your tests run.                                                                                                                                         |
| `failOnCriticalErrors`             | _optional_  | A boolean flag that fails the CI job if no tests were triggered, or results could not be fetched from Datadog. The default is set to `false`.                                                                                       |
| `failOnMissingTests`               | _optional_  | Fail the CI job if at least one specified test with a public ID (using `publicIds` or listed in a [test file][7]) is missing in a run (for example, if it has been deleted programmatically or on the Datadog site).             |
| `failOnTimeout`                    | _optional_  | A boolean flag that fails the CI job if at least one test exceeds the default test timeout. The default is set to `true`.                                                                                                           |
| `files`                            | _optional_  | Glob patterns to detect Synthetic test [configuration files][2].                                                                                                                                                                 |
| `jUnitReport`                      | _optional_  | The filename for a JUnit report if you want to generate one.                                                                                                                                                                        |
| `mobileApplicationVersion`         | _optional_  | Override the default mobile application version for a Synthetic mobile application test. The version must be uploaded and available within Datadog. This version is also outputted by the [`datadog-mobile-app-upload` step][11]. |
| `mobileApplicationVersionFilePath` | _optional_  | Override the application version for [Synthetic mobile application tests][19].                                                                                                                                                            |
| `pollingTimeout`                   | _optional_  | The duration (in milliseconds) after which the batch is deemed as failed because of a timeout. The default is 30 minutes.                                                                                                           |
| `publicIds`                        | _optional_  | String of public IDs separated by commas for Synthetic tests you want to trigger.                                                                                                                                                   |
| `site`                             | _optional_  | The [Datadog site][16] to send data to. If the `DD_SITE` environment variable is set, it takes precedence.  Your Datadog site is {{< region-param key="dd_site" code="true" >}}. .                                                                                                                               |
| `subdomain`                        | _optional_  | The name of the custom subdomain set to access your Datadog application. If the URL used to access Datadog is `myorg.datadoghq.com`, the `subdomain` value needs to be set to `myorg`.                                              |
| `testSearchQuery`                  | _optional_  | Trigger tests corresponding to a [search][12] query. This can be useful if you are tagging your test configurations. See [best practices][15] for more information on tagging.                                                  |
| `tunnel`                           | _optional_  | Enable [Local and Staging Environments][14] to interact with the Datadog API.                                                                                                                                                                                 |
| `variables`                        | _optional_  | Key-value pairs for injecting variables into tests. Must be formatted using `KEY=VALUE`.                                                                                                                                            |

## Further reading

Additional helpful documentation, links, and articles:

- [Getting Started with Continuous Testing][17]
- [Continuous Testing and CI/CD Configuration][13]
- [Best practices for continuous testing with Datadog][18]

[1]: https://bitrise.io/integrations/steps/datadog-mobile-app-run-tests
[2]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#run-tests
[3]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/adding-steps-to-a-workflow.html#adding-steps-from-alternative-sources
[4]: https://devcenter.bitrise.io/en/builds/secrets.html#setting-a-secret
[5]: https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-steps/step-inputs.html
[6]: https://github.com/bitrise-io/bitrise
[7]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[8]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[10]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
[11]: https://github.com/DataDog/synthetics-test-automation-bitrise-step-upload-application
[12]: https://docs.datadoghq.com/ja/synthetics/search/#search
[13]: https://docs.datadoghq.com/ja/continuous_testing/cicd_integrations/configuration
[14]: https://docs.datadoghq.com/ja/continuous_testing/environments/multiple_env
[15]: https://docs.datadoghq.com/ja/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags
[16]: https://docs.datadoghq.com/ja/getting_started/site/
[17]: https://docs.datadoghq.com/ja/getting_started/continuous_testing/
[18]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[19]: https://docs.datadoghq.com/ja/synthetics/mobile_app_testing/