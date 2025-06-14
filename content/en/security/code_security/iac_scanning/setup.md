---
title: Setting up IaC Scanning
aliases:
  - /security/cloud_security_management/setup/iac_scanning/
further_reading:
  - link: "/security/code_security"
    tag: "Documentation"
    text: "Code Security"
  - link: "/security/cloud_security_management/setup/iac_scanning/iac_scanning_exclusions"
    tag: "Documentation"
    text: "Setting up IaC Scanning Exclusions"
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
  Static Infrastructure as Code (IaC) scanning is in Preview. To request access, complete the form.
{{< /callout >}}

Use the following instructions to enable Infrastructure as Code (IaC) scanning for Code Security.

<div class="alert alert-info">Static IaC scanning supports GitHub for version control and Terraform for infrastructure as code.</div>

## Set up the GitHub integration

Follow [the instructions][3] for creating a GitHub app for your organization.

<div class="alert alert-info">To use IaC scanning, you must give the GitHub App <code>Read & Write</code> permissions for <code>Contents</code> and <code>Pull Requests</code>. These permissions can be applied to all or select repositories.
</div>

## Enable IaC scanning for your repositories

After you set up the GitHub integration, enable IaC scanning for the repositories in your GitHub account.

1. On the [Code Security Setup page][4], expand the **Activate scanning for your repositories** section.
1. Under **Select your source code management provider**, choose **GitHub**.
1. Under **Where do you want the scans to run?**, select **Datadog**.
1. For the GitHub account you want to configure, click **Select repositories** or **Edit** if you've already enabled other Code Security features for that account.
1. To enable IaC scanning:
  - To enable it for all repositories, toggle **Enable Infrastructure as Code Scanning (IaC)** to the on position.
  - To enable it for a specific repository, toggle the **IaC** switch for that repository to the on position.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[4]: https://app.datadoghq.com/security/configuration/csm/setup
