---
title: Set up IaC Security
aliases:
  - /security/cloud_security_management/setup/iac_scanning/
further_reading:
  - link: "/security/code_security"
    tag: "Documentation"
    text: "Code Security"
  - link: "/security/code_security/iac_security"
    tag: "Documentation"
    text: "IaC Security"
  - link: "/security/code_security/iac_security/exclusions"
    tag: "Documentation"
    text: "Configure IaC Security Exclusions"
  - link: "/security/code_security/iac_security/iac_rules/"
    tag: "Documentation"
    text: "IaC Security Rules"
---

Use the following instructions to enable Infrastructure as Code (IaC) Security for Code Security. IaC Security supports Terraform and Kubernetes configurations stored in GitHub, GitLab, or Azure DevOps repositories.

{{< tabs >}}
{{% tab "GitHub" %}}

### Install the GitHub integration

To connect your GitHub repositories and enable PR comments, see the setup instructions in [Pull Request Comments][1].

### Enable IaC Security for your repositories

After setting up the GitHub integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the **Activate scanning for your repositories** section.
1. Under **Select your source code management provider**, select **GitHub**.
1. Under **Select where your scans should run**, select **Datadog**.
1. Under **Connect your GitHub repositories**, do one of the following:
    - To connect a new GitHub account, click **Add GitHub Account**.
    - To enable IaC Security for an existing account, click **Select repositories**, or **Edit** if Code Security is already enabled.
1. To enable IaC Security, do one of the following:
    - To enable it for all repositories, toggle **Enable Infrastructure as Code Scanning (IaC)** to the ON position.
    - To enable it for a single repository, toggle the **IaC** switch to ON for that repository.

[1]: /security/code_security/dev_tool_int/pull_request_comments/?tab=github#set-up-pull-request-comments
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "GitLab" %}}

### Install the GitLab integration

To connect your GitLab repositories and enable PR comments, see the setup instructions in [GitLab Source Code][1].

### Enable IaC Security for your repositories

After setting up the GitLab integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the **Activate scanning for your repositories** section.
1. Under **Select your source code management provider**, select **GitLab**.
1. Under **Select where your scans should run**, select **Datadog**.
1. Under **Connect your GitLab repositories**, do one of the following:
    - To connect a new GitLab instance, click **Connect GitLab Instance**.
    - To enable IaC Security for an existing account, click **Select repositories**, or **Edit** if Code Security is already enabled.
1. To enable IaC Security, do one of the following:
    - To enable it for all repositories, toggle **Enable Infrastructure as Code Scanning (IaC)** to the ON position.
    - To enable it for a single repository, toggle the **IaC** switch to ON for that repository.

[1]: /integrations/gitlab-source-code/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

### Install the Azure DevOps integration

To connect your Azure DevOps repositories and enable PR comments, see the setup instructions in [Azure DevOps Source Code][1].

### Enable IaC Security for your repositories

After setting up the Azure DevOps integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the **Activate scanning for your repositories** section.
1. Under **Select your source code management provider**, select **Azure DevOps**.
1. Under **Select where your scans should run**, select **Datadog**.
1. Under **Connect your Azure DevOps repositories**, do one of the following:
    - To connect a new Azure DevOps organization, click **Connect Microsoft Entra App**.
    - To enable IaC Security for an existing account, click **Select repositories**, or **Edit** if Code Security is already enabled.
1. To enable IaC Security, do one of the following:
    - To enable it for all repositories, toggle **Enable Infrastructure as Code Scanning (IaC)** to the ON position.
    - To enable it for a single repository, toggle the **IaC** switch to ON for that repository.

[1]: /integrations/azure-devops-source-code/#source-code-functionality
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{< /tabs >}}

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
4. `Runs[...].tool.driver.rules[...].properties.tags:`
    - `["DATADOG_RULE_TYPE:IAC_SCANNING"]`
    - `[“DATADOG_SCANNED_FILE_COUNT: <number>”]`, where `"number"` specifies the number of scanned files 
5. `Runs[...].results[...].locations[...].physicalLocation:`
    - `artifactLocation.uri`: Relative path to file from repository root
    - `region.startLine`: Starting line number
    - `region.endLine`: Ending line number
    - `region.startColumn`: Starting column number
    - `region.endColumn`: Ending column number
<div class="alert alert-info">Suppressions silently drop violations. If <code>results[ ].suppressions</code> exists, the violation is completely ignored</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup
[3]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
[4]: /account_management/api-app-keys/
[5]: /getting_started/site/
[6]: https://docs.datadoghq.com/security/code_security/static_analysis/setup/?tab=github#upload-third-party-static-analysis-results-to-datadog
[7]: https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif
