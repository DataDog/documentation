1. Haz clic en **Select API key (Seleccionar clave de API)** para elegir la clave de API de Datadog que quieres usar.
1. Ejecuta el comando proporcionado en la UI para instalar el Worker. El comando se rellena automáticamente con las variables de entorno introducidas anteriormente.
    ```shell
    docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
        -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
        -e DD_SITE=<DATADOG_SITE> \
        -e <SOURCE_ENV_VARIABLE> \
        -e <DESTINATION_ENV_VARIABLE> \
        -p 8088:8088 \
        datadog/observability-pipelines-worker run
    ```   
   **Nota**: Por defecto, el comando `docker run` expone el mismo puerto en el que está escuchando el Worker. Si desea asignar el puerto del contenedor del Worker a un puerto diferente en el host Docker, utilice la opción `-p | --publish` en el comando:
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
1. Vuelve a la página de instalación de Observability Pipelines y haz clic en **Deply (Desplegar)**.

Si quieres realizar cambios en la configuración de tu pipeline, consulta [Actualizar pipelines existentes][8001].

[8001]: /observability_pipelines/update_existing_pipelines
