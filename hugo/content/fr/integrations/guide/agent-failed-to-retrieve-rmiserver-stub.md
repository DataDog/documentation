---

title: Échec de la récupération du stub RMIServer par l'Agent
---

```text
instance #kafka-localhost-<NUMÉRO_PORT> [ERROR]: 'Cannot connect to instance localhost:<NUMÉRO_PORT>. java.io.IOException: Failed to retrieve RMIServer stub
```

L'Agent Datadog ne parvient pas à se connecter à l'instance Kafka pour récupérer les métriques provenant des mBeans exposés via le protocole RMI.

Pour résoudre ce problème, définissez les arguments JVM suivants lors du lancement de l'instance Kafka *(opération requise pour le producteur, le consommateur et l'agent, car il s'agit d'instances Java distinctes)*.

```text
-Dcom.sun.management.jmxremote.port=<NUMÉRO_PORT> -Dcom.sun.management.jmxremote.rmi.port=<NUMÉRO_PORT>
```