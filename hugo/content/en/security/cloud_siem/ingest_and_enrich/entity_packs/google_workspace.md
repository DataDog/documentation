---
title: Google Workspace Identity Entity Pack
description: Sync your Google Workspace user directory into Cloud SIEM to add identity context to signals, risks, and investigations.
further_reading:
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/"
  tag: "Documentation"
  text: "Learn more about Entity Packs"
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/okta/"
  tag: "Documentation"
  text: "Set up the Okta Identity Entity Pack"
- link: "/security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/"
  tag: "Documentation"
  text: "Set up the Microsoft Entra ID Entity Pack"
- link: "/security/cloud_siem/triage_and_investigate/user_inventory/"
  tag: "Documentation"
  text: "Browse synced users in the User Inventory"
- link: "/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/"
  tag: "Documentation"
  text: "Explore entities and risk scoring with Entity Risks"
- link: "/integrations/gsuite/"
  tag: "Documentation"
  text: "Collect Google Workspace logs with the Google Workspace integration"
- link: "https://www.datadoghq.com/blog/google-workspace-detections/"
  tag: "Blog"
  text: "Detect malicious activity in Google Workspace apps with Datadog Cloud SIEM"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Entity Packs are not available for the US1-FED Datadog site.</div>
{{< /site-region >}}

## Overview

The Google Workspace Identity Entity Pack syncs your Google Workspace user directory into Cloud SIEM. After you connect it, Cloud SIEM uses that directory to:

- Populate the [User Inventory][8] with your Entra ID users.
- Embed a user pill in signals, so you can know who is behind the activity
- Score risk for a user across all their accounts in [Entity Risks][1].


For what Entity Packs provide in general, and the permissions they require, see [Entity Packs][10].

Datadog reads your directory through the [Google Admin SDK Directory API][2] using a Google Cloud service account that you create and grant domain-wide delegation to. Datadog requests read-only access to user records; it does not write to your directory.

