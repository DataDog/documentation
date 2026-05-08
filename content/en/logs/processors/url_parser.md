---
title: URL Parser
processor_name: url-parser
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
---

## Overview

The URL parser processor extracts query parameters and other important parameters from a URL.

## Use cases

| Use case | Example |
| :--- | :--- |
| Automatically extract essential components from a URL attribute. | For `nginx` logs, automatically parse the URL to extract query parameters, filters, and source information. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

