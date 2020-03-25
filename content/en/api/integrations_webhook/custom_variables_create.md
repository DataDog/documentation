---
title: Create a Custom Variable for Webhooks Integration
type: apicontent
order: 21.6
external_redirect: /api/#create-a-custom-variable-for-webhooks-integration
---

## Create a Custom Variable for Webhooks Integration

Creates an endpoint with the name `<CUSTOM_VARIABLE_NAME>`.

**ARGUMENTS**:

-   **`name`** [*required*]: The name of the webhook. Corresponds with `<CUSTOM_VARIABLE_NAME>`
-   **`value`** [*required*]: Value of the custom variable
-   **`is_secret`** [*required*]: A boolean value for whether custom variable is secret or not. If the custom variable is secret, will return `null` for the `<CUSTOM_VARIABLE_VALUE>` in the response payload.
