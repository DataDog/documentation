---
title: GeoIP Parser
processor_name: geo-ip-parser
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/logs/guide/manage_logs_and_metrics_with_terraform/"
  tag: "Guide"
  text: "Manage Logs and Metrics with Terraform"
---

## Overview

The geoIP parser takes an IP address attribute and extracts continent, country, subdivision, or city information (if available) in the target attribute path.

Most elements contain a `name` and `iso_code` (or `code` for continent) attribute. `subdivision` is the first level of subdivision that the country uses such as "States" for the United States or "Departments" for France.

## Use cases

| Use case | Example |
| :--- | :--- |
| Identify the geographic location (city, country) associated with an IP address in the log. | For iOS logs, parse the user's IP address to provide the location of the user identified in the logs. |

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

