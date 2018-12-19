---
title: Log Management Security
kind: documentation
aliases:
    - /logs/security/
further_reading:
- link: "/security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
---

This article is part of a [series on data security][1].

The Log Management product supports multiple [environments and formats][2], allowing customers the flexibility to submit to Datadog nearly any data they choose. This article describes the main security guarantees and filtering controls available to users when submitting Logs to Datadog.

## Information Security

The Datadog Agent submits Logs to Datadog over a TLS-encrypted TCP connection, requiring an outbound communication over port `10516`. Datadog uses symmetric encryption at rest (AES-256) for indexed Logs. Indexed Logs are deleted from the Datadog platform once their retention period, as defined by the customer, expires.

## Logs Filtering

For customers using release 6, the Agent can be configured to filter Logs sent by the Agent to the Datadog application. To prevent the submission of specific Logs, use the `log_processing_rules` [setting][3], with the **exclude_at_match** or **include_at_match** `type`. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to filter out Logs based on a whitelist or blacklist.

## Logs Obfuscation

For customers using release 6, the Agent can be configured to obfuscate specific patterns within Logs sent by the Agent to the Datadog application. To mask sensitive sequences within your Logs, use the `log_processing_rules` [setting][4], with the  **mask_sequences** `type`. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to redact sensitive data within your Logs.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security
[2]: /logs/log_collection
[3]: /logs/log_collection/#filter-logs
[4]: /logs/log_collection/#scrub-sensitive-data-in-your-logs
