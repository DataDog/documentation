---
title: Generate Metrics
disable_toc: false
private: true
cascade:
    private: true
---

## Overview

<div class="alert alert-info">The solutions outlined in this documentation are specific to on-premises logging environments. To generate metrics from cloud-based logs, see the <a href="/observability_pipelines/set_up_pipelines/generate_metrics/">Observability Pipelines</a> documentation.</div>

Some log sources, such as firewalls and network appliances, generate a large volume of log events that contain data that don't necessarily need to be stored. Often, you just want to see a summary of the logs and compare it to historical data. Use the Generate Metrics template to generate a count metric of logs that match a query or a distribution metric of a numeric value contained in the logs, such as a request duration. The template starts you off with the following processors:

- **Filter**: Add a query to send only a subset of logs based on your conditions.
- **Grok Parser**: Parse your logs using grok parsing rules that are available for a set of sources or add custom parsing rules.
- **Generate metrics**: Generate metrics for your logs or a subset of them. See [Metrics types](#metrics-types) for the types of metrics you can generate.

{{% observability_pipelines/use_case_images/generate_metrics %}}

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
- [Socket][14]
- [Splunk HTTP Event Collector (HEC)][7]
- [Splunk Heavy or Universal Forwarders (TCP)][8]
- [Sumo Logic Hosted Collector][9]
- [rsyslog or syslog-ng][10]

[1]: /observability_pipelines/set_up_pipelines/generate_metrics/datadog_agent
[2]: /observability_pipelines/set_up_pipelines/generate_metrics/fluent
[3]: /observability_pipelines/set_up_pipelines/generate_metrics/google_pubsub
[4]: /observability_pipelines/set_up_pipelines/generate_metrics/http_client
[5]: /observability_pipelines/set_up_pipelines/generate_metrics/http_server
[6]: /observability_pipelines/set_up_pipelines/generate_metrics/logstash
[7]: /observability_pipelines/set_up_pipelines/generate_metrics/splunk_hec
[8]: /observability_pipelines/set_up_pipelines/generate_metrics/splunk_tcp
[9]: /observability_pipelines/set_up_pipelines/generate_metrics/sumo_logic_hosted_collector
[10]: /observability_pipelines/set_up_pipelines/generate_metrics/syslog
[11]: /observability_pipelines/set_up_pipelines/generate_metrics/amazon_s3
[12]: /observability_pipelines/set_up_pipelines/generate_metrics/amazon_data_firehose
[13]: /observability_pipelines/set_up_pipelines/generate_metrics/kafka
[14]: /observability_pipelines/set_up_pipelines/generate_metrics/socket

## Metrics types

{{% observability_pipelines/metrics_types %}}
