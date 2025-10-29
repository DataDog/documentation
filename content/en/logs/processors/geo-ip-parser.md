---
title: GeoIP Parser
processor_name: geo-ip-parser
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

The geoIP parser takes an IP address attribute and extracts continent, country, subdivision, or city information (if available) in the target attribute path.

Most elements contain a `name` and `iso_code` (or `code` for continent) attribute. `subdivision` is the first level of subdivision that the country uses such as "States" for the United States or "Departments" for France.

## Use Cases

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

