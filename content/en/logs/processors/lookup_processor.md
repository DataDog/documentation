---
title: Lookup Processor
processor_name: lookup-processor
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
---

## Overview

Use the lookup processor to define a mapping between a log attribute and a human readable value saved in a [Reference Table][7] or the processors mapping table.

For example, you can use the lookup processor to map an internal service ID into a human readable service name. Alternatively, you can use it to check if the MAC address that just attempted to connect to the production environment belongs to your list of stolen machines.

The lookup processor performs the following actions:

* Looks if the current log contains the source attribute.
* Checks if the source attribute value exists in the mapping table.
  * If it does, creates the target attribute with the corresponding value in the table.
  * Optionally, if it does not find the value in the mapping table, it creates a target attribute with the default fallback value.

The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform. However, Reference Tables support larger file sizes.

## Use cases

| Use case | Example |
| :--- | :--- |
| Transform cryptic or numerical attribute values into human-readable text. | Map a numeric service ID to a human-readable service name, or a user ID to a username. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[7]: /integrations/guide/reference-tables/

