<div class="alert alert-danger">Para RHEL y CentOS, el worker de Observability Pipelines es compatible con las versiones 8.0 o posteriores.</div>

1. Haz clic en **Select API key** (Seleccionar clave de API) para elegir la clave de API de Datadog que quieres utilizar.
1. Ejecuta el comando de un solo paso proporcionado en la interfaz de usuario para instalar el worker.

    **Nota**: Las variables de entorno utilizadas por el worker en `/etc/default/observability-pipelines-worker` no se actualizan en ejecuciones posteriores del script de instalación. Si se necesitan cambios, actualiza el archivo manualmente y reinicia el worker.

Si prefieres no utilizar el script de instalación de una línea, sigue estas instrucciones paso a paso:
1. Configura el repositorio de Datadog `rpm` en tu sistema con el siguiente comando. **Nota**: Si estás ejecutando RHEL 8.1 o CentOS 8.1, utiliza `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` en la configuración.
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
1. Actualiza tus paquetes e instala el worker:
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. Añade tus variables de entorno de claves, sitio (por ejemplo, `datadoghq.com` para US1), fuente y destino al archivo entorno del worker:
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Inicia el worker:
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. Vuelve a la página de instalación de Observability Pipelines y haz clic en **Deploy** (Desplegar).

Consulta [Actualizar pipelines existentes][9001] si deseas realizar cambios en tu configuración del pipeline.

[9001]: /es/observability_pipelines/update_existing_pipelines