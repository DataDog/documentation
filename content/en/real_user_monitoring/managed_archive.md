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
---

{{< callout url="#" btn_hidden="false" header="Join the Preview!">}}
Managed Archive is in Preview.
{{< /callout >}}

## Overview

Datadog's [RUM without Limits][1] provides an accurate, long-term overview of application health and performance, even if only a fraction of session data is retained by retention filters. But any session can be useful to solve an unexpected support ticket, perform a compliance audit, or conduct a retroactive investigation.

RUM Managed Archive acts as a **safety net**, enabling teams to:

- **Store everything**: Store all sessions for several months automatically
- **Recover on demand**: Bring back specific sessions for full investigation
- **Investigate in depth**: Explore recovered sessions like regularly retained sessions

Common use cases include:

- Recovering a session not captured by retention filters to resolve a customer support ticket
- Auditing sessions from a specific time window to meet compliance or internal mandates
- Investigating sessions retroactively after a production incident or regression
- Extending session retention for longer investigation without the pressure to lose data

## How it works

After you enable Managed Archive, all ingested sessions (excluding Synthetic Monitoring sessions) are stored automatically for the configured storage period. These sessions are accessible in a dedicated **Managed Archive UI**, separate from the [RUM Explorer][2].

{{< img src="real_user_monitoring/managed_archive/managed_archive_ui.png" alt="The Managed Archive UI showing a table of stored sessions with light-indexed attributes" style="width:100%;" >}}

All stored sessions, including sessions retained by retention filters or already recovered, are shown in the Managed Archive UI. A set of session tags and attributes are available to help you navigate and identify sessions to recover:

| Attribute | Description |
|---|---|
| `@account.id` | Account ID |
| `@application.id` | RUM application ID |
| `@session.id` | Unique session ID |
| `@timestamp` | Timestamp of the session |
| `@usr.anonymous_id` | Anonymous user ID |
| `@usr.id` | User ID |
| `country` | Country of the session |
| `service` | Service name |
| `version` | Application version |

Once a session is recovered, the corresponding row in the Managed Archive UI is visually marked and the session becomes available in the RUM Explorer.

## Permissions

Access to Managed Archive and Recovery is controlled through role-based access control (RBAC):

| Permission | Capability | Default Role |
|---|---|---|
| `rum_recovery_read` | View the Managed Archive configuration and stored sessions, but cannot edit the configuration or recover sessions | Admin |
| `rum_recovery_write` | Turn session storage on or off for an application | Admin |
| `rum_recovery_index` | Recover sessions | Admin |

## Setup

<div class="alert alert-info">To use this feature, your organization must use <a href="/real_user_monitoring/rum_without_limits/">RUM without Limits</a>.</div>

To enable session storage for an application:

1. In Datadog, navigate to **Digital Experience > Real User Monitoring > Manage Applications**.
2. Select your application.
3. Go to **Routing > Managed Archive**.
4. Toggle **Enable Managed Archive** on and select the storage period.

{{< img src="real_user_monitoring/managed_archive/managed_archive_setup.png" alt="The Managed Archive configuration panel showing the Store sessions toggle" style="width:70%;" >}}

<div class="alert alert-info">It takes 24 hours for a newly ingested session to appear in the Managed Archive.</div>

Configuration is done at the application level, which means you can apply different storage strategies per application.

## Recover sessions

In the Managed Archive UI, click **Recover** on the row of the session you want to recover.

Recovered sessions are available for 30 days with all their events and attributes. Recovered sessions have the same investigation capabilities as sessions retained by a retention filter

After recovering a session, find it in the RUM Explorer by querying on:

- `@session.retention_reason:recovery`
- `@session.matching_retention_filter.name:recovery`
- `@session.matching_retention_filter.id:recovery`

Recovered sessions that were initially retained by a retention filter have `@session.was_retained:true`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/rum_without_limits/
[2]: /real_user_monitoring/explorer/
