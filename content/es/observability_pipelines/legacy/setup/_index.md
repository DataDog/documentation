---
aliases:
- /es/getting_started/observability_pipelines/
- /es/observability_pipelines/installation/
- /es/observability_pipelines/setup/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: Documentación
  text: Trabajo con datos en pipelines de observabilidad
- link: /observability_pipelines/legacy/production_deployment_overview/
  tag: Documentación
  text: Principios y diseño del despliegue para el worker de pipelines de observabilidad
- link: /observability_pipelines/legacy/architecture/
  tag: Documentación
  text: Principios y diseño del despliegue para el worker de pipelines de observabilidad
- link: https://dtdg.co/d22op
  tag: Centro de aprendizaje
  text: Procesamiento local seguro y protegido con pipelines de observabilidad
title: (LEGACY) Configurar el worker de pipelines de observabilidad
type: multi-code-lang
---

{{% observability_pipelines/legacy_warning %}}

## Información general

El [worker de pipelines de observabilidad][1] puede recopilar, procesar y enrutar logs desde cualquier origen a cualquier destino. Con Datadog, puedes crear y gestionar todos tus despliegues del worker de pipelines de observabilidad a escala.

Hay varias formas de comenzar a usar el worker de pipelines de observabilidad.

- [Inicio rápido](#quickstart): instala el worker con un pipeline simple que emite datos de demostración para comenzar de forma rápida.
- [Guía de configuración de Datadog][2]: instala el worker con un pipeline listo para usar a fin de recibir y enrutar datos desde tus Datadog Agents a Datadog.
- [Guía de configuración de archivado de Datadog][3]: instala el worker con un pipeline listo para usar a fin de recibir y enrutar datos desde tus Datadog Agents a Datadog y S3.
- [Guía de configuración de Splunk][4]: instala el worker con un pipeline listo para usar a fin de recibir y enrutar datos desde Splunk HEC a Splunk y Datadog.

Este documento te guiará a través de los pasos de instalación de inicio rápido y luego te proporcionará recursos para los próximos pasos. El uso y el funcionamiento de este software se rigen por el [acuerdo de licencia de usuario final][5].

## Modos de despliegue

{{% op-deployment-modes %}}

## Requisitos previos

Para instalar el worker de pipelines de observabilidad, necesitarás lo siguiente:

- Una [clave de API de Datadog][7] válida.
- Un ID de pipeline.

Para generar una clave de API y pipeline nuevos:

1. Ve a [Observability Pipelines][6] (Pipelines de observabilidad).
2. Haz clic en **New Pipeline** (Pipeline nuevo).
3. Ingresa un nombre para tu pipeline.
4. Haz clic en **Next** (Siguiente).
4. Selecciona la plantilla que quieras y sigue las instrucciones.

## Inicio rápido

Sigue las siguientes instrucciones para instalar el worker y despliega una configuración de pipeline de muestra que use datos de demostración.

### Instalar el worker de pipelines de observabilidad

{{< tabs >}}
{{% tab "Docker" %}}

La imagen de Docker del worker de pipelines de observabilidad se publica en Docker Hub [aquí][1].

1. Descarga el [archivo de configuración del pipeline de muestra][2]. Esta configuración emite datos de demostración, analiza y estructura los datos y, a continuación, los envía a la consola y Datadog. Consulta [Configuraciones][3] para obtener más información sobre el origen, la transformación y el receptor que se usa en la configuración de muestra.

2. Ejecuta el siguiente comando para iniciar el worker de pipelines de observabilidad con Docker:

    ```shell
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```

    Reemplaza `<API_KEY>` con tu clave de API de Datadog, `<PIPELINES_ID>` con tu ID de configuración de pipelines de observabilidad y `<SITE>` con {{< region-param key="dd_site" code="true" >}}. **Nota**: `./pipeline.yaml` debe ser la ruta relativa o absoluta a la configuración que descargaste en el paso 1.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/quickstart/pipeline.yaml
[3]: /es/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Descarga el [archivo de valores del Helm chart][1] para AWS EKS. Consulta [Configuraciones][2] para obtener más información sobre el origen, la transformación y el receptor que se usa en la configuración de muestra.

2. En el Helm chart, reemplaza los valores `datadog.apiKey` y `datadog.pipelineId` a fin de que coincidan con tu pipeline y usa {{< region-param key="dd_site" code="true" >}} para el valor `site`. Luego, instálalo en tu clúster con los siguientes comandos:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
        opw datadog/observability-pipelines-worker \
        -f aws_eks.yaml
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/aws_eks.yaml
[2]: /es/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Descarga el [archivo de valores del Helm chart][1] para Azure AKS. Consulta [Configuraciones][2] para obtener más información sobre el origen, la transformación y el receptor que se usa en la configuración de muestra.

2. En el Helm chart, reemplaza los valores `datadog.apiKey` y `datadog.pipelineId` a fin de que coincidan con tu pipeline y usa {{< region-param key="dd_site" code="true" >}} para el valor `site`. Luego, instálalo en tu clúster con los siguientes comandos:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
      opw datadog/observability-pipelines-worker \
      -f azure_aks.yaml
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/azure_aks.yaml
[2]: /es/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Descarga el [archivo de valores del Helm chart][1] para Google GKE. Consulta [Configuraciones][2] para obtener más información sobre el origen, la transformación y el receptor que se usa en la configuración de muestra.

2. En el Helm chart, reemplaza los valores `datadog.apiKey` y `datadog.pipelineId` a fin de que coincidan con tu pipeline y usa {{< region-param key="dd_site" code="true" >}} para el valor `site`. Luego, instálalo en tu clúster con los siguientes comandos:

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
      opw datadog/observability-pipelines-worker \
      -f google_gke.yaml
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/google_gke.yaml
[2]: /es/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Linux basado en APT" %}}

Instala el worker con el script de instalación de una línea o de forma manual.
#### Script de instalación de una línea

1. Ejecuta el comando de instalación de una línea para instalar el worker. Reemplaza `<DD_API_KEY>` con tu clave de API de Datadog, `<PIPELINES_ID>` con tu ID de pipelines de observabilidad y `<SITE>` con {{< region-param key="dd_site" code="true" >}}.

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker1.sh)"
    ```

2. Descarga el [archivo de configuración de muestra][1] en `/etc/observability-pipelines-worker/pipeline.yaml` en el host. Consulta [Configuraciones][2] para obtener más información sobre el origen, la transformación y el receptor que se usa en la configuración de muestra.

3. Inicia el worker:

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

#### Instalación manual

1. Ejecuta los siguientes comandos a fin de configurar APT para descargar a través de HTTPS:

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Ejecuta los siguientes comandos para configurar el repositorio `deb` de Datadog en tu sistema y crear un conjunto de claves de archivo de Datadog:

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Ejecuta los siguientes comandos para actualizar tu repositorio `apt` local e instalar el worker:

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. Añade tus claves y el sitio ({{< region-param key="dd_site" code="true" >}}) a las variables de entorno del worker:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

5. Descarga el [archivo de configuración de muestra][1] en `/etc/observability-pipelines-worker/pipeline.yaml` en el host.

6. Inicia el worker:

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
[2]: /es/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Linux basado en RPM" %}}

Instala el worker con el script de instalación de una línea o de forma manual.

#### Script de instalación de una línea

1. Ejecuta el comando de instalación de una línea para instalar el worker. Reemplaza `<DD_API_KEY>` con tu clave de API de Datadog, `<PIPELINES_ID>` con tu ID de pipelines de observabilidad y `<SITE>` con {{< region-param key="dd_site" code="true" >}}.

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker1.sh)"
    ```

