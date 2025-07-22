<div class="alert alert-warning">Para RHEL y CentOS, el Observability Pipelines Worker es compatible con las versiones 8.0 o posteriores.</div>

1. Haz clic en **Select API key (Seleccionar clave de API)** para elegir la clave de API de Datadog que quieres usar.
1. Ejecuta el comando de un solo paso proporcionado en la interfaz para instalar el Worker.

   **Nota**: Las variables de entorno usadas por el Worker en `/etc/default/observability-pipelines-worker` no se actualizan en las ejecuciones posteriores del script de instalación. Si se necesitan cambios, considera actualizar el archivo manualmente y reiniciar el Worker.

Si prefieres no utilizar el script de instalación de una línea, sigue estas instrucciones paso a paso:
1. Configura el repositorio de Datadog `rpm` en tu sistema con el siguiente comando. **Nota**: Si estás ejecutando RHEL 8.1 o CentOS 8.1, utiliza `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` en la configuración a continuación.
    ```shell
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-2/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
        https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
    EOF
    ```
1. Actualiza tus paquetes e instala el Worker:
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. Añade tus claves, sitio (por ejemplo, `datadoghq.com` para US1), fuente y variables de entorno de destino al archivo de entorno del Worker:
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Inicia el Worker:
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. Vuelve a la página de instalación de Observability Pipelines y haz clic en **Deply (Desplegar)**.

Si quieres realizar cambios en la configuración de tu pipeline, consulta [Actualizar pipelines existentes][9001].

[9001]: /observability_pipelines/update_existing_pipelines
