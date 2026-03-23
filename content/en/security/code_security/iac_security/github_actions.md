---
title: IaC Security and GitHub Actions
description: Use Datadog and GitHub Actions to run IaC Security scans in a CI pipeline.
further_reading:
  - link: "/security/code_security/iac_security/"
    tag: "Documentation"
    text: "IaC Security"
  - link: "/security/code_security/iac_security/setup"
    tag: "Documentation"
    text: "Set up IaC Security"
  - link: "/security/code_security/iac_security/iac_rules/"
    tag: "Documentation"
    text: "IaC Security Rules"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">IaC Security with GitHub Actions is not supported for the {{< region-param key=dd_site code="true" >}} site.</div>
{{% /site-region %}}

The [`datadog-iac-scanner-github-action`][2] runs the [Datadog IaC Scanner][7] in your GitHub Action workflows to detect misconfigurations in Terraform and Kubernetes files on every push, then uploads the results to [IaC Security][1].

## Supported platforms

| OS      | Architecture    |
|---------|-----------------|
| Linux   | x86_64, arm64   |
| macOS   | x86_64, arm64   |
| Windows | x86_64          |

## Prerequisites

Before you begin, make sure you have:

- A [Datadog API key and application key][5], stored as [secrets in your GitHub repository][4] (`DD_API_KEY` and `DD_APP_KEY`).
- Your [Datadog site][6] (for example, `datadoghq.com` or `datadoghq.eu`).

## Setup

To add IaC scanning to your GitHub Actions workflow, create a `.github/workflows/datadog-iac-scanning.yml` file in your repository with the following content:

```yaml
on: [push]

name: Datadog IaC Scan

jobs:
  iac-scan:
    runs-on: ubuntu-latest
    name: Datadog IaC Scanner
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    - name: Check the Infrastructure as Code configuration
      id: datadog-iac-scan
      uses: DataDog/datadog-iac-scanner-github-action@v1
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: datadoghq.com
```

### Optional inputs

In addition to the required `dd_api_key`, `dd_app_key`, and `dd_site` inputs, you can set the following optional parameters in your workflow file:

| Name         | Description                                                                                                  | Default         |
|--------------|--------------------------------------------------------------------------------------------------------------|-----------------|
| `paths`      | Comma-separated list of directories and files to scan.                                                       | `.`             |
| `extra_args` | Additional arguments passed to the IaC scanner.                                                              |                 |
| `datadog_ci_extra_args` | Additional arguments passed to the `datadog-ci` upload command.                                     |                 |

## Examples

### Scan specific directories and files

```yaml
- uses: DataDog/datadog-iac-scanner-github-action@v1
  with:
    paths: prepare,deploy,configs/config1.yaml
    dd_api_key: ${{ secrets.DD_API_KEY }}
    dd_app_key: ${{ secrets.DD_APP_KEY }}
```

### Upload results to a different Datadog site

```yaml
- uses: DataDog/datadog-iac-scanner-github-action@v1
  with:
    dd_site: datadoghq.eu
    dd_api_key: ${{ secrets.DD_API_KEY }}
    dd_app_key: ${{ secrets.DD_APP_KEY }}
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/iac_security/
[2]: https://github.com/DataDog/datadog-iac-scanner-github-action
[3]: https://github.com/DataDog/datadog-ci
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[5]: /account_management/api-app-keys/
[6]: /getting_started/site/
[7]: https://github.com/DataDog/datadog-iac-scanner
