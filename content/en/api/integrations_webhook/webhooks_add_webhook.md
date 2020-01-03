---
title: Update a Webhooks Integration
type: apicontent
order: 21.3
external_redirect: /api/#update-a-webhooks-integration
---

## Update a Webhooks Integration

Add a specific Webhook to a Datadog Webhooks integration.

**ARGUMENTS**:

* **`hooks`** [*required*]:
    Array of Webhook objects. A Webhook object is composed by:

    * **`name`** [*required*]:
        Your Webhook name.
        [Learn more on how to use it in monitor notifications][1].
    * **`url`** [*required*]:
        Your Webhook URL.
    * **`use_custom_payload`** [*optional*, *default*=**False**]:
        If **true**, allow you to specify a custom payload for your Webhook.

    * **`custom_payload`** [*optional*, *default*=**None**]:
        If `use_custom_payload` is **true**, specify your own payload to add your own custom fields to the request [using those variables][2].

    * **`encode_as_form`** [*optional*, *default*=**False**]:
        If `use_custom_payload` is **true**, set this to **true** to have your payload to be URL-encoded.
    * **`headers`** [*optional*, *default*=**None**]:
        Headers attached to your Webhook.

[1]: /monitors/notifications
[2]: /integrations/webhooks/#usage
