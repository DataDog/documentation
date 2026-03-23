---
title: Set up SCA with GitLab CI/CD
description: Use Datadog Software Composition Analysis with GitLab CI/CD to detect vulnerabilities in open-source libraries.
---

Run a Datadog Software Composition Analysis (SCA) job in your GitLab CI/CD pipelines.

<div class="alert alert-danger">
Datadog Software Composition Analysis CI jobs are only supported on <code>push</code> event triggers. Other event triggers (<code>pull_request</code>, for example) are not supported and can cause issues with the product.
</div>

## Set up the pipeline

Add the following to your `.gitlab-ci.yml` file, or include it in an [`include`][1] section.

{{< code-block lang="yaml" filename=".gitlab-ci.yml" collapsible="true" >}}
# Ensure stages definition is only defined in the root .gitlab-ci.yml file.
stages:
  - software_composition_analysis

variables:
  DD_SITE: "datadoghq.com"
  DD_APP_KEY: "$DD_APP_KEY"
  DD_API_KEY: "$DD_API_KEY"

datadog_software_composition_analysis:
  stage: software_composition_analysis
  image: node:lts
  script:
    - apt-get update && apt-get install -y curl unzip
    - npm install -g @datadog/datadog-ci
    - export DATADOG_SBOM_GENERATOR_URL="https://github.com/DataDog/datadog-sbom-generator/releases/latest/download/datadog-sbom-generator_linux_amd64.zip"
    - mkdir -p /datadog-sbom-generator
    - curl -L -o /datadog-sbom-generator/datadog-sbom-generator.zip $DATADOG_SBOM_GENERATOR_URL
    - unzip /datadog-sbom-generator/datadog-sbom-generator.zip -d /datadog-sbom-generator
    - chmod 755 /datadog-sbom-generator/datadog-sbom-generator
    # Scanning the current repository; adjust the scan directory as needed.
    - /datadog-sbom-generator/datadog-sbom-generator scan --output=/tmp/sbom.json .
    - datadog-ci sbom upload /tmp/sbom.json
{{< /code-block >}}

The snippet uses the x86_64 Linux version of Datadog's SBOM generator. If you're using a different OS or architecture, update the `DATADOG_SBOM_GENERATOR_URL` accordingly.

[1]: https://docs.gitlab.com/ci/yaml/#include
