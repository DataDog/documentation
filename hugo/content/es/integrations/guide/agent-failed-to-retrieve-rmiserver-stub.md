---
title: El Agent no pudo recuperar el stub RMIServer
---

```text
instance #kafka-localhost-<PORT_NUM> [ERROR]: 'Cannot connect to instance localhost:<PORT_NUM>. java.io.IOException: Failed to retrieve RMIServer stub
```

El Datadog Agent no puede conectarse a la instancia Kafka para recuperar métricas de los mBeans expuestos a través del protocolo RMI.

Incluye los siguientes argumentos de máquina virtual Java (JVM) al iniciar la instancia Kafka para resolver este problema *(obligatorio para Producer, Consumer y Broker, ya que son instancias independientes de Java)*.

```text
-Dcom.sun.management.jmxremote.port=<PORT_NUM> -Dcom.sun.management.jmxremote.rmi.port=<PORT_NUM>
```