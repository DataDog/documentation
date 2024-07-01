---
"categories":
- "collaboration"
- "notifications"
"custom_kind": "integration"
"dependencies": []
"description": "Send Datadog alerts and graphs to your team's Chatworks room."
"doc_link": "https://docs.datadoghq.com/integrations/chatwork/"
"draft": false
"git_integration_title": "chatwork"
"has_logo": true
"integration_id": "chatwork"
"integration_title": "Chatwork"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "chatwork"
"public_title": "Datadog-Chatwork Integration"
"short_description": "Send Datadog alerts and graphs to your team's Chatworks room."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/chatwork/chatwork_event.png" alt="Chatwork Event" popup="true">}}

## Overview

Integrate with Chatwork to:

- Be notified when someone posts on your stream.
- Be notified when a metric alert is triggered.

## Setup

### Installation

1. First, create a Datadog user in your Chatwork organization account for posting Datadog updates.
2. The Chatwork API is still in preview, so you have to [ask for an access][1].
3. Wait for the confirmation email (can take up to 2 days).
4. Follow [these instructions][2] to get a token.
5. Copy it into this [field][3].
6. Enter the chat names and ids you want to access. (ids can be found in the URL of chatrooms)
7. Tick the checkbox if you want to be notified for every comment, otherwise you need to use the `@chatwork-chat_namesyntax`.
   {{< img src="integrations/chatwork/chatwork_tile.png" alt="Chatwork tile" popup="true">}}

8. [Save your configuration][3]

## Data Collected

### Metrics

The Chatwork integration does not include metrics.

### Events

The Chatwork integration does not include any events.

### Service Checks

The Chatwork integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: https://www.chatwork.com/login.php?redirect=apply_beta&package=chatwork&subpackage=api&args=
[2]: http://developer.chatwork.com/ja/authenticate.html
[3]: https://app.datadoghq.com/integrations/chatwork
[4]: https://docs.datadoghq.com/help/

