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
1. Under **Select your source code management provider**, choose **GitHub**.
1. Under **Where do you want the scans to run?**, select **Datadog**.
1. In the GitHub account you want to configure, click **Select repositories**, or click **Edit** if Code Security features are already enabled.
1. To enable IaC Security, choose one of the following options:
    - To enable it for all repositories, toggle **Enable Infrastructure as Code Scanning (IaC)** to the ON position.
    - To enable it for a specific repository, toggle the **IaC** switch for that repository to the ON position.

[1]: /integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "GitLab" %}}

### Install the GitLab integration

### Enable IaC Security for your repositories

After setting up the GitLab integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the **Activate scanning for your repositories** section.
1. Under **Select your source code management provider**, choose **GitLab**.
1. Under **Where do you want the scans to run?**, select **Datadog**.
1. In the GitLab account you want to configure, click **Select repositories**, or click **Edit** if Code Security features are already enabled.
1. To enable IaC Security, choose one of the following options:
    - To enable it for all repositories, toggle **Enable Infrastructure as Code Scanning (IaC)** to the ON position.
    - To enable it for a specific repository, toggle the **IaC** switch for that repository to the ON position.

[1]: /integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{% tab "Azure DevOps" %}}

### Install the Azure DevOps integration

### Enable IaC Security for your repositories

After setting up the Azure DevOps integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the **Activate scanning for your repositories** section.
1. Under **Select your source code management provider**, choose **Azure DevOps**.
1. Under **Where do you want the scans to run?**, select **Datadog**.
1. In the Azure DevOps account you want to configure, click **Select repositories**, or click **Edit** if Code Security features are already enabled.
1. To enable IaC Security, choose one of the following options:
    - To enable it for all repositories, toggle **Enable Infrastructure as Code Scanning (IaC)** to the ON position.
    - To enable it for a specific repository, toggle the **IaC** switch for that repository to the ON position.

[1]: /integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup