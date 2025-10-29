---
title: Arithmetic Processor
processor_name: arithmetic-processor
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
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

| Use case | Example |
| :--- | :--- |
| Calculate new values by performing mathematical operations on log attributes. | Convert duration attributes in Azure logs from nanoseconds to milliseconds for easier analysis. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

