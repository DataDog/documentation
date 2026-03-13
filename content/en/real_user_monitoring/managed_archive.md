---
title: Managed Archive
description: Store all ingested RUM sessions and recover specific sessions for full investigation when needed.
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: Documentation
  text: RUM Explorer
- link: '/real_user_monitoring/rum_without_limits/'
  tag: Documentation
  text: RUM without Limits
- link: '/account_management/audit_trail/'
  tag: Documentation
  text: Audit Trail
---

{{< callout url="#" btn_hidden="false" header="Join the Preview!">}}
Managed Archive is in Preview.
{{< /callout >}}

## Overview

RUM Managed Archive stores all ingested sessions in Datadog-managed storage. When you need to investigate a session that was not retained by your [retention filters][1], you can recover it on demand to perform a full investigation.

{{< img src="real_user_monitoring/managed_archive/managed-archive-overview.png" alt="Overview of the Managed Archive page in Datadog RUM" style="width:90%;" >}}

Managed Archive is made up of two capabilities:

- **Managed Archive**: Automatically stores all ingested sessions (excluding Synthetic sessions) in internal storage.
- **Recovery**: Indexes stored sessions back into RUM so you can investigate them with all their events and attributes.

Common use cases include:

- Recovering a valuable session not captured by retention filters
- Investigating a specific session for a customer support ticket
- Enabling longer troubleshooting windows
- Comparing behavior changes from older application versions
- Reviewing sessions during or after an incident
- Auditing sessions from a specific time window

## How Managed Archive works

After you enable Managed Archive for an application, all ingested sessions (excluding Synthetic sessions) are stored automatically. Stored sessions are **light-indexed** with a small set of attributes to help you identify sessions to recover:

| Attribute | Description |
|---|---|
| `@timestamp` | Timestamp of the session |
| `@application.id` | RUM application ID |
| `service` | Service name |
| `@session.id` | Unique session ID |
| `@usr.id` | User ID |
| `@usr.anonymous_id` | Anonymous user ID |
| `@account.id` | Account ID |
| `version` | Application version |
| `country` | Country of the session |

### Managed Archive UI

Stored sessions are accessible in a dedicated **Managed Archive** view, separate from the [RUM Explorer][2]. The Managed Archive UI lists stored sessions and lets you query on the light-indexed attributes listed above. Fully indexed sessions retained by retention filters remain in the RUM Explorer and are not shown in the Managed Archive UI.

{{< img src="real_user_monitoring/managed_archive/managed-archive-explorer.png" alt="The Managed Archive UI showing a table of stored sessions with light-indexed attributes" style="width:90%;" >}}

After a session is recovered, its row in the Managed Archive UI is visually marked and the session becomes available in the RUM Explorer.

## Set up Managed Archive

<div class="alert alert-info">To use this feature, your organization must use <a href="/real_user_monitoring/rum_without_limits/">RUM without Limits</a> and you must have the <code>rum_rehydration_write</code> permission.</div>

To enable session storage for an application:

1. In Datadog, navigate to **Digital Experience > RUM > Managed Archive**.
2. Select your application.
3. Toggle **Store sessions** on.

{{< img src="real_user_monitoring/managed_archive/managed-archive-configure.png" alt="The Managed Archive configuration panel showing the Store sessions toggle" style="width:70%;" >}}

The toggle is configured at the application level, so you can apply different archiving strategies per application.

## Recover sessions

<div class="alert alert-info">You must have the <code>rum_rehydration_index</code> permission to recover sessions.</div>

Recovered sessions are available for 30 days with all their events and attributes, including performance events. There is no difference between a recovered session and a session retained by a retention filter in terms of investigation capabilities.

### Recover an individual session

In the Managed Archive UI, click **Recover** on the row of the session you want to recover.

{{< img src="real_user_monitoring/managed_archive/managed-archive-recover-individual.png" alt="A single session row in the Managed Archive UI with the Recover button highlighted" style="width:90%;" >}}

### Recover a batch of sessions

In the Managed Archive UI, apply a query and time window to filter the sessions you want to recover, then click **Recover all** at the top of the table. The UI shows the number of matching sessions before you confirm.

{{< img src="real_user_monitoring/managed_archive/managed-archive-recover-batch.png" alt="The Managed Archive UI with Recover all button and session count confirmation dialog" style="width:90%;" >}}

### Recover from the session continuity UI

From the side panel of an already indexed session, the session continuity UI shows the previous and following sessions from the same user. If an adjacent session is stored in the Managed Archive but not yet indexed, you can recover it in one click directly from the side panel, without switching to the Managed Archive UI.

{{< img src="real_user_monitoring/managed_archive/managed-archive-session-continuity.png" alt="Session side panel showing session continuity UI with a Recover session button for an archived adjacent session" style="width:90%;" >}}

## Permissions

Access to Managed Archive and Recovery is controlled through role-based access control (RBAC):

| Capability | Permission | Default Role |
|---|---|---|
| View the Managed Archive configuration and stored sessions, but cannot edit the configuration or recover sessions | `rum_rehydration_read` | Admin |
| Turn session storage on or off for an application | `rum_rehydration_write` | Admin |
| Recover sessions | `rum_rehydration_index` | Admin |

## Audit Trail

Managed Archive and Recovery activity is logged in [Audit Trail][3] to help you track cost-related actions:

- **Managed Archive configuration**: Timestamp, user, and configuration change (toggle on/off)
- **Recovery activity**: Timestamp, user, number of sessions recovered, and entry point (individual recovery, batch recovery, or session continuity)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/rum_without_limits/
[2]: /real_user_monitoring/explorer/
[3]: /account_management/audit_trail/
