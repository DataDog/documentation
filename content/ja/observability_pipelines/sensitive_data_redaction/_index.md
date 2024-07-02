---
title: Sensitive Data Redaction
disable_toc: false
---

## 概要

Sensitive data, such as credit card numbers, bank routing numbers, and API keys, can be revealed unintentionally in your logs, which can expose your organization to financial and privacy risks. 

Use the Observability Pipelines Worker to identify, tag, and optionally redact or hash sensitive information before routing logs to different destinations and outside of your infrastructure. You can use out-of-the-box scanning rules to detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more. Or, create custom scanning rules using regex patterns to match sensitive information.

{{< img src="observability_pipelines/use_cases/sensitive_data_redaction.png" alt="The log sources, processors, and destinations available for this use case" width="100%" >}}

Select a log source to get started:

- [Datadog Agent][1]
- [Splunk HTTP Event Collector (HEC)][2]
- [Splunk Heavy and Universal Forwarders (TCP)][3]
- [Sumo Logic Hosted Collector][4]

[1]: /observability_pipelines/sensitive_data_redaction/datadog_agent
[2]: /observability_pipelines/sensitive_data_redaction/splunk_hec
[3]: /observability_pipelines/sensitive_data_redaction/splunk_tcp
[4]: /observability_pipelines/sensitive_data_redaction/sumo_logic_hosted_collector
