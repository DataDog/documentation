---
title: Update a Webhook for Webhooks Integration
type: apicontent
order: 21.3
external_redirect: /api/#update-a-webhook-for-webhooks-integration
---

## Update a Webhook for Webhooks Integration

Updates the endpoint with the name `<WEBHOOK_NAME>`.

All arguments associated with this request are optional

**ARGUMENTS**:

-   **`name`**: The name of the webhook. Corresponds with `<WEBHOOK_NAME>`. For more information on using it, see [monitor notifications][1] docs.
-   **`url`**: URL of the webhook.
-   **`payload`**: If `null`, uses default payload. If given a JSON payload, the webhook will returns the specified payload. [Using those variables][2].
-   **`custom_headers`**: If `null`, uses no header. If given a JSON payload, attaches specified headers to your webhook.
-   **`encode_as`**: Encoding type. Valid values are `json` and `form`.

[1]: /monitors/notifications
[2]: /integrations/webhooks/#usage
