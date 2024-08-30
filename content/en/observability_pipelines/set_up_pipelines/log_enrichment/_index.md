---
title: Log Enrichment
disable_toc: false
aliases:
    - /observability_pipelines/log_enrichment/
---

## Overview

 As your organization grows, the logs from your services, systems, and applications grow in volume and complexity. To manage these logs, you might need to standardize their format and add information to make it easier to search and analyze them. For example, each log source has its own unique format. This can make it difficult to search and analyze during investigations if they have not been reformatted and standardized. You could also have additional information, such as customer IDs or IP addresses, that you want to add to your logs. Use the Log Enrichment Template and these Observability Pipelines processors to enrich and transform your logs:

- **Enrichment Table**: Enrich your logs with information from a reference table, which could be a local file or a GeoIP database.
- **Grok Parser**: Parse your logs using grok parsing rules that are available for a set of sources.
- **Add hostname**: Add the name of the host that sent the log so you can use it to find the root cause of an issue.
- **Parse JSON**: Convert fields into JSON objects.

{{% observability_pipelines/use_case_images/log_enrichment %}}

Select a source to get started:

- [Datadog Agent][1]
- [Fluentd or Fluent Bit][2]
- [HTTP Client][3]
- [Splunk HTTP Event Collector (HEC)][4]
- [Splunk Heavy and Universal Forwarders (TCP)][5]
- [Sumo Logic Hosted Collector][6]
- [rsyslog or syslog-ng][7]

[1]: /observability_pipelines/log_enrichment/datadog_agent
[2]: /observability_pipelines/log_enrichment/fluent
[3]: /observability_pipelines/log_enrichment/http_client
[4]: /observability_pipelines/log_enrichment/splunk_hec
[5]: /observability_pipelines/log_enrichment/splunk_tcp
[6]: /observability_pipelines/log_enrichment/sumo_logic_hosted_collector
[7]: /observability_pipelines/log_enrichment/syslog