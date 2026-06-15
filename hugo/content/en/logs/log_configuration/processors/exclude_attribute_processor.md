---
title: Exclude Attribute Processor
description: "Remove a specified attribute from your logs during pipeline processing"
processor_type: exclude-attribute
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

Use the Exclude Attribute Processor to remove a specified attribute from your logs during pipeline processing. It strips unwanted, redundant, or intermediate attributes before logs reach your indexes, archives, or forwarding destinations.

**Notes**:

- This processor operates during pipeline processing and does not reduce ingestion costs. Metering occurs before pipeline processing.
- Reserved attributes (such as `host`, `source`, `service`, `status`, `message`, `timestamp`) cannot be excluded.
- This processor removes attributes only, not tags.

## Use cases

- **Clean up intermediate parsing artifacts**: Some pipelines create temporary attributes during processing. For example, a Grok parser may extract a raw chunk that feeds into a [nested pipeline](/logs/log_configuration/pipelines/#nested-pipelines). The Exclude Attribute Processor removes these intermediate attributes from the final log.
- **Improve log readability**: Remove verbose or noisy attributes that clutter logs in Explorer, archives, and forwarding destinations.

## Before and after state of logs

{{% collapse-content title="Example: Removing a parsed attribute with the Exclude Attribute Processor" level="h4" %}}

**Before:**

```json
{
  "timestamp": "2026-06-10T09:14:02.887Z",
  "status": "error",
  "service": "payment-processor",
  "message": "Transaction failed for customer cust_38271",
  "http.response.body": "{\"error\":\"card_declined\",\"tx_id\":\"TX-8847291\",\"amount\":249.99,\"currency\":\"USD\",\"customer_id\":\"cust_38271\",\"provider\":\"stripe\",\"retry_allowed\":false,\"gateway_ref\":\"gw-9182-xk\"}",
  "tx_id": "TX-8847291",
  "amount": 249.99,
  "currency": "USD",
  "error_code": "card_declined"
}
```

**Exclude Attribute Processor**

Create an Exclude Attribute Processor to remove the `http.response.body` attribute. The useful fields (`tx_id`, `amount`, `currency`, `error_code`) have already been extracted by an earlier Grok parser, so the full response body is no longer needed.

**After processing:**

```json
{
  "timestamp": "2026-06-10T09:14:02.887Z",
  "status": "error",
  "service": "payment-processor",
  "message": "Transaction failed for customer cust_38271",
  "tx_id": "TX-8847291",
  "amount": 249.99,
  "currency": "USD",
  "error_code": "card_declined"
}
```

The `http.response.body` attribute is removed from the log before it reaches indexes, archives, or forwarding destinations.

{{% /collapse-content %}}

## API

Use the [Datadog Log Pipeline API endpoint][1] with the following Exclude Attribute Processor JSON payload:

```json
{
  "type": "exclude-attribute",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "attribute_to_exclude": "<ATTRIBUTE_NAME>"
}
```

| Parameter              | Type    | Required | Description                                              |
|------------------------|---------|----------|----------------------------------------------------------|
| `type`                 | String  | Yes      | Type of the processor.                                   |
| `name`                 | String  | No       | Name of the processor.                                   |
| `is_enabled`           | Boolean | No       | If the processor is enabled or not. Default: `false`.    |
| `attribute_to_exclude` | String  | Yes      | Name of the log attribute to remove from the log event.  |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/logs-pipelines/
