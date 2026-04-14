---
aliases:
- /es/integrations/observability_pipelines/splunk
- /es/observability_pipelines/guide/setup_splunk_environment
- /es/observability_pipelines/setup/splunk/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: Documentación
  text: Trabajar con datos utilizando Observability Pipelines
- link: /observability_pipelines/legacy/configurations/
  tag: Documentación
  text: Más información sobre configuraciones de Observability Pipelines
- link: https://dtdg.co/d22op
  tag: Centro de aprendizaje
  text: Procesamiento local seguro con Observability Pipelines
title: (LEGACY) Configurar Observability Pipelines en tu entorno Splunk
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines no está disponible en el sitio US1-FED Datadog.</div>
{{< /site-region >}}

{{% observability_pipelines/legacy_warning %}}

<div class="alert alert-info">Observability Pipelines sólo es compatible con el protocolo del recopilador de eventos HTTP (HEC) de Splunk.</div>

## Información general

El [Worker de Observability Pipelines][1] puede recopilar, procesar y enviar logs desde cualquier origen a cualquier destino. Con Datadog, puedes crear y gestionar todos los despliegues de tu Worker de Observability Pipelines a escala.

Esta guía te guiará a través del despliegue del Worker en tu clúster de herramientas habituales y la configuración de Splunk para el envío de logs a Datadog a través del Worker mediante doble escritura.

{{< img src="observability_pipelines/guide/splunk/setup2.png" alt="Diagrama que muestra un par de heavy forwarders de Splunk enviando sus datos a través del agregador de Observability Pipelines." >}}

## Supuestos
* Estás utilizando un recopilador de logs compatible con el protocolo del recopilador de eventos HTTP (HEC) de Splunk.
* Tienes acceso de administrador a los recopiladores y al índice Splunk al que se enviarán los logs.
* Tienes acceso de administrador a los clústeres donde se va a desplegar el Worker de Observability Pipelines.
* Dispones de un clúster de herramientas frecuentes o de seguridad para tu entorno al que están conectados todos los demás clústeres.

## Requisitos previos
Antes de la instalación, asegúrate de que tienes:

* Una [clave de API Datadog][2] válida.
* Un ID de pipeline.

Puedes generar ambos en [Observability Pipelines][3].


### Requisitos específicos de los proveedores
{{< tabs >}}
{{% tab "Docker" %}}
Asegúrate de que tu máquina está configurada para ejecutar Docker.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Para ejecutar el Worker en tus nodos Kubernetes, necesitas un mínimo de dos nodos con una CPU y 512 MB de RAM disponibles. Datadog recomienda crear un grupo de nodos separado para los Workers, que es también la configuración recomendada para despliegues de producción.

* Se necesita el [controlador EBS CSI][1]. Para comprobar si está instalado, ejecuta el siguiente comando y busca `ebs-csi-controller` en la lista:

  ```shell
  kubectl get pods -n kube-system
  ```

* Se necesita `StorageClass` para que los Workers proporcionen los controladores EBS correctos. Para comprobar si ya está instalado, ejecuta el siguiente comando y busca `io2` en la lista:

  ```shell
  kubectl get storageclass
  ```

  Si `io2` no está presente, descarga el [YAML StorageClass][2] y `kubectl apply`.

* Se necesita el [controlador del balanceador de carga AWS][3]. Para comprobar si está instalado, ejecuta el siguiente comando y busca `aws-load-balancer-controller` en la lista:

  ```shell
  helm list -A
  ```
* Datadog recomienda utilizar una versión 1.16 o posterior de Amazon EKS.

Para conocer los requisitos a nivel de producción, consulta [Prácticas recomendadas para la arquitectura del agregador OPW][4].

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[4]: /es/observability_pipelines/legacy/architecture/

{{% /tab %}}
{{% tab "Azure AKS" %}}
Para ejecutar el Worker en tus nodos Kubernetes, necesitas un mínimo de dos nodos con una CPU y 512 MB de RAM disponibles. Datadog recomienda crear un grupo de nodos separado para los Workers, que es también la configuración recomendada para despliegues en producción.

Para conocer los requisitos a nivel de producción, consulta [Prácticas recomendadas para la arquitectura del agregador OPW][1].

