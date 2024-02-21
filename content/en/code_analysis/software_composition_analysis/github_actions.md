---
dependencies:
- https://github.com/DataDog/datadog-sca-github-action/blob/main/README.md
description: Use Datadog and GitHub to run Software Composition Analysis jobs in a
  CI pipeline.
kind: documentation
title: Software Composition Analysis and GitHub Actions
---
Run a Datadog [Software Composition Analysis][1] job in your GitHub Action workflows.

## SBOM Generation

The GitHub Action generates a SBOM report automatically based on dependencies declared in your repository.

The GitHub Action works for the following languages and following files:

 - JavaScript/TypeScript: `package-lock.json` and `yarn.lock`
 - Python: `requirements.txt` (with version defined) and `poetry.lock`

## Setup

### Set up keys

Add `DD_APP_KEY` and `DD_API_KEY` as secrets in your [GitHub Actions Settings][2].

### Workflow

Add the following code snippet in `.github/workflows/datadog-sca.yml`.

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
        dd_service: my-app
        dd_env: ci
        dd_site: {{< region-param key="dd_site" code="true" >}}
```

## Further Reading

Additional helpful documentation, links, and articles:

- [Learn about Software Composition Analysis][1]

[1]: https://docs.datadoghq.com/code_analysis/software_composition_analysis
[2]: https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository
