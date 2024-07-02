---
"categories":
- "collaboration"
- "notifications"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Datadog のアラートとグラフをチームのフローに送信。"
"doc_link": "https://docs.datadoghq.com/integrations/flowdock/"
"draft": false
"git_integration_title": "flowdock"
"has_logo": true
"integration_id": ""
"integration_title": "Flowdock"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "flowdock"
"public_title": "Datadog-Flowdock Integration"
"short_description": "Send Datadog alerts and graphs to your team's flows."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/flowdock/flowdock_overview.png" alt="Flowdock overview" popup="true">}}

## Overview

Integrate with FlowDock to:

- Be notified when someone posts on your stream.
- Get monitor alerts, integration status changes (and much more) directly in your flows.

Datadog takes advantage of Flowdock's Threads to avoid polluting your flows with notifications: for a given flow, every notification goes into its own Thread, further related notifications go in the same thread (for instance if a given monitor alert is triggered and then resolved, the corresponding notifications are grouped in Flowdock).

## Setup

### Installation

To integrate Flowdock with Datadog, use the **Configuration** tab in Flowdock. It fetches all your opened flows. If you don't want to post to all of them, you can delete the ones you don't want to appear in the autocomplete list. You can then use `@flowdock` handles in any user message or monitor to post messages to your flows.

User messages and snapshots go into the main thread of your flow while each alert is posted in its own Flowdock thread. It prevents the main thread from being overpolluted with alerts and keeps your team chat clean and organized. On the other hand, you always have an immediate glance at the statuses of the monitors which reported recently on the Inbox view.

## Data Collected

### Metrics

The Flowdock integration does not include any metric.

### Events

The Flowdock integration does not include any events.

### Service Checks

The Flowdock integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: https://docs.datadoghq.com/help/

