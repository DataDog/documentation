---
title: Increase the Number of Log Files Tailed by the Agent

aliases:
  - /logs/faq/how-to-increase-the-number-of-log-files-tailed-by-the-agent
further_reading:
- link: "/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/"
  tag: "FAQ"
  text: "How to Send Logs to Datadog via External Log Shippers?"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/faq/how-to-investigate-a-log-parsing-issue/"
  tag: "FAQ"
  text: "How to investigate a log parsing issue?"
---

The `logs_config.open_files_limit` parameter in the Agent's configuration file (`/etc/datadog-agent/datadog.yaml`) determines the maximum number of log files the Agent can tail simultaneously. This limit is set to prevent performance issues when wildcards are set on huge directories. You can increase the limit by adjusting this parameter.

```yaml
logs_config:
  open_files_limit: 500
```

For containerized environments you can set the `DD_LOGS_CONFIG_OPEN_FILES_LIMIT` environment variable.

The default value varies depending on the Agent version and operating system. To check the default value for your Agent version, see the [config_template.yaml file][1] in the Datadog Agent repository. Be sure to select the tag corresponding to your Agent version to see the correct defaults.

**Note**: Increasing the tailed logs files limit might increase the resource consumption of the Agent.

[1]: https://github.com/DataDog/datadog-agent/blob/369a8dbb39dc6e8601d82c8f43caaaf88d6a0a55/pkg/config/config_template.yaml#L987-L993

