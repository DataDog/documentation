---
title: Set up SCA with Generic CI Providers
description: Use Datadog Software Composition Analysis with any CI provider to detect vulnerabilities in open-source libraries.
---

If you don't use GitHub Actions, GitLab CI/CD, or Azure DevOps, run SCA scans using the customizable script below. This approach lets you install and run the scanner manually, then upload results to Datadog from any CI environment.

<div class="alert alert-info">
For non-GitHub repositories, if your branch name is custom (not <b>master</b>, <b>main</b>, <b>default</b>, <b>stable</b>, <b>source</b>, <b>prod</b>, or <b>develop</b>), upload once and set the default branch in <a href="https://app.datadoghq.com/source-code/repositories">Repository Settings</a>.
</div>

Prerequisites:
- Unzip
- Node.js 14 or later

```bash
# Set the Datadog site to send information to
export DD_SITE="{{< region-param key="dd_site" code="true" >}}"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest Datadog SBOM Generator:
# https://github.com/DataDog/datadog-sbom-generator/releases
DATADOG_SBOM_GENERATOR_URL=https://github.com/DataDog/datadog-sbom-generator/releases/latest/download/datadog-sbom-generator_linux_amd64.zip

# Install Datadog SBOM Generator
mkdir /datadog-sbom-generator
curl -L -o /datadog-sbom-generator/datadog-sbom-generator.zip $DATADOG_SBOM_GENERATOR_URL
unzip /datadog-sbom-generator/datadog-sbom-generator.zip -d /datadog-sbom-generator
chmod 755 /datadog-sbom-generator/datadog-sbom-generator

# Run Datadog SBOM Generator to scan your dependencies
/datadog-sbom-generator/datadog-sbom-generator scan --output=/tmp/sbom.json /path/to/repository

# Upload results to Datadog
datadog-ci sbom upload /tmp/sbom.json
```

The snippet uses the x86_64 Linux version of Datadog's SBOM generator. If you're using a different OS or architecture, update the `DATADOG_SBOM_GENERATOR_URL` accordingly. See all releases [here][1].

[1]: https://github.com/DataDog/datadog-sbom-generator/releases
