---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración de OpenTelemetry Collector
title: Nombre de host y etiquetado
---

{{< img src="opentelemetry/collector_exporter/hostname_tagging.png" alt="Información de nombre de host recopilada desde OpenTelemetry" style="width:100%;" >}}

## Información general

Para extraer el nombre de host correcto y las etiquetas (tags) de host, el Exportador de Datadog utiliza el [procesador de detección de recursos][2] y el [ procesador de atributos de Kubernetes][3]. Estos procesadores permiten extraer información de hosts y contenedores en forma de [convenciones semánticas de recursos][1], que luego se utiliza para crear el nombre de host, las etiquetas de host y las etiquetas de contenedor. Estas etiquetas permiten la correlación automática entre señales telemétricas y la navegación basada en etiquetas para filtrar y agrupar datos telemétricos dentro de Datadog.

Para más información, consulta la documentación del proyecto de OpenTelemetry para los procesadores de [detección de recursos][2] y [atributos de Kubernetes][3].

## Configuración

{{< tabs >}}
{{% tab "Host" %}}

Añade las siguientes líneas a tu configuración de Collector:

```yaml
processors:
  resourcedetection:
    # bare metal
    detectors: [env, system]
    system:
      resource_attributes:
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
    # GCP
    detectors: [env, gcp, system]
    # AWS
    detectors: [env, ecs, ec2, system]
    # Azure
    detectors: [env, azure, system]
    timeout: 2s
    override: false
```

{{% /tab %}}

{{% tab "Daemonset de Kubernetes" %}}

Añade las siguientes líneas a `values.yaml`:
```yaml
presets:
  kubernetesAttributes:
    enabled: true
```

El preajuste Helm `kubernetesAttributes` configura la cuenta de servicio necesaria para que el procesador de atributos de Kubernetes extraiga metadatos de los pods. Consulta [Componentes importantes para Kubernetes][1] para obtener información adicional sobre la cuenta de servicio necesaria.

Añade lo siguiente en la configuración de Collector:

```yaml
processors:
  k8sattributes:
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
        - container.image.name
        - container.image.tag
        - container.id
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
  resourcedetection:
    # elimina los que no utilices
    detectors: [env, eks, ec2, aks, azure, gke, gce, system]
    timeout: 2s
    override: false
```

[1]: https://opentelemetry.io/docs/kubernetes/collector/components/#kubernetes-attributes-processor
{{% /tab %}}

{{% tab "DaemonSet de Kubernetes -> Gateway" %}}

Añade las siguientes líneas a `values.yaml`:
```yaml
presets:
  kubernetesAttributes:
    enabled: true
```

Utiliza el preajuste Helm `k8sattributes` tanto en Daemonset como en Gateway, para configurar la cuenta de servicio necesaria para que `k8sattributesprocessor` extraiga metadatos de los pods. Consulta [Componentes importantes para Kubernetes][1] para obtener información adicional sobre la cuenta de servicio necesaria.

DaemonSet:

```yaml
processors:
  k8sattributes:
        passthrough: true
        auth_type: "serviceAccount"
  resourcedetection:
    detectors: [env, <eks/ec2>, <aks/azure>, <gke/gce>, system]
    timeout: 2s
    override: false
```
Dado que el procesador está en modo passthrough en el DaemonSet, solo añade las direcciones IP del pod. A continuación, el procesador Gateway utiliza estas direcciones para realizar llamadas a la API de Kubernetes y extraer metadatos.

Gateway:

```yaml
processors:
 k8sattributes:
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
        - container.image.name
        - container.image.tag
        - container.id
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

[1]: https://opentelemetry.io/docs/kubernetes/collector/components/#kubernetes-attributes-processor
{{% /tab %}}
{{% tab "Gateway de Kubernetes" %}}

Añade las siguientes líneas a `values.yaml`:

```yaml
presets:
  kubernetesAttributes:
    enabled: true
```
El preajuste Helm `kubernetesAttributes` configura la cuenta de servicio necesaria para que el procesador de atributos de Kubernetes extraiga metadatos de los pods. Consulta [Componentes importantes para Kubernetes][1] para obtener información adicional sobre la cuenta de servicio necesaria.

Añade lo siguiente en la configuración de Collector:

```yaml
processors:
  k8sattributes:
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
        - container.image.name
        - container.image.tag
        - container.id
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
  resourcedetection:
    detectors: [env, <eks/ec2>, <aks/azure>, <gke/gce>, system]
    timeout: 2s
    override: false
