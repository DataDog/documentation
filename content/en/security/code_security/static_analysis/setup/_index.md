---
title: Set up Static Code Analysis (SAST)
description: Learn about Datadog Static Code Analysis to scan code for quality issues and security vulnerabilities before your code reaches production.
aliases:
- /continuous_integration/static_analysis
- /static_analysis
- /security/code_security/static_analysis/circleci_orbs/
- /code_analysis/static_analysis/setup/
is_beta: false
algolia:
  tags: ['static analysis', 'static analysis rules', 'static application security testing', 'SAST']
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Security is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Overview
To set up Datadog SAST in-app, navigate to [**Security** > **Code Security**][1].

## Select where to run Static Code Analysis scans
### Scan with Datadog-hosted scanning

You can run Datadog Static Code Analysis (SAST) scans directly on Datadog infrastructure. Supported repository types include:
- [GitHub][18] (excluding repositories that use [Git Large File Storage][17])
- [GitLab.com and GitLab Self-Managed][20]
- [Azure DevOps][19]

To get started, navigate to the [**Code Security** page][1].

### Scan in CI pipelines
Datadog Static Code Analysis runs in your CI pipelines using the [`datadog-ci` CLI][8].

First, configure your Datadog API and application keys. Add `DD_APP_KEY` and `DD_API_KEY` as secrets. Please ensure your Datadog application key has the `code_analysis_read` scope.

Next, run Static Code Analysis by following instructions for your chosen CI provider below.

