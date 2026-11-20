---
aliases:
- /es/logs/guide/docker-logs-collection-troubleshooting-guide/
description: Solucione problemas comunes de Log Collection en entornos en contenedores
further_reading:
- link: /containers/kubernetes/log
  tag: Documentación
  text: Log Collection de Kubernetes
- link: /containers/docker/log
  tag: Documentación
  text: Log Collection de Docker
title: Solución de problemas de recopilación de registros de contenedores
---
## Descripción general {#overview}

Las aplicaciones en contenedores escriben registros en los flujos de salida y error estándar (`stdout` / `stderr`), los cuales el tiempo de ejecución del contenedor y el orquestador capturan y manejan de diversas maneras. El Datadog Agent depende del manejo predeterminado basado en archivos de Docker y Kubernetes para gestionar estos archivos de registro. A medida que el Datadog Agent monitorea los contenedores en su servidor, descubre sus registros, los lee de forma continua, los etiqueta y los envía a Datadog para cada contenedor.

Esta documentación cubre los pasos de solución de problemas de Log Collection de **Docker** y **Kubernetes**. Para obtener el contexto completo y los pasos de configuración general de Log Collection en contenedores, consulte la documentación de [Docker][1] y [Kubernetes][2].

Para Log Collection con [**ECS Fargate**][3] y [**EKS Fargate**][4], consulte la documentación específica de configuración y solución de problemas de cada uno. 

## Comprensión de Log Collection en Docker y Kubernetes {#understanding-log-collection-in-docker-and-kubernetes}

En entornos en contenedores, el Datadog Agent recopila los registros de dos formas principales: recopilación **basada en archivos** y recopilación **basada en sockets** a través de la API de Docker.

La documentación de Docker y Kubernetes utiliza de forma predeterminada la recopilación basada en archivos, ya que ofrece un mejor rendimiento y confiabilidad. La recopilación basada en sockets se puede utilizar en entornos Docker como una opción de respaldo. En clústeres de Kubernetes, la recopilación basada en sockets requiere el tiempo de ejecución de Docker, el cual está mayormente obsoleto en la mayoría de las distribuciones de Kubernetes.

En entornos en contenedores, Datadog recomienda enviar los registros a los flujos `stdout` / `stderr` en lugar de escribirlos en archivos de registro aislados dentro de los contenedores de la aplicación. Estos flujos permiten una recopilación más automatizada y confiable.

### Archivos de registro {#log-files}

Con el controlador de registros `json-file` predeterminado de Docker, los registros `stdout`/`stderr` se almacenan en `/var/lib/docker/containers`. Estos registros se pueden recopilar montando `/var/lib/docker/containers` (`c:/programdata/docker/containers` en Windows) en el contenedor del Agent. Por ejemplo:

```bash
/var/lib/docker/containers/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d-json.log. 
```

Si este punto de montaje no existe, el Agent recurre a la recopilación basada en sockets. Acceso a la API de Docker a través del socket en `/var/run/docker.sock`.

En Kubernetes, los registros de `stdout`/`stderr` se almacenan en `/var/log/pods` de forma predeterminada. La estructura de carpetas se configura para cada pod y cada contenedor dentro de ese pod. Por ejemplo:

```bash
/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log
```

Si el contenedor en el pod se reinicia en Kubernetes, este incrementa automáticamente el nombre del archivo (`0.log` -> `1.log`), lo cual el Agent toma en cuenta automáticamente. Consulte [recopilación de registros de Kubernetes][2] para obtener más información.

A medida que el Agent descubre los contenedores correspondientes en el servidor, busca sus archivos de registro basándose en la estructura de carpetas y archivos esperada por entorno.

### Autodiscovery del Agent {#agent-autodiscovery}

De forma predeterminada, el Agent solo recopila registros de los contenedores cuando la recopilación de registros está habilitada y se cumple una de las siguientes condiciones:

- `logs_config.container_collect_all` está habilitado para recopilar registros de todos los contenedores descubiertos
- El contenedor está configurado para la recopilación de registros mediante una integración basada en Autodiscovery

