---
description: Recopila logs de múltiples fuentes, procésalos y analízalos, y luego
  correlaciónalos con trazas (traces) y métricas.
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Centro de aprendizaje
  text: Introducción a la gestión de logs
- link: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
  tag: Centro de aprendizaje
  text: Profundizando en el procesamiento de logs
- link: https://learn.datadoghq.com/courses/log-indexes
  tag: Centro de aprendizaje
  text: Gestionar y monitorizar volúmenes de logs indexados
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centro de aprendizaje
  text: Crear y gestionar pipelines de logs
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: Centro de aprendizaje
  text: Procesar logs predefinidos con pipelines de integración
- link: /logs/log_collection/
  tag: Documentación
  text: Colección de logs e integraciones
- link: /getting_started/tagging/unified_service_tagging
  tag: Documentación
  text: Descubre cómo configurar el etiquetado de servicios unificado
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participa en una sesión interactiva para optimizar tu gestión de logs
title: Empezando con los logs
---

## Información general

Usa la herramienta Log Management de Datadog, también denominada "logs", para recopilar logs en varias fuentes que los generen, como tu servidor, un contenedor, un entorno de nube, una aplicación, o los procesadores y reenviadores de logs existentes. Con la generación de logs convencional, tienes que elegir qué logs analizar y conservar para mantener la relación coste-eficiencia. En cambio, con Logging without Limits* de Datadog, puedes recopilar, procesar, archivar, explorar y monitorizar tus logs sin límites.

En esta página, te explicamos cómo puedes empezar a usar la herramienta Log Management en Datadog. Si aún no lo has hecho, crea una [cuenta de Datadog][1].

## Configura una fuente de logs

Con Log Management, puedes analizar y explorar datos en el Log Explorer (Navegador de logs), conectar [trazas][2] y [métricas][3] para correlacionar los datos de valor de Datadog, y usar los logs ingeridos en la herramienta [Cloud SIEM][4] de Datadog. El ciclo de vida de un log en Datadog comienza en el momento en el que se ingiere de una fuente de logs.

{{< img src="/getting_started/logs/getting-started-overview.png" alt="Diferentes tipos de configuraciones de logs">}}

### Servidor

Hay varias [integraciones][5] disponibles para reenviar logs desde tu servidor a Datadog. Las integraciones utilizan un bloque de configuración de logs en su archivo `conf.yaml`, que está disponible en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent, para reenviar logs a Datadog desde tu servidor.

```yaml
logs:
  - type: file
    path: /path/to/your/integration/access.log
    source: integration_name
    service: integration_name
    sourcecategory: http_web_access
```

Para empezar a recopilar logs desde un servidor:

1. Si aún no lo has hecho, instala el [Datadog Agent][6] en función de la plataforma que utilices.

    **Nota**: Para recopilar logs, debes usar el Datadog Agent v6 o una versión posterior.

2. La recopilación de logs **no está activada** de forma predeterminada en el Datadog Agent. Para activarla, establece `logs_enabled` como `true` en tu archivo `datadog.yaml`.

    {{< agent-config type="log collection configuration" filename="datadog.yaml" collapsible="true">}}

3. Reinicia el [Datadog Agent][7].

4. Sigue los [pasos para activar][8] la integración o los pasos para recopilar logs de archivos personalizados en el sitio de Datadog.

    **Nota**: Si vas a recopilar logs de archivos personalizados y necesitas ejemplos de archivos de cola, TCP/UDP, journald o eventos de Windows, consulta la sección [Recopilación de logs personalizada][9].

### Contenedor

Con Datadog Agent v6 y versiones posteriores, el Agent puede recopilar logs a partir de contenedores. Todos los servicios de contenedorización cuentan con instrucciones de configuración concretas según dónde se despliegue o ejecute el Agent, o cómo se redirijan los logs.

Por ejemplo, [Docker][10] dispone de dos tipos de instalación diferentes para el Agent, a saber: en tu host, donde el Agent es externo al entorno del Docker, o mediante el despliegue de una versión contenedorizada del Agent en el entorno de tu Docker.

[Kubernetes][11] requiere que el Datadog Agent se ejecute en tu clúster de Kubernetes. La recopilación de logs puede configurarse con una especificación de DaemonSet, un Helm chart o con el Datadog Operator.

Para empezar a recopilar logs a partir de un servicio de contenedor, sigue las [instrucciones de la aplicación][12].

### Nube

Puedes reenviar logs desde varios proveedores de la nube, como AWS, Azure y Google Cloud, a Datadog. Cada proveedor de la nube tiene su propio conjunto de instrucciones de configuración.