{{< whatsnext desc="See instructions based on your CI provider:">}}
    {{< nextlink href="security/code_security/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
{{< /whatsnext >}}

## Select your source code management provider
Datadog Static Code Analysis supports all source code management providers, with native support for GitHub, GitLab, and Azure DevOps.

{{< tabs >}}
{{% tab "GitHub" %}}

Configure a GitHub App with the [GitHub integration tile][1] and set up the [source code integration][2] to enable inline code snippets and [pull request comments][3].

When installing a GitHub App, the following permissions are required to enable certain features:

- `Content: Read`, which allows you to see code snippets displayed in Datadog
- `Pull Request: Read & Write`, which allows Datadog to add feedback for violations directly in your pull requests using [pull request comments][3], as well as open pull requests to [fix vulnerabilities][4]
- `Checks: Read & Write`, which allows you to create checks on SAST violations to block pull requests

[1]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: /integrations/guide/source-code-integration
[3]: /security/code_security/dev_tool_int/github_pull_requests
[4]: /security/code_security/dev_tool_int/

{{% /tab %}}
{{% tab "GitLab" %}}

See the [GitLab source code setup instructions][1] to connect GitLab repositories to Datadog. Both GitLab.com and Self-Managed instances are supported.

[1]: /integrations/gitlab-source-code/#setup 

{{% /tab %}}
{{% tab "Azure DevOps" %}}

**Note:** Your Azure DevOps integrations must be connected to a Microsoft Entra tenant. Azure DevOps Server is **not** supported.

See the [Azure source code setup instructions][4] to connect Azure DevOps repositories to Datadog.

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /integrations/azure-devops-source-code/#setup
[5]: /getting_started/site/

{{% /tab %}}
{{% tab "Other" %}}

If you are using another source code management provider, configure Static Code Analysis to run in your CI pipelines using the `datadog-ci` CLI tool and [upload the results](#upload-third-party-static-analysis-results-to-datadog) to Datadog.
You **must** run an analysis of your repository on the default branch before results can begin appearing on the **Code Security** page.

{{% /tab %}}
{{< /tabs >}}

## Customize your configuration

By default, Datadog Static Code Analysis (SAST) scans your repositories with [Datadog's default rulesets][6] for your programming language(s). You can customize which rulesets or rules to run or ignore, in addition to other parameters. You can customize these settings locally in your repository or within the Datadog App.

### Configuration locations

Datadog Static Code Analysis (SAST) can be configured within Datadog and/or by using a file within your repository's **root directory**.

There are three levels of configuration:

* Org-level configuration (Datadog)
* Repository-level configuration (Datadog)
* Repository-level configuration (repo file)

All three configurations use the same YAML format, and they are merged **in order** (see [Configuration precedence and merging](#configuration-precedence-and-merging)).

#### Default rulesets

By default, Datadog enables the default rulesets for your repository’s programming language(s) (`use-default-rulesets: true`). To modify the enabled rulesets:

- **Add rulesets**: List them under `use-rulesets`
- **Disable specific rulesets**: List them under `ignore-rulesets`
- **Disable all default rulesets**: Set `use-default-rulesets: false`, then list the desired rulesets under `use-rulesets`

For the full list of default rulesets, see [Static Code Analysis (SAST) Rules][6].

#### Configuration precedence and merging

Configurations are merged in the following order, where each level overrides the one before it:

1. **Org-level (Datadog)**
1. **Repo-level (Datadog)**
1. **Repo-level file** (`code-security.datadog.yaml`)

The following merge rules apply:

- **Lists** (`use-rulesets`, `ignore-rulesets`, `ignore-paths`, `only-paths`): Concatenated, with duplicates removed
- **Scalar values** (`use-default-rulesets`, `use-gitignore`, `ignore-generated-files`, `max-file-size-kb`, `category`, and per-path entries for `severity` and `arguments`): The value from the highest-precedence configuration is used
- **Maps** (`ruleset-configs`, `rule-configs`, `arguments`): Recursively merged

The following example shows how configurations are merged:

**Org-level:**

```yaml
schema-version: v1.0
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 10
```

**Repo-level:**

```yaml
schema-version: v1.0
sast:
  use-rulesets:
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
```

Merged result:

```yaml
schema-version: v1.0
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
    - B
  ignore-rulesets:
    - C  
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
```

The `maxCount: 22` value from the repo-level configuration overrides the `maxCount: 10` value from the org-level configuration because repo-level settings have higher precedence. All other fields from the org-level configuration are retained because they are not overridden.

#### Org-level configuration

{{< img src="/security/code_security/org-level-configuration.png" alt="Org-level configuration UI" style="width:100%;" >}}

Configurations at the org level apply to all repositories that are being analyzed and is a good place to define rules that must run or global paths/files to be ignored.

#### Repository level configuration

{{< img src="/security/code_security/repo-level-configuration.png" alt="Repo-level configuration UI" style="width:100%;" >}}

Configurations at the repository level apply only to the repository selected. These configurations are merged with the org configuration, with the repository configuration taking precedence. Repository level configurations are a good place to define overrides for repository specific details, or add rules that are specific to only that repo for example.

#### Repository level configuration (file)

In addition to the configurations provided for the Org and Repository level, you can also define a configuration at the root of your repo in the form of ``code-security.datadog.yaml``. This file takes precedence over the Repository level configuration defined in Datadog. Repository level file configurations are a useful method to change rule configs and iterate on setup and testing.

### Configuration format

The following configuration format applies to all configuration locations: Org level, Repository level, and Repository level (file).

The configuration file must begin with `schema-version: v1.0`, followed by a `sast` key containing the analysis configuration. The full structure is as follows:

```yaml
schema-version: v1.0
sast:
  use-default-rulesets: true
  use-rulesets:
    - ruleset-name
  ignore-rulesets:
    # Always ignore these rulesets (even if it is a default ruleset or listed in `use-rulesets`)
    - ignored-ruleset-name
  ruleset-configs:
    ruleset-name:
      # Only apply this ruleset to the following paths/files
      only-paths:
        - "path/example"
        - "**/*.file"
      # Do not apply this ruleset in the following paths/files
      ignore-paths:
        - "path/example/directory"
        - "**/config.file"
      rule-configs:
        rule-name:
          # Only apply this rule to the following paths/files
          only-paths:
            - "path/example"
            - "**/*.file"
          # Do not apply this rule to the following paths/files
          ignore-paths:
            - "path/example/directory"
            - "**/config.file"
          arguments:
            # Set the rule's argument to value.
            argument-name: value
          severity: ERROR
          category: CODE_STYLE
        rule-name:
          arguments:
            # Set different argument values in different subtrees
            argument-name:
              # Set the rule's argument to value_1 by default (root path of the repo)
              /: value_1
              # Set the rule's argument to value_2 for specific paths
              path/example: value_2
  global-config:
    # Only analyze the following paths/files
    only-paths:
      - "path/example"
      - "**/*.file"
    # Do not analyze the following paths/files
    ignore-paths:
      - "path/example/directory"
      - "**/config.file"
    use-gitignore: true
    ignore-generated-files: true
    max-file-size-kb: 200
```

The `sast` key supports the following fields:

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `use-default-rulesets` | Boolean | Enable Datadog's default rulesets. | `true` |
| `use-rulesets` | Array | A list of ruleset names to enable. | None |
| `ignore-rulesets` | Array | A list of ruleset names to disable. Takes precedence over `use-rulesets` and `use-default-rulesets`. | None |
| `ruleset-configs` | Object | A map from ruleset name to its configuration. | None |
| `global-config` | Object | Global settings for the repository. | None |

---

## Ruleset configuration

Each entry in the `ruleset-configs` map configures a specific ruleset. A ruleset does not need to appear in `use-rulesets` to have a configuration; the configuration is applied whenever that ruleset is enabled (including through `use-default-rulesets`).

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `only-paths` | Array | File paths or glob patterns. Only files matching these patterns are processed for this ruleset. | None |
| `ignore-paths` | Array | File paths or glob patterns to exclude from analysis for this ruleset. | None |
| `rule-configs` | Object | A map from rule name to its configuration. | None |

---

## Rule configuration

Each entry in a ruleset's `rule-configs` map configures a specific rule:

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `only-paths` | Array | File paths or glob patterns. The rule is applied only to files matching these patterns. | None |
| `ignore-paths` | Array | File paths or glob patterns to exclude. The rule is not applied to files matching these patterns. | None |
| `arguments` | Object | Parameters and values for the rule. Values can be scalars or defined per path. | None |
| `severity` | String or Object | The rule severity. Valid values: `ERROR`, `WARNING`, `NOTICE`, `NONE`. Can be a single value or defined per path. | None |
| `category` | String | The rule category. Valid values: `BEST_PRACTICES`, `CODE_STYLE`, `ERROR_PRONE`, `PERFORMANCE`, `SECURITY`. | None |

---

## Argument and severity configuration

Arguments and severity can be defined in one of two formats:

1. **Single value:** Applies to the whole repository.

   ```yaml
   arguments:
     argument-name: value
   severity: ERROR
   ```

2. **Per-path mapping:** Different values for different subtrees. The longest matching path prefix applies. Use `/` as a catch-all default.

   ```yaml
   arguments:
     argument-name:
       /: value_default
       path/example: value_specific
   severity:
     /: WARNING
     path/example: ERROR
   ```

| **Key** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `/` | Any | The default value when no specific path is matched. | None |
| `specific path` | Any | The value for files matching the specified path or glob pattern. | None |

The `category` field takes a single string value for the whole repository.

---

## Global configuration

The `global-config` object controls repository-wide settings:

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `only-paths` | Array | File paths or glob patterns. Only matching files are analyzed. | None |
| `ignore-paths` | Array | File paths or glob patterns to exclude. Matching files are not analyzed. | None |
| `use-gitignore` | Boolean | Whether to include entries from the `.gitignore` file in `ignore-paths`. | `true` |
| `ignore-generated-files` | Boolean | Whether to include common generated file patterns in `ignore-paths`. | `true` |
| `max-file-size-kb` | Number | Maximum file size (in kB) to analyze. Larger files are ignored. | `200` |

---

Example configuration:

```yaml
schema-version: v1.0
sast:
  use-default-rulesets: false
  use-rulesets:
    - python-best-practices
    - python-security
    - python-code-style
    - python-inclusive
    - python-django
    - custom-python-ruleset
  ruleset-configs:
    python-code-style:
      rule-configs:
        max-function-lines:
          # Do not apply the rule max-function-lines to the following files
          ignore-paths:
            - "src/main/util/process.py"
            - "src/main/util/datetime.py"
          arguments:
            # Set the max-function-lines rule's threshold to 150 lines
            max-lines: 150
          # Override this rule's severity
          severity: NOTICE
        max-class-lines:
          arguments:
            # Set different thresholds for the max-class-lines rule in different subtrees
            max-lines:
              # Set the rule's threshold to 200 lines by default (root path of the repo)
              /: 200
              # Set the rule's threshold to 100 lines in src/main/backend
              src/main/backend: 100
          # Override this rule's severity with different values in different subtrees
          severity:
            # Set the rule's severity to NOTICE by default
            /: NOTICE
            # Set the rule's severity to NONE in tests/
            tests: NONE
    python-django:
      # Only apply the python-django ruleset to the following paths
      only-paths:
        - "src/main/backend"
        - "src/main/django"
      # Do not apply the python-django ruleset in files matching the following pattern
      ignore-paths:
        - "src/main/backend/util/*.py"
  global-config:
    # Only analyze source files
    only-paths:
      - "src/main"
      - "src/tests"
      - "**/*.py"
    # Do not analyze third-party files
    ignore-paths:
      - "lib/third_party"
```

## Legacy configuration

Datadog Static Code Analysis (SAST) previously used a different configuration file (`static-analysis.datadog.yml`) and schema. This schema is deprecated and does not receive new updates, but it remains [documented][25] in the `datadog-static-analyzer` repository.

If both files are present, `code-security.datadog.yaml` takes precedence over `static-analysis.datadog.yml`.


### Ignoring violations

#### Ignore for a repository
Add a rule configuration in your `code-security.datadog.yaml` file. The following example ignores the rule `javascript-express/reduce-server-fingerprinting` for all directories.

```yaml
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "**"
```

#### Ignore for a file or directory
Add a rule configuration in your `code-security.datadog.yaml` file. The following example ignores the rule `javascript-express/reduce-server-fingerprinting` for a specific file. For more information on how to ignore by path, see [Customize your configuration](#customize-your-configuration).

```yaml
schema-version: v1.0
sast:
  ruleset-configs:
    javascript-express:
      rule-configs:
        reduce-server-fingerprinting:
          ignore-paths:
            - "ad-server/src/app.js"
```

#### Ignore for a specific instance

To ignore a specific instance of a violation, comment `no-dd-sa` above the line of code to ignore. This prevents that line from ever producing a violation. For example, in the following Python code snippet, the line `foo = 1` would be ignored by Static Code Analysis scans.

```python
#no-dd-sa
foo = 1
bar = 2
```

You can also use `no-dd-sa` to only ignore a particular rule rather than ignoring all rules. To do so, specify the name of the rule you wish to ignore in place of `<rule-name>` using this template:

`no-dd-sa:<rule-name>`

For example, in the following JavaScript code snippet, the line `my_foo = 1` is analyzed by all rules except for the `javascript-code-style/assignment-name` rule, which tells the developer to use [camelCase][6] instead of [snake_case][7].

```javascript
// no-dd-sa:javascript-code-style/assignment-name
my_foo = 1
myBar = 2
```

## Link findings to Datadog services and teams

{{% security-products/link-findings-to-datadog-services-and-teams %}}


## Diff-aware scanning

Diff-aware scanning enables Datadog's static analyzer to only scan the files modified by a commit in a feature branch. It accelerates scan time significantly by not having the analysis run on every file in the repository for every scan. To enable diff-aware scanning in your CI pipeline, follow these steps:

1. Make sure your `DD_APP_KEY`, `DD_SITE` and `DD_API_KEY` variables are set in your CI pipeline.
2. Add a call to `datadog-ci git-metadata upload` before invoking the static analyzer. This command ensures that Git metadata is available to the Datadog backend. Git metadata is required to calculate the number of files to analyze.
3. Ensure that the datadog-static-analyzer is invoked with the flag `--diff-aware`.

Example of commands sequence (these commands must be invoked in your Git repository):
```bash
datadog-ci git-metadata upload

datadog-static-analyzer -i /path/to/directory -g -o sarif.json -f sarif –-diff-aware <...other-options...>
```

**Note:** When a diff-aware scan cannot be completed, the entire directory is scanned.

## Upload third-party static analysis results to Datadog

<div class="alert alert-info">
  SARIF importing has been tested for Snyk, CodeQL, Semgrep, Gitleaks, and Sysdig. Reach out to <a href="/help">Datadog Support</a> if you experience any issues with other SARIF-compliant tools.
</div>

You can send results from third-party static analysis tools to Datadog, provided they are in the interoperable [Static Analysis Results Interchange Format (SARIF) Format][2]. Node.js version 14 or later is required.

To upload a SARIF report:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][4].
2. Optionally, set a [`DD_SITE` variable][7] (this defaults to `datadoghq.com`).
3. Install the `datadog-ci` utility:

   ```bash
   npm install -g @datadog/datadog-ci
   ```

4. Run the third-party static analysis tool on your code and output the results in the SARIF format.
5. Upload the results to Datadog:

   ```bash
   datadog-ci sarif upload $OUTPUT_LOCATION
   ```

## SARIF Support Guidelines

Datadog supports ingestion of third-party SARIF files that are compliant with [the 2.1.0 SARIF schema][15]. The SARIF
schema is used differently by static analyzer tools. If you want to send third-party SARIF files to Datadog, please
ensure they comply with the following details:

 - The violation location is specified through the `physicalLocation` object of a result.
    - The `artifactLocation` and it's `uri` **must be relative** to the repository root.
    - The `region` object is the part of the code highlighted in the Datadog UI.
 - The `partialFingerprints` is used to uniquely identify a finding across a repository.
 - `properties` and `tags` adds more information:
    - The tag `DATADOG_CATEGORY` specifies the category of the finding. Acceptable values are `SECURITY`, `PERFORMANCE`, `CODE_STYLE`, `BEST_PRACTICES`, `ERROR_PRONE`.
    - The violations annotated with the category `SECURITY` are surfaced in the Vulnerabilities explorer and the Security tab of the repository view.
 - The `tool` section must have a valid `driver` section with a `name` and `version` attributes.

For example, here's an example of a SARIF file processed by Datadog:


```json

{
    "runs": [
        {
            "results": [
                {
                    "level": "error",
                    "locations": [
                        {
                            "physicalLocation": {
                                "artifactLocation": {
                                    "uri": "missing_timeout.py"
                                },
                                "region": {
                                    "endColumn": 76,
                                    "endLine": 6,
                                    "startColumn": 25,
                                    "startLine": 6
                                }
                            }
                        }
                    ],
                    "message": {
                        "text": "timeout not defined"
                    },
                    "partialFingerprints": {
                        "DATADOG_FINGERPRINT": "b45eb11285f5e2ae08598cb8e5903c0ad2b3d68eaa864f3a6f17eb4a3b4a25da"
                    },
                    "properties": {
                        "tags": [
                            "DATADOG_CATEGORY:SECURITY",
                            "CWE:1088"
                        ]
                    },
                    "ruleId": "python-security/requests-timeout",
                    "ruleIndex": 0
                }
            ],
            "tool": {
                "driver": {
                    "informationUri": "https://www.datadoghq.com",
                    "name": "<tool-name>",
                    "rules": [
                        {
                            "fullDescription": {
                                "text": "Access to remote resources should always use a timeout and appropriately handle the timeout and recovery. When using `requests.get`, `requests.put`, `requests.patch`, etc. - we should always use a `timeout` as an argument.\n\n#### Learn More\n\n - [CWE-1088 - Synchronous Access of Remote Resource without Timeout](https://cwe.mitre.org/data/definitions/1088.html)\n - [Python Best Practices: always use a timeout with the requests library](https://www.codiga.io/blog/python-requests-timeout/)"
                            },
                            "helpUri": "https://link/to/documentation",
                            "id": "python-security/requests-timeout",
                            "properties": {
                                "tags": [
                                    "CWE:1088"
                                ]
                            },
                            "shortDescription": {
                                "text": "no timeout was given on call to external resource"
                            }
                        }
                    ],
                    "version": "<tool-version>"
                }
            }
        }
    ],
    "version": "2.1.0"
}
```

## SARIF to CVSS severity mapping

The [SARIF format][15] defines four severities: none, note, warning, and error.
However, Datadog reports violations and vulnerabilities severity using the [Common Vulnerability Scoring System][16] (CVSS),
which defined five severities: critical, high, medium, low and none.

When ingesting SARIF files, Datadog maps SARIF severities into CVSS severities using the mapping rules below.


| SARIF severity | CVSS severity |
|----------------|---------------|
| Error          | Critical      |
| Warning        | High          |
| Note           | Medium        |
| None           | Low           |

## Data Retention

Datadog stores findings in accordance with our [Data Rentention Periods](https://docs.datadoghq.com/data_security/data_retention_periods/). Datadog does not store or retain customer source code.

<!-- ## Further Reading

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[3]: /ide_plugins/idea/#static-analysis
[4]: /account_management/api-app-keys/
[6]: /security/code_security/static_analysis/static_analysis_rules
[7]: /getting_started/site/
[8]: https://github.com/DataDog/datadog-ci
[9]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[10]: /integrations/guide/source-code-integration
[11]: /security/code_security/dev_tool_int/github_pull_requests
[12]: /security/code_security/dev_tool_int/github_pull_requests#fixing-a-vulnerability-directly-from-datadog
[13]: https://docs.github.com/en/actions/security-for-github-actions/security-guides
[15]: https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html
[16]: https://www.first.org/cvss/
[17]: https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-git-large-file-storage
[18]: /security/code_security/static_analysis/setup/?tab=github#select-your-source-code-management-provider
[19]: /security/code_security/static_analysis/setup/?tab=azuredevops#select-your-source-code-management-provider
[20]: /security/code_security/static_analysis/setup/?tab=gitlab#select-your-source-code-management-provider
[22]: https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/?tab=v30#migrating-to-v30
[24]: https://docs.datadoghq.com/account_management/teams/
[25]: https://github.com/DataDog/datadog-static-analyzer/blob/main/doc/legacy_config.md
[101]: https://docs.datadoghq.com/software_catalog/service_definitions/v3-0/
[102]: https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/data_security/data_retention_periods/
