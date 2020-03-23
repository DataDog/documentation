---
title: Create a Webhook for Webhooks Integration
type: apicontent
order: 21.2
external_redirect: /api/#create-a-webhook-for-webhooks-integration
---

## Create a Webhooks Integration

Creates an endpoint with the name `<WEBHOOK_NAME>`.

**ARGUMENTS**:

-   **`name`** [*required*]: The name of the webhook. Corresponds with `<WEBHOOK_NAME>`. [Learn more on how to use it in monitor notifications][1].
-   **`url`** [*required*]: URL of the webhook
-   **`payload`** [*required*]: If `null`, uses default payload. If given a JSON payload, the webhook will return the payload specified by the given payload. [Using those variables][2].
-   **`custom_headers`** [*required*]: If `null`, uses no header. If given a JSON payload, these will be headers attached to your webhook.
-   **`encode_as`** [*optional*, default=json]: Encoding type. Can be given either `json` or `form`.

[1]: /monitors/notifications
[2]: /integrations/webhooks/#usage