[1]: /es/observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "Google GKE" %}}
Para ejecutar el Worker en tus nodos Kubernetes, necesitas un mínimo de dos nodos con una CPU y 512 MB de RAM disponibles. Datadog recomienda crear un grupo de nodos separado para los Workers, que es también la configuración recomendada para despliegues en producción.

Para conocer los requisitos a nivel de producción, consulta [Prácticas recomendadas para la arquitectura del agregador OPW][1].

[1]: /es/observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "Linux basado en APT" %}}
No existen requisitos específicos del proveedor para Linux basado en APT.
{{% /tab %}}
{{% tab "Linux basado en RPM" %}}
No hay requisitos específicos del proveedor para Linux basado en RPM.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Para ejecutar el Worker en su cuenta AWS, necesita acceso administrativo a esa cuenta. Recopila la siguiente información para ejecutar las instancias del Worker:
* El ID de VPC en el que se ejecutarán tus instancias.
* Los ID de subred en los que se ejecutarán tus instancias.
* La región AWS en la que se encuentra tu VPC.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">Por el momento, las instalaciones de CloudFormation solo admiten la configuración remota.</div>
<div class="alert alert-warning">Utiliza las instalaciones de CloudFormation solo para cargas de trabajo que no sean de producción.</div>

Para ejecutar el Worker en tu cuenta AWS, necesitas acceso administrativo a esa cuenta. Recopila la siguiente información para ejecutar las instancias del Worker:
* El ID de VPC en el que se ejecutarán tus instancias.
* Los ID de subred en los que se ejecutarán tus instancias.
* La región AWS en la que se encuentra tu VPC.
{{% /tab %}}
{{< /tabs >}}

## Configuración del índice Splunk

<div class="alert alert-info">Observability Pipelines admite las confirmaciones cuando activas el parámetro <strong>Activar confirmaciones del indexador</strong> en la entrada.</div>

Para recibir logs del Worker de Observability Pipelines, debes proporcionar una entrada HEC y un token HEC en el índice.


1. En Splunk, ve a **Settings** > **Data Inputs** (Configuración > Entradas de datos).
2. Añade una nueva entrada del recopilador de eventos HTTP y asígnale un nombre.
3. Selecciona los índices a los que quieres que se envíen los logs.

Después de añadir la entrada, Splunk crea un token para ti. El token suele tener el formato UUID. En las configuraciones de ejemplo proporcionadas en secciones posteriores de este artículo, añade este token a la configuración para que el Worker de Observability Pipelines pueda autenticarse.

## Instalación del Worker de Observability Pipelines

{{< tabs >}}
{{% tab "Docker" %}}

La imagen Docker del Worker de Observability Pipelines está publicada en Docker Hub [aquí][1].

1. Descarga el [ejemplo de archivo de configuración del pipeline][2].

