---
title: Troubleshooting - les intégrations JMX
kind: faq
---

To verify you have access to JMX, test using JConsole or equivalent if possible. If you're unable to connect using JConsole [this article][1] may help to get you sorted. Also, if the metrics listed in your YAML aren't 1:1 with those listed in JConsole you'll need to correct this.

Si vous êtes en mesure de vous connecter à l'aide de JConsole, exécutez les opérations suivantes:

```
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:PORT -u USER -p PASSWORD
```

Si vous êtes capable de vous connecter en utilisant la commande ci-dessus, lancez: beans

Envoyez-nous une copie des résultats ci-dessus avec:

* [Logs de l'Agent][2]
* Output of the [info command][3])
* Résultat de: ps aux | grep jmxfetch
* /var/log/datadog/jmxfetch.log
* Résultat de: `sudo /etc/init.d/datadog-agent jmx list_everything`
* Une copie de l'intégration de YAML (envoyer le fichier)

Note, si vous êtes capable de voir des métriques (`jvm.heap_memory`,`jvm.non_heap_memory`, etc.) c'est un signe que JMXFetch fonctionne correctement, dans ce scénario le problème probable est donc lié à une mauvaise configuration dans votre YAML si vous ciblez une autre application.

[1]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/faq.html
[2]: /agent/faq/send-logs-and-configs-to-datadog-via-flare-command
[3]: /agent/faq/agent-status-and-information
