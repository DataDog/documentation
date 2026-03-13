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

Datadog's [RUM without Limits][1] lets you get an accurate, long-term overview of application health and performance, even if only a fraction of session data is retained by retention filters. But any session can be useful to solve an unexpected support ticket, perform a compliance audit, or apply a retroactive investigation.

RUM Managed Archive acts as a **safety net**: all ingested sessions are stored automatically so that no user interaction is ever permanently lost, and specific sessions can be recovered on demand for full investigation in RUM whenever they are needed.

{{< img src="real_user_monitoring/managed_archive/ma1.png" alt="Diagram showing the RUM without Limits lifecycle: ingest, retain with filters, store in Managed Archive, and recover on demand" style="width:100%;" >}}

With Managed Archive teams can:

- **Store everything**: Store all sessions for several months automatically
- **Recover on demand**: Bring back specific sessions for full investigation
- **Investigate seamlessly**: Explore recovered sessions like regularly retained sessions

Common use cases include:

- Recovering a session not captured by retention filters to resolve a customer support ticket
- Auditing sessions from a specific time window to meet compliance or internal mandates
- Investigating sessions retroactively after a production incident or regression
- Extending session retention for longer investigation without the pressure to lose data

## How Managed Archive works

Once enabled all ingested sessions (excluding Synthetic Monitoring sessions) are stored automatically for the configured storage period. A set of session tags and attributes are available to help you identify sessions to recover:

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

Stored sessions are accessible in a dedicated **Managed Archive UI**, separate from the [RUM Explorer][2]. The Managed Archive UI lists stored sessions and lets you filter on the tags and attributes listed above. All stored sessions, including sessions retained by retention filters or already recovered are shown in the Managed Archive UI.

{{< img src="real_user_monitoring/managed_archive/ma1.png" alt="The Managed Archive UI showing a table of stored sessions with light-indexed attributes" style="width:100%;" >}}

Once a session is recovered, its row in the Managed Archive UI is visually marked and the session becomes available in the RUM Explorer.

## Set up

<div class="alert alert-info">To use this feature, your organization must use <a href="/real_user_monitoring/rum_without_limits/">RUM without Limits</a>.</div>

To enable session storage for an application:

1. In Datadog, navigate to **Digital Experience > RUM > Managed Archive**.
2. Select your application.
3. Toggle **Store sessions** on.

{{< img src="real_user_monitoring/managed_archive/ma2.png" alt="The Managed Archive configuration panel showing the Store sessions toggle" style="width:70%;" >}}

Configuration is done at the application level, enabling you to apply different storage strategies per application.

## Recover sessions

Recovered sessions are available for 30 days with all their events and attributes, including performance events. There is no difference between a recovered session and a session retained by a retention filter in terms of investigation capabilities.

Sessions already indexed and available in the RUM Explorer can also be recovered, which will extend their retention by 30 days.

In the Managed Archive UI, click **Recover** on the row of the session you want to recover.

{{< img src="real_user_monitoring/managed_archive/ma1.png" alt="A session row in the Managed Archive UI with the Recover button highlighted" style="width:100%;" >}}

You can query on recovered sessions in the RUM Explorer by querying on `@session.retention_reason:rehydration`, `@session.matching_retention_filter.name:rehydration` or `@session.matching_retention_filter.id:rehydration`. Recovered sessions that were initially retained by a retention filter have `@session.was_retained:true`.

## Permissions

Access to Managed Archive and Recovery is controlled through role-based access control (RBAC):

<table>
  <thead>
    <tr>
      <th style="width:30%">Permission</th>
      <th>Capability</th>
      <th>Default Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>rum_rehydration_read</code></td>
      <td>View the Managed Archive configuration and stored sessions, but cannot edit the configuration or recover sessions</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td><code>rum_rehydration_write</code></td>
      <td>Turn session storage on or off for an application</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td><code>rum_rehydration_index</code></td>
      <td>Recover sessions</td>
      <td>Admin</td>
    </tr>
  </tbody>
</table>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/rum_without_limits/
[2]: /real_user_monitoring/explorer/
