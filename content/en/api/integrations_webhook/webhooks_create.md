---
title: Create a Webhooks Integration
type: apicontent
order: 21.2
external_redirect: /api/#create-a-webhooks-integration
---

## Create a Webhooks Integration

Create a Datadog-Webhooks integration.

**Note**:

* Using the `POST` method updates your integration configuration by **adding** your new configuration to the existing one in your Datadog organization.
* Using the `PUT` method updates your integration configuration by **replacing** your current configuration with the new one sent to your Datadog organization. All arguments are required when creating (`PUT`) a new Webhook configuration.

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
