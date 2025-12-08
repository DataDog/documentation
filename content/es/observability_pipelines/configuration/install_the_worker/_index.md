---
aliases:
- /es/observability_pipelines/install_the_worker/
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  tag: Documentación
  text: Configuraciones avanzadas del worker
- link: /observability_pipelines/monitoring_and_troubleshooting/worker_cli_commands/
  tag: Documentación
  text: Comandos de CLI del worker
- link: /observability_pipelines/guide/environment_variables/
  tag: Documentación
  text: Variable de entorno para fuentes, procesadores y componentes
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: Documentación
  text: Configurar pipelines
title: Instalar el Worker
---

## Información general

El worker de Observability Pipelines es un software que se ejecuta en tu entorno para agregar, procesar y enrutar tus logs de forma centralizada.

**Nota**: Si estás utilizando un proxy, consulta la opción `proxy` en [Opciones de bootstrap][1].

## Instalar el Worker

Si configuras tu pipeline utilizando la [API][6] o [Terraform][8], consulta [configuración de la API o pipeline de Terraform](#api-or-terraform-pipeline-setup) para conocer cómo instalar el worker.

Si configuras tu pipeline en la interfaz de usuario, consulta la [configuración de la interfaz de usuario de pipelines](#pipeline-ui-setup) para saber cómo instalar el worker.

### Configuración de la API o el pipeline de Terraform

Después de configurar tu pipeline utilizando la API o Terraform, sigue las instrucciones siguientes para instalar el worker para tu plataforma.

{{< tabs >}}
{{% tab "Docker" %}}

Ejecuta el siguiente comando para instalar el worker.

```shell
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
    -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
    -e DD_SITE=<DATADOG_SITE> \
    -e <SOURCE_ENV_VARIABLE> \
    -e <DESTINATION_ENV_VARIABLE> \
    -p 8088:8088 \
    datadog/observability-pipelines-worker run
```

Debes sustituir los parámetros por los siguientes valores:
- `<DATADOG_API_KEY>`: tu API de Datadog.
    - **Nota**: La clave de API debe estar [habilitada para Remote Configuration][1].
- `<PIPELINE_ID>`: el ID de tu pipeline.
- `<DATADOG_SITE>`: el [sitio de Datadog][2].
- `<SOURCE_ENV_VARIABLE>`: las variables de entorno requeridas por la fuente que estás utilizando para tu pipeline.
    - Por ejemplo: `DD_OP_SOURCE_DATADOG_AGENT_ADDRESS=0.0.0.0:8282`
    - Consulta [Variables de entorno][3] para obtener una lista de las variables de entorno de fuente.
- `<DESTINATION_ENV_VARIABLE>`: las variables de entorno requeridas por los destinos que estás utilizando para tu pipeline.
    - Por ejemplo: `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL=https://hec.splunkcloud.com:8088`
    - Consulta las [Variables de entorno][3] para obtener una lista de las variables de entorno de destino.

**Nota**: Por defecto, el comando `docker run` expone el mismo puerto en el que el worker está escuchando. Si deseas asignar el puerto del contenedor del worker a un puerto diferente en el host de Docker, utiliza la opción `-p | --publish` en el comando:
```
-p 8282:8088 datadog/observability-pipelines-worker run
```

Consulta [Actualizar pipelines existentes][3] si deseas realizar cambios en la configuración de tu pipeline.

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: /es/getting_started/site/
[3]: /es/observability_pipelines/environment_variables/

{{% /tab %}}
{{% tab "Kubernetes" %}}

El worker de Observability Pipelines es compatible con las principales distribuciones de Kubernetes, como:

- Amazon Elastic Kubernetes Service (EKS)
- Azure Kubernetes Service (AKS)
- Google Kubernetes Engine (GKE)
- Red Hat Openshift
- Rancher

1. Descarga el [archivo de valores del Helm chart][1]. Consulta la [lista completa de opciones de configuración][5] disponibles.
    - Si no estás utilizando un servicio gestionado, consulta [Clústeres autoalojados y autogestionados de Kubernetes](#self-hosted-and-self-managed-kubernetes-clusters) antes de continuar con el siguiente paso.
1. Añade el repositorio de gráficos de Datadog a Helm:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    Si ya dispones del repositorio de gráficos de Datadog, ejecuta el siguiente comando para asegurarte de que está actualizado:
    ```shell
    helm repo update
    ```
1. Ejecuta el siguiente comando para instalar el worker.

    ```shell
    helm upgrade --install opw \
    -f values.yaml \
    --set datadog.apiKey=<DATADOG_API_KEY> \
    --set datadog.pipelineId=<PIPELINE_ID> \
    --set <SOURCE_ENV_VARIABLES> \
    --set <DESTINATION_ENV_VARIABLES> \
    --set service.ports[0].protocol=TCP,service.ports[0].port=<SERVICE_PORT>,service.ports[0].targetPort=<TARGET_PORT> \
    datadog/observability-pipelines-worker
    ```

    Debes sustituir los parámetros por los siguientes valores:

    - `<DATADOG_API_KEY>`: tu API de Datadog.
        - **Nota**: La clave de API debe estar [habilitada para Remote Configuration][3].
    - `<PIPELINE_ID>`: el ID de tu pipeline.
    - `<SOURCE_ENV_VARIABLE>`: las variables de entorno requeridas por la fuente que estás utilizando para tu pipeline.
        - Por ejemplo: `--set env[0].name=DD_OP_SOURCE_DATADOG_AGENT_ADDRESS,env[0].value='0.0.0.0' \`
        - Consulta [Variables de entorno][4] para obtener una lista de las variables de entorno de fuente.
    - `<DESTINATION_ENV_VARIABLE>`: las variables de entorno requeridas por los destinos que estás utilizando para tu pipeline.
        - Por ejemplo: `--set env[1].name=DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL,env[2].value='https://hec.splunkcloud.com:8088' \`
        - Consulta las [Variables de entorno][4] para obtener una lista de las variables de entorno de destino.

    **Nota**: Por defecto, el servicio Kubernetes asigna el puerto entrante `<SERVICE_PORT>` al puerto en el que escucha el worker (`<TARGET_PORT>`). Si quieres asignar el puerto del pod del worker a un puerto entrante diferente del servicio Kubernetes, utiliza los siguientes valores `service.ports[0].port` y `service.ports[0].targetPort` en el comando:

    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```

Consulta [Actualizar pipelines existentes][5] si deseas realizar cambios en la configuración de tu pipeline.

#### Clústeres autoalojados y autogestionados de Kubernetes 

Si estás ejecutando un clúster autoalojado y autogestionado de Kubernetes, y has definido zonas con etiquetas (labels) de nodo utilizando `topology.kubernetes.io/zone`, entonces puedes utilizar el archivo de valores del Helm chart tal cual. Sin embargo, si no estás utilizando la etiqueta (label) `topology.kubernetes.io/zone`, necesitas actualizar la `topologyKey` en el archivo `values.yaml` para que coincida con la clave que estás utilizando. O si ejecutas tu instalación de Kubernetes sin zonas, elimina toda la sección `topology.kubernetes.io/zone`.

[1]: /resources/yaml/observability_pipelines/v2/setup/values.yaml
[2]: /es/observability_pipelines/update_existing_pipelines
[3]: https://app.datadoghq.com/organization-settings/remote-config/setup
[4]: /es/observability_pipelines/environment_variables/
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml

{{% /tab %}}
{{% tab "Linux" %}}

<div class="alert alert-warning">Para RHEL y CentOS, Observability Pipelines Worker es compatible con la versión 8.0 o posteriores.</div>

Sigue los pasos que se indican a continuación si quieres utilizar el script de instalación de una línea para instalar el Worker. De lo contrario, consulta [Instalar manualmente el Worker en Linux](#manually-install-the-worker-on-linux).

Ejecuta el comando de un paso para instalar el worker.

```bash
DD_API_KEY=<DATADOG_API_KEY> DD_OP_PIPELINE_ID=<PIPELINE_ID> DD_SITE=<DATADOG_SITE> <SOURCE_ENV_VARIABLE> <DESTINATION_ENV_VARIABLE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker2.sh)"
```

Debes sustituir los parámetros por los siguientes valores:

- `<DATADOG_API_KEY>`: tu API de Datadog.
    - **Nota**: La clave de API debe estar [habilitada para Remote Configuration][1].
- `<PIPELINE_ID>`: el ID de tu pipeline.
- `<DATADOG_SITE>`: el [sitio de Datadog][2].
- `<SOURCE_ENV_VARIABLE>`: las variables de entorno requeridas por la fuente que estás utilizando para tu pipeline.
    - Por ejemplo: `DD_OP_SOURCE_DATADOG_AGENT_ADDRESS=0.0.0.0:8282`
    - Consulta [Variables de entorno][3] para obtener una lista de las variables de entorno de fuente.
- `<DESTINATION_ENV_VARIABLE>`: las variables de entorno requeridas por los destinos que estás utilizando para tu pipeline.
    - Por ejemplo: `DD_OP_DESTINATION_SPLUNK_HEC_ENDPOINT_URL=https://hec.splunkcloud.com:8088`
    - Consulta las [Variables de entorno][3] para obtener una lista de las variables de entorno de destino.

**Nota**: Las variables entorno utilizadas por el Worker en `/etc/default/observability-pipelines-worker` no se actualizan en ejecuciones posteriores del script de instalación. Si se necesitan cambios, actualice el archivo manualmente y reinicie el Worker.

Consulta [Actualizar pipelines existentes][4] si deseas realizar cambios en la configuración de tu pipeline.

[1]: https://app.datadoghq.com/organization-settings/remote-config/setup
[2]: /es/getting_started/site/
[3]: /es/observability_pipelines/environment_variables/
[4]: /es/observability_pipelines/update_existing_pipelines

{{% /tab %}}
{{% tab "CloudFormation" %}}

1. Selecciona una de las opciones del menú desplegable para proporcionar el volumen previsto de logs para el pipeline:
| Opción | Descripción |
| ---------- | ----------- |
| Utiliza esta opción si no puedes proyectar el volumen de logs o si deseas testear el worker. Esta opción aprovisiona el grupo EC2 Auto Scaling con un máximo de 2 instancias `t4g.large` de propósito general. |
| 1 a 5 TB/día | Esta opción aprovisiona el grupo EC2 Auto Scaling con un máximo de 2 instancias optimizadas para computación `c6g.large`. |
| 5 a 10 TB/día | Esta opción aprovisiona el grupo EC2 Auto Scaling con un mínimo de 2 y un máximo de 5 instancias `c6g.large` optimizadas para computación. |
| >10 TB/día | Datadog recomienda esta opción para grandes despliegues de producción. Aprovisiona el grupo EC2 Auto Scaling con un mínimo de 2 y un máximo de 10 instancias `c6g.xlarge` optimizadas para computación. |

    **Nota**: Todos los demás parámetros están configurados con valores predeterminados razonables para un despliegue del worker, pero puedes ajustarlos a tu caso de uso según sea necesario en la consola de AWS antes de crear el stack tecnológico.
1. Selecciona la región de AWS que deseas utilizar para instalar el worker.
1. Haz clic en **Select API key** (Seleccionar clave de API) para elegir la clave de API Datadog que quieres utilizar.
    - **Nota**: La clave de API debe estar [habilitada para Remote Configuration][7002].
1. Haz clic en **Launch CloudFormation Template** (Iniciar plantilla de CloudFormation) para ir a la consola de AWS, revisar la configuración del stack tecnológico y luego iniciarlo. Asegúrate de que los parámetros de CloudFormation son los esperados.
1. Selecciona la VPC y la subred que deseas utilizar para instalar el worker.
1. Revisa y comprueba las casillas de los permisos necesarios para IAM. Haz clic en **Submit** (Enviar) para crear el stack tecnológico. En este punto, CloudFormation se encarga de la instalación: se inician las instancias del worker, se descarga el software necesario y el worker se inicia automáticamente.

Consulta [Actualizar pipelines existentes][1] si quieres realizar cambios en la configuración de tu pipeline.

[1]: /es/observability_pipelines/update_existing_pipelines

{{% /tab %}}
{{< /tabs >}}

### Configuración de la interfaz de usuario de pipeline

{{< img src="observability_pipelines/install_page.png" alt="Página de instalación en la interfaz de usuario, con un menú desplegable para seleccionar tu plataforma de instalación y tus campos para ingresar variables" style="width:100%;" >}}

Una vez configurados la fuente, los destinos y los procesadores en la página de Creación de la interfaz de usuario del pipeline, sigue los pasos de la página Instalar para instalar el worker.

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

<div class="alert alert-danger">Para RHEL y CentOS, el worker de Observability Pipelines es compatible con las versiones 8.0 o posteriores.</div>

Sigue los pasos que se indican a continuación si quieres utilizar el script de instalación de una línea para instalar el Worker. De lo contrario, consulta [Instalar manualmente el Worker en Linux](#manually-install-the-worker-on-linux).

1. Haz clic en **Select API key** (Seleccionar clave de API) para elegir la clave de API Datadog que quieres utilizar.
    - **Nota**: La clave de API debe estar [habilitada para Remote Configuration][2].
1. Ejecuta el comando de un solo paso proporcionado en la interfaz de usuario para instalar el Worker.

    **Nota**: Las variables de entorno utilizadas por el Worker en `/etc/default/observability-pipelines-worker` no se actualizan en ejecuciones posteriores del script de instalación. Si se necesitan cambios, actualiza el archivo manualmente y reinicia el Worker.
1. Vuelve a la página de instalación de Observability Pipelines y haz clic en **Deploy** (Desplegar).

Consulta [Actualizar pipelines existentes][1] si quieres realizar cambios en la configuración de tu pipeline.

[1]: /es/observability_pipelines/configuration/update_existing_pipelines
[2]: https://app.datadoghq.com/organization-settings/remote-config/setup

{{% /tab %}}
{{% tab "ECS Fargate" %}}

Consulta [Configurar el worker en ECS Fargate][1] para obtener instrucciones.

[1]: /es/observability_pipelines/guide/set_up_the_worker_in_ecs_fargate/

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
1. Ejecuta los siguientes comandos para configurar el repositorio `deb` de Datadog en tu sistema y crear un conjunto de claves del archivo de Datadog:
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

[1]: /es/observability_pipelines/configuration/update_existing_pipelines

{{% /tab %}}
{{% tab "RPM" %}}

<div class="alert alert-danger">Para RHEL y CentOS, el worker de Observability Pipelines es compatible con las versiones 8.0 o posteriores.</div>

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

**Nota**: Las variables entorno utilizadas por el Worker en `/etc/default/observability-pipelines-worker` no se actualizan en ejecuciones posteriores del script de instalación. Si se necesitan cambios, actualice el archivo manualmente y reinicie el Worker.

Consulta [Actualizar pipelines existentes][1] si quieres realizar cambios en la configuración de tu pipeline.

[1]: /es/observability_pipelines/configuration/update_existing_pipelines

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

[1]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[2]: /es/observability_pipelines/sources/
[3]: /es/observability_pipelines/destinations/
[4]: /es/observability_pipelines/processors/
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /es/api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /es/observability_pipelines/guide/environment_variables/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline