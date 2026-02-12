---
title: Remapper
processor_name: attribute-remapper
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
---

## Overview

The remapper processor remaps any source attribute(s) or tags to another target attribute or tag. For example, remap `user` by `firstname` to target your logs in the Log Explorer.

Constraints on the tag/attribute name are explained in the [attributes and tags documentation][5]. Some additional constraints, applied as `:` or `,`, are not allowed in the target tag/attribute name.

If the target of the remapper is an attribute, the remapper can also try to cast the value to a new type (`String`, `Integer` or `Double`). If the cast is not possible, the original type is kept.

**Note**: The decimal separator for `Double` need to be `.`.

## Use cases

| Use case | Example |
| :--- | :--- |
| Normalize log formats by mapping custom attributes to Standard Attributes. | Remap a log attribute like `source_ip` to the Standard Attribute `network.client.ip` for consistent logging across different systems. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[5]: /logs/log_collection/?tab=host#attributes-and-tags

