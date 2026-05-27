---
title: Credential Management
description: Manage API keys, application keys, and short-lived tokens for programmatic access to Datadog at scale.
further_reading:
- link: "/account_management/api-app-keys/"
  tag: "Documentation"
  text: "API and Application Keys"
- link: "/account_management/api-app-keys/#scopes"
  tag: "Documentation"
  text: "Application Key Scopes"
- link: "/account_management/org_settings/service_accounts/"
  tag: "Documentation"
  text: "Service Accounts"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Audit Trail"
- link: "/account_management/personal-access-tokens/"
  tag: "Documentation"
  text: "Personal Access Tokens (PATs)"
- link: "/account_management/service-access-tokens/"
  tag: "Documentation"
  text: "Service Access Tokens (SATs)"
- link: "/account_management/cloud_provider_authentication/"
  tag: "Documentation"
  text: "Cloud-based Authentication"
---

## Overview

You can interact with Datadog programmatically through CI/CD pipelines, Terraform, custom integrations, and automation scripts. Managing the keys and tokens that enable this access is a critical part of your security posture. A leaked or over-permissioned key can expose data across your entire organization.

This section covers the five types of programmatic credentials in Datadog, best practices for managing them at scale, and strategies for lifecycle management.

## Types of programmatic credentials

| Credential | Purpose | Scope | Lifetime |
| :---- | :---- | :---- | :---- |
| **API Key** | Submitting data to Datadog (metrics, logs, traces, events). Used by Agents, integrations, and data submission pipelines. | Org-wide. Any data submitted with an API key is associated with the org. | Long-lived. No built-in expiration. |
| **Personal Access Token (PAT)** | Short-lived token for individual user API access. Tied to the user's identity and permissions. | Scoped to the creating user's permissions. | Short-lived. Configurable expiration. |
| **Service Account Token (SAT)** | Short-lived (optional) token for service-to-service API access. Tied to a service account's identity and permissions. | Scoped to the service account's permissions. | Short-lived (optional). Configurable expiration. |
| **Application Key** | Accessing Datadog's API to read data, manage resources, and perform administrative actions. | Scoped to the permissions of the user or service account that created it. Can be further restricted with [scopes][1]. | Long-lived. No built-in expiration. |
| **RUM Client Token** | Used to match data from the end user's browser to a specific RUM application. | Scoped to a specific RUM application. | Long-lived. No built-in expiration. |

### When to use which

- **API Keys** are for data ingestion only. Every Agent and data submission pipeline needs one. They do not grant access to read data or manage resources.
- **PATs and SATs** are the preferred authentication method. Use PATs for interactive developer workflows and SATs for automated pipelines. Their short lifetimes reduce risk if they are leaked.
- **Application Keys** are legacy secrets used for API access, like reading dashboards, managing monitors, or configuring integrations. They inherit the permissions of the creating user or service account, and can be further scoped to limit what they can do.
- **RUM Client Tokens** are specific to client-side implementation of RUM data.

## Best practices for managing credentials at scale

{{% collapse-content title="Assign one key per team, service, or environment" %}}
Avoid sharing a single API key or application key across multiple teams or services. When a key is shared, you lose the ability to audit who is using it, and revoking it means disrupting everyone.

- Create a dedicated API key for each team or major service that submits data.
- Create dedicated service accounts with SATs for each automation pipeline (for example, Terraform, CI/CD, custom scripts).
- Name keys descriptively to indicate their owner and purpose (for example, `payments-team-terraform` or `ci-pipeline-staging`).
{{% /collapse-content %}}

{{% collapse-content title="Scope secrets to the minimum required" %}}
Keys can be [scoped][1] to restrict which API endpoints they can access. A key that only needs to manage monitors should not have permissions to manage users or read logs.

- When creating a key, explicitly set scopes to limit its access.
- Secrets cannot exceed the permissions of their creating user or service account, but they can (and should) be further restricted.
{{% /collapse-content %}}

{{% collapse-content title="Use short-lived tokens" %}}
Where possible, use PATs or SATs instead of long-lived application keys. Short-lived tokens automatically expire, which limits exposure if a token is leaked and creates cleaner audit trails tied to specific users or service accounts.

For automated pipelines, SATs with a service account are the recommended pattern. The service account defines the permission boundary, and the SAT provides time-limited access within that boundary. SATs can be configured as long-lived when required, but short expiration windows are strongly recommended.
{{% /collapse-content %}}

{{% collapse-content title="Use service accounts" %}}
[Service accounts][2] are non-human accounts designed for automation. They have their own roles and permissions, independent of any individual user. Use service accounts when:

- An automation pipeline (Terraform, CI/CD) needs API access that should not be tied to a human user's account
- You need a stable identity for a service that outlives employee tenure
- You want to scope permissions specifically for a pipeline without affecting a human user's access
{{% /collapse-content %}}

{{% collapse-content title="Use an authenticated proxy for RUM tokens" %}}
Using an [authenticated proxy][3] for RUM client tokens hides them from end users, while still routing data to the correct RUM application.
{{% /collapse-content %}}

## Strategies for key lifecycle management

### Audit unused keys

Over time, keys accumulate. Teams rotate members, pipelines are decommissioned, and keys created for one-off tasks are forgotten. Regularly audit your keys to identify:

- **Keys with no recent usage.** If a key hasn't been used in 90 days, investigate whether it's still needed.
- **Keys with unknown owners.** If no one can identify the purpose of a key, it's a candidate for revocation.

The [Governance Console][4], the [Safety Center][5], and [Audit Trail][6] can help identify key usage patterns.

### Establish a rotation cadence

Even long-lived keys should be rotated periodically. A practical cadence:

- **API keys:** Rotate quarterly or immediately if a compromise is suspected.
- **Application keys:** Rotate quarterly for production pipelines. Rotate immediately if a compromise is suspected or the creating user leaves the organization.
- **PATs and SATs:** No rotation needed. PATs expire automatically. If you configure SATs to be long-lived, quarterly rotation is still recommended.

### Manage keys as code

Organizations that manage Datadog configuration through [Terraform][7] or other infrastructure-as-code tools can also manage API keys and application keys as code. This provides:

- Version-controlled records of what keys exist and who created them
- Automated key creation as part of infrastructure provisioning
- Easier auditing and lifecycle management through your existing IaC review processes

When managing keys through Terraform, store the actual key values in a secrets manager (such as HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault) rather than in your Terraform state or source code.

Datadog also supports keyless authentication through cloud provider identity mapping. See [Cloud-based authentication documentation][8] for more details.

## Recommendations

- **Create one key per team or service.** Shared keys are an audit and revocation liability.
- **Scope application keys** to the minimum permissions required.
- **Use PATs and SATs** over long-lived application keys for API access.
- **Use service accounts** for automation pipelines. Don't tie pipeline access to individual human accounts.
- **Audit keys quarterly.** Remove unused keys, replace keys from former employees, and rotate production keys on a regular cadence.
- **Store key values in a secrets manager**, not in source code, environment files, or Terraform state.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/api-app-keys/#scopes
[2]: /account_management/org_settings/service_accounts/
[3]: /data_security/real_user_monitoring/#authenticated-proxy
[4]: /account_management/governance_console/
[5]: /account_management/safety_center/
[6]: /account_management/audit_trail/
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[8]: /account_management/cloud_provider_authentication/
