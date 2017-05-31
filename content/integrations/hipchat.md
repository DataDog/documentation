---
title: Datadog-HipChat Integration
integration_title: HipChat
kind: integration
newhlevel: true
git_integration_title: hipchat
---

# Overview

Connect HipChat to Datadog in order to:

* Receive notifications when someone posts on your stream.
* Receive metric alerts and see graphs within Hipchat.

# Installation

No installation steps are required for this integration

# Configuration

1. [Create a new access token](https://www.hipchat.com/admin/api) for Datadog. Only notification level acccess is required.
1. Copy your key and enter it in the [HipChat integration tile](https://app.datadoghq.com/account/settings#integrations/hipchat).
1. Enter the room names you wish to allow access to from Datadog.
Tick the checkbox if you want to be notified for every comment, in all configured rooms. If the checkbox is left unchecked, you will need to use the @hipchat-chat_name syntax.
1. Save your configuration

You can now share graphs or send alerts to HipChat rooms using the syntax @hipchat-chat_name

*NOTICE : If your chat name contains special characters such as commas or brackets, they'll be escaped when sending notifications with the @ handle. You shouldn't have to worry about that, the autocomplete box automatically takes care of escaping chat names.

# Metrics

This integration does not provide metrics.

