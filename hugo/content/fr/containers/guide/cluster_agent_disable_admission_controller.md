---
description: Désactiver et supprimer en toute sécurité le contrôleur d'admission Datadog
  de votre cluster Kubernetes à l'aide de l'Agent de cluster
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: /containers/cluster_agent/admission_controller/
  tag: Documentation
  text: Contrôleur d'admission Datadog
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentation
  text: Dépanner l'Agent de cluster Datadog
title: Désactiver le contrôleur d'admission Datadog avec l'Agent de cluster
---

## Présentation

L'Agent de cluster Datadog gère le contrôleur d'admission Datadog en créant, mettant à jour et supprimant les contrôleurs d'admission selon les besoins.
Pour désactiver le contrôleur d'admission ou supprimer l'Agent de cluster, vous devez d'abord désactiver les fonctionnalités du contrôleur d'admission dans la configuration de l'Agent de cluster et redéployer l'Agent de cluster.
Une fois les contrôleurs d'admission supprimés, l'Agent de cluster peut être supprimé en toute sécurité si nécessaire.

## Prérequis

Agent de cluster Datadog v7.63+

## Étapes

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Pour désactiver les contrôleurs d'admission avec votre Agent de cluster géré par le Datadog Operator :
1. Définissez `features.admissionController.enabled` sur `false` dans votre configuration `DatadogAgent`.
2. Définissez `features.admissionController.validation.enabled` sur `false` dans votre configuration `DatadogAgent`.
3. Définissez `features.admissionController.mutation.enabled` sur `false` dans votre configuration `DatadogAgent`.

```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    features:
      admissionController:
        enabled: false
        validation:
          enabled: false
        mutation:
          enabled: false
```


Après avoir redéployé l'Agent de cluster avec la configuration mise à jour, les contrôleurs d'admission sont supprimés.
{{% /tab %}}
{{% tab "Helm" %}}
Pour désactiver les contrôleurs d'admission avec votre Agent de cluster géré par le chart Helm Datadog :
1. Définissez `clusterAgent.admissionController.enabled` sur `false`.
2. Définissez `clusterAgent.admissionController.validation.enabled` sur `false`.
3. Définissez `clusterAgent.admissionController.mutation.enabled` sur `false`.

```yaml
clusterAgent:
  enabled: true
  admissionController:
    enabled: false
    validation:
      enabled: false
    mutation:
      enabled: false
```
{{% /tab %}}
{{% /tabs %}}

Vous pouvez confirmer que les contrôleurs d'admission sont supprimés en vérifiant les ressources `ValidatingWebhookConfiguration` et `MutatingWebhookConfiguration` dans votre cluster.

```shell
kubectl get validatingwebhookconfigurations.admissionregistration.k8s.io
```

```shell
kubectl get mutatingwebhookconfigurations.admissionregistration.k8s.io
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}