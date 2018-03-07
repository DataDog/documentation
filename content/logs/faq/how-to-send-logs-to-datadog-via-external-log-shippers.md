---
title: How to Send Logs to Datadog via External Log Shippers
kind: faq
further_reading:
- link: "/logs/faq/i-have-a-custom-log-file-with-heightened-read-permissions"
  tag: "FAQ"
  text: I have a custom log file with heightened read-permissions; how do I send it to Datadog
- link: "/logs/"
  tag: "Documentation"
  text: Learn how to collect your logs
- link: "/logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
---

The best and easiest way to send logs to Datadog is through the Datadog Agent. You can read how to configure the dd-agent to send logs to [Datadog here](/logs/). 

That said, you can also send logs to Datadog using many common non-Datadog log shippers, like the following:

* [Rsyslog](#rsyslog)
* [FluentD](#fluentd)
* [Logstash](#logstash)
* [Syslog-ng](#syslog-ng)
* [NXLog (Windows)](#nxlog)

## Forwarding logs from other shippers to the Datadog Log Agent

The Datadog Log Agent can be configured:

* [To tail logs from files](/logs/#tail-existing-files)
* [To listen for logs via UDP or TCP over a given port](/logs/#stream-logs-through-tcp-udp). 
 
So whatever your log shipper is, one option is just to have that shipper forward its logs to the Datadog Log Agent; it is often easy to configure this kind of setup, both from the dd-agent side, and from your log shipper. With this approach, you don't need to add your Datadog API key, hostname, or source values in your log shipper's configurations, since that is handled by the Datadog Log Agent. 

This approach can be especially useful for sending to Datadog logs that have heightened permission requirements. The dd-agent does not run as root (and as a best practice we do not encourage running it as root), so that can block the Datadog Logs Agent from tailing some log files directly, such as /var/log/syslog. If you do not want to modify the permissions on these files or the access that you give to the dd-agent user, many of these open source log shippers do run as root, and can be used to forward logs to the Datadog Logs Agent over UDP / TCP. 

{{< partial name="whats-next/whats-next.html" >}}
