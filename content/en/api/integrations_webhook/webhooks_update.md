---
title: Update a Webhook for Webhooks Integration
type: apicontent
order: 21.3
external_redirect: /api/#update-a-webhook-for-webhooks-integration
---

## Update a Webhook for Webhooks Integration

Updates the endpoint with the name `<WEBHOOK_NAME>`.

All arguments associated with this request are optional.

**ARGUMENTS**:

-   **`name`**: The name of the webhook. Corresponds with `<WEBHOOK_NAME>`. [Learn more on how to use it in monitor notifications][1].
-   **`url`**: URL of the webhook.
-   **`payload`**: If given a JSON value, the webhook returns a payload values using those custom variables. For more information on how to use custom variables with webhooks, see [Using those variables][2].
-   **`custom_headers`**: If `null`, uses no header. If given a JSON value, attaches the specified headers to your webhook.
-   **`encode_as`**: Encoding type. Valid values are `json` and `form`.

[1]: /monitors/notifications/
[2]: /integrations/webhooks/#usage
