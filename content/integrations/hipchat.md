---
title: Datadog-HipChat Integration
integration_title: HipChat
kind: integration
newhlevel: true
git_integration_title: hipchat
---

{{< img src="integrations/hipchat/hipchat_graph.png" alt="Hipchat Graph" >}}

## Overview

Connect HipChat to Datadog in order to:

* Receive notifications when someone posts on your stream.
* Receive metric alerts and see graphs within HipChat.

## Configuration

1. [Create a new access token](https://www.hipchat.com/admin/api) for Datadog. Only notification level acccess is required.

2. Copy your key and enter it in the [HipChat integration tile](https://app.datadoghq.com/account/settings#integrations/hipchat).

3. Enter the room names you wish to allow access to from Datadog.
Tick the checkbox if you want to be notified for every comment, in all configured rooms. If the checkbox is left unchecked, you will need to use the @hipchat-chat_name syntax.

4. Save your configuration

You can now share graphs or send alerts to HipChat rooms using the syntax @hipchat-chat_name

**Notice**: If you are using a HipChat API V1 token, if your HipChat handle contains special characters such as commas or brackets, they'll be escaped when sending notifications with the @ handle. You shouldn't have to worry about that, the autocomplete box automatically takes care of escaping chat names.

<div class="alert alert-warning">
If you want to use a HipChat API V2 token, then your HipChat handle may ONLY  have lower case alphanumerical characters and the special characters '-' and '_'.
</div>

#### HipChat Server

If you use an on-premise HipChat server, enter your server's hostname [here](https://app.datadoghq.com/account/settings#integrations/hipchat). 
The server needs to be accessible from the outside world. Tick the checkbox ONLY if your HipChat server's certificate is self-signed.

{{< img src="integrations/hipchat/hipchat_hostname.png" alt="Hipchat hostname" >}}

## Metrics

This integration does not provide metrics.

