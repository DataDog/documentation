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

* `hooks` [*required*]:  
    Array of Webhook objects. A Webhook object is composed by:

    * `name` [*required*]:  
        Your Webhook name.  
        [Learn more on how to use it in monitor notifications](/monitors/notifications).
    * `url` [*required*]:  
        Your Webhook URL.
    * `use_custom_payload` [*optional*, *default*=**False**]:  
        If **true**, allow you to specify a custom payload for your Webhook. 
    
    * `custom_payload` [*optional*, *default*=**None**]:  
        If `use_custom_payloag` is **true**, specify your own payload to add your own custom fields to the request [using those variables](integrations/webhooks/#usage).

    * `encode_as_form` [*optional*, *default*=**False**]:  
        If `use_custom_payloag` is **true**, set this to **true** to have your payload to be URL-encoded.
    * `headers` [*optional*, *default*=**None**]:  
        Headers attached to your Webhook.

* `run_check` [*optional*, *default*=**false**]:  
    Determines if the integration install check is run before returning a response.
    If **true**:
        - The install check is run
        - If there’s an error in the configuration the error is returned
        - If there’s no error, *204 No Content* response code is returned

    If **false**:
        - We return a *202 accepted*
        - Install check is run after returning a response