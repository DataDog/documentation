---
title: Archive Logs to Datadog Archives
kind: document
disable_toc: false
---

## Overview

Use Observability Pipelines to route ingested logs to a Amazon S3 bucket in Datadog rehydratable format. You can then rehydrate the archive in Datadog ad hoc whenever you need to analyze and investigate them. This is useful when:

- You are migrating from another log vendor to Datadog Log Management, and want to ensure you have access to historical logs when you finish migrating.
- You have a high volume of noisy logs, but you may need to index them in Log Management ad hoc.
- You have a retention policy.

{{< img src="observability_pipelines/use_cases/archive_logs.png" alt="The log sources, processors, and destinations available for this use case" width="100%" >}}

Select a source to get started:

- [Datadog Agent][1]
- [Fluentd or Fluent Bit][2]
- [HTTP Client][3]
- [Splunk HTTP Event Collector (HEC)][4]
- [Splunk Heavy and Universal Forwarders (TCP)][5]
- [Sumo Logic Hosted Collector][6]

[1]: /observability_pipelines/archive_logs/datadog_agent
[2]: /observability_pipelines/archive_logs/fluent
[3]: /observability_pipelines/archive_logs/http_client
[4]: /observability_pipelines/archive_logs/splunk_hec
[5]: /observability_pipelines/archive_logs/splunk_tcp
[6]: /observability_pipelines/archive_logs/sumo_logic_hosted_collector
