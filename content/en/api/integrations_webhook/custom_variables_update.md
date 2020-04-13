---
title: Update a Custom Variable for Webhooks Integration
type: apicontent
order: 21.7
external_redirect: /api/#update-a-custom-variable-for-webhooks-integration
---

## Update a Custom Variable for Webhooks Integration

Updates the endpoint with the name `<CUSTOM_VARIABLE_NAME>`.

All arguments associated with this request are optional

**ARGUMENTS**:

-   **`name`**: The name of the custom variable. Corresponds with `<CUSTOM_VARIABLE_NAME>`.
-   **`value`**: Value of the custom variable. If the custom variable is secret, this field is omitted in response payload.
-   **`is_secret`**: A boolean of whether or not custom variable is secret. A custom variable can be made secret, but you cannot undo secret custom variables.
