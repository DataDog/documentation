---
aliases:
- /continuous_integration/static_analysis/circleci_orbs
- /static_analysis/circleci_orbs
description: Use Datadog and CircleCI to run Static Analysis jobs in a CI pipeline.
title: Static Analysis and CircleCI Orbs
---

## Overview

Run a Datadog Static Analysis job in your CircleCI workflows.

## Setup

To use Datadog Static Analysis, you need to add a `static-analysis.datadog.yml` file in your repository's root directory to specify which rulesets to use.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

### Example for Python

You can see an example for Python-based repositories:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

## Workflow

Create a file in `.circleci` to run a Datadog Static Analysis job.

The following is a sample workflow file.

```yaml
version: 2.1
orbs:
  datadog-static-analysis: datadog/datadog-static-analyzer-circleci-orb@1
jobs:
  run-static-analysis-job:
    docker:
      - image: cimg/node:current
    steps:
      - checkout
      - datadog-static-analysis/analyze:
          service: "my-service"
          env: "ci"
          site: {{< region-param key="dd_site" code="true" >}}
          cpu_count: 2
          enable_performance_statistics: false
workflows:
  main:
    jobs:
      - run-static-analysis-job
```

### Environment variables

Set the following environment variables in the [CircleCI Project Settings page][2].

| Name         | Description                                                                                                                | Required |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][3] and should be stored as a secret.              | Yes     |
| `DD_APP_KEY` | Your Datadog application key. This key is created by your [Datadog organization][4] and should be stored as a secret.      | Yes     |

## Inputs

To customize your workflow, you can set the following parameters for Static Analysis.

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | The service you want your results tagged with.                                                                                | Yes     |                 |
| `env`     | The environment you want your results tagged with. Datadog recommends using `ci` as the value for this input.                 | No    | `none`          |
| `site`    | The [Datadog site][4] to send information to.                                                                                 | No    | `datadoghq.com` | 
| `cpu_count`  | Set the number of CPUs used to by the analyzer.                                                                            | No      | `2`             |
| `enable_performance_statistics` | Get the execution time statistics for analyzed files.                                                   | No      | `false`         |

<!-- ## Further Reading

Additional helpful documentation, links, and articles:

- [Learn about Code Security][1] -->

[1]: /security/code_security/
[2]: https://circleci.com/docs/set-environment-variable/#set-an-environment-variable-in-a-project
[3]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#application-keys
