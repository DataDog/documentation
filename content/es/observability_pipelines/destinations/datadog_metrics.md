---
description: Aprende a configurar el destino de las métricas de Datadog.
disable_toc: false
products:
- icon: métricas
  name: Métricas
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Métricas de Datadog
---

{{< product-availability >}}

Utiliza el destino de métricas de Observability Pipelines de Datadog para enviar métricas a Datadog. También puedes utilizar [AWS PrivateLink](#aws-privatelink) para enviar métricas de Observability Pipelines a Datadog.

## Instalación

Configura el destino de métricas de Datadog y sus variables de entorno cuando [configures un pipeline][1]. La siguiente información se configura en la interfaz de usuario de pipelines.

{{< img src="observability_pipelines/destinations/datadog_metrics_settings.png" alt="Los parámetros del destino de métricas de Datadog" style="width:40%;" >}}

### Configurar el destino

Opcionalmente, activa **Buffering Options** (Opciones de almacenamiento en búfer) para configurar cómo se almacenan en búfer los eventos antes de ser enviados.
**Nota**: Las opciones de almacenamiento en búfer están en {{< tooltip glossary="preview" case="title" >}}. Ponte en contacto con el administrador de tu cuenta para solicitar acceso.

- Si está desactivado, el búfer contiene un máximo de 500 eventos. Los eventos que superan este límite se descartan.
- Si está activado:
  - Selecciona el tipo de búfer que desees configurar (Memoria o Disco).
  - Introduce el tamaño del buffer y selecciona la unidad.

### Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

## Cómo funciona el destino

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Consulta los [eventos por lotes][2] para obtener más información.

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------|-----------------|---------------------|
| 100 000        | Ninguno            | 2                   |

## AWS PrivateLink

Para enviar métricas de Observability Pipelines a Datadog con AWS PrivateLink, consulta [Conectarse a Datadog a través de AWS PrivateLink][3] para obtener instrucciones de configuración. Los dos endpoints que necesitas configurar son:

- Métricas: {{< region-param key=metrics_endpoint_private_link code="true" >}}
- Configuración remota: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Nota**: El endpoint `obpipeline-intake.datadoghq.com` se utiliza para Live Capture y no está disponible como endpoint de PrivateLink.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://docs.datadoghq.com/es/observability_pipelines/destinations/#event-batching
[3]: https://docs.datadoghq.com/es/agent/guide/private-link/?tab=crossregionprivatelinkendpoints
[4]: http://config.datadoghq.com