Por ejemplo, los logs de los servicios de AWS suelen almacenarse en buckets de S3 o en grupos de logs de CloudWatch. Puedes suscribirte a estos logs y desviarlos hacia un flujo (stream) de Amazon Kinesis para luego transferirlos a uno o varios destinos. Uno de los destinos predeterminados de los flujos de entrega de Amazon Kinesis es Datadog.

Para empezar a recopilar logs a partir de un servicio en la nube, sigue las [instrucciones de la aplicación][13].

### Cliente

Datadog autoriza la recopilación de logs desde clientes a través de SDK o bibliotecas. Por ejemplo, puedes usar el SDK `datadog-logs` para enviar logs a Datadog desde clientes de JavaScript.

Para empezar a recopilar logs desde un cliente, sigue las [instrucciones de la aplicación][14].

### Otro

Si usas servicios o herramientas de logs ya existentes, como Rsyslog, FluentD o Logstash, ten en cuenta que Datadog ofrece plugins y opciones para desviar los logs.

Si no encuentras tu integración, escribe su nombre en el campo *otras integraciones* para recibir notificaciones cuando esté disponible.

Para empezar a recopilar logs a partir de un servicio en la nube, sigue las [instrucciones de la aplicación][15].

## Explora tus logs

Cuando se configura una fuente de logs, tus logs pasan a estar disponibles en el [Log Explorer][16]. Puedes usar esta herramienta para filtrar, agregar y visualizar tus logs.

Por ejemplo, si tienes logs que fluyen desde un servicio que deseas examinar más a fondo, filtra por `service`. También puedes filtrar por `status`, como `ERROR`, y seleccionar [Group into Patterns (Agrupar en patrones)][17] para ver qué parte de tu servicio está registrando más errores.

{{< img src="/getting_started/logs/error-pattern-2024.png" alt="Filtrar en el Log Explorer por patrón de errores">}}

Agrega tus logs en `Fields` y visualízalos como **Top List** (Lista principal) para ver tus principales servicios de registros. Selecciona una fuente, como `info` o `warn`, y selecciona **View Logs** (Ver logs) en el menú desplegable. El panel lateral rellena logs en función del error, para que puedas ver rápidamente qué hosts y servicios requieren atención.

{{< img src="/getting_started/logs/top-list-view-2024.png" alt="Una lista principal en el Log Explorer">}}

## ¿Qué toca hacer ahora?

Una vez que se haya configurado una fuente de logs y que tus logs estén disponibles en el Log Explorer, podrás empezar a explorar algunas otras áreas de la gestión de logs.

### Configuración de logs

* Establece [atributos y alias][18] para unificar el entorno de tus logs.
* Controla cómo se procesan tus logs con [pipelines][19] y [procesadores][20].
* Como Logging without Limits* desacopla la ingesta y la indexación de logs, puedes [configurar tus logs][21] y elegir qué logs [indexar][22], [retener][23] o [archivar][24].

### Correlación de logs

* [Conecta logs y trazas][2] con los logs exactos asociados a alguno de los siguientes parámetros concretos: `env`, `service,` o `version`.
* Si ya usas métricas en Datadog, puedes [correlacionar los logs y las métricas][3] para obtener más contexto sobre un problema.

### Guías

* [Prácticas recomendadas para Log Management][25]
* Obtén más información en [Logging without Limits*][26]
* Gestionar los datos confidenciales de logs con la [configuración RBAC][27]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: https://www.datadoghq.com
[2]: /es/tracing/other_telemetry/connect_logs_and_traces/
[3]: /es/logs/guide/correlate-logs-with-metrics/
[4]: /es/security/cloud_siem/
[5]: /es/getting_started/integrations/
[6]: /es/agent/
[7]: /es/agent/configuration/agent-commands/#restart-the-agent
[8]: https://app.datadoghq.com/logs/onboarding/server
[9]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[10]: /es/agent/docker/log/?tab=containerinstallation
[11]: /es/agent/kubernetes/log/?tab=daemonset
[12]: https://app.datadoghq.com/logs/onboarding/container
[13]: https://app.datadoghq.com/logs/onboarding/cloud
[14]: https://app.datadoghq.com/logs/onboarding/client
[15]: https://app.datadoghq.com/logs/onboarding/other
[16]: /es/logs/explorer/
[17]: /es/logs/explorer/analytics/patterns/
[18]: /es/logs/log_configuration/attributes_naming_convention/
[19]: /es/logs/log_configuration/pipelines/
[20]: /es/logs/log_configuration/processors/
[21]: /es/logs/log_configuration/
[22]: https://docs.datadoghq.com/es/logs/log_configuration/indexes
[23]: https://docs.datadoghq.com/es/logs/log_configuration/flex_logs
[24]: https://docs.datadoghq.com/es/logs/log_configuration/archives
[25]: /es/logs/guide/best-practices-for-log-management/
[26]: /es/logs/guide/getting-started-lwl/
[27]: /es/logs/guide/logs-rbac/