2. Ejecuta el siguiente comando para iniciar el Worker de Observability Pipelines con Docker:
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -e SPLUNK_HEC_ENDPOINT=<SPLUNK_URL> \
      -e SPLUNK_TOKEN=<SPLUNK_TOKEN> \
      -p 8088:8088 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
   Sustituye `<API_KEY>` por tu clave de API Datadog, `<PIPELINES_ID>` por tu ID de configuración de Observability Pipelines y `<SITE>` por {{< region-param key="dd_site" code="true" >}}. Asegúrate de actualizar también `SPLUNK_HEC_ENDPOINT` y `SPLUNK_TOKEN` con valores que coincidan con el despliegue de Splunk que creaste en [Configuración del índice Splunk](#setting-up-the-splunk-index). `./pipeline.yaml` debe ser la ruta relativa o absoluta a la configuración que descargaste en el paso 1. 

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Descarga el [archivo de valores de Helm chart][1] para AWS EKS.

2. En el Helm chart, sustituye `datadog.apiKey` y `datadog.pipelineId` por sus valores respectivos y `<site>` por {{< region-param key="dd_site" code="true" >}}:
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```

3. Sustituye los valores de `SPLUNK_HEC_ENDPOINT` y `SPLUNK_HEC_TOKEN` para que coincidan con tu despliegue de Splunk, incluyendo el token que creaste en [Configuración del índice Splunk](#setting-up-the-splunk-index):
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```

4. Instala el Helm chart en tu clúster con los siguientes comandos:

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

[1]: /resources/yaml/observability_pipelines/splunk/aws_eks.yaml
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Descarga el [archivo de valores de Helm chart][1] para Azure AKS.

2. En el Helm chart, sustituye `datadog.apiKey` y `datadog.pipelineId` por sus valores respectivos y `<site>` por {{< region-param key="dd_site" code="true" >}}:
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```

3. Sustituye los valores de `SPLUNK_HEC_ENDPOINT` y `SPLUNK_HEC_TOKEN` para que coincidan con tu despliegue de Splunk, incluyendo el token que creaste en [Configuración del índice Splunk](#setting-up-the-splunk-index):
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```

4. Instala el Helm chart en tu clúster con los siguientes comandos:

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

[1]: /resources/yaml/observability_pipelines/splunk/azure_aks.yaml
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Descarga el [archivo de valores de Helm chart][1] para Google GKE.

2. En el Helm chart, sustituye `datadog.apiKey` y `datadog.pipelineId` por sus valores respectivos y `<site>` por {{< region-param key="dd_site" code="true" >}}:
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```

3. Sustituye los valores de `SPLUNK_HEC_ENDPOINT` y `SPLUNK_HEC_TOKEN` para que coincidan con tu despliegue de Splunk, incluyendo el token que creaste en [Configuración del índice Splunk](#setting-up-the-splunk-index):
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```

4. Instala el Helm chart en tu clúster con los siguientes comandos:

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

[1]: /resources/yaml/observability_pipelines/splunk/google_gke.yaml
{{% /tab %}}
{{% tab "Linux basado en APT" %}}
1. Ejecuta los siguientes comandos a fin de configurar APT para descargar a través de HTTPS:

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Ejecuta los siguientes comandos para configurar el repositorio Datadog `deb` en tu sistema y crear un anillo de claves de archivo de Datadog:

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Ejecuta los siguientes comandos para actualizar tu repositorio local `apt` e instalar el Worker:

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. Añade tus claves, el sitio ({{< region-param key="dd_site" code="true" >}}) y la información de Splunk a las variables de entorno del Worker:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    SPLUNK_HEC_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```

5. Descarga el [ejemplo de archivo de configuración][1] en `/etc/observability-pipelines-worker/pipeline.yaml` en el host.

6. Inicia el Worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
{{% /tab %}}
{{% tab "Linux basado en RPM" %}}
1. Ejecuta los siguientes comandos para configurar el repositorio Datadog `rpm` en tu sistema:

    ```
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-1/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
    EOF
    ```

   **Nota:** Si estás ejecutando RHEL 8.1 o CentOS 8.1, utiliza `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` en la configuración anterior.

2. Actualiza tus paquetes e instala el Worker:

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. Añade tus claves, el sitio ({{< region-param key="dd_site" code="true" >}}) y la información de Splunk a las variables de entorno del Worker:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    SPLUNK_HEC_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```

4. Descarga el [ejemplo de archivo de configuración][1] en `/etc/observability-pipelines-worker/pipeline.yaml` en el host.

5. Inicia el Worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Configura el módulo del Worker en tu Terraform existente utilizando este ejemplo de configuración. Actualiza los valores en `vpc-id`, `subnet-ids` y `region` para que coincidan con tu despliegue AWS. Actualiza los valores en `datadog-api-key` y `pipeline-id` para que coincidan con tu pipeline.

```
module "opw" {
    source     = "git::https://github.com/DataDog/opw-terraform//aws"
    vpc-id     = "{VPC ID}"
    subnet-ids = ["{SUBNET ID 1}", "{SUBNET ID 2}"]
    region     = "{REGION}"

    datadog-api-key = "{DATADOG API KEY}"
    pipeline-id = "{OP PIPELINE ID}"
    environment = {
      "SPLUNK_TOKEN": "<SPLUNK TOKEN>",
    }
    pipeline-config = <<EOT
sources:
  splunk_receiver:
    type: splunk_hec
    address: 0.0.0.0:8088
    valid_tokens:
        - $${SPLUNK_TOKEN}

transforms:
  ## This is a placeholder for your own remap (or other transform)
  ## steps with tags set up. Datadog recommends these tag assignments.
  ## They show which data has been moved over to OP and what still needs
  ## to be moved.
  LOGS_YOUR_STEPS:
    type: remap
    inputs:
      - splunk_receiver
    source: |
      .sender = "observability_pipelines_worker"
      .opw_aggregator = get_hostname!()

## This buffer configuration is split into 144GB buffers for both of the Datadog and Splunk sinks.
##
## This should work for the vast majority of OP Worker deployments and should rarely
## need to be adjusted. If you do change it, be sure to update the size the `ebs-drive-size-gb` parameter.
sinks:
  datadog_logs:
    type: datadog_logs
    inputs:
      - LOGS_YOUR_STEPS
    default_api_key: "$${DD_API_KEY}"
    compression: gzip
    buffer:
        type: disk
        max_size: 154618822656
  splunk_logs:
    type: splunk_hec_logs
    inputs:
      - LOGS_YOUR_STEPS
    endpoint: <SPLUNK HEC ENDPOINT>
    default_token: $${SPLUNK_TOKEN}
    encoding:
      codec: json
    buffer:
        type: disk
        max_size: 154618822656
EOT
}
```
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">Utiliza sólo instalaciones de CloudFormation para cargas de trabajo que no sean de nivel de producción.</div>

Para instalar el Worker en tu cuenta AWS, utiliza la plantilla de CloudFormation para crear un stack tecnológico:

  1. Descarga [la plantilla de CloudFormation][1] para el Worker.

  2. En la **consola CloudFormation**, haz clic en **Create stack* (Crear stack tecnológico) y selecciona la opción **Con nuevos recursos (estándar)**.

  3. Asegúrate de que la opción **Plantilla lista** está seleccionada. Haz clic en **Choose file** (Seleccionar archivo) y añade el archivo de plantilla de CloudFormation que descargaste anteriormente. Haz clic en **Next** (Siguiente).

  4. Introduce un nombre para el stack tecnológico en **Especificar detalles del stack tecnológico**.

  5. Rellena los parámetros de la plantilla de CloudFormation. Algunos requieren una atención especial:

      * Para `APIKey` y `PipelineID`, proporciona la clave y el ID que recopilaste anteriormente en la sección Requisitos previos.

      * Para el `SplunkToken`, proporciona el token que creaste anteriormente en tu índice Splunk.

     * Para `VPCID` y `SubnetIDs`, proporciona las subredes y la VPC que elegiste anteriormente.

      * Todos los demás parámetros están configurados con valores predeterminados razonables para un despliegue de Worker, pero puedes ajustarlos a tu caso de uso según sea necesario.

  6. Haz clic en **Next** (Siguiente).

  7. Revisa y asegúrate de que los parámetros son los esperados. Haz clic en las casillas de verificación de los permisos necesarios para IAM y luego haz clic en **Submit** (Enviar) para crear el stack tecnológico.

En este punto, CloudFormation se encarga de la instalación: se inician las instancias del Worker, que descargan automáticamente el software necesario y comienzan a ejecutarse.

[1]: /resources/yaml/observability_pipelines/cloudformation/splunk.yaml
{{% /tab %}}
{{< /tabs >}}

### Balanceo de carga

{{< tabs >}}
{{% tab "Docker" %}}
La configuración orientada a la producción no está incluida en las instrucciones de Docker. Es por ello que debes consultar las normas de tu empresa relativas el balanceo de carga en entornos en contenedores. Si estás realizando tests en tu máquina local, no es necesario que configures un balanceador de carga.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Utiliza los balanceadores de carga proporcionados por tu proveedor de nube.
Estos se ajustan en base a eventos de autoescalado para los que Helm está configurado por defecto. Los balanceadores de carga son internos,
por lo que sólo son accesibles dentro de tu red.

Utiliza la URL del balanceador de carga que te proporciona Helm cuando configuras tus recopiladores existentes.

Se utilizan balanceadores de carga de red (NLB) proporcionados por el [controlador del balanceador de carga de AWS][1].


Para obtener recomendaciones sobre el balanceador de carga cuando se escala el Worker, consulta [Planificación de la capacidad y escalado][2].

#### Balanceo de carga entre zonas de disponibilidad
La configuración de Helm proporcionada intenta simplificar el balanceo de carga, pero debes tener en cuenta las posibles implicaciones en los costes del tráfico entre zonas de disponibilidad. En la medida de lo posible, las muestras intentan evitar la creación de situaciones en las que puedan producirse múltiples saltos entre zonas de disponibilidad.

Las configuraciones de ejemplo no activan la función de balanceo de carga entre zonas, disponible en este controlador. Para activarla, añade la siguiente anotación al bloque de `service`:

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

Para obtener más información, consulta [Controlador del balanceador de carga AWS][3].

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: /es/observability_pipelines/legacy/architecture/capacity_planning_scaling/
[3]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}
{{% tab "Azure AKS" %}}
Utiliza los balanceadores de carga proporcionados por tu proveedor de nube.
Estos se ajustan en base a los eventos de escalado automático para los que Helm está configurado por defecto. Los balanceadores de carga son internos,
por lo que sólo son accesibles dentro de tu red.

