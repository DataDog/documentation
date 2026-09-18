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

## Filter tags before ingestion

Depending on how you use your logs, some Agent-added tags might not be needed for search, analysis, routing, or correlation. You can use global tag filters to remove selected tags from every log source the Agent processes before logs are sent to Datadog. This can help reduce the size of log payloads. Before filtering a tag, review whether it supports pipelines, indexes, archives, monitors, dashboards, or other workflows.

{{< tabs >}}
{{% tab "Configuration file" %}}

Add `logs_config.tag_filters` to `datadog.yaml`:

```yaml
logs_config:
  tag_filters:
    exclude:
      - "filename:*"
      - "dirname:*"
    include:
      - "filename:audit.log"
```

{{% /tab %}}
{{% tab "Docker" %}}

Pass `DD_LOGS_CONFIG_TAG_FILTERS` to the Agent container. For example, add the following option to your `docker run` command:

```shell
--env DD_LOGS_CONFIG_TAG_FILTERS='{"exclude":["filename:*","dirname:*"],"include":["filename:audit.log"]}'
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Set `DD_LOGS_CONFIG_TAG_FILTERS` on the node Agent container:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAG_FILTERS
          value: '{"exclude":["filename:*","dirname:*"],"include":["filename:audit.log"]}'
```

{{% /tab %}}
{{% tab "Helm" %}}

Set `DD_LOGS_CONFIG_TAG_FILTERS` in the Helm chart values:

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAG_FILTERS
      value: '{"exclude":["filename:*","dirname:*"],"include":["filename:audit.log"]}'
```

{{% /tab %}}
{{< /tabs >}}

This example removes all `filename` and `dirname` tags except the `filename:audit.log` tag. Patterns use `key:value` syntax. Keys must match exactly, values can contain `*` wildcards, and matching is not case-sensitive. An `include` pattern preserves tags that match an `exclude` pattern; it does not remove other tags.

**Note**: The Agent sends `source`, `service`, and `host` separately from the tag list. Filtering these tags does not remove their values from the log.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
