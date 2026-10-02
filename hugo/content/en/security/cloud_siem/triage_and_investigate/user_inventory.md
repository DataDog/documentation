---
title: User Inventory
description: Browse and investigate every user identity synced to Cloud SIEM, including account configuration, associated risks, and activity history.
---

<!-- ============================================================================
PRE-PUBLISH CHECKLIST — delete this block before merging.

1. LINKS. Five entries marked {{TODO-LINK}} need real paths:
   Entity Risks, Entity Packs Overview, and the three Entity Pack provider pages.
   Also resolves the two in-body references in Overview and Review risks.

2. IMAGES. Three placeholders marked {{TODO-IMAGE}}, each with draft alt text.
   The Entity changes screenshot must be captured AFTER lastLoginTime is removed,
   or it will document an attribute that no longer exists.

3. SHORTCODES. Notes are written as "**Note:**" paragraphs and images as HTML
   comments. Convert both to the repo's shortcode syntax at commit time.

4. FURTHER READING. If this repo generates the Further reading section from a
   further_reading front matter key, move the list below into front matter.
============================================================================ -->

# User Inventory

## Overview

[Cloud SIEM's User Inventory](https://app.datadoghq.com/security/siem/user-inventory) is a synced, normalized copy of your user directory inside Cloud SIEM. It lists every user identity that Cloud SIEM has synced from your identity providers, whether or not that user has any associated activity, signals, or risks. When you need to know who a user is, what their account looks like, and how it has changed, you can answer the question in Cloud SIEM instead of pivoting to your identity provider.

With User Inventory, you can:

- Browse every synced user identity and service account in one list.
- Filter users by account status, job title, office location, principal ID, provider, and user type.
- Search the inventory by name or principal ID.
- Review a user's current configuration, including job title, department, office location, and MFA status.
- See the risk score for each account associated with a user identity, along with how that score has changed.
- Trace a user's signals, logins, MFA changes, password changes, configuration changes, and logs over time.

User Inventory and [Entity Risks]({{TODO-LINK: entity-risks}}) answer different questions. User Inventory is the complete directory: every synced user, regardless of activity. Entity Risks is the prioritized view: user identities and other entities that have been scored and ranked by risk. Start in User Inventory when you know which user you want to understand. Start in Entity Risks when you want Datadog to tell you which users to look at first.

## Prerequisites

### Permissions

Two Cloud SIEM permissions apply to User Inventory:

| Permission | What it grants |
| ---------- | -------------- |
| `SIEM Entities Read` | View the User Inventory Explorer and search it, open the user side panel, and see the correlated-user pill in the Signal side panel. Also grants read access to Entity Pack side panels in the Content Packs explorer. |
| `SIEM Entities Admin` | Everything `SIEM Entities Read` grants, plus the ability to configure Entity Packs and other Entity Risks settings. Required to complete the Entity Packs prerequisite below. |

Without `SIEM Entities Read`, the User Inventory page remains visible but returns no results.

**Note:** An empty User Inventory with no filters applied has two possible causes: no Entity Packs are enabled, or you do not have the `SIEM Entities Read` permission. Confirm your Entity Pack configuration first, then confirm your permissions.

### Entity Packs

User Inventory is populated by Entity Packs, which sync user and identity context from your identity provider. At least one Entity Pack must be enabled before User Inventory returns results.

Entity Packs are available for the following providers:

- Microsoft Entra ID
- Okta
- Google Workspace

Configuring an Entity Pack requires the `SIEM Entities Admin` permission. Entity Packs are configured from the Content Packs explorer. For setup instructions, see the Entity Packs documentation listed under [Further reading](#further-reading).

### Recommended: OCSF pipelines

An active Open Cybersecurity Schema Framework (OCSF) pipeline is not strictly required. Cloud SIEM can correlate some activity to a user identity using standard attributes alone. However, you get the most complete correlation from sources that have an active OCSF pipeline. If a user's activity looks sparser in Cloud SIEM than you expect, check whether the relevant sources have an OCSF pipeline configured.

## Explore the user inventory

To open User Inventory, go to **Cloud SIEM > Investigate > User Inventory**.

<!-- {{TODO-IMAGE}}
     Full-page User Inventory Explorer showing the filter bar, entity count, and user list.
     alt: "The User Inventory Explorer listing synced user identities with their principal ID, user type, account status, and provider" -->

### Search and filter users

To find a user by display name or principal ID, type your query in the search box and press Enter.

To narrow the list by attribute, use the filter dropdowns. Each filter defaults to **All**.

| Filter | What it matches |
| ------ | --------------- |
| Account Status | The status of the account in your identity provider, such as `ACTIVE`, `SUSPENDED`, or `DELETED`. |
| Job Title | The user's job title, as reported by your identity provider. |
| Office Location | The user's office location, as reported by your identity provider. |
| Principal Id | The user's principal ID, as reported by your identity provider. |
| Provider | The identity provider the user was synced from. |
| User Type | The type of account: `human`, `service_account`, or `guest`. |

Job title, office location, and principal ID are passed through from your identity provider. If a value looks wrong or is missing in Cloud SIEM, check the corresponding field in your identity provider.

### Browse users in SIEM

The list loads more users as you scroll. The entity count at the top of the list shows how many users are loaded and how many match your current search and filters.

The **Changes Detected** column counts the updates to a user identity over the last two weeks that included one or more attribute changes. It counts updates, not individual attributes, so a single update that changed three attributes counts once. Use it to spot users whose configuration has been modified recently, then open the user and go to the Entity changes tab to see what changed.

To export the list as a CSV file, click the export icon above the table. The CSV file contains only the users currently loaded in the view, not every user synced to Cloud SIEM. To include more users in the export, scroll to load them first.

To change which columns appear, click the column settings icon.

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

<!-- {{TODO-IMAGE}}
     User side panel showing the header, Current state, and Risks sections.
     alt: "The user side panel for a single user identity, showing current state and associated risks" -->

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

**Note:** Last Seen reflects signal activity only. An account with an old Last Seen value may still be generating logs — check the All logs tab in Activity History to see its most recent activity.

Risk Change always reflects a fixed 14-day lookback and does not follow the panel's time range selector.

For how risk scores are calculated and how to customize them, see [Entity Risks]({{TODO-LINK: entity-risks}}).

## Explore activity history

The **Activity History** section traces what a user has done and how their account has changed. Two controls scope the whole section:

- **Activity from**: Select a single account to scope activity to that account, or select **All** to view activity across every account associated with this user identity.
- **Time range**: Set the window for the activity views.

Each tab shows a result count and a **See all** link that opens the underlying data in its own explorer, where you can query it further.

The data in Activity History is mapped either to Datadog standard attributes or to Open Cybersecurity Schema Framework (OCSF) fields, so you can query it in the explorers using the same attribute names you use elsewhere in Cloud SIEM.

### Signals

Shows the security signals associated with this user identity. The graph view breaks signals down by severity over time; the list view shows the individual signals. Use this tab to see whether detections have fired on the user and how recently.

### Login and MFA changes

Shows login and MFA change activity over time as a bar graph. Use this tab to spot changes in authentication behavior, such as a user's login pattern shifting or MFA settings changing.

### Password changes

Shows a sequence of timestamps recording when the user's password was modified. Use this section to see whether there are password changes near the time of unusual or suspicious account activity.

### Entity changes

Shows how the user's configuration has changed over time. Cloud SIEM checkpoints each version of a user identity, so you can compare any two versions and see exactly which attributes changed.

The tab header shows the number of changes made during the selected time period. Two views are available:

- **JSON**: A side-by-side diff of two versions. Removed values are marked in red; added values are marked in green.
- **Timeline**: A chronological view of the changes.

<!-- {{TODO-IMAGE}}
     Entity changes tab in JSON view, showing a side-by-side diff of two user identity versions.
     Capture AFTER lastLoginTime is removed from the tracked attributes.
     alt: "A side-by-side JSON diff comparing two versions of a user identity, highlighting changes to MFA enforcement" -->

In the JSON view, select the versions to compare using the version dropdown above each pane. The number of changes between the two selected versions appears beside the second pane. To reduce noise, unchanged attributes are collapsed; click the hidden lines indicator to expand them.

Attributes tracked in the diff include the user's email, first and last name, job title, office location, principal ID, provider, and user type, along with authentication state such as `mfaEnrolled`, `mfaEnforced`, and `lastPasswordChange`.

**Note:** At this time, only entity changes made in the last 14 days appear in this tab, regardless of the time range selected.

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

Additional helpful documentation, links, and articles:

- [Entity Risks]({{TODO-LINK: entity-risks}})
- [Entity Packs Overview]({{TODO-LINK: entity-packs-overview}})
- [Entity Pack for Microsoft Entra ID]({{TODO-LINK: entity-pack-entra-id}})
- [Entity Pack for Okta]({{TODO-LINK: entity-pack-okta}})
- [Entity Pack for Google Workspace]({{TODO-LINK: entity-pack-google-workspace}})
- [Investigator](https://docs.datadoghq.com/security/cloud_siem/investigator/)
- [Investigate Security Signals](https://docs.datadoghq.com/security/cloud_siem/investigate_security_signals/)
- [Open Cybersecurity Schema Framework (OCSF)](https://docs.datadoghq.com/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/)
