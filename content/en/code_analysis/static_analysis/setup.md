---
title: Setup Static Analysis
kind: documentation
description: Learn about Datadog Static Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
aliases:
- /continuous_integration/static_analysis
- /static_analysis
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: "Blog"
  text: "Monitor all your CI pipelines with Datadog"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Learn about the Source Code Integration"
---

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis is in private beta. Python, Java, C#, JavaScript, TypeScript, and Docker are the only supported languages. To request access, <a href="/help">contact Support</a>.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview

To use Datadog Static Analysis, add a `static-analysis.datadog.yml` file to your repository's root directory and specify which rulesets you want to include for your programming language(s).

Select one or multiple programming languages and choose which rulesets you want to copy and use on the [Code Analysis Setup page][8]. 

{{< img src="code_analysis/static_analysis/apply_python_rulesets.png" alt="Copy and paste the Code Quality and Security rulesets from the available options for Python on the Code Analysis Setup page" style="width:100%;">}} 

## Add a Static Analysis YAML file to your project

You can include the following options in the `static-analysis.datadog.yml` file:

| Name               | Description                                                                               | Required | Default |
|--------------------|-------------------------------------------------------------------------------------------|----------|---------|
| `rulesets`         | A list of ruleset names. [View all available rulesets][6].                                | `true`   |         |
| `ignore-paths`     | A list of relative paths to ignore. It supports using globbing patterns.                  | `false`  |         |
| `ignore-gitignore` | Determines whether Datadog Static Analysis analyzes the content in a `.gitignore` file.   | `false`  | `false` |

For example, you can use the following:

```yaml
rulesets:
  - python-best-practices
  - python-security
  - python-code-style
  - python-inclusive
  - python-design
ignore-paths:
  - "path/to/ignore"
  - "**.js"
```

This example contains Python and JavaScript rulesets for code quality and security:

```yaml
rulesets: 
- python-best-practices           # ensure best practices are followed
- python-code-style               # code-style enforcement for Python
- python-design                   # check basic design rules
- python-inclusive                # ensure that we use inclusive wording in our codebase
- python-security                 # ensure your Python code is safe and secure
- javascript-best-practices       # ensure best practices are followed
- javascript-code-style           # code-style enforcement for JavaScript
- javascript-inclusive            # ensure that we use inclusive wording in our codebase
- javascript-common-security      # ensure your JavaScript code is safe and secure
```

## Configure your CI/CD provider

Configure your [Datadog API and application keys][4] and run Static Analysis in the respective CI provider.

{{< tabs >}}
{{% tab "CircleCI Orbs" %}}

To run Static Analysis with CircleCI, [follow these instructions for setting up a CircleCI Orb][101].

[101]: /static_analysis/circleci_orbs

{{% /tab %}}
{{% tab "GitHub Actions" %}}

To run Static Analysis with GitHub, [follow these instructions for setting up a GitHub Action][101].

[101]: /static_analysis/github_actions/

{{% /tab %}}
{{% tab "Other" %}}

If you don't use CircleCI Orbs or GitHub Actions, you can run the Datadog CLI directly in your CI pipeline platform. 

Prerequisites:

- unzip
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

<div class="alert alert-info">
  Add a `--performance-statistics` flag to your static analysis command to get execution time statistics for analyzed files.
</div>

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
  The following example uses the x86_64 Linux version of Datadog's static analyzer. If you're using a different OS or architecture, you should select it from the table above and update the DATADOG_STATIC_ANALYZER_URL value below. You can view all releases on our <a href="https://github.com/DataDog/datadog-static-analyzer/releases">GitHub Releases</a> page.
</div>

```bash
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

You can send results from third-party static analysis tools to Datadog, provided they are in the interoperable [Static Analysis Results Interchange Format (SARIF) Format][5]. 

To upload a SARIF report:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][4].
2. Optional: Set a [`DD_SITE` variable][7] (default: `datadoghq.com`).
3. Install the `datadog-ci` utility:
   
   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Run the third-party static analysis tool on your code and output the results in the SARIF format.
5. Upload the results to Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION --service <datadog-service> --env <datadog-env>
   ```

## Run Static Analysis in a CI pipeline

Datadog Static Analysis runs in your CI pipelines using the [`datadog-ci` CLI][2] and checks your code against Datadog's default rulesets.

### Search and filter results

After you configure your CI pipelines to run the Datadog Static Analyzer, violations appear on the [Static Analysis Results page][1]. To filter your results, use the facets to the left of the list, or search. 

Each violation is associated with a specific commit and branch from your repository on which the CI pipeline ran. The rows represent every violation per commit. 

Click on a violation to open a side panel that contains information about the scope of the violation and where it originated.
{{< img src="ci/static-analysis-violation.png" alt="Side panel for a static analysis violation" style="width:80%;">}} 

The content of the violation is shown in tabs:

* Source Code: A description of the violation and the lines of code that caused it. To see the offending code snippet, configure the [Datadog GitHub App][3].
* Fixes: One or more code fixes that can resolve the violation, which you can copy and paste.
* Event: JSON metadata regarding the Static Analysis violation event.

### Using suggested fixes
{{< img src="ci/static-analysis-fixes.png" alt="Fixes tab of a static analysis violation" style="width:80%;">}}

In Datadog Static Analysis, there are two types of suggested fixes:

1. **Default Suggested Fix:** For simple violations like linting issues, the rule analyzer automatically provides templated fixes.
2. **AI Suggested Fix:** For complex violations, fixes are typically not available beforehand. Instead, you can use AI Suggested Fixes, which use OpenAI's GPT-4 to generate a suggested fix. You can choose between "Text" and "Unified Diff" fixes, which outputs plain text instructions or a code change for resolving the violation, respectively.

The two types of fixes are distinguished visually in the UI with different labels.

*Default Suggested Fixes:*
{{< img src="ci/static-analysis-default-fix.png" alt="Visual indicator of a default static analysis suggested fix" style="width:60%;">}}

*AI Suggested Fixes:*
{{< img src="ci/static-analysis-ai-fix.png" alt="Visual indicator of an AI static analysis suggested fix" style="width:60%;">}}

### Ignoring violations
You can ignore a specific instance of a violation by commenting `no-dd-sa` above the line of code to ignore. This prevents that line from ever producing a violation. For example, in the following Python code snippet, the line `foo = 1` would be ignored by Static Analysis scans.

```python
#no-dd-sa
foo = 1
bar = 2
```

[4]: /developers/ide_integrations/idea/#static-analysis
[5]: /code_analysis/github_pull_requests/
[6]: /code_analysis/static_analysis/rules
[7]: /getting_started/site/
[8]: https://app.datadoghq.com/ci/setup/static-analysis