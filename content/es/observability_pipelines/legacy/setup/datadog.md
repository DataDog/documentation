---
aliases:
- /es/agent/vector_aggregation/
- /es/integrations/observability_pipelines/integrate_vector_with_datadog/
- /es/observability_pipelines/integrate_vector_with_datadog/
- /es/observability_pipelines/integrations/integrate_vector_with_datadog/
- /es/observability_pipelines/production_deployment_overview/integrate_datadog_and_the_observability_pipelines_worker/
- /es/observability_pipelines/setup/datadog/
further_reading:
- link: /observability_pipelines/legacy/production_deployment_overview/
  tag: Documentación
  text: Diseño y principios de despliegue en producción del worker de Observability
    Pipelines
- link: https://dtdg.co/d22op
  tag: Centro de aprendizaje
  text: Procesamiento local seguro con Observability Pipelines
title: (LEGACY) Configurar Observability Pipelines en Datadog
---

{{% observability_pipelines/legacy_warning %}}

## Overview

The [Observability Pipelines Worker][1] can collect, process, and route logs from any source to any destination. Using Datadog, you can build and manage all of your Observability Pipelines Worker deployments at scale.

This guide walks you through deploying the Worker in your common tools cluster and configuring the Datadog Agent to send logs and metrics to the Worker.

{{< img src="observability_pipelines/setup/opw-dd-pipeline.png" alt="A diagram of a couple of workload clusters sending their data through the Observability Pipelines aggregator." >}}

## Deployment Modes

{{% op-deployment-modes %}}

## Assumptions
* You are already using Datadog and want to use Observability Pipelines.
* You have administrative access to the clusters where the Observability Pipelines Worker is going to be deployed, as well as to the workloads that are going to be aggregated.
* You have a common tools or security cluster for your environment to which all other clusters are connected.

## Prerequisites
Before installing, make sure you have:

* A valid [Datadog API key][2].
* A Pipeline ID.

You can generate both of these in [Observability Pipelines][3].

### Provider-specific requirements
{{< tabs >}}
{{% tab "Docker" %}}
Ensure that your machine is configured to run Docker.
{{% /tab %}}
{{% tab "AWS EKS" %}}
To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments.

* The [EBS CSI driver][1] is required. To see if it is installed, run the following command and look for `ebs-csi-controller` in the list:

  ```shell
  kubectl get pods -n kube-system
  ```

* A `StorageClass` is required for the Workers to provision the correct EBS drives. To see if it is installed already, run the following command and look for `io2` in the list:

  ```shell
  kubectl get storageclass
  ```

  If `io2` is not present, download [the StorageClass YAML][2] and `kubectl apply` it.

* The [AWS Load Balancer controller][3] is required. To see if it is installed, run the following command and look for `aws-load-balancer-controller` in the list:

  ```shell
  helm list -A
  ```
* Datadog recommends using Amazon EKS >= 1.16.

See [Best Practices for OPW Aggregator Architecture][4] for production-level requirements.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[4]: /es/observability_pipelines/legacy/architecture/

{{% /tab %}}
{{% tab "Azure AKS" %}}
To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512 MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments. 

See [Best Practices for OPW Aggregator Architecture][1] for production-level requirements.

[1]: /es/observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "Google GKE" %}}
To run the Worker on your Kubernetes nodes, you need a minimum of two nodes with one CPU and 512MB RAM available. Datadog recommends creating a separate node pool for the Workers, which is also the recommended configuration for production deployments.

See [Best Practices for OPW Aggregator Architecture][1] for production-level requirements.

[1]: /es/observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "APT-based Linux" %}}
There are no provider-specific requirements for APT-based Linux.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
There are no provider-specific requirements for RPM-based Linux.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
In order to run the Worker in your AWS account, you need administrative access to that account. Collect the following pieces of information to run the Worker instances:
* The VPC ID your instances will run in.
* The subnet IDs your instances will run in.
* The AWS region your VPC is located in.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">CloudFormation installs only support Remote Configuration.</div>
<div class="alert alert-warning">Only use CloudFormation installs for non-production-level workloads.</div>

