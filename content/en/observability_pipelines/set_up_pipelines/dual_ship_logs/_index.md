---
title: Dual Ship Logs
disable_toc: false
aliases:
    - /observability_pipelines/dual_ship_logs/
private: true
cascade:
    private: true
---

## Overview

As your infrastructure and your organization scales, so does your log volume, the complexity of your data, and your observability architecture. To optimize how you manage your logs, you might need to experiment with different log management tools and routing workflows. Use Observability Pipelines to send your logs to different destinations, so you can evaluate different tools and workflows with minimal disruption to your production environment.

{{% observability_pipelines/use_case_images/dual_ship_logs %}}

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

[1]: /observability_pipelines/dual_ship_logs/datadog_agent
[2]: /observability_pipelines/dual_ship_logs/fluent
[3]: /observability_pipelines/set_up_pipelines/dual_ship_logs/google_pubsub
[4]: /observability_pipelines/dual_ship_logs/http_client
[5]: /observability_pipelines/set_up_pipelines/dual_ship_logs/http_server
[6]: /observability_pipelines/set_up_pipelines/dual_ship_logs/logstash
[7]: /observability_pipelines/dual_ship_logs/splunk_hec
[8]: /observability_pipelines/dual_ship_logs/splunk_tcp
[9]: /observability_pipelines/dual_ship_logs/sumo_logic_hosted_collector
[10]: /observability_pipelines/dual_ship_logs/syslog
[11]: /observability_pipelines/set_up_pipelines/dual_ship_logs/amazon_s3
[12]: /observability_pipelines/set_up_pipelines/dual_ship_logs/amazon_data_firehose
[13]: /observability_pipelines/set_up_pipelines/dual_ship_logs/kafka
[14]: /observability_pipelines/set_up_pipelines/dual_ship_logs/socket
