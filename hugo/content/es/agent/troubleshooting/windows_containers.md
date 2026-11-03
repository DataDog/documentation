---
further_reading:
- link: /agent/docker/?tab=windows
  tag: Documentación
  text: Docker Agent
- link: /agent/kubernetes/
  tag: Documentación
  text: Kubernetes Agent
- link: /agent/troubleshooting/
  tag: Documentación
  text: Agent Troubleshooting
title: Problemas de Containers de Windows
---
Esta página describe los problemas conocidos y abiertos para la supervisión de aplicaciones de Windows en contenedores.

## Problemas comunes {#common-issues}

Containerized Windows Applications Monitoring requires Datadog Agent 7.19+.

Las versiones de SO compatibles son:
- Windows Server 2019 (LTSC / 1809)
- Windows Server 2019 1909 (hasta el Agent 7.39, ya no es compatible con Microsoft)
- Windows Server 2019 2004 o 20H1 (hasta el Agent 7.39, ya no es compatible con Microsoft)
- Windows Server 2019 20H2 (Agent 7.33 a 7.39, ya no es compatible con Microsoft)
- Windows Server 2022 LTSC (Agent >=7.34)

El modo de aislamiento de Hyper-V no es compatible.

Las métricas del servidor para disco, E/S y red están deshabilitadas. No son compatibles con Windows Server, por lo que las Agent Checks están deshabilitadas de forma predeterminada.

## Problemas de Docker {#docker-issues}

Live processes do not appear in containers (except for the Datadog Agent).

## Problemas de Kubernetes {#kubernetes-issues}

Live processes do not appear in containers (except for the Datadog Agent).

### Clústeres mixtos (Linux + Windows) {#mixed-clusters-linux-windows}

La forma recomendada de implementar el Datadog Agent en un clúster mixto es realizar dos instalaciones del chart de Helm con diferentes `targetSystem`. 

El Datadog Agent utiliza un `nodeSelector` para seleccionar automáticamente nodos Linux o Windows según `targetSystem`.

Sin embargo, este no es el caso de Kube State Metrics (que se instala de forma predeterminada), lo que genera situaciones en las que Kube State Metrics no se puede programar en nodos Windows.

Hay tres opciones disponibles para evitar este problema:

* Aplique un taint a sus nodos Windows. En Windows, el Agent siempre permite el `node.kubernetes.io/os=windows:NoSchedule` taint.
* Configure el selector de nodos de Kube State Metrics a través del `values.yaml` del chart de Helm de Datadog:

   ```
   kube-state-metrics:
     nodeSelector:
       beta.kubernetes.io/os: linux // Kubernetes < 1.14
       kubernetes.io/os: linux // Kubernetes >= 1.14
   ```

* Implemente Kube State Metrics usted mismo por separado configurando `datadog.kubeStateMetricsEnabled` en `false`.

**Nota**: Al utilizar dos instalaciones de Datadog (una con `targetSystem: linux`, otra con `targetSystem: windows`), asegúrese de que la segunda tenga `datadog.kubeStateMetricsEnabled` configurado en `false` para evitar implementar dos instancias de Kube State Metrics.

