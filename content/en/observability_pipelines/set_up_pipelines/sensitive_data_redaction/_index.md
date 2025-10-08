---
title: Sensitive Data Redaction
disable_toc: false
aliases:
    - /observability_pipelines/sensitive_data_redaction/
private: true
cascade:
    private: true
---

## Overview

Sensitive data, such as credit card numbers, bank routing numbers, and API keys, can be revealed unintentionally in your logs, which can expose your organization to financial and privacy risks. 

Use the Observability Pipelines Worker to identify, tag, and optionally redact or hash sensitive information before routing logs to different destinations and outside of your infrastructure. You can use out-of-the-box scanning rules to detect common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more. Or, create custom scanning rules using regex patterns to match sensitive information.

{{% observability_pipelines/use_case_images/sensitive_data_redaction %}}

Select a log source to get started:

- [Amazon Data Firehose][12]
- [Amazon S3][11]
- [Datadog Agent][1]
- [Fluentd or Fluent Bit][2]
- [Google Pub/Sub][3]
- [HTTP Client][4]
- [HTTP Server][5]
- [Kafka][13]
- [Logstash][6]
- [Splunk HTTP Event Collector (HEC)][7]
- [Splunk Heavy or Universal Forwarders (TCP)][8]
- [Socket (TCP or UDP)][14]
- [Sumo Logic Hosted Collector][9]
- [rsyslog or syslog-ng][10]

[1]: /observability_pipelines/sensitive_data_redaction/datadog_agent
[2]: /observability_pipelines/sensitive_data_redaction/fluent
[3]: /observability_pipelines/set_up_pipelines/sensitive_data_redaction/google_pubsub
[4]: /observability_pipelines/sensitive_data_redaction/http_client
[5]: /observability_pipelines/set_up_pipelines/sensitive_data_redaction/http_server
[6]: /observability_pipelines/set_up_pipelines/sensitive_data_redaction/logstash
[7]: /observability_pipelines/sensitive_data_redaction/splunk_hec
[8]: /observability_pipelines/sensitive_data_redaction/splunk_tcp
[9]: /observability_pipelines/sensitive_data_redaction/sumo_logic_hosted_collector
[10]: /observability_pipelines/sensitive_data_redaction/syslog
[11]: /observability_pipelines/set_up_pipelines/sensitive_data_redaction/amazon_s3
[12]: /observability_pipelines/set_up_pipelines/sensitive_data_redaction/amazon_data_firehose
[13]: /observability_pipelines/set_up_pipelines/sensitive_data_redaction/kafka
[14]: /observability_pipelines/set_up_pipelines/sensitive_data_redaction/socket
