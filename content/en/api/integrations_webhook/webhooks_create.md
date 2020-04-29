---
title: Create a Webhook for Webhooks Integration
type: apicontent
order: 21.2
external_redirect: /api/#create-a-webhook-for-webhooks-integration
---

## Create a Webhook for Webhooks Integration

Creates an endpoint with the name `<WEBHOOK_NAME>`.

**ARGUMENTS**:

-   **`name`** [*required*]: The name of the webhook. Corresponds with `<WEBHOOK_NAME>`. [Learn more on how to use it in monitor notifications][1].
-   **`url`** [*required*]: URL of the webhook.
-   **`payload`** [*optional*, default=**Default Payload**]: If given a JSON value, the webhook returns a payload values using those custom variables. For more information on how to use custom variables with webhooks, see [Using those variables][2].
-   **`custom_headers`** [*optional*, default=**None**]: If given a JSON value, attaches the specified headers to your webhook.
-   **`encode_as`** [*optional*, default=**json**]: Encoding type. Valid values are `json` and `form`.

[1]: /monitors/notifications/
[2]: /integrations/webhooks/#usage
