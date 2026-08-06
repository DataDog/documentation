---
aliases:
- /es/containers/datadog_operator/kubectl_plugin
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/kubectl-plugin.md
title: Complemento de Datadog para kubectl
---
Datadog proporciona un complemento `kubectl` con utilidades auxiliares que ofrece visibilidad de los componentes internos. Puedes utilizar el complemento con instalaciones del Operator o con el [Helm chart][1] de Datadog.

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
  autoscaling  Manage autoscaling features
  clusteragent
  completion   Generate the autocompletion script for the specified shell
  flare        Collect a Datadog's Operator flare and send it to Datadog
  get          Get DatadogAgent deployment(s)
  helm2dda     Map Datadog Helm values to DatadogAgent CRD schema
  help         Help about any command
  metrics
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

### Subcomandos de autoescalado (Vista previa técnica)

> **Nota:** Los comandos `autoscaling` forman parte de la función Datadog Cluster Autoscaling, que se encuentra en **vista previa técnica**. Las APIs y los comportamientos pueden cambiar en futuras versiones.

Estos comandos instalan y configuran [Karpenter](https://karpenter.sh/) en un clúster de EKS para que Datadog puedas gestionar el autoescalado del clúster.

#### `autoscaling cluster install`

Instala Karpenter en un clúster de EKS y lo configura para su uso con Datadog Cluster Autoscaling. El comando:

1. Crea los stacks tecnológicos de AWS CloudFormation necesarios.
2. Configura la autenticación de EKS (aws-auth ConfigMap, EKS Pod Identity, o entradas de acceso basadas en API según el clúster).
3. Instala Karpenter a través de Helm desde el registro OCI.
4. Opcionalmente, crea los recursos `EC2NodeClass` y `NodePool` de Karpenter, inferidos de nodos del clúster existentes o grupos de nodos de EKS.

```console
$ kubectl datadog autoscaling cluster install --help
Install autoscaling on an EKS cluster

Usage:
  datadog autoscaling cluster install [flags]

Examples:

  # install autoscaling
  kubectl datadog autoscaling cluster install

Flags:
      --cluster-name string                                   Name of the EKS cluster
      --create-karpenter-resources CreateKarpenterResources   Which Karpenter resources to create: none, ec2nodeclass, all (default: all) (default all)
      --debug                                                 Enable debug logs
      --inference-method InferenceMethod                      Method to infer EC2NodeClass and NodePool properties: nodes, nodegroups (default nodegroups)
      --karpenter-namespace string                            Name of the Kubernetes namespace to deploy Karpenter into (default "dd-karpenter")
      --karpenter-version string                              Version of Karpenter to install (default to latest)
```

#### `autoscaling cluster uninstall`

Elimina Karpenter y todos los recursos asociados de un clúster de EKS. Elimina los recursos `NodePool` y `EC2NodeClass`, espera a que finalicen las instancias de EC2 correspondientes, desinstala la versión del Helm de Karpenter, limpia los roles de IAM y elimina los stacks tecnológicos de CloudFormation. Solo se ven afectados los recursos creados originalmente por `kubectl datadog`.

```console
$ kubectl datadog autoscaling cluster uninstall --help
Uninstall autoscaling from an EKS cluster

Usage:
  datadog autoscaling cluster uninstall [flags]

Examples:

  # uninstall autoscaling
  kubectl datadog autoscaling cluster uninstall

Flags:
      --cluster-name string        Name of the EKS cluster
      --karpenter-namespace string  Name of the Kubernetes namespace where Karpenter is deployed (default "dd-karpenter")
      --yes                        Skip confirmation prompt
```

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog