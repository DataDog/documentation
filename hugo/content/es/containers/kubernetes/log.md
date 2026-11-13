---
aliases:
- /es/agent/kubernetes/log
description: Configure la recopilación de registros de aplicaciones en contenedores
  que se ejecutan en Kubernetes mediante Datadog Agent
further_reading:
- link: https://www.datadoghq.com/blog/eks-fargate-logs-datadog
  tag: Blog
  text: Hacer un seguimiento de los registros de Amazon EKS en Fargate con Datadog
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopilar las trazas de su aplicación
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopilar sus métricas de Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Recopilar automáticamente las métricas y registros de sus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limitar la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
- link: /containers/troubleshooting/log-collection
  tag: Documentación
  text: Solución de problemas de recopilación de registros de contenedores
- link: https://www.datadoghq.com/architecture/monitoring-container-apps-logs/
  tag: Centro de arquitectura
  text: Seguimiento de aplicaciones de contenedor - Registros
title: Recopilación de registros de Kubernetes
---
Esta página trata sobre la recopilación de registros de archivos de registro de Kubernetes.

Cuando sus aplicaciones en contenedores escriben sus registros en la salida y el error estándar (`stdout`/`stderr`), el tiempo de ejecución del contenedor y Kubernetes administran automáticamente los registros por usted. El patrón predeterminado es que [Kubernetes almacena estos flujos de registro como archivos][13] en el servidor en la carpeta `/var/log/pods` y subcarpetas para cada Pod y contenedor.

El Datadog Agent puede recopilar estos archivos de registro de Kubernetes para estos contenedores utilizando las instrucciones a continuación. Esta opción se escala bien para la naturaleza efímera de los Pods que crea Kubernetes, y es más eficiente en cuanto a recursos que recopilar registros desde el socket de Docker. Datadog recomienda este método para la recopilación de registros en Kubernetes.

