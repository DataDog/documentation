---
title: Why events don't appear to be showing up in the event stream with my github integration ?
kind: faq
customnav: main_references
---

First you need to configure your Github integration, please see [this dedicated documentation article](/integrations/github/)

Then, If you have setup your webhook on the relevant Github repos and you can see it sending data but  events don't appear to be showing up in the event stream this might come from your webhook settings:

Instead of having your webhook configured with content-type:application/x-www-form-urlencoded

You should set your webhook with content-type:application/json:

{{< img src="faq/github_webhook_config.png" alt="github_webhook_config" responsive="true" >}}

Once updated you should see events flowing normaly in your Datadog application. If not, feel free to reach out directly to support@datadoghq.com