```

[1]: https://opentelemetry.io/docs/kubernetes/collector/components/#kubernetes-attributes-processor

{{% /tab %}}
{{< /tabs >}}

## Datos recopilados

| Atributo de OpenTelemetry | Etiqueta de Datadog | Procesador |
|---|---|---|
| `host.arch` |  | `resourcedetectionprocessor{system}` |
| `host.name` |  | `resourcedetectionprocessor{system,gcp,ec2,azure}` |
| `host.id` |  | `resourcedetectionprocessor{system,gcp,ec2,azure}` |
| `host.cpu.vendor.id` |  | `resourcedetectionprocessor{system}` |
| `host.cpu.family` |  | `resourcedetectionprocessor{system}` |
| `host.cpu.model.id` |  | `resourcedetectionprocessor{system}` |
| `host.cpu.model.name` |  | `resourcedetectionprocessor{system}` |
| `host.cpu.stepping` |  | `resourcedetectionprocessor{system}` |
| `host.cpu.cache.l2.size` |  | `resourcedetectionprocessor{system}` |
| `os.description` |  | `resourcedetectionprocessor{system}` |
| `os.type` |  | `resourcedetectionprocessor{system}` |
| `cloud.provider` | `cloud_provider` | `resourcedetectionprocessor{gcp,ec2,ecs,eks,azure,aks}` |
| `cloud.platform` |  | `"resourcedetectionprocessor{gcp,ec2,ecs,eks,azure,aks}"` |
| `cloud.account.id` |  | `"resourcedetectionprocessor{gcp,ec2,ecs,azure}"` |
| `cloud.region` | `region` | `resourcedetectionprocessor{gcp,ec2,ecs,azure}` |
| `cloud.availability_zone` | `zone` | `resourcedetectionprocessor{gcp,ec2,ecs}` |
| `host.type` |  | `"resourcedetectionprocessor{gcp,ec2}"` |
| `gcp.gce.instance.hostname` |  | `resourcedetectionprocessor{gcp}` |
| `gcp.gce.instance.name` |  | `resourcedetectionprocessor{gcp}` |
| `k8s.cluster.name` | `kube_cluster_name` | `resourcedetectionprocessor{gcp,eks}` |
| `host.image.id` |  | `resourcedetectionprocessor{ec2}` |
| `aws.ecs.cluster.arn` | `ecs_cluster_name` | `k8sattributes` |
| `aws.ecs.task.arn` | `task_arn` | `k8sattributes` |
| `aws.ecs.task.family` | `task_family` | `k8sattributes` |
| `aws.ecs.task.revision` | `task_version` | `k8sattributes` |
| `aws.ecs.launchtype` |  | `k8sattributes` |
| `aws.log.group.names` |  | `k8sattributes` |
| `aws.log.group.arns` |  | `k8sattributes` |
| `aws.log.stream.names` |  | `k8sattributes` |
| `aws.log.stream.arns` |  | `k8sattributes` |
| `azure.vm.name` |  | `k8sattributes` |
| `azure.vm.size` |  | `k8sattributes` |
| `azure.vm.scaleset.name` |  | `k8sattributes` |
| `azure.resourcegroup.name` |  | `k8sattributes` |
| `k8s.cluster.uid` |  | `k8sattributes` |
| `k8s.namespace.name` | `kube_namespace` | `k8sattributes` |
| `k8s.pod.name` | `pod_name` | `k8sattributes` |
| `k8s.pod.uid` |  | `k8sattributes` |
| `k8s.pod.start_time` |  | `k8sattributes` |
| `k8s.deployment.name` | `kube_deployment` | `k8sattributes` |
| `k8s.replicaset.name` | `kube_replica_set` | `k8sattributes` |
| `k8s.replicaset.uid` |  | `k8sattributes` |
| `k8s.daemonset.name` | `kube_daemon_set` | `k8sattributes` |
| `k8s.daemonset.uid` |  | `k8sattributes` |
| `k8s.statefulset.name` | `kube_stateful_set` | `k8sattributes` |
| `k8s.statefulset.uid` |  | `k8sattributes` |
| `k8s.container.name` | `kube_container_name` | `k8sattributes` |
| `k8s.job.name` | `kube_job` | `k8sattributes` |
| `k8s.job.uid` |  | `k8sattributes` |
| `k8s.cronjob.name` | `kube_cronjob` | `k8sattributes` |
| `k8s.node.name` |  | `k8sattributes` |
| `container.id` | `container_id` | `k8sattributes` |
| `container.image.name` | `image_name` | `k8sattributes` |
| `container.image.tag` | `image_tag` | `k8sattributes` |


## Ejemplo completo de configuración

Para ver un ejemplo completo de configuración en funcionamiento con el exportador de Datadog, consulta [`k8s-values.yaml`][4]. Este ejemplo es para Amazon EKS.

## Ejemplo de salida de registro

```
ResourceSpans #0
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> container.id: Str(0cb82a1bf21466b4189414cf326683d653114c0f61994c73f78d1750b9fcdf06)
     -> service.name: Str(cartservice)
     -> service.instance.id: Str(5f35cd94-1b9c-47ff-bf45-50ac4a998a6b)
     -> service.namespace: Str(opentelemetry-demo)
     -> k8s.namespace.name: Str(otel-gateway)
     -> k8s.node.name: Str(ip-192-168-61-208.ec2.internal)
     -> k8s.pod.name: Str(opentelemetry-demo-cartservice-567765cd64-cbmwz)
     -> deployment.environment: Str(otel-gateway)
     -> k8s.pod.ip: Str(192.168.45.90)
     -> telemetry.sdk.name: Str(opentelemetry)
     -> telemetry.sdk.language: Str(dotnet)
     -> telemetry.sdk.version: Str(1.5.1)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-09e82186d7d8d7c95)
     -> host.image.id: Str(ami-06f28e19c3ba73ef7)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-50-0.ec2.internal)
     -> os.type: Str(linux)
     -> k8s.deployment.name: Str(opentelemetry-demo-cartservice)
     -> kube_app_name: Str(opentelemetry-demo-cartservice)
     -> k8s.replicaset.uid: Str(ddb3d058-6d6d-4423-aca9-0437c3688217)
     -> k8s.replicaset.name: Str(opentelemetry-demo-cartservice-567765cd64)
     -> kube_app_instance: Str(opentelemetry-demo)
     -> kube_app_component: Str(cartservice)
     -> k8s.pod.start_time: Str(2023-11-13T15:03:46Z)
     -> k8s.pod.uid: Str(5f35cd94-1b9c-47ff-bf45-50ac4a998a6b)
     -> k8s.container.name: Str(cartservice)
     -> container.image.name: Str(XXXXXXXXX.dkr.ecr.us-east-1.amazonaws.com/otel-demo)
     -> container.image.tag: Str(v4615c8d7-cartservice)
