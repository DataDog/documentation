---
aliases:
- /es/opentelemetry/collector_exporter/hostname_tagging
description: Configure una identificación y etiquetado consistentes del servidor para
  la telemetría de OpenTelemetry enviada a Datadog.
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: Documentación
  text: Configuración del OpenTelemetry Collector
- link: /opentelemetry/mapping/hostname/
  tag: Documentación
  text: Asignación de convenciones semánticas de OpenTelemetry a nombres de servidor
title: Nombre del servidor y etiquetado
---
{{< img src="opentelemetry/collector_exporter/hostname_tagging.png" alt="Información del nombre del servidor recopilada de OpenTelemetry" style="width:100%;" >}}

## Descripción general {#overview}

Datadog utiliza atributos de recursos de OpenTelemetry para hacer coincidir métricas, trazas y registros con los servidores. Cuando toda la telemetría de un servidor identifica al servidor de la misma manera, usted puede correlacionar las señales de ese servidor y la telemetría hereda las etiquetas del servidor.

Para conocer el orden de resolución del nombre del servidor y la lista completa de atributos de recursos admitidos, consulte [Asignación de convenciones semánticas de OpenTelemetry a nombres de servidor][8].

## Recomendaciones de nombre del servidor {#hostname-recommendations}

La configuración correcta depende de cómo envíe la telemetría a Datadog. Encuentre cada configuración en su ruta de telemetría y siga su sección. Por ejemplo, si un Collector a nivel de nodo envía telemetría a través de una puerta de enlace, siga las recomendaciones tanto para el Collector a nivel de nodo como para la puerta de enlace.

