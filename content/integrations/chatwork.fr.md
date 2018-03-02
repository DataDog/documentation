---
categories:
- Collaboration
ddtype: crawler
description: Send Datadog alerts and graphs to your team's Chatworks room.
doc_link: https://docs.datadoghq.com/integrations/chatwork/
git_integration_title: chatwork
has_logo: true
integration_title: Chatwork
is_public: true
kind: integration
manifest_version: '1.0'
name: chatwork
public_title: Datadog-Chatwork Integration
short_description: Send Datadog alerts and graphs to your team's Chatworks room.
version: '1.0'
---

{{< img src="integrations/chatwork/chatwork_event.png" alt="Chatwork Event" responsive="true" popup="true">}}

## Overview 

Integrate with ChatWork to:

* Be notified when someone posts on your stream
* Be notified when a metric alert is triggered

## Setup
### Installation

1. First, you might want to create a Datadog user in your ChatWork organization account which will post Datadog updates.

2. The ChatWork API is still in preview, so you have to [ask for an access](https://www.chatwork.com/login.php?redirect=apply_beta&package=chatwork&subpackage=api&args=).

3. Wait for the confirmation email (can take up to 2 days).

4. Follow [these instructions](http://developer.chatwork.com/ja/authenticate.html) to get a token.

5. Copy it into this [field](https://app.datadoghq.com/account/settings#integrations/chatwork).

6. Enter the chat names and ids you want to access. (ids can be found in the URL of chatrooms)

7. Tick the checkbox if you want to be notified for every comment, otherwise you will need to use the @chatwork-chat_namesyntax.
{{< img src="integrations/chatwork/chatwork_tile.png" alt="Chatwork tile" responsive="true" popup="true">}}

8. [Save your configuration](https://app.datadoghq.com/account/settings#integrations/chatwork)

## Data Collected
### Metrics

The Chatwork integration does not include metrics at this time.

### Events

The Chatwork integration does not include any event at this time.

### Service Checks
The Chatwork integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

