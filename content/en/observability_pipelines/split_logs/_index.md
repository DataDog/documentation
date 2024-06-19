---
title: Split Logs
kind: document
disable_toc: false
---

## Overview

Often, organizations need to send their logs to multiple products for different use cases. For example, you might send your security logs to your SIEM application and your DevOps logs to Datadog. Use Observability Pipelines to send your logs to different destinations based on your use case.

{{< img src="observability_pipelines/use_cases/split_logs.png" alt="The log sources, processors, and destinations available for the split logs use case" width="100%" >}}

Select your log source to get started:

- [Datadog Agent][1]
- [Fluentd or Fluent Bit][2]
- [Splunk HTTP Event Collector (HEC)][3]
- [Splunk Heavy and Universal Forwarders (TCP)][4]
- [Sumo Logic Hosted Collector][5]
- [Rsyslog or Syslog-ng][6]

[1]: /observability_pipelines/split_logs/datadog_agent
[2]: /observability_pipelines/split_logs/fluent
[3]: /observability_pipelines/split_logs/splunk_hec
[4]: /observability_pipelines/split_logs/splunk_tcp
[5]: /observability_pipelines/split_logs/sumo_logic_hosted_collector
[6]: /observability_pipelines/split_logs/syslog
