---
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines#set-up-a-pipeline
  tag: Documentación
  text: Configurar pipelines
- link: observability_pipelines/worker_commands/
  tag: Documentación
  text: Comandos del Worker
title: Instalar el Worker
---

## Información general

El Observability Pipelines Worker es un software que se ejecuta en tu entorno para agregar, procesar y enrutar de forma centralizada tus logs. Instala y configura el Worker como parte del proceso de configuración del pipeline. Estos son los pasos generales para configurar un pipeline en la interfaz de usuario:

1. Selecciona una [fuente][2] de logs.
1. Selecciona los [destinos][3] a los que quieres enviar tus logs.
1. Selecciona y configura [procesadores][4] para transformar tus logs.
1. [Instala el Worker](#install-the-worker).
1. Despliega el pipeline.

**Nota**: Si estás utilizando un proxy, consulta la opción `proxy` en [Opciones de bootstrap][1].

## Instalar el Worker

Una vez configurados la fuente, los destinos y los procesadores en la página de Creación de la interfaz de usuario del pipeline, sigue los pasos de la página Instalar.

Si has configurado los componentes del pipeline utilizando la [API][6] o Terraform, para ir a la página Instalar:

1. Ve a [Observability Pipelines][5].
1. Selecciona tu pipeline.
1. Haz clic en **Latest Deployment & Setup** (Último despliegue y configuración).
1. Haz clic en **Worker Installation Steps** (Pasos de instalación del Worker).

{{< img src="observability_pipelines/install_page.png" alt="Página de instalación en la interfaz de usuario, con un menú desplegable para seleccionar tu plataforma de instalación y tus campos para ingresar variables" style="width:100%;" >}}

1. Selecciona la plataforma en la que quieres instalar el Worker.
1. Introduce las [variables de entorno][7] para tus fuentes y destinos, si corresponde.
1. Sigue las instrucciones de instalación del Worker para tu plataforma. El comando proporcionado en la interfaz de usuario para instalar el Worker tiene las variables de entorno pertinentes rellenadas.

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Kubernetes" %}}

{{% observability_pipelines/install_worker/kubernetes %}}

{{% /tab %}}
{{% tab "Linux" %}}

<div class="alert alert-warning">Para RHEL y CentOS, Observability Pipelines Worker es compatible con la versión 8.0 o posteriores.</div>

Sigue los pasos que se indican a continuación si quieres utilizar el script de instalación de una línea para instalar el Worker. De lo contrario, consulta [Instalar manualmente el Worker en Linux](#manually-install-the-worker-on-linux).

1. Haz clic en **Select API key** (Seleccionar clave de API) para elegir la clave de API Datadog que quieres utilizar.
1. Ejecuta el comando de un solo paso proporcionado en la interfaz de usuario para instalar el Worker.

    **Nota**: Las variables de entorno utilizadas por el Worker en `/etc/default/observability-pipelines-worker` no se actualizan en ejecuciones posteriores del script de instalación. Si se necesitan cambios, actualiza el archivo manualmente y reinicia el Worker.
1. Vuelve a la página de instalación de Observability Pipelines y haz clic en **Deploy** (Desplegar).

Consulta [Actualizar pipelines existentes][1] si quieres realizar cambios en la configuración de tu pipeline.

[1]: /es/observability_pipelines/update_existing_pipelines

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

### Instalar manualmente el Worker en Linux

Si prefieres no utilizar el script de instalación de una línea para Linux, sigue estas instrucciones paso a paso:

{{< tabs >}}
{{% tab "APT" %}}

1. Configura el transporte APT para la descarga mediante HTTPS:
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
1. Añade tus variables de entorno de claves, sitio (por ejemplo, `datadoghq.com` para US1), fuente y destino al archivo del entorno del Worker:
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

**Nota**: Las variables entorno utilizadas por el Worker en `/etc/default/observability-pipelines-worker` no se actualizan en ejecuciones posteriores del script de instalación. Si se necesitan cambios, actualice el archivo manualmente y reinicie el Worker.

Consulta [Actualizar pipelines existentes][1] si quieres realizar cambios en la configuración de tu pipeline.

[1]: /es/observability_pipelines/update_existing_pipelines

{{% /tab %}}
{{% tab "RPM" %}}

<div class="alert alert-warning">Para RHEL y CentOS, Observability Pipelines Worker es compatible con la versión 8.0 o posteriores.</div>

1. Configura el repositorio de Datadog `rpm` en tu sistema con el siguiente comando.<br>**Nota**: Si estás ejecutando RHEL v8.1 o CentOS v8.1, utiliza `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` en la configuración.
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
1. Añade tus variables de entorno de claves, sitio (por ejemplo, `datadoghq.com` para US1), fuente y destino al archivo del entorno del Worker:
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
1. Vuelve a la página de instalación de Observability Pipelines y haz clic en **Deploy** (Desplegar).

**Nota**: Las variables de entorno utilizadas por el Worker en `/etc/default/observability-pipelines-worker` no se actualizan en ejecuciones posteriores del script de instalación. Si se necesitan cambios, actualiza el archivo manualmente y reinicia el Worker.

Consulta [Actualizar pipelines existentes][1] si quieres realizar cambios en la configuración de tu pipeline.

[1]: /es/observability_pipelines/update_existing_pipelines

{{% /tab %}}
{{< /tabs >}}

## Actualizar al Worker

Para actualizar el Worker a la última versión, ejecuta el siguiente comando:

{{< tabs >}}
{{% tab "APT" %}}

```
sudo apt-get install --only-upgrade observability-pipelines-worker
```

{{% /tab %}}
{{% tab "RPM" %}}

```
sudo yum install --only-upgrade observability-pipelines-worker
```

{{% /tab %}}
{{< /tabs >}}


## Desinstalar el Worker

Si quieres desinstalar el Worker, ejecuta los siguientes comandos:

{{< tabs >}}
{{% tab "APT" %}}

```
sudo apt-get remove --purge observability-pipelines-worker
```

{{% /tab %}}
{{% tab "RPM" %}}

1.
    ```
    yum remove observability-pipelines-worker
    ```
1.
    ```
    rpm -q --configfiles observability-pipelines-worker
    ```

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/advanced_configurations/#bootstrap-options
[2]: /es/observability_pipelines/sources/
[3]: /es/observability_pipelines/destinations/
[4]: /es/observability_pipelines/processors/
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /es/api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /es/observability_pipelines/environment_variables/