Para ejecutar el worker en tu cuenta AWS, necesitas acceso administrativo a esa cuenta. Recopila la siguiente información para ejecutar las instancias del worker:
* El ID de VPC en el que se ejecutarán tus instancias.
* Los ID de subred en los que se ejecutarán tus instancias.
* La región AWS en la que se encuentra tu VPC.
{{% /tab %}}
{{< /tabs >}}

## Instalación del worker de Observability Pipelines

{{< tabs >}}
{{% tab "Docker" %}}

La imagen Docker del worker de Observability Pipelines está publicada en Docker Hub [aquí][1].

1. Descarga el [archivo de configuración de pipelines de ejemplo][2].

2. Ejecuta el siguiente comando para iniciar el worker de Observability Pipelines con Docker:
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
   Sustituye `<API_KEY>` por tu clave de API Datadog, `<PIPELINES_ID>` por tu ID de configuración de Observability Pipelines y `<SITE>` por {{< region-param key="dd_site" code="true" >}}. **Nota**: `./pipeline.yaml` debe ser la ruta relativa o absoluta a la configuración que descargaste en el paso 1.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Descarga el [archivo de valores de Helm chart][1] para AWS EKS.

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

[1]: /resources/yaml/observability_pipelines/datadog/aws_eks.yaml
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Descarga el [archivo de valores de Helm chart][1] para Azure AKS.

2. En el Helm chart, sustituye los valores `datadog.apiKey` y `datadog.pipelineId` a fin de que coincidan con tu pipeline y utiliza {{< region-param key="dd_site" code="true" >}} para el valor `site`. Luego, instálalo en tu clúster con los siguientes comandos:

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

[1]: /resources/yaml/observability_pipelines/datadog/azure_aks.yaml
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Descarga el [archivo de valores de Helm chart][1] para Google GKE.

2. En el Helm chart, sustituye los valores `datadog.apiKey` y `datadog.pipelineId` a fin de que coincidan con tu pipeline y utiliza {{< region-param key="dd_site" code="true" >}} para el valor `site`. Luego, instálalo en tu clúster con los siguientes comandos:

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

[1]: /resources/yaml/observability_pipelines/datadog/google_gke.yaml
{{% /tab %}}
{{% tab "Linux basado en APT" %}}
1. Ejecuta los siguientes comandos a fin de configurar APT para descargar a través de HTTPS:

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Ejecuta los siguientes comandos para configurar el repositorio Datadog `deb` en tu sistema y crear un llavero de archivos de Datadog:

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Ejecuta los siguientes comandos para actualizar tu repositorio local `apt` e instalar el worker:

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

5. Descarga el [archivo de configuración de ejemplo][1] en `/etc/observability-pipelines-worker/pipeline.yaml` en el host.

6. Inicia el worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "Linux basado en RPM" %}}
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

   **Nota:** Si estás ejecutando RHEL v8.1 o CentOS v8.1, utiliza `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` en la configuración anterior.

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

4. Descarga el [archivo de configuración de ejemplo][1] en `/etc/observability-pipelines-worker/pipeline.yaml` en el host.

5. Inicia el worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. Descarga la [configuración de ejemplo][1]. 
1. Configura el módulo del worker en tu Terraform existente con la configuración de ejemplo. Asegúrate de actualizar los valores en `vpc-id`, `subnet-ids` y `region` para que coincidan con tu despliegue AWS en la configuración. Además, actualiza los valores en `datadog-api-key` y `pipeline-id` para que coincidan con tu pipeline.

[1]: /resources/yaml/observability_pipelines/datadog/terraform_opw_datadog.tf

