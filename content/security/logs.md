---
title: Log Management Security
kind: documentation
aliases:
    - /logs/security/
    - /security/logs/
further_reading:
- link: "/security/"
  tag: "Documentation"
  text: Review the main categories of data submitted to Datadog
---

This article is part of a **series on data security**.

The Log Management product supports multiple [environments and formats][1], allowing customers the flexibility to submit to Datadog nearly any data they choose. This article describes the main security guarantees and filtering controls available to users when submitting Logs to Datadog.

## Data Protection

The Datadog Agent submits Logs to Datadog over a TLS-encrypted TCP connection, requiring an outbound communication over port `10516`. Datadog utilizes symmetric encryption at rest (AES-256) for indexed Logs.

## Logs Filtering

For customers using release 6, the agent can be configured to filter Logs sent by the agent to the Datadog application. To prevent the submission of specific Logs, use the `log_processing_rules` [setting][2], with the **exclude_at_match** or **include_at_match** `type`. It is a list containing one or more regular expressions instructing the agent to filter Logs based on a whitelist or blacklist.

## Logs Obfuscation

For customers using release 6, the agent can be configured to obfuscate specific patterns within Logs sent by the agent to the Datadog application. To mask sensitive sequences within your Logs, use the `log_processing_rules` [setting][3], with the  **mask_sequences** `type`. It is a list containing one or more groups of parameters that describe how to perform replacements of sensitive data within your Logs.

## Server-side Editing

In addition to agent-side filtering, [Processing Pipelines][4] can be configured to edit or overwrite attributes server-side, as they are received by Datadog.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/
[2]: /logs/log_collection/#filter-logs
[3]: /logs/log_collection/#scrub-sensitive-data-in-your-logs
[4]: /logs/processing/
