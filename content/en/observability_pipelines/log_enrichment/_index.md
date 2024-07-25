---
title: Log Enrichment
disable_toc: false
---

## Overview

 As your organization grows, the logs from your services, systems, and applications grow in volume and complexity. Each log source also has it's own unique format. To manage these logs, you might need to standardize their format and add additional information to make it easier to search and analyze them. Use the Log Enrichment Template to enrich and transform your logs with Observability Pipelines's processors before sending them to its destination.

These processors are available to enrich and transform your logs:

- **Enrichment Table**: Enrich your logs with information from a reference table, which could be a local file or a GeoIP database.
- **Grok Parser**: Parse your logs using grok parsing rules that are available for a set of sources.
- **Add hostname**: Add the name of the host that sent the log so you can use it to pinpoint the root cause if there is an issue.
- **Parse JSON**: Convert fields into JSON objects.

{{% observability_pipelines/use_case_images/log_enrichment %}}

Select a source to get started:

- [Datadog Agent][1]
- [Fluentd or Fluent Bit][2]
- [HTTP Client][3]
- [Splunk HTTP Event Collector (HEC)][4]
- [Splunk Heavy and Universal Forwarders (TCP)][5]
- [Sumo Logic Hosted Collector][6]
- [Rsyslog or Syslog-ng][7]

[1]: /observability_pipelines/log_enrichment/datadog_agent
[2]: /observability_pipelines/log_enrichment/fluent
[3]: /observability_pipelines/log_enrichment/http_client
[4]: /observability_pipelines/log_enrichment/splunk_hec
[5]: /observability_pipelines/log_enrichment/splunk_tcp
[6]: /observability_pipelines/log_enrichment/sumo_logic_hosted_collector
[7]: /observability_pipelines/log_enrichment/syslog