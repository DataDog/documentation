---
description: Send Datadog alerts and graphs to your team's Chatworks room.
doclevel: basic
integration_title: Chatwork
kind: integration
placeholder: true
title: Datadog-Chatwork Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/chatwork/chatwork_event.png" alt="Chatwork Event" >}}

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
{{< img src="integrations/chatwork/chatwork_tile.png" alt="Chatwork tile" >}}

8. [Save your configuration](https://app.datadoghq.com/account/settings#integrations/chatwork)
