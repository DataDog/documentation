---
algolia:
  tags:
  - página de estado
aliases:
- /es/agent/guide/agent-status-page
further_reading:
- link: /agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Agent
- link: /agent/configuration/agent-configuration-files/
  tag: Guía
  text: Archivos de configuración del Agent
- link: /agent/configuration/agent-commands/
  tag: Guía
  text: Comandos del Agent
title: Página de estado del Agent v6
---

La página de estado del Agent v6 muestra información sobre el Agent en ejecución. Consulta la página [Agent Commands (Comandos del Agent)][1] para encontrar el comando de estado adecuado para tu entorno. En las siguientes secciones, encontrarás más detalles sobre el contenido de la página de estado.

**Nota**: La página de estado puede variar ligeramente entre las distintas versiones del Agent.

## Versión del Agent

La información general del Agent se muestra debajo de la versión del Agent. Por ejemplo:
```text
  Status date: 2019-08-29 18:16:41.526203 UTC
  Agent start: 2019-08-29 18:04:18.060507 UTC
  Pid: 12141
  Go Version: go1.11.5
  Python Version: 2.7.16
  Check Runners: 4
  Log Level: info
```

### Rutas

En esta sección, se indican las rutas al archivo de configuración de Datadog, al directorio `conf.d` y al directorio `checks.d`. Por ejemplo:
```text
    Config File: /etc/datadog-agent/datadog.yaml
    conf.d: /etc/datadog-agent/conf.d
    checks.d: /etc/datadog-agent/checks.d
```

### Relojes

Esta sección muestra la [NTP offset (diferencia horaria con NTP)][2] y la hora UTC del sistema. Por ejemplo:
```text
    NTP offset: 2.095ms
    System UTC time: 2019-08-29 18:16:41.526203 UTC
```

### Información sobre el host

En esta sección, se muestra información del host en el que se está ejecutando el Agent. Por ejemplo:
```text
    bootTime: 2019-08-29 18:01:27.000000 UTC
    kernelVersion: 4.4.0-109-generic
    os: linux
    platform: ubuntu
    platformFamily: debian
    platformVersion: 16.04
    procs: 175
    uptime: 2m53s
    virtualizationRole: guest
    virtualizationSystem: vbox
```

### Nombres de host

En esta sección, se muestran los nombres de host que encontró el Agent (consulta los siguientes ejemplos). El `nombre de host` es el último notificado al backend. Para obtener más información, consulta [How does Datadog determine the Agent hostname (¿Cómo determina Datadog el nombre de host del Agent?)][3].

```text
    hostname: ubuntu-xenial
    socket-fqdn: ubuntu-xenial
    socket-hostname: ubuntu-xenial
    hostname provider: os
    unused hostname providers:
      aws: not retrieving hostname from AWS: the host is not an ECS instance, and other providers already retrieve non-default hostnames
      configuration/environment: hostname is empty
      gce: unable to retrieve hostname from GCE: Get http://169.254.169.254/computeMetadata/v1/instance/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

## Collector

### Checks en ejecución

En esta sección, se muestra una lista de instancias de checks en ejecución. Por ejemplo:

```text
    load
    ----
      Instance ID: load [OK]
      Total Runs: 4
      Metric Samples: Last Run: 6, Total: 24
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 0, Total: 0
      Histogram Buckets: Last Run: 12, Total: 36
      Average Execution Time : 6ms
```

Términos y descripciones:

| Término                   | Descripción                                                      |
|------------------------|------------------------------------------------------------------|
| Instance ID            | El ID de instancia y el estado del check.                     |
| Total de ejecuciones             | Número total de veces que se ejecutó la instancia.                  |
| Muestras de métricas         | El número de métricas obtenidas.                                   |
| Eventos                 | El número de eventos activados.                                  |
| Checks de servicio         | El número de checks de servicio notificados.                           |
| Buckets de histograma      | El número de buckets de histograma enviados.                            |
| Tiempo medio de ejecución | El tiempo medio transcurrido para ejecutar la instancia.                      |
| Última ejecución               | El número durante la última ejecución de un check.                            |
| Total                  | El número total desde el inicio o reinicio más reciente del Agent. |

### Errores de configuración

En esta sección, solo se indica si hay checks con errores de configuración. Por ejemplo:

```text
    test
    ----
      Configuration file contains no valid instances
```

### Errores de carga

En esta sección, solo se indica si hay checks con errores de carga. Por ejemplo:

```text
    test
    ----
      Core Check Loader:
        Check test not found in Catalog

      JMX Check Loader:
        check is not a jmx check, or unable to determine if it's so

      Python Check Loader:
        unable to import module 'test': No module named test
