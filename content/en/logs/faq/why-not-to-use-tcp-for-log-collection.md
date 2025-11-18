---
title: Why You Should Not Use TCP for Log Collection
further_reading:
- link: /logs/log_collection/
  tag: "Documentation"
  text: "Log Collection"
---

## Overview

Datadog does not support TCP as a transport protocol for log collection. While TCP intake endpoints may still function for legacy use cases, they provide no reliability or delivery guarantees.
This page explains why TCP is not recommended and why Datadog strongly advises using HTTP instead.

## Why TCP is not supported

TCP-based log forwarding does not provide feedback or acknowledgment to the client. This means your logs may appear to send successfully even if Datadog never received them. Data loss can occur silently in several scenarios, including:
- Invalid API keys or blacklisted organizations
- Misconfigured DNS, ports, or custom TCP implementations
- Interrupted or dropped connections between edge and intake
- Intake overloads or crashes

Because the client cannot detect where transmission stopped, it cannot retry failed requests, making TCP unreliable for log delivery.

## Technical limitations

- **No batching or compression**: Each message is sent individually, increasing bandwidth usage and customer egress costs.
- **Uncontrolled back-pressure**: During high load, intake may pause reading from sockets, causing send buffers to fill and data to drop.
- **No visibility**: Clients cannot tell whether data was successfully written or lost during connection closure.

## Recommended alternatives

For reliable, supported log ingestion, Datadog recommends:
- Using the HTTP intake endpoint, or
- Forwarding logs through the Datadog Agent or an official forwarder integration. Remove usages of `logs_config.force_use_tcp` and set `logs_config.force_use_http` to `true`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}