---
title: J'ai un fichier de logs avec des autorisations de lecture accrues; comment l'envoyer à Datadog?
kind: faq
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Apprenez à collecter vos logs
- link: "logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers"
  tag: "FAQ"
  text: Comment envoyer des logs à Datadog via des Log Shippers externes
- link: "logs/explore"
  tag: "Documentation"
  text: Apprenez à explorer vos logs
---

Often, log files, especially system logs such as *syslog* or *journald*, have heightened read-permissions blocking Datadog Agent log collection as it does not have *sudo* or *admin* access.  

There are three potential solutions to get around this:  

* (Not Recommended) Give the Agent root access so it can tail those files. Datadog strongly recommends against going this route.
* Change the file permission to let the Agent access it.
* Configure an open source log shipper (such as Rsyslog, NXLog, …) that has root access to send those logs either directly to your Datadog platform or locally to a running Datadog Agent. All configuration are explained in the [How to Send Logs to Datadog via External Log Shippers?][1] article.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers
