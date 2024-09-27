---
title: Archive Logs to Datadog Archives
disable_toc: false
aliases:
    - /observability_pipelines/archive_logs/
---

## Overview

Use Observability Pipelines to route ingested logs to a cloud storage solution (Amazon S3, Google Cloud Storage, or Azure Storage) in Datadog-rehydratable format. You can then rehydrate the archive in Datadog ad hoc whenever you need to analyze and investigate them. This is useful when:

- You are migrating from another log vendor to Datadog Log Management, and want to ensure you have access to historical logs when you finish migrating.
- You have a high volume of noisy logs, but you may need to index them in Log Management ad hoc.
- You have a retention policy.

{{% observability_pipelines/use_case_images/archive_logs %}}

Select a source to get started:

- [Datadog Agent][1]
- [Fluentd or Fluent Bit][2]
- [HTTP Client][3]
- [Logstash][7]
- [Splunk HTTP Event Collector (HEC)][4]
- [Splunk Heavy and Universal Forwarders (TCP)][5]
- [Sumo Logic Hosted Collector][6]
- [rsylsog or syslog-ng][8]

[1]: /observability_pipelines/archive_logs/datadog_agent
[2]: /observability_pipelines/archive_logs/fluent
[3]: /observability_pipelines/archive_logs/http_client
[4]: /observability_pipelines/archive_logs/splunk_hec
[5]: /observability_pipelines/archive_logs/splunk_tcp
[6]: /observability_pipelines/archive_logs/sumo_logic_hosted_collector
[7]: /observability_pipelines/set_up_pipelines/archive_logs/logstash
[8]: /observability_pipelines/archive_logs/syslog