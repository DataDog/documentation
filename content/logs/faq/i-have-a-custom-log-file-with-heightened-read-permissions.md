---
title: I have a custom log file with heightened read-permissions; how do I send it to Datadog?
kind: faq
customnav: lognav
beta: true
---

Often, log files, especially system logs such as syslog or journald, have heightened read-permissions blocking Datadog agent log collection as it does not have sudo or admin access.

There are three potential solutions to get around this:

1. (Not Recommended) Give the agent root access so it can tail those files. Datadog strongly recommends against going this route.
2. Change the file permission to let the Agent access it.
3. Configure an open source log shipper (such as Rsyslog, NXLog, …) that has root access to send those logs either directly to your Datadog platform or locally to a running Datadog agent. All configuration are explained in [this article](/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers).