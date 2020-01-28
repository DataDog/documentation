---
title: I have a custom log file with heightened read-permissions; how do I send it to Datadog?
kind: faq
further_reading:
- link: "logs/log_collection"
  tag: "Documentation"
  text: "Learn how to collect your logs"
- link: "/logs/log_collection"
  tag: "Documentation"
  text: "How to Send Logs to Datadog via External Log Shippers?"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

Often, log files, especially system logs such as *syslog* or *journald*, have heightened read-permissions blocking Datadog Agent log collection as it does not have *sudo* or *admin* access.

There are three potential solutions to get around this:

* (Not Recommended) Give the Agent root access so it can tail those files. Datadog strongly recommends against going this route.
* Change the file permission to let the Agent access it.
* Configure an open source log shipper (such as Rsyslog, NXLog, ...) that has root access to send those logs either directly to your Datadog platform or locally to a running Datadog Agent. All configuration are explained in the [How to Send Logs to Datadog via External Log Shippers?][1] article.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
