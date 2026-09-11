1. Haz clic en **Select API key** (Seleccionar clave de API) para elegir la clave de API de Datadog que quieres utilizar.
1. Ejecute el comando de un solo paso proporcionado en la interfaz de usuario para reinstalar el worker.

    **Nota**: Las variables de entorno utilizadas por el worker en `/etc/default/observability-pipelines-worker` no se actualizan en ejecuciones posteriores del script de instalación. Si se necesitan cambios, actualiza el archivo manualmente y reinicia el worker.

Si prefieres no utilizar el script de instalación de una línea, sigue estas instrucciones paso a paso:
1. Actualiza tus paquetes e instala la última versión de worker:
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. Añade tus variables de entorno de claves, sitio (por ejemplo `datadoghq.com` para US1), origen y destino actualizados al archivo de entorno del worker:
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Reinicia el worker:
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. Haz clic en **Navigate Back** (Volver atrás) para volver a la página de edición de pipelines de Observability Pipelines.
1. Haz clic en  **Deploy Changes** (Desplegar cambios).