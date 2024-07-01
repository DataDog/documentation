---
aliases:
- /synthetics/cicd_integrations/github_actions
dependencies:
- "https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md"
title: Continuous Testing and CI GitHub Actions
---
## Overview

![GitHub Release](https://img.shields.io/github/v/release/DataDog/synthetics-ci-github-action)

Trigger Synthetic tests from your GitHub workflows with the [Datadog CI Synthetics command][1].

## Setup

To get started:

1. Add your Datadog API and Application Keys as secrets to your GitHub repository. For more information, see [API and Application Keys][2].
2. In your GitHub workflow, use `DataDog/synthetics-ci-github-action`.

Your workflow can be [simple](#simple-workflows) or [complex](#complex-workflows).

## Simple workflows

### Example workflow using public IDs

```yaml
name: Run Synthetic tests using the test public IDs
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v1.6.1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
```

### Example workflow using an existing `synthetics.json` file

```yaml
name: Run Synthetic tests using an existing synthetics.json file
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v1.6.1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
```

For an example test file, see this [`test.synthetics.json` file][12].

**Note**: By default, this workflow runs all the tests listed in `{,!(node_modules)/**/}*.synthetics.json` files (every file ending with `.synthetics.json` except for those in the `node_modules` folder). You can also trigger a list of Synthetic tests by specifying a `public_id` or using a search query.

## Complex workflows

### Example workflow using the `test_search_query`

```yaml
name: Run Synthetic tests by test tag
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v1.6.1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:e2e-tests'
```

### Example workflow using a test search query and variable overrides

```yaml
name: Run Synthetic tests using search query
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v1.6.1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:staging'
          variables: 'START_URL=https://staging.website.com,PASSWORD=stagingpassword'
```

### Example workflow using a global configuration file with `config_path`

By default, the path to the global configuration file is `datadog-ci.json`. You can override this path with the `config_path` input.

```yaml
name: Run Synthetic tests with custom config
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v1.6.1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          config_path: './global.config.json'
```

For an example of a global configuration file, see this [`global.config.json` file][13].

## Inputs

| Name                      | Type    | Requirement | Description                                                                                                                                                                                                                                  |
| ------------------------- | ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                 | string  | _required_  | Your Datadog API key. This key is created by your [Datadog organization][2] and should be stored as a [secret][3]. **Default:** none.                                                                                                        |
| `app_key`                 | string  | _required_  | Your Datadog Application key. This key is created by your [Datadog organization][2] and should be stored as a [secret][3]. **Default:** none.                                                                                                |
| `public_ids`              | string  | _optional_  | Comma-separated list of public IDs for Synthetic tests you want to trigger. If no value is provided, the action looks for files named with `synthetics.json`. **Default:** none.                                                             |
| `test_search_query`       | string  | _optional_  | Trigger tests corresponding to a [search query][5]. **Default:** none.                                                                                                                                                                       |
| `subdomain`               | string  | _optional_  | The name of the custom subdomain set to access your Datadog application. If the URL used to access Datadog is `myorg.datadoghq.com`, the subdomain value needs to be set to `myorg`. **Default:** `app`.                                     |
| `files`                   | string  | _optional_  | Glob pattern to detect Synthetic test configuration files. **Default:** `{,!(node_modules)/**/}*.synthetics.json`.                                                                                                                           |
| `datadog_site`            | string  | _optional_  | The [Datadog site][11] to send data to. **Default:** `datadoghq.com`.                                                                                                                                                                        |
| `config_path`             | string  | _optional_  | The [global JSON configuration][4] to be used when launching tests. See the [example configuration file][13] for more details. **Default:** `datadog-ci.json`.                                                                               |
| `variables`               | string  | _optional_  | Comma-separated list of global variables to use for Synthetic tests. For example: `START_URL=https://example.org,MY_VARIABLE=My title`. **Default:** `[]`.                                                                                   |
| `junit_report`            | string  | _optional_  | The filename for a JUnit report if you want to generate one. **Default:** none.                                                                                                                                                              |
| `tunnel`                  | boolean | _optional_  | Use the [Continuous Testing Tunnel][9] to execute your test batch. **Default:** `false`.                                                                                                                                                     |
| `polling_timeout`         | number  | _optional_  | The duration (in milliseconds) after which the action stops polling for test results. At the CI level, test results completed after this duration are considered failed. **Default:** 30 minutes.                                            |
| `fail_on_critical_errors` | boolean | _optional_  | Fail the CI job if no tests were triggered, or results could not be fetched from Datadog. **Default:** `false`.                                                                                                                              |
| `fail_on_missing_tests`   | boolean | _optional_  | Fail the CI job if at least one specified test with a public ID (using `public_ids` or listed in a [test file][12]) is missing in a run (for example, if it has been deleted programmatically or on the Datadog site). **Default:** `false`. |
| `fail_on_timeout`         | boolean | _optional_  | Fail the CI job if at least one test exceeds the default test timeout. **Default:** `true`.                                                                                                                                                  |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## Further reading

Additional helpful documentation, links, and articles:

- [Continuous Testing and CI/CD Configuration][6]
- [Best practices for continuous testing with Datadog][10]

[1]: https://github.com/DataDog/datadog-ci
[2]: https://docs.datadoghq.com/account_management/api-app-keys/
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
[4]: https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration/?tab=npm#setup-the-client
[5]: https://docs.datadoghq.com/synthetics/search/#search
[6]: https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration
[7]: https://semver.org/#summary
[8]: https://github.com/DataDog/synthetics-ci-github-action/tags
[9]: https://docs.datadoghq.com/continuous_testing/testing_tunnel/
[10]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[11]: https://docs.datadoghq.com/getting_started/site
[12]: https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json
