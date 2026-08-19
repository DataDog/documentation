---
title: Set up IaC Security
aliases:
    - /security/cloud_security_management/setup/iac_scanning/
further_reading:
    - link: '/security/code_security'
      tag: 'Documentation'
      text: 'Code Security'
    - link: '/security/code_security/iac_security'
      tag: 'Documentation'
      text: 'IaC Security'
    - link: '/security/code_security/iac_security/configuration'
      tag: 'Documentation'
      text: 'Configure IaC Security'
    - link: '/security/code_security/iac_security/iac_rules/'
      tag: 'Documentation'
      text: 'IaC Security Rules'
---

Use the following instructions to enable Infrastructure as Code (IaC) Security for Code Security. IaC Security supports multiple IaC configurations stored in GitHub, GitLab, or Azure DevOps repositories.

{{< tabs >}}
{{% tab "GitHub" %}}

### Install the GitHub integration

To connect your GitHub repositories and enable PR comments, see the setup instructions in [Pull Request Comments][1].

### Enable IaC Security for your repositories

After setting up the GitHub integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the {{< ui >}}Activate scanning for your repositories{{< /ui >}} section.
1. Under {{< ui >}}Select your source code management provider{{< /ui >}}, select {{< ui >}}GitHub{{< /ui >}}.
1. Under {{< ui >}}Select where your scans should run{{< /ui >}}, select {{< ui >}}Datadog{{< /ui >}}.
1. Under {{< ui >}}Connect your GitHub repositories{{< /ui >}}, do one of the following:
    - To connect a new GitHub account, click {{< ui >}}Add GitHub Account{{< /ui >}}.
    - To enable IaC Security for an existing account, click {{< ui >}}Select repositories{{< /ui >}}, or {{< ui >}}Edit{{< /ui >}} if Code Security is already enabled.
1. To enable IaC Security, do one of the following:
    - To enable it for all repositories, toggle {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} to the ON position.
    - To enable it for a single repository, toggle the {{< ui >}}IaC{{< /ui >}} switch to ON for that repository.

[1]: /security/code_security/dev_tool_int/pull_request_comments/?tab=github#set-up-pull-request-comments
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "GitLab" %}}

### Install the GitLab integration

To connect your GitLab repositories and enable PR comments, see the setup instructions in [GitLab Source Code][1].

### Enable IaC Security for your repositories

After setting up the GitLab integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the {{< ui >}}Activate scanning for your repositories{{< /ui >}} section.
1. Under {{< ui >}}Select your source code management provider{{< /ui >}}, select {{< ui >}}GitLab{{< /ui >}}.
1. Under {{< ui >}}Select where your scans should run{{< /ui >}}, select {{< ui >}}Datadog{{< /ui >}}.
1. Under {{< ui >}}Connect your GitLab repositories{{< /ui >}}, do one of the following:
    - To connect a new GitLab instance, click {{< ui >}}Connect GitLab Instance{{< /ui >}}.
    - To enable IaC Security for an existing account, click {{< ui >}}Select repositories{{< /ui >}}, or {{< ui >}}Edit{{< /ui >}} if Code Security is already enabled.
1. To enable IaC Security, do one of the following:
    - To enable it for all repositories, toggle {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} to the ON position.
    - To enable it for a single repository, toggle the {{< ui >}}IaC{{< /ui >}} switch to ON for that repository.

[1]: /integrations/gitlab-source-code/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

### Install the Azure DevOps integration

To connect your Azure DevOps repositories and enable PR comments, see the setup instructions in [Azure DevOps Source Code][1].

### Enable IaC Security for your repositories

After setting up the Azure DevOps integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the {{< ui >}}Activate scanning for your repositories{{< /ui >}} section.
1. Under {{< ui >}}Select your source code management provider{{< /ui >}}, select {{< ui >}}Azure DevOps{{< /ui >}}.
1. Under {{< ui >}}Select where your scans should run{{< /ui >}}, select {{< ui >}}Datadog{{< /ui >}}.
1. Under {{< ui >}}Connect your Azure DevOps repositories{{< /ui >}}, do one of the following:
    - To connect a new Azure DevOps organization, click {{< ui >}}Connect Microsoft Entra App{{< /ui >}}.
    - To enable IaC Security for an existing account, click {{< ui >}}Select repositories{{< /ui >}}, or {{< ui >}}Edit{{< /ui >}} if Code Security is already enabled.
1. To enable IaC Security, do one of the following:
    - To enable it for all repositories, toggle {{< ui >}}Enable Infrastructure as Code Scanning (IaC){{< /ui >}} to the ON position.
    - To enable it for a single repository, toggle the {{< ui >}}IaC{{< /ui >}} switch to ON for that repository.

[1]: /integrations/azure-devops-source-code/#source-code-functionality
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{< /tabs >}}

## Set up IaC with a Generic CI Provider

### Overview

If you don't use GitHub Actions, GitLab CI/CD, or Azure DevOps, you can run the [Datadog IaC Scanner][8] directly in your CI pipeline and upload IaC scan results to Datadog using the [`datadog-ci` CLI][9].