Utiliza la URL del balanceador de carga que te proporciona Helm cuando configuras tus recopiladores existentes.

Para obtener recomendaciones sobre el balanceador de carga al escalar el Worker, consulta [Planificación de la capacidad y escalado][1].

#### Balanceo de carga entre zonas de disponibilidad
La configuración de Helm proporcionada intenta simplificar el balanceo de carga, pero debes tener en cuenta las posibles implicaciones en los costes del tráfico entre zonas de disponibilidad. En la medida de lo posible, las muestras intentan evitar la creación de situaciones en las que puedan producirse múltiples saltos entre zonas de disponibilidad.

[1]: /es/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Google GKE" %}}
Utiliza los balanceadores de carga proporcionados por tu proveedor de nube.
Estos se ajustan en base a los eventos de escalado automático para los que Helm está configurado por defecto. Los balanceadores de carga son internos,
por lo que sólo son accesibles dentro de tu red.

Utiliza la URL del balanceador de carga que te proporciona Helm cuando configuras tus recopiladores existentes.

Para obtener recomendaciones sobre el balanceador de carga al escalar el Worker, consulta [Planificación de la capacidad y escalado][1].

#### Balanceo de carga entre zonas de disponibilidad
La configuración de Helm proporcionada intenta simplificar el balanceo de carga, pero debes tener en cuenta las posibles implicaciones en los costes del tráfico entre zonas de disponibilidad. En la medida de lo posible, las muestras intentan evitar la creación de situaciones en las que puedan producirse múltiples saltos entre zonas de disponibilidad.

