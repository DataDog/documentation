---
disable_toc: false
products:
- icon: logs
  name: Logs
title: Destino Azure Storage
---

{{< product-availability >}}

Utiliza el destino Azure Storage para enviar logs a un bucket de Azure Storage. Si deseas enviar logs a Azure Storage para [archivado][1] y [rehidratación][2], debes [configurar archivos de logs](#configure-log-archives). Si no deseas rehidratar los logs en Datadog, pase a [Configurar el destino para tu pipeline](#configure-the-destination-for-your-pipeline).

## Configurar archivos de logs

Este step (UI) / paso (generic) solo es necesario si deseas enviar logs a Azure Storage en formato rehidratable de Datadog para [archivado][1] y [rehidratación][2] y aún no tienes un archivo de logs de Datadog configurado para Observability Pipelines. Si ya tienes un archivo de logs de Datadog configurado o no deseas rehidratar los logs en Datadog, ve a [Configurar el destino para tu pipeline](#set-up-the-destination-for-your-supipeline).

Necesitas tener la [integración de Azure][3] de Datadog instalada para configurar archivos de logs de Datadog.

{{% observability_pipelines/configure_log_archive/azure_storage/instructions %}}

## Configurar el destino de tu pipeline

Configura el destino de Azure Storage y tus variables de entorno cuando [configures un pipeline de logs de archivo][4]. La siguiente información se configura en la interfaz de usuario de pipelines.

1. Introduce el nombre del contenedor Azure que creaste anteriormente.
1. Si lo deseas, introduce un prefijo.
    - Los prefijos son útiles para particionar objetos. Por ejemplo, puedes utilizar un prefijo como clave de objeto para almacenar objetos en un directorio concreto. Si se utiliza un prefijo con este fin, debe terminar en `/` para que actúe como una ruta de directorio; no se añade automáticamente un `/` al final.
    - Consulta [sintaxis de plantillas][6] si deseas dirigir los logs a diferentes claves de objeto en función de campos específicos de tus logs.
     - **Nota**: Datadog recomienda empezar los prefijos con el nombre del directorio y sin barra oblicua (`/`). Por ejemplo, `app-logs/` o `service-logs/`.
1. Opcionalmente, activa el interruptor para activar **Buffering Options** (Opciones de almacenamiento en búfer).<br>**Nota**: Las opciones de almacenamiento en búfer están en vista previa. Ponte en contacto con tu gestor de cuenta para solicitar acceso.
    - Si se deja desactivado, el tamaño máximo del búfer es de 500 eventos.
    - Si está activado:
        1. Selecciona el tipo de búfer que deseas configurar (**Memoria** o **Disco**).
        1. Introduce el tamaño del búfer y selecciona la unidad.

### Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

## Cómo funciona el destino

### Procesamiento de eventos por lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Consulta [lote de eventos][5] para obtener más información.

| Eventos máximos     | Bytes máximos       | Tiempo de espera (segundos)   |
|----------------| ----------------| --------------------|
| Ninguno           | 100,000,000     | 900                 |

[1]: /es/logs/log_configuration/archives/
[2]: /es/logs/log_configuration/rehydrating/
[3]: /es/integrations/azure/#setup
[4]: /es/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /es/observability_pipelines/destinations/#event-batching
[6]: /es/observability_pipelines/destinations/#template-syntax