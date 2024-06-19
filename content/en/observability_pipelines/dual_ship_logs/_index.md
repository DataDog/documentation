---
title: Dual Ship Logs
kind: Documentation
disable_toc: false
aliases:
    -  /observability_pipelines/dual_ship_logs/datadog_agent
---

## Overview

As your infrastructure and your organization scales, so does your log volume, the complexity of your data, and your observability architecture. To optimize how you manage your logs, you might need to experiment with different log management tools and routing workflows. Use Observability Pipelines to send your logs to different destinations, so you can evaluate different tools and workflows with minimal disruption to your production environment.

{{< img src="observability_pipelines/use_cases/dual_ship_logs.png" alt="The log sources, processors, and destinations available for this use case" width="100%" >}}

Select a source to get started:

- [Fluentd or Fluent Bit][1]
- [Splunk HTTP Event Collector (HEC)][2]
- [Splunk Heavy and Universal Forwarders (TCP)][3]
- [Sumo Logic Hosted Collector][4]
- [Rsyslog or Syslog-ng][5]

[1]: /observability_pipelines/dual_ship_logs/fluent
[2]: /observability_pipelines/dual_ship_logs/splunk_hec
[3]: /observability_pipelines/dual_ship_logs/splunk_tcp
[4]: /observability_pipelines/dual_ship_logs/sumo_logic_hosted_collector
[5]: /observability_pipelines/dual_ship_logs/syslog
