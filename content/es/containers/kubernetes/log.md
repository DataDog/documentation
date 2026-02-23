---
aliases:
- /es/agent/kubernetes/log
description: Configura la recopilación de logs de las aplicaciones en contenedores
  que se ejecutan en Kubernetes utilizando el Datadog Agent
further_reading:
- link: https://www.datadoghq.com/blog/eks-fargate-logs-datadog
  tag: Blog
  text: Monitorizar logs de Amazon EKS en Fargate con Datadog
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopilar tus trazas (traces) de aplicaciones
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopilar tus métricas de Prometheus
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Recopilar las métricas de tus aplicaciones y logs automáticamente
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limitar la recopilación de datos a un subconjunto de contenedores
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asignar etiquetas (tags) a todos los datos emitidos por un contenedor
title: Recopilación de logs de Kubernetes
---

Esta página trata sobre la recopilación de logs a partir de los archivos de log de Kubernetes.

Cuando tus aplicaciones en contenedores escriben sus logs a la salida y al error (`stdout`/`stderr`) estándar, el tiempo de ejecución del contenedor y Kubernetes gestionan automáticamente los logs. El patrón por defecto consiste en que [Kubernetes almacene estos flujos (streams) de logs como archivos][13] en el host, en la carpeta `/var/log/pods` y las subcarpetas de cada pod y contenedor.

El Datadog Agent puede recopilar estos archivos de logs Kubernetes de estos contenedores siguiendo las instrucciones que se indican a continuación. Esta opción se adapta bien a la naturaleza efímera de los pods que crea Kubernetes y es más eficiente en cuanto a recursos que la recopilación de logs desde el socket Docker. Datadog recomienda este método para la recopilación de logs en Kubernetes.

