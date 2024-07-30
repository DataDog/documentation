---
title: Sensitive Data Redaction
disable_toc: false
---

## Overview

Sensitive data, such as credit card numbers, bank routing numbers, and API keys, can be revealed unintentionally in your logs, which can expose your organization to financial and privacy risks. 

Use the Observability Pipelines Worker to identify, tag, and optionally redact or hash sensitive information before routing logs to different destinations and outside of your infrastructure. You can use out-of-the-box scanning rules to detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more. Or, create custom scanning rules using regex patterns to match sensitive information.

{{% observability_pipelines/use_case_images/sensitive_data_redaction %}}

Select a log source to get started:

- [Datadog Agent][1]
- [Fluentd or Fluent Bit][2]
- [HTTP Client][3]
- [Splunk HTTP Event Collector (HEC)][4]
- [Splunk Heavy and Universal Forwarders (TCP)][5]
- [Sumo Logic Hosted Collector][6]
- [Rsyslog or Syslog-ng][7]

[1]: /observability_pipelines/sensitive_data_redaction/datadog_agent
[2]: /observability_pipelines/sensitive_data_redaction/fluent
[3]: /observability_pipelines/sensitive_data_redaction/http_client
[4]: /observability_pipelines/sensitive_data_redaction/splunk_hec
[5]: /observability_pipelines/sensitive_data_redaction/splunk_tcp
[6]: /observability_pipelines/sensitive_data_redaction/sumo_logic_hosted_collector
[7]: /observability_pipelines/sensitive_data_redaction/syslog
