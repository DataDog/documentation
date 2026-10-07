1. Haz clic en **Select API key** (Seleccionar clave de API) para elegir la clave de API de Datadog que deseas utilizar.
1. Ejecuta el comando proporcionado en la interfaz de usuario para instalar el worker. El comando se rellena automáticamente con las variables de entorno que introdujiste anteriormente.
    ```shell
    docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
        -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
        -e DD_SITE=<DATADOG_SITE> \
        -e <SOURCE_ENV_VARIABLE> \
        -e <DESTINATION_ENV_VARIABLE> \
        -p 8088:8088 \
        datadog/observability-pipelines-worker run
    ```   
    **Nota**: Por defecto, el comando `docker run` expone el mismo puerto en el que escucha el worker. Si quieres asignar el puerto del contenedor del worker a un puerto diferente en el host Docker, utiliza la opción `-p | --publish` en el comando:
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
1. Vuelve a la página de instalación de Observability Pipelines y haz clic en **Deploy** (Desplegar).

Si quieres realizar cambios en la configuración de tu pipeline, consulta [Actualizar pipelines existentes][8001].

[8001]: /es/observability_pipelines/update_existing_pipelines