Alternativamente, el Datadog Agent también puede recopilar logs mediante solicitudes repetidas a la API Docker a través del socket Docker. Sin embargo, esto requiere que Docker sea el tiempo de ejecución del contenedor de tu clúster Kubernetes. Esto también consume más recursos que el uso de archivos de logs. Para saber cómo recopilar logs utilizando el socket Docker, consulta [Recopilación de logs con el socket Docker][1]. Si tus aplicaciones en contenedores escriben en archivos de logs almacenados en un contenedor, esto puede complicar la recopilación de logs. Consulta la [recopilación de logs a partir de un archivo](#from-a-container-local-log-file).

## Configuración

### Recopilación de logs

Antes de empezar a recopilar logs de aplicación, asegúrate de que estás ejecutando el Datadog Agent en tu clúster Kubernetes.

Para configurar la recopilación de logs manualmente con un DaemonSet, consulta [Recopilación de logs con DaemonSet][9]. De lo contrario, sigue las siguientes instrucciones:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Actualiza tu manifiesto `datadog-agent.yaml` con:

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

A continuación, aplica la nueva configuración:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

Consulta el ejemplo de [manifiesto con la recopilación de logs, métricas y APM activada][1] para ver un ejemplo adicional. Puedes configurar `features.logCollection.containerCollectAll` como `true` para recopilar logs de todos los contenedores detectados por defecto. Cuando se configura como `false` (por defecto), es necesario especificar configuraciones de log de Autodiscovery para habilitar la recopilación de logs. Para obtener más información, consulta [Detección de logs - Filtrado](#filtering).

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Para habilitar la recopilación de logs con Helm, actualiza tu archivo [datadog-values.yaml][1] con la siguiente configuración para la recopilación de logs. Luego, actualiza tu Datadog Helm chart:

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

Puedes configurar `datadog.logs.containerCollectAll` como `true` para recopilar logs de todos los contenedores detectados por defecto. Cuando se configura como `false` (por defecto), es necesario definir configuraciones de logs Autodiscovery para habilitar la recopilación de logs. Para obtener más información, consulta [Detección de logs - Filtrado](#filtering).

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### Sin privilegios

{{< tabs >}}
{{% tab "Datadog Operator" %}}
(Opcional) Para ejecutar una instalación sin privilegios, añade lo siguiente al [recurso personalizado DatadogAgent][1]:

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

- Sustituye `<USER_ID>` por el UID para ejecutar el Agent
- Sustituye `<DOCKER_GROUP_ID>` por el ID del grupo al que pertenece el socket de Docker o containerd.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

(Opcional) Para ejecutar una instalación sin privilegios, añade lo siguiente en el archivo `values.yaml`:

```yaml
datadog:
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <DOCKER_GROUP_ID>
```

- Sustituye `<USER_ID>` por el UID para ejecutar el Agent.
- Sustituye `<DOCKER_GROUP_ID>` por el ID del grupo al que pertenece el socket de Docker o containerd.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>Advertencia para instalaciones sin privilegios</strong>
<br/><br/>
Cuando se ejecuta una instalación sin privilegios, el Agent debe poder leer archivos de log en <code>/var/log/pods</code>.
<br/><br/>
Si estás utilizando el tiempo de ejecución de containerd, los archivos de log en <code>/var/log/pods</code> son legibles por los miembros del grupo <code>raíz</code>. Con las instrucciones anteriores, el Agent se ejecuta con el grupo <code>raíz</code>. No es necesario realizar ninguna acción.
<br/><br/>
Si estás utilizando el tiempo de ejecución de Docker, los archivos de log en <code>/var/log/pods</code> son enlaces simbólicos a <code>/var/lib/docker/containers</code> que solo puede recorrer el usuario <code>raíz</code>. Consecuentemente, con el tiempo de ejecución de Docker, no es posible para un Agent que <code>no</code> raíz leer logs en <code>/var/log/pods</code>. El socket de Docker debe estar montado en contenedor del Agent, para que pueda obtener logs de pod a través del daemon de Docker.
<br/><br/>
Para recopilar logs de <code>/var/log/pods/</code> cuando el socket de Docker está montado, establece la variable entorno <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (o <code>logs_config.k8s_container_use_file</code> en <code>datadog.yaml</code>) en <code>true</code>. Esto fuerza al Agent a utilizar el modo de recopilación de archivos.
</div>

## Detección de logs

El Datadog Agent en Kubernetes es desplegado por un DaemonSet (gestionado por el Datadog Operator o Helm). Este DaemonSet programa una réplica de pod del Agent en cada nodo del clúster. Cada pod del Agent es entonces responsable de informar de logs de los otros pods y contenedores en su nodo respectivo. Cuando la función "Contenedor recopilar todo" está activada, el Agent informa de los logs de cada contenedor detectado con un conjunto predeterminado de etiquetas (tags).

### Filtrado

Cuando "Contenedor recopilar todo" está activado, puedes configurar de qué contenedores quieres recopilar logs. Esto puede ser útil para evitar la recopilación de logs del Datadog Agent, si así lo prefieres. Puedes hacerlo pasando configuraciones al Datadog Agent para controlar lo que recopila o pasando configuraciones al pod Kubernetes para excluir ciertos logs más explícitamente.

Cuando se filtran logs utilizando métodos como `DD_CONTAINER_EXCLUDE_LOGS` o `ad.datadoghq.com/logs_exclude`, el Agent ignora la recopilación de logs independientemente de las configuraciones para la recopilación de logs definidas explícitamente en [anotaciones de Autodiscovery][19] o [archivos de configuración de Autodiscovery][20].

Cuando la opción "Contenedor recopilar todo" está desactivada (por defecto), no necesitas añadir ningún filtro, ya que todo está excluido por defecto. Para incluir la recopilación sólo para los pods seleccionados, puedes habilitar la configuración de logs mediante [anotaciones de Autodiscovery][19] o [archivos de configuración de Autodiscovery][20] para los pods elegidos.

Para obtener más información sobre el filtrado, consulta [Gestión de la detección de contenedores][8].

### Etiquetado

El Datadog Agent etiqueta logs de contenedores Kubernetes con [etiquetas (tags) Kubernetes][14] predeterminadas, así como con cualquier etiqueta (tag) personalizada extraída. Cuando "Contenedor recopilar todo" está activado, el Agent informa de logs de un contenedor con una etiqueta (tag) `source` y `service` que coincida con el nombre de imagen corto del contenedor. Por ejemplo, los logs de un contenedor que utiliza la imagen de contenedor `gcr.io/owner/example-image:latest` tendría `example-image` como valor de etiqueta (tag) `source`, `service` y `short_image`.

La etiqueta (tag) `service` también puede definirse mediante la etiqueta (label) del pod de [Etiquetado unificado de servicios][4] `tags.datadoghq.com/service: "<SERVICE>"`. Para obtener más información sobre los atributos `source` y `service`, consulta los [atributos reservados][11].

La etiqueta (tag) `source` puede ser importante para tus logs, ya que los [pipelines de logs predefinidos][15] se filtran con esta etiqueta (tag). Sin embargo, estos pipelines se pueden personalizar completamente, si así lo prefieres. Para personalizar aún más las etiquetas (tags) de tus logs, consulta los pasos en la sección [Logs de integración](#integration-logs) más abajo.

## Logs de integración

[Autodiscovery][10] te permite utilizar plantillas para configurar la recopilación de logs (y otras capacidades) en contenedores. Esta opción puede utilizarse para habilitar la recopilación de logs, personalizar el etiquetado y añadir reglas de recopilación avanzadas. Para configurar la recopilación de logs para una integración con Autodiscovery puedes:

- Especifica una configuración de log como anotaciones Autodiscovery en un pod concreto, para configurar las reglas de un contenedor concreto *(recomendado)*.
- Especifica una configuración de log como archivo de configuración, para configurar las reglas de cada contenedor coincidente por imagen.

Como mínimo, estas configuraciones de logs requieren una etiqueta (tag) `source` y `service`. Es posible que quieras hacer coincidir la etiqueta (tag) `source` con uno de los [pipelines de logs predefinidos][15] de Datadog para ayudarte a enriquecer automáticamente tus logs. También puedes encontrar una [biblioteca de pipelines en Datadog][16].

### Anotaciones de Autodiscovery

Con Autodiscovery, el Agent busca automáticamente plantillas de integración en todas las anotaciones de pod.

Para aplicar una configuración específica a un contenedor concreto, añade la anotación `ad.datadoghq.com/<CONTAINER_NAME>.logs` a tu pod con la configuración de log con formato JSON.

**Nota**: Las anotaciones Autodiscovery identifican los contenedores por su nombre, **no** por su imagen. Intenta hacer coincidir el `<CONTAINER_NAME>` con el `.spec.containers[i].name`, no con la `.spec.containers[i].image`.

<div class="alert alert-info">
Si defines tus pods Kubernetes <i>directamente</i> (con <code>kind:Pod</code>), añade las anotaciones de cada pod en su sección de <code>metadatos</code>, como se muestra en la siguiente sección.
<br/><br/>
Si defines tus pods Kubernetes <i>indirectamente</i> (con controladores de replicación, ReplicaSets o despliegues), añade anotaciones de pod a la plantilla de pod en <code>.spec.template.metadata</code>.</div>

#### Configurar un solo contenedor
Para configurar la recopilación de logs de un contenedor concreto dentro de tu pod, añade las siguientes anotaciones a tu pod:

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

#### Ejemplo de anotaciones de logs Autodiscovery

La siguiente anotación de pod define la plantilla de integración para un ejemplo de contenedor. Se define dentro de las anotaciones de la plantilla de pod, en lugar de en el propio despliegue. Esta configuración de log configura todos los logs del contenedor `app` con las etiquetas (tags) `source:java` y `service:example-app`, y la etiqueta (tag) adicional `foo:bar`.

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

#### Configurar dos contenedores diferentes
Para aplicar dos plantillas de integración diferentes a dos contenedores distintos dentro de tu pod, `<CONTAINER_NAME_1>` y `<CONTAINER_NAME_2>`, añade las siguientes anotaciones a tu pod:

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

### Archivos de configuración de Autodiscovery
Puedes proporcionar archivos de configuración al Datadog Agent para que ejecute una integración especificada cuando detecte un contenedor que utiliza el identificador de imagen coincidente. Esto permite crear una configuración de log genérica que se aplica a un conjunto de imágenes de contenedor.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Puede personalizar la colección Logs por integración con un override en el `override.nodeAgent.extraConfd.configDataMap`. Este método crea el ConfigMap y monta el archivo Configuración deseado en el Agent Contenedor .

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

La `<CONTAINER_IMAGE>` debe coincidir con el nombre de imagen corto del contenedor al que quieres que se aplique. Para ver un ejemplo adicional, consulta el ejemplo de manifiesto [con la asignación ConfigMap][1].

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
Puede personalizar la colección Logs por integración dentro de `datadog.confd`. Este método crea el ConfigMap y monta el archivo Configuración deseado en el Agent Contenedor .

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

La `<CONTAINER_IMAGE>` debe coincidir con el nombre de imagen corto del contenedor al que quieres que se aplique.

{{% /tab %}}

{{% tab "Key-value store" %}}
Los siguientes comandos etcd crean una plantilla de integración Redis con un parámetro `password` personalizado y etiqueta logs con los atributos `source` y `service` correctos:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

Fíjate que cada uno de los tres valores es una lista. Autodiscovery agrupa los elementos de la lista en configuraciones de integraciones basadas en índices de lista compartidos. En este caso, define la primera (y única) configuración de checks a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.

A diferencia de los archivos de configuración automática, **los almacenes de clave-valor pueden utilizar el nombre corto O largo de la imagen como identificadores de contenedor**, por ejemplo, `redis` O `redis:latest`.

Autodiscovery puede utilizar [Consul][1], Etcd y Zookeeper como fuentes de plantillas de integración.

Para utilizar un almacén de clave-valor, configúralo en el archivo de configuración `datadog.yaml` del Agent y monta este archivo dentro del contenedor del Agent. Otra opción es pasar el almacén de clave-valor como variables de entorno al contenedor del Agent.

#### En `datadog.yaml`

En el archivo `datadog.yaml`, configura la dirección `<KEY_VALUE_STORE_IP>` y el`<KEY_VALUE_STORE_PORT>` de tu base de datos clave-valor:

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

Luego, [reinicia el Agent][2], para aplicar el cambio de configuración.

#### En variables de entorno

Si la base de datos clave-valor se ha activado como fuente de plantillas, el Agent busca plantillas con la clave `/datadog/check_configs`. Autodiscovery espera una jerarquía clave-valor como la siguiente:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**Nota**: Para aplicar una configuración específica a un contenedor, cuando Autodiscovery utiliza los almacenes clave-valor, identifica los contenedores por **imagen**, intentando que `<CONTAINER_IMAGE>` coincida con `.spec.containers[0].image`.

[1]: /es/integrations/consul/
[2]: /es/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## Recopilación avanzada de logs

Utiliza etiquetas (labels) de logs de Autodiscovery para aplicar la lógica de procesamiento de la recopilación avanzada de logs, por ejemplo:

* [Filtrar logs antes de enviarlos a Datadog][5].
* [Borrar los datos confidenciales de tus logs][6].
* [Proceder a la agregación multilínea][7].

### A partir de un archivo de log de contenedor local

Datadog recomienda que utilices los flujos de salida `stdout` y `stderr` para aplicaciones en contenedores, de modo que puedas configurar más automáticamente la recopilación de logs.

Sin embargo, el Agent también puede recopilar directamente logs de un archivo basándose en una anotación. Para recopilar estos logs, utiliza `ad.datadoghq.com/<CONTAINER_NAME>.logs` con una configuración de `type: file` y `path`. Los logs recopilados de archivos con dicha anotación se etiquetan automáticamente con el mismo conjunto de etiquetas que los logs procedentes del propio contenedor. Datadog recomienda utilizar los flujos de salida `stdout` y `stderr` para las aplicaciones en contenedores, de modo que puedas configurar automáticamente la recopilación de logs. Para más información, consulta [Configuraciones recomendadas](#recommended-configurations).

Estas rutas de archivo son **relativas** al contenedor del Agent. Por lo tanto, el directorio que contiene el archivo de log debe montarse tanto en la aplicación como en el contenedor del Agent para que éste pueda tener la visibilidad adecuada.

Por ejemplo, puedes hacerlo con un volumen `hostPath` compartido. El pod a continuación está emitiendo logs en el archivo `/var/log/example/app.log`. Esto se hace en el directorio `/var/log/example`, donde un volumen y volumeMount lo han establecido como `hostPath`.

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

El volumen equivalente y la ruta volumeMount deben establecerse en el contenedor del Agent para que pueda leer el mismo archivo de log.

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
#### Configuraciones recomendadas
- Esta estrategia puede funcionar para un pod concreto, pero puede resultar engorrosa cuando varias aplicaciones utilizan esta estrategia. También puedes tener problemas si varias réplicas utilizan la misma ruta de logs. Cuando sea posible, Datadog recomienda aprovechar la [variable de plantilla Autodiscovery][17] `%%kube_pod_name%%`. Por ejemplo, puedes configurar tu `path` para que haga referencia a esta variable: `"path": "/var/log/example/%%kube_pod_name%%/app.log"`. A continuación, tu pod de aplicación también debe escribir sus archivos de logs en función de esta nueva ruta. Puedes utilizar la [API descendente][18] para ayudar a tu aplicación a determinar su nombre de pod.

- Cuando se utiliza este tipo de anotación con un contenedor, los logs `stdout` y `stderr` no se recopilan automáticamente desde el contenedor. Si se necesita la recopilación tanto de flujos de salida del contenedor como de un archivo, esto debe habilitarse explícitamente en la anotación. Por ejemplo:
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- Cuando se utiliza este tipo de combinación, `source` y `service` no tienen un valor por defecto para logs recopilados de un archivo y deben establecerse explícitamente en la anotación.

## Solucionar problemas

#### Contenedores de corta duración

Por defecto, Agent busca nuevos contenedores cada 5 segundos.

Para Agent v6.12+, los logs de contenedor de corta duración (detenidos o bloqueados) se recopilan automáticamente cuando se utiliza el método de recopilación de logs de archivos K8s (a través de `/var/log/pods`). Esto también incluye la recopilación de logs de contenedor init.

#### Faltan etiquetas (tags) en los nuevos contenedores o pods

Al enviar logs a Datadog desde contenedores o pods recién creados, es posible que el etiquetador interno del Datadog Agent aún no disponga de las etiquetas (tags) de contenedor/pod relacionadas. Como resultado, pueden faltar etiquetas (tags) en estos logs.

Para solucionar este problema, puede utilizar la variable de entorno `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` para configurar una duración (en segundos) para que el Datadog Agent espere antes de empezar a enviar logs desde contenedores y pods recién creados. El valor por defecto es `0`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
          value: "5"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
      value: "5"
```
{{% /tab %}}
{{< /tabs >}}

#### Faltan etiquetas (tags) de nivel de host en los nuevos hosts o nodos

Las etiquetas (tags) de nivel de host son las que aparecen en la lista de infraestructuras de un host determinado y proceden de un proveedor de nube o del Datadog Agent. Las etiquetas (tags) de nivel de host más frecuentes incluyen `kube_cluster_name`, `region`, `instance-type` y `autoscaling-group`.

Cuando se envían logs a Datadog desde un nodo o host recién creado, pueden pasar algunos minutos hasta que se [hereden][12] las etiquetas (tags) de nivel de host. Como resultado, en estos logs pueden faltar las etiquetas (tags) de nivel de host.

Para solucionar este problema, puedes utilizar la variable de entorno `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` para configurar una duración (en minutos). Durante este tiempo, el Datadog Agent adjunta manualmente las etiquetas (tags) de nivel de host que conoce a cada log enviado. Después de este tiempo, el Agent vuelve a confiar en las etiquetas (tags) heredadas durante la ingesta.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
          value: "10m"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
      value: "10m"
```
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

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