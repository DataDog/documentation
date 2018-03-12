---
title: Tailing more than 100 logs files
kind: faq
further_reading:
- link: "/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers"
  tag: "FAQ"
  text: How to Send Logs to Datadog via External Log Shippers?
- link: "/logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
- link: "/logs/faq/how-to-investigate-a-log-parsing-issue"
  tag: "FAQ"
  text: How to investigate a log parsing issue?
---

By default the Agent can tail up to 100 logs files. To increase the amount of tailed log files by your Agent, edit `log_open_files_limit` in your `/etc/datadog-agent/datadog.yaml` configuration file, by replacing `XXX` with the new amount of log files tailed:

```
log_open_files_limit: XXX
```

**Note**: Increasing the tailed logs files limit increase the agent CPU usage.

