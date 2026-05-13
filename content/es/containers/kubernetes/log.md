---
aliases:
- /es/agent/kubernetes/log
description: Configura la recopilación de registros de aplicaciones en contenedores
  que se ejecutan en Kubernetes utilizando el Datadog Agent.
further_reading:
- link: https://www.datadoghq.com/blog/eks-fargate-logs-datadog
  tag: Blog
  text: Monitorea los registros de Amazon EKS en Fargate con Datadog.
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recoge las trazas de tu aplicación
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recoge tus métricas de Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Recoge automáticamente las métricas y registros de tus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recolección de datos a un subconjunto de contenedores solamente
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asigna etiquetas a todos los datos emitidos por un contenedor
- link: /containers/troubleshooting/log-collection
  tag: Documentación
  text: Solución de problemas de recopilación de registros de contenedores
title: Recopilación de registros de Kubernetes
---
Esta página explica la recopilación de registros de archivos de registro en Kubernetes.

Cuando tus aplicaciones en contenedores escriben sus registros en la salida estándar y error (`stdout`/`stderr`), el tiempo de ejecución del contenedor y Kubernetes gestionan automáticamente los registros por ti. El patrón predeterminado es que [Kubernetes almacena estos flujos de registro como archivos][13] en el host en la carpeta `/var/log/pods` y subcarpetas para cada Pod y contenedor.

El Datadog Agent puede recopilar estos archivos de registro de Kubernetes para estos contenedores utilizando las instrucciones a continuación. Esta opción se adapta bien a la naturaleza efímera de los Pods que crea Kubernetes y es más eficiente en recursos que recopilar registros del socket de Docker. Datadog recomienda este método para la recolección de registros en Kubernetes.