El Agent también toma en cuenta cualquier regla de exclusión/inclusión de contenedores que usted haya configurado desde [Container Discovery Management][5]. 

Por último, el Agent es responsable de recopilar los registros de los contenedores en el mismo servidor en el que se ejecuta. 

Es importante tomar en cuenta estas reglas para entender cómo está configurada la recopilación de registros para sus contenedores. Si usted no ve los registros de un contenedor determinado, debe verificar:

- ¿Se ha habilitado el Agent para la recopilación de registros?
- ¿Está el contenedor habilitado para la recopilación de registros según las reglas de descubrimiento?
- ¿Está el Agent ejecutándose en el mismo servidor que el contenedor deseado?

#### Configuración de recopilación de todos los contenedores {#container-collect-all-configuration}

Para obtener instrucciones completas sobre cómo habilitar la recopilación de registros, consulte la documentación de recopilación de registros de [Docker][1] y [Kubernetes][2]. Para una referencia rápida, puede ver ejemplos sobre cómo configurar el Agent para habilitar la recopilación de registros y la función `container_collect_all`, que está desactivada de forma predeterminada. 

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  #(...)
spec:
  #(...)
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

{{% k8s-operator-redeploy %}}
{{% /tab %}}

{{% tab "Helm" %}}

```yaml
datadog:
  #(...)
  logs:
    enabled: true
    containerCollectAll: true
```

{{% k8s-helm-redeploy %}}
{{% /tab %}}

{{% tab "Agent contenedorizado" %}}

```bash
DD_LOGS_ENABLED=true
DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
```

{{% /tab %}}
{{< /tabs >}}

Al usar `container_collect_all`, el Agent recopilará todos los registros de los contenedores descubiertos y los etiquetará con las etiquetas `source` y `service`, coincidiendo con la etiqueta `short_image` del contenedor descubierto. 

Si `container_collect_all` no está habilitado, debe habilitar individualmente la recopilación de registros por contenedor con configuraciones basadas en Autodiscovery.

#### Configuración de Autodiscovery {#autodiscovery-configuration}

Autodiscovery le permite configurar de qué contenedores recopila registros el Agent. Datadog recomienda usar [etiquetas de contenedor en Docker][6] o [anotaciones de pod en Kubernetes][7]. Estas son configuraciones de registros basadas en JSON colocadas en el contenedor/pod correspondiente que emite esos registros. Consulte el siguiente ejemplo mínimo:

{{< tabs >}}
{{% tab "Kubernetes" %}}

Las anotaciones de Kubernetes deben establecerse en el pod, no en la carga de trabajo principal que lo crea. La anotación debe ajustarse para que coincida con el nombre de su contenedor.

```yaml
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_NAME>.logs: |
          [{
            "source": "example-source",
            "service": "example-service"
          }]
    spec:
      containers:
      - name: <CONTAINER_NAME>
        image: <CONTAINER_IMAGE>
```

{{% /tab %}}
{{% tab "Docker" %}}

Las etiquetas de Docker se pueden establecer en el comando docker run, en el archivo de Docker Compose o integrarse en la imagen del contenedor.

Por ejemplo, en un comando de ejecución:

```
-l com.datadoghq.ad.logs='[{"source":"example-source","service":"example-service"}]'
```