El Acceso global está activado por defecto, ya que es probable que su uso sea necesario en un clúster de herramientas compartidas.

[1]: /es/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "APT-based Linux" %}}
Dada la naturaleza de máquina única de la instalación, no se proporciona soporte integrado para el balanceo de carga. Tendrás que proporcionar tus propios balanceadores de carga, utilizando cualquiera que sea la norma de tu empresa.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
Dada la naturaleza de máquina única de la instalación, no se proporciona soporte integrado para el balanceo de carga. Tendrás que proporcionar tus propios balanceadores de carga, utilizando cualquiera que sea la norma de tu empresa.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
El módulo Terraform proporciona un balanceador de carga de red (NLB) para apuntar a las instancias. Su dirección DNS se devuelve en el resultado `lb-dns` en Terraform.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">Utiliza sólo instalaciones de CloudFormation para cargas de trabajo que no sean de nivel de producción.</div>

La plantilla de CloudFormation proporciona un balanceador de carga de red (NLB) para apuntar al grupo de AutoScaling. Su dirección DNS se devuelve en el resultado  Su dirección DNS se devuelve en el resultado `LoadBalancerDNS` en CloudFormation.
{{% /tab %}}
{{< /tabs >}}

### Almacenamiento en buffer
Observability Pipelines incluye múltiples estrategias de almacenamiento en buffer que te permiten aumentar la resiliencia de tu clúster ante fallos posteriores. Las configuraciones de ejemplo proporcionadas utilizan buffers de disco, cuyas capacidades están clasificadas para aproximadamente 10 minutos de datos a 10 Mbps/núcleo para despliegues de Observability Pipelines. Suele ser tiempo suficiente para que los problemas transitorios se resuelvan por sí solos o para que los responsables de responder en caso de incidentes decidan qué hay que hacer con los datos de observabilidad.

