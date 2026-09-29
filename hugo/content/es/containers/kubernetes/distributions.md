---
aliases:
- /es/agent/kubernetes/distributions
description: Instrucciones de instalación y configuración específicas de la plataforma
  para Datadog Agent en varias distribuciones de Kubernetes
further_reading:
- link: agent/kubernetes/log
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /agent/kubernetes/apm
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /agent/kubernetes/prometheus
  tag: Documentación
  text: Recopile sus métricas de Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentación
  text: Recopile automáticamente las métricas y los registros de sus aplicaciones
- link: /agent/guide/autodiscovery-management
  tag: Documentación
  text: Limitar la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
- link: https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/
  tag: Blog
  text: Monitor Tanzu Kubernetes Grid en vSphere
title: Distribuciones de Kubernetes
---
## Descripción general {#overview}

Esta sección tiene como objetivo documentar los detalles y proporcionar una buena configuración base para todas las distribuciones principales de Kubernetes.
Estas configuraciones pueden personalizarse posteriormente para añadir cualquier función de Datadog.

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine para Kubernetes (OKE)](#OKE)
* [vSphere Kubernetes Service (VKS)](#VKS)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

No se requiere ninguna configuración específica.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En un clúster de EKS, puede instalar el Operador de Datadog usando [Helm][1] o como un [complemento de EKS][2].

La configuración a continuación está diseñada para funcionar con cualquiera de las dos configuraciones (Helm o complemento de EKS) cuando Datadog Agent está instalado en el mismo espacio de nombres que el Datadog Operator.

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

### Controlador de admisión {#admission-controller}
La función opcional [Controlador de admisión][1] requiere una configuración específica para evitar un error al reconciliar el webhook.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Recurso de Kubernetes DatadogAgent:

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

Reemplace `<DATADOG_SITE>` con su [sitio de Datadog][1]. Su sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el SITIO correcto para su cuenta esté seleccionado a la derecha de esta página).

[1]: /es/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

Personalizado `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

providers:
  aks:
    enabled: true
```

La opción `providers.aks.enabled` establece la variable de entorno `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"` necesaria para usted.

{{% /tab %}}
{{< /tabs >}}

### Rotación de certificados de servicio de Kubelet {#kubelet-serving-certificate-rotation}
Si su clúster **no** tiene habilitada la [rotación de certificados de servicio de Kubelet][13], debe proporcionar una configuración adicional para permitir que Datadog Agent se conecte al Kubelet. La rotación de certificados de servicio de Kubelet está habilitada en clústeres de Kubernetes 1.27 y superiores en grupos de nodos actualizados después de julio de 2025.

Sus nodos tienen esta función habilitada si tienen la etiqueta `kubernetes.azure.com/kubelet-serving-ca=cluster`. Verifique si todos sus nodos tienen esta etiqueta ejecutando:

```shell
kubectl get nodes -L kubernetes.azure.com/kubelet-serving-ca
```

Asegúrese de que todos sus nodos muestren `cluster`.

#### Sin rotación de certificados de servicio de Kubelet {#without-kubelet-serving-certificate-rotation}

Si la rotación de certificados de servicio de Kubelet no está habilitada, proporcione la siguiente configuración adicional de Kubelet:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Recurso de Kubernetes DatadogAgent:

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

Personalizado `datadog-values.yaml`:

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

En estas versiones de nodo de AKS, el certificado Kubelet de AKS requiere cambiar el servidor de Kubelet a `spec.nodeName` y la ubicación `hostCAPath` del certificado, como se observa en los fragmentos anteriores. Esto habilita la verificación TLS. Sin estos cambios, el Agent no puede conectarse al Kubelet.

<div class="alert alert-info">Una vez que la rotación del certificado de servicio de Kubelet esté habilitada en su clúster, elimine esta configuración.</div>

Cuando actualiza su clúster de AKS, es posible que vea la función de rotación del certificado de servicio de Kubelet habilitada automáticamente para usted, lo que puede afectar negativamente a su Datadog Agent si está utilizando la configuración especial anterior para hacer referencia al certificado `/etc/kubernetes/certs/kubeletserver.crt`. Cuando la rotación del certificado de servicio de Kubelet está habilitada, este certificado se elimina, lo que provoca:

- En el Datadog Operator: El contenedor del Agent se apaga en `Error`, ya que no puede conectarse al Kubelet, y registra `Error while getting hostname, exiting: unable to reliably determine the host name`
- En Helm: El pod del Agent no puede iniciarse con el evento de advertencia `MountVolume.SetUp failed for volume "kubelet-ca" : hostPath type check failed: /etc/kubernetes/certs/kubeletserver.crt is not a file`

En estos casos, elimine las configuraciones adicionales de Kubelet.

Como alternativa, también puede [conectarse al Kubelet sin verificación TLS](#without-tls-verification).

### Sin verificación TLS {#without-tls-verification}

En algunos clústeres, la resolución de DNS para `spec.nodeName` dentro de los Pods no funciona en AKS. Esto afecta a:
 - Nodos de Windows
 - Nodos de Linux, cuando el clúster está configurado en una red virtual que utiliza DNS personalizado

En este caso, utilice la configuración de AKS proporcionada a continuación para establecer `tlsVerify: false` y elimine cualquier configuración para la ruta del servidor de Kubelet (que tiene como valor predeterminado `status.hostIP`). **No establezca la ruta del servidor de Kubelet y `tlsVerify: false` en la misma configuración**.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Recurso de Kubernetes DatadogAgent:

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

Personalizado `datadog-values.yaml`:

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

GKE se puede configurar en dos modos de operación diferentes:

- **Estándar**: Usted administra la infraestructura subyacente del clúster, lo que le brinda flexibilidad para configurar los nodos.
- **Autopilot**: GKE aprovisiona y administra la infraestructura subyacente del clúster, incluidos los nodos y los grupos de nodos, lo que le brinda un clúster optimizado con una experiencia sin intervención.

Dependiendo del modo de operación de su clúster, el Datadog Agent debe configurarse de manera diferente.

### Estándar {#standard}

En el Agent 7.26 y versiones posteriores, GKE no requiere configuración adicional, ya sea que ejecute `Docker` o `containerd`. La única excepción es Container-Optimized OS (COS) con el gráfico de Helm. El Datadog Operator detecta GKE COS automáticamente.

{{< tabs >}}
{{% tab "Helm" %}}

Personalizado `datadog-values.yaml`:

```yaml
providers:
  gke:
    cos: true
```

{{% /tab %}}
{{< /tabs >}}

### Autopilot {#autopilot}

GKE Autopilot requiere cierta configuración, que se muestra a continuación.

Datadog recomienda que especifique los límites de recursos para el contenedor del Agent. Autopilot establece un límite predeterminado relativamente bajo (50m de CPU, 100Mi de memoria) que puede hacer que el contenedor del Agent sufra un OOMKill rápidamente, dependiendo de su entorno. Si corresponde, especifique también los límites de recursos para los contenedores Agent de trazas, Agent de procesos y System-Probe. Además, es posible que desee crear una clase de prioridad para el Agent a fin de garantizar que esté programado.

A partir del Agent `7.65.0+` y la versión `3.113.0+` del gráfico de Helm, Datadog recomienda usar `datadog.kubelet.useApiServer` para que el Agente consulte la lista de pods desde el servidor de API. Evite usar el [puerto kubelet de solo lectura obsoleto][12].


{{< tabs >}}
{{% tab "Helm" %}}

Personalizado `datadog-values.yaml`:

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

{{% tab "Datadog Operator" %}}

A partir de Datadog Operator `1.27.0+`, habilite el modo Autopilot con la anotación `experimental.agent.datadoghq.com/autopilot`. El Datadog Operator configura el Agent para GKE Autopilot, incluida la detección de pods del servidor de API y la WorkloadAllowlist requerida.

Personalizado `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    experimental.agent.datadoghq.com/autopilot: "true"
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    # The site of the Datadog intake to send Agent data to (example: `us3.datadoghq.com`)
    # Default value is `datadoghq.com' (the US1 site)
    # Documentation: https://docs.datadoghq.com/getting_started/site/
    site: <DATADOG_SITE>
  override:
    nodeAgent:
      containers:
        agent:
          resources:
            requests:
              cpu: 200m
              memory: 256Mi
        trace-agent:
          resources:
            requests:
              cpu: 100m
              memory: 200Mi
        process-agent:
          resources:
            requests:
              cpu: 100m
              memory: 200Mi
        system-probe:
          resources:
            requests:
              cpu: 100m
              memory: 400Mi
```

{{% /tab %}}
{{< /tabs >}}

### Pods Spot y clases de cómputo {#spot-pods-and-compute-classes}

El uso de [pods Spot][10] en clústeres de GKE Autopilot introduce [taints][9] en los nodos GKE Spot correspondientes. Al usar pods Spot, se requiere una configuración adicional para proporcionar al DaemonSet del Agent una tolerancia coincidente.

{{< tabs >}}
{{% tab "Helm" %}}

```yaml
agents:
  #(...)
  # agents.tolerations -- Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/gke-spot
    operator: Equal
    value: "true"
```
{{% /tab %}}

{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      tolerations:
      - effect: NoSchedule
        key: cloud.google.com/gke-spot
        operator: Equal
        value: "true"
```
{{% /tab %}}
{{< /tabs >}}

De manera similar, al usar [GKE Autopilot Compute classes][11] para ejecutar cargas de trabajo que tienen requisitos de hardware específicos, tome nota de los [taints][9] que GKE Autopilot está aplicando a estos nodos específicos y agregue las tolerancias correspondientes al DaemonSet del Agent. Puede hacer coincidir las tolerancias en sus pods correspondientes. Por ejemplo, para la clase de cómputo `Scale-Out` use una tolerancia como:

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

{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      tolerations:
      - effect: NoSchedule
        key: cloud.google.com/compute-class
        operator: Equal
        value: Scale-Out
```
{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift viene con seguridad reforzada de forma predeterminada con SELinux y SecurityContextConstraints (SCC). Como resultado, requiere algunas configuraciones específicas:
- Acceso SCC elevado para el Agent de nodo y el Agent de clúster
- Es posible que los certificados de la API de Kubelet no siempre estén firmados por la CA del clúster
- Se requieren tolerancias para programar el Agent de nodo en nodos `master` y `infra`
- El nombre del clúster debe establecerse, ya que no se puede recuperar automáticamente del proveedor de la nube
- *(Opcional)* Establezca `hostNetwork: true` en el Node Agent para permitir que el Agent realice solicitudes a los servicios de metadatos del proveedor de la nube (IMDS)

Esta configuración principal es compatible con OpenShift 3.11 y OpenShift 4, pero funciona mejor con OpenShift 4.

Además, la recopilación de registros y APM también tienen requisitos ligeramente diferentes.

El uso de Unix Domain Socket (UDS) para APM y DogStatsD puede funcionar en OpenShift. Sin embargo, Datadog no recomienda esto, ya que requiere permisos privilegiados adicionales y acceso SCC a **tanto** su pod de Datadog Agent como su pod de aplicación. Sin estos, su pod de aplicación puede fallar al implementarse. Datadog recomienda deshabilitar la opción UDS para evitar esto, permitiendo que el Controlador de admisión inyecte la [configuración TCP/IP][7] o la [configuración de servicio][8] adecuada para la conectividad APM.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Al usar el Datadog Operator en OpenShift, Datadog recomienda que utilice el Administrador del ciclo de vida del operador para implementar el Datadog Operator desde OperatorHub en la consola web de su clúster de OpenShift. Consulte los [pasos de instalación del operador][1]. La configuración a continuación funciona con esa configuración, la cual crea el [acceso a SCC basado en ClusterRole y ClusterRoleBinding][2] para la ServiceAccount `datadog-agent-scc` especificada. Esta configuración `DatadogAgent` debe implementarse en el mismo espacio de nombres que el Datadog Operator.

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

**Nota**: La anulación `nodeAgent.securityContext.seLinuxOptions` es necesaria para la recopilación de registros al implementar con el Operador. Si la recopilación de registros no está habilitada, puede omitir esta anulación.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md
[2]: https://docs.openshift.com/container-platform/4.10/authentication/managing-security-context-constraints.html#role-based-access-to-ssc_configuring-internal-oauth
{{% /tab %}}
{{% tab "Helm" %}}

La configuración a continuación crea SCC personalizados para las cuentas de servicio del Agent y del Agent de Clúster.

Personalizado `datadog-values.yaml`:

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

Las instalaciones de Rancher son similares a las instalaciones de Kubernetes estándar, y solo requieren una configuración menor:
- Se requieren tolerancias para programar el Node Agent en los nodos `controlplane` y `etcd`.
- El nombre del clúster debe configurarse, ya que no se puede recuperar automáticamente del proveedor de la nube.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Recurso de Kubernetes DatadogAgent:

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
        name: registry.datadoghq.com/cluster-agent:latest
    nodeAgent:
      image:
        name: registry.datadoghq.com/agent:latest
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

Personalizado `datadog-values.yaml`:

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

No se requiere ninguna configuración específica.

## vSphere Kubernetes Service (VKS) {#VKS}

VKS requiere que el espacio de nombres donde se implementa Datadog Agent utilice el Estándar de Seguridad de Pods privilegiado. Antes de implementar Datadog Agent, reemplace `<namespace>` con el espacio de nombres donde implementa `datadog-agent` y ejecute:

```shell
kubectl label --overwrite ns <namespace> \
  pod-security.kubernetes.io/enforce=privileged
```

Utilice la siguiente configuración para habilitar la recopilación de eventos de Kubernetes y kube-state-metrics core, deshabilitar la verificación TLS de Kubelet para certificados autofirmados y agregar una tolerancia para que el Agent pueda programarse en los nodos del plano de control.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Recurso de Kubernetes DatadogAgent:

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

Personalizado `datadog-values.yaml`:

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

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG requiere algunos cambios de configuración menores, que se muestran a continuación. Por ejemplo, es necesario establecer una tolerancia para que el controlador programe el Node Agent en los nodos `master`.


{{< tabs >}}
{{% tab "Datadog Operator" %}}

Recurso de Kubernetes DatadogAgent:

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

Personalizado `datadog-values.yaml`:

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