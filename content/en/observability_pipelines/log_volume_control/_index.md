---
title: Log Volume Control
disable_toc: false
---

## Overview

As your infrastructure and applications grow, so does your log volume and the complexity of the data. A large volume of logs can introduce a lot of noise and make it difficult to analyze and troubleshoot logs. Use Observability Pipelines's processors to decide which logs are valuable and which ones are noisy and uninteresting, before sending your logs to their destinations. You can use the following processors in the Observability Pipeline Worker to manage your logs:

- **Filter**: Add a query to send only a subset of logs based on your conditions.
- **Sample**: Define a sampling rate to send only a subset of your logs.
- **Quota**: Enforce daily limits on either the volume of log data or the number of log events.
- **Dedupe**: Drop duplicate copies of your logs, for example, due to retries because of network issues.
- **Remap**: Add, drop, or rename a field in your logs.

Select a log source to get started:

- [Datadog Agent][1]
- [Fluentd or Fluent Bit][2]
- [HTTP Client][3]
- [Splunk HTTP Event Collector (HEC)][4]
- [Splunk Heavy and Universal Forwarders (TCP)][5]
- [Sumo Logic Hosted Collector][6]
- [Rsyslog or Syslog-ng][7]

[1]: /observability_pipelines/log_volume_control/datadog_agent
[2]: /observability_pipelines/log_volume_control/fluent
[3]: /observability_pipelines/log_volume_control/http_client
[4]: /observability_pipelines/log_volume_control/splunk_hec
[5]: /observability_pipelines/log_volume_control/splunk_tcp
[6]: /observability_pipelines/log_volume_control/sumo_logic_hosted_collector
[7]: /observability_pipelines/log_volume_control/syslog
