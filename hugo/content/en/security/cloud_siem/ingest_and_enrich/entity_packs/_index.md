---
title: Entity Packs
description: Sync your user directory into Cloud SIEM to add identity context to signals, risks, and investigations.
further_reading:
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/okta/"
  tag: "Documentation"
  text: "Set up the Okta Identity Entity Pack"
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/"
  tag: "Documentation"
  text: "Set up the Google Workspace Identity Entity Pack"
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/"
  tag: "Documentation"
  text: "Set up the Microsoft Entra ID Entity Pack"
- link: "/security/cloud_siem/triage_and_investigate/user_inventory/"
  tag: "Documentation"
  text: "Browse synced users in the User Inventory"
- link: "/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/"
  tag: "Documentation"
  text: "Explore entities and risk scoring with Entity Risks"
- link: "/security/cloud_siem/ingest_and_enrich/content_packs/"
  tag: "Documentation"
  text: "Learn more about Cloud SIEM Content Packs"
- link: "/security/cloud_siem/investigator/"
  tag: "Documentation"
  text: "Learn more about the Investigator"
- link: "/account_management/rbac/permissions/"
  tag: "Documentation"
  text: "Review Datadog role permissions"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Entity Packs are not available for the US1-FED Datadog site.</div>
{{< /site-region >}}

## Overview

An Entity Pack is a type of [Cloud SIEM Content Pack][1] that syncs your user directory into Cloud SIEM. Content Packs bring in log-based security content such as detection rules and dashboards; Entity Packs bring in the identity records behind that activity, so Cloud SIEM can tell you *who* a signal is about, not only *what* happened.

When an Entity Pack is active, Cloud SIEM correlates directory users and their attributes with your logs and security signals. Each Entity Pack includes:

- **Automated synchronization**: Cloud SIEM syncs users and their attributes from your identity provider so they remain up to date.
- **[User Inventory][2]**: Browse, search, and filter the users synched to Cloud SIEM. View a user's attributes including display name, principal ID, user type, and account status. Investigate all signals, risks, and logs associated with your users.
- **User pill in Signals**: Identity context attached directly to a security signal, so you can see who the signal involves while you triage it.
- **User risk roll-up in [Entity Risks][8]**: Risk scores aggregated by user, so you can see a single user's total risk across signals instead of reading signals one at a time.

<div class="alert alert-info">Entity Packs sync user directory data, which includes personal data such as names and email addresses. Review your organization's privacy requirements before connecting a directory.</div>

## Available Entity Packs

Cloud SIEM supports the following Entity Packs:

| Entity Pack | Directory synced | Credential type |
|---|---|---|
| [Okta Identity][3] | Okta users and their attributes | Okta domain and API token |
| [Google Workspace Identity][4] | Google Workspace users and their attributes | Service account JSON key file |
| [Microsoft Entra ID][5] | Microsoft Entra ID users and their attributes | Azure app registration |

To find them in Datadog, go to [Cloud SIEM > Content Packs][6] and filter by **Entity Pack**.

## Prerequisites

### Permissions

Entity Packs use two permissions. A user with the [Datadog Admin Role][7] can grant either permission to a user account.

| Permission | What it allows |
|---|---|
| **SIEM Entities Read** | View synced users in the User Inventory, see the user pill on signals and in Entity Risks, and open an Entity Pack side panel. |
| **SIEM Entities Admin** | Everything **SIEM Entities Read** allows, plus connect a user directory, add and remove credentials, and enable or disable synchronization. |
| **Integrations Manage** | Only needed for Microsoft EntraID so that the Azure subscription and resource collection can be configured. |

Every user who works with identity context needs one of these permissions, not only the person who sets up the Entity Pack. Without either permission:

- The User Inventory is blank, even when an Entity Pack is active and syncing.
- The user pill does not appear on signals or in Entity Risks.
- Entity Pack side panels do not open from the Content Packs interface.

<div class="alert alert-info">Grant <strong>SIEM Entities Read</strong> to your analysts as part of rolling out an Entity Pack. Otherwise the directory syncs successfully but the identity context it provides stays invisible to the people investigating. If the User Inventory is empty, check permissions before you troubleshoot synchronization.</div>

### Identity provider access

To set up an Entity Pack, you also need administrative access to the identity provider you want to connect, sufficient to create the credential the Entity Pack requires. Each Entity Pack uses a different credential type:

- Okta Identity requires an Okta domain and an API token.
- Google Workspace Identity requires a Google service account JSON key file, your domain, and a Workspace admin email address.
- Microsoft Entra ID requires an Azure app registration. You can create one with the provided Quickstart script or with Terraform, or connect an app registration that already has the required permissions.

For the exact provider-side permissions and scopes each credential needs, see the setup page for that Entity Pack.

### Log integrations

An Entity Pack does not require the matching log integration or Content Pack, and the matching Content Pack does not require the Entity Pack. You can sync your Okta user directory with the Okta Identity Entity Pack without sending any Okta logs to Datadog.

The two still work best together: the Entity Pack supplies the identity context, and the log-based Content Pack supplies the activity that Cloud SIEM attaches that context to. Configure both to get identity context on signals generated from a provider's logs.

## Entity Pack states

Like other Content Packs, each Entity Pack appears as a tile in the Content Packs interface and has two states. Opening a tile's side panel requires the **SIEM Entities Read** or **SIEM Entities Admin** permission.

### Available

An Entity Pack you have not connected yet is marked **Available**. Its side panel shows what the Entity Pack provides once you enable it, and gives you a way to onboard your user directory. Click **Add Credentials** (or **Add Account** for Microsoft Entra ID) to begin setup. Connecting a directory requires the **SIEM Entities Admin** permission.

### Active

After you connect a credential and Datadog validates it, the Entity Pack is marked **Active**. Its side panel shows the health of the Entity Pack:

- **Credentials**: Each connected account, with its domain, validation status, enabled or disabled state, last update time, sync status, last sync time, and last sync duration. You can add additional accounts, or enable and disable synchronization for an individual account.
- **Key Metrics**: An interactive dashboard showing users synced, users by credential, sync history by credential, and sync duration by credential.
- **Entities**: The users synced by this Entity Pack, with display name, principal ID, user type (for example, `human` or `service_account`), and account status. Click **View in User Inventory** to see the full inventory.

Use the **Key Metrics** and **Credentials** sections to confirm that a sync is current and that the credential is still valid.

## Set up an Entity Pack

Setup steps differ by identity provider. Follow the guide for the directory you are connecting:

- [Okta Identity Entity Pack][3]
- [Google Workspace Identity Entity Pack][4]
- [Microsoft Entra ID Entity Pack][5]

Each guide walks through creating the credential in your identity provider, adding it in Datadog, and testing the connection.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/ingest_and_enrich/content_packs/
[2]: /security/cloud_siem/triage_and_investigate/user_inventory/
[3]: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
[4]: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
[5]: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /account_management/rbac/
[8]: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
