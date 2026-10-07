---
aliases:
- /es/observability_pipelines/setup/datadog_with_archiving/
further_reading:
- link: /observability_pipelines/legacy/production_deployment_overview/
  tag: Documentación
  text: Diseño y principios de despliegue en producción para el worker de Observability
    Pipelines
- link: https://dtdg.co/d22op
  tag: Centro de aprendizaje
  text: Procesamiento local seguro con Observability Pipelines
title: (LEGACY) Configurar Observability Pipelines para enviar logs en un formato
  rehidratable por Datadog a Amazon S3 y Datadog
---

{{% observability_pipelines/legacy_warning %}}

## Información general

El [worker de Observability Pipelines][1] puede recopilar, procesar y enrutar logs desde cualquier fuente a cualquier destino. Con Datadog, puedes crear y gestionar todos los despliegues de tu worker de Observability Pipelines en escala.

Esta guía te mostrará el despliegue del worker en tu clúster de herramientas comunes y su configuración para enviar logs en un formato rehidratable por Datadog a un almacenamiento en la nube para su archivado.

## Modos de despliegue

{{% op-deployment-modes %}}

## Supuestos
* Ya estás utilizando Datadog y quieres utilizar Observability Pipelines.
* Tienes acceso administrativo a clústeres donde se va a desplegar el worker de Observability Pipelines, así como a las cargas de trabajo que se van a agregar.
* Dispones de un clúster de herramientas comunes o de seguridad para tu entorno al que están conectados todos los demás clústeres.

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

Para ejecutar el worker en tus nodos Kubernetes, necesitas un mínimo de dos nodos con una CPU y 512 MB de RAM disponibles. Datadog recomienda crear un grupo de nodos separado para los workers, que es también la configuración recomendada para despliegues en producción.

* Se necesita la [unidad EBS CSI][1]. Para comprobar si está instalada, ejecuta el siguiente comando y busca `ebs-csi-controller` en la lista:

  ```shell
  kubectl get pods -n kube-system
  ```

* Se necesita `StorageClass` para que los workers suministren las unidades EBS correctas. Para comprobar si ya está instalado, ejecuta el siguiente comando y busca `io2` en la lista:

  ```shell
  kubectl get storageclass
  ```

  Si `io2` no está presente, descarga [el YAML de StorageClass][2] y `kubectl apply`.

* Se necesita el [controlador del balanceador de carga AWS][3]. Para comprobar si está instalado, ejecuta el siguiente comando y busca `aws-load-balancer-controller` en la lista:

  ```shell
  helm list -A
  ```
* Datadog recomienda utilizar Amazon EKS >= v1.16.

Para conocer los requisitos a nivel de producción, consulta [Prácticas recomendadas para la arquitectura del agregador OPW][6].

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[6]: /es/observability_pipelines/legacy/architecture/

{{% /tab %}}
{{% tab "Linux basado en APT" %}}

No existen requisitos específicos del proveedor para Linux basado en APT.

{{% /tab %}}
{{% tab "Linux basado en RPM" %}}

No existen requisitos específicos del proveedor para Linux basado en APT.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

Para ejecutar el worker en tu cuenta AWS, necesitas acceso administrativo a esa cuenta y la siguiente información:

* El ID de la VPC en la que se ejecutarán tus instancias.
* Los ID de subred en los que se ejecutarán tus instancias.
* La región AWS en la que se encuentra tu VPC.

{{% /tab %}}
{{< /tabs >}}

## Configurar archivos de logs

