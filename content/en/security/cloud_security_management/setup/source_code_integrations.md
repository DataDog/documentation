---
title: Setting up Source Code Integrations for Cloud Security Management
---

Use the following instructions to enable Infrastructure as Code (IaC) remediation for Cloud Security Management (CSM). IaC remediation is available for [CSM Misconfigurations][1] and [CSM Identity Risks][2].

## Set up the GitHub integration

Follow [the instructions][3] for creating a GitHub app for your organization.

<div class="alert alert-info">To use IaC remediation, you must grant the Github App <code>Read & Write</code> permissions for <code>Contents</code> and <code>Pull Requests</code>. These permissions can be applied to all or select repositories.
</div>

## Enable IaC remediation for your repositories

After you set up the GitHub integration, enable IaC remediation for the repositories in your GitHub account.

1. On the [CSM Setup page][4], expand the **Source Code Integrations** section.
2. Click **Configure** for the GitHub account you want to configure.
3. To enable IaC:
    - For all repositories, switch on the IAC toggle under Enable Infrastructure as Code (IaC).
    - For a single repository, switch on the IAC toggle for that repository.

[1]: /security/cloud_security_management/misconfigurations
[2]: /security/cloud_security_management/identity_risks
[3]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[4]: https://app.datadoghq.com/security/configuration/csm/setup
