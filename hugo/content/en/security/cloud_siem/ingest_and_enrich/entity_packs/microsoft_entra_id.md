---
title: Microsoft Entra ID Entity Pack
description: Sync your Microsoft Entra ID user directory into Cloud SIEM to add identity context to signals, risks, and investigations.
further_reading:
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/"
  tag: "Documentation"
  text: "Learn more about Entity Packs"
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/okta/"
  tag: "Documentation"
  text: "Set up the Okta Identity Entity Pack"
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/"
  tag: "Documentation"
  text: "Set up the Google Workspace Identity Entity Pack"
- link: "/security/cloud_siem/triage_and_investigate/user_inventory/"
  tag: "Documentation"
  text: "Browse synced users in the User Inventory"
- link: "/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/"
  tag: "Documentation"
  text: "Explore entities and risk scoring with Entity Risks"
- link: "/getting_started/integrations/azure/"
  tag: "Documentation"
  text: "Get started with the Azure integration"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Entity Packs are not available for the US1-FED Datadog site.</div>
{{< /site-region >}}

## Overview

The Microsoft Entra ID Entity Pack syncs your Microsoft Entra ID user directory into Cloud SIEM. After you connect it, Cloud SIEM uses that directory to:

- Populate the [User Inventory][8] with your Entra ID users.
- Embed a user pill in signals, so you can know who is behind the activity.
- Score risk for a user across all their accounts in [Entity Risks][1].

For what Entity Packs provide in general, and the permissions they require, see [Entity Packs][9].

Datadog reads your directory through the [Microsoft Graph API][2], authenticating as an Azure app registration that you grant application permissions to and that a tenant administrator consents to. Datadog requests read-only access; it does not write to your directory.

Unlike the other Entity Packs, Microsoft Entra ID builds on the [Datadog Azure integration][10] rather than on a credential you enter directly in Cloud SIEM. The app registration that backs the Entity Pack is the same one the Azure integration uses, and it must have resource collection enabled. If you already run the Azure integration, most of the setup is done; you are adding two Microsoft Graph permissions to an existing app registration.

