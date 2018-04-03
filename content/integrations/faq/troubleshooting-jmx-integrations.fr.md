---
title: Troubleshooting - les intégrations JMX
kind: faq
---

Pour vérifier que vous avez accès à JMX, testez en utilisant JConsole ou équivalent . Si vous ne parvenez pas à vous connecter à l'aide de JConsole [cet article](https://docs.oracle.com/javase/8/docs/technotes/guides/management/faq.html), vous sera peut-être plus utile. En outre, si les métriques listées dans votre YAML ne sont pas 1:1 avec celles listées dans JConsole, vous devrez le corriger.

Si vous êtes en mesure de vous connecter à l'aide de JConsole, exécutez les opérations suivantes:

```
java -jar /opt/datadog-agent/agent/checks/libs/jmxterm-1.0-DATADOG-uber.jar -l localhost:PORT -u USER -p PASSWORD
```

Si vous êtes capable de vous connecter en utilisant la commande ci-dessus, lancez: beans

Envoyez-nous une copie des résultats ci-dessus avec:

* [Logs de l'Agent](/agent/faq/send-logs-and-configs-to-datadog-via-flare-command)
* Sortie de la [commande info](/agent/faq/agent-status-and-information))
* Résultat de: ps aux | grep jmxfetch
* /var/log/datadog/jmxfetch.log
* Résultat de: `sudo /etc/init.d/datadog-agent jmx list_everything`
* Une copie de l'intégration de YAML (envoyer le fichier)

Note, si vous êtes capable de voir des métriques (`jvm.heap_memory`,`jvm.non_heap_memory`, etc.) c'est un signe que JMXFetch fonctionne correctement, dans ce scénario le problème probable est donc lié à une mauvaise configuration dans votre YAML si vous ciblez une autre application.