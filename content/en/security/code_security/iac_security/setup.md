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

Use the following instructions to enable Infrastructure as Code (IaC) Security for Code Security. IaC Security supports Terraform configurations stored in GitHub, GitLab, or Azure DevOps repositories.

## Setup

{{< tabs >}}
{{% tab "GitHub" %}}

### Install the GitHub integration

Follow [the instructions][1] for creating a GitHub app for your organization.

<div class="alert alert-info">
  To use IaC Security, the GitHub App must have <code>Read &amp; Write</code> permissions for <code>Contents</code> and <code>Pull Requests</code>. You can grant this access to all repositories or restrict it to selected ones.
</div>

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

[1]: /integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "GitLab" %}}

### Install the GitLab integration

Follow [the instructions][1] for installing the GitLab integration.

### Enable IaC Security for your repositories

After setting up the GitLab integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the **Activate scanning for your repositories** section.
1. Under **Select your source code management provider**, select **GitLab**.
1. Under **Select where your scans should run**, select **Datadog**.
1. Under **Connect your GitHub repositories**, do one of the following:
    - To connect a new GitLab instance, click **Connect GitLab Instance**.
    - To enable IaC Security for an existing account, click **Select repositories**, or **Edit** if Code Security is already enabled.
1. To enable IaC Security, do one of the following:
    - To enable it for all repositories, toggle **Enable Infrastructure as Code Scanning (IaC)** to the ON position.
    - To enable it for a single repository, toggle the **IaC** switch to ON for that repository.

[1]: /documentation/integrations/gitlab/?tab=host#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

### Install the Azure DevOps integration

Follow [the instructions][1] for installing the Azure DevOps integration.

### Enable IaC Security for your repositories

After setting up the Azure DevOps integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the **Activate scanning for your repositories** section.
1. Under **Select your source code management provider**, select **Azure DevOps**.
1. Under **Select where your scans should run**, select **Datadog**.
1. Under **Connect your GitHub repositories**, do one of the following:
    - To connect a new Azure DevOps organization, click **Connect Microsoft Entra App**.
    - To enable IaC Security for an existing account, click **Select repositories**, or **Edit** if Code Security is already enabled.
1. To enable IaC Security, do one of the following:
    - To enable it for all repositories, toggle **Enable Infrastructure as Code Scanning (IaC)** to the ON position.
    - To enable it for a single repository, toggle the **IaC** switch to ON for that repository.

[1]: /integrations/azuredevops/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup