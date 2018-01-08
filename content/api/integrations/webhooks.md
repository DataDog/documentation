---
title: Webhooks
type: apicontent
order: 13.4
external_redirect: /api/#webhooks
---

## Webhooks

Configure your Datadog-Webhooks integration directly through Datadog API.  
[Read more about Datadog-Webhooks integration](/integrations/webhooks)

##### ARGUMENTS

* `hooks`:
    Array of Webhook objects. A Webhook object is composed by:

    * `name` [*required*]:  
        Your Webhook name. Add `@webhook-name_of_the_webhook` in the text of the metric alert [you want to trigger the Webhook](/monitors/notifications).
    * `url` [*required*]:  
        Your Webhook URL.
    * `use_custom_payload` [*optional*, *default*=**False**]:
        If **true**, allow you to specify a custom payload for your Webhook. 
    
    * `custom_payload`:  
        If `use_custom_payloag` is **true**, specify your own payload in order to add your own custom fields to the request [using those variables](integrations/webhooks/#usage).

    * `encode_as_form` [*optional*, *default*=**False**]:
        If `use_custom_payloag` is **true**, set this to **true** to have your payload to be URL-encoded.
    * `headers`:  
        Headers attached to your Webhook.