---
title: Arithmetic Processor
description: "Add a new attribute with the result of a provided formula"
processor_type: arithmetic-processor
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
---

## Overview

Use the arithmetic processor to add a new attribute (without spaces or special characters in the new attribute name) to a log with the result of the provided formula. This remaps different time attributes with different units into a single attribute, or compute operations on attributes within the same log.

An arithmetic processor formula can use parentheses and basic arithmetic operators: `-`, `+`, `*`, `/`.

By default, a calculation is skipped if an attribute is missing. Select *Replace missing attribute by 0* to automatically populate missing attribute values with 0 to ensure that the calculation is done.

**Notes**:

* An attribute may be listed as missing if it is not found in the log attributes, or if it cannot be converted to a number.
* When using the operator `-`, add spaces around it because attribute names like `start-time` may contain dashes. For example, the following formula must include spaces around the `-` operator: `(end-time - start-time) / 1000`.
* If the target attribute already exists, it is overwritten by the result of the formula.
* Results are rounded up to the 9th decimal. For example, if the result of the formula is `0.1234567891`, the actual value stored for the attribute is `0.123456789`.
* If you need to scale a unit of measure, use the scale filter.

## Use cases

The arithmetic processor is used to calculate values using log attributes. The most common use case is converting duration attributes to different timeframes such as with Azure logs where we automatically convert the duration from nanoseconds to milliseconds.

## Before and after state of logs

{{% collapse-content title="Example: Converting duration from nanoseconds to milliseconds" level="h4" %}}

**Before:**

```json
{
  "operation": "db.query",
  "duration_ns": 25000000,
  "message": "Database query completed"
}
```

**Arithmetic Processor**

We create an Arithmetic Processor to convert duration_ns into milliseconds.


**After processing:**

```json
{
  "operation": "db.query",
  "duration_ns": 25000000,
  "duration_ms": 25,
  "message": "Database query completed"
}
```

The Arithmetic Processor adds a duration_ms attribute based on the calculation.

{{% /collapse-content %}}

## API

Use the [Datadog Log Pipeline API endpoint][1] with the following arithmetic processor JSON payload:

```json
{
  "type": "arithmetic-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "expression": "<ARITHMETIC_OPERATION>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": false
}
```

| Parameter            | Type    | Required | Description                                                                                                                                  |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | String  | Yes      | Type of the processor.                                                                                                                       |
| `name`               | String  | No       | Name of the processor.                                                                                                                       |
| `is_enabled`         | Boolean | No       | If the processors is enabled or not. Default: `false`.                                                                                       |
| `expression`         | String  | Yes      | Arithmetic operation between one or more log attributes.                                                                                     |
| `target`             | String  | Yes      | Name of the attribute that contains the result of the arithmetic operation.                                                                  |
| `is_replace_missing` | Boolean | No       | If `true`, it replaces all missing attributes of `expression` by 0, `false` skip the operation if an attribute is missing. Default: `false`. |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/logs-pipelines/
