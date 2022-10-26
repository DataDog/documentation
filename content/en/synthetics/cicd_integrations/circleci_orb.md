---
dependencies:
- https://github.com/DataDog/synthetics-ci-orb/blob/main/README.md
kind: documentation
title: Synthetics CI CircleCI Orb
---
## Overview

[![CircleCI Build Status](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/synthetics-ci-orb.svg)](https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb) [![Apache 2.0 License](https://shields.io/badge/license-Apache--2.0-lightgray)](https://raw.githubusercontent.com/DataDog/synthetics-ci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

Run Synthetic tests in your CircleCI pipelines using the Datadog CircleCI orb.

The CircleCI command orb installs [datadog-ci][1] and uses the `datadog-ci synthetics run-tests` [command][2] to execute [Datadog Synthetic tests][3].

## Setup

To get started:

1. Add your Datadog API and application keys as environment variables to your CircleCI project. See [inputs](#inputs) for naming conventions. For more information, see [API and Application Keys][2].
2. Ensure the image running the orb is a Linux x64 base image with cURL installed.

Your workflow can be [simple](#simple-workflows) or [complex](#complex-workflows).

## Simple workflows

### Example workflow using public IDs

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

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

### Example workflow using a global configuration override

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

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

## Complex workflows

### Example workflow using the `test_search_query`

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

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
### Example workflow using the [Synthetic Testing Tunnel][10]

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@1.0.1

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

For additional options such as customizing the `pollingTimeout` for your CircleCI pipelines, see [CI/CD Integrations Configuration][12].

## Inputs

| Name                      | Type         | Default                                   | Description                                                                                          |
| ------------------------- | ------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `api_key`                 | env var name | `DATADOG_API_KEY`                         | The name of the environment variable containing the API key.                                         |
| `api_key`                 | env var name | `DATADOG_APP_KEY`                         | The name of the environment variable containing the app key.                                         |
| `config_path`             | string       | `datadog-ci.json`                         | The global JSON configuration used when launching tests.                                             |
| `fail_on_critical_errors` | boolean      | `false`                                   | Fail if tests were not triggered or results could not be fetched.                                    |
| `fail_on_timeout`         | boolean      | `true`                                    | Force the CI to fail (or pass) if one of the results exceeds its test timeout.                       |
| `files`                   | string       | `{,!(node_modules)/**/}*.synthetics.json` | Glob pattern to detect Synthetic tests config files.                                                 |
| `locations`               | string       | _values in test config files_             | String of locations separated by semicolons to override the locations where your tests run.          |
| `public_ids`              | string       | _values in test config files_             | String of public IDs separated by commas for Synthetic tests you want to trigger.                    |
| `site`                    | string       | `datadoghq.com`                           | The Datadog site to send data to. If the `DD_SITE` environment variable is set, it takes preference. |
| `subdomain`               | string       | `app`                                     | The name of the custom subdomain set to access your Datadog application.                             |
| `test_search_query`       | string       | _none_                                    | Trigger tests corresponding to a search query.                                                       |
| `tunnel`                  | boolean      | `false`                                   | Use the testing tunnel to trigger tests.                                                             |
| `variables`               | string       | _none_                                    | Key-value pairs for injecting variables into tests. Must be formatted using `KEY=VALUE`.             |
| `version`                 | string       | `v1.7.0`                                  | The version of `datadog-ci` to use.                                                                  |

## Further Reading

Additional helpful documentation, links, and articles:

- [CI/CD Integrations Configuration][6]
- [Synthetics and CI GitHub Actions][11]
- [Synthetic Testing Tunnel][10]


[1]: https://github.com/DataDog/datadog-ci/
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics
[3]: https://docs.datadoghq.com/synthetics/cicd_integrations
[4]: https://bats-core.readthedocs.io/en/stable/installation.html
[5]: https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb
[6]: https://circleci.com/docs/2.0/orb-intro/#section=configuration
[7]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/issues
[8]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/pulls
[9]: https://discuss.circleci.com/c/orbs
[10]: https://docs.datadoghq.com/synthetics/testing_tunnel
[11]: https://docs.datadoghq.com/synthetics/cicd_integrations/github_actions
[12]: https://docs.datadoghq.com/synthetics/cicd_integrations/configuration?tab=npm