Algunas métricas no están disponibles para implementaciones en Windows. Consulte las [métricas disponibles](#limited-metrics-for-windows-deployments).

#### Clústeres mixtos con el Datadog Cluster Agent {#mixed-clusters-with-the-datadog-cluster-agent}

Con el Cluster Agent v1.18+, el Datadog Cluster Agent admite una configuración con clústeres mixtos.

Utilice el siguiente archivo `values.yaml` para configurar la comunicación entre los Agent desplegados en nodos de Windows y el Cluster Agent.

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<EXISTING_DCA_SERVICE_NAME>" # from the first Datadog Helm chart
  tokenSecretName: "<EXISTING_DCA_SECRET_NAME>" # from the first Datadog Helm chart

# Disable datadogMetrics deployment since it should have been already deployed with the first chart.
datadog-crds:
  crds:
    datadogMetrics: false
# Disable kube-state-metrics deployment
datadog:
  kubeStateMetricsEnabled: false
```

#### Opciones de configuración limitadas para implementaciones en Windows {#limited-configuration-options-for-windows-deployments}

<div class="alert alert-info">Implementar el Agent en nodos de Windows con el <code>DatadogAgent</code> recurso por sí solo no es compatible.</div>

A partir de Datadog Operator v1.30.0, el soporte para nodos Windows está disponible para clústeres de nodos mixtos (Windows y Linux). Para usarlo, agregue un [DatadogAgentProfile](/containers/datadog_operator/datadog_agent_profiles) dirigido a Windows junto con su recurso `DatadogAgent`. Si no está utilizando un `DatadogAgentProfile`, utilice el [chart de Helm](/containers/kubernetes/installation/?tab=helm) para implementar el Agent en nodos de Windows.

Algunas opciones de configuración no están disponibles en Windows. La siguiente es una lista de opciones **no compatibles**:

| Parámetro                      | Motivo |
| --- | ----------- |
| `datadog.dogstatsd.useHostPID` |  El PID del host no es compatible con los contenedores de Windows |
| `datadog.dogstatsd.useSocketVolume` | Los sockets Unix no son compatibles con Windows |
| `datadog.dogstatsd.socketPath` |  Los sockets Unix no son compatibles con Windows |
| `datadog.processAgent.processCollection` |  No se puede acceder a los procesos del host/otros contenedores |
| `datadog.systemProbe.seccomp` | La sonda del sistema no está disponible para Windows |
| `datadog.systemProbe.seccompRoot` | La sonda del sistema no está disponible para Windows |
| `datadog.systemProbe.debugPort` | La sonda del sistema no está disponible para Windows |
| `datadog.systemProbe.enableConntrack` | La sonda del sistema no está disponible para Windows |
| `datadog.systemProbe.bpfDebug` |  La sonda del sistema no está disponible para Windows |
| `datadog.systemProbe.apparmor` |  La sonda del sistema no está disponible para Windows |
| `agents.useHostNetwork` | Host network not supported by Windows Containers |

### HostPort para APM o DogStatsD {#hostport-for-apm-or-dogstatsd}

`HostPort` es parcialmente compatible con Kubernetes, dependiendo de la versión del sistema operativo subyacente y del complemento CNI.
Los requisitos para que `HostPort` funcione son los siguientes:

* La versión de Windows Server debe ser >= 1909
* El complemento CNI debe admitir la capacidad `portMappings`

Actualmente, al menos dos complementos de CNI admiten esta capacidad:

* Complemento `win-bridge` oficial (versión >= 0.8.6) - utilizado por GKE
* Complemento de Azure CNI - utilizado por AKS

Si su configuración no cumple con estos requisitos, APM y DogStatsD solo funcionarán cuando la red pod-to-pod esté configurada entre el Tracer y el Agent.

### Kubelet check {#kubelet-check}

Depending on your Kubernetes version, some Kubelet metrics might not be available (or that the Kubelet check times out).
Para una experiencia óptima, utilice cualquiera de los siguientes con Datadog Agent v7.19.2+:

* Kubelet v1.16.13+ (v1.16.11+ en GKE)
* Kubelet v1.17.9+ (v1.17.6+ en GKE)
* Kubelet v1.18.6+
* Kubelet v1.19+

### Métricas limitadas para implementaciones de Windows {#limited-metrics-for-windows-deployments}

The following `kubernetes.*` metrics are available for Windows Containers:

* `kubernetes.cpu.usage.total`
* `kubernetes.containers.restarts`
* `kubernetes.containers.running`
* `kubernetes.cpu.capacity`
* `kubernetes.ephemeral_storage.usage`
* `kubernetes.kubelet.container.log_filesystem.used_bytes`
* `kubernetes.kubelet.network_plugin.latency.count`
* `kubernetes.kubelet.network_plugin.latency.quantile`
* `kubernetes.kubelet.network_plugin.latency.sum`
* `kubernetes.kubelet.runtime.errors`
* `kubernetes.kubelet.runtime.operations`
* `kubernetes.memory.capacity`
* `kubernetes.pods.running`
* `kubernetes.rest.client.latency.count`
* `kubernetes.rest.client.latency.sum`
* `kubernetes.rest.client.requests`
* `kubernetes.network.tx_bytes`
* `kubernetes.network.rx_bytes`
* `kubernetes.cpu.usage.total`
* `kubernetes.memory.working_set`
* `kubernetes.filesystem.usage`
* `kubernetes.filesystem.usage_pct`