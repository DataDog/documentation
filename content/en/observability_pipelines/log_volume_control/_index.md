---
title: Log Volume Control
kind: document
disable_toc: false
---

## Overview

As your infrastructure and applications grow, so does your log volume and the complexity of the data. A large volume of logs can introduce a lot of noise and make it difficult to analyze and troubleshoot logs. Use Observability Pipelines's processors to decide which logs are valuable and which ones are noisy and uninteresting, before sending your logs to their destinations. You can use the following processors in the Observability Pipeline Worker to manage your logs:

- **Filter**: Add a query to send only a subset of logs based on your conditions.
- **Sample**: Define a sampling rate to send only a subset of your logs.
- **Quota**: Enforce daily limits on either the volume of log data or the number of log events.
- **Dedupe**: Drop duplicate copies of your logs, for example, due to retries because of network issues.
- **Remap**: Add, drop, or rename a field in your logs.

{{< img src="observability_pipelines/use_cases/log_volume_control.png" alt="The log sources, processors, and destinations available for the split logs use case" width="100%" >}}

Select a log source to get started:

- [Splunk HTTP Event Collector (HEC)][1]
- [Splunk Heavy and Universal Forwarders (TCP)][2]
- [Sumo Logic Hosted Collector][3]

[1]: /observability_pipelines/log_volume_control/splunk_hec
[2]: /observability_pipelines/log_volume_control/splunk_tcp
[3]: /observability_pipelines/log_volume_control/sumo_logic_hosted_collector