You configure one app registration per Entra ID tenant. To sync more than one tenant, see [Connect additional tenants](#connect-additional-tenants).

## Prerequisites

Before you begin, make sure you have:

- An [Azure integration][10] configured in Datadog, with **resource collection enabled** on the app registration you plan to use. Resource collection is required; the Entity Pack does not sync without it.
- At least one Azure subscription configured on that app registration, even if you do not otherwise use it.
- Permission in the Azure portal to add Microsoft Graph application permissions and grant admin consent. Granting consent requires the **Privileged Role Administrator** or **Global Administrator** role.
- The following Datadog permissions:

  | Permission | Why it is needed |
  | --- | --- |
  | **SIEM Entities Admin** | Connect a user directory and manage its credentials. See [Entity Packs][9]. |
  | **Integrations Manage** | Modify the Azure integration, through which this Entity Pack is configured. |

  Analysts who need to see the identity context the Entity Pack provides require at least **SIEM Entities Read**.

## Setup

If you already have an Azure integration with resource collection enabled, skip to [Grant Microsoft Graph permissions](#grant-microsoft-graph-permissions).

### Set up the Azure integration

1. In Datadog, go to [Integrations > Azure][3].
1. If you do not have an Azure integration yet, follow [Getting Started with Azure][10]. You can set it up three ways:
   - **Quickstart**, which runs an install script in Azure Cloud Shell.
   - **Terraform**, for infrastructure-as-code workflows.
   - **Existing app registration**, where you enter the tenant ID, client ID, and client secret yourself.
1. If you already have an Azure integration, confirm that the app registration you plan to use is ready:
   1. On the **Configuration** tab, select the app registration from the list. Each entry shows its name or client ID and how many subscriptions it has. Confirm it has at least one subscription.
   1. Open the **Resource Collection** tab and confirm that **Enable Resource Collection** is turned on. If it is off, turn it on.

Note which app registration you confirmed. It is the one you grant Microsoft Graph permissions to in the next step, and the one you select in Cloud SIEM after that.

### Grant Microsoft Graph permissions

The app registration needs Microsoft Graph application permissions to read user data. These are in addition to the permissions the Azure integration already uses.

1. In the Azure portal, go to **Microsoft Entra ID** > **App registrations**.
1. Select your Datadog app registration. If several look similar, search by client ID.
1. In the left sidebar, click **API permissions**.
1. Click **Add a permission** > **Microsoft Graph** > **Application permissions**.
1. Add the following permissions:

   | Permission | Required for | What it reads |
   | --- | --- | --- |
   | `User.Read.All` | User profiles | User attributes: email, name, department, job title, account status, and password change timestamps. |
   | `AuditLog.Read.All` | MFA status and sign-in activity | MFA registration status, authentication method details, and sign-in activity. |

   You can grant `Directory.Read.All` instead of `User.Read.All`. It is broader: it covers user data plus other directory objects. Grant `User.Read.All` unless your organization has a reason to prefer the wider scope.

1. Click **Grant admin consent for \[your tenant name\]**. For more detail, see Microsoft's [Grant tenant-wide admin consent][4].
1. Confirm that both permissions show a green check mark in the **Status** column. Adding a permission is not the same as consenting to it, and this is the step most often missed.

<div class="alert alert-info">Without <code>AuditLog.Read.All</code>, the directory still syncs and users still appear in the User Inventory, but MFA status and sign-in activity will be missing from their records.</div>

### Add an app registration in Datadog

1. In Datadog, go to [Cloud SIEM > Content Packs][5].
1. Filter by **Entity Pack**, then open the **Microsoft Entra ID** Entity Pack. It is marked **AVAILABLE** until you connect a directory.
1. Click **Add Account**.
1. In the **Add App Registration** dialog, select a setup method:

   | Method | Use it when |
   | --- | --- |
   | **Quickstart** | You want Datadog's install script to configure the integration for you through Azure Cloud Shell. |
   | **Terraform** | You manage Azure configuration as code. |
   | **Existing App Registration** | You already set up an app registration in Azure with the required permissions, which is the case if you followed the steps above. |

1. The Entity Pack displays your Azure app registrations. Select the one you granted Microsoft Graph permissions to, and confirm it has resource collection enabled.
1. If you see a warning such as **6 Azure applications have Resource Collection disabled.**, find the app registration you granted Microsoft Graph permissions to in the list below it. A red dot means resource collection is disabled. Click **Configure** next to it, or open the app registration in [Integrations > Azure][3], and turn on **Enable Resource Collection** on its **Resource Collection** tab.

## Verify the sync

Entra ID synchronization depends on Azure resource collection, so users do not appear in Cloud SIEM immediately after you connect an app registration.

Once an app registration is connected and validated, the Entity Pack is marked **ACTIVE**. Open its side panel in Cloud SIEM and check the following.

### Credentials

The **Credentials** section shows how many accounts are connected and lists each one. Expand an account to see:

| Field | What it tells you |
| --- | --- |
| **Subscription** | The Azure subscription ID that identifies this account. |
| **Created on** | When the account was connected. |
| **Sync status** | Whether the most recent sync completed, for example **Synced**. |
| **Last synced** | How long ago the most recent sync ran. |
| **Last sync duration** | How long that sync took. |

A **HEALTHY** badge next to the subscription ID means the account is syncing normally. Use the toggle at the right of the account to enable or disable synchronization without removing the account.

Below the sync details, the account lists your Azure app registrations by client ID, with the number of subscriptions each one has. A green dot means resource collection is enabled on that app registration; a red dot means it is disabled. When any are disabled, a summary line above the list counts them, for example **6 Azure applications have Resource Collection disabled.** Click **Configure** next to an app registration to open its configuration and enable resource collection.

Resource collection must be enabled on the app registration you granted Microsoft Graph permissions to. An account can show **HEALTHY** and **Synced** while other app registrations in the list still have resource collection disabled.

### Key Metrics

The **Key Metrics** dashboard shows four widgets:

- **Users Synced** — the number of users whose attributes a sync updated. This is a measure of directory churn, not of directory size, so it is normally much smaller than your total user count. Use the **Entities** section below for the total.
- **Users by Credential** — the same updated-user count, broken out per connected account.
- **Sync History by Credential** — completed syncs over time. Gaps indicate failed or skipped syncs.
- **Sync Duration by Credential** — how long each sync took. Isolated spikes are normal; a sustained increase can indicate a growing directory or Microsoft Graph throttling on the Azure side.

The per-credential widgets group by `credential_name`.

### Entities

The **Entities** section lists the users this Entity Pack synced, with **Display Name**, **Principal ID**, **User Type** (for example `human` or `service_account`), and **Account Status** (for example **ACTIVE**). The entity count is the total number of users synced into Cloud SIEM from this directory, so it is the figure to compare against the size of your Entra ID tenant. The list is scoped to a time range, which you can change. Click **View in User Inventory** to see the [full inventory][8].

To confirm that identity context is reaching your signals, open a signal attributed to a synced user and verify that a user pill appears.

## Connect additional tenants

Each app registration covers one Entra ID tenant. To sync additional tenants, repeat the [Setup](#setup) procedure in each one, then click **Add App Registration** in the **Credentials** section of the Entity Pack side panel.

When you connect multiple tenants:

- Use the toggle on each account to pause synchronization for one tenant without removing its account.
- Grant Microsoft Graph permissions and admin consent separately in each tenant. Consent applies only to the tenant where you grant it.
- Enable resource collection on each app registration. It is a per-app-registration setting, not a global one.

## Troubleshooting

### No users appear

Work through these causes in order:

| Cause | How to confirm | Fix |
| --- | --- | --- |
| Not enough time has passed | You granted permissions or connected the app registration very recently | Wait and check again. Entra ID synchronization depends on Azure resource collection, so users do not appear immediately. |
| Admin consent not granted | The **Status** column in **API permissions** does not show a green check mark for both permissions | Click **Grant admin consent for \[tenant\]** and confirm both check marks. Adding a permission without consenting to it does nothing. |
| Resource collection disabled | In the **Credentials** section, the app registration you granted Microsoft Graph permissions to has a red dot | Click **Configure** next to the app registration, or open it in [Integrations > Azure][3], and turn on **Enable Resource Collection** on its **Resource Collection** tab. |
| No subscription configured | In the **Credentials** section, or in the app registration list in [Integrations > Azure][3], the app registration shows **0 subscriptions** | Configure at least one subscription, even if you do not otherwise use it. |
| Wrong app registration selected | The app registration selected in the Entity Pack is not the one you granted Graph permissions to | Select the app registration you granted permissions to, or grant the permissions on the one you selected. |
| Directory is empty | The Entra ID tenant contains no users | Connect a tenant that has users. An empty directory syncs successfully and produces an empty User Inventory. |
| Looking at the wrong number | **Users Synced** reads zero or very low | Check the **Entities** count instead. **Users Synced** counts only users whose attributes a sync changed, so it reads low on a stable directory even when the sync is healthy. |

### MFA status or sign-in activity is missing

`AuditLog.Read.All` is either not granted or not consented to. In the Azure portal, open the app registration's **API permissions** and confirm the permission is listed with a green check mark in **Status**. User profiles sync without it; MFA registration status and sign-in activity do not.

### Permission denied errors

- Confirm that the Azure account that granted consent holds the **Privileged Role Administrator** or **Global Administrator** role. Lower-privileged roles can add a permission request but cannot consent to it.
- Confirm that your Datadog account has **SIEM Entities Admin** and **Integrations Manage**. See [Entity Packs][9].

### An account was working and is no longer healthy

The most common causes are changes on the Azure side:

- The app registration's client secret expired or was rotated. Azure client secrets have a finite lifetime, so this is the failure to expect first on a connection that worked for months and then stopped.
- The app registration was deleted, or its Microsoft Graph permissions or admin consent were revoked.
- Resource collection was disabled on the app registration.

For specific error messages, open the app registration in [Integrations > Azure][3] and check its **Issues** tab.

### No user pill appears on signals

Identity context is matched to events by email address. If a synced user has no pill on their activity, confirm that the logs for that source populate the user email field and that the source's OCSF pipeline is active. See [Open Cybersecurity Schema Framework][6].

An Entity Pack does not require the matching log integration, and vice versa. If you are syncing the directory but seeing no Entra ID activity to attach it to, you may also need to send Entra ID logs to Datadog.

If you still need help, contact [Datadog support][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://learn.microsoft.com/en-us/graph/api/resources/users
[3]: https://app.datadoghq.com/integrations/azure
[4]: https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent
[5]: https://app.datadoghq.com/security/siem/content-packs
[6]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[7]: /help/
[8]: /security/cloud_siem/triage_and_investigate/user_inventory/
[9]: /security/cloud_siem/ingest_and_enrich/entity_packs/
[10]: /getting_started/integrations/azure/
