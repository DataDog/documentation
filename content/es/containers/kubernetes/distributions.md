---
aliases:
- /es/agent/kubernetes/distributions
description: Instrucciones de instalación y configuración específicas de cada plataforma
  para el Datadog Agent en diferentes distribuciones Kubernetes
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
  text: Asignar etiquetas (tags) a todos los datos emitidos por un contenedor
- link: https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/
  tag: Blog
  text: Monitorizar Tanzu Kubernetes Grid en vSphere
title: Distribuciones de Kubernetes
---

## Información general

El objetivo de esta sección es documentar aspectos específicos y proporcionar una buena base para la configuración de las principales distribuciones Kubernetes.
Estas configuraciones se pueden personalizar para añadir cualquier función de Datadog.

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes (OKE)](#OKE)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

No es necesaria ninguna configuración específica.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En un clúster de EKS, puedes instalar el Operator utilizando [Helm][1] o como un [complemento EKS][2].

La siguiente configuración está pensada para funcionar con cualquiera de las dos configuraciones (Helm o complemento EKS) cuando el Agent está instalado en el mismo espacio de nombres que el Datadog Operator.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
```

[1]:/es/containers/kubernetes/installation/?tab=datadogoperator
[2]: /es/agent/guide/operator-eks-addon

{{% /tab %}}

{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

### Admission Controller
La función opcional [Admission Controller][1] requiere una configuración específica para evitar un error al conciliar el webhook.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Recurso Kubernetes del Datadog Agent:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

Sustituye `<DATADOG_SITE>` por tu [sitio Datadog][1]. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el SITIO correcto para tu cuenta a la derecha de esta página.

[1]: /es/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` personalizado:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

providers:
  aks:
    enabled: true
```

La opción `providers.aks.enabled` establece la variable de entorno necesaria `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"`.

{{% /tab %}}
{{< /tabs >}}

### Rotación de certificados de servicio de Kubelet
Si tu clúster **no** tiene habilitada la [rotación de certificados de servicio de Kubelet][13], deberás proporcionar una configuración adicional para permitir que el Datadog Agent se conecte al Kubelet. La rotación de certificados de servicio de Kubelet está habilitada en los clústeres Kubernetes v1.27 y posteriores, en grupos de nodos actualizados después de julio de 2025.

Tus nodos tienen esta función activada si tienen la etiqueta (label) `kubernetes.azure.com/kubelet-serving-ca=cluster`. Comprueba si todos tus nodos tienen esta etiqueta, ejecutando:

```shell
kubectl get nodes -L kubernetes.azure.com/kubelet-serving-ca
```

Asegúrate de que todos tus nodos muestran `cluster`.

#### Sin la rotación de certificados de servicio de Kubelet

Si la rotación de certificados de servicio de Kubelet no está habilitada, proporciona la siguiente configuración adicional de Kubelet:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Recurso Kubernetes del Datadog Agent:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
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
{{% tab "Helm" %}}

`datadog-values.yaml` personalizado:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
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
{{< /tabs >}}

En estas versiones del nodo AKS, el certificado Kubelet AKS requiere cambiar el host Kubelet al `spec.nodeName` y la ubicación `hostCAPath` del certificado, como se ve en los fragmentos anteriores. Esto permite la verificación TLS. Sin estos cambios, el Agent no puede conectarse al Kubelet.

<div class="alert alert-info">Una vez habilitada la rotación de certificados de servicio de Kubelet en tu clúster, elimina esta configuración.</div>

Cuando actualices tu clúster AKS, es posible que la función de rotación de certificados de servicio de Kubelet se active automáticamente, lo que puede afectar negativamente a tu Datadog Agent si utilizas la configuración especial anterior para hacer referencia al certificado `/etc/kubernetes/certs/kubeletserver.crt`. Cuando se activa la rotación de certificados de servicio de Kubelet, este certificado se elimina, lo que causa:

- En Datadog Operator: El contenedor del Agent se apaga en `Error`, ya que no puede conectarse al Kubelet, y genera `Error while getting hostname, exiting: unable to reliably determine the host name`
- En Helm: El pod del Agent falla al arrancar con el evento de advertencia `MountVolume.SetUp failed for volume "kubelet-ca" : hostPath type check failed: /etc/kubernetes/certs/kubeletserver.crt is not a file`

En estos casos, elimina las configuraciones adicionales de Kubelet.

Como alternativa, también puedes [conectarte al Kubelet sin verificación TLS](#without-tls-verification).

### Sin verificación TLS

En algunos clústeres, la resolución DNS de `spec.nodeName` en pods no funciona en AKS. Esto afecta a:
 - Nodos Windows
 - Nodos Linux, cuando el clúster está configurado en una red virtual que utiliza DNS personalizados

En este caso, utiliza la configuración AKS proporcionada a continuación para definir `tlsVerify: false` y eliminar cualquier configuración para la ruta del host Kubelet (que por defecto es `status.hostIP`). **No definas la ruta del host Kubelet y `tlsVerify: false` en la misma configuración**.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Recurso Kubernetes del Datadog Agent:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
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
{{% tab "Helm" %}}

`datadog-values.yaml` personalizado:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    tlsVerify: false

providers:
  aks:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

## Google Kubernetes Engine (GKE) {#GKE}

GKE se puede configurar con dos modos de funcionamiento diferentes:

- **Standard** (Estándar): tú gestionas la infraestructura subyacente del clúster, proporcionándole flexibilidad a la configuración de tu nodo.
- **Autopilot** (Piloto automático): GKE suministra y gestiona la infraestructura subyacente del clúster, incluidos los nodos y los grupos de nodos, lo que te ofrece un clúster optimizado que no necesita de tu intervención.

En función del modo de funcionamiento de tu clúster, el Datadog Agent se debe configurar de diferentes formas.

### Standard (Estándar)

A partir del Agent v7.26, no se requiere ninguna configuración específica para GKE (tanto si ejecutas `Docker`, como si ejecutas `containerd`).

**Nota**: Cuando se utiliza COS (Container-Optimized OS), `OOM Kill`basado en eBPF y los checks `TCP Queue Length` son compatibles a partir de la versión 3.0.1 de los charts de Helm. Para habilitar estos checks, configura los siguientes parámetros:
- `datadog.systemProbe.enableDefaultKernelHeadersPaths` en `false`.

### Autopilot

Autopilot de GKE requiere algunas configuraciones que se muestran a continuación.

Datadog recomienda especificar límites de recursos para el contenedor del Agent. Autopilot establece un límite por defecto relativamente bajo (50m CPU, 100Mi memoria) que puede llevar al contenedor del Agent a un cierre forzoso por error de memoria (OOMKill) rápidamente dependiendo de tu entorno. Si corresponde, también especifica límites de recursos para contenedores de Trace Agent, Process Agent y System-Probe. Además, es posible que quieras crear una clase de prioridad para el Agent para asegurarte de que sea programado.

A partir del Agent `7.65.0+` y la versión `3.113.0+` del Helm chart, Datadog recomienda utilizar `datadog.kubelet.useApiServer` para que el Agent consulte la lista de pods desde el servidor de API. Evita utilizar el [puerto Kubelet de solo lectura obsoleto][12].


{{< tabs >}}
{{% tab "Helm" %}}

`datadog-values.yaml` personalizado:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # The site of the Datadog intake to send Agent data to (example: `us3.datadoghq.com`)
  # Default value is `datadoghq.com' (the US1 site)
  # Documentation: https://docs.datadoghq.com/getting_started/site/
  site: <DATADOG_SITE>

  # This option uses the API server to retrieve the node-level pod list from the API server.
  # This setting is necessary to migrate away from the deprecated read-only kubelet port.
  # Requires Agent 7.65.0+ and Datadog Helm chart version 3.113.0+.
  kubelet:
    useApiServer: true

agents:
  containers:
    agent:
      # resources for the Agent container
      resources:
        requests:
          cpu: 200m
          memory: 256Mi

    traceAgent:
      # resources for the Trace Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

    processAgent:
      # resources for the Process Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

    systemProbe:
      # resources for the System Probe container
      resources:
        requests:
          cpu: 100m
          memory: 400Mi

  priorityClassCreate: true

providers:
  gke:
    autopilot: true
```

{{% /tab %}}
{{< /tabs >}}

### Spot Pods y clases de computación

El uso de [Spot Pods][10] en clústeres GKE Autopilot introduce [contaminaciones][9] en los nodos Spot GKE correspondientes. Cuando se utilizan Spot Pods, se requiere una configuración adicional para proporcionar al Agent DaemonSet una tolerancia coincidente.

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
agents:
  #(...)
  # agents.tolerations -- Permitir al DaemonSet programar en nodos contaminados (requiere  Kubernetes v1.6 o anteriores)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/gke-spot
    operator: Equal
    value: "true"
```
{{% /tab %}}
{{< /tabs >}}

Del mismo modo, cuando utilices [clases de computación GKE Autopilot][11] para ejecutar cargas de trabajo que tengan requisitos de hardware específicos, toma nota de las [contaminaciones][9] que GKE Autopilot está aplicando a estos nodos específicos y añade tolerancias coincidentes al Agent DaemonSet. Puedes hacer coincidir las tolerancias en tus pods correspondientes. Por ejemplo, para la clase de computación `Scale-Out` utiliza una tolerancia como:

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
agents:
  #(...)
  # agents.tolerations -- Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/compute-class
    operator: Equal
    value: Scale-Out
```
{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift viene con seguridad reforzada por defecto con SELinux y SecurityContextConstraints (SCC). Como resultado de esto, requiere algunas configuraciones específicas:
- Acceso SCC elevado para el Node Agent y el Cluster Agent
- Es posible que los certificados de la API de Kubelet no siempre estén firmados por la CA para clústeres 
- Se requieren tolerancias para programar el Node Agent en los nodos `master` y `infra`
- Se debe establecer el nombre del clúster, ya que no puede recuperarse automáticamente del proveedor de nube
- *(Opcional)* Define `hostNetwork: true` en el Node Agent para permitir que el Agent realice solicitudes a los servicios de metadatos del proveedor de la nube (IMDS).

Esta configuración central es compatible con OpenShift v3.11 y OpenShift v4, pero funciona mejor con OpenShift v4.

Además, la recopilación de logs y APM también tienen requisitos ligeramente diferentes.

El uso de Unix Domain Socket (UDS) para APM y DogStatsD puede funcionar en OpenShift. Sin embargo, Datadog no lo recomienda, ya que requiere permisos privilegiados adicionales y acceso SCC a **ambos**: tu Datadog Agent y tuu pod de aplicación. Datadog recomienda desactivar la opción UDS para evitarlo, permitiendo que el Admission Controller inyecte la [configuración TCP/IP][7] o [configuración de servicio][8] adecuada para la conectividad de APM.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Cuando utilices Datadog Operator en OpenShift, Datadog recomienda utilizar el Operator Lifecycle Manager para implementar Datadog Operator desde OperatorHub en tu consola web de clúster de OpenShift. Consulta los [pasos de instalación de Operator][1]. La configuración siguiente funciona con esa instalación, que crea el [acceso a SCC basado en ClusterRole y ClusterRoleBinding][2] para el `datadog-agent-scc` de ServiceAccount especificado. Esta configuración del `DatadogAgent` debe desplegarse en el mismo espacio de nombres que el Datadog Operator.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
  namespace: openshift-operators # set as the same namespace where the Datadog Operator was deployed
spec:
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
    dogstatsd:
      unixDomainSocketConfig:
        enabled: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      serviceAccountName: datadog-agent-scc
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      hostNetwork: true
      securityContext:
        runAsUser: 0
        seLinuxOptions:
          level: s0
          role: system_r
          type: spc_t
          user: system_u
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/infra
          operator: Exists
          effect: NoSchedule
```

**Nota**: La anulación de `nodeAgent.securityContext.seLinuxOptions` es necesaria para la recopilación de logs cuando se despliega con el Operator. Si la recopilación de logs no está activada, puedes omitir esta anulación.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md
[2]: https://docs.openshift.com/container-platform/4.10/authentication/managing-security-context-constraints.html#role-based-access-to-ssc_configuring-internal-oauth
{{% /tab %}}
{{% tab "Helm" %}}

La siguiente configuración crea SCC personalizados para las cuentas de servicio del Agent y del Cluster Agent.

`datadog-values.yaml` personalizado:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  apm:
    portEnabled: true
    socketEnabled: false
agents:
  podSecurity:
    securityContextConstraints:
      create: true
  useHostNetwork: true
  tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/master
      operator: Exists
    - effect: NoSchedule
      key: node-role.kubernetes.io/infra
      operator: Exists
clusterAgent:
  podSecurity:
    securityContextConstraints:
      create: true
```

{{% /tab %}}

{{< /tabs >}}

## Rancher {#Rancher}

Las instalaciones de Rancher son similares a las instalaciones Kubernetes estándar, por lo que solo requieren una configuración menor:
- Las tolerancias son necesarias para programar el Node Agent en los nodos `controlplane` y `etcd`.
- Se debe definir el nombre del clúster, ya que no se puede recuperar automáticamente del proveedor de la nube.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
{{% tab "Helm" %}}

`datadog-values.yaml` personalizado:

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

{{< /tabs >}}

## Oracle Container Engine para Kubernetes (OKE) {#OKE}

No es necesaria ninguna configuración específica.

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG requiere algunos pequeños cambios en su configuración que se muestran a continuación. Por ejemplo, se requiere establecer una tolerancia para que el controlador programe el Node Agent en los nodos `master`.


{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
    clusterName: <CLUSTER_NAME>
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
{{% tab "Helm" %}}

`datadog-values.yaml` personalizado:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    # Set tlsVerify to false since the Kubelet certificates are self-signed
    tlsVerify: false
  # Disable the `kube-state-metrics` dependency chart installation.
  kubeStateMetricsEnabled: false
  # Enable the new `kubernetes_state_core` check.
  kubeStateMetricsCore:
    enabled: true
# Add a toleration so that the agent can be scheduled on the control plane nodes.
agents:
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
[7]: /es/containers/kubernetes/apm/?tab=tcp
[8]: /es/tracing/guide/setting_up_apm_with_kubernetes_service
[9]: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
[10]: https://cloud.google.com/kubernetes-engine/docs/how-to/autopilot-spot-pods
[11]: https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-compute-classes
[12]: https://cloud.google.com/kubernetes-engine/docs/how-to/disable-kubelet-readonly-port
[13]: https://learn.microsoft.com/en-us/azure/aks/certificate-rotation#kubelet-serving-certificate-rotation