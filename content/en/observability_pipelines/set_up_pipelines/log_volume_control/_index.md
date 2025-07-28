---
title: Log Volume Control
disable_toc: false
aliases:
    - /observability_pipelines/log_volume_control/
further_reading:
- link: "/observability_pipelines/guide/strategies_for_reducing_log_volume/"
  tag: "documentation"
  text: "Strategies for Reducing Log Volume"
private: true
cascade:
    private: true
---

## Overview

As your infrastructure and applications grow, so does your log volume and the complexity of the data. A large volume of logs can introduce a lot of noise and make it difficult to analyze and troubleshoot logs. Use Observability Pipelines' processors to decide which logs are valuable and which ones are noisy and uninteresting, before sending your logs to their destinations. You can use the following processors in the Observability Pipeline Worker to manage your logs:

- **Filter**: Add a query to send only a subset of logs based on your conditions.
- **Sample**: Define a sampling rate to send only a subset of your logs.
- **Quota**: Enforce daily limits on either the volume of log data or the number of log events.
- **Dedupe**: Drop duplicate copies of your logs, for example, due to retries because of network issues.
- **Remap**: Add, drop, or rename a field in your logs.

{{% observability_pipelines/use_case_images/log_volume_control %}}

Select a log source to get started:

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/log_volume_control/datadog_agent
[2]: /observability_pipelines/log_volume_control/fluent
[3]: /observability_pipelines/set_up_pipelines/log_volume_control/google_pubsub
[4]: /observability_pipelines/log_volume_control/http_client
[5]: /observability_pipelines/set_up_pipelines/log_volume_control/http_server
[6]: /observability_pipelines/set_up_pipelines/log_volume_control/logstash
[7]: /observability_pipelines/log_volume_control/splunk_hec
[8]: /observability_pipelines/log_volume_control/splunk_tcp
[9]: /observability_pipelines/log_volume_control/sumo_logic_hosted_collector
[10]: /observability_pipelines/log_volume_control/syslog
[11]: /observability_pipelines/set_up_pipelines/log_volume_control/amazon_s3
[12]: /observability_pipelines/set_up_pipelines/log_volume_control/amazon_data_firehose
[13]: /observability_pipelines/set_up_pipelines/log_volume_control/kafka
[14]: /observability_pipelines/set_up_pipelines/log_volume_control/socket
