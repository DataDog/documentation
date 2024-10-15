---
title: Why events don't appear to be showing up in the event stream with my github integration ?

---

First you need to configure your GitHub integration, see [this dedicated documentation article][1].

Then, If you have setup your Webhook on the relevant GitHub repositories and you can see it sending data but events don't appear to be showing up in the event stream this might come from your Webhook settings:

Instead of having your Webhook configured with content-type:application/x-www-form-urlencoded

You should set your Webhook with content-type:application/json:

{{< img src="integrations/faq/github_webhook_config.png" alt="github_webhook_config" >}}

Once updated you should see events flowing normally in your Datadog application. If not, feel free to reach out directly to [us][2].

[1]: /integrations/github/
[2]: /help/
