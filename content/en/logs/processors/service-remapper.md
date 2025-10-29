---
title: Service Remapper
processor_name: service-remapper
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

The service remapper processor assigns one or more attributes to your logs as the official service.

**Note**: If multiple service remapper processors are applied to a given log within the pipeline, only the first one (according to the pipeline's order) is taken into account.

## Use Cases

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