| Cómo envía la telemetría | Recomendación |
|---|---|
| [Ejecute un Datadog Agent en cada servidor que genere telemetría.](#otlp-ingestion-by-the-datadog-agent) |  Omita los atributos de nombre del servidor o establézcalos en el nombre del servidor del Agent. |
| [Collector DDOT exportando directamente a Datadog](#ddot-collector-exporting-directly-to-datadog) | DDOT añade el procesador `infraattributes` a las canalizaciones del Datadog Exporter de forma predeterminada. En los servidores, habilite `allow_hostname_override`. En Fargate, proporcione atributos de recursos de la plataforma. |
| [Collector de OpenTelemetry exportando a Datadog a través de OTLP](#opentelemetry-collector-exporting-to-datadog-over-otlp) | Ejecute un Collector en cada servidor o nodo de Kubernetes. Mantenga el procesador `resource_detection` de la configuración recomendada y, en Kubernetes, su procesador `k8s_attributes`. |
| [Ingesta directa de OTLP sin un Collector](#direct-otlp-intake-without-a-collector) | Establezca los atributos de recursos del servidor o la plataforma en su SDK o plataforma administrada antes de la exportación. |
| [Collector exportando a través de una puerta de enlace](#collector-exporting-through-a-gateway) | Adjunte la información del servidor en el Collector a nivel de nodo y mantenga esos atributos de recursos a través de la puerta de enlace. |
| [Configuraciones existentes que utilizan el Datadog Exporter](#existing-configurations-using-the-datadog-exporter) | Ejecute un Collector en cada servidor o nodo de Kubernetes y configure los mismos procesadores que en la configuración recomendada. |

### Ingesta de OTLP por parte del Datadog Agent {#otlp-ingestion-by-the-datadog-agent}

Implemente el Datadog Agent en cada servidor que genere telemetría OTLP. Datadog no admite el envío de telemetría desde un servidor a un Agent en otro servidor. Para obtener instrucciones de configuración, consulte [Ingesta de OTLP por el Datadog Agent][11].

Si la telemetría entrante no tiene [atributos de nombre de servidor][8] válidos, Datadog utiliza el nombre de servidor del Agent. Si establece `host.name`, `host.id` u otro atributo de nombre de servidor, configúrelo con el nombre de servidor del Agent para evitar servidores duplicados. Para anular la resolución del nombre de servidor, establezca el atributo de recurso `datadog.host.name` en el nombre de servidor del Agent.

### DDOT Collector exportando directamente a Datadog {#ddot-collector-exporting-directly-to-datadog}

El procesador `infraattributes` del DDOT Collector añade atributos de infraestructura y etiquetas a la telemetría OTLP. De forma predeterminada, DDOT añade este procesador a las canalizaciones que utilizan el Datadog Exporter. El procesador necesita atributos de recursos que identifiquen el contenedor de origen para que pueda buscar etiquetas de infraestructura. Para obtener información sobre los atributos admitidos y los pasos de solución de problemas, consulte [Faltan etiquetas de infraestructura en la telemetría][10].

El resto de la configuración depende de si el DDOT Collector se ejecuta en un servidor.

#### Implementaciones basadas en servidor {#host-based-deployments}

Esto se aplica al DDOT Collector como un [Kubernetes DaemonSet][9] y en servidores [Linux][14] y [Windows][15].

Debido a que el DDOT Collector se ejecuta dentro del Datadog Agent, los atributos del nombre de servidor en la telemetría entrante pueden resolverse con un nombre diferente al del nombre de servidor del Agent. Entonces, un solo nodo aparece como dos servidores. Para usar el nombre de servidor del Agent en su lugar, habilite `allow_hostname_override`:

```yaml
processors:
  infraattributes:
    allow_hostname_override: true
```

Añada `infraattributes` a la lista `processors` de cada canalización si aún no está allí. DDOT agrega automáticamente su propia copia a las canalizaciones que no incluyen el procesador, y esa copia utiliza la configuración predeterminada.

#### Implementaciones de sidecar en Fargate {#fargate-sidecar-deployments}

Esto se aplica al DDOT Collector en [ECS Fargate][16] y [EKS Fargate][17], donde el Datadog Agent se ejecuta como un contenedor sidecar en la misma tarea o pod que su aplicación.

Fargate no admite implementaciones basadas en servidor, por lo que la [guía basada en servidor](#host-based-deployments) no se aplica. En su lugar, proporcione los atributos de recursos de la plataforma que `infraattributes` necesita:

- En ECS Fargate, agregue el detector de recursos de ECS a su SDK de OpenTelemetry para proporcionar el atributo `aws.ecs.task.arn`.
- En EKS Fargate, agregue el detector de recursos de EKS a su SDK, o agregue el procesador de detección de recursos con los detectores `[env, eks]` a la configuración de su DDOT Collector. Para ver un ejemplo, consulte la [guía de instalación de EKS Fargate][17].

### OpenTelemetry Collector exportando a Datadog a través de OTLP {#opentelemetry-collector-exporting-to-datadog-over-otlp}

Esto se aplica a la [configuración recomendada del OpenTelemetry Collector][21], donde el Collector envía telemetría a Datadog con el exportador OTLP HTTP.

Ejecute un Collector en cada servidor o nodo de Kubernetes y envíe la telemetría al Collector en el mismo servidor o nodo. Las configuraciones recomendadas ya establecen la detección de servidor para cada entorno. Si las adapta, mantenga esta configuración:

- **Servidores y máquinas virtuales**: El procesador `resource_detection` con el detector `system`. En un proveedor de nube, agregue su detector.
- **Docker**: El Collector no puede detectar el servidor desde dentro de su contenedor. Establezca `host.name` en la variable de entorno `OTEL_RESOURCE_ATTRIBUTES` del Collector.
- **Kubernetes**: Los procesadores `k8s_attributes` y `resource_detection`. En Kubernetes que no sea de nube, establezca `k8s.node.name` en la variable de entorno `OTEL_RESOURCE_ATTRIBUTES` del Collector. En Kubernetes de nube, utilice el detector para su proveedor de nube en lugar de la variable de entorno.

Para agregar la detección de servidor a una configuración del Collector que no la incluya, consulte [Configurar procesadores de nombre de servidor en el Collector](#collector-configuration).

El `span_metrics` conector de la configuración recomendada utiliza atributos de servidor como dimensiones, por lo que las métricas de traza de APM conservan sus etiquetas de servidor. Si adapta la configuración, conserve todas sus dimensiones. Para obtener más detalles, consulte [conector de métricas de tramo][24].

La configuración recomendada no admite entornos de ejecución serverless o basados en tareas como AWS Lambda, ECS Fargate y EKS Fargate. Para esos casos, consulte [Ingesta directa de OTLP sin un Collector](#direct-otlp-intake-without-a-collector).

<div class="alert alert-info">Los atributos de recurso de nombre de servidor identifican la telemetría, pero no agregan servidores a la <a href="/infrastructure/list/">lista de infraestructura</a>. La configuración recomendada incluye el <a href="/opentelemetry/integrations/host_metrics/">receptor de métricas de servidor</a>, que completa la lista de infraestructura. Si lo elimina, los servidores no aparecerán allí. Las configuraciones de ejemplo de GKE Autopilot y AKS Automatic la omiten.</div>

### Ingesta directa de OTLP sin un Collector {#direct-otlp-intake-without-a-collector}

Esto se aplica cuando la telemetría va directamente a [Datadog OTLP intake][22], sin un Datadog Agent ni un OpenTelemetry Collector. Por ejemplo:

- Aplicaciones en servidores que exportan con un SDK de OpenTelemetry
- [Plataformas Serverless][12] como AWS Lambda, ECS Fargate, Azure Functions y Cloud Run
- [Plataformas administradas][13]

Establezca los atributos de recurso para su entorno antes de exportar la telemetría. Active los detectores de recursos integrados de su SDK cuando estén disponibles, o establezca los atributos usted mismo. En plataformas serverless y administradas, identifique las cargas de trabajo con atributos de recurso de plataforma en lugar de `host.name`.

Si ejecuta el Collector DDOT como sidecar en ECS Fargate o EKS Fargate, consulte [Implementaciones de sidecar en Fargate](#fargate-sidecar-deployments) en su lugar.

### Collector exportando a través de un gateway {#collector-exporting-through-a-gateway}

Esto se aplica a las implementaciones de gateway de OpenTelemetry Collector y al [DDOT Collector como gateway en Kubernetes][18].

En una implementación de gateway, el Collector que exporta a Datadog no se ejecuta en el servidor que produjo la telemetría. Si la telemetría llega al gateway sin información del servidor, la telemetría de muchos servidores puede colapsar en el nombre de servidor del gateway, o cada pod del gateway puede registrarse como su propio servidor.

Adjunte la información del servidor en el Collector a nivel de nodo. Luego, configure el gateway para mantener esos atributos de recurso en lugar de detectarlos nuevamente.

- **OpenTelemetry Collector**: En Kubernetes, agregue el procesador `k8s_attributes` en modo passthrough y el procesador `resource_detection` al Collector a nivel de nodo. En Kubernetes en la nube, utilice el detector para su proveedor de nube. Consulte el ejemplo de **Kubernetes DaemonSet -> Gateway** en [Configurar procesadores de nombre de servidor en el Collector](#collector-configuration).
- **DDOT Collector**: Mantenga el procesador `infraattributes` en la configuración del DaemonSet, como se muestra en la [guía de instalación de gateway de DDOT][18].

Si una implementación de gateway informa el servidor incorrecto, consulte [El Collector de gateway no reenvía los metadatos del servidor][19].

### Configuraciones existentes que utilizan el Datadog Exporter {#existing-configurations-using-the-datadog-exporter}

Esto se aplica a las [configuraciones de OpenTelemetry Collector existentes con el Datadog Exporter][20]. Para nuevas configuraciones de Collector, utilice la [configuración recomendada de OpenTelemetry Collector][21].

Ejecute un Collector en cada servidor o nodo de Kubernetes y configure la detección del servidor de la misma manera que en la [configuración recomendada](#opentelemetry-collector-exporting-to-datadog-over-otlp). Los [ejemplos de procesadores](#collector-configuration) en esta página funcionan con el Datadog Exporter. Para ver un ejemplo completo del Datadog Exporter en Amazon EKS, consulte [`k8s-values.yaml`][4].

Si su Collector reenvía a un gateway, siga también las [recomendaciones para gateways](#collector-exporting-through-a-gateway).

## Diagnosticar problemas de nombre de servidor {#diagnose-hostname-issues}

Datadog emite el gauge `datadog.apm.hostname_issue` cuando falta el nombre de servidor de una traza APM, se asemeja a un pod efímero de Kubernetes o difiere del nombre de servidor informado por el Datadog Agent. La métrica no afecta la facturación.

<div class="alert alert-info">El <code>issue_type</code> Los valores provienen de heurísticas, por lo que una configuración correcta puede producirlos. Utilice esta métrica para investigar un problema de nombre de servidor que ya haya visto, como un nodo que aparece como dos servidores, trazas que no se vinculan a su servidor o etiquetas de servidor faltantes.</div>

Una traza tiene como máximo un `issue_type`. Utilice la siguiente tabla para encontrar la causa probable y la solución:

| `issue_type` | Lo que indica | Acción recomendada |
|---|---|---|
| `pod_like_gateway_mismatch` | El nombre de servidor de la traza difiere del nombre de servidor del Agent y se parece a un nombre de pod de Kubernetes. | Siga las [recomendaciones de gateway](#collector-exporting-through-a-gateway). Adjunte el nodo de Kubernetes en el Collector a nivel de nodo y mantenga esos atributos de recurso a través del gateway. |
| `gateway_hostname_mismatch` | El nombre de servidor de la traza difiere del nombre de servidor del Agent. | Siga las [recomendaciones de gateway](#collector-exporting-through-a-gateway) y mantenga los atributos de recurso del nombre de servidor a través del gateway. |
| `empty_hostname` | Datadog no recibió un nombre de servidor utilizable para la traza. | Siga la [recomendación para su configuración](#hostname-recommendations) y proporcione los atributos de recurso de servidor o plataforma requeridos. |
| `pod_like_hostname` | El nombre de servidor de la traza se parece a un nombre de pod de Kubernetes efímero. | Configure la detección de servidor para [su configuración](#hostname-recommendations) de modo que la telemetría identifique el nodo, servidor o plataforma en lugar del pod. |

Las etiquetas de métricas disponibles incluyen `issue_type`, `host`, `env`, `service`, `version` y `span_source`. Los spans afectados reciben la misma etiqueta `issue_type`, que puede usar para encontrar trazas de ejemplo e inspeccionar sus atributos de recurso.

Los tipos de problemas similares a pods utilizan patrones comunes de nombres de pods de Kubernetes como heurística. Después de actualizar su configuración, inspeccione las nuevas trazas para confirmar que ya no tienen el tipo de problema.

## Configure procesadores de nombre de servidor en el Collector {#collector-configuration}

Utilice el [procesador de detección de recursos][2] para detectar atributos de servidor y nube, y el [procesador de atributos de Kubernetes][3] para agregar metadatos de Kubernetes. Agregue los procesadores a sus canalizaciones de trazas, métricas y registros. En Kubernetes, enumere `k8s_attributes` antes de `resource_detection`. Estos ejemplos funcionan tanto con el exportador OTLP HTTP como con el exportador de Datadog.

Las configuraciones de servidor, Docker y Kubernetes de la configuración recomendada ya incluyen estos procesadores. No los reemplace con estos ejemplos: el procesador `k8s_attributes` recomendado también establece `service.name` y otros atributos de servicio a partir de los metadatos del pod. Utilice estos ejemplos para gateways, configuraciones existentes del exportador de Datadog y otras configuraciones de Collector sin detección de servidor.

Los nombres de componente `resource_detection` y `k8s_attributes` requieren OpenTelemetry Collector Contrib v0.153.0 o posterior. Las versiones anteriores utilizan `resourcedetection` y `k8sattributes`. Las versiones posteriores aceptan ambos nombres.

Para obtener configuraciones completas y probadas, consulte la [configuración recomendada de OpenTelemetry Collector][21].

{{< tabs >}}
{{% tab "Servidor" %}}

Agregue lo siguiente a su configuración de Collector:

```yaml
processors:
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        # Optional: send CPU and OS details to the Infrastructure Host List
        os.description:
          enabled: true
        host.arch:
          enabled: true
        host.cpu.vendor.id:
          enabled: true
        host.cpu.family:
          enabled: true
        host.cpu.model.id:
          enabled: true
        host.cpu.model.name:
          enabled: true
        host.cpu.stepping:
          enabled: true
        host.cpu.cache.l2.size:
          enabled: true
```

En un proveedor de nube, agregue su detector al inicio de la lista `detectors`:

- Amazon EC2: `[ec2, env, system]`
- Google Cloud: `[gcp, env, system]`
- Azure: `[azure, env, system]`

{{% /tab %}}

{{% tab "Docker" %}}

El Collector no puede detectar información del servidor desde dentro de su contenedor. Establezca `host.name` en la variable de entorno `OTEL_RESOURCE_ATTRIBUTES` del contenedor del Collector (por ejemplo, `OTEL_RESOURCE_ATTRIBUTES=host.name=<YOUR_HOST_NAME>`). Luego, use el detector `env` para leerla:

```yaml
processors:
  resource_detection:
    detectors: [env]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
```

{{% /tab %}}

{{% tab "Kubernetes DaemonSet" %}}

Estos ejemplos utilizan el chart de Helm de OpenTelemetry Collector [101].

Agregue lo siguiente a `values.yaml`. La cuenta de servicio y el rol de clúster le dan al procesador `k8s_attributes` acceso de lectura a los metadatos del pod. En Kubernetes que no es de nube, `OTEL_RESOURCE_ATTRIBUTES` establece el nombre del nodo como servidor. El chart de Helm establece `OTEL_K8S_NODE_NAME`.

```yaml
extraEnvs:
  # Non-cloud Kubernetes only
  - name: OTEL_RESOURCE_ATTRIBUTES
    value: "k8s.node.name=$(OTEL_K8S_NODE_NAME)"
serviceAccount:
  create: true
clusterRole:
  create: true
  rules:
    - apiGroups: [""]
      resources: ["pods", "namespaces", "nodes"]
      verbs: ["get", "watch", "list"]
    - apiGroups: ["apps"]
      resources: ["replicasets"]
      verbs: ["get", "list", "watch"]
    - apiGroups: ["extensions"]
      resources: ["replicasets"]
      verbs: ["get", "list", "watch"]
```

No habilite el ajuste preestablecido `kubernetesAttributes` del chart con esta configuración. El ajuste preestablecido agrega un segundo procesador llamado `k8sattributes`.

Agregue lo siguiente en la configuración del Collector:

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.uid
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
      - sources:
          - from: resource_attribute
            name: k8s.pod.name
          - from: resource_attribute
            name: k8s.namespace.name
      - sources:
          - from: connection
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
```

En una distribución de Kubernetes administrada, reemplace el procesador `resource_detection` con la variante para su entorno y omita `OTEL_RESOURCE_ATTRIBUTES`. Para las variantes de Amazon EKS, EKS Auto Mode, Google GKE y Azure AKS, consulte [Managed Kubernetes distributions][102].

[101]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector
[102]: /es/opentelemetry/setup/collector_exporter/#managed-kubernetes-distributions
{{% /tab %}}

{{% tab "Kubernetes DaemonSet -> Gateway" %}}

En los archivos `values.yaml` tanto para el DaemonSet como para el gateway, agregue la cuenta de servicio y el rol de clúster que se muestran en la pestaña **Kubernetes DaemonSet**. No habilite el ajuste preestablecido `kubernetesAttributes` del chart.

DaemonSet:

```yaml
processors:
  k8s_attributes:
    passthrough: true
    auth_type: "serviceAccount"
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
```

En Kubernetes que no es de nube, configure `OTEL_RESOURCE_ATTRIBUTES` en el DaemonSet como se muestra en la pestaña **Kubernetes DaemonSet**. En una distribución de Kubernetes administrada, reemplace el procesador `resource_detection` con la variante para su entorno de [Managed Kubernetes distributions][201].

En el modo de transferencia (passthrough), el procesador `k8s_attributes` del DaemonSet agrega solo la dirección IP del pod. El procesador `k8s_attributes` del gateway utiliza esa dirección para buscar metadatos de pod desde la API de Kubernetes.

Gateway:

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
```

[201]: /es/opentelemetry/setup/collector_exporter/#managed-kubernetes-distributions
{{% /tab %}}

{{% tab "Kubernetes Gateway" %}}

Utilice esta configuración cuando las aplicaciones envíen telemetría directamente a un gateway, sin un DaemonSet Collector. En el `values.yaml` del gateway, agregue la cuenta de servicio y el rol de clúster que se muestran en la pestaña **Kubernetes DaemonSet**. No habilite el ajuste preestablecido `kubernetesAttributes` del chart.

Agregue lo siguiente en la configuración del Collector:

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
```

{{% /tab %}}
{{< /tabs >}}

### Datos recopilados {#data-collected}

La siguiente tabla enumera los atributos de recursos que estos procesadores pueden agregar. La columna **Etiqueta de Datadog** muestra la etiqueta que Datadog crea a partir del atributo, cuando existe una.

{{% collapse-content title="Atributos de recursos y etiquetas de Datadog" level="p" %}}

| Atributo de OpenTelemetry | Etiqueta de Datadog | Procesador |
|---|---|---|
| `host.arch` |  | `resource_detection` (`system`) |
| `host.name` |  | `resource_detection` (`system` o detector de nube) |
| `host.id` |  | `resource_detection` (detector de nube) |
| `host.cpu.vendor.id` |  | `resource_detection` (`system`) |
| `host.cpu.family` |  | `resource_detection` (`system`) |
| `host.cpu.model.id` |  | `resource_detection` (`system`) |
| `host.cpu.model.name` |  | `resource_detection` (`system`) |
| `host.cpu.stepping` |  | `resource_detection` (`system`) |
| `host.cpu.cache.l2.size` |  | `resource_detection` (`system`) |
| `os.description` |  | `resource_detection` (`system`) |
| `os.type` |  | `resource_detection` (`system`) |
| `cloud.provider` | `cloud_provider` | `resource_detection` (detector de nube) |
| `cloud.platform` |  | `resource_detection` (detector de nube) |
| `cloud.account.id` |  | `resource_detection` (detector de nube) |
| `cloud.region` | `region` | `resource_detection` (detector de nube) |
| `cloud.availability_zone` | `zone` | `resource_detection` (detector de nube) |
| `host.type` |  | `resource_detection` (detector de nube) |
| `gcp.gce.instance.hostname` |  | `resource_detection` (`gcp`) |
| `gcp.gce.instance.name` |  | `resource_detection` (`gcp`) |
| `k8s.cluster.name` | `kube_cluster_name` | `resource_detection` (detector de nube de Kubernetes) |
| `host.image.id` |  | `resource_detection` (`ec2`) |
| `aws.ecs.cluster.arn` | `ecs_cluster_name` | `resource_detection` (`ecs`) |
| `aws.ecs.task.arn` | `task_arn` | `resource_detection` (`ecs`) |
| `aws.ecs.task.family` | `task_family` | `resource_detection` (`ecs`) |
| `aws.ecs.task.revision` | `task_version` | `resource_detection` (`ecs`) |
| `aws.ecs.launchtype` |  | `resource_detection` (`ecs`) |
| `aws.log.group.names` |  | `resource_detection` (`ecs`) |
| `aws.log.group.arns` |  | `resource_detection` (`ecs`) |
| `aws.log.stream.names` |  | `resource_detection` (`ecs`) |
| `aws.log.stream.arns` |  | `resource_detection` (`ecs`) |
| `azure.vm.name` |  | `resource_detection` (`azure`) |
| `azure.vm.size` |  | `resource_detection` (`azure`) |
| `azure.vm.scaleset.name` |  | `resource_detection` (`azure`) |
| `azure.resourcegroup.name` |  | `resource_detection` (`azure`) |
| `k8s.namespace.name` | `kube_namespace` | `k8s_attributes` |
| `k8s.pod.name` | `pod_name` | `k8s_attributes` |
| `k8s.pod.uid` |  | `k8s_attributes` |
| `k8s.pod.start_time` |  | `k8s_attributes` |
| `k8s.deployment.name` | `kube_deployment` | `k8s_attributes` |
| `k8s.replicaset.name` | `kube_replica_set` | `k8s_attributes` |
| `k8s.replicaset.uid` |  | `k8s_attributes` |
| `k8s.daemonset.name` | `kube_daemon_set` | `k8s_attributes` |
| `k8s.daemonset.uid` |  | `k8s_attributes` |
| `k8s.statefulset.name` | `kube_stateful_set` | `k8s_attributes` |
| `k8s.statefulset.uid` |  | `k8s_attributes` |
| `k8s.container.name` | `kube_container_name` | `k8s_attributes` |
| `k8s.job.name` | `kube_job` | `k8s_attributes` |
| `k8s.job.uid` |  | `k8s_attributes` |
| `k8s.cronjob.name` | `kube_cronjob` | `k8s_attributes` |
| `k8s.node.name` |  | `k8s_attributes` |
| `container.id` | `container_id` | `k8s_attributes` |
| `container.image.name` | `image_name` | `k8s_attributes` |
| `container.image.tag` | `image_tag` | `k8s_attributes` |

{{% /collapse-content %}}

## Etiquetado personalizado {#custom-tagging}

### Etiquetas de servidor personalizadas {#custom-host-tags}

#### Como atributos de recurso OTLP {#as-otlp-resource-attributes}

Para agregar etiquetas de servidor personalizadas, establezca atributos de recurso con el prefijo `datadog.host.tag.`.

En un [OpenTelemetry SDK][5], establézcalas con la variable de entorno `OTEL_RESOURCE_ATTRIBUTES`:

```shell
OTEL_RESOURCE_ATTRIBUTES=datadog.host.tag.<CUSTOM_TAG_NAME>=<CUSTOM_TAG_VALUE>
```

En el Collector, establézcalas con el procesador de recursos:

```yaml
processors:
  resource:
    attributes:
    - key: datadog.host.tag.<CUSTOM_TAG_NAME>
      action: upsert
      from_attribute: <SOURCE_ATTRIBUTE>
```

**Nota**: Con el Datadog Exporter, las etiquetas de servidor personalizadas requieren la activación descrita en [Infrastructure List Host Information][7].

#### En el Datadog Exporter {#in-the-datadog-exporter}

Para configuraciones existentes con el [Datadog Exporter][20], también puede establecer etiquetas de servidor personalizadas en la sección `host_metadata` del exportador:

```yaml
exporters:
  datadog:
    host_metadata:
      tags: ["team:infra", "<TAG_KEY>:<TAG_VALUE>"]
```

Estas etiquetas se aplican solo a la telemetría cuyo nombre de servidor coincida con el nombre de servidor en los metadatos de servidor del exportador. Para etiquetar telemetría de cualquier servidor, utilice un procesador. Para ver todas las opciones, consulte el [ejemplo de configuración del Datadog Exporter][6].

### Alias de servidor {#host-aliases}

Para establecer alias de servidor, configure el atributo de recurso `datadog.host.aliases`. Por ejemplo, utilice el procesador de transformación:

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.aliases"], ["alias1", "alias2", "alias3"])
```

**Nota**: Con el Datadog Exporter, los alias de servidor requieren la activación descrita en [Infrastructure List Host Information][7].

### Etiquetas de contenedor personalizadas {#custom-container-tags}

Para agregar etiquetas de contenedor personalizadas, establezca atributos de recurso con el prefijo `datadog.container.tag.`.

En un [OpenTelemetry SDK][5], establézcalas con la variable de entorno `OTEL_RESOURCE_ATTRIBUTES`:

```shell
OTEL_RESOURCE_ATTRIBUTES=datadog.container.tag.<CUSTOM_TAG_NAME>=<CUSTOM_TAG_VALUE>
```

En el Collector, establézcalas con el procesador de recursos:

```yaml
processors:
  resource:
    attributes:
    - key: datadog.container.tag.<CUSTOM_TAG_NAME>
      action: upsert
      from_attribute: <SOURCE_ATTRIBUTE>
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/k8s-values.yaml
[5]: https://opentelemetry.io/docs/languages/js/resources/
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[7]: /es/opentelemetry/mapping/host_metadata/
[8]: /es/opentelemetry/mapping/hostname/
[9]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/
[10]: /es/opentelemetry/troubleshooting/#infrastructure-tags-are-missing-from-telemetry
[11]: /es/opentelemetry/setup/otlp_ingest_in_the_agent/
[12]: /es/opentelemetry/setup/otlp_ingest/serverless/
[13]: /es/opentelemetry/setup/otlp_ingest/managed_platforms/
[14]: /es/opentelemetry/setup/ddot_collector/install/linux/
[15]: /es/opentelemetry/setup/ddot_collector/install/windows/
[16]: /es/opentelemetry/setup/ddot_collector/install/ecs_fargate/
[17]: /es/opentelemetry/setup/ddot_collector/install/eks_fargate/
[18]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
[19]: /es/opentelemetry/troubleshooting/#gateway-collector-not-forwarding-host-metadata
[20]: /es/opentelemetry/setup/collector_exporter/datadog_exporter/
[21]: /es/opentelemetry/setup/collector_exporter/
[22]: /es/opentelemetry/setup/otlp_ingest/
[24]: /es/opentelemetry/setup/collector_exporter/#span-metrics-connector