---
title: Send Logs from a Custom Log File with Heightened Read Permissions

aliases:
  - /logs/faq/i-have-a-custom-log-file-with-heightened-read-permissions
further_reading:
- link: "/logs/log_collection/"
  tag: "Documentation"
  text: "Learn how to collect your logs"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/glossary/#tail"
  tag: Glossary
  text: 'Glossary entry for "tail"'  
---

Often, log files, especially system logs such as *syslog* or *journald*, have heightened read-permissions blocking the Datadog Agent log collection as it does not have *sudo* or *admin* access.

There are three potential solutions to get around this:

* (Not Recommended) Give the Agent root access so it can tail those files. Datadog strongly recommends against going this route.
* Change the file permission to let the Agent access it. The Agent needs execute and read permissions on the directories and also read permission on the file. Run the following commands to provide those permissions (for any user, not just the Agent):
  * chmod 755 `<folder name>`
  * chmod 644 `<file name>`
* Configure an open source log shipper (such as Rsyslog, NXLog, ...) that has root access to send those logs either directly to your Datadog platform or locally to a running Datadog Agent. For instructions, read the dedicated documentation for [Rsyslog][1], [Syslog-ng][2], [NXlog][3], [FluentD][4], or [Logstash][5].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/rsyslog/
[2]: /integrations/syslog_ng/
[3]: /integrations/nxlog/
[4]: /integrations/fluentd/#log-collection
[5]: /integrations/logstash/#log-collection
