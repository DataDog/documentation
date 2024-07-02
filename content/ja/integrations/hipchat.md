---
"categories":
- "collaboration"
- "notifications"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Datadog のアラートとグラフをチームの Hipchat ルームに送信。"
"doc_link": "https://docs.datadoghq.com/integrations/hipchat/"
"draft": false
"git_integration_title": "hipchat"
"has_logo": true
"integration_id": ""
"integration_title": "HipChat"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "hipchat"
"public_title": "Datadog-HipChat Integration"
"short_description": "Send Datadog alerts and graphs to your team's Hipchat room."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/hipchat/hipchat_graph.png" alt="Hipchat Graph" popup="true">}}

## Overview

The Hipchat integration lets Datadog send notifications to your HipChat room or individual handle. It can send:

- Messages and graphs when your Datadog monitors trigger.
- Messages about event stream activity (i.e. comments from teammates).

## Setup

### Configuration

1. [Create a new access token][1] for Datadog. Only notification level access is required.
2. Copy your key and enter it in the [HipChat integration tile][2].
3. Enter the room names you want Datadog to be able to send messages to.
   Tick the checkbox if you want to be notified for every comment, in all configured rooms. If you don't check it, commenters must include `@hipchat-<CHAT_NAME>` in each message they want to send to HipChat.

4. Save your configuration.

You also share graphs or send Monitor alerts to HipChat rooms using `@hipchat-<CHAT_NAME>`.

<div class="alert alert-warning">
If you are using a HipChat API V1 token and your chat handle contains special characters like commas or brackets, you don't need to escape them when you enter the handle; the auto-complete box does that for you.
</div>

#### HipChat server

If you host your own HipChat server, enter the server's hostname in the [Datadog-Hipchat tile][2]. The server needs to be accessible from the Internet.

Tick the **Ignore SSL** checkbox ONLY if your HipChat server's certificate is self-signed.

{{< img src="integrations/hipchat/hipchat_hostname.png" alt="Hipchat hostname" popup="true">}}

## Data Collected

### Metrics

The Hipchat integration does not include any metric.

### Events

The Hipchat integration does not include any events.

### Service Checks

The Hipchat integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][3].

[1]: https://www.hipchat.com/admin/api
[2]: https://app.datadoghq.com/integrations/hipchat
[3]: https://docs.datadoghq.com/help/

