---
title: Troubleshooting
further_reading:
- link: "https://opentelemetry.io/docs/collector/troubleshooting/"
  tag: "External Site"
  text: "OpenTelemetry Troubleshooting"
---

If you experience unexpected behavior using OpenTelemetry with Datadog, this guide may help you resolve the issue. If you continue to have trouble, contact [Datadog Support][1] for further assistance.

## Setup and configuration issues

### Choose the right setup

Link to setup page...

- OTel SDK + OTel Collector
- OTel API + Datadog SDK + Datadog Agent
- OTel SDK + OTLP Ingest in Datadog Agent
- Converged Agent (Beta)
- Direct backend ingest for traces, metrics, and logs

### Configuration issues

- YAML indentation errors
- Incorrect API key
- Wrong Datadog site selected

### Compatibility

- Version compatibility matrix
- Migration guides for version updates
- Known limitations and workarounds

## Data collection

### Data ingestion issues

- Trace ingestion
- Metric ingestion
- Log ingestion

## Data representation

### Trace Issues

### Metric Issues

Runtime metrics don't show up

### Log Issues

Log correlation

## Environment-specific issues

### Containers

- Docker-related problems
- Kubernetes-specific issues

### Serverless

- Azure
- AWS
- GCP

## Performance and optimization

- High resource usage
- Slow data processing
- Sampling issues

## Semantic convention and naming

- OpenTelemetry to Datadog attribute mapping
- Naming inconsistencies and their impact

## Troubleshooting tools and techniques

Using debug logs
Leveraging Datadog's troubleshooting features
OpenTelemetry debugging tools

## Error messages

Categorized list of frequent errors
Step-by-step resolution guides

## Additional support

If you still need additional support, [open a ticket with Datadog Support][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /opentelemetry/