{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">Utiliza sólo instalaciones de CloudFormation para cargas de trabajo que no sean de nivel de producción.</div>

Para instalar el worker en tu cuenta AWS, utiliza la plantilla de CloudFormation para crear un stack tecnológico:

  1. Descarga [la plantilla de CloudFormation][1] para el worker.

  2. En la **consola CloudFormation**, haz clic en **Create stack* (Crear stack tecnológico) y selecciona la opción **Con nuevos recursos (estándar)**.

  3. Asegúrate de que la opción **Plantilla lista** está seleccionada y selecciona **Cargar un archivo de plantilla**. Haz clic en **Choose file** (Seleccionar archivo) y añade el archivo de plantilla de CloudFormation que descargaste anteriormente. Haz clic en **Next** (Siguiente).

  4. Introduce un nombre para el stack tecnológico en **Especificar detalles del stack tecnológico**.

  5. Rellena los parámetros de la plantilla de CloudFormation. Algunos requieren una atención especial:

      * Para `APIKey` y `PipelineID`, proporcione la clave y el ID que recopilaste anteriormente en la sección Requisitos previos.

      * Para `VPCID` y `SubnetIDs`, proporciona las subredes y la VPC que elegiste anteriormente.

      * Todos los demás parámetros están configurados con valores predeterminados razonables para un despliegue del worker, pero puedes adaptarlos a tu caso de uso según sea necesario.

  6. Haz clic en **Next** (Siguiente).

  7. Revisa y asegúrate de que los parámetros son los esperados. Haz clic en las casillas de verificación de los permisos necesarios para IAM y luego haz clic en **Submit** (Enviar) para crear el stack tecnológico.

CloudFormation se encarga de la instalación en este punto; las instancias de worker se lanzan, se descarga el software necesario y comienza a ejecutarse automáticamente.

[1]: /resources/yaml/observability_pipelines/cloudformation/datadog.yaml
{{% /tab %}}
{{< /tabs >}}

Consulta [Configuraciones][4] para obtener más información sobre la fuente, la transformación y el sumidero utilizados en la configuración de ejemplo. Consulta [Trabajar con datos][5] para obtener más información sobre la transformación de tus datos.

### Balanceo de carga

{{< tabs >}}
{{% tab "Docker" %}}
La configuración orientada a la producción no se incluye en las instrucciones de Docker. En su lugar, consulta las normas de tu empresa para el balanceo de carga en entornos en contenedores. Si estás realizando tests en tu máquina local, no es necesario configurar un balanceador de carga.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Utiliza los balanceadores de carga proporcionados por tu proveedor de nube.
Se ajustan en base a los eventos de escalado automático para los que está configurada la configuración de Helm por defecto. Los balanceadores de carga son internos,
por lo que sólo son accesibles dentro de tu red.

Utiliza la URL del balanceador de carga que te proporciona Helm cuando configuras el Datadog Agent.

Se utilizan NLB suministrados por el [controlador del balanceador de carga AWS][1].

Para obtener recomendaciones sobre el balanceador de carga al escalar el worker, consulta [Planificación de la capacidad y escalado][2].
#### Balanceo de carga en zonas de disponibilidad cruzadas
La configuración de Helm proporcionada intenta simplificar el balanceo de carga, pero debes tener en cuenta las posibles implicaciones de precio del tráfico en zonas de disponibilidad cruzadas. En la medida de lo posible, las muestras intentan evitar crear situaciones en las que puedan producirse múltiples saltos entre zonas de disponibilidad.

Las configuraciones de ejemplo no habilitan la función de balanceo de carga en zonas cruzadas, disponible en este controlador. Para habilitarla, añade la siguiente anotación al bloque `service`:

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

Para obtener más información, consulta el [controlador del balanceador de carga AWS][3].

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: /es/observability_pipelines/legacy/architecture/capacity_planning_scaling/
[3]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}
{{% tab "Azure AKS" %}}
Utiliza los balanceadores de carga proporcionados por tu proveedor de nube.
Se ajustan en base a los eventos de escalado automático para los que está configurada la configuración de Helm por defecto. Los balanceadores de carga son internos,
por lo que sólo son accesibles dentro de tu red.

Utiliza la URL del balanceador de carga que te proporciona Helm cuando configuras el Datadog Agent.

Para obtener recomendaciones sobre el balanceador de carga al escalar el worker, consulta [Planificación de la capacidad y escalado][1].

#### Balanceo de carga en zonas de disponibilidad cruzadas
La configuración de Helm proporcionada intenta simplificar el balanceo de carga, pero debes tener en cuenta las posibles implicaciones de precio del tráfico en zonas de disponibilidad cruzadas. En la medida de lo posible, las muestras intentan evitar crear situaciones en las que puedan producirse múltiples saltos entre zonas de disponibilidad.

