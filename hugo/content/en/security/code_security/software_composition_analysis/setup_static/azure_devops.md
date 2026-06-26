---
title: Set up SCA with Azure DevOps
description: Use Datadog Software Composition Analysis with Azure DevOps to detect vulnerabilities in open-source libraries.
---

Run a Datadog Software Composition Analysis (SCA) job in your Azure DevOps pipelines.

<div class="alert alert-danger">
Datadog Software Composition Analysis CI jobs are only supported on <code>push</code> event triggers. Other event triggers (for example, <code>pull_request</code>) are not supported and can cause issues with the product.
</div>

## Environment variables

Configure the following environment variables in your Azure DevOps pipeline settings.

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][1] and should be stored as a secret.            | Yes      |                 |
| `DD_APP_KEY` | Your Datadog application key. This key is created by your [Datadog organization][1], must include the `code_analysis_read` scope, and should be stored as a secret. | Yes      |                 |
| `DD_SITE`    | The [Datadog site][2] to send information to.                                                                              | No       | `datadoghq.com` |

## Set up the pipeline

To add a new pipeline in Azure DevOps, go to **Pipelines > New Pipeline**, select your repository, and then create or select a pipeline.

Add the following content to your Azure DevOps pipeline YAML file:

{{< code-block lang="yaml" filename="datadog-sca.yml" collapsible="true" >}}
trigger:
  branches:
    include:
      # Optionally specify a specific branch to trigger on when merging
      - "*"

variables:
  - group: "Datadog"

jobs:
  - job: DatadogSoftwareCompositionAnalysis
    displayName: "Datadog Software Composition Analysis"
    steps:
      - script: |
          npm install -g @datadog/datadog-ci
          export DATADOG_SBOM_GENERATOR_URL="https://github.com/DataDog/datadog-sbom-generator/releases/latest/download/datadog-sbom-generator_linux_amd64.zip"
          mkdir -p /tmp/datadog-sbom-generator
          curl -L -o /tmp/datadog-sbom-generator/datadog-sbom-generator.zip $DATADOG_SBOM_GENERATOR_URL
          unzip /tmp/datadog-sbom-generator/datadog-sbom-generator.zip -d /tmp/datadog-sbom-generator
          chmod 755 /tmp/datadog-sbom-generator/datadog-sbom-generator
          /tmp/datadog-sbom-generator/datadog-sbom-generator scan --output=/tmp/sbom.json .
          datadog-ci sbom upload /tmp/sbom.json
        env:
          DD_APP_KEY: $(DD_APP_KEY)
          DD_API_KEY: $(DD_API_KEY)
          DD_SITE: datadoghq.com
{{< /code-block >}}

The snippet uses the x86_64 Linux version of Datadog's SBOM generator. If you're using a different OS or architecture, update the `DATADOG_SBOM_GENERATOR_URL` accordingly.

[1]: /account_management/api-app-keys/
[2]: /getting_started/site/
