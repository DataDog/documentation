---
title: Grok Parser
description: "Parse your logs using the Grok Processor"
processor_name: grok-parser
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn about parsing"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
algolia:
  tags: ["grok", "grok parser", "logs parsing", "Extracting Attributes", "parsing"]
---

## Overview

Create custom grok rules to parse the full message or a specific attribute of your raw event. As a best practice, limit your grok parser to 10 parsing rules. For more information on Grok syntax and parsing rules, see [Parsing](/logs/log_configuration/parsing).

A processor executes within a [Pipeline](/logs/log_configuration/pipelines) to complete a data-structuring action and generate attributes to enrich your logs.

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
