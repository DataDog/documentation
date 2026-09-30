---
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines/
  tag: Documentación
  text: Establecer un pipeline
- link: /observability_pipelines/environment_variables/
  tag: Documentación
  text: Variable de entorno para fuentes, procesadores y componentes
title: Ejecutar múltiples pipelines en un host
---

## Información general

Si quieres ejecutar múltiples pipelines en un único host para enviar logs desde diferentes fuentes, necesitas añadir manualmente los archivos de Worker para cualquier Worker adicional. Este documento explica qué archivos necesitas añadir y modificar para ejecutar esos Workers.

## Requisitos previos

[Configura el primer pipeline][1] e instala el Worker en tu host.

## Crear un pipeline adicional

[Configura otro pipeline][1] para el Worker adicional que quieras ejecutar en el mismo host. Cuando estés en la página Instalar, sigue los siguientes pasos para ejecutar el Worker para ese pipeline.

## Ejecutar el Worker del pipeline adicional

Cuando hayas instalado el primer Worker, por defecto tendrás:

- Un servicio binario: `/usr/bin/observability-pipelines-worker`
- Un archivo de definición de servicio similar a:
    {{< code-block lang="bash" filename="/lib/systemd/system/observability-pipelines-worker.service" >}}
    [Unidad]
    Description="Observability Pipelines Worker"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Servicio]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/observability-pipelines-worker

    [Instalar]
    WantedBy=multi-user.target
    {{< /code-block >}}
- Un archivo de entorno similar a:
    {{< code-block lang="bash" filename="/etc/default/observability-pipelines-worker" >}}
    DD_API_KEY=<datadog_api_key>
    DD_SITE=<dd_site>
    DD_OP_PIPELINE_ID=<pipeline_id>
    {{< /code-block >}}
- Un directorio de datos: `/var/lib/observability-pipelines-worker`

### Configurar el Worker adicional

Para este ejemplo se creó otro pipeline con la fuente Fluent. Para configurar un Worker para este pipeline:

1. Ejecuta el siguiente comando para crear un nuevo directorio de datos, sustituyendo `op-fluent` por un nombre de directorio que se ajuste a tu caso de uso:
    ```shell
    sudo mkdir /var/lib/op-fluent
    ```
1. Ejecuta el siguiente comando para cambiar el propietario del directorio de datos a `observability-pipelines-worker:observability-pipelines-worker`. Asegúrate de actualizar `op-fluent` con el nombre de tu directorio de datos.
    ```
    sudo chown -R observability-pipelines-worker:observability-pipelines-worker /var/lib/op-fluent/
    ```
1. Crea un archivo de entorno para el nuevo servicio systemd, como `/etc/default/op-fluent`, donde `op-fluent` se sustituye por tu nombre de archivo específico. Ejemplo del contenido del archivo:
    {{< code-block lang="bash" filename="/etc/default/op-fluent" >}}
    DD_API_KEY=<datadog_api_key>
    DD_OP_PIPELINE_ID=<pipeline_id>
    DD_SITE=<dd_site>
    <destintation_environment_variables>
    DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091
    DD_OP_DATA_DIR=/var/lib/op-fluent
    {{< /code-block >}}
    En este ejemplo:
    -  `DD_OP_DATA_DIR` está configurado como `/var/lib/op-fluent`. Sustituye `/var/lib/op-fluent` por la ruta a tu directorio de datos.
    - `DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091` es la variable de entorno necesaria para la fuente Fluent de este ejemplo. Sustitúyela por la [variable de entorno][2] de tu fuente.

    Además, asegúrate de sustituir:
    - `<datadog_api_key>` por tu [clave de API Datadog][3].
    - `<pipeline_id>` por el ID del [pipeline][1] de este Worker.
    - `<dd_site>` por tu [sitio Datadog][4].
    - `<destination_environment_variables>` por las [variables de entorno][2] de tus destinos.
1. Crea una nueva entrada de servicio systemd, como `/lib/systemd/system/op-fluent.service`. Ejemplo de contenido de la entrada:
    {{< code-block lang="bash" filename="/lib/systemd/system/op-fluent.service" >}}
    [Unidad]
    Description="OPW for Fluent Pipeline"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Servicio]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/op-fluent

    [Instalar]
    WantedBy=multi-user.target
    {{< /code-block >}}
    En este ejemplo:
    - El nombre del servicio es `op-fluent`, ya que el pipeline está utilizando la fuente Fluent. Sustituye `op-fluent.service` por un nombre de servicio para tu caso de uso.
    - La `Description` es `OPW for Fluent pipeline`. Sustituye `OPW for Fluent pipeline` por una descripción para tu caso de uso.
    - `EnvironmentFile` se configura como `-/etc/default/op-fluent`. Sustituye `-/etc/default/op-fluent` por el archivo de variables de entorno del servicio systemd que creaste para tu Worker.
1. Ejecuta este comando para volver a cargar systemd:
    ```shell
    sudo systemctl daemon-reload
    ```
1. Ejecuta este comando para iniciar el nuevo servicio:
    ```shell
    sudo systemctl enable --now op-fluent
    ```
1. Ejecuta este comando para comprobar que el servicio se está ejecutando:
    ```shell
    sudo systemctl status op-fluent
    ```

Además, puedes utilizar el comando `sudo journalctl -u op-fluent.service` para ayudarte a corregir cualquier problema.

## Desplegar el pipeline

1.  Ve a la página Instalar del pipeline adicional.
1.  En la sección **Deploy your pipeline** (Desplegar tu pipeline), deberías ver tu Worker adicional detectado. Haz clic en **Deploy** (Desplegar).

[1]: https://docs.datadoghq.com/es/observability_pipelines/set_up_pipelines/?tab=pipelineui
[2]: https://docs.datadoghq.com/es/observability_pipelines/environment_variables/?tab=sources
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.datadoghq.com/es/getting_started/site/

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}