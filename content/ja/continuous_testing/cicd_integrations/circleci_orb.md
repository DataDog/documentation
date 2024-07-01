---
aliases:
- /synthetics/cicd_integrations/circleci_orb
dependencies:
- "https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/README.md"
title: Continuous Testing and CircleCI Orb
---
## Overview

[![CircleCI Build Status](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb.svg?style=shield 'CircleCI Build Status')](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/synthetics-ci-orb.svg)](https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb) [![Apache 2.0 License](https://shields.io/badge/license-Apache--2.0-lightgray)](https://raw.githubusercontent.com/DataDog/synthetics-ci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

Run Synthetic tests in your CircleCI pipelines using the Datadog CircleCI orb.

The CircleCI command orb installs [datadog-ci][1] and uses the `datadog-ci synthetics run-tests` [command][2] to execute [Datadog Synthetic tests][3].

## Setup

To get started:

1. Add your Datadog API and application keys as environment variables to your CircleCI project. For more information, see [API and Application Keys][2].
2. Ensure the image running the orb is a Linux x64 base image with cURL installed.
3. Customize your workflow by creating a [`run-tests.yml`][14] file and following the naming conventions to specify [inputs](#inputs) for your workflow.

Your workflow can be [simple](#simple-usage) or [complex](#complex-usage).

## Simple usage

### Example orb usage using public IDs

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@3.13.1

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### Example orb usage using a global configuration override

This orb overrides the path to the pattern for [test files][18].

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@3.13.1

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          files: e2e-tests/*.synthetics.json

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

For another example pipeline that triggers Synthetic tests, see the [`simple-example.yml` file][15].

## Complex usage

### Example orb usage using the `test_search_query`

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@3.13.1

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          test_search_query: 'tag:e2e-tests'

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### Example orb usage using the [Continuous Testing Tunnel][10]

```yml
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@3.13.1

jobs:
  e2e-tests:
    docker:
      - image: your-image
    steps:
      - checkout
      - run:
          name: Running server in background
          command: npm start
          background: true
      - synthetics-ci/run-tests:
          config_path: tests/tunnel-config.json
          files: tests/*.synthetics.json
          test_search_query: 'tag:e2e-tests'
          tunnel: true

workflows:
  test-server:
    jobs:
      - build-image
      - integration-tests:
          requires:
            - build-image
```

For additional options such as customizing the `pollingTimeout` for your CircleCI pipelines, see [CI/CD Integrations Configuration][18]. For another example pipeline that starts a local server and triggers Synthetic tests using the Continuous Testing Tunnel, see the [`advanced-example.yml` file][16].

## Inputs

To customize your workflow, you can set the following parameters in a [`run-tests.yml` file][14]:

| Name                      | Type         | Default                                   | Description                                                                                                                                                                                                             |
| ------------------------- | ------------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                 | env var name | `DATADOG_API_KEY`                         | The name of the environment variable containing the API key.                                                                                                                                                            |
| `app_key`                 | env var name | `DATADOG_APP_KEY`                         | The name of the environment variable containing the APP key.                                                                                                                                                            |
| `background`              | boolean      | `false`                                   | Whether or not this step should run in the background. [See official CircleCI documentation](https://circleci.com/docs/configuration-reference/#run).                                                                   |
| `config_path`             | string       | `datadog-ci.json`                         | The global JSON configuration used when launching tests.                                                                                                                                                                |
| `fail_on_critical_errors` | boolean      | `false`                                   | Fail if tests were not triggered or results could not be fetched.                                                                                                                                                       |
| `fail_on_missing_tests`   | boolean      | `false`                                   | Fail if at least one specified test with a public ID (using `public_ids` or listed in a [test file][18]) is missing in a run (for example, if it has been deleted programmatically or on the Datadog site).             |
| `fail_on_timeout`         | boolean      | `true`                                    | Force the CI to fail (or pass) if one of the results exceeds its test timeout.                                                                                                                                          |
| `files`                   | string       | `{,!(node_modules)/**/}*.synthetics.json` | A list of glob patterns to detect Synthetic tests config files, separated by new lines.                                                                                                                                 |
| `junit_report`            | string       | _none_                                    | The filename for a JUnit report if you want to generate one.                                                                                                                                                            |
| `locations`               | string       | _values in [test files][18]_              | String of locations separated by semicolons to override the locations where your tests run.                                                                                                                             |
| `no_output_timeout`       | string       | _30 minutes_                              | Elapsed time the command can run without output. The string is a decimal with unit suffix, such as “20m”, “1.25h”, “5s”. [See official CircleCI documentation](https://circleci.com/docs/configuration-reference/#run). |
| `polling_timeout`         | number       | _30 minutes_                              | The duration (in milliseconds) after which the action stops polling for test results. At the CI level, test results completed after this duration are considered failed.                                                |
| `public_ids`              | string       | _values in [test files][18]_              | A list of test IDs for Synthetic tests you want to trigger, separated by new lines or commas.                                                                                                                          |
| `site`                    | string       | `datadoghq.com`                           | The [Datadog site][17] to send data to. If the `DD_SITE` environment variable is set, it takes preference.                                                                                                              |
| `subdomain`               | string       | `app`                                     | The name of the custom subdomain set to access your Datadog application.                                                                                                                                                |
| `test_search_query`       | string       | _none_                                    | Trigger tests corresponding to a search query.                                                                                                                                                                          |
| `tunnel`                  | boolean      | `false`                                   | Use the Continuous Testing Tunnel to trigger tests.                                                                                                                                                                     |
| `variables`               | string       | _none_                                    | A list of global variables to use for Synthetic tests, separated by new lines or commas. For example: `START_URL=https://example.org,MY_VARIABLE="My title"`.                                                           |

To learn about additional options for your CircleCI pipelines, see [Continuous Testing & CI/CD Integrations Configuration][12].

## Further reading

Additional helpful documentation, links, and articles:

- [Continuous Testing and CI/CD Configuration][6]
- [Continuous Testing and CI GitHub Actions][11]
- [Best practices for continuous testing with Datadog][13]
- [Continuous Testing Tunnel][10]

[1]: https://github.com/DataDog/datadog-ci/
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics
[3]: https://docs.datadoghq.com/continuous_testing/cicd_integrations
[4]: https://bats-core.readthedocs.io/en/stable/installation.html
[5]: https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb
[6]: https://circleci.com/docs/2.0/orb-intro/#section=configuration
[7]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/issues
[8]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/pulls
[9]: https://discuss.circleci.com/c/orbs
[10]: https://docs.datadoghq.com/continuous_testing/testing_tunnel
[11]: https://docs.datadoghq.com/continuous_testing/cicd_integrations/github_actions
[12]: https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration?tab=npm
[13]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[14]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/commands/run-tests.yml
[15]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/simple-example.yml
[16]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/advanced-example.yml
[17]: https://docs.datadoghq.com/getting_started/site/
[18]: https://docs.datadoghq.com/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
