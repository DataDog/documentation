---
aliases:
- /es/observability_pipelines/set_up_pipelines/run_multiple_pipelines_on_a_host/
description: Aprenda qué archivos de Worker agregar y modificar para ejecutar múltiples
  Workers de Observability Pipelines para diferentes pipelines en un solo servidor.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: Documentación
  text: Configure un pipeline
- link: /observability_pipelines/guide/environment_variables/
  tag: Documentación
  text: Variable de entorno para fuentes, procesadores y componentes
title: Ejecute múltiples pipelines en un servidor
---
## Descripción general {#overview}

Si desea ejecutar múltiples pipelines en un solo servidor para enviar registros o métricas desde diferentes fuentes, debe agregar manualmente los archivos de Worker para cualquier Worker adicional. Este documento explica qué archivos necesita agregar y modificar para ejecutar esos Workers.

## Requisitos previos {#prerequisites}

[Configure el primer pipeline][1] e instale el Worker en su servidor.

## Cree un pipeline adicional {#create-an-additional-pipeline}

[Configure otro pipeline][1] para el Worker adicional que desea ejecutar en el mismo servidor. Cuando llegue a la página de instalación, siga los pasos a continuación para ejecutar el Worker para este pipeline.

## Ejecute el Worker para el pipeline adicional {#run-the-worker-for-the-additional-pipeline}

Cuando instaló el primer Worker, de forma predeterminada tiene:

- Un binario de servicio: `/usr/bin/observability-pipelines-worker`
- Un archivo de definición de servicio que se ve así:
    {{< code-block lang="bash" filename="/lib/systemd/system/observability-pipelines-worker.service" >}}
    [Unit]
    Description="Observability Pipelines Worker"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Service]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/observability-pipelines-worker

    [Install]
    WantedBy=multi-user.target
    {{< /code-block >}}
- Un archivo de entorno que se ve así:
    {{< code-block lang="bash" filename="/etc/default/observability-pipelines-worker" >}}
    DD_API_KEY=<datadog_api_key>
    DD_SITE=<dd_site>
    DD_OP_PIPELINE_ID=<pipeline_id>
    {{< /code-block >}}
- Un directorio de datos: `/var/lib/observability-pipelines-worker`

### Configure el Worker adicional {#configure-the-additional-worker}

Para este ejemplo, se creó otro pipeline con la fuente Fluent. Para configurar un Worker para este pipeline:

1. Ejecute el siguiente comando para crear un nuevo directorio de datos, reemplazando `op-fluent` con un nombre de directorio que se ajuste a su caso de uso:
    ```shell
    sudo mkdir /var/lib/op-fluent
    ```
1. Ejecute el siguiente comando para cambiar el propietario del directorio de datos a `observability-pipelines-worker:observability-pipelines-worker`. Asegúrese de actualizar `op-fluent` al nombre de su directorio de datos.
    ```
    sudo chown -R observability-pipelines-worker:observability-pipelines-worker /var/lib/op-fluent/
    ```
1. Cree un archivo de entorno para el nuevo servicio de systemd, como `/etc/default/op-fluent` donde `op-fluent` se reemplaza con su nombre de archivo específico. Ejemplo del contenido del archivo:
    {{< code-block lang="bash" filename="/etc/default/op-fluent" >}}
    DD_API_KEY=<datadog_api_key>
    DD_OP_PIPELINE_ID=<pipeline_id>
    DD_SITE=<dd_site>
    <destintation_environment_variables>
    DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091
    DD_OP_DATA_DIR=/var/lib/op-fluent
    {{< /code-block >}}
    En este ejemplo:
    -  `DD_OP_DATA_DIR` se establece en `/var/lib/op-fluent`. Reemplace `/var/lib/op-fluent` con la ruta a su directorio de datos.
    - `DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091` es la variable de entorno requerida para la fuente Fluent en este ejemplo. Reemplácelo con la [variable de entorno][2] para su fuente.
    
    Además, asegúrese de reemplazar:
    - `<datadog_api_key>` con su [clave de Datadog API][3].
    - `<pipeline_id>` con el ID de la [pipeline][1] para este Worker.
    - `<dd_site>` con su [sitio de Datadog][4].
    - `<destination_environment_variables>` con las [variables de entorno][2] para sus destinos.
1. Cree una nueva entrada de servicio de systemd, como `/lib/systemd/system/op-fluent.service`. Contenido de ejemplo para la entrada:
    {{< code-block lang="bash" filename="/lib/systemd/system/op-fluent.service" >}}
    [Unit]
    Description="OPW for Fluent Pipeline"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Service]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/op-fluent

    [Install]
    WantedBy=multi-user.target
    {{< /code-block >}}
    En este ejemplo:
    - El nombre del servicio es `op-fluent` porque la pipeline está utilizando la fuente Fluent. Reemplace `op-fluent.service` con un nombre de servicio para su caso de uso.
    - El `Description` es `OPW for Fluent Pipeline`. Reemplace `OPW for Fluent Pipeline` con una descripción para su caso de uso.
    - `EnvironmentFile` está configurado en `-/etc/default/op-fluent`. Reemplace `-/etc/default/op-fluent` con el archivo de variables de entorno del servicio systemd que creó para su Worker.
1. Ejecute este comando para recargar systemd:
    ```shell
    sudo systemctl daemon-reload
    ```
1. Ejecute este comando para iniciar el nuevo servicio:
    ```shell
    sudo systemctl enable --now op-fluent
    ```
1. Ejecute este comando para verificar que el servicio se esté ejecutando:
    ```shell
    sudo systemctl status op-fluent
    ```

Además, puede usar el comando `sudo journalctl -u op-fluent.service` para ayudarle a depurar cualquier problema.

## Implemente el pipeline {#deploy-the-pipeline}

1.  Navegue a la página de instalación del pipeline adicional.
1.  En la sección {{< ui >}}Deploy your pipeline{{< /ui >}}, debería ver su Worker adicional detectado. Haga clic en {{< ui >}}Deploy{{< /ui >}}.

[1]: /es/observability_pipelines/configuration/set_up_pipelines/?tab=pipelineui
[2]: /es/observability_pipelines/guide/environment_variables/?tab=sources
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/getting_started/site/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}