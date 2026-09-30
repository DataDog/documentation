---
title: Log Management Data Security
aliases:
    - /logs/security/
further_reading:
- link: "/data_security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
- link: "/data_security/pci_compliance/"
  tag: "Documentation"
  text: "PCI DSS Compliance"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security/" target="_blank">Security</a> section.</div>

The Log Management product supports multiple [environments and formats][1], allowing you to submit to Datadog nearly any data you choose. This article describes the main security guarantees and filtering controls available to you when submitting logs to Datadog.

**Notes**:
- Logs can be viewed in various Datadog products. All logs viewed in the Datadog UI, including logs viewed in APM trace pages, are part of the Log Management product.
- Datadog's tools and policies comply with PCI v4.0. For more information, see [PCI DSS Compliance][10].

## Information security

Datadog uses symmetric encryption at rest (AES-256) for indexed logs. Indexed logs are deleted from the Datadog platform once their retention period, as defined by you, expires.

## Logs filtering

In version 6 or above, the Agent can be configured to filter logs sent by the Agent to the Datadog application. To prevent the submission of specific logs, use the `log_processing_rules` [setting][3], with the **exclude_at_match** or **include_at_match** `type`. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to filter out logs based on the inclusion or exclusion rules supplied.

## Logs obfuscation

As of version 6, the Agent can be configured to obfuscate specific patterns within logs sent by the Agent to the Datadog application. To mask sensitive sequences within your logs, use the `log_processing_rules` [setting][4], with the  **mask_sequences** `type`. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to redact sensitive data within your logs.

Alteratively, use [Sensitive Data Scanner][7] in the cloud or with the Agent to identify, tag, and redact sensitive data. In Sensitive Data Scanner, you set up a scanning group to define what data to scan and then set up scanning rules to determine what sensitive information to match within the data. You can choose whether to redact the data if there is a match. Datadog provides a library of predefined rules to detect sensitive information such as credit card numbers, email addresses, IP addresses, API keys, and more. You can also define your own regex-based scanning rules to identify sensitive information.

Sensitive Data Scanner is also available as a [processor][8] in [Observability Pipelines][9]. With Observability Pipelines, you can collect and process logs within your own infrastructure and then route them to downstream integrations.

## HIPAA-enabled customers

{{% hipaa-customers %}}

## Endpoint encryption

All log submission endpoints are encrypted. These legacy endpoints are still supported:

* `gcp-encrypted-intake.logs.datadoghq.com`
* `http-encrypted-intake.logs.datadoghq.com`

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/
[2]: /agent/logs/log_transport
[3]: /agent/logs/advanced_log_collection/#filter-logs
[4]: /agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
[5]: /logs/explorer/#share-views
[6]: https://www.datadoghq.com/legal/hipaa-eligible-services/
[7]: /security/sensitive_data_scanner/
[8]: /observability_pipelines/processors/sensitive_data_scanner
[9]: /observability_pipelines/
[10]: /data_security/pci_compliance/