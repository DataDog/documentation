---
dependencies:
- https://github.com/DataDog/datadog-sca-github-action/blob/main/README.md
description: Use Datadog and GitHub to run Software Composition Analysis jobs in a
  CI pipeline.
title: Software Composition Analysis and GitHub Actions
---
Run a Datadog [Software Composition Analysis][1] job in your GitHub Action workflows. This action invokes
[Datadog osv-scanner][3] on your codebase and uploads the results into Datadog.

## Library Inventory Generation

The GitHub Action generates an inventory of libraries automatically based on the libraries that are declared in your repository.

The GitHub Action works for the following languages and following files:

 - JavaScript/TypeScript: `package-lock.json` and `yarn.lock`
 - Python: `requirements.txt` (with version defined) and `poetry.lock`
 - Java: `pom.xml`
 - C#
 - Ruby
 - ... and more languages (listed in the [documentation](https://docs.datadoghq.com/code_analysis/software_composition_analysis/))

## Setup

### Set up keys

Add `DD_APP_KEY` and `DD_API_KEY` as secrets in your [GitHub Actions Settings][2]. Please ensure your Datadog application key has the `code_analysis_read` scope. For more information, see [API and Application Keys][7].

### Workflow

Add the following code snippet in `.github/workflows/datadog-sca.yml`. Make sure to replace
the `dd_site` attribute with the [Datadog site][4] you are using.

```yaml
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
```

## Related Datadog tools

[Datadog Static Analysis][5] analyzes your code and provides feedback in your IDE, GitHub PR or within the
Datadog environment. Datadog Static Analysis can be set up using the [`datadog-static-analyzer-github-action`][6] 
GitHub action.

## Further Reading

Additional helpful documentation, links, and articles:

- [Learn about Software Composition Analysis][1]

[1]: https://docs.datadoghq.com/code_analysis/software_composition_analysis
[2]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
[3]: https://github.com/DataDog/osv-scanner
[4]: https://docs.datadoghq.com/getting_started/site/
[5]: https://docs.datadoghq.com/code_analysis/static_analysis
[6]: https://github.com/DataDog/datadog-static-analyzer-github-action
[7]: https://docs.datadoghq.com/account_management/api-app-keys/
