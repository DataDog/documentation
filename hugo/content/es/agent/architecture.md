---
description: Descripción general de la arquitectura del Datadog Agent, incluidos los
  procesos principales, componentes como el Collector y el Forwarder, y las configuraciones
  de puertos.
disable_toc: false
further_reading:
- link: /agent/supported_platforms/
  tag: Documentación
  text: Plataformas compatibles
- link: /agent/configuration/
  tag: Documentación
  text: Configuración del Agent
title: Arquitectura del Agent
---
## Arquitectura del Agent {#agent-architecture}

Las versiones 6 y 7 del Agent se componen de un proceso principal responsable de recopilar métricas de infraestructura y registros, y de recibir [métricas de DogStatsD][1]. Los componentes principales de este proceso son:

* El Collector, que ejecuta comprobaciones y recopila métricas.
* El Forwarder, que envía cargas útiles a Datadog.

Los siguientes procesos opcionales son generados por el Agent si se habilitan en el archivo de configuración `datadog.yaml`:

* El APM Agent es un proceso que recopila [trazas][2]. Está habilitado de forma predeterminada.
* El Process Agent es un proceso que recopila información de procesos en tiempo real. De forma predeterminada, el Process Agent solo recopila los contenedores disponibles; de lo contrario, está deshabilitado.
* El [Agent Data Plane][8] (versión preliminar) es un proceso que recibe, agrega y reenvía [métricas de DogStatsD][1] en lugar del proceso principal. Está deshabilitada de forma predeterminada.

En Windows, los servicios se enumeran como:

| Servicio              | Descripción           |
|-----------------------|-----------------------|
| DatadogAgent          | Datadog Agent         |
| datadog-trace-agent   | Datadog Trace Agent   |
| datadog-process-agent | Datadog Process Agent |

De forma predeterminada, el Agent vincula tres [puertos][3] en Linux y cuatro puertos en Windows y macOS:

| Puerto | Descripción                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Expone métricas de tiempo de ejecución del Agent.                                                    |
| 5001 | Utilizado por la CLI y la GUI del Agent para enviar comandos y obtener información del Agent en ejecución. |
| 5002 | Sirve al servidor de la GUI en Windows y macOS.                                                   |
| 8125 | Utilizado por el servidor DogStatsD para recibir métricas externas.                                  |

Cuando el Agent Data Plane está habilitado, se vincula al puerto 8125 en lugar del proceso principal y se vincula a los siguientes puertos adicionales:

| Puerto | Descripción                                                                                           |
|------|-------------------------------------------------------------------------------------------------------|
| 5100 | Expone métricas de tiempo de ejecución del Agent Data Plane.                                                   |
| 5101 | Utilizado por la CLI del Agent Data Plane y el proceso principal del Agent para enviar comandos al Agent Data Plane. |

Para obtener información sobre la configuración de los puertos, consulte [Tráfico de red][4].

### Colector {#collector}

El Collector recopila todas las métricas estándar cada 15 segundos. El Agent 6 incorpora un intérprete de Python 2.7 para ejecutar integraciones y [verificaciones personalizadas][5].

### Forwarder {#forwarder}

El Forwarder del Agent envía métricas a través de HTTPS a Datadog. El almacenamiento en búfer evita que las divisiones de red afecten el reporte de métricas. Las métricas se almacenan en búfer en la memoria hasta que se alcanza un límite de tamaño o de número de solicitudes de envío pendientes. Posteriormente, las métricas más antiguas se descartan para mantener manejable el uso de memoria del Forwarder. Los logs se envían a Datadog a través de una conexión TCP cifrada con SSL.

### DogStatsD {#dogstatsd}

En el Agent 6, DogStatsD es una implementación en Golang del demonio de agregación de métricas [Etsy's StatsD][6]. DogStatsD recibe y consolida métricas arbitrarias a través de UDP o un socket UNIX, lo que permite instrumentar código personalizado sin añadir latencia. Obtenga más información sobre [DogStatsD][7].

Cuando el [Agent Data Plane][8] está habilitado, ejecuta el servidor DogStatsD en lugar del proceso principal del Agent. Las métricas de las verificaciones siguen siendo procesadas por el proceso principal del Agent.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /es/tracing/guide/terminology/
[3]: /es/agent/configuration/network/#open-ports
[4]: /es/agent/configuration/network#configure-ports
[5]: /es/extend/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[8]: /es/agent/configuration/agent-data-plane/