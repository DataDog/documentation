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
    {{< nextlink href="security/code_security/static_analysis/setup/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="security/code_security/static_analysis/setup/generic_ci_providers" >}}Generic CI Providers{{< /nextlink >}}
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

By default, Datadog Static Code Analysis (SAST) scans your repositories with [Datadog’s default rulesets][6] for your programming language(s). Configure which rulesets or rules to run or ignore, and other parameters, locally in your repository or within the Datadog App. For the full configuration reference, see [Static Code Analysis (SAST) Configuration][27].

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
[26]: /security/code_security/guides/configuration/
[27]: /security/code_security/static_analysis/configuration/
[101]: https://docs.datadoghq.com/software_catalog/service_definitions/v3-0/
[102]: https://docs.datadoghq.com/internal_developer_portal/software_catalog/entity_model/?tab=v30#codelocations
[103]: https://docs.datadoghq.com/data_security/data_retention_periods/
