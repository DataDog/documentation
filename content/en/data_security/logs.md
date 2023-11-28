---
title: Log Management Data Security
kind: documentation
aliases:
    - /logs/security/
further_reading:
- link: "/data_security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
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

## HIPAA-enabled customers

Datadog will sign a Business Associate Agreement (BAA) with customers that transmit protected health information (ePHI) via Datadog's Log Management Service.

These features are not available to customers who have signed Datadog's BAA:

* Users cannot request support through chat.
* You cannot [share][5] logs, security signals, or traces from the explorer through web integrations.
* Security rules cannot include triggering group-by values in notification title.
* Security rules cannot include message template variables.
* Security rules cannot be notified by webhooks.

If you have any questions about how the Log Management Service satisfies the applicable requirements under HIPAA, contact your account manager. HIPAA-enabled customers do not need to use specific endpoints to submit logs to enforce specific encryptions. The encryptions are enabled on all log submission endpoints.

## PCI DSS compliance for Log Management

{{< site-region region="us" >}}

<div class="alert alert-warning">
PCI DSS compliance for Log Management is only available for Datadog organizations in the <a href="/getting_started/site/">US1 site</a>.
</div>

Datadog allows customers to send logs to PCI DSS compliant Datadog organizations upon request. To set up a PCI-compliant Datadog org, follow these steps:

1. Contact [Datadog support][2] or your [Customer Success Manager][3] to request that the org be configured as a PCI-compliant org.
2. After Datadog support or Customer Success confirms that the org is PCI DSS compliant, configure the Agent configuration file to send logs to the dedicated PCI-compliant endpoint (`agent-http-intake-pci.logs.datadoghq.com`):
    ```
    logs_config:
      logs_dd_url: <http://agent-http-intake-pci.logs.datadoghq.com:443|agent-http-intake-pci.logs.datadoghq.com:443>
    ```
    **Note**: The port must be included in the configuration. PCI compliance uses HTTP log forwarding only. If you are using the Agent, you should [enforce HTTP transport][5].

If you have any questions about how the Log Management service satisfies the applicable requirements under PCI DSS, contact your account manager.

To enable PCI compliance for APM, see [PCI DSS compliance for APM][6].

[1]: /getting_started/site/
[2]: /help/
[3]: mailto:success@datadoghq.com
[4]: /account_management/audit_trail/#setup
[5]: /agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[6]: /tracing/configure_data_security/#pci-dss-compliance-for-compliance-for-apm

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
