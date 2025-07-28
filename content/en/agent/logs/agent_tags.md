---
title: Log Agent tags
further_reading:
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Tagging Best Practices"
- link: "/agent/configuration/agent-configuration-files/"
  tag: "Documentation"
  text: "Agent Configuration Files"
- link: "/agent/docker/tag/"
  tag: "Documentation"
  text: "Container Tagging"
---

## Overview

The Datadog Agent automatically adds certain tags to all logs it collects before sending them to Datadog. These tags are added **pre-ingestion**, and are included in the payload that gets delivered to Datadog.

## Pre-ingestion processing

Since these tags are added pre-ingestion, they:

* Are included in all log data delivered to Datadog
* Increase the overall size of your log data
* Are available for filtering, searching, and aggregation in the Log Explorer
* Can be used in log-based metrics and queries

## Agent tags automatically added to logs

The following tags are automatically added to logs by the Datadog Agent:

| Tag | Description | Conditions |
|-----|-------------|-------------|
| `source` | The source of the log (file path, integration name, etc.) | Always when available |
| `service` | The service name if configured in the log collection | Always when available |
| `env` | The environment tag if configured globally | Always when available |
| `version` | The Agent version | Always when available |
| `filename` | Base name of the tailed file | File-based sources only |
| `dirname` | Directory containing the tailed file | File-based sources only |
| `source_host` | IP address of the socket source host | Socket sources (TCP/UDP) only |
| `event_type` | Type of the Windows event | Windows events only |
| `event_source` | Source of the Windows event | Windows events only |
| `event_id` | Windows Event ID | Windows events only, if `tag_event_id: true` |
| `sid` | Windows Security identifier | Windows events only, if `tag_sid: true` |
| `truncated` | Source of truncation | If `logs_config.tag_truncated_logs: true` |
| `multiline` | Source of multi-line aggregation | If `logs_config.tag_multi_line_logs: true` |
| `aggregated_json` | Indicates that the log was aggregated from multiple JSON log entries | If `logs_config.auto_multi_line.tag_aggregated_json: true` |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

