---
further_reading:
- link: /agent/docker/?tab=windows
  tag: Documentation
  text: Agent Docker
- link: /agent/kubernetes/
  tag: Documentation
  text: Agent Kubernetes
- link: /agent/troubleshooting/
  tag: Dépannage de l'Agent
  text: Dépannage de l'Agent
title: Problèmes avec les conteneurs Windows
---

Cette page décrit les problèmes connus et non résolus pouvant affecter la surveillance d'applications Windows conteneurisées.

## Problèmes courants

La surveillance d'applications Windows conteneurisées nécessite l'Agent Datadog 7.19+.

Voici la liste des versions des systèmes d'exploitation prises en charge :
- Windows Server 2019 (LTSC/1809)
- Windows Server 2019 1909 (jusqu'à la version 7.39 de l'Agent ; les dernières versions ne sont plus prises en charge par Microsoft)
- Windows Server 2019 2004 ou 20H1 (jusqu'à la version 7.39 de l'Agent ; les dernières versions ne sont plus prises en charge par Microsoft)
- Windows Server 2019 20H2 (de la version 7.33 à 7.39 de l'Agent ; les dernières versions ne sont plus prises en charge par Microsoft)
- Windows Server 2022 LTSC (Agent 7.34+)

Le mode d'isolation Hyper-V n'est pas pris en charge.

Les métriques de host relatives au disque, aux E/S et au réseau sont désactivées. Elles ne sont pas prises en charge par Windows Server, et les checks de l'Agent sont désactivés par défaut.

## Problèmes avec Docker

Les live processes ne s'affichent pas dans les conteneurs (sauf pour l'Agent Datadog).

## Problèmes avec Kubernetes

Les live processes ne s'affichent pas dans les conteneurs (sauf pour l'Agent Datadog).

### Clusters mixte (Linux + Windows)

Pour déployer l'Agent Datadog sur un cluster mixte, il est conseillé d'effectuer deux installations du chart Helm avec des `targetSystem` différents.

L'Agent Datadog utilise un `nodeSelector` pour sélectionner automatiquement les nœuds Linux ou Windows en fonction du `targetSystem`.

Ce n'est toutefois pas le cas pour Kube State Metrics (qui est installé par défaut), ce qui peut empêcher la planification de Kube State Metrics sur les nœuds Windows.

Trois solutions sont possibles pour éviter ce problème :

* Utilisez la fonctionnalité taint sur vos nœuds Windows. Sous Windows, l'Agent autorise toujours le taint `node.kubernetes.io/os=windows:NoSchedule`.
* Définissez le sélecteur de nœud Kube State Metrics via le chart Helm Datadog `values.yaml` :

```
kube-state-metrics:
  nodeSelector:
    beta.kubernetes.io/os: linux // Kubernetes < 1.14
    kubernetes.io/os: linux // Kubernetes >= 1.14
```

* Déployez Kube State Metrics vous-même séparément en définissant `datadog.kubeStateMetricsEnabled` sur `false`.

**Remarque** : lorsque vous utilisez deux installations de Datadog (une avec `targetSystem: linux` et une autre avec `targetSystem: windows`), assurez-vous que le paramètre `datadog.kubeStateMetricsEnabled` est défini sur `false` pour la deuxième installation afin d'empêcher le déploiement de deux instances de Kube State Metrics.

#### Clusters mixtes avec l'Agent de cluster Datadog

Depuis la version 1.18 de l'Agent de cluster, les configurations reposant sur des clusters mixtes sont prises en charge.

Utilisez le fichier `values.yaml` suivant pour configurer les communications entre les Agents déployés sur les nœuds Windows et l'Agent de cluster.

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<NOM_SERVICE_EXISTANT_AGENT_CLUSTER_DATADOG>" # provenant du premier chart Helm Datadog
  tokenSecretName: "<NOM_SECRET_EXISTANT_AGENT_CLUSTER_DATADOG>" # provenant du premier chart Helm Datadog

# Désactiver le déploiement de datadogMetrics, car il est déjà réalisé par le premier chart
datadog-crds:
  crds:
    datadogMetrics: false
# Désactiver le déploiement de kube-state-metrics 
datadog:
  kubeStateMetricsEnabled: false
```

#### Options de configuration limitées pour les déploiements Windows

La liste suivante répertorie les options de configuration qui ne sont **pas** disponibles sous Windows :

| Paramètre                      | Raison |
| --- | ----------- |
| `datadog.dogstatsd.useHostPID` |  PID de host incompatible avec les conteneurs Windows |
| `datadog.dogstatsd.useSocketVolume` | Sockets Unix incompatibles avec Windows |
| `datadog.dogstatsd.socketPath` |  Sockets Unix incompatibles avec Windows |
| `datadog.processAgent.processCollection` |  Impossible d'accéder aux processus des hosts et des autres conteneurs |
| `datadog.systemProbe.seccomp` | System probe indisponible sous Windows |
| `datadog.systemProbe.seccompRoot` | System probe indisponible sous Windows |
| `datadog.systemProbe.debugPort` | System probe indisponible sous Windows |
| `datadog.systemProbe.enableConntrack` | System probe indisponible sous Windows |
| `datadog.systemProbe.bpfDebug` |  System probe indisponible sous Windows |
| `datadog.systemProbe.apparmor` |  System probe indisponible sous Windows |
| `agents.useHostNetwork` | Réseau host incompatible avec les conteneurs Windows |

### HostPort pour l'APM ou DogStatsD

`HostPort` est partiellement pris en charge sur Kubernetes, en fonction de la version du système d'exploitation sous-jacent et du plug-in CNI.
Pour que `HostPort` fonctionne, les exigences suivantes doivent être satisfaites :

* La version de Windows Server doit être >= 1909
* Le plug-in CNI doit prendre en charge la fonctionnalité `portMappings`

Actuellement, au moins deux plug-ins CNI prennent en charge cette fonctionnalité :

* Plug-in `win-bridge` officiel (version >= 0.8.6) - Utilisé par GKE
* Plug-in CNI Azure - Utilisé par AKS

Si votre configuration ne répond pas à ces exigences, l'APM et DogStatsD fonctionneront uniquement lorsqu'une mise en réseau pod à pod est configurée entre le traceur et l'Agent.

### Check Kubelet

Selon votre version de Kubernetes, il est possible que certaines métriques Kubelet ne soient pas disponibles (ou que le délai d'attente du check Kubelet expire).
Pour une expérience optimale, utilisez l'une des versions suivantes :

* Kubelet >= 1.16.13 (1.16.11 sous GKE)
* Kubelet >= 1.17.9 (1.17.6 sous GKE)
* Kubelet >= 1.18.6
* Kubelet >= 1.19

Avec l'Agent version >= 7.19.2

Notez que toutes les métriques `kubernetes.*` ne sont pas disponibles sous Windows. Les métriques disponibles sont énumérées ci-dessous :

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