Consulte más ejemplos en [Docker Log Collection](/containers/docker/log/?tab=dockerfile#log-integrations).

{{% /tab %}}
{{< /tabs >}}

En ambos casos, asegúrese de que la configuración:
- Tenga al menos la fuente y el servicio establecidos 
- Sea un JSON válido
- Esté establecida en su pod de Kubernetes o contenedor de Docker correspondiente
- Utilice el nombre de clave correcto para activar la configuración de registros; no necesita ajustar el nombre de la clave según su [sitio de Datadog][8]. 

Para obtener más ejemplos sobre cómo establecer su configuración de registros, consulte [Configuraciones avanzadas de recopilación de registros][9].

### Etiquetado {#tagging}

El Agent asigna automáticamente etiquetas a sus registros en el nivel "alto" de [cardinalidad de etiquetas][10] para cada entorno. Puede ver las [etiquetas predeterminadas de Docker aquí][11] y las [etiquetas predeterminadas de Kubernetes aquí][12]. Esto también incluye cualquier etiqueta recopilada por [Unified Service Tagging][13] o diferentes reglas de extracción de etiquetas de los metadatos del contenedor.

Para personalizar estas etiquetas, cambiar las reglas de recopilación de registros o habilitar la recopilación de registros en general, puede aplicar etiquetas o anotaciones de Autodiscovery a los contenedores respectivos.

Las etiquetas en sus registros también pueden provenir de la [herencia de etiquetas del servidor][14]. Todos los datos, incluidos los registros, que ingresan a Datadog pasan por este proceso. Durante la ingesta en Datadog, los registros heredan todas las etiquetas a nivel de servidor asociadas con ese servidor. Puede ver estas etiquetas en Infrastructure List para su servidor. Estas se establecen más comúnmente mediante:

- El Datadog Agent, mediante el descubrimiento automático o los `DD_TAGS` proporcionados manualmente
- Las integraciones del proveedor de la nube que recopilan y establecen etiquetas para sus servidores

Por ejemplo, las etiquetas `pod_name` y `short_image` provienen de las etiquetas que el Agent establece al enviar los datos. Otras etiquetas como `region` y `kube_cluster_name` provienen de la herencia de etiquetas de servidor en la ingesta.

## Solución de problemas de recopilación de registros de contenedores con comandos del Agent {#troubleshooting-container-log-collection-with-agent-commands}

El Datadog Agent que se ejecuta en el mismo nodo que el contenedor de su aplicación es responsable de recopilar los registros de ese contenedor. Al ejecutar estos comandos, especialmente en entornos de Kubernetes, asegúrese de trabajar con el pod del Agent correcto para el contenedor de su aplicación deseado.

Para obtener una lista de comandos útiles para la solución de problemas, consulte [Agent Commands][15].

### Estado del Agent {#agent-status}

Puede ejecutar el comando de estado del Agent para ver si el Agent de registros está experimentando algún problema.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent status
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent status
```

{{% /tab %}}
{{< /tabs >}}

Este comando le muestra el estado del Agent de registros en general y del recopilador de registros para cada contenedor que el Agent está monitoreando:

```text
==========
Logs Agent
==========
    Reliable: Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 8.60922316e+08
    EncodedBytesSent: 3.9744538e+07
    LogsProcessed: 604328
    LogsSent: 60431
  
  ============
  Integrations
  ============
  
  default/my-deployment-55d847444b-2fkch/my-container
  ---------------------------------------------------
    - Type: file
      Identifier: ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
      Path: /var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/*.log
      Service: example-service
      Source: example-source
      Status: OK
        1 files tailed out of 1 files matching
      Inputs:
        /var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log  
      Bytes Read: 5075   
      Pipeline Latency:
        Average Latency (ms): 0
        24h Average Latency (ms): 0
        Peak Latency (ms): 0
        24h Peak Latency (ms): 0
```

Si Logs Agent Status no se ve como el anterior, consulte los consejos de solución de problemas en las siguientes secciones.

Cada recopilador de registros individual proporciona información detallada sobre cómo el Agent está recopilando registros para un contenedor específico. Usando el ejemplo de Kubernetes anterior, esta salida nos indica:

- **Collector name** (`default/my-deployment-55d847444b-2fkch/my-container`) identifica el espacio de nombres, el pod y el contenedor.
- **Identifier** (`ba778eaff...`) es el ID del contenedor individual que se está monitoreando.
- **Path** y **Inputs** muestran las ubicaciones donde el Agent buscó e identificó los archivos de registro del contenedor.
- **Service** y **Source** resumen las etiquetas utilizadas.

En Docker, la salida es prácticamente la misma, solo cambia el nombre del recopilador de registros individual.

Si ve el siguiente mensaje cuando ejecuta el comando de estado del Agent:

```
==========
Logs Agent
==========

  Logs Agent is not running
```
Esto significa que no habilitó la recopilación de registros en el Agent.

Si Logs Agent Status no muestra Integrations y ve `LogsProcessed: 0` y `LogsSent: 0`:

```
==========
Logs Agent
==========

    LogsProcessed: 0
    LogsSent: 0
```
Este estado significa que los registros están habilitados, pero no ha especificado de qué contenedores debe recopilar el Agent.

### Agent configcheck {#agent-configcheck}

Puede ejecutar el comando `agent configcheck` para imprimir todas las configuraciones cargadas y resueltas en un Agent en ejecución.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent configcheck
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent configcheck
```

{{% /tab %}}
{{< /tabs >}}

Este comando le muestra la configuración del recopilador de registros, usando el `Configuration source` que hace referencia al ID del contenedor. Esto se puede usar para correlacionarlo con la salida de `agent status`.

```
===  check ===
Configuration provider: kubernetes-container-allinone
Configuration source: container:containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
Log Config:
[{"service":"example-service","source":"example-source"}]
Autodiscovery IDs:
* containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
```

El `Log Config` aplicado desde Autodiscovery proporciona etiquetas `service` y `source` personalizadas que se muestran como `[{"service":"example-service","source":"example-source"}]`. La salida de `configcheck` es útil para verificar cómo el Agent configuró la recopilación de registros para un contenedor determinado según su ID de contenedor.

Al usar `logs_config.container_collect_all`, si no se proporciona una configuración única, verá que esto se establece de forma predeterminada en `[{}]` para el contenedor.


### Agent stream-logs {#agent-stream-logs}

Puede ejecutar el comando `agent stream-logs` para transmitir a la consola los registros que el Agent está viendo en tiempo real, junto con los metadatos asociados y el contenido del registro.

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
kubectl exec -it <AGENT_POD> -- agent stream-logs

# Stream logs relative to "Namespace/Pod Name/Container Name" based name
kubectl exec -it <Agent Pod> -- agent stream-logs --name <NAME>
```

{{% /tab %}}
{{% tab "Docker" %}}

```
docker exec -it <CONTAINER_NAME> agent stream-logs
```

{{% /tab %}}
{{< /tabs >}}

Puede filtrar esta salida con la opción `--name`, que coincide con el formato de nomenclatura de Kubernetes (Espacio de nombres/Nombre del pod/Contenedor). También puede filtrar según las etiquetas aplicadas con la opción `--service` o `--source`. 

Para encontrar el `<NAME>`, use el comando `agent status`. Por ejemplo, `default/my-deployment-55d847444b-2fkch/my-container`:

```
==========
Logs Agent
==========
    ...  
  ============
  Integrations
  ============
  default/my-deployment-55d847444b-2fkch/my-container
  ---------------------------------------------------
    ...
```
Este comando imprimirá continuamente sus registros tal como los informa el Agent:

```text
$ agent stream-logs --name default/my-deployment-55d847444b-2fkch/my-container
...
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016005644 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 INFO Sample Info Log
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016049347 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 ERROR Sample Error Log
```

Cada línea debe proporcionar el nombre de la integración, el tipo, el estado, la marca de tiempo, el nombre de servidor, el servicio, la fuente, las etiquetas del contenedor y el mensaje. Esto muestra qué registros está recopilando el Agent, qué metadatos están asociados con esos registros y qué mensaje se envía.

Presione `Ctrl + C` para salir del proceso de transmisión.

### Captura del archivo de registro sin procesar {#capturing-the-raw-log-file}

Para verificar si el Agent está siguiendo los registros correctamente, puede copiar el archivo de registro y examinarlo usando el comando [`agent status`](#agent-status).

Ejecute el comando `agent status` y revise la sección "Logs Agent" para el contenedor en cuestión. Por ejemplo, para un pod llamado `my-deployment-98878c5d8-mc2sk` con el contenedor `my-container`, podría verse así:

```text
  default/my-deployment-98878c5d8-mc2sk/my-container
  --------------------------------------------------
    - Type: file
      Identifier: fa54113fffebc83ffef4bd863c8c1012bd5cfb19311a4dcd7d8e9b5271dc29fe
      Path: /var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/*.log
      Service: busybox
      Source: busybox
      Status: OK
        1 files tailed out of 1 files matching
      Inputs:
        /var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log  
```

Podemos ver la `Path` que indica dónde busca el Agent y la `Inputs` que muestra el archivo de registro detectado como `/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log`. 

Dado que el enlace está abierto en el pod del Agent, puede copiar este archivo del pod del Agent a su equipo local mediante un comando `kubectl cp`: 

```
kubectl cp <Agent Pod>:<Log Input Path> <Desired Filename>
```

Si el pod del Agent en el ejemplo se llamara `datadog-agent-xxxxx`, se vería así:

```text
kubectl cp datadog-agent-xxxxx:/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log my-container.log
```
Puede revisar el archivo copiado para ver los registros exactos que ve el Agent para identificar si Kubernetes está capturando los registros necesarios. Lo mismo se puede hacer para los contenedores de Docker en su ruta `/var/lib/docker/containers` y un comando docker cp.

## Problemas comunes {#common-issues}

Existen problemas comunes que pueden interferir al enviar registros a Datadog en entornos en contenedores. Si tiene problemas para enviar registros a Datadog, revise los problemas comunes a continuación. Si continúa teniendo problemas, comuníquese con nuestro equipo de soporte para obtener más ayuda.

### Preprocesamiento del nombre de servidor {#hostname-preprocessing}

Un problema común ocurre si los registros sin procesar tienen un atributo JSON para un `host`, `hostname` o `syslog.hostname`. Por ejemplo:

{{< img src="logs/troubleshooting/hostname_preprocessing.png" alt="ejemplo de preprocesamiento del nombre de servidor" >}}

Los registros con formato JSON pasan por un conjunto de reglas de preprocesamiento relativas a los atributos reservados, como `timestamp` o `level` para establecer la marca de tiempo oficial o el nivel de registro del registro. Uno de estos atributos reservados es para el [preprocesamiento del servidor][16], donde un atributo JSON de `host`, `hostname` o `syslog.hostname` se convierte en el `host` oficial del registro. Esto hace que esas entradas de registro se atribuyan al servidor "incorrecto" y, como resultado, no hereden las etiquetas esperadas a nivel de servidor del servidor "original".

Puede consultar los registros que coinciden con el atributo JSON de `@host:* OR @hostname:* OR @syslog.hostname:*` para mostrar qué registros están utilizando activamente este preprocesamiento.

Hay algunas opciones para solucionar este problema.
- Si es posible, actualice la aplicación para evitar registrar un atributo JSON `host` o `hostname`, ya sea eliminándolo o cambiándolo por alguna otra clave.
- Actualice sus [reglas de preprocesamiento global][17] para omitir este comportamiento. Sin embargo, cualquier registro que dependa de esto perdería esa funcionalidad.
- Agregue una configuración de Autodiscovery para crear una [configuración de registro personalizada que enmascare la palabra clave host][18].

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.logs: |-
      [{
        "source": "example-source",
        "service": "example-service",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "replace_host_key",
          "replace_placeholder": "\"app_host\"",
          "pattern": "\"host\""
        }]
      }]
spec:
  containers:
    - name: <CONTAINER_NAME>
      image: <CONTAINER_IMAGE>
```

{{% /tab %}}
{{% tab "Docker" %}}

```yaml
  labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "example-source",
        "service": "example-service",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "replace_host_key",
          "replace_placeholder": "\"app_host\"",
          "pattern": "\"host\""
        }]
      }]
```

{{% /tab %}}
{{< /tabs >}}

Estas reglas anteriores buscan la cadena `"host"` (comillas incluidas) y la reemplazan con `"app_host"` para conservar la estructura JSON. Reemplace el patrón con `hostname` si es necesario para sus registros.

También puede agregar una [regla de procesamiento global][19] para que el Agent enmascare palabras clave en todos los registros que está procesando mediante la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROCESSING_RULES
          value: '[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```

{{% /tab %}}

{{% tab "Variable de entorno" %}}

```
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```
{{% /tab %}}
{{< /tabs >}}


### Faltan etiquetas a nivel de servidor en nuevos servidores o nodos {#missing-host-level-tags-on-new-hosts-or-nodes}

Al enviar registros a Datadog desde un servidor o nodo recién creado, las etiquetas a nivel de servidor pueden tardar unos minutos en [heredarse][20]. Como resultado, es posible que falten etiquetas a nivel de servidor en estos registros. 

Para solucionar este problema, puede usar la variable de entorno `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` para configurar una duración (en minutos). El Datadog Agent adjunta manualmente a cada registro enviado las etiquetas a nivel de servidor que conoce durante este período. Después de este período, el Agent vuelve a depender de la herencia de etiquetas durante la ingesta.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
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

{{% tab "Variable de entorno" %}}

```
DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION='10m'
```
{{% /tab %}}
{{< /tabs >}}

### Faltan etiquetas en nuevos contenedores o pods {#missing-tags-on-new-containers-or-pods}

Al enviar registros a Datadog desde contenedores o pods recién creados, es posible que el etiquetador interno del Datadog Agent aún no tenga las etiquetas correspondientes al contenedor o pod. Como resultado, es posible que falten etiquetas en estos registros.

Para solucionar este problema, puede usar la variable de entorno `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` para configurar cuánto tiempo (en segundos) debe esperar el Datadog Agent antes de comenzar a enviar registros desde contenedores y pods recién creados. El valor predeterminado es `0`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
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

{{% tab "Variable de entorno" %}}

```
DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION='5'
```
{{% /tab %}}
{{< /tabs >}}

### Pods de corta duración {#short-lived-pods}

De forma predeterminada, el Agent busca nuevos contenedores cada 5 segundos. A partir de la versión 6.12 del Agent, los registros de contenedores de corta duración (detenidos o que fallaron) se recolectan automáticamente cuando se utiliza el método de recolección de registros desde archivos. Esto también incluye la recolección de registros de contenedores de inicialización (init containers). Siempre y cuando esos archivos aún existan.

En Kubernetes, la mayoría de los registros de los pods y sus contenedores se conservan el tiempo suficiente para que el Agent los informe, incluso en el caso de procesos de corta duración. De forma predeterminada, los CronJobs y los trabajos de Kubernetes conservan el pod el tiempo suficiente para que el Agent informe sus registros, incluso si los contenedores ya terminaron. Sin embargo, si especifica una [regla de limpieza de trabajos][21] `ttlSecondsAfterFinished`, Datadog recomienda establecer un plazo de al menos 15 segundos para que el Agent pueda procesarlos.

### Problemas de recolección de registros de Docker desde archivos {#docker-log-collection-from-file-issues}

En las versiones 6.33.0/7.33.0 y posteriores, el Agent recolecta de forma predeterminada los registros de Docker de los archivos de registro en disco, siempre que pueda acceder a ellos. `DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE` se puede establecer en `false` para deshabilitar este comportamiento.

Al recolectar registros de contenedores de Docker desde archivos, el Agent recurre a la recolección desde el socket de Docker si no puede leer desde el directorio donde se almacenan los registros de contenedores de Docker (`/var/lib/docker/containers` en Linux). Para diagnosticar esto, verifique el estado de Logs Agent y busque una entrada de tipo de archivo que muestre un error similar al siguiente:

```
- Type: docker
    Service: stable
    Source: stable
    Status: OK
    The log file tailer could not be made, falling back to socket
    Inputs:
    68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d  
    Bytes Read: 160973 
```

Este estado significa que el Agent no puede encontrar un archivo de registro para un contenedor determinado. Para resolver este problema, verifique que la carpeta que contiene los registros de contenedores de Docker esté correctamente expuesta al contenedor de Datadog Agent. En Linux, esto corresponde a `-v /var/lib/docker/containers:/var/lib/docker/containers:ro` en la línea de comandos que inicia el contenedor del Agent, mientras que en Windows corresponde a `-v c:/programdata/docker/containers:c:/programdata/docker/containers:ro`. 

Tenga en cuenta que el directorio relativo al servidor subyacente puede ser diferente debido a la configuración específica del demonio de Docker; esto no es un problema si se realiza un mapeo de volúmenes de Docker correcto. Por ejemplo, use `-v /data/docker/containers:/var/lib/docker/containers:ro` si el directorio de datos de Docker se ha reubicado en `/data/docker` en el servidor subyacente.

Si se recopilan registros pero las líneas individuales parecen estar divididas, verifique que el demonio de Docker esté usando el [controlador de registros JSON](#different-docker-log-driver).

### Agent instalado en el servidor {#host-based-agent}

Si está instalando el Agent en el servidor en lugar de ejecutarlo en un contenedor de Docker, el usuario `dd-agent` debe agregarse al grupo de Docker para tener permiso de lectura desde el socket de Docker. Si ve los siguientes registros de error del Agent:

```text
<TIMESTAMP> UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
<TIMESTAMP> UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

Para agregar el Agent al grupo de usuarios de Docker, ejecute el siguiente comando:

```
usermod -a -G docker dd-agent
```
**Nota:** Cuando instala el Agent en el servidor, el Agent no tiene permiso para acceder a ` /var/lib/docker/containers` porque requieren acceso de root. Como resultado, recopilará registros del socket de Docker.


### Controlador de registros de Docker diferente {#different-docker-log-driver}

El valor predeterminado de Docker es el [controlador de registros json-file][23], por lo que el Agent intenta leer primero desde esta estructura. Si sus contenedores están configurados para usar un controlador de registros diferente, Logs Agent indicará que puede encontrar sus contenedores correctamente, pero no puede recopilar sus registros desde el archivo. En entornos de Docker, Datadog recomienda usar el controlador de registros `json-file` para obtener la experiencia óptima del Agent. Sin embargo, el Agent también se puede configurar para leer desde el controlador de registros `journald`.

1. Si no está seguro de qué controlador de registros están usando sus contenedores, use `docker inspect <CONTAINER_NAME>` para ver qué controlador de registros tiene configurado. El siguiente bloque aparece en Docker Inspect cuando el contenedor está usando el controlador de registros JSON

   ```
   "LogConfig": {
       "Type": "json-file",
       "Config": {}
   },
   ```

2. Si el contenedor está configurado con el controlador de registros journald, aparece el siguiente bloque en Docker Inspect:
   ```
   "LogConfig": {
       "Type": "journald",
       "Config": {}
   },
   ```

3. Para recopilar registros del controlador de registros journald, configure la integración de journald [siguiendo la documentación de Datadog-Journald][24].
4. Monte el archivo YAML en su contenedor siguiendo las instrucciones de la [documentación de Docker Agent][25]. Para obtener más información sobre cómo configurar los controladores de registros para contenedores de Docker, [consulte esta documentación][26].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/docker/log/
[2]: /es/containers/kubernetes/log/
[3]: /es/integrations/aws-fargate/?tab=webui#log-collection
[4]: /es/integrations/eks_fargate/?tab=admissioncontrollerdatadogoperator#log-collection
[5]: /es/containers/guide/container-discovery-management
[6]: /es/containers/docker/log/?tab=dockerfile#log-integrations
[7]: /es/containers/kubernetes/log/?tab=datadogoperator#autodiscovery-annotations
[8]: /es/getting_started/site/
[9]: /es/agent/logs/advanced_log_collection/?tab=configurationfile
[10]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[11]: /es/containers/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[12]: /es/containers/kubernetes/tag/?tab=datadogoperator
[13]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[14]: /es/getting_started/tagging/#tag-inheritance
[15]: /es/agent/configuration/agent-commands/
[16]: /es/logs/log_configuration/pipelines/?tab=host#preprocessing
[17]: https://app.datadoghq.com/logs/pipelines
[18]: /es/agent/logs/advanced_log_collection/?tab=annotations#scrub-sensitive-data-from-your-logs
[19]: /es/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[20]: /es/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#integration-inheritance
[21]: https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/#cleanup-for-finished-jobs
[22]: /es/logs/guide/docker-logs-collection-troubleshooting-guide/#your-containers-are-not-using-the-json-logging-driver
[23]: https://docs.docker.com/engine/logging/drivers/json-file/
[24]: /es/integrations/journald/?tab=host#setup
[25]: /es/containers/docker/#mounting-conf-d
[26]: https://docs.docker.com/engine/logging/drivers/journald/