---
title: Lookup Processor
description: "Define a mapping between a log attribute and a human readable value"
processor_type: lookup-processor
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/integrations/guide/reference-tables/"
  tag: "Documentation"
  text: "Learn about Reference Tables"
---

## Overview

Use the lookup processor to define a mapping between a log attribute and a human readable value saved in a [Reference Table][7] or the processors mapping table.

For example, you can use the lookup processor to map an internal service ID into a human readable service name. Alternatively, you can use it to check if the MAC address that just attempted to connect to the production environment belongs to your list of stolen machines.

## Use cases

The Lookup Processor is typically used to transform an attribute into a human readable attribute. It is commonly used for:
- Mapping a service ID to a human readable service name
- Mapping a user ID to a username
- Mapping a bit value to a human readable attribute


## Setup

The lookup processor performs the following actions:

* Looks if the current log contains the source attribute.
* Checks if the source attribute value exists in the mapping table.
  * If it does, creates the target attribute with the corresponding value in the table.
  * Optionally, if it does not find the value in the mapping table, it creates a target attribute with the default fallback value set in the `fallbackValue` field. You can manually enter a list of `source_key,target_value` pairs or upload a CSV file on the **Manual Mapping** tab.

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Lookup processor" style="width:80%;">}}

    The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform. However, Reference Tables support larger file sizes.

  * Optionally, if it does not find the value in the mapping table, it creates a target attribute with the value of the reference table. You can select a value for a [Reference Table][7] on the **Reference Table** tab.

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Lookup processor"
    style="width:80%;">}}


## Before and after state of logs
{{% collapse-content title="Example: Using the Lookup Processor to enrich logs with human-readable values" level="h4" %}}

**Before:**

```json
{
  "transaction": {
    "id": "tx_98765",
    "status_code": 2
  },
  "user": {
    "id": "42"
  }
}
```

**Lookup Processor**

We create a Lookup Processor with source attribute user.id and a lookup table containing users:
42 → alice.doe
77 → bob.smith

**After processing:**

```json
{
  "transaction": {
    "id": "tx_98765",
    "status_code": 2,
  },
  "user": {
    "id": "42",
    "username": "alice.doe"
  }
}
```

{{% /collapse-content %}}


## API

Use the [Datadog Log Pipeline API endpoint][1] with the following lookup processor JSON payload:

```json
{
  "type": "lookup-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "source": "<SOURCE_ATTRIBUTE>",
  "target": "<TARGET_ATTRIBUTE>",
  "lookup_table": ["key1,value1", "key2,value2"],
  "default_lookup": "<DEFAULT_TARGET_VALUE>"
}
```

| Parameter        | Type             | Required | Description                                                                                                                                                              |
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | String           | Yes      | Type of the processor.                                                                                                                                                   |
| `name`           | String           | No       | Name of the processor.                                                                                                                                                   |
| `is_enabled`     | Boolean          | Yes      | If the processor is enabled or not. Default: `false`.                                                                                                                     |
| `source`         | String           | Yes      | Source attribute used to perform the lookup.                                                                                                                             |
| `target`         | String           | Yes      | Name of the attribute that contains the corresponding value in the mapping list or the `default_lookup` if not found in the mapping list.                                |
| `lookup_table`   | Array of strings | Yes      | Mapping table of values for the source attribute and their associated target attribute values, formatted as [ "source_key1,target_value1", "source_key2,target_value2" ]. |
| `default_lookup` | String           | No       | Value to set the target attribute if the source value is not found in the list.                                                                                          |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/logs-pipelines/
[7]: /integrations/guide/reference-tables/