---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/kubectl-plugin.md
title: Plugin du Datadog Operator pour kubectl
---
Le Datadog Operator dispose d'un plugin `kubectl`, qui fournit un ensemble d'utilitaires d'assistance offrant une visibilité sur certains composants internes.

## Installer le plugin

Exécutez :
```shell
kubectl krew install datadog
```

Cette méthode utilise le [gestionnaire de plugins Krew](https://krew.sigs.k8s.io/).

```console
$ kubectl krew install datadog
Installing plugin: datadog
Installed plugin: datadog
\
 | Use this plugin:
 |  kubectl datadog
 | Documentation:
 |  https://github.com/DataDog/datadog-operator
/
```

## Commandes disponibles

```console
$ kubectl datadog --help
Usage:
  datadog [command]

Available Commands:
  agent
  clusteragent
  flare        Collect a Datadog's Operator flare and send it to Datadog
  get          Get DatadogAgent deployment(s)
  help         Help about any command
  validate

```

### Sous-commandes de l'Agent

```console
$ kubectl datadog agent --help
Usage:
  datadog agent [command]

Available Commands:
  check       Find check errors
  find        Find datadog agent pod monitoring a given pod
  upgrade     Upgrade the Datadog Agent version

```

### Sous-commandes de l'Agent de cluster

```console
$ kubectl datadog clusteragent --help
Usage:
  datadog clusteragent [command]

Available Commands:
  leader      Get Datadog Cluster Agent leader
  upgrade     Upgrade the Datadog Cluster Agent version
```

### Sous-commandes de validation

```console
$ kubectl datadog validate ad --help
Usage:
  datadog validate ad [command]

Available Commands:
  pod         Validate the autodiscovery annotations for a pod
  service     Validate the autodiscovery annotations for a service
```