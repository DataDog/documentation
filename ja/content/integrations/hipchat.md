---
description: Send Datadog alerts and graphs to your team's Hipchat room.
git_integration_title: hipchat
integration_title: HipChat
kind: integration
newhlevel: true
placeholder: true
title: Datadog-HipChat Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/hipchat/hipchat_graph.png" alt="Hipchat Graph" >}}

## Overview

The Hipchat integration lets Datadog send notifications to your HipChat room or individual handle. It can send:

* messages and graphs when your Datadog monitors trigger
* messages about event stream activity (i.e. comments from teammates)

## Configuration

1. [Create a new access token](https://www.hipchat.com/admin/api) for Datadog. Only notification level acccess is required.

2. Copy your key and enter it in the [HipChat integration tile](https://app.datadoghq.com/account/settings#integrations/hipchat).

3. Enter the room names you want Datadog to be able to send messages to.
Tick the checkbox if you want to be notified for every comment, in all configured rooms. If you don't check it, commenters must include `@hipchat-<chat_name>` in each message they want to send to HipChat.

4. Save your configuration.

You also share graphs or send Monitor alerts to HipChat rooms using `@hipchat-<chat_name>`.

<div class="alert alert-warning">
If you are using a HipChat API V1 token and your chat handle contains special characters like commas or brackets, you don't need to escape them when you enter the handle; the autocomplete box does that for you.
</div>

#### HipChat Server

If you host your own HipChat server, enter the server's hostname [here](https://app.datadoghq.com/account/settings#integrations/hipchat). The server needs to be accessible from the Internet.

Tick the **Ignore SSL** checkbox ONLY if your HipChat server's certificate is self-signed.

{{< img src="integrations/hipchat/hipchat_hostname.png" alt="Hipchat hostname" >}}

## Metrics

This integration does not submit any metrics.
