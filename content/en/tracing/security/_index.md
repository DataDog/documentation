---
title: Security and Fine-tuning
kind: documentation
description: "Configure the Datadog Tracer or Agent to modify or discard spans for security or fine-tuning purposes."
aliases:
    - /security/tracing
    - /tracing/guide/security
further_reading:
    - link: 'tracing/security/agent_span_modifications'
      tag: 'Documentation'
      text: 'Configure the Datadog Agent to modify or discard spans.'
    - link: 'tracing/tracer_span_modification'
      tag: 'Documentation'
      text: 'Configure the Tracer to modify or discard spans.'
---
## Overview

The Datadog Agent and all tracing libraries have several options available to modify or discard spans.

These configuration options allow for a variety of use cases related to obfuscating or removing sensitive information from traces, as well as discarding traces from certain endpoints or matching criteria. Various options are described below.  Since it is not possible for us to detail every possible configuration of the Tracer and Agent, we have illustrated common examples.

If the below examples do not cover your security or fine-tuning needs, reach out to our awesome [support team][1], who will be more than happy to provide guidance.

## Agent Configurations

placeholder

### Automatic Filtering

placeholder

### Obfuscation of Traces in the Agent

placeholder

### Filter by span tags

placeholder

### Filter by resource

placeholder

### Submit traces directly to the Agent API

placeholder

## Tracer Configurations

placeholder

### Post-Processing Traces

placeholder


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/help
