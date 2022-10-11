---
title: Log Management Data Security
kind: documentation
aliases:
    - /logs/security/
    - /security/logs/
further_reading:
- link: "/data_security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security_platform/" target="_blank">Security</a> section.</div>

The Log Management product supports multiple [environments and formats][1], allowing you to submit to Datadog nearly any data you choose. This article describes the main security guarantees and filtering controls available to you when submitting logs to Datadog.

## Information security

The Datadog Agent submits logs to Datadog either through HTTPS or through TLS-encrypted TCP connection on port 10516, requiring outbound communication (see [Agent Transport for logs][2]).

Datadog uses symmetric encryption at rest (AES-256) for indexed logs. Indexed logs are deleted from the Datadog platform once their retention period, as defined by you, expires.

## Logs filtering

In version 6 or above, the Agent can be configured to filter logs sent by the Agent to the Datadog application. To prevent the submission of specific logs, use the `log_processing_rules` [setting][3], with the **exclude_at_match** or **include_at_match** `type`. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to filter out logs based on the inclusion or exclusion rules supplied.

## Logs obfuscation

As of version 6, the Agent can be configured to obfuscate specific patterns within logs sent by the Agent to the Datadog application. To mask sensitive sequences within your logs, use the `log_processing_rules` [setting][4], with the  **mask_sequences** `type`. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to redact sensitive data within your logs.

## HIPAA-enabled customers

Datadog will sign a Business Associate Agreement (BAA) with customers that transmit protected health information (ePHI) via Datadog’s Log Management Service.

These features are not available to customers who have signed Datadog's BAA:

* Users cannot request support via chat.
* Group-by dimensions are limited to host tags, source, service, and status for [Log-based Metrics][5].
* Notifications from Log Monitors cannot include log samples.
* You cannot configure Log Monitors with a `group-by` clause.
* You cannot [share][6] logs, security signals, or traces from the explorer through web integrations.
* Security rules cannot include triggering group-by values in notification title.
* Security rules cannot include message template variables.
* Security rules cannot be notified by webhooks.

If you have any questions about how the Log Management Service satisfies the applicable requirements under HIPAA, contact your account manager.

**Note:**

Logs can be viewed through various pages in the Datadog platform. All manifestations of logs in the Datadog platform, including pages such as Traces are part of the log management product.

Previously, HIPAA-enabled customers needed to use specific endpoints to submit logs in order to enforce specific encryptions. This is no longer necessary. The encryptions are enabled on all log submission endpoints.

These legacy endpoints are still supported:

* `tcp-encrypted-intake.logs.datadoghq.com`
* `lambda-tcp-encrypted-intake.logs.datadoghq.com`
* `gcp-encrypted-intake.logs.datadoghq.com`
* `http-encrypted-intake.logs.datadoghq.com`

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/
[2]: /agent/logs/log_transport
[3]: /agent/logs/advanced_log_collection/#filter-logs
[4]: /agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
[5]: /logs/logs_to_metrics/
[6]: /logs/explorer/#share-views
