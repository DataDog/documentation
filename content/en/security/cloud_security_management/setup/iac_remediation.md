---
title: Setting up IaC Remediation for Cloud Security
private: true
aliases:
  - /security/cloud_security_management/setup/source_code_integrations
further_reading:
    - link: "/security/cloud_security_management/setup"
      tag: "Documentation"
      text: "Setting up Cloud Security"
    - link: "/security/cloud_security_management/misconfigurations"
      tag: "Documentation"
      text: "Cloud Security Misconfigurations"
    - link: "/security/cloud_security_management/identity_risks"
      tag: "Guide"
      text: "Cloud Security Identity Risks"
---

Use the following instructions to enable Infrastructure as Code (IaC) remediation for Cloud Security. IaC remediation is available for [Cloud Security Misconfigurations][1] and [Cloud Security Identity Risks][2].

<div class="alert alert-info">Static IaC remediation supports GitHub for version control and Terraform for infrastructure as code.</div>

## Set up the GitHub integration

Follow [the instructions][3] for creating a GitHub app for your organization.

<div class="alert alert-info">To use IaC remediation, you must give the Github App <code>Read & Write</code> permissions for <code>Contents</code> and <code>Pull Requests</code>. These permissions can be applied to all or select repositories.
</div>

## Enable IaC remediation for your repositories

After you set up the GitHub integration, enable IaC remediation for the repositories in your GitHub account.

1. On the [Cloud Security Setup page][4], expand the **Source Code Integrations** section.
2. Click **Configure** for the GitHub account you want to configure.
3. To enable IaC:
    - All repositories: Toggle **Enable Infrastructure as Code (IaC) Remediation** to the on position.
    - Single repository: Toggle the **IAC Remediation** option for the specific repository to the on position.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/misconfigurations
[2]: /security/cloud_security_management/identity_risks
[3]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[4]: https://app.datadoghq.com/security/configuration/csm/setup
