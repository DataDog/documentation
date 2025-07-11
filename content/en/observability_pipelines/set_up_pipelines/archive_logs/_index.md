---
title: Archive Logs to Datadog Archives
disable_toc: false
aliases:
    - /observability_pipelines/archive_logs/
private: true
cascade:
    private: true
---

## Overview

Use Observability Pipelines to route ingested logs to a cloud storage solution (Amazon S3, Google Cloud Storage, or Azure Storage) in Datadog-rehydratable format. You can then rehydrate the archive in Datadog ad hoc whenever you need to analyze and investigate them. This is useful when:

- You are migrating from another log vendor to Datadog Log Management, and want to ensure you have access to historical logs when you finish migrating.
- You have a high volume of noisy logs, but you may need to index them in Log Management ad hoc.
- You have a retention policy.

{{% observability_pipelines/use_case_images/archive_logs %}}

Select a source to get started:

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
- [rsylsog or syslog-ng][10]

[1]: /observability_pipelines/archive_logs/datadog_agent
[2]: /observability_pipelines/archive_logs/fluent
[3]: /observability_pipelines/set_up_pipelines/archive_logs/google_pubsub
[4]: /observability_pipelines/archive_logs/http_client
[5]: /observability_pipelines/set_up_pipelines/archive_logs/http_server
[6]: /observability_pipelines/set_up_pipelines/archive_logs/logstash
[7]: /observability_pipelines/archive_logs/splunk_hec
[8]: /observability_pipelines/archive_logs/splunk_tcp
[9]: /observability_pipelines/archive_logs/sumo_logic_hosted_collector
[10]: /observability_pipelines/archive_logs/syslog
[11]: /observability_pipelines/set_up_pipelines/archive_logs/amazon_s3
[12]: /observability_pipelines/set_up_pipelines/archive_logs/amazon_data_firehose
[13]: /observability_pipelines/set_up_pipelines/archive_logs/kafka
[14]: /observability_pipelines/set_up_pipelines/archive_logs/socket