[1]: /es/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Google GKE" %}}
Utiliza los balanceadores de carga proporcionados por tu proveedor de nube.
Se ajustan en base a los eventos de escalado automático para los que está configurada la configuración de Helm por defecto. Los balanceadores de carga son internos,
por lo que sólo son accesibles dentro de tu red.

Utiliza la URL del balanceador de carga que te proporciona Helm cuando configuras el Datadog Agent.

Para obtener recomendaciones sobre el balanceador de carga al escalar el worker, consulta [Planificación de la capacidad y escalado][1].

#### Balanceo de carga en zonas de disponibilidad cruzadas
La configuración de Helm proporcionada intenta simplificar el balanceo de carga, pero debes tener en cuenta las posibles implicaciones de precio del tráfico en zonas de disponibilidad cruzadas. En la medida de lo posible, las muestras intentan evitar crear situaciones en las que puedan producirse múltiples saltos entre zonas de disponibilidad.

El acceso global está activado por defecto ya que es probable que se requiera para su uso en un clúster de herramientas compartidas.

[1]: /es/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Linux basado en APT" %}}
No se proporciona compatibilidad integrada para el balanceo de carga, dada la naturaleza de máquina única de la instalación. Necesitas suministrar tus propios balanceadores de carga utilizando cualquiera que sea el estándar de tu empresa.
{{% /tab %}}
{{% tab "Linux basado en RPM" %}}
No se proporciona compatibilidad integrada para el balanceo de carga, dada la naturaleza de máquina única de la instalación. Necesitas suministrar tus propios balanceadores de carga utilizando cualquiera que sea el estándar de tu empresa.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Un NLB es suministrado por el módulo Terraform y está configurado para apuntar a las instancias. Tu dirección DNS se devuelve en el resultado `lb-dns` en Terraform.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">Utiliza sólo instalaciones de CloudFormation para cargas de trabajo que no sean de nivel de producción.</div>

Un NLB es suministrado por la plantilla de CloudFormation y está configurado para apuntar al grupo de escalado automático. Su dirección DNS se devuelve en el resultado `LoadBalancerDNS` en CloudFormation.
{{% /tab %}}
{{< /tabs >}}

### Almacenamiento en buffer
Observability Pipelines incluye múltiples estrategias de almacenamiento en buffer que te permiten aumentar la resiliencia de tu clúster ante fallos posteriores. Las configuraciones de ejemplo proporcionadas utilizan buffers de disco, cuyas capacidades están clasificadas para aproximadamente 10 minutos de datos a 10 Mbps/núcleo para despliegues de Observability Pipelines. Suele ser tiempo suficiente para que los problemas transitorios se resuelvan por sí solos o para que los responsables de la respuesta a incidentes decidan qué hay que hacer con los datos de observabilidad.

{{< tabs >}}
{{% tab "Docker" %}}
Por defecto, el directorio de datos del worker de Observability Pipelines está configurado en `/var/lib/observability-pipelines-worker`. Asegúrate de que tu máquina host tiene una cantidad suficiente de capacidad de almacenamiento asignado al punto de montaje del contenedor.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Para AWS, Datadog recomienda utilizar la familia de unidades `io2` EBS. También puedes utilizar las unidades `gp3`.
{{% /tab %}}
{{% tab "Azure AKS" %}}
Para Azure AKS, Datadog recomienda utilizar los discos `default` (también conocidos como `managed-csi`).
{{% /tab %}}
{{% tab "Google GKE" %}}
Para Google GKE, Datadog recomienda utilizar la clase de unidades `premium-rwo` ya que está respaldada por SSD. La clase respaldada por HDD, `standard-rwo`, podría no proporcionar suficiente rendimiento de escritura para que los buffers sean útiles.
{{% /tab %}}
{{% tab "Linux basado en APT" %}}
Por defecto, el directorio de datos del worker de Observability Pipelines se configura como `/var/lib/observability-pipelines-worker`. Si estás utilizando la configuración de ejemplo, debes asegurarte de que tienes al menos 288 GB de espacio disponible para el almacenamiento en buffer.

Siempre que sea posible, se recomienda tener un SSD separado, montado en esa localización.
{{% /tab %}}
{{% tab "Linux basado en RPM" %}}
Por defecto, el directorio de datos del worker de Observability Pipelines está configurado como `/var/lib/observability-pipelines-worker`. Si estás utilizando la configuración de ejemplo, debes asegurarte de que tienes al menos 288 GB de espacio disponible para el almacenamiento en buffer.

