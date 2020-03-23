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

-   **`name`**: The name of the webhook. Corresponds with `<WEBHOOK_NAME>`. [Learn more on how to use it in monitor notifications][1].
-   **`url`**: URL of the webhook
-   **`payload`**: If `null`, uses default payload. If given a JSON payload, the webhook will return the payload specified by the given payload. [Using those variables][2].
-   **`custom_headers`**: If `null`, uses no header. If given a JSON payload, these will be headers attached to your webhook.
-   **`encode_as`**: Encoding type. Can be given either `json` or `form`.

[1]: /monitors/notifications
[2]: /integrations/webhooks/#usage