You configure one set of credentials per Google Workspace domain. To sync more than one domain, see [Connect additional domains](#connect-additional-domains).

## Prerequisites

Two different Google identities are involved in this setup, and both are commonly called a "service account" in conversation. They are not interchangeable:

| Identity | What it is | Where you use it |
| --- | --- | --- |
| **Google Cloud service account** | The Google Cloud entity Datadog authenticates as. | You upload its JSON key file to Datadog. |
| **Google Workspace admin user** | A Google Workspace user with admin privileges that the service account impersonates when calling the Directory API. | Entered in the **Workspace Admin email** field. |

The **Workspace Admin email** field requires the Google Workspace admin user, not the service account. If the address you are about to enter ends in `@<project-id>.iam.gserviceaccount.com`, it is the service account email and the connection fails.

Before you begin, make sure you have:

- A Google Cloud project in which you can create a service account and enable APIs.
- **Super Admin** privileges in the Google Workspace tenant you want to sync, or a Super Admin who can grant domain-wide delegation on your behalf.
- The **SIEM Entities Admin** permission in Datadog, which is required to connect a directory. Analysts who need to see the identity context it provides require at least **SIEM Entities Read**. See [Entity Packs][10].
- At least one user in the Google Workspace directory. An empty directory produces an empty User Inventory.

Datadog recommends impersonating a generically named, shared admin account, such as `datadog-integration@example.com`, rather than an individual's account. If the integration depends on a named person's account and that person leaves the organization or loses admin privileges, the sync stops working and the cause is difficult to trace.

## Setup

### Create a service account in Google Cloud

1. In the Google Cloud console, select the project in which you want to create the service account.
1. Follow the **Create a service account** section of Google's [service account instructions][4].
1. Create a JSON key for the service account and save the downloaded file. You upload this file to Datadog in a later step.

The service account does not need any Google Cloud IAM roles. Access to your directory comes from the domain-wide delegation grant in the Google Workspace Admin console, not from Google Cloud IAM.

### Enable the Admin SDK API

1. In the Google Cloud console, confirm that the project that owns your service account is selected.
1. Go to **APIs & Services** > **Library**.
1. Search for and open the **Admin SDK API** (`admin.googleapis.com`).
1. Click **Enable**.

### Grant domain-wide delegation

1. In the Google Cloud console, open your service account, click **Show advanced settings**, and under **Domain-wide delegation** copy the service account's **Client ID**. This is the same numeric value shown as **Unique ID** on the service account's **Details** tab.
1. In the Google Workspace Admin console, go to **Security** > **Access and data control** > **API controls**.
1. Under **Domain-wide delegation**, click **Manage Domain Wide Delegation**.
1. Click **Add new**.
1. Paste the service account's **Client ID** into the **Client ID** field.
1. In **OAuth scopes**, enter the following scope:
   ```text
   https://www.googleapis.com/auth/admin.directory.user.readonly
   ```
1. Click **Authorize**.
1. To confirm the grant, find the new **Client ID** in the list, click **View details**, and verify that the scope is listed.

For more detail, see Google's [Delegate domain-wide authority to a service account][5].

### Add credentials in Datadog

1. In Datadog, go to [Cloud SIEM > Content Packs][6].
1. Filter by **Entity Pack**, then open the **Google Workspace Identity** Entity Pack. It is marked **Available** until you connect a directory.
1. Click **Add Credentials**.
1. In the **Add credentials and activate content pack** dialog, click **Browse files** and select the service account JSON key file you downloaded. Datadog extracts the `client_email`, `private_key`, and `project_id` values from the file.
1. Complete the remaining fields:

   | Field | Description |
   | --- | --- |
   | **Name** | A display name for this set of credentials, for example `Production credentials`. Use a name that identifies the domain if you plan to connect more than one. |
   | **Domain** | The Google Workspace domain to sync, for example `example.com`. |
   | **Workspace Admin email** | The Google Workspace admin user the service account impersonates, for example `datadog-integration@example.com`. Do not use the service account email. |

1. Click **Test Connection**. Datadog validates the credentials against Google Workspace before storing them. A successful test gives you the ability to then save the credentials and activate the Entity Pack. If validation fails, see [Troubleshooting](#troubleshooting).

Datadog stores the service account private key encrypted and does not return it in the Datadog interface or in API responses.

## Verify the sync

Synchronization is continuous. The first sync begins as soon as Datadog validates the credential, and each subsequent sync starts when the previous one finishes, so you never schedule or trigger a sync yourself. A **Last synced** time that is much older than usual for your account is worth investigating.

Once a credential is validated, the Entity Pack is marked **Active**. From [Cloud SIEM > Content Packs][6], open the **Google Workspace Identity** tile to view its side panel, then check the following.

### Credentials

The **Credentials** section lists each connected account. Expand an account to see:

| Field | What it tells you |
| --- | --- |
| **Domain** | The Google Workspace domain this account syncs. |
| **Status** | Whether synchronization is enabled or disabled for this account. Use the toggle to change it, or the overflow menu to remove the credential. |
| **Last updated** | When the credential itself was last modified. |
| **Sync status** | Whether the most recent sync completed, for example **Synced**. |
| **Last synced** | How long ago the most recent sync ran. |
| **Last sync duration** | How long that sync took. |

Each account also carries a validation badge:

| Badge | Meaning |
| --- | --- |
| **Valid** | Datadog can authenticate to Google Workspace with these credentials. |
| **Invalid** | Datadog cannot authenticate. See [Troubleshooting](#troubleshooting). |

### Key Metrics

The **Key Metrics** section shows four widgets:

- **Users Synced**: the number of users whose attributes a sync updated. This measures directory churn, not directory size, so it is normally much smaller than your total user count.
- **Users by Credential**: the same updated-user count, broken out per connected account.
- **Sync History by Credential**: completed syncs over time. Gaps indicate failed or skipped syncs.
- **Sync Duration by Credential**: how long each sync took, in milliseconds. Isolated spikes are normal; a sustained increase can indicate a growing directory or API throttling on the Google side.

The per-credential widgets group by `credential_name`, a normalized form of the **Name** you enter. For example, `Production credentials` becomes `production_credentials`.

### Entities

The **Entities** section lists the users this Entity Pack synced, with **Display Name**, **Principal ID**, **User Type** (for example `human` or `service_account`), and **Account Status**.

Use the entity count, not **Users Synced**, when you want to know how many users this Entity Pack has brought into Cloud SIEM. Click **View in User Inventory** to see the [full inventory][9].

To confirm that identity context is reaching your signals, open a signal attributed to a synced user and verify that a user pill appears.

## Connect additional domains

Each set of credentials syncs one Google Workspace domain. Once the Entity Pack is **Active**, the **Add Credentials** button is replaced by **Add account** in the **Credentials** section, which is where you connect each additional domain.

For each additional domain:

1. [Grant domain-wide delegation](#grant-domain-wide-delegation) in that tenant's Google Workspace Admin console. A delegation grant applies only to the tenant where you create it.
1. In the Entity Pack side panel, click **Add account** in the **Credentials** section.
1. Complete the same fields described in [Add credentials in Datadog](#add-credentials-in-datadog), then click **Test Connection**.

Two things to keep in mind when you run more than one domain:

- Give each account a **Name** that identifies its domain, so that **Users by Credential**, **Sync History by Credential**, and **Sync Duration by Credential** stay readable.
- Make sure the **Workspace Admin email** belongs to the same domain as the **Domain** value. A mismatch causes the connection test to fail.

## Troubleshooting

### The connection test fails

Work through these causes in order:

| Cause | How to confirm | Fix |
| --- | --- | --- |
| Service account email entered as the admin email | The **Workspace Admin email** value ends in `@<project-id>.iam.gserviceaccount.com` | Enter a Google Workspace user with admin privileges instead. |
| Admin SDK API not enabled | In the Google Cloud console, **APIs & Services** > **Enabled APIs & services** does not list **Admin SDK API** | [Enable the Admin SDK API](#enable-the-admin-sdk-api) in the project that owns the service account. |
| Domain-wide delegation not granted | The service account's **Client ID** does not appear on the **Manage Domain Wide Delegation** page | [Grant domain-wide delegation](#grant-domain-wide-delegation). |
| Wrong or missing OAuth scope | Click **View details** on the delegation entry; `https://www.googleapis.com/auth/admin.directory.user.readonly` is not listed | Edit the delegation entry and add the scope exactly as written, with no trailing characters. |
| Impersonated user is not an admin | The user in **Workspace Admin email** has no admin role in the Google Workspace Admin console | Use an account with admin privileges, or assign one with read access to users. |
| Domain mismatch | The **Domain** value does not match the domain of the impersonated admin user | Correct the **Domain** value, or impersonate an admin in that domain. |
| Incomplete or wrong JSON key file | The uploaded file is missing `client_email`, `private_key`, or `project_id`, or `type` is not `service_account` | Re-download the JSON key from the service account and upload the unmodified file. |

Google notes that delegation changes can take up to 24 hours to take effect, though they typically apply more quickly. If you just granted delegation or added a scope, wait and then run **Test Connection** again.

### Credentials were working and are now invalid

The most common causes are changes on the Google side:

- The impersonated admin user was suspended, deleted, or lost its admin role. This is the usual failure when the integration is tied to an individual's account rather than a shared one.
- The service account's JSON key was rotated, disabled, or deleted. Create a new key and upload it.
- The service account itself was deleted, or the domain-wide delegation entry was removed.
- The Admin SDK API was disabled in the Google Cloud project.

### The sync succeeds but no users appear

- Confirm that the **Domain** value matches the domain whose users you expect. A valid admin user in a different domain than the one you entered can produce an empty result.

### No user pill appears on signals

Identity context is matched to events by email address. If a synced user has no pill on their activity, confirm that the logs for that source populate the user email field and that the source's OCSF pipeline is active. See [Open Cybersecurity Schema Framework][7].

An Entity Pack does not require the matching log integration or Content Pack, and neither requires the Entity Pack. If you are syncing the directory but seeing no Google Workspace activity to attach it to, you may also need the [Google Workspace log integration][3].

If you still need help, contact [Datadog support][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://developers.google.com/workspace/admin/directory/v1/guides
[3]: /integrations/gsuite/
[4]: https://developers.google.com/workspace/guides/create-credentials#service-account
[5]: https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[8]: /help/
[9]: /security/cloud_siem/triage_and_investigate/user_inventory/
[10]: /security/cloud_siem/ingest_and_enrich/entity_packs/
