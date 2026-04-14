---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/kubectl-plugin.md
title: Complemento del Datadog Operator para kubectl
---
El Datadog Operator tiene un complemento `kubectl`, que proporciona un conjunto de utilidades de ayuda que dan visibilidad a ciertos componentes internos.

## Instalar el complemento

Ejecuta:
```shell
kubectl krew install datadog
```

Utiliza el [administrador de complementos Krew](https://krew.sigs.k8s.io/).

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

## Comandos disponibles

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

### Subcomandos del Agent

```console
$ kubectl datadog agent --help
Usage:
  datadog agent [command]

Available Commands:
  check       Find check errors
  find        Find datadog agent pod monitoring a given pod
  upgrade     Upgrade the Datadog Agent version

```

### Subcomandos del Cluster Agent

```console
$ kubectl datadog clusteragent --help
Usage:
  datadog clusteragent [command]

Available Commands:
  leader      Get Datadog Cluster Agent leader
  upgrade     Upgrade the Datadog Cluster Agent version
```

### Validar subcomandos

```console
$ kubectl datadog validate ad --help
Usage:
  datadog validate ad [command]

Available Commands:
  pod         Validate the autodiscovery annotations for a pod
  service     Validate the autodiscovery annotations for a service
```