Cuando [instales el worker de Observability Pipelines](#install-the-observability-pipelines-worker) más adelante, la configuración proporcionada como ejemplo incluye un sumidero para enviar logs a Amazon S3 en un formato rehidratable por Datadog. Para utilizar esta configuración, crea un bucket S3 para tus archivos y configura una política IAM que permita a los workers escribir en el bucket S3. A continuación, conecta el bucket S3 a los archivos de logs de Datadog.

{{% site-region region="us,us3,us5" %}}
Consulta [Precios de AWS][1] para conocer las tarifas de transferencia de datos entre regiones y cómo pueden verse afectados los costes de almacenamiento en la nube.

[1]: https://aws.amazon.com/s3/pricing/
{{% /site-region %}}

### Crear un bucket S3 y configurar una política IAM

{{< tabs >}}
{{% tab "Docker" %}}

{{% op-datadog-archives-s3-setup %}}

3. Crea un usuario IAM y adjúntale la política anterior. Crea credenciales de acceso para el usuario IAM. Guarda estas credenciales como `AWS_ACCESS_KEY` y `AWS_SECRET_ACCESS_KEY`.

{{% /tab %}}
{{% tab "AWS EKS" %}}

{{% op-datadog-archives-s3-setup %}}

3. [Crea una cuenta de servicio][1] para utilizar la política creada anteriormente.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html

{{% /tab %}}
{{% tab "Linux basado en APT" %}}

{{% op-datadog-archives-s3-setup %}}

3. Crea un usuario IAM y adjúntale la política anterior. Crea credenciales de acceso para el usuario IAM. Guarda estas credenciales como `AWS_ACCESS_KEY` y `AWS_SECRET_ACCESS_KEY`.

{{% /tab %}}
{{% tab "Linux basado en RPM" %}}

{{% op-datadog-archives-s3-setup %}}

3. Crea un usuario IAM y adjúntale la política anterior. Crea credenciales de acceso para el usuario IAM. Guarda estas credenciales como `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY`.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

{{% op-datadog-archives-s3-setup %}}

3. Adjunta la política al perfil de la instancia IAM creado con Terraform, que encontrarás en el resultado `iam-role-name`.

{{% /tab %}}
{{< /tabs >}}

### Conectar el bucket S3 a archivos de logs de Datadog

Debes conectar el bucket S3 que creaste anteriormente a archivos de logs de Datadog para poder rehidratar los archivos más adelante.

1. Ve a [Reenvío de logs][5] de Datadog.
1. Haz clic en **+ New Archive** (+ Nuevo archivo).
1. Introduce un nombre de archivo descriptivo.
1. Añade una consulta que filtre todos los logs que pasan por los pipelines de logs para que esos logs no vayan a este archivo. Por ejemplo, añade la consulta `observability_pipelines_read_only_archive`, suponiendo que ninguno de los logs que pasan por el pipeline tiene esa etiqueta (tag) añadida.
1. Selecciona **AWS S3**.
1. Selecciona la cuenta AWS en la que se encuentra tu bucket.
1. Introduce el nombre del bucket S3.
1. También puedes introducir una ruta.
1. Comprueba la sentencia de confirmación.
1. También puedes añadir etiquetas y definir el tamaño máximo de análisis para la rehidratación. Para obtener más información, consulta [Configuración avanzada][6].
1. Haz clic en **Guardar**.

Para obtener más información, consulta la [documentación de los archivos de logs][7].

### Instalar el worker de Observability Pipelines

{{< tabs >}}
{{% tab "Docker" %}}

La imagen Docker del worker de Observability Pipelines está publicada en Docker Hub [aquí][1].

1. Descarga el [archivo de configuración de pipelines de ejemplo][2].

2. Ejecuta el siguiente comando para iniciar el worker de Observability Pipelines con Docker:

    ```shell
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -e AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID> \
      -e AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> \
      -e DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME> \
      -e DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```

   Sustituye estos parámetros por la siguiente información:
    - `<API_KEY>` por tu clave de API Datadog.
    - `<PIPELINES_ID>` por tu ID de configuración de Observability Pipelines.
    - `<SITE>` with {{< region-param key="dd_site" code="true" >}}.
    - `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY` por las credenciales AWS que creaste anteriormente.
    - `<AWS_BUCKET_NAME>` por el nombre del bucket S3 que almacena los logs.
    - `<BUCKET_AWS_REGION>` por la [región AWS][3] del servicio de destino.
    - `./pipeline.yaml` debe ser la ruta relativa o absoluta a la configuración que descargaste en el paso 1.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[3]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. Descarga el [archivo de valores de Helm chart][1] para AWS EKS.

2. En el Helm chart, sustituye estos parámetros por la siguiente información:
    - `datadog.apiKey` por tu clave de API Datadog. 
    - `datadog.pipelineId` por tu ID de configuración de Observability Pipelines.
    - `site` with {{< region-param key="dd_site" code="true" >}}. 
    - `${DD_ARCHIVES_SERVICE_ACCOUNT}` en `serviceAccount.name` por el nombre de la cuenta de servicio. 
    - `${DD_ARCHIVES_BUCKET}` en `pipelineConfig.sinks.datadog_archives` por el nombre del bucket S3 que almacena los logs.
    - `${DD_ARCHIVES_SERVICE_ACCOUNT}` en `pipelineConfig.sinks.datadog_archives` por la [región AWS][2] del servicio de destino.

3. Instálalo en tu clúster con los siguientes comandos:

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

[1]: /resources/yaml/observability_pipelines/archives/aws_eks.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}

{{% tab "Linux basado en APT" %}}
1. Ejecute los siguientes comandos para configurar APT para descargar a través de HTTPS:

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

4. Añade tus claves y el sitio ({{< region-param key="dd_site" code="true" >}}) a las variables de entorno del worker. Sustituye `<AWS_BUCKET_NAME>` por el nombre del bucket S3 que almacena los logs y `<BUCKET_AWS_REGION>` por la [región AWS][2] del servicio de destino.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME>
    DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION>
    EOF
    ```

5. Descarga el [archivo de configuración de ejemplo][1] en `/etc/observability-pipelines-worker/pipeline.yaml` en el host.

6. Inicia el worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
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

3. Añade tus claves y el sitio ({{< region-param key="dd_site" code="true" >}}) a las variables de entorno del worker. Sustituye `<AWS_BUCKET_NAME>` por el nombre del bucket S3 que almacena los logs y `<BUCKET_AWS_REGION>` por la [región AWS][2] del servicio de destino.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME>
    DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION>
    EOF
    ```

