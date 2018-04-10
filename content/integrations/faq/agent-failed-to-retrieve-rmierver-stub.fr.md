---
title: L'agent n'a pas pu récupérer le talon de RMIServer
kind: faq
---

```
instance #kafka-localhost-<PORT_NUM> [ERROR]: 'Cannot connect to instance localhost:<PORT_NUM>. java.io.IOException: Failed to retrieve RMIServer stub
```

L'Agent Datadog ne peut pas connecter à l'instance Kafka afin de récupérer les métriques fournis par mBeans via le protocole RMI.

Incluez les arguments suivants lors du démarrage de l'instance Kafka afin de résoudre ce problème *(obligatoire pour le Producer, le Consumer et le Broker, car ils sont tous des instances de Java distinctes)*

```
-Dcom.sun.management.jmxremote.port=<PORT_NUM> -Dcom.sun.management.jmxremote.rmi.port=<PORT_NUM>
```