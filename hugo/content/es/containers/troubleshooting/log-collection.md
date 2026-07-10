---
aliases:
- /es/logs/guide/docker-logs-collection-troubleshooting-guide/
description: Solución de problemas comunes con la recolección de registros en entornos
  contenedorizados
further_reading:
- link: /containers/kubernetes/log
  tag: Documentación
  text: Recolección de registros de Kubernetes
- link: /containers/docker/log
  tag: Documentación
  text: Recolección de registros de Docker
title: Solución de problemas de recolección de registros de contenedores
---
## Descripción general {#overview}

Las aplicaciones contenedorizadas escriben registros en las salidas estándar y de error (`stdout` / `stderr`), que el tiempo de ejecución del contenedor y el orquestador capturan y manejan de diversas maneras. El Agente de Datadog se basa en el manejo de archivos predeterminado de Docker y Kubernetes para gestionar estos archivos de registro. A medida que el Agente de Datadog monitoriza los contenedores en su host, descubre, sigue las últimas líneas, etiqueta e informa esos registros a Datadog para cada contenedor.

Esta documentación cubre los pasos de solución de problemas para la recolección de registros de **Docker** y **Kubernetes**. Para el contexto completo y los pasos generales de configuración para la recolección de registros de contenedores, consulte la documentación de [Docker][1] y [Kubernetes][2].

Para la recolección de registros basada en [**ECS Fargate**][3] y [**EKS Fargate**][4], consulte su documentación dedicada de configuración y solución de problemas. 

## Comprensión de la recolección de registros en Docker y Kubernetes {#understanding-log-collection-in-docker-and-kubernetes}

En entornos contenedorizados, los registros son recopilados por el Agente de Datadog de dos maneras principales: recolección **basada en archivos** y recolección **basada en sockets** a través de la API de Docker.

La documentación de Docker y Kubernetes utiliza por defecto la recolección basada en archivos, ya que ofrece mejor rendimiento y confiabilidad. La recolección basada en sockets puede utilizarse en entornos Docker como una opción de respaldo. En clústeres de Kubernetes, la recolección basada en sockets requiere el tiempo de ejecución de Docker, el cual está mayormente obsoleto en la mayoría de las distribuciones de Kubernetes.

En entornos contenedorizados, Datadog recomienda registrar en los flujos `stdout` / `stderr` en lugar de escribir en archivos de registro que están aislados en los contenedores de la aplicación. Estos flujos permiten una recolección más automatizada y confiable.

### Archivos de registro {#log-files}

Con el controlador de registro predeterminado de Docker `json-file`, los registros `stdout`/`stderr` se almacenan en `/var/lib/docker/containers`. Estos registros se pueden recopilar montando `/var/lib/docker/containers` (`c:/programdata/docker/containers` en Windows) en el contenedor del Agente. Por ejemplo:

```bash
/var/lib/docker/containers/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d/68f21cd4e1e703c8b9ecdab67a5a9e359f1fb46ae1ed2e86f9b4f1f243a0a47d-json.log. 
```

Si este punto de montaje no existe, el Agente recurre a la recolección basada en sockets. Accediendo a la API de Docker a través del socket en `/var/run/docker.sock`.

En Kubernetes, los registros `stdout`/`stderr` se almacenan en `/var/log/pods` de forma predeterminada. La estructura de carpetas se configura para cada pod y para cada contenedor dentro de ese pod. Por ejemplo:

```bash
/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container/0.log
```

Si el contenedor en el pod se reinicia en Kubernetes, se incrementa automáticamente el nombre del archivo (`0.log` -> `1.log`), lo cual el Agente tiene en cuenta. Consulte [recolección de registros de Kubernetes][2] para más información.

A medida que el Agente descubre los contenedores correspondientes en el host, busca sus archivos de registro según la estructura de carpetas y archivos esperada por entorno.

### Autodiscovery del Agente {#agent-autodiscovery}

Por defecto, el Agente solo recopila registros de contenedores cuando la recopilación de registros está habilitada y ya sea:

- `logs_config.container_collect_all` está habilitado para recopilar registros de todos los contenedores descubiertos
- El contenedor está configurado para la recopilación de registros desde una integración basada en Autodiscovery

El Agente también tiene en cuenta cualquier regla de exclusión/inclusión de contenedores que haya configurado desde [Gestión de Descubrimiento de Contenedores][5]. 