```

## JMXFetch

En esta sección, se muestra una lista con los checks de JMX inicializados y otra con los fallidos, incluso si no hay checks. Por ejemplo:

```text
  Initialized checks
  ==================
    no checks

  Failed checks
  =============
    no checks
```

## Forwarder

El forwarder utiliza varios workers para enviar cargas útiles a Datadog.

Si aparece la advertencia `el forwarder descartó las transacciones, es probable que haya un problema con tu red`, significa que todos los workers están ocupados. Deberías revisar el rendimiento de tu red y ajustar las opciones `forwarder_num_workers` y `forwarder_timeout`.

### Transacciones

En esta sección, se muestran las transacciones realizadas por el forwarder. Por ejemplo:

```text
    CheckRunsV1: 2
    Dropped: 0
    DroppedOnInput: 0
    Events: 0
    HostMetadata: 0
    IntakeV1: 2
    Metadata: 0
    Requeued: 0
    Retried: 0
    RetryQueueSize: 0
    Series: 0
    ServiceChecks: 0
    SketchSeries: 0
    Success: 6
    TimeseriesV1: 2
    Errors: 1
```

Términos y descripciones:

| Término           | Descripción                                                                  |
|----------------|------------------------------------------------------------------------------|
| Correcto        | El número de transacciones enviadas correctamente.                                |
| Errores         | El número de veces que falló el envío de una transacción y que se reintentó.         |
| RetryQueueSize | El número actual de transacciones que están en espera para reintentarse.                    |
| Reintentos        | El número de veces que se reintentó realizar una transacción.                               |
| DroppedOnInput | El número de transacciones que se descartaron porque todos los workers estaban ocupados.  |
| Abandonos        | El número de transacciones que se descartaron porque se reintentaron muchas veces. |

### Estado de las claves de API

En esta sección, se muestra el estado de la clave de API configurada. Por ejemplo:

```text
    API key ending with ab123: API Key valid
```

## Endpoints

En esta sección, se muestra la lista de endpoints que está utilizando el Datadog Agent. Por ejemplo:

```text
  https://app.datadoghq.com - API Key ending with:
      - ab123
```

## Logs Agent

Cuando está activado el Logs Agent, esta sección muestra información sobre los logs procesados y enviados. Por ejemplo:

```text
    LogsProcessed: 10
    LogsSent: 10
```

## Aggregator

En esta sección, se muestra información sobre el aggregator del Agent. Por ejemplo:

```text
  Checks Metric Sample: 399
  Dogstatsd Metric Sample: 123
  Event: 1
  Events Flushed: 1
  Number Of Flushes: 2
  Series Flushed: 273
  Service Check: 20
  Service Checks Flushed: 20
  Sketches Flushed: 8
  Checks Histogram Bucket Metric Sample: 24
```

Términos y descripciones:

| Término                                         | Descripción                                                                                           |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Muestra de métricas de checks                         | El número total de métricas enviadas de los checks al aggregator.                                   |
| Muestra de métricas de DogStatsD                      | El número total de métricas enviadas del servidor de DogStatsD al aggregator.                         |
| Evento                                        | El número total de eventos enviados al aggregator.                                                    |
| Check de servicio                                | El número total de checks de servicio enviados al aggregator.                                            |
| Vaciado                                        | La cantidad de veces que se vaciaron las métricas agregadas al forwarder para enviarlas a Datadog.              |
| Bocetos vaciados                             | La cantidad de veces que se vaciaron métricas de distribución agregadas al forwarder para enviarlas a Datadog. |
| Muestra de métricas del bucket del histograma de checks        | El número de métricas del bucket del histograma enviadas de los checks al aggregator.                        |

## DogStatsD

En esta sección, se indica el número de paquetes que recibió el servidor de DogStatsD para cada tipo de datos y errores asociados. Por ejemplo:

```text
  Event Packets: 0
  Event Parse Errors: 0
  Metric Packets: 122
  Metric Parse Errors: 0
  Service Check Packets: 0
  Service Check Parse Errors: 0
  Udp Bytes: 7,672
  Udp Packet Reading Errors: 0
  Udp Packets: 123
  Uds Bytes: 0
  Uds Origin Detection Errors: 0
  Uds Packet Reading Errors: 0
  Uds Packets: 0
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/agent-commands/#agent-information
[2]: /es/agent/troubleshooting/ntp/
[3]: /es/agent/faq/how-datadog-agent-determines-the-hostname/