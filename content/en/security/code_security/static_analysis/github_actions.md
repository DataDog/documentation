---
aliases:
- /continuous_integration/static_analysis/github_actions
- /static_analysis/github_actions
description: Use Datadog and GitHub to run Static Code Analysis jobs in a CI pipeline.
title: Static Code Analysis and GitHub Actions
---
## Overview

Run a [Datadog Static Code Analysis][1] job as an action in your GitHub Action workflows. This action wraps the [Datadog Static Analyzer][8],
invokes it against your codebase, and uploads the results to Datadog.

## Workflow

Create a file in `.github/workflows` to run a Datadog Static Code Analysis job.

The following is a sample workflow file.

```yaml
on: [push]

jobs:
  check-quality:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v1
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_site: "datadoghq.com"
          cpu_count: 2
          enable_performance_statistics: false
```

You **must** set your Datadog API and application keys as [secrets in your GitHub repository][4] whether at the organization or repository level. Ensure that you add the `code_analysis_read` scope to your Datadog application key. For more information, see [API and Application Keys][2].

Make sure to replace `dd_site` with the [Datadog site you are using][3].

<div id="unsupported-trigger" class="alert alert-danger">
Running a Datadog Static Code Analysis job as an action only supports the <code>push</code> event trigger. Other event triggers (<code>pull_request</code>, etc.) are not supported.
</div>

## Inputs

You can set the following parameters for Static Code Analysis.

| Name         | Description                                                                                                                                             | Required | Default         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Your Datadog API key. This key is created by your [Datadog organization][2] and should be stored as a [secret][2].                                      | Yes     |                 |
| `dd_app_key` | Your Datadog application key. This key is created by your [Datadog organization][2] and should be stored as a [secret][4].                              | Yes     |                 |
| `dd_site`    | The [Datadog site][3] to send information to.                                                                                                           | No      | `datadoghq.com` |
| `cpu_count`  | Set the number of CPUs used to by the analyzer.                                                                                                         | No      | `2`             |
| `enable_performance_statistics` | Get the execution time statistics for analyzed files.                                                                                                   | No      | `false`         |
| `debug`      | Lets the analyzer print additional logs useful for debugging. To enable, set to `yes`.                                                                  | No      | `no`            |
| `subdirectory` | A subdirectory pattern or glob (or space-delimited subdirectory patterns) that the analysis should be limited to. For example: "src" or "src packages". | `false` |                 |
| `architecture` | The CPU architecture to use for the analyzer. Supported values are `x86_64` and `aarch64`.                                                              | No      | `x86_64`        |
| `diff_aware` | Enable [diff-aware scanning mode][5].                                                                                                                   | No      | `true`          |

### Notes

1. Diff-aware scanning only scans the files modified by a commit when analyzing feature branches. Diff-aware is enabled by default. To disable diff-aware scanning, set the GitHub action `diff_aware` parameter to `false`.

### Deprecated Inputs
The following action inputs have been deprecated and no longer have any effect. Passing these in will emit a warning.
* `dd_service`
* `dd_env`

## Customizing rules

By default, [Datadog Static Analyzer][8] detects the languages of your codebase and uses the default rulesets to analyze
your codebase.

To specify and customize the rulesets, add a `static-analysis.datadog.yml` file to your repository's root directory to define which rulesets to use.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

Refer to the [Datadog documentation][6] for a complete list of rulesets.

### Example for Python

Here is an example for Python-based repositories:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```


## Other useful GitHub Actions

Datadog Software Composition Analysis (SCA) also offers the ability to scan your dependencies
and detect vulnerabilities and licenses. You can use this product with the [`datadog-sca-github-action`][7].


<!-- ## Further Reading

Additional helpful documentation, links, and articles:

- [Learn about Code Security][1] -->

[1]: /security/code_security/
[2]: https://docs.datadoghq.com/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/getting_started/site/
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[5]: https://github.com/DataDog/datadog-static-analyzer/blob/main/README.md#diff-aware-scanning
[6]: /security/code_security/static_analysis/static_analysis_rules/
[7]: https://github.com/DataDog/datadog-sca-github-action
[8]: https://github.com/DataDog/datadog-static-analyzer
