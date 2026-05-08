---
title: String Builder Processor
processor_name: string-builder-processor
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
---

## Overview

Use the string builder processor to add a new attribute (without spaces or special characters) to a log with the result of the provided template. This enables aggregation of different attributes or raw strings into a single attribute.

The template is defined by both raw text and blocks with the syntax `%{attribute_path}`.

**Notes**:

* This processor only accepts attributes with values or an array of values in the block.
* If an attribute cannot be used (object or array of object), it is replaced by an empty string or the entire operation is skipped depending on your selection.
* If a target attribute already exists, it is overwritten by the result of the template.
* Results of a template cannot exceed 256 characters.

## Use cases

| Use case | Example |
| :--- | :--- |
| Construct a new attribute by concatenating multiple existing attribute values and custom strings. | For GSuite logs, construct a human-readable message attribute like `Actor %{usr.email} performed an event %{evt.name}`. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