Alternativamente, el Datadog Agent también puede recopilar registros mediante solicitudes repetidas a la API de Docker a través del socket de Docker. Sin embargo, esto requiere Docker como el tiempo de ejecución de contenedores para su clúster de Kubernetes. Esto también consume más recursos que el uso de archivos de registro. Para ver cómo recopilar registros usando el socket de Docker, consulte [Recopilación de registros con el socket de Docker][1]. Si sus aplicaciones en contenedores están escribiendo en archivos de registro almacenados en el contenedor, esto puede complicar la recopilación de registros. Consulte [recopilación de registros desde un archivo](#from-a-container-local-log-file).

## Configuración {#setup}

### Recopilación de registros {#log-collection}

Antes de comenzar a recopilar registros de aplicaciones, asegúrese de estar ejecutando el Datadog Agent en su clúster de Kubernetes.

Para configurar la recopilación de registros manualmente en el DaemonSet, consulte [Recopilación de registros de DaemonSet][9]. De lo contrario, siga las instrucciones a continuación:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualice su `datadog-agent.yaml` manifiesto con:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

Luego aplique la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

Consulte el [manifiesto de ejemplo con recopilación de registros, métricas y APM habilitada][1] para obtener un ejemplo adicional. Puede establecer `features.logCollection.containerCollectAll` en `true` para recopilar registros de todos los contenedores descubiertos de forma predeterminada. Cuando se establece en `false` (predeterminado), debe especificar las configuraciones de registro de Autodiscovery para habilitar la recopilación de registros. Para obtener más información, consulte [Descubrimiento de registros - Filtrado](#filtering).

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Para habilitar la recopilación de registros con Helm, actualice su archivo [datadog-values.yaml][1] con la siguiente configuración de recopilación de registros. Luego, actualice su chart de Helm de Datadog:

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

Puede establecer `datadog.logs.containerCollectAll` en `true` para recopilar registros de todos los contenedores descubiertos de forma predeterminada. Cuando se establece en `false` (predeterminado), debe especificar las configuraciones de registro de Autodiscovery para habilitar la recopilación de registros. Para obtener más información, consulte [Descubrimiento de registros - Filtrado](#filtering).

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### Sin privilegios {#unprivileged}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
(Opcional) Para ejecutar una instalación sin privilegios, agregue lo siguiente al [recurso personalizado DatadogAgent][1]:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

  override:
    nodeAgent:
      securityContext:
        runAsUser: <USER_ID>
        supplementalGroups:
          - <DOCKER_GROUP_ID>
```

- Reemplace `<USER_ID>` con el UID para ejecutar el Agent
- Reemplace `<DOCKER_GROUP_ID>` con el ID de grupo que posee el socket de Docker o contenedor.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

(Opcional) Para ejecutar una instalación sin privilegios, agregue lo siguiente en el archivo `values.yaml`:

```yaml
datadog:
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <DOCKER_GROUP_ID>
```

- Reemplace `<USER_ID>` con el UID para ejecutar el Agent.
- Reemplace `<DOCKER_GROUP_ID>` con el ID de grupo que posee el socket de Docker o contenedor.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>Advertencia para instalaciones sin privilegios</strong>
<br/><br/>
Al ejecutar una instalación sin privilegios, el Agent necesita poder leer los archivos de registro en <code>/var/log/pods</code>.
<br/><br/>
Si está utilizando el tiempo de ejecución de contenedor, los archivos de registro en <code>/var/log/pods</code> son legibles por los miembros del grupo <code>root</code> . Con las instrucciones anteriores, el Agent se ejecuta con el <code>root</code> . No se requiere ninguna acción.
<br/><br/>
Si está utilizando el tiempo de ejecución de Docker, los archivos de registro en <code>/var/log/pods</code> son enlaces simbólicos a <code>/var/lib/docker/containers</code>, el cual solo puede ser recorrido por el <code>root</code> usuario. En consecuencia, con el tiempo de ejecución de Docker, no es posible que un no<code>root</code> Agent lea registros <code>/var/log/pods</code>. El socket de Docker debe estar montado en el contenedor del Agent, para que pueda obtener los registros de Pod a través del daemon de Docker.
<br/><br/>
Para recopilar registros de <code>/var/log/pods</code> cuando el socket de Docker está montado, establezca la variable de entorno <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (o <code>logs_config.k8s_container_use_file</code> en <code>datadog.yaml</code>a <code>true</code>. Esto obliga al Agent a utilizar el modo de recopilación de archivos.
</div>

## Descubrimiento de registros {#log-discovery}

El Datadog Agent en Kubernetes se implementa mediante un DaemonSet (administrado por el Datadog Operator o Helm). Este DaemonSet programa una réplica del Pod del Agent en cada nodo del clúster. Cada Pod del Agent es entonces responsable de reportar los registros de los otros Pods y contenedores en su nodo respectivo. Cuando la función "Container Collect All" está habilitada, el Agent reporta los registros de cada contenedor descubierto con un conjunto predeterminado de etiquetas.

### Filtrado {#filtering}

Cuando "Container Collect All" está habilitado, puede configurar de qué contenedores desea recopilar registros. Esto puede ser útil para evitar la recopilación de los registros del Datadog Agent, si así lo desea. Puede hacer esto pasando configuraciones al Datadog Agent para controlar lo que extrae, o pasando configuraciones al Pod de Kubernetes para excluir ciertos registros de manera más explícita.

Al filtrar registros mediante métodos como `DD_CONTAINER_EXCLUDE_LOGS` o `ad.datadoghq.com/logs_exclude`, el Agent ignora la recopilación de registros independientemente de las configuraciones de recopilación de registros definidas explícitamente en [Anotaciones de Autodiscovery][19], el [`DatadogInstrumentation` CRD][23], o [archivos de configuración de Autodiscovery][20].

Cuando "Container Collect All" está deshabilitado (predeterminado), no necesita agregar ningún filtrado porque todo se excluye de forma predeterminada. Para incluir la recopilación solo para pods seleccionados, puede habilitar la configuración de recopilación de registros mediante [Anotaciones de Autodiscovery][19], el [`DatadogInstrumentation` CRD][23], o [archivos de configuración de Autodiscovery][20] para los pods deseados.

Consulte [Gestión de Descubrimiento de Contenedores][8] para obtener más información sobre el filtrado.

### Etiquetado {#tagging}

El Datadog Agent etiqueta los registros de los contenedores de Kubernetes con las [etiquetas de Kubernetes][14] predeterminadas, así como con cualquier etiqueta personalizada extraída. Cuando "Container Collect All" está habilitado, el Agent informa los registros de un contenedor con una etiqueta `source` y `service` que coincide con la imagen corta del contenedor. Por ejemplo, los registros de un contenedor que utiliza la imagen de contenedor `gcr.io/owner/example-image:latest` tendrían `example-image` como valor de etiqueta para `source`, `service` y `short_image`.

La etiqueta `service` también puede establecerse mediante la etiqueta de Pod `tags.datadoghq.com/service: "<SERVICE>"` de [Unified Service Tagging][4]. Para obtener más información sobre los atributos `source` y `service`, consulte [Atributos Reservados][11].

La etiqueta `source` puede ser importante para sus registros, ya que las [canalizaciones de registro predeterminadas][15] se filtran utilizando esta etiqueta. Sin embargo, estas canalizaciones pueden personalizarse completamente según se desee. Puede ver los pasos en la sección [Registros de Integración](#integration-logs) a continuación para personalizar aún más las etiquetas en sus registros.

## Registros de integración {#integration-logs}

[Autodiscovery][10] le permite usar plantillas para configurar la recopilación de registros y otras capacidades en los contenedores. Utilice uno de los siguientes métodos para configurar la recopilación de registros:

- [Anotaciones de Autodiscovery](#autodiscovery-annotations) (recomendado)
- [`DatadogInstrumentation` CRD](#datadoginstrumentation-crd) (nuevo)
- [Archivos de configuración de Autodiscovery](#autodiscovery-configuration-files)

Se recomienda encarecidamente establecer una etiqueta `source` y `service` en estas configuraciones de registro. Haga coincidir la etiqueta `source` con una de las [canalizaciones de registro listas para usar][15] de Datadog para que sus registros se enriquezcan automáticamente; también puede encontrar una [biblioteca de canalizaciones en Datadog][16]. La etiqueta `service` impulsa el [Unified Service Tagging][4], vinculando sus registros con métricas y trazas del mismo servicio. Si se omiten `source` y `service`, el Agent recurre a la etiqueta `service` de Unified Service Tagging (cuando está configurada) y, de lo contrario, a la imagen corta del contenedor.

### Anotaciones de Autodiscovery {#autodiscovery-annotations}

Con Autodiscovery, el Agent busca automáticamente en todas las anotaciones de Pod plantillas de integración.

Para aplicar una configuración específica a un contenedor determinado, agregue la anotación `ad.datadoghq.com/<CONTAINER_NAME>.logs` a su Pod con la configuración de registro en formato JSON.

**Nota**: Las anotaciones de Autodiscovery identifican los contenedores por nombre, **no** por imagen. Intenta hacer coincidir `<CONTAINER_NAME>` con el `.spec.containers[i].name`, no con `.spec.containers[i].image`.

<div class="alert alert-info">
Si define sus Pods de Kubernetes <i>directamente</i> (con <code>kind:Pod</code>), agregue las anotaciones de cada Pod en su <code>metadata</code> sección, como se muestra en la siguiente sección.
<br/><br/>
Si define sus Pods de Kubernetes <i>indirectamente</i> (con controladores de replicación, ReplicaSets o Deployments), agregue las anotaciones de Pod a la plantilla de Pod en <code>.spec.template.metadata</code>.</div>

#### Configurar un solo contenedor {#configure-a-single-container}
Para configurar la recopilación de registros para un contenedor determinado dentro de su Pod, agregue las siguientes anotaciones a su Pod:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOG_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

#### Ejemplo de anotaciones de Autodiscovery de registros {#example-log-autodiscovery-annotations}

La siguiente anotación de Pod define la plantilla de integración para un contenedor de ejemplo. Se define dentro de las anotaciones de la plantilla de Pod, en lugar de en el propio Deployment. Esta configuración de registro establece todos los registros del contenedor `app` con las etiquetas `source:java`, `service:example-app` y la etiqueta adicional `foo:bar`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
  labels:
    app: example-app
spec:
  selector:
    matchLabels:
      app: example-app
  template:
    metadata:
      labels:
        app: example-app
      annotations:
        ad.datadoghq.com/app.logs: '[{"source":"java", "service":"example-app", "tags":["foo:bar"]}]'
    spec:
      containers:
        - name: app
          image: owner/example-image:latest
```

#### Configure dos contenedores diferentes {#configure-two-different-containers}
Para aplicar dos plantillas de integración diferentes a dos contenedores distintos dentro de su Pod, `<CONTAINER_NAME_1>` y `<CONTAINER_NAME_2>`, agregue las siguientes anotaciones a su Pod:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME_1>.logs: '[<LOG_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_NAME_2>.logs: '[<LOG_CONFIG_2>]'
spec:
  containers:
    - name: '<CONTAINER_NAME_1>'
    # (...)
    - name: '<CONTAINER_NAME_2>'
# (...)
```

### DatadogInstrumentation CRD {#datadoginstrumentation-crd}

En lugar de anotar sus pods o implementaciones, puede usar un [`DatadogInstrumentation` recurso personalizado][23] para configurar la recopilación de registros. El siguiente ejemplo es para el contenedor `app` del Deployment `example`:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: example-logs
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: example
  config:
    logs:
      - containerName: app
        source: java
        service: example-app
        tags:
          - foo:bar
```

### Archivos de configuración de Autodiscovery {#autodiscovery-configuration-files}
Puede proporcionar al Datadog Agent archivos de configuración para que el Agent ejecute una integración especificada cuando descubra un contenedor que utilice el identificador de imagen coincidente. Esto le permite crear una configuración de registro genérica que se aplica a un conjunto de imágenes de contenedor.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Puede personalizar la recopilación de registros por integración con una anulación en el `override.nodeAgent.extraConfd.configDataMap`. Este método crea el ConfigMap y monta el archivo de configuración deseado en el contenedor del Agent.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
            - <CONTAINER_IMAGE>

            logs:
            - source: example-source
              service: example-service
```

El `<CONTAINER_IMAGE>` debe coincidir con la imagen corta del contenedor al que desea aplicar esto. Consulte el manifiesto de ejemplo [con mapeo de ConfigMap][1] para obtener un ejemplo adicional.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
Puede personalizar la recopilación de registros por integración dentro de `datadog.confd`. Este método crea el ConfigMap y monta el archivo de configuración deseado en el contenedor del Agent.

```yaml
datadog:
  #(...)
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
      - <CONTAINER_IMAGE>
      logs:
      - source: example-source
        service: example-service
```

El `<CONTAINER_IMAGE>` debe coincidir con la imagen corta del contenedor al que desea aplicar esto.

{{% /tab %}}

{{% tab "Almacén de clave-valor" %}}
Los siguientes comandos de etcd crean una plantilla de integración de Redis con un parámetro `password` personalizado y etiquetan los registros con los atributos `source` y `service` correctos:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

Observe que cada uno de los tres valores es una lista. Autodiscovery ensambla los elementos de la lista en las configuraciones de integración basándose en índices de lista compartidos. En este caso, compone la primera (y única) configuración de verificación a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.

A diferencia de los archivos auto-conf, los **almacenes de clave-valor pueden usar la imagen corta O larga como identificadores de contenedor**, por ejemplo, `redis` O `redis:latest`.

Autodiscovery puede usar [Consul][1], Etcd y Zookeeper como fuentes de plantillas de integración.

Para usar un almacén de clave-valor, configúrelo en el archivo de configuración del Agent `datadog.yaml` y monte este archivo dentro del Agent en contenedores. Alternativamente, pase su almacén de clave-valor como variables de entorno al Agent en contenedores.

#### En `datadog.yaml` {#in-datadogyaml}

En el archivo `datadog.yaml`, establezca la dirección `<KEY_VALUE_STORE_IP>` y `<KEY_VALUE_STORE_PORT>` de su almacén de clave-valor:

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      ca_file:
      ca_path:
      cert_file:
      key_file:
      username:
      password:
      token:

    - name: zookeeper
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:
  ```

Luego [reinicie el Agent][2] para aplicar el cambio de configuración.

#### En variables de entorno {#in-environment-variables}

Con el almacén de clave-valor habilitado como fuente de plantilla, el Agent busca plantillas bajo la clave `/datadog/check_configs`. Autodiscovery espera una jerarquía de clave-valor como esta:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**Nota**: Para aplicar una configuración específica a un contenedor determinado, Autodiscovery identifica los contenedores por **imagen** cuando se utilizan los almacenes de clave-valor intentando hacer coincidir `<CONTAINER_IMAGE>` con `.spec.containers[0].image`.

[1]: /es/integrations/consul/
[2]: /es/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

Para hacer coincidir una configuración de registro con un conjunto de contenedores con mayor granularidad que el nombre de la imagen corta del contenedor, consulte [Identificadores de contenedor de Autodiscovery][22].

## Recopilación de registros avanzada {#advanced-log-collection}

Utilice las etiquetas de registro de Autodiscovery para aplicar lógica de procesamiento avanzada de recopilación de registros, por ejemplo:

* [Filtrar registros antes de enviarlos a Datadog][5].
* [Eliminar datos confidenciales de sus registros][6].
* [Proceder a la agregación de varias líneas][7].

### Desde un archivo de registro local del contenedor {#from-a-container-local-log-file}

Datadog recomienda que utilice los flujos de salida `stdout` y `stderr` para aplicaciones en contenedores, de modo que pueda configurar la recopilación de registros de forma más automática.

Sin embargo, el Agent también puede recopilar registros directamente de un archivo basado en una anotación. Para recopilar estos registros, utilice `ad.datadoghq.com/<CONTAINER_NAME>.logs` con una configuración de `type: file` y `path`. Los registros recopilados de archivos con dicha anotación se etiquetan automáticamente con el mismo conjunto de etiquetas que los registros provenientes del propio contenedor. Datadog recomienda que utilice los flujos de salida `stdout` y `stderr` para aplicaciones en contenedores, de modo que pueda configurar automáticamente la recopilación de registros. Para obtener más información, consulte [Configuraciones recomendadas](#recommended-configurations).

Estas rutas de archivo son **relativas** al contenedor del Agent. Por lo tanto, el directorio que contiene el archivo de registro debe montarse tanto en la aplicación como en el contenedor del Agent para que el Agent pueda tener la visibilidad adecuada.

Por ejemplo, puede hacer esto con un volumen `hostPath` compartido. El Pod a continuación emite registros en el archivo `/var/log/example/app.log`. Esto se realiza en el directorio `/var/log/example`, donde un volumen y un volumeMount han configurado esto como un `hostPath`.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: logger
  annotations:
    ad.datadoghq.com/busybox.logs: |
      [{
          "type": "file",
          "path": "/var/log/example/app.log",
          "source": "example-source",
          "service": "example-service"
      }]
spec:
  containers:
   - name: busybox
     image: busybox
     command: [ "/bin/sh", "-c", "--" ]
     args: [ "while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;" ]
     volumeMounts:
     - name: applogs
       mountPath: /var/log/example
  volumes:
     - name: applogs
       hostPath:
         path: /var/log/example
```

La ruta equivalente de volumen y volumeMount debe configurarse en el contenedor del Agent para que pueda leer ese mismo archivo de registro.

```yaml
  containers:
  - name: agent
    # (...)
    volumeMounts:
    - mountPath: /var/log/example
      name: applogs
    # (...)
  volumes:
  - name: applogs
    hostPath:
      path: /var/log/example
    # (...)
```
#### Configuraciones recomendadas {#recommended-configurations}
- Esta estrategia puede funcionar para un pod determinado, pero puede volverse complicada con múltiples aplicaciones que utilizan esta estrategia. También puede encontrarse con problemas si varias réplicas utilizan la misma ruta de registro. Si es posible, Datadog recomienda aprovechar las [variables de plantilla de Autodiscovery][17] `%%kube_pod_name%%`. Por ejemplo, puede configurar su `path` para hacer referencia a esta variable: `"path": "/var/log/example/%%kube_pod_name%%/app.log"`. Su pod de aplicación también necesita escribir sus archivos de registro con respecto a esta nueva ruta. Puede utilizar la [Downward API][18] para ayudar a su aplicación a determinar el nombre de su Pod.

- Al utilizar este tipo de anotación con un contenedor, los registros `stdout` y `stderr` no se recopilan automáticamente del contenedor. Si se necesita la recolección tanto de los flujos de salida del contenedor como del archivo, habilítelo explícitamente en la anotación. Por ejemplo:
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- Al usar este tipo de combinación, `source` y `service` no tienen un valor predeterminado para los registros recopilados de un archivo y deben establecerse explícitamente en la anotación.

## Solución de problemas {#troubleshooting}

Para conocer los pasos de solución de problemas, consulte [Solución de problemas de recolección de registros de contenedores][21].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/faq/log-collection-with-docker-socket/
[2]: /es/agent/kubernetes/
[3]: /es/integrations/#cat-autodiscovery
[4]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[5]: /es/agent/logs/advanced_log_collection/?tab=kubernetes#filter-logs
[6]: /es/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[7]: /es/agent/logs/advanced_log_collection/?tab=kubernetes#multi-line-aggregation
[8]: /es/agent/guide/autodiscovery-management/
[9]: /es/containers/guide/kubernetes_daemonset/#log-collection
[10]: /es/getting_started/containers/autodiscovery
[11]: /es/logs/log_configuration/attributes_naming_convention/
[12]: /es/getting_started/tagging/assigning_tags/#integration-inheritance
[13]: https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-location-node
[14]: /es/containers/kubernetes/tag
[15]: /es/logs/log_configuration/pipelines/?tab=source#integration-pipelines
[16]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[17]: /es/containers/guide/template_variables/
[18]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/
[19]: /es/containers/kubernetes/log/?tab=helm#autodiscovery-annotations
[20]: /es/containers/kubernetes/log/?tab=helm#autodiscovery-configuration-files
[21]: /es/containers/troubleshooting/log-collection/?tab=datadogoperator
[22]: /es/containers/guide/ad_identifiers/
[23]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/