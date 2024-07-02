---
title: Static Analysis Setup
description: Learn about Datadog Static Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
aliases:
- /continuous_integration/static_analysis
- /static_analysis
is_beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-ci-pipelines/"
  tag: Blog
  text: Monitor all your CI pipelines with Datadog
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: Learn about the Source Code Integration
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

You can include the following **global** options in the `static-analysis.datadog.yml` file:

| Name               | Description                                                                                | Required | Default |
|--------------------|--------------------------------------------------------------------------------------------|----------|---------|
| `rulesets`         | A list of ruleset names and configurations. [View all available rulesets][6].              | `true`   |         |
| `ignore`           | A list of path prefixes and glob patterns to ignore. Matching files will not be analyzed.  | `false`  |         |
| `only`             | A list of path prefixes and glob patterns to analyze. Only matching files will be analyzed.| `false`  |         |
| `ignore-gitignore` | Do not use paths listed in the `.gitignore` file to skip analysis on certain files.        | `false`  | `false` |
| `max-file-size-kb` | Ignore files larger than the specified size (in kB units).                                    | `false`  | `200`   |

You can include the following **ruleset** options in the `static-analysis.datadog.yml` file:

| Name               | Description                                                                                                          | Required |
|--------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| `rules`            | A list of rule configurations for rules belonging to ruleset.                                                        | `false`  |
| `ignore`           | A list of path prefixes and glob patterns to ignore for this specific ruleset. Matching files will not be analyzed.  | `false`  |
| `only`             | A list of path prefixes and glob patterns to analyze for this specific ruleset. Only matching files will be analyzed.| `false`  |

You can include the following **rule** options in the `static-analysis.datadog.yml` file:

| Name               | Description                                                                                                          | Required |
|--------------------|----------------------------------------------------------------------------------------------------------------------|----------|
| `ignore`           | A list of path prefixes and glob patterns to ignore for this specific rule. Matching files will not be analyzed.     | `false`  |
| `only`             | A list of path prefixes and glob patterns to analyze for this specific rule. Only matching files will be analyzed.   | `false`  |
| `arguments`        | A map of values for rules that support customizable arguments.                                                       | `false`  |

The map in the `arguments` field uses an argument's name as its key, and the values are either strings or maps:

* To set a value for the whole repository, you can specify it as a string.
* To set different values for different subtrees in the repository, you can specify them as a map from a subtree prefix to the value that the argument will have within that subtree. 

The full structure of the `static-analysis.datadog.yml` file is as follows:

```yaml
rulesets:
  - ruleset-name
  - ruleset-name:
    # Only apply this ruleset to the following paths/files
    only:
      - "path/example"
      - "**/*.file"
    # Do not apply this ruleset in the following paths/files
    ignore:
      - "path/example"
      - "**/*.file"
  - ruleset-name:
    rules:
      rule-name:
        # Only apply this rule to the following paths/files
        only:
          - "path/example"
          - "**/*.file"
        # Do not apply this rule to the following paths/files
        ignore:
          - "path/example"
          - "**/*.file"
        arguments:
          # Set the rule's argument to value.
          argument-name: value
      rule-name:
        arguments:
          # Set different argument values in different subtrees
          argument-name:
            # Set the rule's argument to value_1 by default (root path of the repo)
            /: value_1
            # Set the rule's argument to value_2 for specific paths
            path/example: value_2
# Only analyze any ruleset in the following paths/files
only:
  - "path/example"
  - "**/*.file"
# Do not analyze any ruleset in the following paths/files
ignore:
  - "path/example"
  - "**/*.file"
```

For example, you can use the following:

```yaml
rulesets:
  - python-best-practices
  - python-security
  - python-code-style:
    rules:
      max-function-lines:
        # Do not apply the rule max-function-lines to the following files
        ignore:
          - "src/main/util/process.py"
          - "src/main/util/datetime.py"
        arguments:
          # Set the max-function-lines rule's threshold to 150 lines
          max-lines: 150
      max-class-lines:
        arguments:
          # Set different thresholds for the max-class-lines rule in different subtrees
          max-lines:
            # Set the rule's threshold to 200 lines by default (root path of the repo)
            /: 200
            # Set the rule's threshold to 100 lines in src/main/backend
            src/main/backend: 100
  - python-inclusive
  - python-django:
    # Only apply the python-django ruleset to the following paths
    only:
      - "src/main/backend"
      - "src/main/django"
    # Do not apply the python-django ruleset in files matching the following pattern
    ignore:
      - "src/main/backend/util/*.py"
# Only analyze source files
only:
  - "src/main"
  - "src/tests"
  - "**/*.py"
# Do not analyze third-party or generated files 
ignore:
  - "lib/third_party"
  - "**/*.generated.py"
  - "**/*.pb.py"
```

## Set up the GitHub integration 

You must configure a GitHub App using the [GitHub integration tile][9] and set up the [source code integration][10] to see the offending code snippets as part of the Static Analysis results in the Datadog UI. 

When installing a GitHub App, the following permissions are required to enable certain features:

- `Content: Read`, which allows you to see code snippets displayed in Datadog
- `Pull Request: Read & Write`, which allows Datadog to add feedback for violations directly in your pull requests using [pull request comments][11]

## Configure your CI/CD provider

Datadog Static Analysis runs in your CI pipelines using the [`datadog-ci` CLI][8] and checks your code against Datadog's default rulesets. Configure your [Datadog API and application keys][3] and run Static Analysis in the respective CI provider.

{{< whatsnext desc="See the documentation for information about the following integrations:">}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

### Upload third-party static analysis results to Datadog

<div class="alert alert-info">
  SARIF importing has been tested for Snyk, CodeQL, Semgrep, Checkov, Gitleaks, and Sysdig. Please reach out to <a href="/help">Datadog Support</a> if you experience any issues with other SARIF-compliant tools.
</div>

You can send results from third-party static analysis tools to Datadog, provided they are in the interoperable [Static Analysis Results Interchange Format (SARIF) Format][2]. Node.js version 14 or later is required.

SARIF レポートをアップロードするには

1. [`DD_API_KEY` 変数と `DD_APP_KEY` 変数が定義されている][4]ことを確認します。
2. Optionally, set a [`DD_SITE` variable][7] (this default to `datadoghq.com`).
3. `datadog-ci` ユーティリティをインストールします。

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. サードパーティの静的分析ツールをコード上で実行し、結果を SARIF 形式で出力します。
5. 結果を Datadog にアップロードします。

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION --service <datadog-service> --env <datadog-env>
   ```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/setup/code-analysis
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif 
[3]: /developers/ide_plugins/idea/#static-analysis
[4]: /account_management/api-app-keys/
[6]: /code_analysis/static_analysis_rules
[7]: /getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /integrations/guide/source-code-integration
[11]: /code_analysis/github_pull_requests/
