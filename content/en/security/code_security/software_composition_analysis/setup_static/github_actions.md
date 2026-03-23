---
title: Set up SCA with GitHub Actions
description: Use Datadog Software Composition Analysis with GitHub Actions to detect vulnerabilities in open-source libraries.
---

Run a Datadog Software Composition Analysis (SCA) job in your GitHub Actions workflows. The action invokes Datadog's recommended SBOM tool, [Datadog SBOM Generator][1], on your codebase and uploads the results to Datadog.

<div class="alert alert-danger">
Datadog Software Composition Analysis CI jobs are only supported on <code>push</code> event triggers. Other event triggers (<code>pull_request</code>, for example) are not supported and can cause issues with the product.
</div>

## Set up the workflow

Create a file at `.github/workflows/datadog-sca.yml` with the following content. Replace the `dd_site` attribute with the [Datadog site][2] you are using.

{{< code-block lang="yaml" filename="datadog-sca.yml" collapsible="true" >}}
on: [push]

name: Datadog Software Composition Analysis

jobs:
  software-composition-analysis:
    runs-on: ubuntu-latest
    name: Datadog SBOM Generation and Upload
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    - name: Check imported libraries are secure and compliant
      id: datadog-software-composition-analysis
      uses: DataDog/datadog-sca-github-action@main
      with:
        dd_api_key: ${{ secrets.DD_API_KEY }}
        dd_app_key: ${{ secrets.DD_APP_KEY }}
        dd_site: "datadoghq.com"
{{< /code-block >}}

## Inputs

You can set the following parameters for Software Composition Analysis.

| Name         | Description                                                                                                                                        | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `dd_api_key` | Your Datadog API key. This key is created by your [Datadog organization][5] and should be stored as a [secret][6].                                 | Yes      |                 |
| `dd_app_key` | Your Datadog application key. This key is created by your [Datadog organization][5], should include the `code_analysis_read` scope, and should be stored as a [secret][6]. | Yes      |                 |
| `dd_site`    | The [Datadog site][2] to send information to.                                                                                                      | No       | `datadoghq.com` |

## Related GitHub Actions

[Datadog Static Code Analysis (SAST)][3] analyzes your first-party code. Static Code Analysis can be set up using the [`datadog-static-analyzer-github-action`][4] GitHub action.

[1]: https://github.com/DataDog/datadog-sbom-generator
[2]: /getting_started/site/
[3]: /getting_started/code_security/?tab=datadoghosted#linking-services-to-code-violations-and-libraries
[4]: https://github.com/DataDog/datadog-static-analyzer-github-action
[5]: /account_management/api-app-keys/
[6]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
