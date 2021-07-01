---
title: Migrating from the Datadog Forwarder to the Datadog Lambda Extension
kind: guide
---

The Datadog Lambda Extension is a lightweight version of the Datadog Agent built to run alongside your code with minimal performance overhead. 

This guide explains why you may wish to migrate from the Datadog Forwarder to the Datadog Lambda Extension, as well as how to go about migration.

## Should I migrate to the Datadog Lambda Extension?

### Advantages

The Datadog Lambda Extension offers the following advantages over the Datadog Forwarder:

- **Cost savings**: The Forwarder converts metrics and traces to logs, which are then sent to Datadog. The Datadog Lambda Extension sends traces, metrics, and logs directly to Datadog, which diminishes the expense of CloudWatch Logs.
- **Lower latency**: The Datadog Lambda Extension runs as a background task in a sidecar (similar to the Agent sidecar in container-based environments). As a result, the extension does not impact the latency of customer code.

### Trade-offs

Migration from the Forwarder to the Extension can be an involved process. There is one Forwarder setup per region and account, but there is one Extension setup **per function**. That is, if you are shipping data from *N* functions using the Forwarder, you must set up the Extension *N* times before the migration is complete.

## How to migrate from the Forwarder to the Extension

Datadog recommends that you set up the Extension **before** removing the Forwarder. This means that for the period during which both the Extension and Forwarder are active, all telemetry is sent twice. The alternative (removing the Forwarder before setting up the Extension) results in a period of zero visibility. Depending on your organization's particular needs, you may prefer one outcome over the other.

### Setting up the Datadog Lambda Extension

### Removing the Datadog Forwarder
