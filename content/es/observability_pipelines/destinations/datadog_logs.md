---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de logs de Datadog
---

{{< product-availability >}}

Utiliza del destino de logs de Observability Pipelines de Datadog para enviar logs a Log Management de Datadog. También puedes utilizar [AWS PrivateLink](#aws-privatelink) para enviar logs de Observability Pipelines a Datadog.

## Instalación

Configura el destino Datadog Logs y sus variables de entorno cuando [configures un pipeline][1]. La siguiente información se configura en la interfaz de usuario del pipeline.

### Configurar el destino

1. También puedes activar el interruptor para habilitar **Opciones de almacenamiento en buffer**.<br>**Nota**: Las opciones de almacenamiento en buffer están en vista previa. Ponte en contacto con tu gestor de cuenta para solicitar acceso.
    - Si se deja desactivado, el tamaño máximo del almacenamiento en buffer es de 500 eventos.
    - Si está activado:
        1. Selecciona el tipo de buffer que quieres configurar (**Memoria** o **Disco**).
        1. Introduce el tamaño del buffer y selecciona la unidad.

### Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

## Cómo funciona el destino

### Procesamiento de eventos por lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Consulta los [eventos por lotes][2] para obtener más información.

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------|-----------------|---------------------|
| 1,000          | 4,250,000       | 5                   |

{{< site-region region="us,ap1,ap2" >}}

## AWS PrivateLink

Para enviar logs de Observability Pipelines a Datadog con AWS PrivateLink, consulta [Conectarse a Datadog a través de AWS PrivateLink][1] para obtener instrucciones de configuración. Los dos endpoints que necesitas configurar son:

- Logs (Entrada de HTTP de usuario): {{< region-param key=http_endpoint_private_link code="true" >}}
- Configuración remota: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Nota**: El endpoint `obpipeline-intake.datadoghq.com` se utiliza para Live Capture y no está disponible como endpoint de PrivateLink.

[1]: /es/agent/guide/private-link/?tab=crossregionprivatelinkendpoints

{{< /site-region >}}
{{< site-region region="us3" >}}

## Azure Private Link

Para enviar logs de Observability Pipelines a Datadog con Azure Private Link, consulta [Conectarse a Datadog a través de Azure Private Link][1] para obtener instrucciones de configuración. Los dos endpoints que necesitas configurar son:

- Logs (Entrada de HTTP de usuario): `http-intake.logs.us3.datadoghq.com`
- Configuración remota: `config.us3.datadoghq.com`

**Nota**: El endpoint `obpipeline-intake.datadoghq.com` se utiliza para la Live Capture y no está disponible como endpoint de Private Link.

[1]: /es/agent/guide/azure-private-link/?site=us3

{{< /site-region >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/destinations/#event-batching