ScopeSpans #0
ScopeSpans SchemaURL: 
InstrumentationScope Microsoft.AspNetCore 
Span #0
    Trace ID       : fc6794b53df7e44bab9dced42bdfbf7b
    Parent ID      : 2d3ba75ad6a6b1a0
    ID             : f669b0fcd98365b9
    Name           : oteldemo.CartService/AddItem
    Kind           : Server
    Start time     : 2023-11-20 13:37:11.2060978 +0000 UTC
    End time       : 2023-11-20 13:37:11.2084166 +0000 UTC
    Status code    : Unset
    Status message : 
Attributes:
     -> net.host.name: Str(opentelemetry-demo-cartservice)
     -> net.host.port: Int(8080)
     -> http.method: Str(POST)
     -> http.scheme: Str(http)
     -> http.target: Str(/oteldemo.CartService/AddItem)
     -> http.url: Str(http://opentelemetry-demo-cartservice:8080/oteldemo.CartService/AddItem)
     -> http.flavor: Str(2.0)
     -> http.user_agent: Str(grpc-node-js/1.8.14)
     -> app.user.id: Str(e8521c8c-87a9-11ee-b20a-4eaeb9e6ddbc)
     -> app.product.id: Str(LS4PSXUNUM)
     -> app.product.quantity: Int(3)
     -> http.status_code: Int(200)
     -> rpc.system: Str(grpc)
     -> net.peer.ip: Str(::ffff:192.168.36.112)
     -> net.peer.port: Int(36654)
     -> rpc.service: Str(oteldemo.CartService)
     -> rpc.method: Str(AddItem)
     -> rpc.grpc.status_code: Int(0)
```


[1]: https://opentelemetry.io/docs/specs/semconv/resource/
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/k8s-values.yaml