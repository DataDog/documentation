1. Haz clic en **Select API key** (Seleccionar clave de API) para elegir la clave de API Datadog que quieres utilizar.
1. Ejecuta el comando proporcionado en la interfaz de usuario para instalar el Worker. El comando se rellena automáticamente con las variables de entorno que introdujiste anteriormente.
    ```shell
    docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
        -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
        -e DD_SITE=<DATADOG_SITE> \
        -e <SOURCE_ENV_VARIABLE> \
        -e <DESTINATION_ENV_VARIABLE> \
        -p 8088:8088 \
        datadog/observability-pipelines-worker run
    ```
    **Nota**: Por defecto, el comando `docker run` expone el mismo puerto en el que escucha el Worker. Si quieres asignar el puerto del contenedor del Worker a un puerto diferente en el host Docker, utiliza la opción `-p | --publish`:
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
1. Haz clic en **Navigate Back** (Navegar hacia atrás) para volver a la página de edición de Observability Pipelines.
1. Haz clic en **Deploy Changes** (Desplegar cambios).