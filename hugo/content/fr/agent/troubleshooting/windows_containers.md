---
further_reading:
- link: /agent/docker/?tab=windows
  tag: Documentation
  text: Agent Docker
- link: /agent/kubernetes/
  tag: Documentation
  text: Agent Kubernetes
- link: /agent/troubleshooting/
  tag: Documentation
  text: Dépannage de l'Agent
title: Problèmes avec les conteneurs Windows
---
Cette page décrit les problèmes connus et non résolus pouvant affecter la surveillance d'applications Windows conteneurisées.

## Problèmes courants {#common-issues}

La surveillance d'applications Windows conteneurisées nécessite Datadog Agent 7.19+.

Voici la liste des versions des systèmes d'exploitation prises en charge :
- Windows Server 2019 (LTSC / 1809)
- Windows Server 2019 1909 (jusqu'à l'Agent 7.39, n'est plus pris en charge par Microsoft)
- Windows Server 2019 2004 ou 20H1 (jusqu'à l'Agent 7.39, n'est plus pris en charge par Microsoft)
- Windows Server 2019 20H2 (Agent 7.33 à 7.39, n'est plus pris en charge par Microsoft)
- Windows Server 2022 LTSC (Agent >=7.34)

Le mode d'isolation Hyper-V n'est pas pris en charge.

Les métriques de host pour le disque, les E/S et le réseau sont désactivées. Elles ne sont pas prises en charge par Windows Server, par conséquent les checks de l'Agent sont désactivés par défaut.

## Problèmes liés à Docker {#docker-issues}

Les live processes ne s'affichent pas dans les conteneurs (à l'exception du Datadog Agent).

## Problèmes liés à Kubernetes {#kubernetes-issues}

Les live processes ne s'affichent pas dans les conteneurs (à l'exception du Datadog Agent).

### Clusters mixtes (Linux + Windows) {#mixed-clusters-linux-windows}

La méthode recommandée pour déployer le Datadog Agent sur un cluster mixte consiste à effectuer deux installations du chart Helm avec des `targetSystem` différents. 

Le Datadog Agent utilise un `nodeSelector` pour sélectionner automatiquement les nœuds Linux ou Windows en fonction des `targetSystem`.

Cependant, ce n'est pas le cas pour Kube State Metrics (qui est installé par défaut), ce qui conduit à des situations où Kube State Metrics ne peut pas être planifié sur des nœuds Windows.

Trois solutions sont possibles pour éviter ce problème :

* Appliquez une taint à vos nœuds Windows. Sur Windows, l'Agent autorise toujours la taint `node.kubernetes.io/os=windows:NoSchedule`.
* Définissez le sélecteur de nœud Kube State Metrics via le chart Helm Datadog `values.yaml` :

   ```
   kube-state-metrics:
     nodeSelector:
       beta.kubernetes.io/os: linux // Kubernetes < 1.14
       kubernetes.io/os: linux // Kubernetes >= 1.14
   ```

* Déployez vous-même Kube State Metrics séparément en définissant `datadog.kubeStateMetricsEnabled` sur `false`.

**Remarque** : Lorsque vous utilisez deux installations Datadog (l'une avec `targetSystem: linux`, l'autre avec `targetSystem: windows`), assurez-vous que la seconde a `datadog.kubeStateMetricsEnabled` défini sur `false` pour éviter de déployer deux instances de Kube State Metrics.

Certaines métriques ne sont pas disponibles pour les déploiements Windows. Consultez les [métriques disponibles](#limited-metrics-for-windows-deployments).

#### Clusters mixtes avec le Datadog Cluster Agent {#mixed-clusters-with-the-datadog-cluster-agent}

Depuis la version 1.18 de l'Agent de cluster, les configurations reposant sur des clusters mixtes sont prises en charge.

Utilisez le fichier suivant `values.yaml` pour configurer la communication entre les Agents déployés sur des nœuds Windows et le Cluster Agent.

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

#### Options de configuration limitées pour les déploiements Windows {#limited-configuration-options-for-windows-deployments}

<div class="alert alert-info">Déploiement de l'Agent sur des nœuds Windows avec la ressource <code>DatadogAgent</code> seule n'est pas prise en charge.</div>

Depuis Datadog Operator v1.30.0, la prise en charge des nœuds Windows est disponible pour les clusters mixtes (Windows et Linux). Pour l'utiliser, ajoutez un [DatadogAgentProfile](/containers/datadog_operator/datadog_agent_profiles) destiné à Windows à côté de votre ressource `DatadogAgent`. Si vous n'utilisez pas de `DatadogAgentProfile`, utilisez le [Helm chart](/containers/kubernetes/installation/?tab=helm) pour déployer l'Agent sur des nœuds Windows.

Certaines options de configuration ne sont pas disponibles sur Windows. Voici une liste des options **non prises en charge** :

| Paramètre                      | Raison |
| --- | ----------- |
| `datadog.dogstatsd.useHostPID` |  PID de host non pris en charge sur les conteneurs Windows |
| `datadog.dogstatsd.useSocketVolume` | Sockets Unix non pris en charge sur Windows |
| `datadog.dogstatsd.socketPath` |  Sockets Unix non pris en charge sur Windows |
| `datadog.processAgent.processCollection` |  Impossible d'accéder aux processus du host/d'autres conteneurs |
| `datadog.systemProbe.seccomp` | La sonde système n'est pas disponible pour Windows |
| `datadog.systemProbe.seccompRoot` | La sonde système n'est pas disponible pour Windows |
| `datadog.systemProbe.debugPort` | La sonde système n'est pas disponible pour Windows |
| `datadog.systemProbe.enableConntrack` | La sonde système n'est pas disponible pour Windows |
| `datadog.systemProbe.bpfDebug` |  La sonde système n'est pas disponible pour Windows |
| `datadog.systemProbe.apparmor` |  La sonde système n'est pas disponible pour Windows |
| `agents.useHostNetwork` | Réseau de host non pris en charge par les conteneurs Windows |

### HostPort pour APM ou DogStatsD {#hostport-for-apm-or-dogstatsd}

`HostPort` est partiellement pris en charge sur Kubernetes, selon la version de l'OS sous-jacent et le plugin CNI.
Les prérequis pour faire fonctionner `HostPort` sont les suivants :

* La version de Windows Server doit être >= 1909
* Le plugin CNI doit prendre en charge la fonctionnalité `portMappings`

Actuellement, au moins deux plug-ins CNI prennent en charge cette fonctionnalité :

* Plugin officiel `win-bridge` (version >= 0.8.6) - utilisé par GKE
* Azure CNI Plugin - utilisé par AKS

Si votre configuration ne répond pas à ces exigences, APM et DogStatsD fonctionneront uniquement lorsqu'une mise en réseau pod à pod est configurée entre le traceur et l'Agent.

### Check Kubelet {#kubelet-check}

Selon votre version de Kubernetes, certaines métriques Kubelet pourraient ne pas être disponibles (ou le check Kubelet pourrait expirer).
Pour une expérience optimale, veuillez utiliser l'un des éléments suivants avec Datadog Agent v7.19.2+ :

* Kubelet v1.16.13+ (v1.16.11+ sur GKE)
* Kubelet v1.17.9+ (v1.17.6+ sur GKE)
* Kubelet v1.18.6+
* Kubelet v1.19+

### Métriques limitées pour les déploiements Windows {#limited-metrics-for-windows-deployments}

Les métriques `kubernetes.*` suivantes sont disponibles pour les conteneurs Windows :

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