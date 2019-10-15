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

The Log Management product supports multiple [environments and formats][2], allowing customers the flexibility to submit to Datadog nearly any data they choose. This article describes the main security guarantees and filtering controls available to users when submitting logs to Datadog.

## Information Security

The Datadog Agent submits logs to Datadog over a TLS-encrypted TCP connection, requiring an outbound communication over port `10516`. Datadog uses symmetric encryption at rest (AES-256) for indexed logs. Indexed logs are deleted from the Datadog platform once their retention period, as defined by the customer, expires.

## Logs Filtering

For customers using release 6, the Agent can be configured to filter logs sent by the Agent to the Datadog application. To prevent the submission of specific logs, use the `log_processing_rules` [setting][3], with the **exclude_at_match** or **include_at_match** `type`. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to filter out logs based on a whitelist or blacklist.

## Logs Obfuscation

For customers using release 6, the Agent can be configured to obfuscate specific patterns within logs sent by the Agent to the Datadog application. To mask sensitive sequences within your logs, use the `log_processing_rules` [setting][4], with the  **mask_sequences** `type`. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to redact sensitive data within your logs.

## Configuration Requirements for HIPAA-enabled Customers

Datadog will sign a Business Associate Agreement (BAA) with customers that transmit protected health information (ePHI) via Datadog’s Log Management Service.

Prior to executing a BAA, customers transmitting ePHI to the Datadog Log Management Service must implement the following configurations:

* The Datadog Agent must be configured to submit logs to `tcp-encrypted-intake.logs.datadoghq.com`
* The Datadog [log collection AWS Lambda function][5] must be configured to submit logs to `lambda-tcp-encrypted-intake.logs.datadoghq.com` by setting the `DD_URL` environment variable as well as setting `DD_USE_TCP` to `true`.
* Other log sources besides the Datadog Agent must be configured to submit logs to `http-encrypted-intake.logs.datadoghq.com`

The following sample configuration can be used with the Datadog Agent to submit logs to a HIPAA-ready endpoint directly (i.e. without a proxy):

```
logs_enabled: true
logs_config:
  logs_dd_url: tcp-encrypted-intake.logs.datadoghq.com:10516
  logs_no_ssl: false
```

With the Docker Agent, pass in ```DD_LOGS_CONFIG_LOGS_DD_URL=tcp-encrypted-intake.logs.datadoghq.com:10516``` as an environment variable.

Additionally, certain features are not available at the moment to customers who have signed Datadog's BAA, notably:

* Users cannot request support via chat
* The logs Live Tail, Rehydrate from Archives, and Generate Metrics features are disabled
* Notifications from Log Monitors cannot include log samples
* Log Monitors cannot be configured with a `group-by` clause
* You cannot [share][6] logs (nor traces) from the explorer through web integrations

If you have any questions about how the Log Management Service satisfies the applicable requirements under HIPAA, please contact your account manager.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security
[2]: /logs/log_collection
[3]: /agent/logs/advanced_log_collection/?tab=exclude_at_match#filter-logs
[4]: /agent/logs/advanced_log_collection/#scrub-sensitive-data-from-your-logs
[5]: /integrations/amazon_lambda/#log-collection
[6]: /logs/explorer/#share-view
