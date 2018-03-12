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

By default, the maximum number of log files that can be tailed by the logs agent is 100 logs files and this limit is controllable.

If you would like to increase the number of the tailed log files.

The next config line needs to be added in the `/etc/datadog-agent/datadog.yaml` config file where `XXX` is the number of log files to be tailed by the logs agent.


```
log_open_files_limit: XXX
```


**NB** Increasing the tailed logs files limit will force the agent to consume more and more CPU, to be used with caution.

