---
title: Troubleshooting - les intégrations JMX
kind: faq
---

To verify you have access to JMX, test using JConsole or equivalent if possible. If you're unable to connect using JConsole [this article][1] may help to get you sorted. Also, if the metrics listed in your YAML aren't 1:1 with those listed in JConsole you'll need to correct this.

Si vous êtes en mesure de vous connecter à l'aide de JConsole, exécutez les opérations suivantes:

```
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:PORT -u USER -p PASSWORD
```

If you're able to connect using the command above, run: `beans` and send us a copy of the results from above along with the following information.

Pour l'Agent v6:

* Content of `/var/log/datadog/agent.log`
* Output of the [info command][3]
* Output of: `ps aux | grep jmxfetch`
* Une copie de l'intégration de YAML (envoyer le fichier)

Pour l'Agent v5:

* [Logs de l'Agent][2]
* Output of the [info command][3]
* Output of: `ps aux | grep jmxfetch`
* Content of `/var/log/datadog/jmxfetch.log`
* Résultat de: `sudo /etc/init.d/datadog-agent jmx list_everything`
* Une copie de l'intégration de YAML (envoyer le fichier)

**Note**: if you're able to see some metrics (`jvm.heap_memory`, `jvm.non_heap_memory`, etc.) it is a sign that JMXFetch is properly running. If you're targeting another application and not seeing related metrics, the likely issue is a misconfiguration in your YAML.

[1]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/faq.html
[2]: /agent/faq/send-logs-and-configs-to-datadog-via-flare-command
[3]: /agent/faq/agent-status-and-information