Por último, el Agente es responsable de recopilar los registros de los contenedores en el mismo host que él mismo. 

Es importante tener en cuenta estas reglas para entender cómo se configura la recopilación de registros para sus contenedores. Si no ve registros para un contenedor dado, debe verificar:

- ¿Se ha habilitado el Agente para la recopilación de registros?
- ¿Está habilitado el contenedor para la recopilación de registros en relación con las reglas de descubrimiento?
- ¿Está el Agente ejecutándose en el mismo host que el contenedor deseado?

#### El contenedor recopila toda la configuración {#container-collect-all-configuration}

Para instrucciones completas sobre cómo habilitar la recopilación de registros, consulte la documentación de recopilación de registros de [Docker][1] y [Kubernetes][2]. Para referencia rápida, puede ver ejemplos sobre cómo configurar el Agente para habilitar la recopilación de registros y habilitar la función `container_collect_all`, que por defecto está desactivada. 

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

{{% tab "Agente contenedorizado" %}}

```bash
DD_LOGS_ENABLED=true
DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
```

{{% /tab %}}
{{< /tabs >}}

Al usar `container_collect_all`, el Agente recopilará todos los registros de los contenedores descubiertos y los etiquetará con las etiquetas `source` y `service`, coincidiendo con la etiqueta `short_image` del contenedor descubierto. 

Si `container_collect_all` no está habilitado, necesita habilitar individualmente la recolección de registros por contenedor con configuraciones basadas en Autodiscovery.

#### Configuración de Autodiscovery {#autodiscovery-configuration}

Autodiscovery le permite configurar de qué contenedores recopila registros el Agente. Datadog recomienda usar [etiquetas de contenedor en Docker][6] o [anotaciones de Pod en Kubernetes][7]. Estas son configuraciones de registros basadas en JSON colocadas en el contenedor/pod correspondiente que emite esos registros. Vea el siguiente ejemplo mínimo:

{{< tabs >}}
{{% tab "Kubernetes" %}}

Las anotaciones de Kubernetes deben establecerse en el pod, no en la carga de trabajo principal que lo crea. La anotación debe ajustarse para coincidir con el nombre de su contenedor.

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

Las etiquetas de Docker se pueden establecer en el comando docker run, en el archivo de Docker Compose, o integradas en la imagen del contenedor.

Por ejemplo, en un comando de ejecución:

```
-l com.datadoghq.ad.logs='[{"source":"example-source","service":"example-service"}]'
```