4. Descarga el [archivo de configuración de ejemplo][1] en `/etc/observability-pipelines-worker/pipeline.yaml` en el host.

5. Inicia el worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. Descarga la [configuración de ejemplo][1]. 
1. Configura el módulo del worker en tu Terraform existente con la configuración de ejemplo. Asegúrate de actualizar los valores en `vpc-id`, `subnet-ids` y `region` para que coincidan con tu despliegue AWS en la configuración. Además, actualiza los valores en `datadog-api-key` y `pipeline-id` para que coincidan con tu pipeline.

[1]: /resources/yaml/observability_pipelines/archives/terraform_opw_archives.tf
{{% /tab %}}
{{< /tabs >}}

### Balanceo de carga

{{< tabs >}}
{{% tab "Docker" %}}
La configuración orientada a la producción no se incluye en las instrucciones de Docker. En su lugar, consulta las normas de tu empresa para el balanceo de carga en entornos en contenedores. Si estás realizando tests en tu máquina local, la configuración de un balanceador de carga es innecesaria.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Utiliza los balanceadores de carga proporcionados por tu proveedor de nube.
Los balanceadores de carga se ajustan basándose en eventos de autoescalado para los que Helm está configurado por defecto. Los balanceadores de carga son internos,
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

{{% tab "Linux basado en APT" %}}
Dada la naturaleza de máquina única de la instalación, no hay una compatibilidad integrada para el balanceo de carga. Necesitas suministrar tus propios balanceadores de carga utilizando el estándar de tu empresa.
{{% /tab %}}
{{% tab "Linux basado en RPM" %}}
Dada la naturaleza de máquina única de la instalación, no hay una compatibilidad integrada para el balanceo de carga. Necesitas suministrar tus propios balanceadores de carga utilizando el estándar de tu empresa
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
El módulo Terraform suministra un NLB para apuntar a las instancias. La dirección DNS se devuelve en el resultado `lb-dns` en Terraform.
{{% /tab %}}
{{< /tabs >}}

### Almacenamiento en buffer
Observability Pipelines incluye múltiples estrategias de almacenamiento en buffer que te permiten aumentar la resiliencia de tu clúster ante fallos posteriores. Las configuraciones de ejemplo proporcionadas utilizan buffers de disco, cuyas capacidades están clasificadas para aproximadamente 10 minutos de datos a 10 Mbps/núcleo para despliegues de Observability Pipelines. Suele ser tiempo suficiente para que los problemas transitorios se resuelvan por sí solos o para que los responsables de la respuesta a incidentes decidan qué hay que hacer con los datos de observabilidad.

{{< tabs >}}
{{% tab "Docker" %}}
Por defecto, el directorio de datos del worker de Observability Pipelines está configurado como `/var/lib/observability-pipelines-worker`. Asegúrate de que tu máquina host tiene una cantidad suficiente de capacidad de almacenamiento asignado al punto de montaje del contenedor.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Para AWS, Datadog recomienda utilizar la familia de unidades `io2` EBS. Como alternativa, también se pueden utilizar las unidades `gp3`.
{{% /tab %}}
{{% tab "Linux basado en APT" %}}
Por defecto, el directorio de datos del worker de Observability Pipelines está configurado como `/var/lib/observability-pipelines-worker`. Si estás utilizando la configuración de ejemplo, debes asegurarte de que éste tiene al menos 288 GB de espacio disponible para el almacenamiento en buffer.

Siempre que sea posible, se recomienda tener un SSD separado, montado en esa localización.
{{% /tab %}}
{{% tab "Linux basado en RPM" %}}
Por defecto, el directorio de datos del worker de Observability Pipelines está configurado como `/var/lib/observability-pipelines-worker`. Si estás utilizando la configuración de ejemplo, debes asegurarte de que tienes al menos 288 GB de espacio disponible para el almacenamiento en buffer.

Siempre que sea posible, se recomienda tener un SSD separado, montado en esa localización.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
De forma predeterminada, se asigna una unidad EBS de 288 GB a cada instancia, y el ejemplo de configuración anterior está configurado para utilizarlo para el almacenamiento en buffer.
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

Para instalaciones Terraform, el resultado `lb-dns` proporciona el valor necesario.

En este punto, tus datos de observabilidad deberían ir al worker y luego ser enviados a tu archivo S3.

## Actualización de los modos de despliegue

{{% op-updating-deployment-modes %}}

## Rehidratación de tus archivos

Consulta [Rehidratación de archivos][4] para obtener instrucciones sobre cómo rehidratar tus archivos en Datadog para poder empezar a analizar e investigar esos logs.

## Lectura adicional
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/legacy/
[2]: /es/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
[4]: /es/logs/log_configuration/rehydrating/
[5]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[6]: /es/logs/log_configuration/archives/#advanced-settings
[7]: /es/logs/log_configuration/archives