Siempre que sea posible, se recomienda tener un SSD separado, montado en esa localización.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
De forma predeterminada, se asigna una unidad EBS de 288 GB a cada instancia y el ejemplo de configuración anterior está configurado para utilizarlo para el almacenamiento en buffer.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">Las unidades EBS creadas por esta plantilla de CloudFormation tienen su ciclo de vida ligado a la instancia con la que se crean. <strong>Esto conduce a la pérdida de datos si una instancia se cierra, por ejemplo por el grupo de escalado automático.</strong> Por este motivo, utiliza sólo instalaciones de CloudFormation para cargas de trabajo que no sean de nivel de producción.</div>

Por defecto, se asigna una unidad EBS de 288 GB a cada instancia, que se monta y formatea automáticamente al arrancar la instancia.
{{% /tab %}}
{{< /tabs >}}

## Conectar el Datadog Agent al worker de Observability Pipelines
Para enviar logs del Datadog Agent al worker de Observability Pipelines, actualiza tu configuración del Agent con lo siguiente:

```yaml
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
```

`OPW_HOST` es la IP del balanceador de carga o de la máquina que configuraste anteriormente. Para instalaciones basadas Docker de host único, esta es la dirección IP del host subyacente. Para instalaciones basadas en Kubernetes, puedes recuperarla ejecutando el siguiente comando y copiando la dirección `EXTERNAL-IP`:

```shell
kubectl get svc opw-observability-pipelines-worker
```

Para instalaciones de Terraform, el resultado `lb-dns` proporciona el valor necesario. Para instalaciones de CloudFormation, el resultado `LoadBalancerDNS` de CloudFormation tiene la URL correcta que se debe utilizar.

En este punto, tus datos de observabilidad deberían ir al worker y están disponibles para el procesamiento de los datos.

## Actualización de los modos de despliegue

{{% op-updating-deployment-modes %}}

## Trabajar con datos
El ejemplo de configuración proporcionado tiene pasos de procesamiento de ejemplo que muestran las herramientas de Observability Pipelines y aseguran que los datos enviados a Datadog están en el formato correcto.

### Procesamiento de logs
La configuración de Observability Pipelines de ejemplo hace lo siguiente:
- Recopila logs enviados desde el Datadog Agent al worker de Observability Pipelines.
- Etiqueta logs que pasan por el worker de Observability Pipelines. Esto ayuda a determinar el tráfico que aún debe transferirse al worker a medida que actualizas tus clústeres. Estas etiquetas (tags) también muestran cómo los logs se enrutan a través del balanceador de carga, en caso de que haya desequilibrios.
- Corrige el estado de los logs que llegan a través del worker Debido a cómo el Datadog Agent recopila logs de los contenedores, el atributo `.status` proporcionado no refleja correctamente el nivel real del mensaje. Se elimina para evitar problemas con las reglas de análisis en el backend, donde los logs se reciben del worker.

Los siguientes son dos componentes importantes del ejemplo de configuración:
- `logs_parse_ddtags`: Analiza las etiquetas almacenadas en una cadena en datos estructurados.
- `logs_finish_ddtags`: Recodifica las etiquetas para que estén en el formato en el que las enviaría el Datadog Agent.

Internamente, el Datadog Agent representa las etiquetas de logs como un CSV en una sola cadena. Para manipular eficazmente estas etiquetas, deben ser analizadas, modificadas y luego recodificadas antes de ser enviadas al endpoint de ingesta. Estos pasos están escritos para realizar estas acciones automáticamente. Cualquier modificación que realices en el proceso, especialmente para la manipulación de las etiquetas, debe realizarse entre estos dos pasos.

En este punto, tu entorno está configurado para Observability Pipelines con datos que fluyen a través de él. Es probable que necesites una configuración adicional para tus casos de uso específicos, aunque las herramientas proporcionadas te ofrecen un punto de partida.

## Lectura adicional
{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/observability_pipelines/legacy/
[2]: /es/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
[4]: /es/observability_pipelines/legacy/configurations/
[5]: /es/observability_pipelines/legacy/working_with_data/