---
title: Split Logs
disable_toc: false
---

## Overview

Often, organizations need to send their logs to multiple products for different use cases. For example, you might send your security logs to your SIEM application and your DevOps logs to Datadog. Use Observability Pipelines to send your logs to different destinations based on your use case.

{{% observability_pipelines/use_case_images/split_logs %}}

Select your log source to get started:

- [Datadog Agent][1]
- [Fluentd or Fluent Bit][2]
- [HTTP Client][3]
- [Splunk HTTP Event Collector (HEC)][4]
- [Splunk Heavy and Universal Forwarders (TCP)][5]
- [Sumo Logic Hosted Collector][6]
- [Rsyslog or Syslog-ng][7]

[1]: /observability_pipelines/split_logs/datadog_agent
[2]: /observability_pipelines/split_logs/fluent
[3]: /observability_pipelines/split_logs/http_client
[4]: /observability_pipelines/split_logs/splunk_hec
[5]: /observability_pipelines/split_logs/splunk_tcp
[6]: /observability_pipelines/split_logs/sumo_logic_hosted_collector
[7]: /observability_pipelines/split_logs/syslog
