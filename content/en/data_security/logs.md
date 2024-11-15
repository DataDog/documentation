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
  text: "Set up a PCI-compliant Datadog organization"
- link: "https://www.datadoghq.com/blog/datadog-pci-compliance-log-management-apm/"
  tag: "Blog"
  text: "Announcing PCI-Compliant Log Management and APM from Datadog"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security/" target="_blank">Security</a> section.</div>

The Log Management product supports multiple [environments and formats][1], allowing you to submit to Datadog nearly any data you choose. This article describes the main security guarantees and filtering controls available to you when submitting logs to Datadog.

**Note**: Logs can be viewed in various Datadog products. All logs viewed in the Datadog UI, including logs viewed in APM trace pages, are part of the Log Management product.

## Information security

The Datadog Agent submits logs to Datadog either through HTTPS or through TLS-encrypted TCP connection on port 10516, requiring outbound communication (see [Agent Transport for logs][2]).

Datadog uses symmetric encryption at rest (AES-256) for indexed logs. Indexed logs are deleted from the Datadog platform once their retention period, as defined by you, expires.

## Logs filtering

In version 6 or above, the Agent can be configured to filter logs sent by the Agent to the Datadog application. To prevent the submission of specific logs, use the `log_processing_rules` [setting][3], with the **exclude_at_match** or **include_at_match** `type`. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to filter out logs based on the inclusion or exclusion rules supplied.

## Logs obfuscation

As of version 6, the Agent can be configured to obfuscate specific patterns within logs sent by the Agent to the Datadog application. To mask sensitive sequences within your logs, use the `log_processing_rules` [setting][4], with the  **mask_sequences** `type`. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to redact sensitive data within your logs.

Alteratively, use [Sensitive Data Scanner][7] in the cloud or with the Agent to identify, tag, and redact sensitive data. In Sensitive Data Scanner, you set up a scanning group to define what data to scan and then set up scanning rules to determine what sensitive information to match within the data. You can choose whether to redact the data if there is a match. Datadog provides a library of predefined rules to detect sensitive information such as credit card numbers, email addresses, IP addresses, API keys, and more. You can also define your own regex-based scanning rules to identify sensitive information.

Sensitive Data Scanner is also available as a [processor][8] in [Observability Pipelines][9]. With Observability Pipelines, you can collect and process logs within your own infrastructure and then route them to downstream integrations.

## HIPAA-enabled customers

{{% hipaa-customers %}}

## PCI DSS compliance for Log Management

{{< site-region region="us" >}}

<div class="alert alert-warning">
PCI DSS compliance for Log Management is only available for Datadog organizations in the <a href="/getting_started/site/">US1 site</a>.
</div>

Datadog allows customers to send logs to PCI DSS compliant Datadog organizations upon request. To set up a PCI-compliant Datadog org, follow these steps:

{{% pci-logs %}}

See [PCI DSS Compliance][1] for more information. To enable PCI compliance for APM, see [PCI DSS compliance for APM][1].

[1]: /data_security/pci_compliance/
[2]: /data_security/pci_compliance/?tab=apm

{{< /site-region >}}

{{< site-region region="us3,us5,eu,gov,ap1" >}}

PCI DSS compliance for Log Management is not available for the {{< region-param key="dd_site_name" >}} site.

{{< /site-region >}}

## Endpoint encryption

All log submission endpoints are encrypted. These legacy endpoints are still supported:

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
[5]: /logs/explorer/#share-views
[6]: https://www.datadoghq.com/legal/hipaa-eligible-services/
[7]: /sensitive_data_scanner/
[8]: /observability_pipelines/processors/sensitive_data_scanner
[9]: /observability_pipelines/