2. Descarga el [archivo de configuración de muestra][1] en `/etc/observability-pipelines-worker/pipeline.yaml` en el host. Consulta [Configuraciones][2] para obtener más información sobre el origen, la transformación y el receptor que se usa en la configuración de muestra.

3. Ejecuta el siguiente comando para iniciar el worker:

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

#### Instalación manual

1. Ejecuta los siguientes comandos para configurar el repositorio `rpm` de Datadog en tu sistema:

    ```
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-1/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    EOF
    ```

   **Nota:** Si ejecutas RHEL 8.1 o CentOS 8.1, usa `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` en la configuración anterior.

2. Actualiza tus paquetes e instala el worker:

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. Añade tus claves y el sitio ({{< region-param key="dd_site" code="true" >}}) a las variables de entorno del worker:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

4. Descarga el [archivo de configuración de muestra][1] en `/etc/observability-pipelines-worker/pipeline.yaml` en el host. Consulta [Configuraciones][2] para obtener más información sobre el origen, la transformación y el receptor que se usa en la configuración de muestra.

5. Ejecuta el siguiente comando para iniciar el worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/pipeline.yaml
[2]: /es/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. Descarga la [configuración de muestra][1]. 
1. Configura el módulo del worker en tu Terraform existente con la configuración de muestra. Asegúrate de actualizar los valores en `vpc-id`, `subnet-ids` y `region` para que coincidan con tu despliegue de AWS en la configuración. Además, actualiza los valores en `datadog-api-key` y `pipeline-id` para que coincidan con tu pipeline.

Consulta [Configuraciones][2] para obtener más información sobre el origen, la transformación y el receptor que se usa en la configuración de muestra.

[1]: /resources/yaml/observability_pipelines/quickstart/terraform_opw.tf
[2]: /es/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{< /tabs >}}

Consulta [Trabajo con datos][8] para obtener más información sobre cómo transformar tus datos.

## Actualización de los modos de despliegue

{{% op-updating-deployment-modes %}}

## Siguientes pasos

Con la guía de inicio rápido aprendiste a instalar el worker y desplegar una configuración de pipeline de muestra. Para obtener instrucciones sobre cómo instalar el worker a fin de recibir y enrutar datos desde tus Datadog Agents a Datadog, o desde tu Splunk HEC a Splunk y Datadog, selecciona tu caso de uso específico:

{{< partial name="observability_pipelines/use_cases.html" >}}

Para obtener recomendaciones sobre cómo desplegar y escalar varios workers:

- Consulta [Principios y diseño del despliegue][9] para obtener información sobre lo que debes tener en cuenta al diseñar tu arquitectura de pipelines de observabilidad.
- Consulta [Prácticas recomendadas para la arquitectura del aggregator de workers OP][10].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/legacy/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /es/observability_pipelines/legacy/setup/datadog/
[3]: /es/observability_pipelines/legacy/setup/datadog_with_archiving/
[4]: /es/observability_pipelines/legacy/setup/splunk/
[5]: https://www.datadoghq.com/legal/eula/
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /es/account_management/api-app-keys/#api-keys
[8]: /es/observability_pipelines/legacy/working_with_data/
[9]: /es/observability_pipelines/legacy/production_deployment_overview/
[10]: /es/observability_pipelines/legacy/architecture/