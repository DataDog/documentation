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
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
  Infrastructure as Code (IaC) Security is in Preview. To request access, complete the form.
{{< /callout >}}

Use the following instructions to enable Infrastructure as Code (IaC) Security for Code Security.

<div class="alert alert-info">IaC Security supports GitHub for version control and Terraform for infrastructure as code.</div>

## Set up the GitHub integration

Follow [the instructions][1] for creating a GitHub app for your organization.

<div class="alert alert-info">
  To use IaC Security, the GitHub App must have <code>Read &amp; Write</code> permissions for <code>Contents</code> and <code>Pull Requests</code>. You can grant this access to all repositories or restrict it to selected ones.
</div>

## Enable IaC Security for your repositories

After setting up the GitHub integration, enable IaC Security for your repositories.

1. On the [Code Security Setup page][2], expand the **Activate scanning for your repositories** section.
1. Under **Select your source code management provider**, choose **GitHub**.
1. Under **Where do you want the scans to run?**, select **Datadog**.
1. In the GitHub account you want to configure, click **Select repositories**, or click **Edit** if Code Security features are already enabled.
1. To enable IaC Security, choose one of the following options:
    - To enable it for all repositories, toggle **Enable Infrastructure as Code Scanning (IaC)** to the ON position.
    - To enable it for a specific repository, toggle the **IaC** switch for that repository to the ON position.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/github/#setup
[2]: https://app.datadoghq.com/security/configuration/code-security/setup