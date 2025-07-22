1. Haz clic en **Select API key (Seleccionar clave de API)** para elegir la clave de API de Datadog que quieres usar.
1. Ejecuta el comando de un solo paso proporcionado en la interfaz para instalar el Worker.

   **Nota**: Las variables de entorno usadas por el Worker en `/etc/default/observability-pipelines-worker` no se actualizan en las ejecuciones posteriores del script de instalación. Si se necesitan cambios, considera actualizar el archivo manualmente y reiniciar el Worker.

Si prefieres no utilizar el script de instalación de una línea, sigue estas instrucciones paso a paso:
1. Configura el transporte APT para descargar mediante HTTPS:
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```
1. Ejecuta los siguientes comandos para configurar el repositorio Datadog `deb` en tu sistema y crear un anillo de claves de archivo de Datadog:
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-2' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```
1. Ejecuta los siguientes comandos para actualizar tu repositorio local `apt` e instalar el Worker:
    ```shell
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```
1. Añade tus claves, sitio (por ejemplo, `datadoghq.com` para US1), fuente y variables de entorno de destino al archivo de entorno del Worker:
    ```shell
    sudo cat <<EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<DATADOG_API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<DATADOG_SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Inicia el Worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

Si quieres realizar cambios en la configuración de tu pipeline, consulta [Actualizar pipelines existentes][9001].

[9001]: /observability_pipelines/update_existing_pipelines