Alternativamente, el Datadog Agent también puede recopilar registros mediante solicitudes repetidas a la API de Docker a través del socket de Docker. Sin embargo, esto requiere Docker como el tiempo de ejecución del contenedor para tu clúster de Kubernetes. Esto también es más intensivo en recursos que usar archivos de registro. Para ver cómo recolectar registros utilizando el socket de Docker, consulte [Recolección de registros con el socket de Docker][1]. Si tus aplicaciones en contenedores están escribiendo en archivos de registro almacenados en el contenedor, esto puede complicar la recolección de registros. Vea [la recolección de registros desde un archivo](#from-a-container-local-log-file).

## Configuración {#setup}

### Recolección de registros {#log-collection}

Antes de comenzar a recopilar los registros de la aplicación, asegúrate de que estás ejecutando el Datadog Agent en tu clúster de Kubernetes.

Para configurar la recolección de registros manualmente en el DaemonSet, consulta [Recolección de registros del DaemonSet][9]. De lo contrario, sigue las instrucciones a continuación:

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

Actualiza tu `datadog-agent.yaml` manifiesto con:

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

Luego, aplica la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

Consulta el ejemplo de [manifiesto con registros, métricas y recolección de APM habilitada][1] para un ejemplo adicional. Puedes establecer `features.logCollection.containerCollectAll` en `true` para recopilar registros de todos los contenedores descubiertos por defecto. Cuando se establece en `false` (por defecto), necesitas especificar las configuraciones de registro de Autodiscovery para habilitar la recopilación de registros. Para más información, consulta [Descubrimiento de registros - Filtrado](#filtering).

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Para habilitar la recolección de registros con Helm, actualiza tu archivo [datadog-values.yaml][1] con la siguiente configuración de recolección de registros. Luego, actualiza tu gráfico de Helm de Datadog:

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

Puedes establecer `datadog.logs.containerCollectAll` en `true` para recopilar registros de todos los contenedores descubiertos por defecto. Cuando se establece en `false` (por defecto), necesitas especificar las configuraciones de registro de Autodiscovery para habilitar la recopilación de registros. Para más información, consulta [Descubrimiento de registros - Filtrado](#filtering).

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### Sin privilegios {#unprivileged}

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
(Opcional) Para ejecutar una instalación sin privilegios, agrega lo siguiente al [recurso personalizado de DatadogAgent][1]:

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

- Reemplaza `<USER_ID>` con el UID para ejecutar el Agente.
- Reemplaza `<DOCKER_GROUP_ID>` con el ID de grupo que posee el socket de Docker o containerd.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

(Opcional) Para ejecutar una instalación sin privilegios, agrega lo siguiente en el archivo `values.yaml`:

```yaml
datadog:
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <DOCKER_GROUP_ID>
```

- Reemplaza `<USER_ID>` con el UID para ejecutar el Agente.
- Reemplaza `<DOCKER_GROUP_ID>` con el ID de grupo que posee el socket de Docker o containerd.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>Advertencia para instalaciones sin privilegios</strong>
<br/><br/>
Al ejecutar una instalación sin privilegios, el Agente necesita poder leer archivos de registro en <code>/var/log/pods</code>.
<br/><br/>
Si estás utilizando el runtime de containerd, los archivos de registro en <code>/var/log/pods</code> son legibles por los miembros del <code>root</code> grupo. Con las instrucciones anteriores, el Agente se ejecuta con el <code>root</code> grupo. No se requiere ninguna acción.
<br/><br/>
Si estás utilizando el runtime de Docker, los archivos de registro en <code>/var/log/pods</code> son enlaces simbólicos a <code>/var/lib/docker/containers</code>, que solo es accesible por el <code>root</code> usuario. Por lo tanto, con el runtime de Docker, no es posible que un Agent lea registros.<code>root</code> Agente lea registros en <code>/var/log/pods</code>. El socket de Docker debe estar montado en el contenedor del Agente, para que pueda obtener registros de Pod a través del demonio de Docker.
<br/><br/>
Para recopilar registros de <code>/var/log/pods</code> cuando el socket de Docker está montado, establezca la variable de entorno <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (o <code>logs_config.k8s_container_use_file</code> en <code>datadog.yaml</code>) a <code>true</code>. Esto obliga al Agente a utilizar el modo de recolección de archivos.
</div>

## Descubrimiento de registros {#log-discovery}

El Agente de Datadog en Kubernetes se despliega mediante un DaemonSet (gestionado por el Operador de Datadog o Helm). Este DaemonSet programa una réplica del Pod del Agente en cada nodo del clúster. Cada Pod del Agente es responsable de reportar los registros de los otros Pods y contenedores en su respectivo nodo. Cuando la función "Container Collect All" está habilitada, el Agent reporta los registros de cada contenedor descubierto con un conjunto de etiquetas predeterminado.

### Filtrado {#filtering}

Cuando "Container Collect All" está habilitada, puedes configurar de qué contenedores deseas recolectar registros. Esto puede ser útil para evitar la recolección de los registros del Datadog Agent, si así se desea. Puedes hacer esto pasando configuraciones al Datadog Agent para controlar lo que extrae, o pasando configuraciones al pod de Kubernetes para excluir ciertos registros de manera más explícita.

Al filtrar registros a través de métodos como `DD_CONTAINER_EXCLUDE_LOGS` o `ad.datadoghq.com/logs_exclude`, el Agent ignora la recolección de registros independientemente de las configuraciones de recolección de registros definidas explícitamente en [anotaciones de Autodiscovery][19] o [archivos de configuración de Autodiscovery][20].

Cuando "Container Collect All" está deshabilitada (predeterminado), no necesitas agregar ningún filtrado porque todo se excluye por defecto. Para incluir la recolección solo para pods seleccionados, puedes habilitar la configuración de registros mediante [anotaciones de Autodiscovery][19] o [archivos de configuración de Autodiscovery][20] para los pods deseados.

Consulta [Container Discovery Management][8] para aprender más sobre el filtrado.

### Etiquetado {#tagging}

El Datadog Agent etiqueta los registros de los contenedores de Kubernetes con las [Kubernetes tags][14] predeterminadas, así como cualquier etiqueta extraída personalizada. Cuando "Container Collect All" está habilitada, el Agent reporta los registros de un contenedor con una etiqueta `source` y `service` que coincide con el nombre corto de la imagen del contenedor. Por ejemplo, los registros de un contenedor que utiliza la imagen de contenedor `gcr.io/owner/example-image:latest` tendrían `example-image` como el valor de las etiquetas `source`, `service` y `short_image`.

La etiqueta `service` también se puede establecer mediante la etiqueta de pod `tags.datadoghq.com/service: "<SERVICE>"` del [Unified Service Tagging][4]. Para más información sobre los atributos `source` y `service`, consulte [Atributos Reservados][11].

La etiqueta `source` puede ser importante para tus registros, ya que las [canalizaciones de registro listas para usar][15] se filtran utilizando esta etiqueta. Sin embargo, estas canalizaciones se pueden personalizar completamente según se desee. Puedes ver los pasos en la sección [Registros de Integración](#integration-logs) a continuación para personalizar aún más las etiquetas en tus registros.

## Registros de integración {#integration-logs}

[Autodiscovery][10] te permite usar plantillas para configurar la recolección de registros (y otras capacidades) en contenedores. Esto se puede usar para habilitar la recolección de registros, personalizar el etiquetado y agregar reglas de recolección avanzadas. Para configurar la recolección de logs para una integración con Autodiscovery, puede hacer lo siguiente:

- Especificar una configuración de logs como Autodiscovery Annotations en un Pod dado, para configurar las reglas para un contenedor dado *(Recomendado)*.
- Especifica una configuración de logs como un archivo de configuración, para establecer las reglas para cada contenedor según su imagen.

Como mínimo, estas configuraciones de logs requieren una etiqueta `source` y `service`. Es posible que desee hacer coincidir la etiqueta `source` con una de las [canalizaciones de logs listas para usar][15] de Datadog para ayudar a enriquecer automáticamente sus logs. También puede encontrar una [biblioteca de canalizaciones en Datadog][16].

### Anotaciones de Autodiscovery {#autodiscovery-annotations}

Con Autodiscovery, el Agente busca automáticamente todas las anotaciones de Pod para plantillas de integración.

Para aplicar una configuración específica a un contenedor dado, agrega la anotación `ad.datadoghq.com/<CONTAINER_NAME>.logs` a tu Pod con la configuración de logs en formato JSON. 

**Nota**: Las anotaciones de Autodiscovery identifican contenedores por nombre, **no** por imagen. Intenta hacer coincidir `<CONTAINER_NAME>` con `.spec.containers[i].name`, no con `.spec.containers[i].image`.

<div class="alert alert-info">
Si defines tus Pods de Kubernetes <i>directamente</i> (con <code>kind:Pod</code>), agrega las anotaciones de cada Pod en su <code>metadata</code> sección, como se muestra en la siguiente sección.
<br/><br/>
Si defines tus Pods de Kubernetes <i>indirectamente</i> (con controladores de replicación, ReplicaSets o Deployments), agrega las anotaciones del Pod a la plantilla del Pod bajo <code>.spec.template.metadata</code>.</div>

#### Configura un solo contenedor {#configure-a-single-container}
Para configurar la recolección de logs para un contenedor dado dentro de tu Pod, agrega las siguientes anotaciones a tu Pod:

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

#### Ejemplo de anotaciones de Autodiscovery de logs {#example-log-autodiscovery-annotations}

La siguiente anotación del Pod define la plantilla de integración para un contenedor de ejemplo. Se define dentro de las anotaciones de la plantilla del Pod, en lugar de en el Deployment mismo. Esta configuración de logs establece todos los logs del contenedor `app` con las etiquetas `source:java`, `service:example-app` y la etiqueta adicional `foo:bar`.

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

#### Configura dos contenedores diferentes {#configure-two-different-containers}
Para aplicar dos plantillas de integración diferentes a dos contenedores diferentes dentro de tu Pod, `<CONTAINER_NAME_1>` y `<CONTAINER_NAME_2>`, agrega las siguientes anotaciones a tu Pod:

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

### Archivos de configuración de Autodiscovery {#autodiscovery-configuration-files}
Puedes proporcionar al Datadog Agent archivos de configuración para que éste ejecute una integración especificada cuando descubra un contenedor utilizando el identificador de imagen correspondiente. Esto te permite crear una configuración de logs genérica que se aplica a un conjunto de imágenes de contenedor.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Puedes personalizar la recolección de logs por integración con una anulación en el `override.nodeAgent.extraConfd.configDataMap`. Este método crea el ConfigMap y monta el archivo de configuración deseado en el contenedor del Datadog Agent.

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

El `<CONTAINER_IMAGE>` debe coincidir con la imagen corta del contenedor a la que deseas que se aplique. Consulta el manifiesto de muestra [con mapeo de ConfigMap][1] para un ejemplo adicional.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
Puedes personalizar la recolección de logs por integración dentro de `datadog.confd`. Este método crea el ConfigMap y monta el archivo de configuración deseado en el contenedor del Datadog Agent.

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

El `<CONTAINER_IMAGE>` debe coincidir con la imagen corta del contenedor a la que deseas que se aplique.

{{% /tab %}}

{{% tab "Almacenamiento de clave-valor" %}}
Los siguientes comandos de etcd crean una plantilla de integración de Redis con un parámetro `password` personalizado y etiquetan los registros con los atributos correctos `source` y `service`:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

Observe que cada uno de los tres valores es una lista. Autodiscovery ensambla los elementos de la lista en las configuraciones de integración basándose en los índices de lista compartidos. En este caso, compone la primera (y única) configuración de verificación a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.

A diferencia de los archivos de auto-conf, **los almacenes de clave-valor pueden usar el nombre de imagen corto o largo como identificadores de contenedor**, por ejemplo, `redis` O `redis:latest`.

Autodiscovery puede usar [Consul][1], Etcd y Zookeeper como fuentes de plantillas de integración.

Para usar un almacén de clave-valor, configúralo en el archivo de configuración del Datadog Agent `datadog.yaml` y monta este archivo dentro del Datadog Agent. Alternativamente, pasa tu almacén de clave-valor como variables de entorno al Datadog Agent.

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

Luego [reinicia el Datadog Agent][2] para aplicar el cambio de configuración.

#### En variables de entorno {#in-environment-variables}

Con el almacén de clave-valor habilitado como fuente de plantilla, el Datadog Agent busca plantillas bajo la clave `/datadog/check_configs`. Autodiscovery espera una jerarquía de clave-valor como esta:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**Nota**: Para aplicar una configuración específica a un contenedor dado, Autodiscovery identifica los contenedores por **imagen** al usar los almacenes de clave-valor intentando hacer coincidir `<CONTAINER_IMAGE>` con `.spec.containers[0].image`.

[1]: /es/integrations/consul/
[2]: /es/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

Para hacer coincidir una configuración de log con un conjunto de contenedores con más granularidad que la imagen corta del contenedor, consulte [Identificadores de Contenedor de Autodetección][22].

## Recolección avanzada de logs {#advanced-log-collection}

Utiliza etiquetas de logs de Autodiscovery para aplicar lógica de procesamiento avanzada en la recolección de logs, por ejemplo:

* [Filtrar logs antes de enviarlos a Datadog][5].
* [Elimina datos sensibles de tus logs][6].
* [Procede a la agregación de múltiples líneas][7].

### Desde un archivo de log local del contenedor {#from-a-container-local-log-file}

Datadog recomienda que utilices los flujos de salida `stdout` y `stderr` para aplicaciones en contenedores, de modo que puedas configurar de forma más automática la recolección de logs.

Sin embargo, el Datadog Agent también puede recolectar logs directamente de un archivo basado en una anotación. Para recolectar estos logs, utiliza `ad.datadoghq.com/<CONTAINER_NAME>.logs` con una configuración de `type: file` y `path`. Los logs recolectados de archivos con tal anotación se etiquetan automáticamente con el mismo conjunto de etiquetas que los logs provenientes del contenedor. Datadog recomienda que utilices los flujos de salida `stdout` y `stderr` para aplicaciones en contenedores, de modo que puedas configurar automáticamente la recolección de logs. Para más información, consulta las [Configuraciones recomendadas](#recommended-configurations).

Estas rutas de archivo son **relativas** al contenedor del Datadog Agent. Por lo tanto, el directorio que contiene el archivo de log necesita ser montado tanto en la aplicación como en el contenedor del Datadog Agent para que éste pueda tener la visibilidad adecuada.

Por ejemplo, puedes hacer esto con un volumen compartido `hostPath`. El Pod a continuación está emitiendo logs en el archivo `/var/log/example/app.log`. Esto se realiza en el directorio `/var/log/example`, donde un volumen y un volumeMount han establecido esto como un `hostPath`.

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

La ruta equivalente del volumen y del volumeMount necesita ser configurada en el contenedor del Datadog Agent para que pueda leer ese mismo archivo de log.

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
- Esta estrategia puede funcionar para un pod dado, pero puede volverse engorrosa con múltiples aplicaciones utilizando esta estrategia. También puedes encontrar problemas si múltiples réplicas están utilizando la misma ruta de log. Si es posible, Datadog recomienda aprovechar la [variable de plantilla de Autodiscovery][17] `%%kube_pod_name%%`. Por ejemplo, puedes configurar tu `path` para hacer referencia a esta variable: `"path": "/var/log/example/%%kube_pod_name%%/app.log"`. Tu pod de aplicación también necesita escribir sus archivos de logs con respecto a esta nueva ruta. Puedes usar el [Downward API][18] para ayudar a tu aplicación a determinar el nombre de su Pod.

- Al usar este tipo de anotación con un contenedor, `stdout` y `stderr` los logs no se recopilan automáticamente del contenedor. Si se necesita la recopilación de ambas corrientes de salida del contenedor y del archivo, habilita esto explícitamente en la anotación. Por ejemplo:
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- Al usar este tipo de combinación, `source` y `service` no tienen un valor predeterminado para los logs recolectados de un archivo y deben establecerse explícitamente en la anotación.

## Solucionando problemas {#troubleshooting}

Para pasos de solución de problemas, consulta [Solución de Problemas de Recopilación de Logs de Contenedores][21].

## Lectura adicional {#further-reading}

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