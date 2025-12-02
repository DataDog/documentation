---
title: Category Processor
description: "Use the Category Processor to add a new attribute to logs matching a search query"
processor_name: category-processor
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
algolia:
  tags: ["category processor", "logs processing", "categorization"]
---

## Overview

Use the Category Processor to add a new attribute (without spaces or special characters in the new attribute name) to a log matching a provided search query. Use categories to create groups for an analytical view. For example, URL groups, machine groups, environments, and response time buckets.

**Notes**:
- The syntax of the query is the one of Logs Explorer search bar.
- The query must be a valid query string.

A processor executes within a [Pipeline](/logs/log_configuration/pipelines) to complete a data-structuring action and generate attributes to enrich your logs.

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
