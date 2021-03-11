---
title: How to increase the number of log files tailed by the Agent
kind: faq
further_reading:
- link: "/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/"
  tag: "FAQ"
  text: "How to Send Logs to Datadog via External Log Shippers?"
- link: "/logs/processing/parsing/"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/faq/how-to-investigate-a-log-parsing-issue/"
  tag: "FAQ"
  text: "How to investigate a log parsing issue?"
---

By default the Agent can tail up to 100 log files. This limit is set to avoid performances issue when wildcards are set on huge directories.

To increase this limit, set the value of `open_files_limit` in the Agent's configuration file (`/etc/datadog-agent/datadog.yaml`) in the `logs_config` section:

```yaml
logs_config:
  open_files_limit: 100
```

For containerized environments you can set the `DD_LOGS_CONFIG_OPEN_FILES_LIMIT` environment variable.

**Note**: Increasing the tailed logs files limit might increase the resource consumption of the Agent.
