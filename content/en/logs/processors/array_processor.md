---
title: Array Processor
description: "Extract, aggregate, or transform values from JSON arrays within your logs"
processor_name: array-processor
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
algolia:
  tags: ["array processor", "logs processing", "array transformation"]
---

## Overview

A processor for extracting, aggregating, or transforming values from JSON arrays within your logs.

Supported operations are:
- **Append**: Append a value to a target array attribute.
- **Length**: Compute the length of a source array and store the result in the target attribute.
- **Select**: Find an object in a source array using a filter, and then extract a specific value into the target attribute.

A processor executes within a [Pipeline](/logs/log_configuration/pipelines) to complete a data-structuring action and generate attributes to enrich your logs.

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