Vea más ejemplos en [Recolección de registros de Docker](/containers/docker/log/?tab=dockerfile#log-integrations).

{{% /tab %}}
{{< /tabs >}}

Con ambas configuraciones, asegúrese de que su configuración:
- Tenga al menos la fuente y el servicio configurados 
- Sea un JSON válido
- Esté configurado en su pod de Kubernetes o contenedor de Docker correspondiente
- Utilice el nombre de clave correcto para activar la configuración de registros, no necesita ajustar el nombre de clave según su [sitio de Datadog][8]. 

Para más ejemplos de cómo configurar su configuración de registros, consulte [Configuraciones Avanzadas de Recolección de Registros][9].

### Etiquetado {#tagging}

El Agente asigna automáticamente etiquetas a sus registros en el nivel "alto" de [cardinalidad de etiquetas][10] para cada entorno. Puede ver las [etiquetas de Docker predeterminadas aquí][11] y [etiquetas de Kubernetes aquí][12]. Esto también incluye cualquier etiqueta recopilada por [Unified Service Tagging] o diferentes reglas de extracción de etiquetas de los metadatos del contenedor.

Para personalizar estas etiquetas, cambiar las reglas de recolección de registros o habilitar la recolección de registros en general, puede aplicar Etiquetas o Anotaciones de Autodiscovery a los contenedores respectivos.

Las etiquetas en sus registros también pueden provenir de [herencia de etiquetas de host][14]. Todos los datos, incluidos los registros, que ingresan a Datadog pasan por este proceso. En la entrada de Datadog, los registros heredan todas las etiquetas a nivel de host que están asociadas con ese host. Puede ver estas etiquetas en la Lista de Infraestructura para su host. Estos son comúnmente establecidos por:

- El Agente de Datadog y su descubrimiento automático o configuración manual de `DD_TAGS` proporcionado
- Las integraciones del proveedor de la nube que recopilan y establecen etiquetas para sus hosts

Por ejemplo, las etiquetas `pod_name` y `short_image` provienen del Agente al establecer esta etiqueta en el envío. Otras etiquetas como `region` y `kube_cluster_name` provienen de la herencia de etiquetas del host en la entrada.

## Solucionando la recolección de registros de contenedores con comandos del Agente {#troubleshooting-container-log-collection-with-agent-commands}

El Agente de Datadog que se ejecuta en el mismo nodo que su contenedor de aplicación es responsable de recopilar los registros de ese contenedor. Al ejecutar estos comandos, especialmente en entornos de Kubernetes, asegúrese de estar trabajando con el pod del Agente correcto para su contenedor de aplicación deseado.

Para una lista de comandos útiles de solución de problemas, consulte [Comandos del Agente][15].

### Estado del Agente {#agent-status}

Puede ejecutar el comando de estado del Agente para ver si el Agente de Registros está experimentando algún problema.

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

Este comando le muestra el estado del Agente de Registros en general y el recolector de registros para cada contenedor que el Agente está monitoreando:

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

Si el Estado del Agente de Registros no se parece al anterior, consulte los consejos de solución de problemas en las siguientes secciones.

Cada recolector de registros individual proporciona información detallada sobre cómo el Agente está recolectando registros para un contenedor específico. Usando el ejemplo de Kubernetes anterior, esta salida nos dice:

- **Nombre del recolector** (`default/my-deployment-55d847444b-2fkch/my-container`) identifica el namespace, pod y contenedor.
- **Identificador** (`ba778eaff...`) es el ID del contenedor individual que se está monitoreando.
- **Ruta** y **Entradas** muestran las ubicaciones donde el Agente buscó e identificó los archivos de registro del contenedor.
- **Servicio** y **Fuente** resumen las etiquetas utilizadas.

En Docker, la salida es en gran medida la misma, solo que el nombre del recolector de registros individual es diferente.

Si ve el siguiente mensaje cuando ejecute el comando de estado del Agente:

```
==========
Logs Agent
==========

  Logs Agent is not running
```
Esto significa que no habilitó la recolección de registros en el Agente.

Si el Estado del Agente de Registros no muestra Integraciones y ve `LogsProcessed: 0` y `LogsSent: 0`:

```
==========
Logs Agent
==========

    LogsProcessed: 0
    LogsSent: 0
```
Este estado significa que los registros están habilitados, pero no ha especificado de qué contenedores debe recolectar el Agente.

### Verificación de configuración del agente {#agent-configcheck}

Puede ejecutar el comando `agent configcheck` para imprimir todas las configuraciones cargadas y resueltas en un Agente en ejecución.

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

Este comando le muestra la configuración del recolector de registros, utilizando el `Configuration source` que hace referencia al ID del contenedor. Esto se puede usar para coincidir con la salida del `agent status`.

```
===  check ===
Configuration provider: kubernetes-container-allinone
Configuration source: container:containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
Log Config:
[{"service":"example-service","source":"example-source"}]
Autodiscovery IDs:
* containerd://ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5
```

El `Log Config` aplicado desde Autodiscovery proporciona etiquetas personalizadas `service` y `source` que se muestran como `[{"service":"example-service","source":"example-source"}]`. La salida del `configcheck` es útil para verificar cómo el Agente configuró la recolección de registros para un contenedor dado basado en su ID de contenedor.

Al usar `logs_config.container_collect_all`, si no se proporciona una configuración única, verá que esto se establece por defecto en `[{}]` para el contenedor.


### Agente de registros en flujo {#agent-stream-logs}

Puede ejecutar el comando `agent stream-logs` para transmitir registros a la consola que el Agente está viendo en tiempo real, junto con los metadatos asociados y el contenido del registro.

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

Puede filtrar esta salida con la bandera `--name`, que coincide con el formato de nomenclatura de Kubernetes (Namespace/Nombre del Pod/Contenedor). Alternativamente, puede filtrar según las etiquetas aplicadas con la bandera `--service` o `--source`. 

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
Este comando imprimirá continuamente sus registros según lo informado por el Agente:

```text
$ agent stream-logs --name default/my-deployment-55d847444b-2fkch/my-container
...
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016005644 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 INFO Sample Info Log
Integration Name: default/my-deployment-55d847444b-2fkch/my-container | Type: file | Status: info | Timestamp: 2025-05-12 23:45:09.016049347 +0000 UTC | Hostname: example-0002 | Service: example-service | Source: example-source | Tags: filename:0.log,dirname:/var/log/pods/default_my-deployment-55d847444b-2fkch_342819ce-4419-435b-9881-4a3deff618cc/my-container,image_name:busybox,short_image:busybox,image_tag:latest,kube_namespace:default,kube_qos:BestEffort,kube_container_name:my-container,kube_ownerref_kind:replicaset,image_id:docker.io/library/busybox@sha256:9e2bbca079387d7965c3a9cee6d0c53f4f4e63ff7637877a83c4c05f2a666112,kube_deployment:my-deployment,kube_replica_set:my-deployment-55d847444b,pod_phase:running,pod_name:my-deployment-55d847444b-2fkch,kube_ownerref_name:my-deployment-55d847444b,container_id:ba778eaff01fc3555b6ad4a809e78949065bd34ebe2c42522a1bdd1d3b684fb5,display_container_name:my-container_my-deployment-55d847444b-2fkch,container_name:my-container | Message: 2025-11-20T23:45:08 ERROR Sample Error Log
```

Cada línea debe proporcionar el nombre de la integración, tipo, estado, marca de tiempo, nombre de host, servicio, fuente, etiquetas de contenedor y el mensaje. Esto muestra qué registros está recolectando el Agente, qué metadatos están asociados con esos registros y qué mensaje se envía.

Presione `Ctrl + C` para salir del proceso de transmisión.

### Capturando el archivo de registro en bruto {#capturing-the-raw-log-file}

Para verificar si el Agente está haciendo seguimiento de los registros correctamente, puede copiar el archivo de registro y examinarlo usando el [`agent status`comando](#agent-status).

Ejecute el comando `agent status` y revise la sección "Agente de Registros" para el contenedor en cuestión. Por ejemplo, para un Pod llamado `my-deployment-98878c5d8-mc2sk` con el contenedor `my-container`, puede verse así:

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

Podemos ver el `Path` donde el Agente está buscando y el `Inputs` mostrando el archivo de registro descubierto como `/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log`. 

Dado que el enlace está abierto en el Pod del Agente, puede copiar este archivo desde el Pod del Agente a su máquina local, utilizando un comando `kubectl cp`: 

```
kubectl cp <Agent Pod>:<Log Input Path> <Desired Filename>
```

Si el Pod del Agente en el ejemplo se llamara `datadog-agent-xxxxx`, se vería así:

```text
kubectl cp datadog-agent-xxxxx:/var/log/pods/default_my-deployment-98878c5d8-mc2sk_3d602ae0-a0ef-4fe2-b703-3975d2af6947/my-container/0.log my-container.log
```
Puede revisar el archivo copiado para ver los registros exactos que el Agente ve para identificar si los registros necesarios son capturados por Kubernetes. Lo mismo se puede hacer para los contenedores de Docker en su ruta `/var/lib/docker/containers` y un comando docker cp.

## Problemas comunes {#common-issues}

Existen problemas comunes que pueden interferir al enviar registros a Datadog en entornos contenedorizados. Si experimenta problemas al enviar registros a Datadog, revise los problemas comunes a continuación. Si continúa teniendo problemas, contacte a nuestro equipo de soporte para obtener más ayuda.

### Preprocesamiento de nombres de host {#hostname-preprocessing}

Un problema común ocurre si los registros en bruto tienen un atributo JSON para un `host`, `hostname` o `syslog.hostname`. Por ejemplo:

{{< img src="logs/troubleshooting/hostname_preprocessing.png" alt="ejemplo de preprocesamiento de nombres de host" >}}

Los registros formateados en JSON pasan por un conjunto de reglas de preprocesamiento relativas a los atributos reservados, como `timestamp` o `level` para establecer la marca de tiempo oficial o el nivel de registro del log. Uno de estos atributos reservados es para [preprocesamiento de servidor][16], donde un atributo JSON de `host`, `hostname` o `syslog.hostname` se convierte en el `host` oficial del registro. Esto resulta en que esas declaraciones de registro se atribuyan al servidor "incorrecto" y, como resultado, no heredan las etiquetas a nivel de servidor esperadas del servidor "original".

Puede consultar los registros que coinciden con el atributo JSON de `@host:* OR @hostname:* OR @syslog.hostname:*` para mostrar qué registros están utilizando activamente este preprocesamiento.

Hay algunas opciones para solucionar este problema.
- Si es posible, actualice la aplicación para evitar registrar un atributo JSON `host` o `hostname`, ya sea eliminándolo o cambiándolo a otra clave.
- Actualice sus [reglas de preprocesamiento globales][17] para omitir este comportamiento. Sin embargo, cualquier registro dependiente de esto perdería esa funcionalidad.
- Agregue una configuración de Autodiscovery para crear una [configuración de registro personalizada que enmascare la palabra clave del host][18].

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

Las reglas anteriores buscan la cadena `"host"` (incluidas las comillas) y las reemplazan con `"app_host"` para mantener la estructura JSON. Reemplace el patrón con `hostname` si es necesario para sus registros.

También puede agregar una [regla de procesamiento global][19] para que el Agente enmascare palabras clave en todos los registros que está procesando utilizando la variable de entorno `DD_LOGS_CONFIG_PROCESSING_RULES`.

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

{{% tab "Variable de Entorno" %}}

```
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type":"mask_sequences","name":"replace_host_key","replace_placeholder":"\"app_host\"","pattern":"\"host\""}]'
```
{{% /tab %}}
{{< /tabs >}}


### Faltan etiquetas a nivel de host en nuevos hosts o nodos {#missing-host-level-tags-on-new-hosts-or-nodes}

Al enviar registros a Datadog desde un host o nodo recién creado, puede tardar unos minutos en que las etiquetas a nivel de host sean [heredadas][20]. Como resultado, las etiquetas a nivel de host pueden faltar en estos registros. 

Para remediar este problema, puede usar la variable de entorno `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` para configurar una duración (en minutos). El Agente de Datadog adjunta manualmente las etiquetas a nivel de host que conoce a cada registro enviado durante esta duración. Después de esta duración, el Agente vuelve a depender de la herencia de etiquetas en la entrada.

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

{{% tab "Variable de Entorno" %}}

```
DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION='10m'
```
{{% /tab %}}
{{< /tabs >}}

### Faltan etiquetas en nuevos contenedores o pods {#missing-tags-on-new-containers-or-pods}

Al enviar registros a Datadog desde contenedores o Pods recién creados, el etiquetador interno del Agente de Datadog puede no tener aún las etiquetas relacionadas con el contenedor/pod. Como resultado, las etiquetas pueden faltar en estos registros.

Para remediar este problema, puede usar la variable de entorno `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` para configurar una duración (en segundos) para que el Agente de Datadog espere antes de comenzar a enviar registros desde contenedores y Pods recién creados. El valor predeterminado es `0`.

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

{{% tab "Variable de Entorno" %}}

```
DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION='5'
```
{{% /tab %}}
{{< /tabs >}}

### Pods de corta duración {#short-lived-pods}

Por defecto, el Agente busca cada 5 segundos nuevos contenedores. Para la versión v6.12+ del Agente, los registros de contenedores de corta duración (detenidos o fallidos) se recopilan automáticamente al usar el método de recopilación de registros de archivos. Esto también incluye la recopilación de registros de contenedores de inicialización. Mientras esos archivos aún existan.

En Kubernetes, la mayoría de los registros de pods y sus contenedores se retienen el tiempo suficiente para que el Agente los informe, incluso para procesos de corta duración. Los CronJobs y trabajos de Kubernetes, por defecto, retendrán el pod el tiempo suficiente para que el Agent informe sus registros, incluso para contenedores completados. Sin embargo, si especifica una [regla de limpieza de trabajo][21] `ttlSecondsAfterFinished`, Datadog recomienda al menos 15 segundos para permitir que el Agent maneje esos.

### Problemas de recolección de registros de Docker desde archivos {#docker-log-collection-from-file-issues}

El Agent recolecta registros de Docker desde los archivos de registro en disco por defecto en las versiones 6.33.0/7.33.0+, siempre que los archivos de registro en disco sean accesibles por el Agent. `DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE` se puede establecer en `false` para deshabilitar este comportamiento.

Al recolectar registros de contenedores de Docker desde archivos, el Agent recurre a la recolección desde el socket de Docker si no puede leer del directorio donde se almacenan los registros de contenedores de Docker (`/var/lib/docker/containers` en Linux). Para diagnosticar esto, verifique el estado del Agent de logs y busque una entrada de tipo archivo que muestre un error similar al siguiente:

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

Este estado significa que el Agent no puede encontrar un archivo de registro para un contenedor dado. Para resolver este problema, verifique que la carpeta que contiene los registros de contenedores de Docker esté correctamente expuesta al contenedor del Datadog Agent. En Linux, corresponde a `-v /var/lib/docker/containers:/var/lib/docker/containers:ro` en la línea de comandos que inicia el contenedor del Agent, mientras que en Windows corresponde a `-v c:/programdata/docker/containers:c:/programdata/docker/containers:ro`. 

Tenga en cuenta que el directorio relativo al host subyacente puede ser diferente debido a la configuración específica del demonio de Docker; esto no es un problema siempre que haya un mapeo correcto de volúmenes de Docker. Por ejemplo, utilice `-v /data/docker/containers:/var/lib/docker/containers:ro` si el directorio de datos de Docker ha sido reubicado a `/data/docker` en el host subyacente.

Si se recolectan registros pero las líneas individuales parecen estar divididas, verifique que el demonio de Docker esté utilizando el [controlador de registro JSON](#different-docker-log-driver).

### Agent basado en host {#host-based-agent}

Si está instalando el Agent en el host en lugar de ejecutarlo en un contenedor de Docker, el usuario `dd-agent` debe ser agregado al grupo de Docker para tener permiso para leer desde el socket de Docker. Si ve los siguientes registros de error del Agent:

```text
<TIMESTAMP> UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
<TIMESTAMP> UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

Agregue el Agent al grupo de Docker, y ejecute el siguiente comando:

```
usermod -a -G docker dd-agent
```
**Nota:** Cuando instala el Agent en el host, este no tiene permiso para acceder a ` /var/lib/docker/containers` ya que esto requiere acceso de root. Como resultado, recolectará registros del socket de Docker.


### Diferente controlador de registro de Docker {#different-docker-log-driver}

El valor predeterminado de Docker es el [controlador de registro json-file][23], por lo que el Agent intenta leer primero desde esta estructura. Si sus contenedores están configurados para usar un controlador de registro diferente, el Agent de logs indicará que puede encontrar sus contenedores con éxito, pero no puede recopilar sus registros del archivo. En entornos de Docker, Datadog recomienda usar el `json-file` controlador de registro para la experiencia óptima del Agent. Sin embargo, el Agent también puede configurarse para leer desde el `journald` controlador de registro.

1. Si no está seguro de qué controlador de registro están usando sus contenedores, utilice `docker inspect <CONTAINER_NAME>` para ver qué controlador de registro ha configurado. El siguiente bloque aparece en Docker Inspect cuando el contenedor está usando el controlador de registro JSON.

   ```
   "LogConfig": {
       "Type": "json-file",
       "Config": {}
   },
   ```

2. Si el contenedor está configurado para el controlador de registro journald, el siguiente bloque aparece en el Docker Inspect:
   ```
   "LogConfig": {
       "Type": "journald",
       "Config": {}
   },
   ```

3. Para recopilar registros del controlador de registro journald, configure la integración journald [siguiendo la documentación de Datadog-Journald][24].
4. Monte el archivo YAML en su contenedor siguiendo las instrucciones en la [documentación del Docker Agent][25]. Para más información sobre cómo configurar controladores de registro para contenedores de Docker, [vea esta documentación][26].

## Lectura adicional {#further-reading}

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
[18]: /es/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[19]: /es/agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules
[20]: /es/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#integration-inheritance
[21]: https://kubernetes.io/docs/concepts/workloads/controllers/ttlafterfinished/#cleanup-for-finished-jobs
[22]: /es/logs/guide/docker-logs-collection-troubleshooting-guide/#your-containers-are-not-using-the-json-logging-driver
[23]: https://docs.docker.com/engine/logging/drivers/json-file/
[24]: /es/integrations/journald/?tab=host#setup
[25]: /es/containers/docker/#mounting-conf-d
[26]: https://docs.docker.com/engine/logging/drivers/journald/