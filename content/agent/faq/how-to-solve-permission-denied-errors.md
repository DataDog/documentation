---
title: How to solve Permission denied errors?
kind: faq
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
---

When running the Datadog agent on a given host, you may encounter some permissions related issues that would prevent the agent from running properly, such as:

```
IOError: [Errno 13] Permission denied: '/var/log/datadog/supervisord.log'
```

You need to make sure that the agent's log files as well as the directory that contains those files is owned by the Datadog agent (dd-agent). 
If not, the agent isn't able to write log entries in those files.

Below the command that works on Unix systems to display the files ownership information:

```
ls -l /var/log/datadog/

total 52300
-rw-r--r-- 1 dd-agent dd-agent 5742334 Jul 31 11:49 collector.log
-rw-r--r-- 1 dd-agent dd-agent 10485467 Jul 28 02:45 collector.log.1
-rw-r--r-- 1 dd-agent dd-agent 1202067 Jul 31 11:48 dogstatsd.log
-rw-r--r-- 1 dd-agent dd-agent 10485678 Jul 28 07:04 dogstatsd.log.1
-rw-r--r-- 1 dd-agent dd-agent 4680625 Jul 31 11:48 forwarder.log
-rw-r--r-- 1 dd-agent dd-agent 10485638 Jul 28 07:09 forwarder.log.1
-rw-r--r-- 1 dd-agent dd-agent 1476 Jul 31 11:37 jmxfetch.log
-rw-r--r-- 1 dd-agent dd-agent 31916 Jul 31 11:37 supervisord.log
-rw-r--r-- 1 dd-agent dd-agent 110424 Jul 31 11:48 trace-agent.log
-rw-r--r-- 1 dd-agent dd-agent 10000072 Jul 28 08:29 trace-agent.log.1
```

If those files are not owned by the dd-agent user, change the ownership with:

```
sudo chown -R dd-agent:dd-agent /var/log/datadog/
```

Then [restart the agent](/agent/faq/agent-commands). 

[More information on the agent logs locations](/agent/#log-locations).

{{< partial name="whats-next/whats-next.html" >}}