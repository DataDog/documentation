---
aliases:
- /continuous_integration/static_analysis/github_actions
- /static_analysis/github_actions
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-github-action/blob/main/README.md
description: Use Datadog and GitHub to run Static Analysis jobs in a CI pipeline.
kind: documentation
title: Static Analysis and GitHub Actions
---
## Overview

Run a Datadog Static Analysis job in your GitHub Action workflows.

Static Analysis is in private beta. To request access, [contact Support][4].

## Setup

To use Datadog Static Analysis, you need to add a `static-analysis.datadog.yml` file to your repository's root directory to specify which rulesets to use.

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

Create a file in `.github/workflows` to run a Datadog Static Analysis job.

The following is a sample workflow file.

```yaml
on: [push]

jobs:
  check-quality:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v1
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_service: "my-service"
          dd_env: "ci"
          cpu_count: 2
          enable_performance_statistics: false
```

You **must** set your Datadog API and application keys as secrets in your GitHub repository. For more information, see [API and Application Keys][1].

## Inputs

You can set the following parameters for Static Analysis.

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Your Datadog API key. This key is created by your [Datadog organization][1] and should be stored as a [secret][2].         | Yes     |                 |
| `dd_app_key` | Your Datadog application key. This key is created by your [Datadog organization][1] and should be stored as a [secret][2]. | Yes     |                 |
| `dd_service` | The service you want your results tagged with.                                                                             | Yes     |                 |
| `dd_env`     | The environment you want your results tagged with. Datadog recommends using `ci` as the value for this input.              | No      | `none`          |
| `dd_site`    | The [Datadog site][3] to send information to.                                                                              | No      | `datadoghq.com` |
| `cpu_count`  | Set the number of CPUs used to by the analyzer.                                                                            | No      | `2`             |
| `enable_performance_statistics` | Get the execution time statistics for analyzed files.                                                   | No      | `false`         |
| `debug`      | Lets the analyzer print additional logs useful for debugging. To enable, set to `yes`.                                     | No      | `no`            |

[1]: https://docs.datadoghq.com/account_management/api-app-keys/
[2]: https://docs.github.com/en/actions/security-guides/encrypted-secrets
[3]: https://docs.datadoghq.com/getting_started/site/
[4]: https://docs.datadoghq.com/help/
