---
title: Troubleshooting JMX Integrations
kind: faq
customnav: integrationsnav
---

To verify you have access to JMX please test using JConsole or equivalent if possible. If you're unable to connect using JConsole [this article](https://docs.oracle.com/javase/8/docs/technotes/guides/management/faq.html) may help to get you sorted. Also, if the metrics listed in your YAML aren't 1:1 with those listed in JConsole you'll need to correct this.

If you're able to connect using JConsole please run the following:

```
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:PORT -u USER -p PASSWORD
```

If you're able to connect using the command above run: beans

Please send us a copy of the results from above along with:

* [Agent logs](/agent/faq/send-logs-and-configs-to-datadog-via-flare-command)
* Output of the [info command](/agent/faq/agent-status-and-information))
* Output of: ps aux | grep jmxfetch
* /var/log/datadog/jmxfetch.log
* Output of: `sudo /etc/init.d/datadog-agent jmx list_everything`
* A copy of the YAML integration - please send the file

Note, if you're able to see some metrics (jvm.heap_memory, jvm.non_heap_memory, etc.) it is a sign that JMXFetch is properly running, in this scenario the likely issue is connected to a misconfiguration in your YAML if you're targeting another application.