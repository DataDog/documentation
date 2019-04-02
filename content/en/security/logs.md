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

## Configuration Requirements for HIPAA-enabled Customers

Datadog will sign a Business Associate Agreement (BAA) with customers that transmit protected health information (ePHI) via Datadog’s Log Management Service.

Prior to executing a BAA, customers transmitting ePHI to the Datadog Log Management Service must implement the following configurations:

* The Datadog agent must be configured to submit logs to `encrypted-intake.logs.datadoghq.com`
* Other log sources besides the Datadog agent must be configured to submit logs to `http-encrypted-intake.logs.datadoghq.com`
* A HIPAA-ready lambda function, provided by Datadog, must be used to submit logs. The default Datadog AWS lambda must not be used.

Additionally, certain features are not available at the moment to customers who have signed Datadog's BAA, notably:

* Users cannot request support via chat
* The Logs Live Tail is disabled
* Notifications from Log Monitors cannot include log samples
* Log Monitors cannot be configured with a `group-by` clause

If you have any questions about how the Log Management Service satisfies the applicable requirements under HIPAA, please contact your account manager.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security
[2]: /logs/log_collection
[3]: /logs/log_collection/#filter-logs
[4]: /logs/log_collection/#scrub-sensitive-data-in-your-logs
