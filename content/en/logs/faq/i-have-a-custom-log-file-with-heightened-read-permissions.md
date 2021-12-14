---
title: I have a custom log file with heightened read-permissions; how do I send it to Datadog?
kind: faq
further_reading:
- link: "/logs/log_collection/"
  tag: "Documentation"
  text: "Learn how to collect your logs"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

Often, log files, especially system logs such as *syslog* or *journald*, have heightened read-permissions blocking Datadog Agent log collection as it does not have *sudo* or *admin* access.

There are three potential solutions to get around this:

* (Not Recommended) Give the Agent root access so it can tail those files. Datadog strongly recommends against going this route.
* Change the file permission to let the Agent access it.
* Configure an open source log shipper (such as Rsyslog, NXLog, ...) that has root access to send those logs either directly to your Datadog platform or locally to a running Datadog Agent. For instructions, read the dedicated documentation for [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4], or [Logstash][5].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/rsyslog/
[2]: /integrations/syslog_ng/
[3]: /integrations/nxlog/
[4]: /integrations/fluentd/#log-collection
[5]: /integrations/logstash/#log-collection
