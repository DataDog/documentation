---
title: User Inventory
description: Browse and investigate every user identity synced to Cloud SIEM, including account configuration, associated risks, and activity history.
further_reading:
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: Documentation
  text: Entity Risks
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: Documentation
  text: Entity Packs
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: Documentation
  text: Microsoft Entra ID Entity Pack
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: Documentation
  text: Okta Identity Entity Pack
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: Documentation
  text: Google Workspace Identity Entity Pack
- link: /security/cloud_siem/investigator/
  tag: Documentation
  text: Investigator
- link: /security/cloud_siem/investigate_security_signals/
  tag: Documentation
  text: Investigate Security Signals
- link: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
  tag: Documentation
  text: Open Cybersecurity Schema Framework (OCSF)
---

## Overview

[Cloud SIEM's User Inventory][6] is a synced, normalized copy of your user directory inside Cloud SIEM. It lists every user identity that Cloud SIEM has synced from your identity providers, regardless of whether that user has any associated activity, signals, or risks. When you need to know who a user is, what their account looks like, and how it has changed, you can answer the question in Cloud SIEM instead of having to switch to your identity provider.

With User Inventory, you can:

- Browse every synced user identity and service account in one list.
- Filter users by account status, job title, office location, principal ID, provider, and user type.
- Search the inventory by name or principal ID.
- Review a user's current configuration, including job title, department, office location, and multi-factor authentication (MFA) status.
- See the risk score for each account associated with a user identity, along with how that score has changed.
- Trace a user's signals, logins, MFA changes, password changes, configuration changes, and logs over time.

User Inventory and [Entity Risks][1] answer different questions. User Inventory is the complete directory: every synced user, regardless of activity. Entity Risks is the prioritized view: user identities and other entities that have been scored and ranked by risk. Start in User Inventory when you know which user you want to understand. Start in Entity Risks when you want Datadog to tell you which users to look at first.

## Prerequisites

### Permissions

The following Cloud SIEM permissions apply to User Inventory:

| Permission | What it grants |
| ---------- | -------------- |
| **SIEM Entities Notifications** | Users with this permission can modify Entity Risk notifications. |
| **SIEM Entities Read** | View the User Inventory Explorer and search it, open the user side panel, and see the correlated-user pill in the Signals side panel. Also grants read access to Entity Pack side panels in the Content Packs explorer. |
| **SIEM Entities Admin** | Everything SIEM Entities Read grants, plus the ability to configure Entity Packs and other Entity Risks settings. Required to complete the Entity Packs prerequisite below. |

<div class="alert alert-info">An empty User Inventory with no filters applied has two possible causes: no Entity Packs are enabled, or you do not have the <strong>SIEM Entities Read</strong> permission. Confirm your Entity Pack configuration first, then confirm your permissions.</div>

### Entity Packs

User Inventory is populated by Entity Packs, which sync user and identity context from your identity provider. At least one Entity Pack must be enabled before User Inventory returns results.

Entity Packs are available for the following providers:

- [Microsoft Entra ID][2]
- [Okta][3]
- [Google Workspace][4]

Configuring an Entity Pack requires the `SIEM Entities Admin` permission. Entity Packs are configured from the Content Packs explorer. For setup instructions, see [Entity Packs][5].

### Recommended: OCSF pipelines

An active Open Cybersecurity Schema Framework (OCSF) pipeline is optional. Cloud SIEM can correlate some activity to a user identity using standard attributes alone. However, you get the most complete correlation from sources that have an active OCSF pipeline. If a user's activity looks sparser in Cloud SIEM than you expect, check whether the relevant sources have an OCSF pipeline configured.

## Explore the User Inventory

To open User Inventory, go to **Cloud SIEM** > **Investigate** > [**User Inventory**][6].

{{< img src="security/cloud_siem/user_inventory_explorer.png" alt="The User Inventory Explorer listing synced user identities with their principal ID, user type, account status, and provider" style="width:100%;" >}}

### Search and filter users

To find a user by display name or principal ID, type your query in the search box and press <kbd>Enter</kbd>.

To narrow the list by attribute, use the filter dropdowns. Each filter defaults to **All**.

| Filter | What it matches |
| ------ | --------------- |
| Account Status | The status of the account in your identity provider, such as `ACTIVE`, `SUSPENDED`, or `DELETED`. |
| Job Title | The user's job title, as reported by your identity provider. |
| Office Location | The user's office location, as reported by your identity provider. |
| Principal ID | The user's principal ID, as reported by your identity provider. |
| Provider | The identity provider the user was synced from. |
| User Type | The type of account: `human`, `service_account`, or `guest`. |

Job title, office location, and principal ID are passed through from your identity provider. If a value looks wrong or is missing in Cloud SIEM, check the corresponding field in your identity provider.

### Browse users in SIEM

- The list loads more users as you scroll. The entity count at the top of the list shows how many users are loaded and how many match your current search and filters.
- The **Changes Detected** column counts the updates to a user identity over the last 14 days that included one or more attribute changes. It counts updates, not individual attributes, so a single update that changed three attributes counts once. Use it to spot users whose configuration has been modified recently, then open the user and go to the **Entity changes** tab to see what changed.
- To export the list as a CSV file, click the export icon above the table. The CSV file contains only the users currently loaded in the view, not every user synced to Cloud SIEM. To include more users in the export, scroll to load them first.
- To change which columns appear, click the column settings icon.

## Investigate a user identity

Click any row in the user list to open the user side panel. To open the same information as a full page, click **Open Fullscreen**.

The panel header shows the user's account status, display name, and the time range the panel is scoped to, along with the following metadata:

| Field | Description |
| ----- | ----------- |
| Principal ID | The user's principal ID. Click the copy icon to copy it. |
| Type | The type of account: `human`, `service_account`, or `guest`. |
| Created | When the account was created, shown as a relative time. |
| Last updated | When Cloud SIEM last synced a change to this user identity, shown as a relative time. |

Relative times are shown throughout the panel. To see the exact timestamp behind a relative time, hover over it.

{{< img src="security/cloud_siem/user_inventory_side_panel.png" alt="The user side panel for a single user identity, showing current state and associated risks" style="width:100%;" >}}

### Review current state

The **Current state** section shows the user's configuration as of the most recent sync:

| Field | Description |
| ----- | ----------- |
| Identity Source(s) | The identity providers this user identity was synced from. |
| Email | The user's email address. |
| Name | The user's display name. |
| Job | The user's job title, department, and office location. |
| MFA status | Two independent states: whether the user has MFA registered, and whether policy requires it. |

MFA status is reported as two separate values because they can disagree. `ENABLED` means the user has registered MFA. `NOT ENFORCED` means your identity provider's policy does not require the user to use it in all circumstances. Review your policies to understand if there is a gap.

### Review risks

The **Risks** section lists the risk score for each account associated with this user identity. These are per-account scores, not an aggregate score for the user.

| Column | Description |
| ------ | ----------- |
| Risk Score | The account's risk score and its corresponding severity. |
| Name | The account the score applies to. |
| Type | The type of the scored entity, such as `Email Address`. |
| Source | The log sources the account's activity was correlated from. Click the overflow indicator to see additional sources. |
| Last Seen | When the account last generated a signal, shown as a relative time. This is not the last time the account had any activity. |
| Risk Change | How the account's risk score has changed over the last 14 days. |
| Signals | The number of signals contributing to the account's score. |

<div class="alert alert-info">Last Seen reflects signal activity only. An account with an old Last Seen value may still be generating logs. Check the <strong>All logs</strong> tab in <strong>Activity History</strong> to see its most recent activity.</div>

Risk Change always reflects a fixed 14-day lookback and does not follow the panel's time range selector.

For how risk scores are calculated and how to customize them, see [Entity Risks][1].

## Explore activity history

The **Activity History** section traces what a user has done and how their account has changed. Two controls scope the whole section:

- **Activity from**: Select a single account to scope activity to that account, or select **All** to view activity across every account associated with this user identity.
- **Time range**: Set the window for the activity views.

Each tab shows a result count and a **See all** link that opens the underlying data in its own explorer, where you can query it further.

The data in Activity History is mapped either to Datadog standard attributes or to OCSF fields, so you can query it in the explorers using the same attribute names you use elsewhere in Cloud SIEM.

### Signals

Shows the security signals associated with this user identity. The graph view breaks signals down by severity over time; the list view shows the individual signals. Use this tab to see whether detections have fired on the user and how recently.

### Login and MFA changes

Shows login and MFA change activity over time as a bar graph. Use this tab to spot changes in authentication behavior, such as a user's login pattern shifting or MFA settings changing.

### Password changes

Shows a sequence of timestamps recording when the user's password was modified. Use this section to see whether there are password changes near the time of unusual or suspicious account activity.

### Entity changes

Shows how the user's configuration has changed over time. Cloud SIEM saves each version of a user identity, so you can compare any two versions and see exactly which attributes changed.

The tab header shows the number of changes made during the selected time period. Two views are available:

- **JSON**: A side-by-side diff of two versions. Removed values are marked in red; added values are marked in green.
- **Timeline**: A chronological view of the changes.

{{< img src="security/cloud_siem/user_inventory_entity_changes.png" alt="A side-by-side JSON diff comparing two versions of a user identity, highlighting changes to MFA enforcement" style="width:100%;" >}}

In the JSON view, select the versions to compare using the version dropdown above each pane. The number of changes between the two selected versions appears beside the second pane. To reduce noise, unchanged attributes are collapsed; click the hidden lines indicator to expand them.

Attributes tracked in the diff include the user's email, first and last name, job title, office location, principal ID, provider, and user type, along with authentication state such as `mfaEnrolled`, `mfaEnforced`, and `lastPasswordChange`.

<div class="alert alert-info">Only entity changes made in the last 14 days appear in this tab, regardless of the time range selected.</div>

### All logs

Shows every log Cloud SIEM has correlated to this user identity. Three views are available:

- **Graph**: A bar chart of log volume over time, broken down by log source. A donut chart beside it shows the share of activity contributed by each account associated with the user identity.
- **Map**: A world map with countries shaded where activity has been found.
- **List**: The individual logs.

Use this tab to see which systems a user has touched and which of their accounts is generating the most activity.

### Time range

Activity history uses a 14-day lookback by default. You can extend the range to 30 days or more.

Two views do not follow the time range selector:

- **Entity changes** is limited to the last 14 days.
- **Risk Change** in the Risks section always reflects a fixed 14-day lookback.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
[3]: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
[4]: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
[5]: /security/cloud_siem/ingest_and_enrich/entity_packs/
[6]: https://app.datadoghq.com/security/siem/user-inventory
