---
title: Split Logs
disable_toc: false
---

## Overview

Often, organizations need to send their logs to multiple products for different use cases. For example, you might send your security logs to your SIEM application and your DevOps logs to Datadog. Use Observability Pipelines to send your logs to different destinations based on your use case.

{{< img src="observability_pipelines/use_cases/split_logs.png" alt="The log sources, processors, and destinations available for the split logs use case" width="100%" >}}

Select your log source to get started:

- [Datadog Agent][1]
- [HTTP Client][2]
- [Fluentd or Fluent Bit][3]
- [Splunk HTTP Event Collector (HEC)][4]
- [Splunk Heavy and Universal Forwarders (TCP)][5]
- [Sumo Logic Hosted Collector][6]
- [Rsyslog or Syslog-ng][7]

[1]: /observability_pipelines/split_logs/datadog_agent
[2]: /observability_pipelines/split_logs/http_client
[3]: /observability_pipelines/split_logs/fluent
[4]: /observability_pipelines/split_logs/splunk_hec
[5]: /observability_pipelines/split_logs/splunk_tcp
[6]: /observability_pipelines/split_logs/sumo_logic_hosted_collector
[7]: /observability_pipelines/split_logs/syslog