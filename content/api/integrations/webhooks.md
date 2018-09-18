---
title: Webhooks
type: apicontent
order: 14.5
external_redirect: /api/#webhooks
---

## Webhooks

Configure your Datadog-Webhooks integration directly through Datadog API.  
[Read more about Datadog-Webhooks integration][1]

##### ARGUMENTS

* **`hooks`** [*required*]:  
    Array of Webhook objects. A Webhook object is composed by:

    * **`name`** [*required*]:  
        Your Webhook name.  
        [Learn more on how to use it in monitor notifications][2].
    * **`url`** [*required*]:  
        Your Webhook URL.
    * **`use_custom_payload`** [*optional*, *default*=**False**]:  
        If **true**, allow you to specify a custom payload for your Webhook. 
    
    * **`custom_payload`** [*optional*, *default*=**None**]:  
        If `use_custom_payload` is **true**, specify your own payload to add your own custom fields to the request [using those variables](integrations/webhooks/#usage).

    * **`encode_as_form`** [*optional*, *default*=**False**]:  
        If `use_custom_payload` is **true**, set this to **true** to have your payload to be URL-encoded.
    * **`headers`** [*optional*, *default*=**None**]:  
        Headers attached to your Webhook.

[1]: /integrations/webhooks
[2]: /monitors/notifications
