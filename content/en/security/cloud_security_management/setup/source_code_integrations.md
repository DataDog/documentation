---
title: Setting up Source Code Integrations for IAC Remediation
kind: documentation
---

Enabling Cloud Security Management for Infrastructure as Code remediation

*Webhook step??

## Install the GitHub integration

1. [Install the GitHub integration][1].
1. Create a GitHub App for your Organization or Personal Account.
1. Under Select Features, select **NAME OF FEATURE**.
1. Under Edit Permissions, select **Read & Write** for the Contents and Pull Requests permissions.
1. Click **Create App in GitHub**.
1. In Github, click Create GitHub App for <GitHub username>.
1. In Datadog, click **Install GitHub App**.
1. In GitHub, click **Install & Authorize**.

## Grant GitHub permissions

To use Terraform remediation, you must grant the Github App `Read & Write` permissions for `Contents` and `Pull Requests`. These permissions can be applied to all or select repositories.

## Enable Infrastructure as Code (IaC) for your repositories

1. On the [CSM Setup page][2], expand the **Source code integrations** section.
2. Click **Configure** for the GitHub account you want to configure.
3. To enable IAC:
    - For all repositories, switch on the IAC toggle under Enable Infrastructure as Code (IaC).
    - For a single repository, switch on the IAC toggle for that repository.

[1]: /integrations/github/#link-a-repository-in-your-organization-or-personal-account
[2]: https://app.datadoghq.com/security/configuration/csm/setup