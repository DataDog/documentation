---
title: Static Analysis Setup
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

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="Try the Beta!" >}}
Code Analysis is in public beta.
{{< /callout >}}

## Overview

To use Datadog Static Analysis, add a `static-analysis.datadog.yml` file to your repository's root directory and specify which rulesets you want to include for your programming language(s).

{{< img src="code_analysis/static_analysis/apply_python_rulesets.png" alt="Copy and paste the Code Quality and Security rulesets from the available options for Python on the Code Analysis Setup page" style="width:100%;">}} 

Select one or multiple programming languages and choose which rulesets you want to copy and use on the [Code Analysis Setup page][1]. 

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

## Set up the GitHub integration 

You must configure a GitHub App using the [GitHub integration tile][9] and set up the [source code integration][10] to see the offending code snippets as part of the Static Analysis results in the Datadog UI.

## Configure your CI/CD provider

Datadog Static Analysis runs in your CI pipelines using the [`datadog-ci` CLI][8] and checks your code against Datadog's default rulesets. Configure your [Datadog API and application keys][3] and run Static Analysis in the respective CI provider.

{{< whatsnext desc="See the documentation for information about the following integrations:">}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/other_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

### Upload third-party static analysis results to Datadog

<div class="alert alert-info">
  SARIF importing has been tested for Snyk, CodeQL, Semgrep, Checkov, Gitleaks, and Sysdig. Please reach out to <a href="/help">Datadog Support</a> if you experience any issues with other SARIF-compliant tools.
</div>

You can send results from third-party static analysis tools to Datadog, provided they are in the interoperable [Static Analysis Results Interchange Format (SARIF) Format][2]. Node.js version 14 or later is required.

To upload a SARIF report:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][4].
2. Optionally, set a [`DD_SITE` variable][7] (this default to `datadoghq.com`).
3. Install the `datadog-ci` utility:
   
   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Run the third-party static analysis tool on your code and output the results in the SARIF format.
5. Upload the results to Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION --service <datadog-service> --env <datadog-env>
   ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/setup/code-analysis
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif 
[3]: /developers/ide_integrations/idea/#static-analysis
[4]: /account_management/api-app-keys/
[6]: /code_analysis/static_analysis_rules
[7]: /getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /integrations/guide/source-code-integration
