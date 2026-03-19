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

Run a [Datadog IaC Security][1] scan as a step in your GitHub Action workflows. This action uses the [Datadog IaC Scanner][2] to check your infrastructure-as-code configurations and upload the results to Datadog. It uses the [datadog-ci][3] standalone binary, so no Node.js setup is required.

## Supported platforms

| OS      | Architecture    |
|---------|-----------------|
| Linux   | x86_64, arm64   |
| macOS   | arm64           |
| Windows | x86_64          |

## Setup

Create a `.github/workflows/datadog-iac-scanning.yml` file in your repository with the following content:

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

You **must** set your Datadog API and application keys as [secrets in your GitHub repository][4] at the organization or repository level. For more information, see [API and Application Keys][5].

Replace `dd_site` with the [Datadog site][6] you are using.

## Inputs

You can set the following parameters for IaC Security.

| Name         | Description                                                                                                  | Required | Default         |
|--------------|--------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Your Datadog API key. This key is created by your [Datadog organization][5] and should be stored as a [secret][4]. | Yes      |                 |
| `dd_app_key` | Your Datadog application key. This key is created by your [Datadog organization][5] and should be stored as a [secret][4]. | Yes      |                 |
| `dd_site`    | The [Datadog site][6] to send information to.                                                                | No       | `datadoghq.com` |
| `paths`      | Comma-separated list of directories and files to scan.                                                       | No       | `.`             |
| `extra_args` | Additional arguments passed to the IaC scanner.                                                              | No       |                 |
| `datadog_ci_extra_args` | Additional arguments passed to the `datadog-ci` upload command.                                     | No       |                 |

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
[2]: https://github.com/DataDog/datadog-iac-scanner
[3]: https://github.com/DataDog/datadog-ci
[4]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[5]: /account_management/api-app-keys/
[6]: /getting_started/site/
