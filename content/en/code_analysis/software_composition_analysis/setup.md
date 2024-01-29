---
title: Setting Up Software Composition Analysis
kind: documentation
description: Learn how to set up Software Composition Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/iast-datadog-application-vulnerability-management/"
  tag: "Blog"
  text: "Enhance application security in production with Datadog Application Vulnerability Management"
- link: "/getting_started/application_security/software_composition_analysis"
  tag: "Documentation"
  text: "Getting Started with Software Composition Analysis"
- link: "/security/application_security/software_composition_analysis/"
  tag: "Documentation"
  text: "Learn about Software Composition Analysis"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
- link: "/code_analysis/static_analysis/"
  tag: "Documentation"
  text: "Learn about Static Analysis"
---

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Software Composition Analysis is in public beta. Go, Java, NodeJS, Python, and Ruby are the only supported languages.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Software Composition Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview

Software Composition Analysis (SCA) scans open source libraries imported into repositories through package managers such as `npm` for [vulnerabilities][1]. SCA enables engineering teams to identify vulnerable dependencies early on in the development life cycle so they can update dependencies to non-vulnerable versions or remove them entirely to ensure their production codebase is secure.

## Enable Software Composition Analysis

When setting up [Code Analysis][2] on your project, select **Enable Software Composition Analysis**.

{{< img src="code_analysis/software_composition_analysis/enable_sca.png" alt="Click the Enable Software Composition Analysis checkbox on the Code Analysis setup page when setting up Code Analysis for your project" style="width:100%;" >}}

## Configure your CI/CD provider

Configure your [Datadog API and application keys][3] and run Software Composition Analysis jobs in the respective CI provider.

{{< tabs >}}
{{% tab "GitHub Actions" %}}

To run Software Composition Analysis with GitHub, [follow these instructions for setting up a GitHub Action][101].

[101]: /code_analysis/software_composition_analysis/github_actions/

{{% /tab %}}
{{% tab "Other" %}}

If you don't use GitHub Actions, you can run the Datadog CLI directly in your CI pipeline platform. 

Prerequisites:

- unzip
- trivy
- Node.js 14 or later

Configure the following environment variables:

| Name         | Description                                                                                                                | Required | Default         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][101] and should be stored as a secret.            | Yes      |                 |
| `DD_APP_KEY` | Your Datadog application key. This key is created by your [Datadog organization][102] and should be stored as a secret.    | Yes      |                 |
| `DD_SITE`    | The [Datadog site][103] to send information to. Your Datadog site is {{< region-param key="dd_site" code="true" >}}.       | No       | `datadoghq.com` |

Provide the following inputs:

| Name           | Description                                                                                                                | Required | Default         |
|----------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service`      | The name of the service to tag the results with.                                                                           | Yes      |                 |
| `env`          | The environment to tag the results with. `ci` is a helpful value for this input.                                           | No       | `none`          |
| `cpu_count`    | Set the number of CPUs used by the analyzer. Defaults to the number of CPUs available.                                     | No       |                 |
| `subdirectory` | The subdirectory path the analysis should be limited to. The path is relative to the root directory of the repository.                  | No       |                 |

Select an analyzer for your architecture and OS:

| Architecture | OS        | Name                                                    | Link                                                                                                                                          |
|--------------|-----------|---------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------|
| `aarch64`    | `Darwin`  | `datadog-static-analyzer-aarch64-apple-darwin.zip`      | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-apple-darwin.zip)      |
| `aarch64`    | `Linux`   | `datadog-static-analyzer-aarch64-unknown-linux-gnu.zip` | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-aarch64-unknown-linux-gnu.zip) |
| `x86_64`     | `Darwin`  | `datadog-static-analyzer-x86_64-apple-darwin.zip`       | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-apple-darwin.zip)       |
| `x86_64`     | `Linux`   | `datadog-static-analyzer-x86_64-unknown-linux-gnu.zip`  | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip)  |
| `x86_64`     | `Windows` | `datadog-static-analyzer-x86_64-pc-windows-msvc.zip`    | [Download](https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-pc-windows-msvc.zip)    |

Add the following to your CI pipeline:

<div class="alert alert-info">
  The following example uses the x86_64 Linux version of Datadog's static analyzer. If you're using a different OS or architecture, you should select it from the table above and update the <code>DATADOG_STATIC_ANALYZER_URL</code> value below. You can view all releases on our <a href="https://github.com/DataDog/datadog-static-analyzer/releases">GitHub Releases</a> page.
</div>

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci 

# Download the latest Datadog static analyzer:
# https://github.com/DataDog/datadog-static-analyzer/releases
DATADOG_STATIC_ANALYZER_URL=https://github.com/DataDog/datadog-static-analyzer/releases/latest/download/datadog-static-analyzer-x86_64-unknown-linux-gnu.zip
curl -L $DATADOG_STATIC_ANALYZER_URL > /tmp/ddog-static-analyzer.zip
unzip /tmp/ddog-static-analyzer.zip -d /tmp
mv /tmp/datadog-static-analyzer /usr/local/datadog-static-analyzer

# Run Static Analysis
/usr/local/datadog-static-analyzer -i . -o /tmp/report.sarif -f sarif

# Upload results
datadog-ci sarif upload /tmp/report.sarif --service <service> --env <env>
```

[101]: /account_management/api-app-keys/#api-keys
[102]: /account_management/api-app-keys/#application-keys
[103]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Upload third-party static analysis results to Datadog

<div class="alert alert-info">
  SARIF importing has been tested for Snyk, CodeQL, Semgrep, Checkov, Gitleaks, and Sysdig. Please reach out to <a href="/help">Datadog Support</a> if you experience any issues with other SARIF-compliant tools.
</div>

You can send results from third-party static analysis tools to Datadog, provided they are in the interoperable [Static Analysis Results Interchange Format (SARIF) Format][2]. Node.js version 14 or later is required.

To upload a SARIF report:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][3].
2. Set the [`DD_SITE` variable][4] (this default to `datadoghq.com`):
   
   ```bash
   export DD_SITE="datadoghq.com"
   ```

3. Install the `datadog-ci` utility:
   
   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Run the third-party static analysis tool on your code and output the results in the SARIF format.
5. Upload the results to Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION --service <datadog-service> --env <datadog-env>
   ```

To upload a SBOM report:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][3].
2. Set the [`DD_SITE` variable][4] (this default to `datadoghq.com`):
   
   ```bash
   export DD_SITE="datadoghq.com"
   ```

3. Install the `datadog-ci` utility:
   
   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Upload the SBOM report to Datadog:

   ```bash
   datadog-ci sbom upload --service <service> --env <env> /tmp/trivy.json
   ```

## Run Static Analysis in a CI pipeline

Datadog Static Analysis runs in your CI pipelines using the [`datadog-ci` CLI][5] and checks your code against Datadog's default rulesets.

### Search and filter results

After you configure your CI pipelines to run the Datadog Static Analyzer, violations appear on the [Code Analysis page][6]. To filter your results, use the facets to the left of the list, or search. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/application_security/vulnerability_management
[2]: /code_analysis/
[3]: /account_management/api-app-keys/
[4]: /getting_started/site/
[5]: https://github.com/DataDog/datadog-ci
[6]: https://app.datadoghq.com/ci/code-analysis
[7]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account