**If you are running IaC Security on a non-GitHub repository**, ensure that the first scan runs on your default branch. If your default branch is not one of `master`, `main`, `default`, `stable`, `source`, `prod`, or `develop`, attempt an upload for your repository and then manually override the default branch in [{{< ui >}}Repository Settings{{< /ui >}}][10]. Afterwards, uploads from non-default branches succeed.

Prerequisites:

- Node.js and npm
- `curl`
- `tar`
- Permission to install the scanner in `/usr/local/bin`

Configure the following environment variables:

| Name         | Description                                                                                                                                                 | Required | Default         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------- |
| `DD_API_KEY` | Your Datadog API key. This key is created by your [Datadog organization][4] and should be stored as a secret.                                               | Yes      |                 |
| `DD_APP_KEY` | Your Datadog application key. This key, created by your [Datadog organization][4], should include the `code_analysis_read` scope and be stored as a secret. | Yes      |                 |
| `DD_SITE`    | The [Datadog site][5] to send information to. Your Datadog site is `datadoghq.com`.                                                                         | No       | `datadoghq.com` |

Add the following to your CI pipeline:

```bash
# Set the Datadog site to send information to
export DD_SITE="datadoghq.com"

# Install dependencies
npm install -g @datadog/datadog-ci

# Download the latest DataDog IaC Scanner
export IAC_SCANNER_URL="https://github.com/DataDog/datadog-iac-scanner/releases/latest/download/datadog-iac-scanner_linux_amd64.tar.gz"
curl -L "${IAC_SCANNER_URL}" -o /tmp/datadog-iac-scanner.tar.gz
tar xfz /tmp/datadog-iac-scanner.tar.gz -C /tmp
mv /tmp/datadog-iac-scanner /usr/local/bin/datadog-iac-scanner

# Run the DataDog IaC scanner
exit_code=0
/usr/local/bin/datadog-iac-scanner scan -p . -o /tmp || exit_code=$?
if [ $exit_code -lt 20 -o $exit_code -gt 60 ]; then echo "IaC scan failed" ; exit $exit_code ; fi

# Upload results
datadog-ci sarif upload /tmp/datadog-iac-scanner-result.sarif
```

<div class="alert alert-info">
  This example uses the x86_64 Linux version of the Datadog IaC Scanner. If you're using a different OS or architecture, select the appropriate release from the <a href="https://github.com/DataDog/datadog-iac-scanner/releases">GitHub Releases</a> page and update the <code>DATADOG_IAC_SCANNER_URL</code> value.
</div>

## Upload third-party static analysis results to IaC Security

<div class="alert alert-info">
  You can import SARIF results from third-party Infrastructure-as-Code (IaC) scanners, including Checkov, into IaC Security. See <a href="https://docs.datadoghq.com/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog">
  Upload third-party static analysis results</a> for SARIF-compliant tools supported for SAST. Node.js version 14 or later is required.
</div>

To upload a SARIF report:

1. Ensure the [`DD_API_KEY` and `DD_APP_KEY` variables are defined][4].
2. Optionally, set a [`DD_SITE` variable][5] (this defaults to `datadoghq.com`).
3. Install the `datadog-ci` utility (version 2.0 or later):

    ```bash
    npm install -g @datadog/datadog-ci
    ```

4. Run the third-party IaC scanning tool (e.g., Checkov, Trivy, KICS) on your code and output the results in the SARIF v2.1.0 format.
5. Upload the results to Datadog:

    ```bash
    datadog-ci sarif upload $OUTPUT_LOCATION
    ```
    - Upload Options
        - `--tags:` Add custom tags (format: `key:value`)
        - `--max-concurrency:` Set concurrent uploads (default: 20)
        - `--dry-run:` Validate without uploading

### Required SARIF Attributes

To ensure proper ingestion and display in Datadog IaC Scanning for third-party scanners (excluding Checkov), your SARIF file MUST include the following attributes to be recognized as an IaC security finding:

1. `Runs[...].tool.driver.name: Datadog IaC Scanning`
2. `Runs[...].tool.driver.version: "code_update"` or `"full_scan"`
    - `"full_scan”` for complete repository scans
    - `"code_update"` for pull request / incremental scans
3. `Runs[...].tool.driver.rules[...].properties.tags:`
    - `["DATADOG_RULE_TYPE:IAC_SCANNING"]`
    - `[“DATADOG_SCANNED_FILE_COUNT: <number>”]`, where `"number"` specifies the number of scanned files
4. `Runs[...].results[...].locations[...].physicalLocation:`
    - `artifactLocation.uri`: Relative path to file from repository root
    - `region.startLine`: Starting line number
    - `region.endLine`: Ending line number
    - `region.startColumn`: Starting column number
    - `region.endColumn`: Ending column number

<div class="alert alert-info">Suppressions silently drop violations. If <code>results[ ].suppressions</code> exists, the violation is completely ignored.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[4]: /account_management/api-app-keys/
[5]: /getting_started/site/
[6]: https://docs.datadoghq.com/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog
[7]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[8]: https://github.com/DataDog/datadog-iac-scanner
[9]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#sarif
[10]: https://app.datadoghq.com/source-code/repositories
