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
  text: Solucionar problemas del Agent
title: Problemas de los contenedores de Windows
---

En esta página se describen los problemas detectados y no resueltos de monitorización de aplicaciones contenerizadas de Windows.

## Problemas frecuentes

La monitorización de aplicaciones contenedorizadas de Windows requiere el Datadog Agent v7.19 o posterior.

Las versiones de sistemas operativos compatibles son:
- Windows Server 2019 (LTSC /1809)
- Windows Server 2019 1909 (hasta el Agent 7.39, ya no es compatible con Microsoft)
- Windows Server 2019 2004 o 20H1 (hasta el Agent 7.39, ya no es compatible con Microsoft)
- Windows Server 2019 20H2 (Agent 7.33 a 7.39, ya no es compatible con Microsoft)
- Windows Server 2022 LTSC (Agent v7.34 o posterior)

El modo de aislamiento Hyper-V no es compatible.

Las métricas de host para disco, E/S y red están deshabilitadas. No son compatibles con Windows Server, por lo que los checks del Agent están deshabilitados de forma predeterminada.

## Problemas con Docker

Los Live Processes no aparecen en los contenedores (excepto el Datadog Agent).

## Problemas con Kubernetes

Los Live Processes no aparecen en los contenedores (excepto el Datadog Agent).

### Clústeres mixtos (Linux + Windows)

El método recomendado para desplegar el Datadog Agent en un clúster mixto es realizar dos instalaciones del Helm chart con diferentes `targetSystem`.

El Datadog Agent utiliza un `nodeSelector` para seleccionar automáticamente nodos Linux o Windows basados en `targetSystem`.

Sin embargo, este no es el caso de las métricas de Kube State (que se instala por defecto), lo que lleva a situaciones en las que las métricas de Kube State no se pueden programar en los nodos de Windows.

Para evitar este problema existen tres posibilidades:

* Usar la función taint en tus nodos Windows. En Windows, el Agent siempre permite el taint `node.kubernetes.io/os=windows:NoSchedule`.
* Definir el selector de nodo Kube State Metrics a través del Helm chart `values.yaml` de Datadog:

   ```
   kube-state-metrics:
     nodeSelector:
       beta.kubernetes.io/os: linux // Kubernetes < 1.14
       kubernetes.io/os: linux // Kubernetes >= 1.14
   ```

* Desplegar Kube State Metrics por tu cuenta de forma independiente estableciendo `datadog.kubeStateMetricsEnabled` como `false`.

**Nota**: Cuando se utilizan dos instalaciones de Datadog (una con `targetSystem: linux`, otra con `targetSystem: windows`), es necesario verificar que la segunda tiene `datadog.kubeStateMetricsEnabled` definido como `false` para evitar que se desplieguen dos instancias de Kube State Metrics.

Algunas métricas no están disponibles para los despliegues de Windows. Consulta [métricas disponibles](#limited-metrics-for-windows-deployments).

#### Clústeres mixtos con el Datadog Cluster Agent

Con Cluster Agent v1.18 y posteriores, el Datadog Cluster Agent admite una configuración con clústeres mixtos.

Para configurar la comunicación entre los Agents desplegados en nodos Windows y el Cluster Agent, utiliza el siguiente archivo `values.yaml`.

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

#### Opciones de configuración limitadas para las implementaciones de Windows

Algunas opciones de configuración no están disponibles en Windows. A continuación se muestra una lista de opciones **no compatibles**:

| Parámetro                      | Motivo |
| --- | ----------- |
| `datadog.dogstatsd.useHostPID` |  El PID del host no es compatible con los contenedores de Windows |
| `datadog.dogstatsd.useSocketVolume` | Los sockets del Unix no son compatibles con Windows |
| `datadog.dogstatsd.socketPath` |  Los sockets del Unix no son compatibles con Windows |
| `datadog.processAgent.processCollection` |  No es posible acceder a los procesos del host/otros contenedores |
| `datadog.systemProbe.seccomp` | System probe no está disponible para Windows |
| `datadog.systemProbe.seccompRoot` | System probe no está disponible para Windows |
| `datadog.systemProbe.debugPort` | System probe no está disponible para Windows |
| `datadog.systemProbe.enableConntrack` | System probe no está disponible para Windows |
| `datadog.systemProbe.bpfDebug` |  System probe no está disponible para Windows |
| `datadog.systemProbe.apparmor` |  System probe no está disponible para Windows |
| `agents.useHostNetwork` | La red del host no es compatible con los contenedores de Windows |

### HostPort para el APM o DogStatsD

`HostPort` es compatible parcialmente con Kubernetes, dependiendo de la versión del sistema operativo subyacente y del plugin CNI.
Los requisitos para que funcione `HostPort` son los siguientes:

* Se requiere la versión de Windows Server 1909 o posterior
* El plugin CNI debe ser compatible con la función `portMappings`

Actualmente, al menos dos plugins CNI admiten esta función:

* Plugin oficial `win-bridge` (versión 0.8.6 y posteriores), utilizado por GKE
* Plugin CNI de Azure, utilizado por AKS

Si tu configuración no cumple estos requisitos, APM y DogStatsD solo funcionarán cuando esté configurada la red pod-to-pod entre el Tracer y el Agent.

### Check de Kubelet

Según la versión de Kubernetes, es posible que algunas métricas de Kubelet no estén disponibles (o que el check de Kubelet agote el tiempo de espera).
Para una experiencia óptima, utiliza cualquiera de las siguientes opciones con el Datadog Agent v7.19.2+:

* Kubelet v1.16.13+ (v1.16.11+ en GKE)
* Kubelet v1.17.9+ (v1.17.6+ en GKE)
* Kubelet v1.18.6+
* Kubelet v1.19+

### Métricas limitadas para despliegues de Windows 

Las siguientes métricas de `kubernetes.*` están disponibles para los contenedores de Windows:

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