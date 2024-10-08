---
title: IaC Scanning
private: true
---

Static Infrastructure as Code (IaC) scanning integrates with version control systems, such as GitHub, to detect misconfigurations in cloud resources defined by Terraform. The scanning results are displayed in two primary locations: within pull requests during code modifications and on the **Explorers** page within Cloud Security Management.

## Supported providers

- **Version control system**: GitHub
- **Infrastructure as code tool**: Terraform

## Setup

### Set up the GitHub integration

Follow [the instructions][3] for creating a GitHub app for your organization.

<div class="alert alert-info">To use IaC scanning, you must give the GitHub App <code>Read & Write</code> permissions for <code>Contents</code> and <code>Pull Requests</code>. These permissions can be applied to all or select repositories.
</div>

### Enable IaC scanning for your repositories

After you set up the GitHub integration, enable IaC scanning for the repositories in your GitHub account.

1. On the [CSM Setup page][4], expand the **Source Code Integrations** section.
2. Click **Configure** for the GitHub account you want to configure.
3. To enable IaC scanning:
    - All repositories: Toggle **Enable Infrastructure as Code (IaC) Scanning** to the on position.
    - Single repository: Toggle the **IAC Scanning** option for the specific repository to the on position.

[1]: /security/cloud_security_management/misconfigurations
[2]: /security/cloud_security_management/identity_risks
[3]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[4]: https://app.datadoghq.com/security/configuration/csm/setup