{{< tabs >}}
{{% tab "Docker" %}}
Por defecto, el directorio de datos del Worker de Observability Pipelines está configurado en `/var/lib/observability-pipelines-worker`. Asegúrate de que tu máquina host tiene una cantidad suficiente de capacidad de almacenamiento asignada al punto de montaje del contenedor.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Para AWS, Datadog recomienda utilizar la familia de controladores EBS `io2`. Como alternativa, también se pueden utilizar los controladores `gp3`.
{{% /tab %}}
{{% tab "Azure AKS" %}}
Para Azure AKS, Datadog recomienda utilizar los discos `default` (también conocidos como `managed-csi`).
{{% /tab %}}
{{% tab "Google GKE" %}}
Para Google GKE, Datadog recomienda utilizar la clase de controlador `premium-rwo`, ya que está respaldada por unidades de estado sólido (SSD). La clase respaldada por discos rígidos (HDD), `standard-rwo` podría no proporcionar suficiente rendimiento de escritura que permita que los buffers sean útiles.
{{% /tab %}}
{{% tab "APT-based Linux" %}}
Por defecto, el directorio de datos del Worker de Observability Pipelines está configurado en `/var/lib/observability-pipelines-worker`. Si estás utilizando el ejemplo de configuración, debes asegurarte de que tienes al menos 288 GB de espacio disponible para el almacenamiento en buffer.

Siempre que sea posible, se recomienda tener una SSD separada montada en esa localización.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
Por defecto, el directorio de datos del Worker de Observability Pipelines está configurado en `/var/lib/observability-pipelines-worker`. Si estás utilizando el ejemplo de configuración, debes asegurarte de que tienes al menos 288 GB de espacio disponible para el almacenamiento en buffer.

Siempre que sea posible, se recomienda tener una SSD separada montada en esa localización.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
De forma predeterminada, se asigna una unidad EBS de 288 GB a cada instancia y el ejemplo de configuración anterior está definido para utilizarlo para el almacenamiento en buffer.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">Las unidades EBS creadas por esta plantilla de CloudFormation tienen su ciclo de vida ligado a la instancia con la que se crean. <strong>Esto conduce a la pérdida de datos si una instancia se cierra, por ejemplo por el grupo de AutoScaling.</strong> Por este motivo, utiliza sólo instalaciones de CloudFormation para cargas de trabajo que no sean de nivel de producción.</div>

Por defecto, se asigna una unidad EBS de 288 GB a cada instancia, que se monta y formatea automáticamente al iniciar la instancia.
{{% /tab %}}
{{< /tabs >}}

## Conectar los forwarders de Splunk al Worker de Observability Pipelines
Después de instalar y configurar el Worker de Observability Pipelines para enviar logs a tu índice Splunk, debes actualizar tus recopiladores existentes para que apunten al Worker.

Puedes actualizar la mayoría de los recopiladores de Splunk con la IP/URL del host (o balanceador de carga) asociada al Worker de Observability Pipelines.

Para instalaciones de Terraform, el resultado `lb-dns` proporciona el valor necesario. Para instalaciones de CloudFormation, el resultado `LoadBalancerDNS` de CloudFormation tiene la URL correcta que se debe utilizar.

Además, debes actualizar el recopilador de Splunk con el token HEC que quieres utilizar para la autenticación, de modo que coincida con el especificado en la lista de `valid_tokens` del Worker de Observability Pipelines en `pipeline.yaml`.

```
# Example pipeline.yaml splunk_receiver source
sources:
  splunk_receiver:
    type: splunk_hec
    address: 0.0.0.0:8088
    valid_tokens:
        - ${SPLUNK_TOKEN}
```
En el ejemplo de configuración proporcionado, se utiliza el mismo token HEC, tanto para el origen como para el destino Splunk.

En este punto, tus logs deberían dirigirse al Worker y estar disponibles para su procesamiento. La siguiente sección repasa el proceso incluido por defecto y las opciones adicionales disponibles.

## Trabajar con datos
El ejemplo de configuración de Observability Pipelines hace lo siguiente:
- Recopila los logs que se envían desde el forwarder de Splunk al Worker de Observability Pipelines.
- Transforma los logs añadiendo etiquetas (tags) a los datos que pasaron por el Worker de Observability Pipelines. Esto te ayuda a determinar el tráfico que aún debe transferirse al Worker, a medida que actualizas tus clústeres. Estas etiquetas también te muestran cómo se envían los logs a través del balanceador de carga, en caso de que haya desequilibrios.
- Dirige los logs enviando los datos en partida doble a Splunk y a Datadog.

## Lectura adicional
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/legacy/
[2]: /es/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create