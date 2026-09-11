---
description: Use Datadog and GitHub to detect secrets exposed in code in a CI pipeline.
is_beta: true
title: Secret Scanning and GitHub Actions
---

Run a [Datadog Secret Scanning][1] job in your GitHub Action workflows. This action wraps the [Datadog Static Analyzer][8] (that scans for secrets), invokes it against your codebase, and uploads the results to Datadog.

## Workflow

Create a file in `.github/workflows` to run a Datadog Secret Scanning job.

The following is a sample workflow file.

```yaml
on: [push]

jobs:
  check-quality:
    runs-on: ubuntu-latest
    name: Datadog Static Analyzer
    steps:
      - name: Checkout
        uses: actions/checkout@v6
      - name: Check code meets quality standards
        id: datadog-static-analysis
        uses: DataDog/datadog-static-analyzer-github-action@v3
        with:
          dd_app_key: ${{ secrets.DD_APP_KEY }}
          dd_api_key: ${{ secrets.DD_API_KEY }}
          dd_site: "datadoghq.com"
          cpu_count: 2
          enable_performance_statistics: false
          static_analysis_enabled: false
          secrets_enabled: true
```

You **must** set your Datadog API and application keys as [secrets in your GitHub repository][4], at either the organization or repository level. Ensure that you add the `code_analysis_read` scope to your Datadog application key. For more information, see [API and Application Keys][2].

Make sure to replace `dd_site` with the Datadog site you are using.

## Inputs

You can set the following parameters.

| Name         | Description                                                                                                                                             | Required | Default         |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Your Datadog API key. This key is created by your [Datadog organization][2] and should be stored as a [secret][2].                                      | Yes     |                 |
| `dd_app_key` | Your Datadog application key. This key is created by your [Datadog organization][2] and should be stored as a [secret][4].                              | Yes     |                 |
| `dd_site`    | The [Datadog site][3] to send information to.                                                                                                           | No      | `datadoghq.com` |
| `cpu_count`  | Set the number of CPUs used to by the analyzer.                                                                                                         | No      | `2`             |
| `enable_performance_statistics` | Get the execution time statistics for analyzed files.                                                                                                   | No      | `false`         |
| `debug`      | Lets the analyzer print additional logs useful for debugging. To enable, set to `yes`.                                                                  | No      | `no`            |



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
