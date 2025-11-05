---
title: Log Enrichment
disable_toc: false
aliases:
    - /observability_pipelines/log_enrichment/
private: true
cascade:
    private: true
---

## Overview

 As your organization grows, the logs from your services, systems, and applications grow in volume and complexity. To manage these logs, you might need to standardize their format and add information to make it easier to search and analyze them. For example, each log source has its own unique format. This can make it difficult to search and analyze during investigations if they have not been reformatted and standardized. You could also have additional information, such as customer IDs or IP addresses, that you want to add to your logs. Use the Log Enrichment Template and these Observability Pipelines processors to enrich and transform your logs:

- **Enrichment Table**: Enrich your logs with information from a reference table, which could be a local file or a GeoIP database.
- **Grok Parser**: Parse your logs using grok parsing rules that are available for a set of sources.
- **Add hostname**: Add the name of the host that sent the log so you can use it to find the root cause of an issue.
- **Parse JSON**: Convert fields into JSON objects.

{{% observability_pipelines/use_case_images/log_enrichment %}}

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
- [rsyslog or syslog-ng][10]

[1]: /observability_pipelines/log_enrichment/datadog_agent
[2]: /observability_pipelines/log_enrichment/fluent
[3]: /observability_pipelines/set_up_pipelines/log_enrichment/google_pubsub
[4]: /observability_pipelines/log_enrichment/http_client
[5]: /observability_pipelines/set_up_pipelines/log_enrichment/http_server
[6]: /observability_pipelines/set_up_pipelines/log_enrichment/logstash
[7]: /observability_pipelines/log_enrichment/splunk_hec
[8]: /observability_pipelines/log_enrichment/splunk_tcp
[9]: /observability_pipelines/log_enrichment/sumo_logic_hosted_collector
[10]: /observability_pipelines/log_enrichment/syslog
[11]: /observability_pipelines/set_up_pipelines/log_enrichment/amazon_s3
[12]: /observability_pipelines/set_up_pipelines/log_enrichment/amazon_data_firehose
[13]: /observability_pipelines/set_up_pipelines/log_enrichment/kafka
[14]: /observability_pipelines/set_up_pipelines/log_enrichment/socket
