---
aliases:
- /es/agent/kubernetes/distributions
further_reading:
- link: agent/kubernetes/log
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/kubernetes/apm
  tag: Documentación
  text: Recopila tus trazas de aplicaciones
- link: /agent/kubernetes/prometheus
  tag: Documentación
  text: Recopila tus métricas de Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentación
  text: Recopila las métricas de tus aplicaciones y logs automáticamente
- link: /agent/guide/autodiscovery-management
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
- link: https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/
  tag: Blog
  text: Monitorizar Tanzu Kubernetes Grid en vSphere
kind: documentación
title: Distribuciones de Kubernetes
---

## Información general

Esta sección intenta documentar aspectos específicos y proporcionar una buena base para la configuración de las principales distribuciones de Kubernetes.
Estas configuraciones se pueden personalizar para añadir cualquier característica de Datadog.

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes (OKE)](#OKE)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

No es necesaria ninguna configuración específica.

Si utilizas el sistema operativo AWS Bottlerocket en tus nodos, añade lo siguiente para habilitar la monitorización de contenedores (check `containerd`):

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  criSocketPath: /run/dockershim.sock
  env:
  - name: DD_AUTOCONFIG_INCLUDE_FEATURES
    value: "containerd"
```

{{% /tab %}}
{{% tab "Operator" %}}

En un clúster de EKS, puedes instalar el Operator utilizando [Helm][5] o como un [complemento EKS][6].

La siguiente configuración está pensada para funcionar con cualquiera de las dos configuraciones (Helm o complemento EKS) cuando el Agent está instalado en el mismo espacio de nombres que el Datadog Operator.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    criSocketPath: /run/dockershim.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
```

{{% /tab %}}
{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

AKS requiere una configuración específica para la integración `Kubelet` debido a la forma en que AKS ha configurado los certificados SSL. Además, la función opcional [Controlador de admisión[1] requiere una configuración específica para evitar errores al reconciliar el webhook.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Requerido a partir del Agent v7.35. Consulta la nota sobre el certificado kubelet más abajo.
  kubelet:
    tlsVerify: false

providers:
  aks:
    enabled: true
```

La opción `providers.aks.enabled` establece la variable de entorno necesaria `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"`.

{{% /tab %}}
{{% tab "Operator" %}}

Recurso Kubernetes del Datadog Agent:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: true
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

{{% /tab %}}
{{< /tabs >}}

`kubelet.tlsVerify=false` establece la variable de entorno `DD_KUBELET_TLS_VERIFY=false` para que puedas desactivar la verificación del certificado del servidor.

### Certificado kubelet de AKS

Existe un problema conocido con el formato del certificado kubelet de AKS en versiones de imagen de nodo más antiguas. A partir del Agent v7.35, es necesario utilizar `tlsVerify: false`, ya que los certificados no contenían un nombre alternativo de sujeto (SAN) válido.

Si todos los nodos de tu clúster de AKS utilizan una versión de imagen de nodo compatible, puedes utilizar la verificación TLS Kubelet. Tu versión debe ser igual o superior a las [versiones enumeradas aquí para la versión 2022-10-30][2]. También debes actualizar tu configuración de Kubelet para utilizar el nombre del nodo en la dirección y en el mapa en la ruta personalizada del certificado.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Requiere una versión de imagen de nodo compatible
  kubelet:
    host:
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    hostCAPath: /etc/kubernetes/certs/kubeletserver.crt

providers:
  aks:
    enabled: true
```

{{% /tab %}}
{{% tab "Operator" %}}

Recurso Kubernetes del Datadog Agent:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: true
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    kubelet:
      host:
        fieldRef:
          fieldPath: spec.nodeName
      hostCAPath: /etc/kubernetes/certs/kubeletserver.crt
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

{{% /tab %}}
{{< /tabs >}}

El uso de `spec.nodeName` retiene la verificación TLS. En algunas configuraciones, la resolución DNS para `spec.nodeName` en pods podría no funcionar en AKS. Esto ha sido reportado en todos los nodos AKS de Windows y en los casos en que el clúster está configurado en una red virtual utilizando DNS personalizado en nodos Linux. En ese caso, utiliza la primera configuración de AKS proporcionada: elimina cualquier configuración para la ruta del host Kubelet (por defecto es `status.hostIP`) y utiliza `tlsVerify: false`. Esta configuración es **necesaria**. NO configures la ruta del host Kubelet y `tlsVerify: false` juntos.

## Google Kubernetes Engine (GKE) {#GKE}

GKE se puede configurar con dos modos de funcionamiento diferentes:

- **Standard** (Estándar): tú gestionas la infraestructura subyacente del clúster, proporcionándole flexibilidad a la configuración de tu nodo.
- **Autopilot** (Piloto automático): GKE suministra y gestiona la infraestructura subyacente del clúster, incluidos los nodos y los grupos de nodos, lo que te ofrece un clúster optimizado que no necesita de tu intervención.

En función del modo de funcionamiento de tu clúster, el Datadog Agent se debe configurar de diferentes formas.

### Standard (Estándar)

A partir del Agent v7.26, no se requiere ninguna configuración específica para GKE (tanto si ejecutas `Docker` como si ejecutas `containerd`).

**Nota**: Cuando se utiliza COS (Container-Optimized OS), `OOM Kill`basado en eBPF y los checks `TCP Queue Length` son compatibles a partir de la versión 3.0.1 de los charts de Helm. Para habilitar estos checks, configura los siguientes parámetros:
- `datadog.systemProbe.enableDefaultKernelHeadersPaths` en `false`.

### Autopilot (Piloto automático)

Autopilot de GKE requiere algunas configuraciones que se muestran a continuación.

Datadog te recomienda que especifiques límites de recursos para el contenedor del Agent. El Autopilot establece un límite por defecto relativamente bajo (50m de CPU, 100Mi de memoria), que puede llevar al contenedor del Agent rápidamente a OOMKill, dependiendo de tu entorno. Si procede, especifica también límites de recursos para los contenedores Trace Agent y Process Agent. Además, es posible que quieras crear una clase de prioridad para que el Agent garantice que está programado.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # Sitio de la ingesta de Datadog para el envío de datos del Agent a (ejemplo: `us3.datadoghq.com`)
  # El valor por defecto es `datadoghq.com' (the US1 site)
  # Documentación: https://docs.datadoghq.com/getting_started/site/
  site: <DATADOG_SITE>

agentes:
  contenedores:
    agent:
      # recursos para el contenedor del Agent
      recursos:
        solicitudes:
          cpu: 200m
          memoria: 256Mi

    traceAgent:
      # recursos para el contenedor del Trace Agent
      recursos:
        solicitudes:
          cpu: 100m
          memoria: 200Mi

    processAgent:
      # recursos para el contenedor del Process Agent container
      recursos:
        solicitudes:
          cpu: 100m
          memoria: 200Mi

  priorityClassCreate: true

proveedores:
  gke:
    autopilot: true
```

{{% /tab %}}
{{< /tabs >}}

### Pods e instancias de spot

El uso de pods de spot en clústeres Autopilot GKE contamina los nodos GKE. Si quieres utilizar pods de spot, debes realizar una configuración adicional para proporcionar tolerancias al Datadog Agent.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      tolerations:
        - effect: NoSchedule
          key: cloud.google.com/gke-spot
          operator: Equal
          value: "true"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
agentes:
  #(...)
  # agents.tolerations -- Permitir al DaemonSet programar en nodos contaminados (requiere  Kubernetes v1.6 o anteriores)
  tolerancias:
  - efecto: NoSchedule
    clave: cloud.google.com/gke-spot
    operador: Equal
    valor: "true"
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: La monitorización del rendimiento de redes no es compatible con el Autopilot GKE.

## Red Hat OpenShift {#Openshift}

OpenShift viene con seguridad reforzada por defecto (SELinux, SecurityContextConstraints), por lo que requiere una configuración específica:
- Crear SCC para Node Agent y Cluster Agent
- Ruta de socket CRI específica ya que OpenShift utiliza el tiempo de ejecución de contenedor CRI-O
- Es posible que los certificados de la API de Kubelet no siempre estén firmados por la CA de clústeres 
- Se requieren tolerancias para programar el Node Agent en los nodos `master` y `infra`
- Se debe establecer el nombre del clúster ya que no puede recuperarse automáticamente del proveedor de nube

Este configuración es compatible con OpenShift 3.11 y OpenShift 4, pero funciona mejor con OpenShift 4.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  criSocketPath: /var/run/crio/crio.sock
  # Dependiendo de tu configuración DNS/SSL, puede que no sea posible verificar el certificado kubelet correctamente
  # Si tienes la CA correcta, puedes cambiarla a true
  kubelet:
    tlsVerify: false
agentes:
  podSecurity:
    securityContextConstraints:
      crear: true
  tolerancias:
  - efecto: NoSchedule
    key: node-role.kubernetes.io/master
    operador: Exists
  - efecto: NoSchedule
    clave: node-role.kubernetes.io/infra
    operador: Exists
clusterAgent:
  podSecurity:
    securityContextConstraints:
      crear: true
kube-state-metrics:
  securityContext:
    habilitado: false
```

{{% /tab %}}
{{% tab "Operator" %}}

Cuando se utiliza el Datadog Operator en OpenShift, se recomienda instalarlo a través de OperatorHub o RedHat Marketplace.
El objetivo de los siguientes parámetros es funcionar con esta configuración (debido a la configuración de SCC/ServiceAccount), cuando el
Agent se instala en el mismo espacio de nombres que el Datadog Operator.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    logCollection:
      enabled: false
    liveProcessCollection:
      enabled: false
    liveContainerCollection:
      enabled: true
    apm:
      enabled: false
    cspm:
      enabled: false
    cws:
      enabled: false
    npm:
      enabled: false
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
      port: 8443
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
    criSocketPath: /var/run/crio/crio.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
      containers:
        cluster-agent:
          securityContext:
            readOnlyRootFilesystem: false
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      securityContext:
        runAsUser: 0
        seLinuxOptions:
          level: s0
          role: system_r
          type: spc_t
          user: system_u
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/infra
          operator: Exists
          effect: NoSchedule
```

**Nota**: La anulación del contexto de seguridad del Agent de nodo es necesaria para la recopilación de logs y de trazas de APM con el socket `/var/run/datadog/apm/apm.socket`. Si estas funciones no están activadas, puedes omitir esta anulación.

{{% /tab %}}
{{< /tabs >}}

## Rancher {#Rancher}

Las instalaciones Rancher son similares a las instalaciones Kubernetes vainilla y sólo requieren algunos cambios menores en la configuración:
- Se requieren tolerancias para programar el Agent de nodo en los nodos `controlplane` y `etcd` 
- Se debe establecer el nombre del clúster, ya que no puede recuperarse automáticamente del proveedor de nube

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
agents:
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/controlplane
    operator: Exists
  - effect: NoExecute
    key: node-role.kubernetes.io/etcd
    operator: Exists
```

{{% /tab %}}
{{% tab "Operator" %}}

Recurso Kubernetes del Datadog Agent:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    logCollection:
      enabled: false
    liveProcessCollection:
      enabled: false
    liveContainerCollection:
      enabled: true
    apm:
      enabled: false
    cspm:
      enabled: false
    cws:
      enabled: false
    npm:
      enabled: false
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
```

{{% /tab %}}
{{< /tabs >}}

## Oracle Container Engine for Kubernetes (OKE) {#OKE}

No es necesaria ninguna configuración específica.

Para activar la monitorización de contenedores añade lo siguiente (check `containerd`):

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  criSocketPath: /run/dockershim.sock
  env:
  - name: DD_AUTOCONFIG_INCLUDE_FEATURES
    value: "containerd"
```

{{% /tab %}}
{{% tab "Operator" %}}

Recurso Kubernetes del Datadog Agent:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    criSocketPath: /run/dockershim.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
```

{{% /tab %}}
{{< /tabs >}}

Puedes encontrar más ejemplos de `values.yaml` en el [repositorio de charts de Helm][3]
Puedes encontrar más ejemplos de `DatadogAgent` en el [repositorio del Datadog Operator][4]

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG requiere algunos pequeños cambios en su configuración, que se muestran a continuación. Por ejemplo, se requiere establecer una tolerancia para que el controlador programe el Agent de nodo en los nodos `master`.


{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    # Establecer tlsVerify como falso, ya que los certificados kubelet son auto-firmados
    tlsVerify: false
  # Deshabilitar la instalación de charts de dependencia `kube-state-metrics`.
  kubeStateMetricsEnabled: false
  # Enable the new `kubernetes_state_core` check.
  kubeStateMetricsCore:
    enabled: true
# Añadir una tolerancia para que el Agent pueda ser programado en nodos del plano de control:
  tolerations:
    - key: node-role.kubernetes.io/master
      effect: NoSchedule
```

{{% /tab %}}
{{% tab "Operator" %}}

Recurso Kubernetes del Datadog Agent:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    eventCollection:
      collectKubernetesEvents: true
    kubeStateMetricsCore:
      enabled: true
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
```

{{% /tab %}}
{{< /tabs >}}


{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/cluster_agent/admission_controller
[2]: https://github.com/Azure/AKS/releases/tag/2022-10-30
[3]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[4]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent/v2alpha1
[5]: /es/getting_started/containers/datadog_operator
[6]: /es/agent/guide/operator-eks-addon